import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <nav className="fixed top-0 left-0 w-full z-[100] transition-all duration-500 bg-slate-950/20 backdrop-blur-md border-b border-white/5">
      <div className="container mx-auto px-6 py-6 flex justify-between items-center">
        <Link to="/" className="text-2xl font-black text-white tracking-tighter">
          CHAPTER<span className="text-champagne italic">99</span>
        </Link>
        
        <div className="hidden md:flex items-center gap-12 text-xs font-black uppercase tracking-[0.3em] text-white/70">
          <motion.div whileHover={{ color: '#E5C48B', x: 2 }}>
            <Link to="/pricing" className="transition-colors">Packages</Link>
          </motion.div>
          <motion.div whileHover={{ color: '#E5C48B', x: 2 }}>
            <Link to="/portfolio" className="transition-colors">Solutions</Link>
          </motion.div>
          <motion.div whileHover={{ color: '#E5C48B', x: 2 }}>
            <Link to="/contact" className="transition-colors">Contact</Link>
          </motion.div>
        </div>

        <Link 
          to="/vip-qualification"
          className="px-6 py-3 bg-[#8B2E2E] text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-xl hover:scale-105 transition-all shadow-lg shadow-red-900/20 flex items-center gap-2 group"
        >
          <Sparkles className="w-3 h-3 text-brand animate-pulse" />
          <span>Get 50% Off</span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
