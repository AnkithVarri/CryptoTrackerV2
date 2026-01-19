import { useState, useEffect, useRef } from 'react';
import { ChevronDown, ChevronUp, X, TrendingUp, TrendingDown, DollarSign, BarChart3, Shield, Zap, Users, Globe } from 'lucide-react';
import axios from 'axios';

const API_URL = 'http://localhost:5001';

export default function App() {
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showRegisterModal, setShowRegisterModal] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
  const [visibleSections, setVisibleSections] = useState(new Set());
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [registerForm, setRegisterForm] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const sectionRefs = useRef([]);


  // Check if user is logged in on mount
  useEffect(() => {
        const token = localStorage.getItem('token');
    if (token) {
      axios.get(`${API_URL}/api/auth/verify`, {
                headers: { Authorization: `Bearer ${token}` }
            })
            .then(res => {
                setIsLoggedIn(true);
                setUser(res.data.user);
            })
      .catch(() => {
                localStorage.removeItem('token');
            });
        }
  }, []);
  

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observers = sectionRefs.current.map((ref, index) => {
      if (!ref) return null;
      
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              setVisibleSections(prev => new Set([...prev, index]));
            }
          });
        },
        { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
      );
      
      observer.observe(ref);
      return observer;
    });

    return () => {
      observers.forEach(obs => obs?.disconnect());
    };
  }, []);



  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await axios.post(`${API_URL}/api/auth/login`, loginForm);
      localStorage.setItem('token', res.data.token);
      setIsLoggedIn(true);
      setUser(res.data.user);
      setShowLoginModal(false);
      setLoginForm({ email: '', password: '' });
    } catch (err) {
      console.error('Login error:', err);
      let errorMessage = 'Login failed. ';
      
      if (err.code === 'ECONNREFUSED' || err.message.includes('Network Error')) {
        errorMessage += 'Cannot connect to server. Make sure the backend server is running on port 5000.';
      } else if (err.response?.data?.error) {
        errorMessage = err.response.data.error;
      } else if (err.message) {
        errorMessage += err.message;
      } else {
        errorMessage += 'Please check your connection and try again.';
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };



  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await axios.post(`${API_URL}/api/auth/register`, registerForm);
      localStorage.setItem('token', res.data.token);
      setIsLoggedIn(true);
      setUser(res.data.user);
      setShowRegisterModal(false);
      setRegisterForm({ username: '', email: '', password: '' });
    } catch (err) {
      console.error('Registration error:', err);
      let errorMessage = 'Registration failed. ';
      
      if (err.code === 'ECONNREFUSED' || err.message.includes('Network Error')) {
        errorMessage += 'Cannot connect to server. Make sure the backend server is running on port 5000.';
      } else if (err.response?.data?.error) {
        errorMessage = err.response.data.error;
      } else if (err.message) {
        errorMessage += err.message;
      } else {
        errorMessage += 'Please check your connection and try again.';
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };



  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setUser(null);
  };


  // Information on the Website

  const cryptoData = [
    { name: 'Bitcoin', symbol: 'BTC', price: '$43,250', change: '+2.5%', trend: 'up' },
    { name: 'Ethereum', symbol: 'ETH', price: '$2,680', change: '+1.8%', trend: 'up' },
    { name: 'Solana', symbol: 'SOL', price: '$98.50', change: '-0.5%', trend: 'down' },
    { name: 'Cardano', symbol: 'ADA', price: '$0.52', change: '+3.2%', trend: 'up' },
  ];

  const features = [
    { icon: <Shield className="w-8 h-8" />, title: 'Secure Trading', desc: 'Bank-level security for all transactions' },
    { icon: <Zap className="w-8 h-8" />, title: 'Lightning Fast', desc: 'Real-time updates and instant execution' },
    { icon: <BarChart3 className="w-8 h-8" />, title: 'Advanced Analytics', desc: 'Deep insights into market trends' },
    { icon: <Globe className="w-8 h-8" />, title: 'Global Access', desc: 'Trade from anywhere in the world' },
  ];




//The actual Front-end/UI Part
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-x-hidden">
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-white/5 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <DollarSign className="w-8 h-8 text-purple-400" />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              CryptoV2
            </h1>
          </div>
          
          <div className="flex items-center gap-4">
            {isLoggedIn ? (
              <>
                <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
                  <Users className="w-5 h-5 text-purple-300" />
                  <span className="text-sm font-medium">{user?.username}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="px-6 py-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition-all duration-300 font-medium shadow-lg shadow-purple-500/50"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => setShowLoginModal(true)}
                  className="px-6 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300 font-medium"
                >
                  Login
                </button>
                <button
                  onClick={() => setShowRegisterModal(true)}
                  className="px-6 py-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition-all duration-300 font-medium shadow-lg shadow-purple-500/50"
                >
                  Register
                </button>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 px-6">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-transparent to-pink-500/20 blur-3xl"></div>
        
        <div className={`relative z-10 text-center max-w-4xl transition-all duration-1000 ${visibleSections.has(0) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
             ref={el => sectionRefs.current[0] = el}>
          <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent animate-gradient">
            Track Crypto Markets
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8">
            Real-time cryptocurrency tracking with advanced analytics
          </p>
          <div className="flex gap-4 justify-center">
            <button className="px-8 py-4 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition-all duration-300 font-semibold text-lg shadow-2xl shadow-purple-500/50 hover:scale-105">
              Get Started
            </button>
            <button className="px-8 py-4 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300 font-semibold text-lg">
              Learn More
            </button>
          </div>
        </div>

        <div className="absolute bottom-10 animate-bounce">
          <ChevronDown className="w-8 h-8 text-purple-400" />
        </div>
      </section>

      {/* Crypto Cards Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className={`text-4xl md:text-5xl font-bold text-center mb-12 transition-all duration-1000 ${visibleSections.has(1) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              ref={el => sectionRefs.current[1] = el}>
            Top Cryptocurrencies
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {cryptoData.map((crypto, index) => (
              <div
                key={index}
                ref={el => sectionRefs.current[2 + index] = el}
                className={`backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20 ${
                  visibleSections.has(2 + index) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold">{crypto.name}</h3>
                  <span className="text-sm text-gray-400">{crypto.symbol}</span>
                </div>
                <div className="text-3xl font-bold mb-2">{crypto.price}</div>
                <div className={`flex items-center gap-2 ${crypto.trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
                  {crypto.trend === 'up' ? <TrendingUp className="w-5 h-5" /> : <TrendingDown className="w-5 h-5" />}
                  <span className="font-semibold">{crypto.change}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className={`text-4xl md:text-5xl font-bold text-center mb-12 transition-all duration-1000 ${visibleSections.has(6) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              ref={el => sectionRefs.current[6] = el}>
            Why Choose CryptoV2?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                ref={el => sectionRefs.current[7 + index] = el}
                className={`backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-8 text-center hover:bg-white/15 transition-all duration-500 hover:scale-105 ${
                  visibleSections.has(7 + index) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="text-purple-400 mb-4 flex justify-center">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div
            ref={el => sectionRefs.current[11] = el}
            className={`backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-12 transition-all duration-1000 ${
              visibleSections.has(11) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-5xl font-bold text-purple-400 mb-2">$2.5T+</div>
                <div className="text-gray-400">Total Market Cap</div>
              </div>
              <div>
                <div className="text-5xl font-bold text-pink-400 mb-2">10M+</div>
                <div className="text-gray-400">Active Users</div>
              </div>
              <div>
                <div className="text-5xl font-bold text-purple-400 mb-2">150+</div>
                <div className="text-gray-400">Supported Coins</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm bg-black/50">
          <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-8 max-w-md w-full relative">
            <button
              onClick={() => {
                setShowLoginModal(false);
                setError('');
                setLoginForm({ email: '', password: '' });
              }}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Login
            </h2>
            
            {error && (
              <div className="mb-4 p-3 rounded-lg bg-red-500/20 border border-red-500/50 text-red-300 text-sm">
                {error}
              </div>
            )}
            
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  value={loginForm.email}
                  onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg backdrop-blur-sm bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Password</label>
                <input
                  type="password"
                  value={loginForm.password}
                  onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg backdrop-blur-sm bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                  required
                />
              </div>
              
              <button
                type="submit"
                disabled={loading}
                className="w-full px-6 py-3 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition-all duration-300 font-semibold shadow-lg shadow-purple-500/50 disabled:opacity-50"
              >
                {loading ? 'Logging in...' : 'Login'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Register Modal */}
      {showRegisterModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm bg-black/50">
          <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-8 max-w-md w-full relative">
            <button
              onClick={() => {
                setShowRegisterModal(false);
                setError('');
                setRegisterForm({ username: '', email: '', password: '' });
              }}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Register
            </h2>
            
            {error && (
              <div className="mb-4 p-3 rounded-lg bg-red-500/20 border border-red-500/50 text-red-300 text-sm">
                {error}
              </div>
            )}
            
            <form onSubmit={handleRegister} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Username</label>
                <input
                  type="text"
                  value={registerForm.username}
                  onChange={(e) => setRegisterForm({ ...registerForm, username: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg backdrop-blur-sm bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  value={registerForm.email}
                  onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg backdrop-blur-sm bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Password</label>
                <input
                  type="password"
                  value={registerForm.password}
                  onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg backdrop-blur-sm bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                  required
                  minLength={6}
                />
              </div>
              
              <button
                type="submit"
                disabled={loading}
                className="w-full px-6 py-3 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition-all duration-300 font-semibold shadow-lg shadow-purple-500/50 disabled:opacity-50"
              >
                {loading ? 'Registering...' : 'Register'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
