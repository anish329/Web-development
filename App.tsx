import React, { useState } from 'react';
import { TrendingUp, Globe, Zap, Shield, ArrowRight, BarChart2, Coins, DollarSign, X, Mail, Lock, Github, ToggleLeft as Google, ChevronUp, ChevronDown } from 'lucide-react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import StocksPage from './pages/StocksPage';
import CryptoPage from './pages/CryptoPage';
import ForexPage from './pages/ForexPage';

function DemoTrading({ onClose }: { onClose: () => void }) {
  const [balance, setBalance] = useState(10000);
  const [position, setPosition] = useState<number | null>(null);
  const [entryPrice, setEntryPrice] = useState<number | null>(null);
  const [currentPrice, setCurrentPrice] = useState(52384.50);

  // Simulate price movement
  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPrice(prev => {
        const change = (Math.random() - 0.5) * 100;
        return Number((prev + change).toFixed(2));
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const buyPosition = () => {
    if (!position) {
      setPosition(0.01);
      setEntryPrice(currentPrice);
      setBalance(prev => prev - currentPrice * 0.01);
    }
  };

  const sellPosition = () => {
    if (position && entryPrice) {
      const profit = (currentPrice - entryPrice) * position;
      setBalance(prev => prev + currentPrice * position + profit);
      setPosition(null);
      setEntryPrice(null);
    }
  };

  const getPnL = () => {
    if (position && entryPrice) {
      return ((currentPrice - entryPrice) * position).toFixed(2);
    }
    return '0.00';
  };

  const pnl = Number(getPnL());

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-slate-900 p-8 rounded-2xl w-full max-w-4xl relative border border-slate-800">
        <button 
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>
        
        <h2 className="text-2xl font-bold mb-6">Demo Trading</h2>
        
        <div className="grid grid-cols-2 gap-8">
          {/* Market Information */}
          <div className="space-y-6">
            <div className="bg-slate-800 p-6 rounded-xl">
              <h3 className="text-lg font-semibold mb-4">BTC/USD</h3>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Current Price</span>
                <span className="text-2xl font-bold">${currentPrice.toFixed(2)}</span>
              </div>
            </div>

            <div className="bg-slate-800 p-6 rounded-xl">
              <h3 className="text-lg font-semibold mb-4">Account</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-400">Balance</span>
                  <span className="font-medium">${balance.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Position</span>
                  <span className="font-medium">{position || 0} BTC</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Entry Price</span>
                  <span className="font-medium">${entryPrice?.toFixed(2) || '0.00'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">P&L</span>
                  <span className={`font-medium ${pnl >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    ${pnl}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Trading Interface */}
          <div className="bg-slate-800 p-6 rounded-xl">
            <h3 className="text-lg font-semibold mb-6">Trade</h3>
            
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={buyPosition}
                  disabled={!!position}
                  className={`flex items-center justify-center gap-2 p-4 rounded-lg font-semibold ${
                    position
                      ? 'bg-green-500/20 text-green-500 cursor-not-allowed'
                      : 'bg-green-500 hover:bg-green-600 text-white'
                  }`}
                >
                  <ChevronUp className="w-5 h-5" />
                  Buy
                </button>
                <button
                  onClick={sellPosition}
                  disabled={!position}
                  className={`flex items-center justify-center gap-2 p-4 rounded-lg font-semibold ${
                    !position
                      ? 'bg-red-500/20 text-red-500 cursor-not-allowed'
                      : 'bg-red-500 hover:bg-red-600 text-white'
                  }`}
                >
                  <ChevronDown className="w-5 h-5" />
                  Sell
                </button>
              </div>

              <div className="bg-slate-700/50 p-4 rounded-lg">
                <h4 className="font-medium mb-2">How to Demo Trade</h4>
                <ul className="text-sm text-gray-400 space-y-1">
                  <li>1. Click Buy to open a 0.01 BTC position</li>
                  <li>2. Watch the price movement and your P&L</li>
                  <li>3. Click Sell to close your position</li>
                  <li>4. Starting balance is $10,000</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function HomePage() {
  const [showLogin, setShowLogin] = useState(false);
  const [showDemo, setShowDemo] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white">
      {/* Login Modal */}
      {showLogin && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-slate-900 p-8 rounded-2xl w-full max-w-md relative border border-slate-800">
            <button 
              onClick={() => setShowLogin(false)}
              className="absolute right-4 top-4 text-gray-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
            
            <h2 className="text-2xl font-bold mb-6">Welcome Back</h2>
            
            {/* Email Login */}
            <form className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input 
                    type="email"
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg py-2 pl-10 pr-4 focus:outline-none focus:border-blue-500"
                    placeholder="Enter your email"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input 
                    type="password"
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg py-2 pl-10 pr-4 focus:outline-none focus:border-blue-500"
                    placeholder="Enter your password"
                  />
                </div>
              </div>
              <button className="w-full bg-gradient-to-r from-blue-500 to-purple-500 py-2 rounded-lg font-semibold hover:opacity-90 transition-opacity">
                Sign In
              </button>
            </form>

            {/* Divider */}
            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-700"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-slate-900 text-gray-400">Or continue with</span>
              </div>
            </div>

            {/* Social Login */}
            <div className="grid grid-cols-2 gap-4">
              <button className="flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 py-2 rounded-lg border border-slate-700">
                <Google className="w-5 h-5" />
                <span>Google</span>
              </button>
              <button className="flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 py-2 rounded-lg border border-slate-700">
                <Github className="w-5 h-5" />
                <span>GitHub</span>
              </button>
            </div>

            {/* Sign Up Link */}
            <p className="mt-6 text-center text-gray-400">
              Don't have an account?{' '}
              <button className="text-blue-400 hover:text-blue-300">Sign up</button>
            </p>
          </div>
        </div>
      )}

      {/* Demo Trading Modal */}
      {showDemo && <DemoTrading onClose={() => setShowDemo(false)} />}

      {/* Hero Section */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm"></div>
        <div className="container mx-auto px-4 py-24 relative">
          <div className="max-w-3xl">
            <h1 className="text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
              Trade Smarter, Not Harder
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Your all-in-one platform for stocks, crypto, and forex. Experience professional-grade tools with zero commission trading.
            </p>
            <div className="flex gap-4">
              <button 
                onClick={() => setShowLogin(true)}
                className="bg-gradient-to-r from-blue-500 to-purple-500 px-8 py-4 rounded-lg font-semibold flex items-center gap-2 hover:opacity-90 transition-opacity"
              >
                Start Trading Now <ArrowRight className="w-5 h-5" />
              </button>
              <button 
                onClick={() => setShowDemo(true)}
                className="border border-gray-600 px-8 py-4 rounded-lg font-semibold hover:bg-white/5 transition-colors"
              >
                View Demo
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="container mx-auto px-4 py-24">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white/5 p-8 rounded-xl backdrop-blur-sm">
            <BarChart2 className="w-12 h-12 text-blue-400 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Advanced Analytics</h3>
            <p className="text-gray-400">Real-time market analysis and professional-grade charting tools at your fingertips.</p>
          </div>
          <div className="bg-white/5 p-8 rounded-xl backdrop-blur-sm">
            <Shield className="w-12 h-12 text-purple-400 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Bank-Grade Security</h3>
            <p className="text-gray-400">Your assets are protected with military-grade encryption and multi-factor authentication.</p>
          </div>
          <div className="bg-white/5 p-8 rounded-xl backdrop-blur-sm">
            <Zap className="w-12 h-12 text-yellow-400 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Lightning Fast</h3>
            <p className="text-gray-400">Execute trades in milliseconds with our high-frequency trading infrastructure.</p>
          </div>
        </div>
      </div>

      {/* Markets Section */}
      <div className="container mx-auto px-4 py-24">
        <h2 className="text-4xl font-bold text-center mb-16">Trade Global Markets</h2>
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div onClick={() => navigate('/stocks')} className="p-6 cursor-pointer group hover:bg-white/5 rounded-xl transition-colors">
            <TrendingUp className="w-16 h-16 text-green-400 mx-auto mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-2xl font-semibold mb-2">Stocks</h3>
            <p className="text-gray-400">Access 10,000+ stocks across major global exchanges</p>
          </div>
          <div onClick={() => navigate('/crypto')} className="p-6 cursor-pointer group hover:bg-white/5 rounded-xl transition-colors">
            <Coins className="w-16 h-16 text-yellow-400 mx-auto mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-2xl font-semibold mb-2">Crypto</h3>
            <p className="text-gray-400">Trade 100+ cryptocurrencies 24/7</p>
          </div>
          <div onClick={() => navigate('/forex')} className="p-6 cursor-pointer group hover:bg-white/5 rounded-xl transition-colors">
            <DollarSign className="w-16 h-16 text-blue-400 mx-auto mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-2xl font-semibold mb-2">Forex</h3>
            <p className="text-gray-400">Trade major, minor, and exotic currency pairs</p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-4 py-24">
        <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-2xl p-12 text-center backdrop-blur-sm">
          <h2 className="text-4xl font-bold mb-4">Ready to Start Trading?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join millions of traders worldwide. Get started with as little as $100.
          </p>
          <button 
            onClick={() => setShowLogin(true)}
            className="bg-gradient-to-r from-blue-500 to-purple-500 px-8 py-4 rounded-lg font-semibold flex items-center gap-2 hover:opacity-90 transition-opacity mx-auto"
          >
            Create Free Account <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/stocks" element={<StocksPage />} />
        <Route path="/crypto" element={<CryptoPage />} />
        <Route path="/forex" element={<ForexPage />} />
      </Routes>
    </Router>
  );
}

export default App;