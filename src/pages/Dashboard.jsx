import { useState } from 'react';
import { LineChart, BarChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { PieChart, Pie, Cell } from 'recharts';
import { Users, Mail, Bell, MessageSquare, BarChart2, PieChart as PieChartIcon, Settings, Menu, Search, ChevronDown, Plus, ArrowUpRight, Calendar, Clock, User } from 'lucide-react';

// Sample data
const campaignData = [
  { name: 'Jan', sent: 400, delivered: 380, clicked: 210 },
  { name: 'Feb', sent: 380, delivered: 350, clicked: 240 },
  { name: 'Mar', sent: 500, delivered: 490, clicked: 300 },
  { name: 'Apr', sent: 620, delivered: 600, clicked: 320 },
  { name: 'May', sent: 700, delivered: 680, clicked: 400 },
  { name: 'Jun', sent: 550, delivered: 540, clicked: 350 },
];

const customerData = [
  { name: 'Premium', value: 35 },
  { name: 'Standard', value: 45 },
  { name: 'Basic', value: 20 },
];

const COLORS = ['#6366F1', '#10B981', '#8B5CF6', '#EC4899'];

const recentCampaigns = [
  { id: 1, name: 'Summer Sale', sent: 2500, delivered: 2450, success: 98, status: 'Active' },
  { id: 2, name: 'New Product Launch', sent: 1800, delivered: 1750, success: 97, status: 'Scheduled' },
  { id: 3, name: 'Customer Win-back', sent: 1200, delivered: 1150, success: 96, status: 'Completed' },
];

// CSS styles for the component
const styles = `
  .dashboard-container {
    font-family: 'Inter', sans-serif;
    background: #F9FAFB;
    border-radius: 16px;
    overflow: hidden;
  }
  
  .glassmorphism {
    background: rgba(255, 255, 255, 0.85);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.18);
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.19);
  }
  
  .gradient-bg {
    background: linear-gradient(115deg, #4F46E5, #6366F1, #818CF8);
  }
  
  .gradient-text {
    background: linear-gradient(90deg, #4F46E5, #8B5CF6);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  
  .stat-card {
    position: relative;
    overflow: hidden;
    transition: all 0.3s ease;
  }
  
  .stat-card:hover {
    transform: translateY(-4px);
  }
  
  .stat-card::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 3px;
    background: linear-gradient(90deg, #4F46E5, #8B5CF6);
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.3s ease;
  }
  
  .stat-card:hover::after {
    transform: scaleX(1);
  }
  
  .chart-container {
    transition: all 0.3s ease;
  }
  
  .chart-container:hover {
    box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
  }
  
  .tab-button {
    position: relative;
    transition: all 0.2s ease;
  }
  
  .tab-button::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 50%;
    width: 0;
    height: 2px;
    background: #4F46E5;
    transform: translateX(-50%);
    transition: width 0.2s ease;
  }
  
  .tab-button.active::after {
    width: 70%;
  }
  
  .campaign-row {
    transition: all 0.2s ease;
  }
  
  .campaign-row:hover {
    background-color: #F3F4F6;
  }
  
  .search-input {
    transition: all 0.3s ease;
  }
  
  .search-input:focus {
    box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.2);
  }
  
  .pill {
    border-radius: 9999px;
    padding: 2px 10px;
    font-size: 0.75rem;
    font-weight: 500;
  }
  
  .pill-active {
    background-color: rgba(16, 185, 129, 0.1);
    color: #10B981;
  }
  
  .pill-scheduled {
    background-color: rgba(99, 102, 241, 0.1);
    color: #6366F1;
  }
  
  .pill-completed {
    background-color: rgba(107, 114, 128, 0.1);
    color: #6B7280;
  }
  
  @keyframes pulse {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.7;
    }
  }
  
  .notification-indicator {
    animation: pulse 2s infinite;
  }
`;

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <>
      {/* External CSS */}
      <style>{styles}</style>
      
      <div className="dashboard-container shadow-2xl">
        {/* Dashboard Layout */}
        <div className="flex">
          {/* Sidebar */}
          <div className="w-16 lg:w-64 bg-white border-r border-gray-100 shadow-sm hidden md:flex flex-col">
            <div className="p-4 flex items-center justify-center lg:justify-start space-x-3">
              <div className="w-10 h-10 gradient-bg rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">C</span>
              </div>
              <h2 className="font-bold text-lg hidden lg:block">Crmble</h2>
            </div>
            
            <div className="flex-1 px-3 py-6 space-y-1">
              <button className="w-full flex items-center p-3 text-left rounded-lg bg-indigo-50 text-indigo-700">
                <BarChart2 size={20} className="flex-shrink-0" />
                <span className="ml-3 hidden lg:block font-medium">Dashboard</span>
              </button>
              
              <button className="w-full flex items-center p-3 text-left rounded-lg text-gray-600 hover:bg-gray-50">
                <Mail size={20} className="flex-shrink-0" />
                <span className="ml-3 hidden lg:block">Campaigns</span>
              </button>
              
              <button className="w-full flex items-center p-3 text-left rounded-lg text-gray-600 hover:bg-gray-50">
                <Users size={20} className="flex-shrink-0" />
                <span className="ml-3 hidden lg:block">Customers</span>
              </button>
              
              <button className="w-full flex items-center p-3 text-left rounded-lg text-gray-600 hover:bg-gray-50">
                <PieChartIcon size={20} className="flex-shrink-0" />
                <span className="ml-3 hidden lg:block">Analytics</span>
              </button>
              
              <button className="w-full flex items-center p-3 text-left rounded-lg text-gray-600 hover:bg-gray-50">
                <Settings size={20} className="flex-shrink-0" />
                <span className="ml-3 hidden lg:block">Settings</span>
              </button>
            </div>
            
            <div className="p-4 border-t border-gray-100">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                  <User size={18} className="text-gray-600" />
                </div>
                <div className="hidden lg:block">
                  <p className="font-medium text-sm">John Doe</p>
                  <p className="text-xs text-gray-500">Admin</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="flex-1">
            {/* Dashboard Header */}
            <div className="glassmorphism p-4 border-b border-gray-100 flex justify-between items-center">
              <div className="flex items-center">
                <button className="md:hidden mr-3 text-gray-500">
                  <Menu size={20} />
                </button>
                <h1 className="text-xl font-bold gradient-text">Dashboard Overview</h1>
              </div>
              
              <div className="flex items-center space-x-5">
                <div className="relative hidden md:block">
                  <input 
                    type="text" 
                    placeholder="Search..." 
                    className="search-input bg-gray-50 border border-gray-200 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-indigo-300"
                  />
                  <Search size={16} className="absolute left-3 top-2.5 text-gray-400" />
                </div>
                
                <button className="hidden sm:flex items-center space-x-1 text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-full text-sm font-medium hover:bg-indigo-100 transition-colors">
                  <Plus size={16} />
                  <span>New Campaign</span>
                </button>
                
                <div className="relative">
                  <button className="text-gray-500 hover:text-gray-700">
                    <Bell size={20} />
                    <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full notification-indicator"></span>
                  </button>
                </div>
                
                <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-medium text-sm">JD</span>
                </div>
              </div>
            </div>
            
            {/* Dashboard Content */}
            <div className="p-6">
              {/* Date and Tabs */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
                <div className="mb-4 sm:mb-0">
                  <p className="text-sm text-gray-500 flex items-center">
                    <Calendar size={14} className="mr-1" />
                    Wednesday, May 7, 2025
                  </p>
                </div>
                
                <div className="flex space-x-1 border-b border-gray-200 w-full sm:w-auto">
                  <button 
                    className={`tab-button px-4 py-2 text-sm ${activeTab === 'overview' ? 'active text-indigo-600 font-medium' : 'text-gray-600'}`}
                    onClick={() => setActiveTab('overview')}
                  >
                    Overview
                  </button>
                  <button 
                    className={`tab-button px-4 py-2 text-sm ${activeTab === 'campaigns' ? 'active text-indigo-600 font-medium' : 'text-gray-600'}`}
                    onClick={() => setActiveTab('campaigns')}
                  >
                    Campaigns
                  </button>
                  <button 
                    className={`tab-button px-4 py-2 text-sm ${activeTab === 'customers' ? 'active text-indigo-600 font-medium' : 'text-gray-600'}`}
                    onClick={() => setActiveTab('customers')}
                  >
                    Customers
                  </button>
                </div>
              </div>
              
              {/* Stats Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                <div className="stat-card glassmorphism p-6 rounded-xl">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-gray-700 font-medium">Total Customers</h3>
                    <div className="w-10 h-10 flex items-center justify-center bg-indigo-100 rounded-lg">
                      <Users size={20} className="text-indigo-600" />
                    </div>
                  </div>
                  <div>
                    <p className="text-3xl font-bold mb-1">15,283</p>
                    <div className="flex items-center text-green-500 text-sm">
                      <ArrowUpRight size={16} className="mr-1" />
                      <span>+12% from last month</span>
                    </div>
                  </div>
                </div>
                
                <div className="stat-card glassmorphism p-6 rounded-xl">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-gray-700 font-medium">Active Campaigns</h3>
                    <div className="w-10 h-10 flex items-center justify-center bg-green-100 rounded-lg">
                      <Mail size={20} className="text-green-600" />
                    </div>
                  </div>
                  <div>
                    <p className="text-3xl font-bold mb-1">24</p>
                    <p className="text-gray-500 text-sm flex items-center">
                      <Calendar size={14} className="mr-1" />
                      <span>6 scheduled for next week</span>
                    </p>
                  </div>
                </div>
                
                <div className="stat-card glassmorphism p-6 rounded-xl">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-gray-700 font-medium">Avg. Open Rate</h3>
                    <div className="w-10 h-10 flex items-center justify-center bg-purple-100 rounded-lg">
                      <BarChart2 size={20} className="text-purple-600" />
                    </div>
                  </div>
                  <div>
                    <p className="text-3xl font-bold mb-1">38.2%</p>
                    <div className="flex items-center text-green-500 text-sm">
                      <ArrowUpRight size={16} className="mr-1" />
                      <span>+2.4% from previous</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <div className="chart-container glassmorphism p-6 rounded-xl">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-medium text-gray-700">Campaign Performance</h3>
                    <div className="flex items-center">
                      <div className="flex space-x-1 mr-3">
                        <div className="w-3 h-3 rounded-full bg-indigo-500"></div>
                        <span className="text-xs text-gray-500">Sent</span>
                      </div>
                      <div className="flex space-x-1 mr-3">
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        <span className="text-xs text-gray-500">Delivered</span>
                      </div>
                      <div className="flex space-x-1">
                        <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                        <span className="text-xs text-gray-500">Clicked</span>
                      </div>
                    </div>
                  </div>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={campaignData}>
                        <defs>
                          <linearGradient id="sentGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#6366F1" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#6366F1" stopOpacity={0}/>
                          </linearGradient>
                          <linearGradient id="deliveredGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis dataKey="name" stroke="#9CA3AF" fontSize={12} />
                        <YAxis stroke="#9CA3AF" fontSize={12} />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                            borderRadius: '8px',
                            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                            border: 'none'
                          }} 
                        />
                        <Line 
                          type="monotone" 
                          dataKey="sent" 
                          stroke="#6366F1" 
                          strokeWidth={2} 
                          dot={{ r: 4 }}
                          activeDot={{ r: 6 }}
                          fill="url(#sentGradient)"
                        />
                        <Line 
                          type="monotone" 
                          dataKey="delivered" 
                          stroke="#10B981" 
                          strokeWidth={2} 
                          dot={{ r: 4 }}
                          activeDot={{ r: 6 }}
                          fill="url(#deliveredGradient)"
                        />
                        <Line 
                          type="monotone" 
                          dataKey="clicked" 
                          stroke="#8B5CF6" 
                          strokeWidth={2}
                          dot={{ r: 4 }}
                          activeDot={{ r: 6 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                
                <div className="chart-container glassmorphism p-6 rounded-xl">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-medium text-gray-700">Customer Segments</h3>
                    <button className="text-xs text-indigo-600 flex items-center hover:underline">View Details <ChevronDown size={14} className="ml-1" /></button>
                  </div>
                  <div className="h-64 flex items-center justify-center">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <defs>
                          {COLORS.map((color, index) => (
                            <linearGradient key={`gradient-${index}`} id={`colorGradient-${index}`} x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor={color} stopOpacity={0.9}/>
                              <stop offset="100%" stopColor={color} stopOpacity={0.7}/>
                            </linearGradient>
                          ))}
                        </defs>
                        <Pie
                          data={customerData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          innerRadius={50}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          paddingAngle={5}
                        >
                          {customerData.map((entry, index) => (
                            <Cell 
                              key={`cell-${index}`} 
                              fill={`url(#colorGradient-${index})`} 
                              stroke={COLORS[index % COLORS.length]}
                              strokeWidth={1}
                            />
                          ))}
                        </Pie>
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                            borderRadius: '8px',
                            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                            border: 'none'
                          }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
              
              {/* Recent Campaigns */}
              <div className="glassmorphism p-6 rounded-xl">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-medium text-gray-700">Recent Campaigns</h3>
                  <button className="text-sm text-indigo-600 flex items-center hover:underline">View All <ChevronDown size={14} className="ml-1" /></button>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead>
                      <tr className="border-b border-gray-100">
                        <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Campaign</th>
                        <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sent</th>
                        <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Delivered</th>
                        <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Success Rate</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentCampaigns.map((campaign) => (
                        <tr key={campaign.id} className="campaign-row">
                          <td className="px-3 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="w-8 h-8 flex-shrink-0 mr-3 rounded-md bg-indigo-100 flex items-center justify-center">
                                <Mail size={14} className="text-indigo-600" />
                              </div>
                              <div>
                                <p className="text-sm font-medium text-gray-900">{campaign.name}</p>
                                <p className="text-xs text-gray-500 flex items-center">
                                  <Clock size={12} className="mr-1" />
                                  Last updated 2 days ago
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="px-3 py-4 whitespace-nowrap">
                            <span className={`pill ${
                              campaign.status === 'Active' ? 'pill-active' : 
                              campaign.status === 'Scheduled' ? 'pill-scheduled' : 
                              'pill-completed'
                            }`}>
                              {campaign.status}
                            </span>
                          </td>
                          <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-600">{campaign.sent.toLocaleString()}</td>
                          <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-600">{campaign.delivered.toLocaleString()}</td>
                          <td className="px-3 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="w-full bg-gray-100 rounded-full h-2">
                                <div 
                                  className="h-2 rounded-full" 
                                  style={{ 
                                    width: `${campaign.success}%`,
                                    background: 'linear-gradient(90deg, #10B981, #6EE7B7)'
                                  }}
                                ></div>
                              </div>
                              <span className="ml-2 text-sm font-medium text-gray-600">{campaign.success}%</span>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}