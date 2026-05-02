import React from 'react';
import { motion } from 'motion/react';
import { 
  Mail, Phone, MapPin, Send, Instagram, Facebook, Linkedin, 
  ArrowRight, MessageCircle, Zap 
} from 'lucide-react';

export default function ContactPage() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('ข้อมูลของพี่ถูกส่งถึงพี่แสนที่ chapter99info@gmail.com เรียบร้อยแล้วค่ะ! น้องส้มจะรีบประสานงานให้ด่วนที่สุดเลยนะคะ 🍊🧡');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-brand selection:text-white pt-32 pb-12 overflow-hidden relative">
      {/* Background Glows */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] right-[-5%] w-[50%] h-[50%] bg-brand/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[10%] left-[-5%] w-[40%] h-[40%] bg-orange-600/5 blur-[120px] rounded-full" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-start mb-32">
          {/* Left Side: Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-8xl font-black tracking-tighter mb-10 text-brand">
              GET IN <br/> TOUCH & <br/> <span className="text-white">GET 50% OFF</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-400 font-medium leading-relaxed mb-16 max-w-lg">
              Ready to transform your business with our premium digital solutions? Our team is standing by to help you grow.
            </p>

            <div className="space-y-12">
              <div className="flex items-start gap-6 group">
                <a 
                  href="https://www.facebook.com/profile.php?id=61586534972406" 
                  target="_blank" 
                  rel="noreferrer"
                  className="w-14 h-14 bg-slate-900 rounded-2xl flex items-center justify-center border border-white/5 group-hover:border-brand/40 transition-colors"
                >
                  <Facebook className="w-6 h-6 text-brand" />
                </a>
                <div>
                  <p className="text-sm font-black text-slate-500 uppercase tracking-widest mb-1">Facebook Inbox</p>
                  <a 
                    href="https://www.facebook.com/profile.php?id=61586534972406" 
                    target="_blank"
                    rel="noreferrer"
                    className="text-xl font-bold text-slate-200 hover:text-brand transition-colors"
                  >
                    Chapter99
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-6 group">
                <div className="w-14 h-14 bg-slate-900 rounded-2xl flex items-center justify-center border border-white/5 group-hover:border-brand/40 transition-colors">
                  <Mail className="w-6 h-6 text-brand" />
                </div>
                <div>
                  <p className="text-sm font-black text-slate-500 uppercase tracking-widest mb-1">Email Us</p>
                  <p className="text-xl font-bold text-slate-200">chapter99info@gmail.com</p>
                </div>
              </div>

              <div className="flex items-start gap-6 group">
                <div className="w-14 h-14 bg-slate-900 rounded-2xl flex items-center justify-center border border-white/5 group-hover:border-brand/40 transition-colors">
                  <Phone className="w-6 h-6 text-brand" />
                </div>
                <div>
                  <p className="text-sm font-black text-slate-500 uppercase tracking-widest mb-1">Call Us</p>
                  <p className="text-xl font-bold text-slate-200">+61 - 0452044382</p>
                </div>
              </div>

              <div className="flex items-start gap-6 group">
                <div className="w-14 h-14 bg-slate-900 rounded-2xl flex items-center justify-center border border-white/5 group-hover:border-brand/40 transition-colors">
                  <MapPin className="w-6 h-6 text-brand" />
                </div>
                <div>
                  <p className="text-sm font-black text-slate-500 uppercase tracking-widest mb-1">Visit Us</p>
                  <p className="text-xl font-bold text-slate-200">Sydney, NSW, Australia</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Side: Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-slate-900/40 backdrop-blur-xl p-10 md:p-16 rounded-[64px] border border-white/5 shadow-2xl relative"
          >
            {/* VIP Care Badge */}
            <div className="absolute -top-6 -right-6 bg-brand text-white text-[10px] font-black uppercase tracking-widest px-6 py-3 rounded-full shadow-2xl rotate-12 flex items-center gap-2">
              <Zap className="w-3 h-3 fill-current" />
              Nong Som is Online 🍊
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] pl-2">Your Name</label>
                  <input 
                    type="text" 
                    placeholder="John Doe"
                    required
                    className="w-full bg-black/40 border border-white/10 px-8 py-5 rounded-[24px] focus:outline-none focus:border-brand/60 focus:bg-black/60 transition-all font-bold text-slate-200"
                  />
                </div>
                <div className="space-y-4">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] pl-2">Email Address</label>
                  <input 
                    type="email" 
                    placeholder="john@example.com"
                    required
                    className="w-full bg-black/40 border border-white/10 px-8 py-5 rounded-[24px] focus:outline-none focus:border-brand/60 focus:bg-black/60 transition-all font-bold text-slate-200"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] pl-2">Interested Service</label>
                <input 
                  type="text" 
                  placeholder="e.g., Restaurant Pro Package"
                  className="w-full bg-black/40 border border-white/10 px-8 py-5 rounded-[24px] focus:outline-none focus:border-brand/60 focus:bg-black/60 transition-all font-bold text-slate-200"
                />
              </div>

              <div className="space-y-4">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] pl-2">Message</label>
                <textarea 
                  placeholder="Tell us about your business..."
                  required
                  rows={4}
                  className="w-full bg-black/40 border border-white/10 px-8 py-6 rounded-[32px] focus:outline-none focus:border-brand/60 focus:bg-black/60 transition-all font-bold text-slate-200 resize-none"
                />
              </div>

              <button 
                type="submit"
                className="w-full bg-brand text-white py-6 rounded-[24px] font-black text-lg uppercase tracking-widest flex items-center justify-center gap-4 hover:bg-brand/90 hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-brand/20 group"
              >
                <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                SEND INQUIRY
              </button>
            </form>
          </motion.div>
        </div>

        {/* Footer */}
        <div className="border-t border-white/5 pt-16 flex flex-col items-center">
          <div className="flex items-center gap-8 mb-12">
            <a 
              href="https://www.facebook.com/profile.php?id=61586534972406" 
              target="_blank"
              rel="noreferrer"
              className="text-slate-500 hover:text-brand transition-colors flex items-center gap-2 group"
              aria-label="Facebook Page"
            >
              <Facebook className="w-6 h-6" />
              <span className="text-[10px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">Chapter99</span>
            </a>
            {[Instagram, Linkedin].map((Icon, idx) => (
              <a 
                key={idx}
                href="#" 
                className="text-slate-500 hover:text-brand transition-colors"
                aria-label="Social Link"
              >
                <Icon className="w-6 h-6" />
              </a>
            ))}
          </div>

          <div className="text-center">
            <p className="text-slate-500 font-bold text-sm mb-2">
              @2026 Chapter99 Solutions. Sydney All Rights Reserved.
            </p>
            <p className="text-slate-700 text-[10px] font-black uppercase tracking-widest">
              ABN: [12 678 459 301]
            </p>
          </div>
        </div>
      </div>

      {/* Floating Chat FAB (Optional, but adds to the premium feel from V4) */}
      <motion.div 
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-10 right-10 z-[100] md:hidden"
      >
        <button className="w-16 h-16 bg-brand rounded-full flex items-center justify-center shadow-2xl shadow-brand/40 text-white">
          <MessageCircle className="w-8 h-8 fill-current" />
        </button>
      </motion.div>
    </div>
  );
}

