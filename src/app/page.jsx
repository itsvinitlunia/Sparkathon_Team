"use client";
import React from "react";
// At the top, add imports for the images:
// import llmDashboard from './assets/llm-dashboard.jpg';
// import llmAnalytics from './assets/llm-analytics.jpg';
// import phoneHome from './assets/phone-home.png';
// import phoneSearch from './assets/phone-search.png';
// import phoneProducts from './assets/phone-products.png';
// import phoneProfile from './assets/phone-profile.png';
// import lrmBarChart from './assets/lrm-bar-chart.jpg';
import Image from 'next/image';

function MainComponent() {
  const [activeTab, setActiveTab] = React.useState("overview");
  const [searchQuery, setSearchQuery] = React.useState("");
  const [searchResults, setSearchResults] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    setLoading(true);
    try {
      const response = await fetch(
        `/integrations/google-search/search?q=${encodeURIComponent(
          searchQuery + " sustainability retail AI waste management"
        )}`
      );
      if (!response.ok) {
        throw new Error(`Search failed: ${response.status}`);
      }
      const data = await response.json();
      setSearchResults(data.items || []);
    } catch (error) {
      console.error("Search error:", error);
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  const features = [
    {
      icon: "🌱",
      title: "AI-Powered Waste Management",
      description:
        "Smart prediction and prevention of food waste using advanced machine learning algorithms",
      color: "#22c55e",
    },
    {
      icon: "📊",
      title: "Carbon Footprint Tracking",
      description:
        "Real-time monitoring and analytics of your retail operation's environmental impact",
      color: "#3b82f6",
    },
    {
      icon: "🔄",
      title: "Sustainable Supply Chain",
      description:
        "Optimize logistics and inventory management for minimal environmental impact",
      color: "#f59e0b",
    },
    {
      icon: "📱",
      title: "Admin Dashboard",
      description:
        "Comprehensive web application for managing sustainability metrics and inventory",
      color: "#8b5cf6",
    },
    {
      icon: "🧠",
      title: "Dual LLM Intelligence",
      description:
        "Two specialized AI models working together for optimal waste prediction and management",
      color: "#ef4444",
    },
    {
      icon: "🌍",
      title: "Environmental Impact",
      description:
        "Create positive lasting impact through circular economy and zero-waste initiatives",
      color: "#06b6d4",
    },
  ];

  const techStack = [
    { name: "React", category: "Frontend", color: "#61dafb" },
    { name: "Node.js", category: "Backend", color: "#339933" },
    { name: "TensorFlow", category: "AI/ML", color: "#ff6f00" },
    { name: "MongoDB", category: "Database", color: "#47a248" },
    { name: "AWS", category: "Cloud", color: "#ff9900" },
    { name: "Python", category: "AI/ML", color: "#3776ab" },
  ];

  const solutions = [
    {
      title: "Smart Waste Prediction",
      description:
        "AI models predict food spoilage and recommend optimal inventory levels to minimize waste",
      status: "Implemented",
      category: "Waste Management",
      impact: "60% waste reduction",
    },
    {
      title: "Carbon Footprint Analytics",
      description:
        "Real-time tracking and visualization of environmental impact across operations",
      status: "Implemented",
      category: "Sustainability",
      impact: "30% emission reduction",
    },
    {
      title: "Inventory Optimization",
      description:
        "Dynamic shelf management and smart ordering based on demand forecasting",
      status: "Implemented",
      category: "Operations",
      impact: "40% efficiency gain",
    },
    {
      title: "Green Logistics",
      description:
        "Optimized delivery routes and packaging to reduce transportation emissions",
      status: "Future Scope",
      category: "Supply Chain",
      impact: "Planned for v2.0",
    },
  ];

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#fefefe" }}>
      {/* Header */}
      <header
        style={{
          background: "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)",
          color: "white",
          padding: "1rem 0",
          boxShadow: "0 4px 20px rgba(34, 197, 94, 0.3)",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "0 1rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <div
              style={{
                fontSize: "2rem",
                fontWeight: "bold",
                background: "linear-gradient(45deg, #fbbf24, #f59e0b)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              🌱 EcoRetail AI
            </div>
            <div
              style={{ fontSize: "1.2rem", fontWeight: "500", opacity: "0.9" }}
            >
              Sustainable Retail Innovation
            </div>
          </div>
          <nav style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
            {["overview", "solution", "demo", "future", "team"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  background:
                    activeTab === tab ? "rgba(255,255,255,0.2)" : "transparent",
                  color: "white",
                  border:
                    activeTab === tab
                      ? "2px solid rgba(255,255,255,0.3)"
                      : "2px solid transparent",
                  padding: "0.75rem 1.5rem",
                  borderRadius: "2rem",
                  cursor: "pointer",
                  textTransform: "capitalize",
                  fontWeight: "600",
                  transition: "all 0.3s ease",
                  fontSize: "0.95rem",
                }}
              >
                {tab === "solution"
                  ? "Our Solution"
                  : tab === "demo"
                  ? "Live Demo"
                  : tab === "future"
                  ? "Future Scope"
                  : tab === "team"
                  ? "Our Team"
                  : tab}
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main
        style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem 1rem" }}
      >
        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div>
            {/* Hero Section */}
            <section
              style={{
                textAlign: "center",
                marginBottom: "4rem",
                background:
                  "linear-gradient(135deg, #f0fdf4 0%, #dcfce7 50%, #bbf7d0 100%)",
                color: "#166534",
                padding: "4rem 2rem",
                borderRadius: "2rem",
                margin: "0 -1rem 4rem -1rem",
                border: "1px solid #bbf7d0",
              }}
            >
              <div
                style={{
                  fontSize: "1rem",
                  fontWeight: "600",
                  color: "#16a34a",
                  marginBottom: "1rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                }}
              >
                Walmart Sparkathon 2024 - Sustainability Theme
              </div>
              <h1
                style={{
                  fontSize: "3.5rem",
                  fontWeight: "800",
                  marginBottom: "1.5rem",
                  background:
                    "linear-gradient(135deg, #166534 0%, #16a34a 50%, #22c55e 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  lineHeight: "1.1",
                }}
              >
                Retail with Purpose:
                <br />
                Building a Sustainable Future
              </h1>
              <p
                style={{
                  fontSize: "1.25rem",
                  marginBottom: "2rem",
                  opacity: "0.8",
                  maxWidth: "700px",
                  margin: "0 auto 3rem auto",
                  lineHeight: "1.6",
                  color: "#15803d",
                }}
              >
                AI-powered waste management and carbon footprint tracking to
                create a more sustainable and responsible retail ecosystem.
                Reducing waste, optimizing supply chains, and building
                tomorrow's green retail operations.
              </p>

              {/* Video Demo Placeholder */}
              <div
                style={{
                  background: "#f3f4f6",
                  borderRadius: "1rem",
                  padding: "3rem",
                  marginBottom: "2rem",
                  border: "2px dashed #d1d5db",
                  color: "#6b7280",
                }}
              >
                <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🎥</div>
                <h3
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: "bold",
                    marginBottom: "0.5rem",
                    color: "#374151",
                  }}
                >
                  Solution Demo Video
                </h3>
                <p style={{ fontSize: "1rem" }}>
                  Record and upload your solution demonstration here
                </p>
              </div>

              <div
                style={{
                  display: "flex",
                  gap: "1rem",
                  justifyContent: "center",
                  flexWrap: "wrap",
                }}
              >
                <button
                  style={{
                    background:
                      "linear-gradient(135deg, #16a34a 0%, #22c55e 100%)",
                    color: "white",
                    border: "none",
                    padding: "1rem 2rem",
                    borderRadius: "3rem",
                    fontWeight: "bold",
                    cursor: "pointer",
                    fontSize: "1.1rem",
                    boxShadow: "0 4px 15px rgba(34, 197, 94, 0.4)",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = "translateY(-2px)";
                    e.target.style.boxShadow =
                      "0 8px 25px rgba(34, 197, 94, 0.5)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = "translateY(0)";
                    e.target.style.boxShadow =
                      "0 4px 15px rgba(34, 197, 94, 0.4)";
                  }}
                >
                  View Admin Dashboard
                </button>
                <button
                  style={{
                    background: "transparent",
                    color: "#16a34a",
                    border: "2px solid #16a34a",
                    padding: "1rem 2rem",
                    borderRadius: "3rem",
                    fontWeight: "bold",
                    cursor: "pointer",
                    fontSize: "1.1rem",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = "#16a34a";
                    e.target.style.color = "white";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = "transparent";
                    e.target.style.color = "#16a34a";
                  }}
                >
                  GitHub Repository
                </button>
              </div>
            </section>

            {/* Problem Statement */}
            <section style={{ marginBottom: "4rem" }}>
              <div
                style={{
                  background: "white",
                  padding: "3rem",
                  borderRadius: "1.5rem",
                  boxShadow: "0 4px 6px rgba(0,0,0,0.05)",
                  border: "1px solid #f3f4f6",
                }}
              >
                <h2
                  style={{
                    fontSize: "2rem",
                    fontWeight: "bold",
                    marginBottom: "1.5rem",
                    color: "#1f2937",
                    textAlign: "center",
                  }}
                >
                  🎯 Problem Statement
                </h2>
                <div
                  style={{
                    fontSize: "1.1rem",
                    lineHeight: "1.8",
                    color: "#4b5563",
                  }}
                >
                  <p style={{ marginBottom: "1.5rem" }}>
                    <strong>
                      Sustainability is no longer an option—it's a necessity.
                    </strong>{" "}
                    As consumers demand more eco-conscious choices, retailers
                    must reimagine their operations to reduce waste, lower
                    carbon footprints and create a more responsible supply
                    chain.
                  </p>
                  <p style={{ marginBottom: "1.5rem" }}>
                    From sustainable sourcing and eco-friendly packaging to
                    energy-efficient store designs and AI-driven waste
                    reduction, innovation is transforming how businesses operate
                    while ensuring long-term environmental and economic
                    benefits.
                  </p>
                  <p>
                    <strong>Our mission:</strong> Think beyond today's solutions
                    and help shape a smarter, greener and more responsible
                    future for retail through AI-powered sustainability
                    innovations.
                  </p>
                </div>
              </div>
            </section>

            {/* Architecture Diagram */}
            <section style={{ marginBottom: '4rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '2rem', textAlign: 'center', color: '#1f2937' }}>
                🏗️ Solution Architecture
              </h2>
              <div style={{ background: 'white', padding: '2rem', borderRadius: '1.5rem', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', textAlign: 'center', border: '1px solid #f3f4f6', maxWidth: '900px', width: '100%' }}>
                <Image src="/llm-Dashboard.jpg" alt="Dual-LLM Architecture Diagram" width={800} height={400} style={{ margin: '0 auto', display: 'block', maxWidth: '100%', height: 'auto' }} />
                <p style={{ marginTop: '1.5rem', color: '#6b7280', fontStyle: 'italic', fontSize: '1.1rem' }}>
                  Comprehensive dual-LLM architecture featuring AI-powered waste management, carbon footprint tracking, and sustainable supply chain optimization
                </p>
              </div>
            </section>

            {/* Features Grid */}
            <section style={{ marginBottom: "4rem" }}>
              <h2
                style={{
                  fontSize: "2rem",
                  fontWeight: "bold",
                  marginBottom: "3rem",
                  textAlign: "center",
                  color: "#1f2937",
                }}
              >
                🚀 Key Features
              </h2>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
                  gap: "2rem",
                }}
              >
                {features.map((feature, index) => (
                  <div
                    key={index}
                    style={{
                      background: "white",
                      padding: "2.5rem",
                      borderRadius: "1.5rem",
                      boxShadow: "0 4px 6px rgba(0,0,0,0.05)",
                      textAlign: "center",
                      transition: "all 0.3s ease",
                      cursor: "pointer",
                      border: "1px solid #f3f4f6",
                      position: "relative",
                      overflow: "hidden",
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = "translateY(-10px)";
                      e.target.style.boxShadow = "0 20px 40px rgba(0,0,0,0.1)";
                      e.target.style.borderColor = feature.color;
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = "translateY(0)";
                      e.target.style.boxShadow = "0 4px 6px rgba(0,0,0,0.05)";
                      e.target.style.borderColor = "#f3f4f6";
                    }}
                  >
                    <div
                      style={{
                        fontSize: "3.5rem",
                        marginBottom: "1.5rem",
                        filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.1))",
                      }}
                    >
                      {feature.icon}
                    </div>
                    <h3
                      style={{
                        fontSize: "1.4rem",
                        fontWeight: "bold",
                        marginBottom: "1rem",
                        color: "#1f2937",
                      }}
                    >
                      {feature.title}
                    </h3>
                    <p
                      style={{
                        color: "#6b7280",
                        lineHeight: "1.7",
                        fontSize: "1.05rem",
                      }}
                    >
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* Solution Tab */}
        {activeTab === "solution" && (
          <div>
            <h2
              style={{
                fontSize: "2.5rem",
                fontWeight: "bold",
                marginBottom: "3rem",
                textAlign: "center",
                color: "#1f2937",
              }}
            >
              🌱 Our Sustainable Solutions
            </h2>

            {/* LLM Models Section */}
            <section style={{ marginBottom: "4rem" }}>
              <h3
                style={{
                  fontSize: "2rem",
                  fontWeight: "bold",
                  marginBottom: "2rem",
                  textAlign: "center",
                  color: "#16a34a",
                }}
              >
                🧠 Dual LLM Intelligence System
              </h3>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(2, 1fr)",
                  gap: "2rem",
                  marginBottom: "3rem",
                  alignItems: "stretch"
                }}
              >
                {/* Inventory Optimization LLM card */}
                <div
                  style={{
                    background: "white",
                    padding: "2rem",
                    borderRadius: "1.5rem",
                    boxShadow: "0 4px 6px rgba(0,0,0,0.05)",
                    border: "2px solid #22c55e",
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    minHeight: '100%'
                  }}
                >
                  <h4
                    style={{
                      fontSize: "1.5rem",
                      fontWeight: "bold",
                      marginBottom: "1rem",
                      color: "#16a34a",
                    }}
                  >
                    🛒 Inventory Optimization LLM
                  </h4>
                  <p style={{ color: "#6b7280", lineHeight: "1.6", marginBottom: "1rem" }}>
                    An intelligent demand forecasting and inventory management system built for Walmart retail operations. This project uses machine learning to predict product demand and optimize stock levels while minimizing waste. Features include demand prediction (Random Forest regression), inventory optimization, waste reduction, interactive dashboard, and multi-category support.
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center', alignItems: 'center', marginBottom: '1rem' }}>
                    <div style={{ textAlign: 'center' }}>
                      <Image src="/InventoryOpt_ Home.jpg" alt="Inventory Optimization Home" width={180} height={100} style={{ borderRadius: '0.5rem', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }} />
                      <div style={{ fontSize: '0.85rem', color: '#6b7280' }}>Dashboard Home</div>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <Image src="/InventoryOpt_ Product Analysis.jpg" alt="Product Analysis" width={180} height={100} style={{ borderRadius: '0.5rem', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }} />
                      <div style={{ fontSize: '0.85rem', color: '#6b7280' }}>Product Analysis</div>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <Image src="/InventoryOpt_ Recommendation.jpg" alt="Recommendation" width={180} height={100} style={{ borderRadius: '0.5rem', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }} />
                      <div style={{ fontSize: '0.85rem', color: '#6b7280' }}>Recommendation</div>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <Image src="/InventoryOpt_ Recommendation2.jpg" alt="Recommendation 2" width={180} height={100} style={{ borderRadius: '0.5rem', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }} />
                      <div style={{ fontSize: '0.85rem', color: '#6b7280' }}>Recommendation 2</div>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <Image src="/InventoryOpt_ result.jpg" alt="Prediction Result" width={180} height={100} style={{ borderRadius: '0.5rem', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }} />
                      <div style={{ fontSize: '0.85rem', color: '#6b7280' }}>Prediction Result</div>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <Image src="/InventoryOpt_ health and beauty.jpg" alt="Health and Beauty" width={180} height={100} style={{ borderRadius: '0.5rem', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }} />
                      <div style={{ fontSize: '0.85rem', color: '#6b7280' }}>Health and Beauty</div>
                    </div>
                  </div>
                  <div style={{ fontSize: '0.9rem', color: '#15803d', marginBottom: '1rem' }}>
                    <div>✅ Multi-category demand forecasting (6 product lines)</div>
                    <div>✅ Real-time inventory optimization</div>
                    <div>✅ Waste reduction through shelf-life analysis</div>
                    <div>✅ Interactive Streamlit dashboard</div>
                    <div>✅ CSV export functionality</div>
                  </div>
                  <a
                    href="https://github.com/Niteshd05/Walmart-Sales-and-Stock-Prediction"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "inline-block",
                      background: "#16a34a",
                      color: "white",
                      padding: "0.5rem 1rem",
                      borderRadius: "0.5rem",
                      textDecoration: "none",
                      fontSize: "0.9rem",
                      fontWeight: "600",
                    }}
                  >
                    🐙 View GitHub Repository
                  </a>
                </div>
                {/* Carbon Analytics LLM card */}
                <div
                  style={{
                    background: "white",
                    padding: "2rem",
                    borderRadius: "1.5rem",
                    boxShadow: "0 4px 6px rgba(0,0,0,0.05)",
                    border: "2px solid #3b82f6",
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    minHeight: '100%'
                  }}
                >
                  <h4
                    style={{
                      fontSize: "1.5rem",
                      fontWeight: "bold",
                      marginBottom: "1rem",
                      color: "#2563eb",
                    }}
                  >
                    📊 Carbon Analytics LLM
                  </h4>
                  <p
                    style={{
                      color: "#6b7280",
                      lineHeight: "1.6",
                      marginBottom: "1rem",
                    }}
                  >
                    Advanced model for carbon footprint calculation, environmental impact assessment, and sustainability recommendations for retail operations.
                  </p>
                  <div
                    style={{
                      background: "#f9fafb",
                      padding: "1rem",
                      borderRadius: "0.5rem",
                      fontSize: "0.9rem",
                      color: "#6b7280",
                    }}
                  >
                    💡 Carbon tracking model interface will be added here
                  </div>
                </div>
              </div>
            </section>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: "2rem",
              }}
            >
              {solutions.map((solution, index) => (
                <div
                  key={index}
                  style={{
                    background: "white",
                    padding: "2rem",
                    borderRadius: "1.5rem",
                    boxShadow: "0 4px 6px rgba(0,0,0,0.05)",
                    border:
                      solution.status === "Implemented"
                        ? "3px solid #22c55e"
                        : "2px solid #f59e0b",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      marginBottom: "1rem",
                      flexWrap: "wrap",
                      gap: "0.5rem",
                    }}
                  >
                    <span
                      style={{
                        background:
                          solution.status === "Implemented"
                            ? "#22c55e"
                            : "#f59e0b",
                        color: "white",
                        padding: "0.5rem 1rem",
                        borderRadius: "2rem",
                        fontSize: "0.875rem",
                        fontWeight: "bold",
                      }}
                    >
                      {solution.status}
                    </span>
                    <span
                      style={{
                        background: "#f3f4f6",
                        color: "#6b7280",
                        padding: "0.25rem 0.75rem",
                        borderRadius: "1rem",
                        fontSize: "0.875rem",
                      }}
                    >
                      {solution.category}
                    </span>
                  </div>
                  <h3
                    style={{
                      fontSize: "1.5rem",
                      fontWeight: "bold",
                      marginBottom: "1rem",
                      color: "#1f2937",
                    }}
                  >
                    {solution.title}
                  </h3>
                  <p
                    style={{
                      color: "#6b7280",
                      lineHeight: "1.6",
                      marginBottom: "1rem",
                    }}
                  >
                    {solution.description}
                  </p>
                  <div
                    style={{
                      background: "#f0fdf4",
                      color: "#166534",
                      padding: "0.75rem",
                      borderRadius: "0.5rem",
                      fontWeight: "600",
                      textAlign: "center",
                      marginBottom: "1rem",
                    }}
                  >
                    📈 Impact: {solution.impact}
                  </div>
                  <button
                    style={{
                      background:
                        "linear-gradient(135deg, #16a34a 0%, #22c55e 100%)",
                      color: "white",
                      border: "none",
                      padding: "0.75rem 1.5rem",
                      borderRadius: "2rem",
                      cursor: "pointer",
                      fontWeight: "600",
                      width: "100%",
                      transition: "all 0.3s ease",
                    }}
                  >
                    Learn More
                  </button>
                </div>
              ))}
            </div>

            {/* Add after the Inventory Optimization and Carbon Analytics LLM cards in 'Our Solution': */}
            <section style={{ margin: '3rem 0', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1.5rem', textAlign: 'center', color: '#1f2937' }}>
                🧊 Shelf Life Optimization & Waste Reduction
              </h2>
              <p style={{ maxWidth: '700px', textAlign: 'center', color: '#374151', fontSize: '1.1rem', marginBottom: '2rem' }}>
                Our system provides shelf-life-based stock recommendations to minimize product expiration and reduce waste. The following chart visualizes product urgency and shelf life across categories, helping you optimize inventory and sustainability.
              </p>
              <Image src="/LRM.jpeg" alt="Shelf Life Optimization Bar Chart" width={1000} height={400} style={{ maxWidth: '100%', borderRadius: '1rem', boxShadow: '0 4px 24px rgba(0,0,0,0.08)' }} />
              <div style={{ color: '#6b7280', fontStyle: 'italic', marginTop: '1rem', fontSize: '1rem' }}>
                Product urgency by sub-category and shelf life (LRM solution)
              </div>
            </section>
          </div>
        )}

        {/* Demo Tab */}
        {activeTab === "demo" && (
          <div>
            <h2
              style={{
                fontSize: "2.5rem",
                fontWeight: "bold",
                marginBottom: "2rem",
                textAlign: "center",
                color: "#1f2937",
              }}
            >
              ��️ Admin Dashboard & Live Demo
            </h2>

            {/* Mobile App Showcase */}
            <section style={{ marginBottom: "4rem" }}>
              <div
                style={{
                  background:
                    "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)",
                  padding: "4rem 2rem",
                  borderRadius: "2rem",
                  color: "white",
                  textAlign: "center",
                  marginBottom: "3rem",
                }}
              >
                <h3
                  style={{
                    fontSize: "2.5rem",
                    fontWeight: "bold",
                    marginBottom: "1rem",
                  }}
                >
                  📱 ShelfGuard Mobile App
                </h3>
                <p
                  style={{
                    fontSize: "1.2rem",
                    opacity: "0.9",
                    maxWidth: "600px",
                    margin: "0 auto 3rem auto",
                    lineHeight: "1.6",
                  }}
                >
                  Smart inventory management system with AI-powered waste
                  prediction and real-time sustainability tracking
                </p>

                {/* Mobile Screenshots Grid */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                    gap: "2rem",
                    maxWidth: "1000px",
                    margin: "0 auto",
                  }}
                >
                  {/* Home Screen */}
                  <div
                    style={{
                      background: "rgba(255,255,255,0.1)",
                      padding: "1.5rem",
                      borderRadius: "1.5rem",
                      backdropFilter: "blur(10px)",
                      border: "1px solid rgba(255,255,255,0.2)",
                    }}
                  >
                    <Image src="/expo-home.png" alt="ShelfGuard Home Dashboard" width={200} height={400} style={{ width: '100%', maxWidth: '200px', height: 'auto', borderRadius: '1rem', boxShadow: '0 10px 30px rgba(0,0,0,0.3)', margin: '0 auto 1rem auto', display: 'block' }} />
                    <h4
                      style={{
                        fontSize: "1.2rem",
                        fontWeight: "bold",
                        marginBottom: "0.5rem",
                      }}
                    >
                      📊 Dashboard Overview
                    </h4>
                    <p style={{ fontSize: "0.9rem", opacity: "0.8" }}>
                      Real-time inventory metrics and waste reduction analytics
                    </p>
                  </div>

                  {/* Products Screen */}
                  <div
                    style={{
                      background: "rgba(255,255,255,0.1)",
                      padding: "1.5rem",
                      borderRadius: "1.5rem",
                      backdropFilter: "blur(10px)",
                      border: "1px solid rgba(255,255,255,0.2)",
                    }}
                  >
                    <Image src="/expo-prdts.png" alt="ShelfGuard Products Management" width={200} height={400} style={{ width: '100%', maxWidth: '200px', height: 'auto', borderRadius: '1rem', boxShadow: '0 10px 30px rgba(0,0,0,0.3)', margin: '0 auto 1rem auto', display: 'block' }} />
                    <h4
                      style={{
                        fontSize: "1.2rem",
                        fontWeight: "bold",
                        marginBottom: "0.5rem",
                      }}
                    >
                      📦 Smart Inventory
                    </h4>
                    <p style={{ fontSize: "0.9rem", opacity: "0.8" }}>
                      AI-powered risk assessment and expiration tracking
                    </p>
                  </div>

                  {/* Search Screen */}
                  <div
                    style={{
                      background: "rgba(255,255,255,0.1)",
                      padding: "1.5rem",
                      borderRadius: "1.5rem",
                      backdropFilter: "blur(10px)",
                      border: "1px solid rgba(255,255,255,0.2)",
                    }}
                  >
                    <Image src="/expo-search.png" alt="ShelfGuard Search and Filters" width={200} height={400} style={{ width: '100%', maxWidth: '200px', height: 'auto', borderRadius: '1rem', boxShadow: '0 10px 30px rgba(0,0,0,0.3)', margin: '0 auto 1rem auto', display: 'block' }} />
                    <h4
                      style={{
                        fontSize: "1.2rem",
                        fontWeight: "bold",
                        marginBottom: "0.5rem",
                      }}
                    >
                      🔍 Smart Search
                    </h4>
                    <p style={{ fontSize: "0.9rem", opacity: "0.8" }}>
                      Quick filters for risk assessment and inventory management
                    </p>
                  </div>

                  {/* Profile Screen */}
                  <div
                    style={{
                      background: "rgba(255,255,255,0.1)",
                      padding: "1.5rem",
                      borderRadius: "1.5rem",
                      backdropFilter: "blur(10px)",
                      border: "1px solid rgba(255,255,255,0.2)",
                    }}
                  >
                    <Image src="/expo-prf.png" alt="ShelfGuard User Profile and Impact" width={200} height={400} style={{ width: '100%', maxWidth: '200px', height: 'auto', borderRadius: '1rem', boxShadow: '0 10px 30px rgba(0,0,0,0.3)', margin: '0 auto 1rem auto', display: 'block' }} />
                    <h4
                      style={{
                        fontSize: "1.2rem",
                        fontWeight: "bold",
                        marginBottom: "0.5rem",
                      }}
                    >
                      🌱 Impact Tracking
                    </h4>
                    <p style={{ fontSize: "0.9rem", opacity: "0.8" }}>
                      Personal sustainability metrics and achievements
                    </p>
                  </div>
                </div>

                {/* App Features Highlights */}
                <div
                  style={{
                    marginTop: "3rem",
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                    gap: "1.5rem",
                    maxWidth: "800px",
                    margin: "3rem auto 0 auto",
                  }}
                >
                  <div style={{ textAlign: "center" }}>
                    <div style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>
                      89%
                    </div>
                    <p style={{ fontSize: "0.9rem", opacity: "0.8" }}>
                      Waste Reduced
                    </p>
                  </div>
                  <div style={{ textAlign: "center" }}>
                    <div style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>
                      2,847
                    </div>
                    <p style={{ fontSize: "0.9rem", opacity: "0.8" }}>
                      Products Saved
                    </p>
                  </div>
                  <div style={{ textAlign: "center" }}>
                    <div style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>
                      1.2
                    </div>
                    <p style={{ fontSize: "0.9rem", opacity: "0.8" }}>
                      Tons CO₂ Saved
                    </p>
                  </div>
                  <div style={{ textAlign: "center" }}>
                    <div style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>
                      1,247
                    </div>
                    <p style={{ fontSize: "0.9rem", opacity: "0.8" }}>
                      Total Items
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Web App Features */}
            <div
              style={{
                background: "white",
                padding: "3rem",
                borderRadius: "1.5rem",
                boxShadow: "0 4px 6px rgba(0,0,0,0.05)",
                marginBottom: "3rem",
                border: "1px solid #f3f4f6",
              }}
            >
              <h3
                style={{
                  fontSize: "1.8rem",
                  fontWeight: "bold",
                  marginBottom: "2rem",
                  color: "#16a34a",
                }}
              >
                🎛️ Web Application Features
              </h3>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                  gap: "2rem",
                }}
              >
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>
                    🔐
                  </div>
                  <h4
                    style={{
                      fontSize: "1.2rem",
                      fontWeight: "bold",
                      marginBottom: "0.5rem",
                      color: "#1f2937",
                    }}
                  >
                    Admin Login
                  </h4>
                  <p style={{ color: "#6b7280", fontSize: "0.95rem" }}>
                    Secure authentication system for administrators
                  </p>
                </div>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>
                    📊
                  </div>
                  <h4
                    style={{
                      fontSize: "1.2rem",
                      fontWeight: "bold",
                      marginBottom: "0.5rem",
                      color: "#1f2937",
                    }}
                  >
                    Analytics Dashboard
                  </h4>
                  <p style={{ color: "#6b7280", fontSize: "0.95rem" }}>
                    Real-time sustainability metrics and insights
                  </p>
                </div>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>
                    📦
                  </div>
                  <h4
                    style={{
                      fontSize: "1.2rem",
                      fontWeight: "bold",
                      marginBottom: "0.5rem",
                      color: "#1f2937",
                    }}
                  >
                    Inventory Management
                  </h4>
                  <p style={{ color: "#6b7280", fontSize: "0.95rem" }}>
                    Smart inventory tracking and optimization
                  </p>
                </div>
              </div>
            </div>

            {/* Demo Placeholder */}
            <div
              style={{
                background: "linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)",
                padding: "4rem 2rem",
                borderRadius: "1.5rem",
                textAlign: "center",
                border: "2px dashed #22c55e",
                marginBottom: "3rem",
              }}
            >
              <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>🖥️</div>
              <h3
                style={{
                  fontSize: "2rem",
                  fontWeight: "bold",
                  marginBottom: "1rem",
                  color: "#166534",
                }}
              >
                Live Web Application Demo
              </h3>
              <p
                style={{
                  fontSize: "1.1rem",
                  color: "#16a34a",
                  marginBottom: "2rem",
                }}
              >
                Interactive demonstration of our admin dashboard, inventory
                management, and AI-powered analytics
              </p>
              <button
                style={{
                  background:
                    "linear-gradient(135deg, #16a34a 0%, #22c55e 100%)",
                  color: "white",
                  border: "none",
                  padding: "1rem 2rem",
                  borderRadius: "3rem",
                  fontWeight: "bold",
                  cursor: "pointer",
                  fontSize: "1.1rem",
                  boxShadow: "0 4px 15px rgba(34, 197, 94, 0.4)",
                }}
              >
                Launch Admin Dashboard
              </button>
            </div>

            {/* Tech Stack */}
            <div>
              <h3
                style={{
                  fontSize: "1.8rem",
                  fontWeight: "bold",
                  marginBottom: "2rem",
                  textAlign: "center",
                  color: "#1f2937",
                }}
              >
                🛠️ Technology Stack
              </h3>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                  gap: "1.5rem",
                }}
              >
                {techStack.map((tech, index) => (
                  <div
                    key={index}
                    style={{
                      background: "white",
                      padding: "1.5rem",
                      borderRadius: "1rem",
                      boxShadow: "0 4px 6px rgba(0,0,0,0.05)",
                      textAlign: "center",
                      border: "1px solid #f3f4f6",
                      transition: "all 0.3s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.target.borderColor = tech.color;
                      e.target.transform = "translateY(-5px)";
                    }}
                    onMouseLeave={(e) => {
                      e.target.borderColor = "#f3f4f6";
                      e.target.transform = "translateY(0)";
                    }}
                  >
                    <div
                      style={{
                        width: "60px",
                        height: "60px",
                        background: tech.color,
                        borderRadius: "50%",
                        margin: "0 auto 1rem auto",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "white",
                        fontWeight: "bold",
                        fontSize: "1.2rem",
                      }}
                    >
                      {tech.name.charAt(0)}
                    </div>
                    <h4
                      style={{
                        fontSize: "1.25rem",
                        fontWeight: "bold",
                        marginBottom: "0.5rem",
                        color: "#1f2937",
                      }}
                    >
                      {tech.name}
                    </h4>
                    <p
                      style={{
                        color: "#6b7280",
                        fontSize: "0.875rem",
                      }}
                    >
                      {tech.category}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Team Tab */}
        {activeTab === "team" && (
          <div>
            <h2
              style={{
                fontSize: "2.5rem",
                fontWeight: "bold",
                marginBottom: "2rem",
                textAlign: "center",
                color: "#1f2937",
              }}
            >
              👥 Meet Our Team
            </h2>

            {/* Team Introduction */}
            <section style={{ marginBottom: "4rem" }}>
              <div
                style={{
                  background:
                    "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
                  padding: "4rem 2rem",
                  borderRadius: "2rem",
                  color: "white",
                  textAlign: "center",
                  marginBottom: "3rem",
                }}
              >
                <h3
                  style={{
                    fontSize: "2.5rem",
                    fontWeight: "bold",
                    marginBottom: "1rem",
                  }}
                >
                  🚀 The Innovators Behind EcoRetail AI
                </h3>
                <p
                  style={{
                    fontSize: "1.2rem",
                    opacity: "0.9",
                    maxWidth: "700px",
                    margin: "0 auto",
                    lineHeight: "1.6",
                  }}
                >
                  A passionate team of developers, data scientists, and
                  sustainability advocates working together to revolutionize
                  retail through AI-powered environmental solutions.
                </p>
              </div>
            </section>

            {/* Team Members Grid */}
            <section style={{ marginBottom: '4rem' }}>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: '2rem',
                  justifyItems: 'center',
                  alignItems: 'stretch',
                }}
              >
                {/* Member 1: Akshita Gupta */}
                <div
                  style={{
                    background: "white",
                    padding: "2rem",
                    borderRadius: "1.5rem",
                    boxShadow: "0 4px 6px rgba(0,0,0,0.05)",
                    textAlign: "center",
                    border: "2px solid #f3f4f6",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = "translateY(-10px)";
                    e.target.style.boxShadow = "0 20px 40px rgba(0,0,0,0.1)";
                    e.target.style.borderColor = "#6366f1";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = "translateY(0)";
                    e.target.style.boxShadow = "0 4px 6px rgba(0,0,0,0.05)";
                    e.target.style.borderColor = "#f3f4f6";
                  }}
                >
                  <div
                    style={{
                      width: "120px",
                      height: "120px",
                      background:
                        "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
                      borderRadius: "50%",
                      margin: "0 auto 1.5rem auto",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "white",
                      fontWeight: "bold",
                      fontSize: "2rem",
                      boxShadow: "0 8px 32px rgba(99, 102, 241, 0.3)",
                    }}
                  >
                    AG
                  </div>
                  <h3
                    style={{
                      fontSize: "1.5rem",
                      fontWeight: "bold",
                      marginBottom: "0.5rem",
                      color: "#1f2937",
                    }}
                  >
                    Akshita Gupta
                  </h3>
                  <p
                    style={{
                      color: "#6366f1",
                      fontWeight: "600",
                      marginBottom: "1rem",
                      fontSize: "1.1rem",
                    }}
                  >
                    Full-Stack Developer & AI Specialist
                  </p>
                  <p
                    style={{
                      color: "#6b7280",
                      lineHeight: "1.6",
                      marginBottom: "1.5rem",
                      fontSize: "0.95rem",
                    }}
                  >
                    Expert in React, Node.js, and machine learning. Passionate
                    about creating sustainable technology solutions that make a
                    real-world impact.
                  </p>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      gap: "1rem",
                    }}
                  >
                    <a
                      href="https://github.com/guptaakshitaa"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        background: "#24292e",
                        color: "white",
                        padding: "0.5rem 1rem",
                        borderRadius: "2rem",
                        textDecoration: "none",
                        fontSize: "0.9rem",
                        fontWeight: "600",
                        transition: "all 0.3s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.background = "#1a1e22";
                        e.target.style.transform = "translateY(-2px)";
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.background = "#24292e";
                        e.target.style.transform = "translateY(0)";
                      }}
                    >
                      🐙 GitHub
                    </a>
                    <a
                      href="https://www.linkedin.com/in/akshita-gupta-67aa752ab"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        background: "#0077b5",
                        color: "white",
                        padding: "0.5rem 1rem",
                        borderRadius: "2rem",
                        textDecoration: "none",
                        fontSize: "0.9rem",
                        fontWeight: "600",
                        transition: "all 0.3s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.background = "#005885";
                        e.target.style.transform = "translateY(-2px)";
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.background = "#0077b5";
                        e.target.style.transform = "translateY(0)";
                      }}
                    >
                      💼 LinkedIn
                    </a>
                  </div>
                </div>

                {/* Member 2: Mandar Ekal */}
                <div
                  style={{
                    background: "white",
                    padding: "2rem",
                    borderRadius: "1.5rem",
                    boxShadow: "0 4px 6px rgba(0,0,0,0.05)",
                    textAlign: "center",
                    border: "2px solid #f3f4f6",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = "translateY(-10px)";
                    e.target.style.boxShadow = "0 20px 40px rgba(0,0,0,0.1)";
                    e.target.style.borderColor = "#10b981";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = "translateY(0)";
                    e.target.style.boxShadow = "0 4px 6px rgba(0,0,0,0.05)";
                    e.target.style.borderColor = "#f3f4f6";
                  }}
                >
                  <div
                    style={{
                      width: "120px",
                      height: "120px",
                      background:
                        "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                      borderRadius: "50%",
                      margin: "0 auto 1.5rem auto",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "white",
                      fontWeight: "bold",
                      fontSize: "2rem",
                      boxShadow: "0 8px 32px rgba(16, 185, 129, 0.3)",
                    }}
                  >
                    ME
                  </div>
                  <h3
                    style={{
                      fontSize: "1.5rem",
                      fontWeight: "bold",
                      marginBottom: "0.5rem",
                      color: "#1f2937",
                    }}
                  >
                    Mandar Ekal
                  </h3>
                  <p
                    style={{
                      color: "#10b981",
                      fontWeight: "600",
                      marginBottom: "1rem",
                      fontSize: "1.1rem",
                    }}
                  >
                    Backend Developer & Data Engineer
                  </p>
                  <p
                    style={{
                      color: "#6b7280",
                      lineHeight: "1.6",
                      marginBottom: "1.5rem",
                      fontSize: "0.95rem",
                    }}
                  >
                    Specializes in scalable backend systems, database
                    optimization, and data pipeline architecture for AI-driven
                    applications.
                  </p>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      gap: "1rem",
                    }}
                  >
                    <a
                      href="https://github.com/GR4V1TY123"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        background: "#24292e",
                        color: "white",
                        padding: "0.5rem 1rem",
                        borderRadius: "2rem",
                        textDecoration: "none",
                        fontSize: "0.9rem",
                        fontWeight: "600",
                        transition: "all 0.3s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.background = "#1a1e22";
                        e.target.style.transform = "translateY(-2px)";
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.background = "#24292e";
                        e.target.style.transform = "translateY(0)";
                      }}
                    >
                      🐙 GitHub
                    </a>
                    <a
                      href="https://www.linkedin.com/in/mandar-ekal-47988a353/"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        background: "#0077b5",
                        color: "white",
                        padding: "0.5rem 1rem",
                        borderRadius: "2rem",
                        textDecoration: "none",
                        fontSize: "0.9rem",
                        fontWeight: "600",
                        transition: "all 0.3s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.background = "#005885";
                        e.target.style.transform = "translateY(-2px)";
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.background = "#0077b5";
                        e.target.style.transform = "translateY(0)";
                      }}
                    >
                      💼 LinkedIn
                    </a>
                  </div>
                </div>

                {/* Member 3: Nitesh Domal */}
                <div
                  style={{
                    background: "white",
                    padding: "2rem",
                    borderRadius: "1.5rem",
                    boxShadow: "0 4px 6px rgba(0,0,0,0.05)",
                    textAlign: "center",
                    border: "2px solid #f3f4f6",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = "translateY(-10px)";
                    e.target.style.boxShadow = "0 20px 40px rgba(0,0,0,0.1)";
                    e.target.style.borderColor = "#f59e0b";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = "translateY(0)";
                    e.target.style.boxShadow = "0 4px 6px rgba(0,0,0,0.05)";
                    e.target.style.borderColor = "#f3f4f6";
                  }}
                >
                  <div
                    style={{
                      width: "120px",
                      height: "120px",
                      background:
                        "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
                      borderRadius: "50%",
                      margin: "0 auto 1.5rem auto",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "white",
                      fontWeight: "bold",
                      fontSize: "2rem",
                      boxShadow: "0 8px 32px rgba(245, 158, 11, 0.3)",
                    }}
                  >
                    ND
                  </div>
                  <h3
                    style={{
                      fontSize: "1.5rem",
                      fontWeight: "bold",
                      marginBottom: "0.5rem",
                      color: "#1f2937",
                    }}
                  >
                    Nitesh Domal
                  </h3>
                  <p
                    style={{
                      color: "#f59e0b",
                      fontWeight: "600",
                      marginBottom: "1rem",
                      fontSize: "1.1rem",
                    }}
                  >
                    Machine Learning Engineer & Data Scientist
                  </p>
                  <p
                    style={{
                      color: "#6b7280",
                      lineHeight: "1.6",
                      marginBottom: "1.5rem",
                      fontSize: "0.95rem",
                    }}
                  >
                    Focuses on developing predictive models, LLM integration,
                    and advanced analytics for waste management and
                    sustainability metrics.
                  </p>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      gap: "1rem",
                    }}
                  >
                    <a
                      href="https://github.com/Niteshd05"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        background: "#24292e",
                        color: "white",
                        padding: "0.5rem 1rem",
                        borderRadius: "2rem",
                        textDecoration: "none",
                        fontSize: "0.9rem",
                        fontWeight: "600",
                        transition: "all 0.3s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.background = "#1a1e22";
                        e.target.style.transform = "translateY(-2px)";
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.background = "#24292e";
                        e.target.style.transform = "translateY(0)";
                      }}
                    >
                      🐙 GitHub
                    </a>
                    <a
                      href="https://www.linkedin.com/in/nitesh-domal/"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        background: "#0077b5",
                        color: "white",
                        padding: "0.5rem 1rem",
                        borderRadius: "2rem",
                        textDecoration: "none",
                        fontSize: "0.9rem",
                        fontWeight: "600",
                        transition: "all 0.3s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.background = "#005885";
                        e.target.style.transform = "translateY(-2px)";
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.background = "#0077b5";
                        e.target.style.transform = "translateY(0)";
                      }}
                    >
                      💼 LinkedIn
                    </a>
                  </div>
                </div>

                {/* Member 4: Vinit Lunia */}
                <div
                  style={{
                    background: "white",
                    padding: "2rem",
                    borderRadius: "1.5rem",
                    boxShadow: "0 4px 6px rgba(0,0,0,0.05)",
                    textAlign: "center",
                    border: "2px solid #f3f4f6",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = "translateY(-10px)";
                    e.target.style.boxShadow = "0 20px 40px rgba(0,0,0,0.1)";
                    e.target.style.borderColor = "#ef4444";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = "translateY(0)";
                    e.target.style.boxShadow = "0 4px 6px rgba(0,0,0,0.05)";
                    e.target.style.borderColor = "#f3f4f6";
                  }}
                >
                  <div
                    style={{
                      width: "120px",
                      height: "120px",
                      background:
                        "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
                      borderRadius: "50%",
                      margin: "0 auto 1.5rem auto",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "white",
                      fontWeight: "bold",
                      fontSize: "2rem",
                      boxShadow: "0 8px 32px rgba(239, 68, 68, 0.3)",
                    }}
                  >
                    VL
                  </div>
                  <h3
                    style={{
                      fontSize: "1.5rem",
                      fontWeight: "bold",
                      marginBottom: "0.5rem",
                      color: "#1f2937",
                    }}
                  >
                    Vinit Lunia
                  </h3>
                  <p
                    style={{
                      color: "#ef4444",
                      fontWeight: "600",
                      marginBottom: "1rem",
                      fontSize: "1.1rem",
                    }}
                  >
                    Frontend Developer & UX Designer
                  </p>
                  <p
                    style={{
                      color: "#6b7280",
                      lineHeight: "1.6",
                      marginBottom: "1.5rem",
                      fontSize: "0.95rem",
                    }}
                  >
                    Creates intuitive user interfaces and seamless user
                    experiences for mobile and web applications with a focus on
                    accessibility and design.
                  </p>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      gap: "1rem",
                    }}
                  >
                    <a
                      href="https://github.com/itsvinitlunia"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        background: "#24292e",
                        color: "white",
                        padding: "0.5rem 1rem",
                        borderRadius: "2rem",
                        textDecoration: "none",
                        fontSize: "0.9rem",
                        fontWeight: "600",
                        transition: "all 0.3s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.background = "#1a1e22";
                        e.target.style.transform = "translateY(-2px)";
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.background = "#24292e";
                        e.target.style.transform = "translateY(0)";
                      }}
                    >
                      🐙 GitHub
                    </a>
                    <a
                      href="https://www.linkedin.com/in/vinitlunia"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        background: "#0077b5",
                        color: "white",
                        padding: "0.5rem 1rem",
                        borderRadius: "2rem",
                        textDecoration: "none",
                        fontSize: "0.9rem",
                        fontWeight: "600",
                        transition: "all 0.3s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.background = "#005885";
                        e.target.style.transform = "translateY(-2px)";
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.background = "#0077b5";
                        e.target.style.transform = "translateY(0)";
                      }}
                    >
                      💼 LinkedIn
                    </a>
                  </div>
                </div>
              </div>
            </section>

            {/* Team Stats */}
            <section style={{ marginBottom: "4rem" }}>
              <div
                style={{
                  background: "white",
                  padding: "3rem",
                  borderRadius: "1.5rem",
                  boxShadow: "0 4px 6px rgba(0,0,0,0.05)",
                  border: "1px solid #f3f4f6",
                }}
              >
                <h3
                  style={{
                    fontSize: "2rem",
                    fontWeight: "bold",
                    marginBottom: "2rem",
                    textAlign: "center",
                    color: "#1f2937",
                  }}
                >
                  🏆 Team Achievements
                </h3>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                    gap: "2rem",
                  }}
                >
                  <div style={{ textAlign: "center" }}>
                    <div
                      style={{
                        fontSize: "3rem",
                        fontWeight: "bold",
                        color: "#6366f1",
                        marginBottom: "0.5rem",
                      }}
                    >
                      4
                    </div>
                    <p style={{ color: "#6b7280", fontSize: "1.1rem" }}>
                      Team Members
                    </p>
                  </div>
                  <div style={{ textAlign: "center" }}>
                    <div
                      style={{
                        fontSize: "3rem",
                        fontWeight: "bold",
                        color: "#10b981",
                        marginBottom: "0.5rem",
                      }}
                    >
                      72hrs
                    </div>
                    <p style={{ color: "#6b7280", fontSize: "1.1rem" }}>
                      Development Time
                    </p>
                  </div>
                  <div style={{ textAlign: "center" }}>
                    <div
                      style={{
                        fontSize: "3rem",
                        fontWeight: "bold",
                        color: "#f59e0b",
                        marginBottom: "0.5rem",
                      }}
                    >
                      2
                    </div>
                    <p style={{ color: "#6b7280", fontSize: "1.1rem" }}>
                      AI Models Deployed
                    </p>
                  </div>
                  <div style={{ textAlign: "center" }}>
                    <div
                      style={{
                        fontSize: "3rem",
                        fontWeight: "bold",
                        color: "#ef4444",
                        marginBottom: "0.5rem",
                      }}
                    >
                      100%
                    </div>
                    <p style={{ color: "#6b7280", fontSize: "1.1rem" }}>
                      Sustainability Focus
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Team Mission */}
            <section>
              <div
                style={{
                  background:
                    "linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)",
                  padding: "3rem 2rem",
                  borderRadius: "1.5rem",
                  textAlign: "center",
                  border: "2px solid #bbf7d0",
                }}
              >
                <h3
                  style={{
                    fontSize: "2rem",
                    fontWeight: "bold",
                    marginBottom: "1rem",
                    color: "#166534",
                  }}
                >
                  🌱 Our Mission
                </h3>
                <p
                  style={{
                    fontSize: "1.2rem",
                    color: "#15803d",
                    lineHeight: "1.7",
                    maxWidth: "800px",
                    margin: "0 auto",
                  }}
                >
                  We believe technology should serve humanity and our planet.
                  Through EcoRetail AI, we're committed to creating innovative
                  solutions that help retailers reduce waste, minimize
                  environmental impact, and build a more sustainable future for
                  generations to come.
                </p>
                <div
                  style={{
                    marginTop: "2rem",
                    display: "flex",
                    justifyContent: "center",
                    gap: "1rem",
                    flexWrap: "wrap",
                  }}
                >
                  <span
                    style={{
                      background: "#16a34a",
                      color: "white",
                      padding: "0.5rem 1rem",
                      borderRadius: "2rem",
                      fontSize: "0.9rem",
                      fontWeight: "600",
                    }}
                  >
                    🌍 Environmental Impact
                  </span>
                  <span
                    style={{
                      background: "#16a34a",
                      color: "white",
                      padding: "0.5rem 1rem",
                      borderRadius: "2rem",
                      fontSize: "0.9rem",
                      fontWeight: "600",
                    }}
                  >
                    🤖 AI Innovation
                  </span>
                  <span
                    style={{
                      background: "#16a34a",
                      color: "white",
                      padding: "0.5rem 1rem",
                      borderRadius: "2rem",
                      fontSize: "0.9rem",
                      fontWeight: "600",
                    }}
                  >
                    🚀 Scalable Solutions
                  </span>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* Future Scope Tab */}
        {activeTab === "future" && (
          <div>
            <h2
              style={{
                fontSize: "2.5rem",
                fontWeight: "bold",
                marginBottom: "2rem",
                textAlign: "center",
                color: "#1f2937",
              }}
            >
              🚀 Future Scope & Research
            </h2>

            {/* Planned Features */}
            <section style={{ marginBottom: "4rem" }}>
              <h3
                style={{
                  fontSize: "2rem",
                  fontWeight: "bold",
                  marginBottom: "2rem",
                  textAlign: "center",
                  color: "#f59e0b",
                }}
              >
                🔮 Upcoming Features
              </h3>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                  gap: "2rem",
                  marginBottom: "3rem",
                }}
              >
                {[
                  {
                    icon: "🚚",
                    title: "Green Logistics Optimization",
                    description:
                      "AI-powered route optimization to minimize transportation emissions and packaging waste",
                  },
                  {
                    icon: "🔄",
                    title: "Circular Economy Integration",
                    description:
                      "Closed-loop recycling systems and product lifecycle management for zero waste",
                  },
                  {
                    icon: "⚡",
                    title: "Smart Energy Management",
                    description:
                      "IoT-enabled energy optimization for stores and warehouses with renewable integration",
                  },
                  {
                    icon: "📱",
                    title: "Consumer Sustainability App",
                    description:
                      "Mobile app for customers to track their environmental impact and make eco-conscious choices",
                  },
                  {
                    icon: "🌍",
                    title: "Global Supply Chain Tracking",
                    description:
                      "End-to-end visibility of carbon footprint across international supply chains",
                  },
                  {
                    icon: "🤝",
                    title: "Supplier Sustainability Network",
                    description:
                      "Platform connecting retailers with verified sustainable suppliers and vendors",
                  },
                ].map((feature, index) => (
                  <div
                    key={index}
                    style={{
                      background: "white",
                      padding: "2rem",
                      borderRadius: "1.5rem",
                      boxShadow: "0 4px 6px rgba(0,0,0,0.05)",
                      border: "2px solid #fbbf24",
                      textAlign: "center",
                    }}
                  >
                    <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>
                      {feature.icon}
                    </div>
                    <h4
                      style={{
                        fontSize: "1.25rem",
                        fontWeight: "bold",
                        marginBottom: "1rem",
                        color: "#1f2937",
                      }}
                    >
                      {feature.title}
                    </h4>
                    <p style={{ color: "#6b7280", lineHeight: "1.6" }}>
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Search Section */}
            <div
              style={{
                background: "white",
                padding: "2rem",
                borderRadius: "1.5rem",
                boxShadow: "0 4px 6px rgba(0,0,0,0.05)",
                marginBottom: "2rem",
                border: "1px solid #f3f4f6",
              }}
            >
              <h3
                style={{
                  fontSize: "1.5rem",
                  fontWeight: "bold",
                  marginBottom: "1rem",
                  color: "#1f2937",
                }}
              >
                🔍 Research Latest Sustainability Solutions
              </h3>
              <div
                style={{
                  display: "flex",
                  gap: "1rem",
                  marginBottom: "1rem",
                  flexWrap: "wrap",
                }}
              >
                <input
                  type="text"
                  placeholder="Search for sustainability innovations, green tech, or eco-friendly solutions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                  style={{
                    flex: "1",
                    minWidth: "300px",
                    padding: "0.75rem",
                    border: "2px solid #e5e7eb",
                    borderRadius: "3rem",
                    fontSize: "1rem",
                  }}
                />
                <button
                  onClick={handleSearch}
                  disabled={loading}
                  style={{
                    background:
                      "linear-gradient(135deg, #16a34a 0%, #22c55e 100%)",
                    color: "white",
                    border: "none",
                    padding: "0.75rem 1.5rem",
                    borderRadius: "3rem",
                    cursor: loading ? "not-allowed" : "pointer",
                    fontWeight: "600",
                    opacity: loading ? 0.7 : 1,
                  }}
                >
                  {loading ? "Searching..." : "🔍 Search"}
                </button>
              </div>

              {/* Search Results */}
              {searchResults.length > 0 && (
                <div style={{ marginTop: "2rem" }}>
                  <h4
                    style={{
                      fontSize: "1.25rem",
                      fontWeight: "bold",
                      marginBottom: "1rem",
                      color: "#1f2937",
                    }}
                  >
                    🌱 Sustainability Research Results
                  </h4>
                  <div
                    style={{
                      display: "grid",
                      gap: "1rem",
                    }}
                  >
                    {searchResults.slice(0, 5).map((result, index) => (
                      <div
                        key={index}
                        style={{
                          background: "#f9fafb",
                          padding: "1.5rem",
                          borderRadius: "1rem",
                          border: "1px solid #e5e7eb",
                        }}
                      >
                        <h5
                          style={{
                            fontSize: "1.1rem",
                            fontWeight: "bold",
                            marginBottom: "0.5rem",
                            color: "#1f2937",
                          }}
                        >
                          <a
                            href={result.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              color: "#16a34a",
                              textDecoration: "none",
                            }}
                          >
                            {result.title}
                          </a>
                        </h5>
                        <p
                          style={{
                            color: "#6b7280",
                            fontSize: "0.95rem",
                            marginBottom: "0.5rem",
                            lineHeight: "1.5",
                          }}
                        >
                          {result.snippet}
                        </p>
                        <span
                          style={{
                            color: "#9ca3af",
                            fontSize: "0.8rem",
                          }}
                        >
                          🌐 {result.displayLink}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Reference Links */}
            <div
              style={{
                background: "white",
                padding: "2rem",
                borderRadius: "1.5rem",
                boxShadow: "0 4px 6px rgba(0,0,0,0.05)",
                border: "1px solid #f3f4f6",
              }}
            >
              <h3
                style={{
                  fontSize: "1.5rem",
                  fontWeight: "bold",
                  marginBottom: "1rem",
                  color: "#1f2937",
                }}
              >
                📚 Key Resources & References
              </h3>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                  gap: "1rem",
                }}
              >
                <div
                  style={{
                    background: "#f0fdf4",
                    padding: "1.5rem",
                    borderRadius: "1rem",
                    border: "1px solid #bbf7d0",
                  }}
                >
                  <h4
                    style={{
                      fontWeight: "bold",
                      marginBottom: "0.5rem",
                      color: "#166534",
                    }}
                  >
                    🔗 GitHub Repository
                  </h4>
                  <p style={{ color: "#15803d", fontSize: "0.9rem" }}>
                    Complete source code and documentation for our sustainable
                    retail AI solution
                  </p>
                </div>
                <div
                  style={{
                    background: "#eff6ff",
                    padding: "1.5rem",
                    borderRadius: "1rem",
                    border: "1px solid #bfdbfe",
                  }}
                >
                  <h4
                    style={{
                      fontWeight: "bold",
                      marginBottom: "0.5rem",
                      color: "#1e40af",
                    }}
                  >
                    📊 Walmart AI Waste Reduction
                  </h4>
                  <p style={{ color: "#1d4ed8", fontSize: "0.9rem" }}>
                    Official Walmart Global Tech blog on AI-powered waste
                    management strategies
                  </p>
                </div>
                <div
                  style={{
                    background: "#fefbeb",
                    padding: "1.5rem",
                    borderRadius: "1rem",
                    border: "1px solid #fde68a",
                  }}
                >
                  <h4
                    style={{
                      fontWeight: "bold",
                      marginBottom: "0.5rem",
                      color: "#92400e",
                    }}
                  >
                    🌱 Sustainability Research
                  </h4>
                  <p style={{ color: "#a16207", fontSize: "0.9rem" }}>
                    Latest research on retail sustainability, circular economy,
                    and green logistics
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer
        style={{
          background: "linear-gradient(135deg, #1f2937 0%, #111827 100%)",
          color: "white",
          padding: "3rem 0",
          marginTop: "4rem",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "0 1rem",
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontSize: "1.8rem",
              fontWeight: "bold",
              marginBottom: "1rem",
              background: "linear-gradient(45deg, #22c55e, #16a34a)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            🌱 EcoRetail AI - Walmart Sparkathon 2024
          </div>
          <p
            style={{
              color: "#9ca3af",
              marginBottom: "2rem",
              fontSize: "1.1rem",
            }}
          >
            Building a sustainable and responsible future for retail through AI
            innovation
          </p>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "2rem",
              flexWrap: "wrap",
            }}
          >
            <a href="https://github.com/itsvinitlunia/Sparkathon_Team" target="_blank" rel="noopener noreferrer" style={{ color: "#9ca3af", textDecoration: "none" }}>GitHub Repository</a>
            <a href="/" style={{ color: "#9ca3af", textDecoration: "none" }}>Live Demo</a>
            <a href="#team" style={{ color: "#9ca3af", textDecoration: "none" }}>Team Portfolio</a>
            <a href="#contact" style={{ color: "#9ca3af", textDecoration: "none" }}>Contact Us</a>
          </div>
          <div
            style={{
              marginTop: "2rem",
              padding: "1rem",
              background: "rgba(34, 197, 94, 0.1)",
              borderRadius: "0.5rem",
              color: "#16a34a",
              fontSize: "0.9rem",
            }}
          >
            💚 Committed to creating positive environmental impact through
            technology innovation
          </div>
        </div>
      </footer>
    </div>
  );
}

export default MainComponent;