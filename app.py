import streamlit as st
import pandas as pd
import numpy as np
import pickle
import plotly.express as px
import plotly.graph_objects as go
from datetime import datetime, timedelta
import warnings
warnings.filterwarnings('ignore')


st.set_page_config(
    page_title="Walmart Demand Prediction",
    page_icon="🛒",
    layout="wide",
    initial_sidebar_state="expanded"
)

class WalmartDemandPredictor:
    def __init__(self):
        self.model = None
        self.label_encoders = {}
        self.feature_columns = []
        self.product_categories = []
        self.data = None
        
    def load_model(self, model_path='walmart_model.pkl'):

        try:
            with open(model_path, 'rb') as f:
                model_data = pickle.load(f)
            
            self.model = model_data['model']
            self.label_encoders = model_data['label_encoders']
            self.feature_columns = model_data['feature_columns']
            self.product_categories = model_data['product_categories']
            self.data = model_data['data']
            
            return True
        except Exception as e:
            st.error(f"Error loading model: {str(e)}")
            return False
    
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
        
        # Calculate safety stock (to reduce waste while ensuring availability)
        safety_stock = avg_daily_demand * 0.5  # 50% of average daily demand
        
        # Calculate optimal stock levels
        lead_time_days = 7  # Assume 7-day lead time
        reorder_point = (avg_daily_demand * lead_time_days) + safety_stock
        optimal_stock_level = avg_daily_demand * 14  # 2 weeks of stock
        
        # Determine when to restock
        current_stock_estimate = optimal_stock_level  # Assume starting with optimal stock
        days_until_restock = max(1, int((current_stock_estimate - reorder_point) / avg_daily_demand))
        
        restock_date = datetime.now() + timedelta(days=days_until_restock)
        
        # Waste reduction recommendations
        shelf_life_days = self.get_shelf_life(product_line)
        
        waste_optimized_stock = None
        if optimal_stock_level * shelf_life_days > avg_daily_demand * shelf_life_days:
            waste_optimized_stock = avg_daily_demand * (shelf_life_days * 0.8)  # 80% of shelf life coverage
        
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
            'waste_optimized_stock': round(waste_optimized_stock, 2) if waste_optimized_stock else None,
            'daily_demand_data': daily_demand
        }
    
    def get_shelf_life(self, product_line):
        """Estimate shelf life based on product category"""
        shelf_life_map = {
            'Health and beauty': 365,  # 1 year
            'Electronic accessories': 730,  # 2 years
            'Home and lifestyle': 1095,  # 3 years
            'Sports and travel': 730,  # 2 years
            'Food and beverages': 30,  # 1 month
            'Fashion accessories': 365  # 1 year
        }
        return shelf_life_map.get(product_line, 365)

def create_demand_chart(daily_demand_data, product_line):
    """Create a demand trend chart"""
    fig = go.Figure()
    
    fig.add_trace(go.Scatter(
        x=daily_demand_data.index,
        y=daily_demand_data.values,
        mode='lines+markers',
        name='Daily Demand',
        line=dict(color='#1f77b4', width=2),
        marker=dict(size=4)
    ))
    
    fig.update_layout(
        title=f'Historical Daily Demand for {product_line}',
        xaxis_title='Date',
        yaxis_title='Quantity Sold',
        template='plotly_white',
        showlegend=True,
        height=400
    )
    
    return fig

def create_stock_level_chart(predictions):

    categories = ['Safety Stock', 'Reorder Point', 'Optimal Stock Level']
    values = [
        predictions['safety_stock'],
        predictions['reorder_point'],
        predictions['optimal_stock_level']
    ]
    
    if predictions['waste_optimized_stock']:
        categories.append('Waste Optimized Stock')
        values.append(predictions['waste_optimized_stock'])
    
    fig = go.Figure(data=[
        go.Bar(x=categories, y=values, 
               marker_color=['#ff7f0e', '#2ca02c', '#1f77b4', '#d62728'])
    ])
    
    fig.update_layout(
        title='Stock Level Recommendations',
        xaxis_title='Stock Type',
        yaxis_title='Quantity (Units)',
        template='plotly_white',
        height=400
    )
    
    return fig

def main():

    st.title("🛒 Walmart Demand Prediction & Inventory Optimization")
    st.markdown("---")
    

    predictor = WalmartDemandPredictor()
    

    if 'model_loaded' not in st.session_state:
        st.session_state.model_loaded = False
    

    with st.sidebar:
        st.header("Model Configuration")
        
        model_path = st.text_input("Model Path", value="walmart_model.pkl")
        
        if st.button("Load Model"):
            if predictor.load_model(model_path):
                st.session_state.model_loaded = True
                st.session_state.predictor = predictor
                st.success("Model loaded successfully!")
            else:
                st.error("Failed to load model. Please check the path.")
        
        if st.session_state.model_loaded:
            st.success("✅ Model Ready")
    

    if not st.session_state.model_loaded:
        st.warning("Please load the model first using the sidebar.")
        st.info("Make sure you have trained the model using the training script and the 'walmart_model.pkl' file exists.")
        return
    

    predictor = st.session_state.predictor
    

    col1, col2 = st.columns([2, 1])
    
    with col1:
        st.header("Product Selection")
        selected_product = st.selectbox(
            "Choose a product category:",
            options=predictor.product_categories,
            index=0
        )
    
    with col2:
        st.header("Prediction Period")
        days_ahead = st.slider(
            "Days to predict:",
            min_value=7,
            max_value=90,
            value=30,
            step=7
        )
    

    if st.button("🔮 Generate Prediction", type="primary"):
        with st.spinner("Generating predictions..."):
            predictions = predictor.predict_demand_and_stock_timing(selected_product, days_ahead)
            
            if 'error' in predictions:
                st.error(predictions['error'])
                return
            
            st.session_state.predictions = predictions
    

    if 'predictions' in st.session_state:
        predictions = st.session_state.predictions
        
        st.markdown("---")
        st.header("📊 Prediction Results")
        

        col1, col2, col3, col4 = st.columns(4)
        
        with col1:
            st.metric(
                "Predicted Daily Demand",
                f"{predictions['predicted_demand']:.2f}",
                delta=f"{predictions['predicted_demand'] - predictions['avg_daily_demand']:.2f}"
            )
        
        with col2:
            st.metric(
                "Average Daily Demand",
                f"{predictions['avg_daily_demand']:.2f}",
                delta=f"±{predictions['std_daily_demand']:.2f}"
            )
        
        with col3:
            st.metric(
                "Optimal Stock Level",
                f"{predictions['optimal_stock_level']:.2f}",
                delta=None
            )
        
        with col4:
            st.metric(
                "Days Until Restock",
                f"{predictions['days_until_restock']}",
                delta=None
            )
        
        st.markdown("---")
        col1, col2 = st.columns(2)
        
        with col1:
            demand_chart = create_demand_chart(predictions['daily_demand_data'], predictions['product_line'])
            st.plotly_chart(demand_chart, use_container_width=True)
        
        with col2:
            stock_chart = create_stock_level_chart(predictions)
            st.plotly_chart(stock_chart, use_container_width=True)
        
        st.markdown("---")
        st.header("📋 Detailed Recommendations")
        
        col1, col2 = st.columns(2)
        
        with col1:
            st.subheader("📈 Demand Statistics")
            st.write(f"**Product Category:** {predictions['product_line']}")
            st.write(f"**Average Daily Demand:** {predictions['avg_daily_demand']:.2f} units")
            st.write(f"**Standard Deviation:** {predictions['std_daily_demand']:.2f} units")
            st.write(f"**Maximum Daily Demand:** {predictions['max_daily_demand']:.2f} units")
            st.write(f"**Minimum Daily Demand:** {predictions['min_daily_demand']:.2f} units")
            st.write(f"**Predicted Daily Demand:** {predictions['predicted_demand']:.2f} units")
        
        with col2:
            st.subheader("📦 Stock Recommendations")
            st.write(f"**Safety Stock Level:** {predictions['safety_stock']:.2f} units")
            st.write(f"**Reorder Point:** {predictions['reorder_point']:.2f} units")
            st.write(f"**Optimal Stock Level:** {predictions['optimal_stock_level']:.2f} units")
            st.write(f"**Recommended Restock Date:** {predictions['restock_date']}")
            st.write(f"**Days Until Restock:** {predictions['days_until_restock']} days")
        

        st.markdown("---")
        st.header("♻️ Waste Reduction Strategy")
        
        st.write(f"**Product Shelf Life:** {predictions['shelf_life_days']} days")
        
        if predictions['waste_optimized_stock']:
            st.success(f"**Waste Optimized Stock Level:** {predictions['waste_optimized_stock']:.2f} units")
            st.info("💡 The waste optimized stock level is recommended to minimize product expiration while maintaining availability.")
        else:
            st.success("✅ Current optimal stock level is appropriate for the product shelf life.")
        

        st.markdown("---")
        st.header("💾 Export Results")
        
        results_df = pd.DataFrame([predictions])
        csv = results_df.to_csv(index=False)
        
        st.download_button(
            label="📥 Download Predictions as CSV",
            data=csv,
            file_name=f"walmart_predictions_{selected_product.replace(' ', '_')}_{datetime.now().strftime('%Y%m%d_%H%M%S')}.csv",
            mime="text/csv"
        )

if __name__ == "__main__":
    main()