import pandas as pd
import numpy as np
from datetime import datetime, timedelta
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score
from sklearn.preprocessing import LabelEncoder
import pickle
import os
import warnings
warnings.filterwarnings('ignore')

class WalmartDemandPredictor:
    def __init__(self, csv_file_path):
        self.csv_file_path = csv_file_path
        self.data = None
        self.model = None
        self.label_encoders = {}
        self.feature_columns = []
        self.product_categories = [
            'Health and beauty',
            'Electronic accessories', 
            'Home and lifestyle',
            'Sports and travel',
            'Food and beverages',
            'Fashion accessories'
        ]
        
    def load_and_preprocess_data(self):
        print("Loading and preprocessing data...")
        self.data = pd.read_csv(self.csv_file_path)
        print(f"Dataset shape: {self.data.shape}")
        print(f"Columns: {list(self.data.columns)}")
        self.data.columns = self.data.columns.str.strip()
        try:
            self.data['Date'] = pd.to_datetime(self.data['Date'], format='%Y-%m-%d')
        except ValueError:
            try:
                self.data['Date'] = pd.to_datetime(self.data['Date'], format='%d-%m-%Y')
            except ValueError:
                self.data['Date'] = pd.to_datetime(self.data['Date'], infer_datetime_format=True)
        self.data['Time'] = pd.to_datetime(self.data['Time'], format='%H:%M:%S').dt.time
        self.data['Year'] = self.data['Date'].dt.year
        self.data['Month'] = self.data['Date'].dt.month
        self.data['Day'] = self.data['Date'].dt.day
        self.data['DayOfWeek'] = self.data['Date'].dt.dayofweek
        try:
            self.data['Hour'] = pd.to_datetime(self.data['Time'], format='%H:%M:%S').dt.hour
        except:
            if hasattr(self.data['Time'].iloc[0], 'hour'):
                self.data['Hour'] = [t.hour for t in self.data['Time']]
            else:
                time_strings = self.data['Time'].astype(str)
                self.data['Hour'] = pd.to_datetime(time_strings, format='%H:%M:%S').dt.hour
        columns_to_remove = ['Invoice ID', 'Tax 5%', 'Total', 'Time', 'cogs', 'gross margin percentage', 'gross income']
        self.data = self.data.drop(columns=[col for col in columns_to_remove if col in self.data.columns])
        invalid_categories = self.data[~self.data['Product line'].isin(self.product_categories)]
        if len(invalid_categories) > 0:
            print(f"Warning: Found {len(invalid_categories)} entries with invalid product categories")
            self.data = self.data[self.data['Product line'].isin(self.product_categories)]
        print(f"Data after preprocessing: {self.data.shape}")
        print(f"Date range: {self.data['Date'].min()} to {self.data['Date'].max()}")
        return self.data
    
    def create_demand_features(self):
        print("Creating demand features...")
        categorical_columns = ['Branch', 'City', 'Customer type', 'Gender', 'Product line', 'Payment']
        for col in categorical_columns:
            if col in self.data.columns:
                self.label_encoders[col] = LabelEncoder()
                self.data[f'{col}_encoded'] = self.label_encoders[col].fit_transform(self.data[col])
        daily_sales = self.data.groupby(['Date', 'Product line'])['Quantity'].sum().reset_index()
        avg_daily_sales = daily_sales.groupby('Product line')['Quantity'].mean().reset_index()
        avg_daily_sales.columns = ['Product line', 'Avg_Daily_Sales']
        self.data = self.data.merge(avg_daily_sales, on='Product line', how='left')
        self.data['Price_Range'] = pd.cut(self.data['Unit price'], bins=5, labels=['Very Low', 'Low', 'Medium', 'High', 'Very High'])
        self.label_encoders['Price_Range'] = LabelEncoder()
        self.data['Price_Range_encoded'] = self.label_encoders['Price_Range'].fit_transform(self.data['Price_Range'])
        self.feature_columns = [
            'Unit price', 'Month', 'Day', 'DayOfWeek', 'Hour',
            'Branch_encoded', 'City_encoded', 'Customer type_encoded', 
            'Gender_encoded', 'Product line_encoded', 'Payment_encoded',
            'Price_Range_encoded', 'Avg_Daily_Sales', 'Rating'
        ]
        self.data = self.data.dropna(subset=self.feature_columns + ['Quantity'])
        print(f"Features created. Final dataset shape: {self.data.shape}")
        
    def train_model(self):
        print("Training demand prediction model...")
        X = self.data[self.feature_columns]
        y = self.data['Quantity']
        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
        self.model = RandomForestRegressor(n_estimators=100, random_state=42, max_depth=10)
        self.model.fit(X_train, y_train)
        y_pred = self.model.predict(X_test)
        mae = mean_absolute_error(y_test, y_pred)
        mse = mean_squared_error(y_test, y_pred)
        r2 = r2_score(y_test, y_pred)
        print(f"Model Performance:")
        print(f"Mean Absolute Error: {mae:.2f}")
        print(f"Mean Squared Error: {mse:.2f}")
        print(f"R² Score: {r2:.2f}")
        feature_importance = pd.DataFrame({
            'feature': self.feature_columns,
            'importance': self.model.feature_importances_
        }).sort_values('importance', ascending=False)
        print("\nTop 5 Most Important Features:")
        print(feature_importance.head())
        return X_train, X_test, y_train, y_test, y_pred
    
    def save_model(self, model_path='walmart_model.pkl'):
        print(f"Saving model to {model_path}...")
        model_data = {
            'model': self.model,
            'label_encoders': self.label_encoders,
            'feature_columns': self.feature_columns,
            'product_categories': self.product_categories,
            'data': self.data
        }
        with open(model_path, 'wb') as f:
            pickle.dump(model_data, f)
        print(f"Model saved successfully to {model_path}")
        
    def predict_demand_and_stock_timing(self, product_line, days_ahead=30):
        if product_line not in self.product_categories:
            return {
                'error': f"'{product_line}' is not a valid product category.",
                'valid_categories': self.product_categories
            }
        product_data = self.data[self.data['Product line'] == product_line].copy()
        if len(product_data) == 0:
            return {
                'error': f"No historical data found for {product_line}"
            }
        daily_demand = product_data.groupby('Date')['Quantity'].sum()
        avg_daily_demand = daily_demand.mean()
        std_daily_demand = daily_demand.std()
        max_daily_demand = daily_demand.max()
        min_daily_demand = daily_demand.min()
        last_date = self.data['Date'].max()
        future_dates = pd.date_range(start=last_date + timedelta(days=1), periods=days_ahead, freq='D')
        sample_features = product_data[self.feature_columns].mean().values.reshape(1, -1)
        predicted_demand = self.model.predict(sample_features)[0]
        safety_stock = avg_daily_demand * 0.5
        lead_time_days = 7
        reorder_point = (avg_daily_demand * lead_time_days) + safety_stock
        optimal_stock_level = avg_daily_demand * 14
        current_stock_estimate = optimal_stock_level
        days_until_restock = max(1, int((current_stock_estimate - reorder_point) / avg_daily_demand))
        restock_date = datetime.now() + timedelta(days=days_until_restock)
        shelf_life_days = self.get_shelf_life(product_line)
        waste_optimized_stock = None
        if optimal_stock_level * shelf_life_days > avg_daily_demand * shelf_life_days:
            waste_optimized_stock = avg_daily_demand * (shelf_life_days * 0.8)
        return {
            'product_line': product_line,
            'predicted_demand': round(predicted_demand, 2),
            'avg_daily_demand': round(avg_daily_demand, 2),
            'std_daily_demand': round(std_daily_demand, 2),
            'max_daily_demand': round(max_daily_demand, 2),
            'min_daily_demand': round(min_daily_demand, 2),
            'safety_stock': round(safety_stock, 2),
            'reorder_point': round(reorder_point, 2),
            'optimal_stock_level': round(optimal_stock_level, 2),
            'restock_date': restock_date.strftime('%Y-%m-%d'),
            'days_until_restock': days_until_restock,
            'shelf_life_days': shelf_life_days,
            'waste_optimized_stock': round(waste_optimized_stock, 2) if waste_optimized_stock else None
        }
    
    def get_shelf_life(self, product_line):
        shelf_life_map = {
            'Health and beauty': 365,
            'Electronic accessories': 730,
            'Home and lifestyle': 1095,
            'Sports and travel': 730,
            'Food and beverages': 30,
            'Fashion accessories': 365
        }
        return shelf_life_map.get(product_line, 365)

def main():
    print("WALMART DEMAND PREDICTION - MODEL TRAINING")
    print("="*50)
    csv_path = input("Enter the path to your Sales.csv file (or press Enter for 'sales.csv'): ").strip()
    if not csv_path:
        csv_path = 'sales.csv'
    if not os.path.exists(csv_path):
        print(f"Error: File '{csv_path}' not found!")
        return
    print(f"Loading data from: {csv_path}")
    predictor = WalmartDemandPredictor(csv_path)
    predictor.load_and_preprocess_data()
    predictor.create_demand_features()
    predictor.train_model()
    model_filename = 'walmart_model.pkl'
    predictor.save_model(model_filename)
    print(f"\nModel training completed successfully!")
    print(f"Model saved as: {model_filename}")
    print(f"You can now use the Streamlit interface to make predictions.")

if __name__ == "__main__":
    main()
