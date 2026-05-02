import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';

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
          {isHome ? (
            <motion.a 
              whileHover={{ color: '#E5C48B', x: 2 }}
              href="#services" 
              className="transition-colors cursor-pointer"
            >
              Services
            </motion.a>
          ) : (
            <motion.div whileHover={{ color: '#E5C48B', x: 2 }}>
              <Link to="/#services" className="transition-colors">Services</Link>
            </motion.div>
          )}
          <motion.div whileHover={{ color: '#E5C48B', x: 2 }}>
            <Link to="/portfolio" className="transition-colors">Portfolio</Link>
          </motion.div>
          <motion.div whileHover={{ color: '#E5C48B', x: 2 }}>
            <Link to="/pricing" className="transition-colors">Pricing</Link>
          </motion.div>
        </div>

        <Link 
          to="/vip-qualification"
          className="px-6 py-3 bg-champagne text-slate-950 text-[10px] font-black uppercase tracking-[0.2em] rounded-xl hover:scale-105 transition-all shadow-lg overflow-hidden relative group"
        >
          <span className="relative z-10">Apply VIP</span>
          <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
