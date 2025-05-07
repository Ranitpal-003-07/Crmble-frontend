/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaRocket,FaBullhorn, FaChartLine, FaUsers, FaRegLightbulb, FaGoogle, FaEnvelope, FaLock, FaUser } from 'react-icons/fa';
import '../styles/Home.css';
import Logo from '../components/Logo';

const Home = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showRegister, setShowRegister] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle registration logic here
    console.log('Registration submitted:', { name, email, password });
  };

  const toggleForm = () => {
    setShowRegister(!showRegister);
  };

  return (
    <div className="home-container">
      {/* Header */}
      <header className="header">
        <div className="logo-container">
          {/* Logo placeholder */}
          <Logo size="medium" />
        </div>
        
        <nav className="main-nav">
          <ul>
            <li><a href="#features">Features</a></li>
            <li><a href="#benefits">Benefits</a></li>
            <li><a href="#testimonials">Testimonials</a></li>
          </ul>
        </nav>
        
        <div className="auth-buttons">
          <button className="login-btn" onClick={toggleForm}>
            {showRegister ? 'Back to Login' : 'Login'}
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <motion.h1 
            className="hero-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Simplify Customer Relationships with <span className="highlight">Crmble</span>
          </motion.h1>
          
          <motion.p 
            className="hero-subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            The intelligent CRM platform that helps you segment customers, create personalized campaigns, 
            and gain actionable insights with AI-powered analytics.
          </motion.p>
          
          <motion.div 
            className="hero-cta"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <button className="cta-btn primary" onClick={() => setShowRegister(true)}>
              Get Started Free
            </button>
            <button className="cta-btn secondary">
              Watch Demo
            </button>
          </motion.div>
        </div>

        <motion.div 
          className="hero-image"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          <img src="/dashboard-preview.png" alt="Crmble Dashboard Preview" />
        </motion.div>
      </section>

      {/* Registration/Login Form Modal */}
      {(showRegister) && (
        <motion.div 
          className="auth-modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div 
            className="auth-form-container"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <h2>{showRegister ? 'Create an Account' : 'Welcome Back'}</h2>
            
            <form onSubmit={handleSubmit} className="auth-form">
              {showRegister && (
                <div className="form-group">
                  <label htmlFor="name"><FaUser /> Full Name</label>
                  <input 
                    type="text" 
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your full name"
                    required
                  />
                </div>
              )}
              
              <div className="form-group">
                <label htmlFor="email"><FaEnvelope /> Email</label>
                <input 
                  type="email" 
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="password"><FaLock /> Password</label>
                <input 
                  type="password" 
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                />
              </div>
              
              <button type="submit" className="submit-btn">
                {showRegister ? 'Sign Up' : 'Sign In'}
              </button>
            </form>
            
            <div className="auth-divider">
              <span>OR</span>
            </div>
            
            <button className="google-auth-btn">
              <FaGoogle /> Continue with Google
            </button>
            
            <p className="auth-toggle">
              {showRegister 
                ? 'Already have an account? ' 
                : "Don't have an account? "}
              <button onClick={toggleForm} className="toggle-link">
                {showRegister ? 'Sign In' : 'Sign Up'}
              </button>
            </p>
            
            <button className="close-modal" onClick={() => setShowRegister(false)}>
              &times;
            </button>
          </motion.div>
        </motion.div>
      )}

      {/* Features Section */}
      <section id="features" className="features-section">
        <div className="section-header">
          <h2>Key Features</h2>
          <p>Everything you need to manage your customer relationships effectively</p>
        </div>
        
        <div className="features-grid">
          <motion.div 
            className="feature-card"
            whileHover={{ y: -10, boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}
          >
            <div className="feature-icon">
              <FaUsers />
            </div>
            <h3>Advanced Segmentation</h3>
            <p>Create precise customer segments with flexible rule logic to target the right audience.</p>
          </motion.div>
          
          <motion.div 
            className="feature-card"
            whileHover={{ y: -10, boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}
          >
            <div className="feature-icon">
              <FaBullhorn />
            </div>
            <h3>Campaign Management</h3>
            <p>Design, schedule, and track your campaigns with a user-friendly interface.</p>
          </motion.div>
          
          <motion.div 
            className="feature-card"
            whileHover={{ y: -10, boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}
          >
            <div className="feature-icon">
              <FaChartLine />
            </div>
            <h3>Analytics Dashboard</h3>
            <p>Get real-time insights into campaign performance and customer behavior patterns.</p>
          </motion.div>
          
          <motion.div 
            className="feature-card"
            whileHover={{ y: -10, boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}
          >
            <div className="feature-icon">
              <FaRegLightbulb />
            </div>
            <h3>AI-Powered Insights</h3>
            <p>Leverage artificial intelligence to get intelligent recommendations and predictions.</p>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="benefits-section">
        <div className="section-header">
          <h2>Why Choose Crmble?</h2>
          <p>Our platform is designed with your business growth in mind</p>
        </div>
        
        <div className="benefits-container">
          <div className="benefit-content">
            <h3>Boost Customer Engagement</h3>
            <p>
              With Crmble's personalized campaigns, you can increase customer engagement by up to 
              75% by delivering the right message at the right time through the right channel.
            </p>
            
            <h3>Save Time and Resources</h3>
            <p>
              Automate repetitive tasks and streamline your workflow. Our clients report saving 
              15+ hours per week on campaign management and customer segmentation.
            </p>
            
            <h3>Data-Driven Decisions</h3>
            <p>
              Make informed decisions based on actionable insights generated by our AI-powered 
              analytics engine that processes millions of data points in seconds.
            </p>
            
            <button className="cta-btn primary">
              Start Your Free Trial
            </button>
          </div>
          
          <div className="benefit-image">
            <img src="/benefits-illustration.png" alt="Crmble Benefits" />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="testimonials-section">
        <div className="section-header">
          <h2>What Our Users Say</h2>
          <p>Join thousands of successful businesses using Crmble</p>
        </div>
        
        <div className="testimonials-carousel">
          <div className="testimonial-card">
            <div className="testimonial-content">
              <p>
                "Crmble has transformed how we connect with our customers. The segmentation 
                capabilities are unmatched, and the AI insights have helped us increase 
                our conversion rates by 40%."
              </p>
            </div>
            <div className="testimonial-author">
              <img src="/avatar1.png" alt="Sarah Johnson" />
              <div>
                <h4>Sarah Johnson</h4>
                <p>Marketing Director, TechVision</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>Ready to Transform Your Customer Relationships?</h2>
          <p>
            Join thousands of businesses already using Crmble to grow their customer base 
            and increase revenue.
          </p>
          <div className="cta-buttons">
            <button className="cta-btn primary" onClick={() => setShowRegister(true)}>
              Get Started Free
            </button>
            <button className="cta-btn secondary">
              Schedule a Demo
            </button>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-logo">
            <span className="logo-text">Crmble</span>
            <p>The intelligent CRM platform</p>
          </div>
          
          <div className="footer-links">
            <div className="footer-column">
              <h4>Product</h4>
              <ul>
                <li><a href="#features">Features</a></li>
                <li><a href="#pricing">Pricing</a></li>
                <li><a href="#security">Security</a></li>
                <li><a href="#enterprise">Enterprise</a></li>
              </ul>
            </div>
            
            <div className="footer-column">
              <h4>Resources</h4>
              <ul>
                <li><a href="#blog">Blog</a></li>
                <li><a href="#guides">Guides</a></li>
                <li><a href="#webinars">Webinars</a></li>
                <li><a href="#api">API Docs</a></li>
              </ul>
            </div>
            
            <div className="footer-column">
              <h4>Company</h4>
              <ul>
                <li><a href="#about">About Us</a></li>
                <li><a href="#careers">Careers</a></li>
                <li><a href="#contact">Contact</a></li>
                <li><a href="#partners">Partners</a></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2025 Crmble. All rights reserved.</p>
          <div className="footer-legal">
            <a href="#terms">Terms of Service</a>
            <a href="#privacy">Privacy Policy</a>
            <a href="#cookies">Cookie Policy</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;