import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, ArrowRight, ShieldCheck, Camera, Globe, Zap, MessageSquare } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export default function ServiceSummaryPage() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const planName = queryParams.get('plan') || 'Premium Package';
  const price = queryParams.get('price') || '$2,999';

  const highlights = [
    { icon: <Camera className="w-6 h-6 text-brand" />, title: 'Professional Shoot', desc: '1-day professional photography & cinema reels' },
    { icon: <Globe className="w-6 h-6 text-brand" />, title: 'Custom PWA & Web', desc: 'High-speed, offline-ready web app for your store' },
    { icon: <ShieldCheck className="w-6 h-6 text-brand" />, title: 'Brand Identity', desc: 'Logo, Typography, and Social Media kit' },
    { icon: <Zap className="w-6 h-6 text-brand" />, title: 'AI Integration', desc: 'Smart AI Concierge & Upsell systems' },
  ];

  return (
    <div className="min-h-screen bg-soft-white font-sans text-slate-900 pb-20">
      <div className="container mx-auto max-w-4xl pt-24 px-6">
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-3 px-6 py-2 mb-8 text-[12px] font-black tracking-[0.4em] text-champagne uppercase border border-champagne/20 rounded-full bg-champagne/5"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Service Summary & Agreement</span>
          </motion.div>
          
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.9] italic text-slate-950 mb-8">
            CONFIRM YOUR <br/> <span className="text-champagne">VISION</span>
          </h1>
          
          <p className="text-2xl text-slate-500 font-light max-w-2xl mx-auto leading-relaxed">
            สรุปรายการสิ่งที่คุณจะได้รับในแพ็กเกจ <span className="text-slate-900 font-bold">{planName}</span> ({price})
          </p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[64px] shadow-2xl overflow-hidden border border-white"
        >
          {/* Package Header */}
          <div className="bg-slate-950 p-12 text-white flex justify-between items-center">
            <div>
              <h2 className="text-4xl font-black italic mb-2">{planName}</h2>
              <p className="text-slate-400">Comprehensive Solutions for Growth</p>
            </div>
            <div className="text-right">
              <span className="text-5xl font-black text-champagne">{price}</span>
              <p className="text-sm text-slate-500 uppercase tracking-widest mt-1">One-time Investment</p>
            </div>
          </div>

          <div className="p-12 md:p-20">
            <h3 className="text-2xl font-black mb-10 flex items-center gap-4">
              <span className="w-8 h-8 rounded-full bg-brand text-white flex items-center justify-center text-sm font-bold italic">✓</span>
              สิ่งที่คุณจะได้รับ (Your Deliverables)
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              {highlights.map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * i }}
                  className="flex gap-6 p-6 rounded-3xl bg-slate-50 hover:bg-champagne/5 transition-colors"
                >
                  <div className="shrink-0 w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="text-xl font-black mb-1">{item.title}</h4>
                    <p className="text-slate-500 leading-snug">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="space-y-6">
              {[
                'ฟรีระบบจองออนไลน์ตลอดชีพ',
                'สิทธิ์เข้าถึงแดชบอร์ดจัดการเมนู/บริการ',
                'การดูแลทางเทคนิค 1 ปีเต็ม',
                'ส่วนลด 20% สำหรับโปรเจกต์ถัดไป'
              ].map((text, i) => (
                <div key={i} className="flex items-center gap-4 text-xl font-medium text-slate-700">
                  <CheckCircle2 className="w-6 h-6 text-brand" />
                  <span>{text}</span>
                </div>
              ))}
            </div>

            <div className="mt-20 flex flex-col gap-6">
              <Link 
                to="/vip-qualification"
                className="w-full py-8 bg-brand text-white text-2xl font-black rounded-3xl shadow-xl flex items-center justify-center gap-4 hover:scale-[1.02] transition-all"
              >
                <span>ก้าวสู่ขั้นตอนการออกแบบ (Confirm Design)</span>
                <ArrowRight className="w-6 h-6" />
              </Link>
              
              <Link 
                to="/pricing"
                className="text-center text-slate-400 font-bold hover:text-slate-600 transition-colors"
              >
                เปลี่ยนใจ เลือกแพ็กเกจอื่น
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Support Section */}
        <div className="mt-16 flex flex-col items-center gap-8">
          <div className="flex -space-x-4">
            <img src="https://i.pravatar.cc/100?u=som" alt="Som" className="w-16 h-16 rounded-full border-4 border-white shadow-lg" />
            <img src="https://i.pravatar.cc/100?u=san" alt="San" className="w-16 h-16 rounded-full border-4 border-white shadow-lg" />
          </div>
          <div className="text-center">
            <h4 className="text-xl font-black mb-2">มีคำถามหรืออยากปรับสเปก?</h4>
            <p className="text-slate-500 mb-8">น้องส้มและพี่แสนรอให้คำปรึกษาคุณอยู่นะคะ</p>
            <a 
              href="https://line.me" 
              target="_blank" 
              rel="noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 bg-[#00B900] text-white font-black rounded-2xl shadow-lg hover:bg-[#00a300] transition-all"
            >
              <MessageSquare className="w-5 h-5" />
              คุยคอนเซปต์ทาง LINE
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
