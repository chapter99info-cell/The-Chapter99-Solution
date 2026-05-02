import React from 'react';
import { motion } from 'motion/react';
import { MessageCircle, Facebook, ArrowRight, Sparkles, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans overflow-hidden py-32 selection:bg-brand selection:text-white">
      {/* Background Glows */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] right-[-5%] w-[50%] h-[50%] bg-brand/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[10%] left-[-5%] w-[40%] h-[40%] bg-[#0695FF]/10 blur-[120px] rounded-full" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-3 px-6 py-2 mb-10 text-[12px] font-black tracking-[0.4em] text-champagne uppercase border border-champagne/20 rounded-full bg-champagne/5"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>VIP ELITE SUPPORT</span>
          </motion.div>
          
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.85] italic mb-10">
            ทักแชทคุยกับ <br/> <span className="text-champagne font-black">เราได้เลยค่ะ</span>
          </h1>
          
          <p className="text-2xl text-slate-400 font-light max-w-2xl mx-auto leading-relaxed italic">
            ไม่ว่าจะเป็นเรื่องออกแบบ ถ่ายรูป หรือระบบ Web App <br className="hidden md:block" />
            เราพร้อมให้คำปรึกษาพี่ๆ ทุกคนอย่างเป็นกันเองค่ะ
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          {/* Main Facebook Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <a 
              href="https://m.me/chapter99" // Updated with a generic placeholder link as requested
              target="_blank"
              rel="noreferrer"
              className="group block relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#0695FF] to-[#A334FA] blur-3xl opacity-20 group-hover:opacity-40 transition-opacity" />
              <div className="relative bg-white text-slate-950 p-10 md:p-16 rounded-[64px] border-4 border-white shadow-[0_30px_60px_rgba(0,0,0,0.5)] hover:scale-[1.02] transition-all duration-500 overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute top-0 right-0 p-8 opacity-5">
                  <Facebook className="w-64 h-64 rotate-12" />
                </div>

                <div className="flex flex-col items-center text-center relative z-10">
                  <div className="w-24 h-24 md:w-32 md:h-32 bg-gradient-to-br from-[#0695FF] to-[#A334FA] text-white rounded-full flex items-center justify-center shadow-2xl mb-10 group-hover:rotate-12 transition-transform duration-500">
                    <MessageCircle className="w-12 h-12 md:w-16 md:h-16 fill-current" />
                  </div>

                  <h2 className="text-4xl md:text-5xl font-black mb-6">ส่งข้อความทาง <br className="md:hidden" /> <span className="text-[#0695FF]">Facebook Page</span></h2>
                  
                  <div className="flex items-center gap-3 px-8 py-4 bg-slate-100 rounded-2xl text-sm font-black uppercase tracking-widest text-slate-500 mb-10">
                    <Sparkles className="w-4 h-4 text-[#0695FF]" />
                    <span>ตอบไวที่สุดภายใน 5 นาที</span>
                  </div>

                  <div className="flex items-center gap-4 text-2xl font-black text-slate-900 group-hover:gap-6 transition-all">
                    <span>แชทกับทีมงานตอนนี้</span>
                    <ArrowRight className="w-8 h-8" />
                  </div>
                </div>
              </div>
            </a>
          </motion.div>

          {/* Persona Signature */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-16 text-center"
          >
            <div className="flex justify-center -space-x-4 mb-8">
              <img src="https://i.pravatar.cc/150?u=som" alt="Som" className="w-20 h-20 rounded-full border-4 border-slate-950 shadow-2xl" />
              <img src="https://i.pravatar.cc/150?u=san" alt="San" className="w-20 h-20 rounded-full border-4 border-slate-950 shadow-2xl" />
            </div>
            <p className="text-2xl font-black italic text-champagne mb-2">
              "น้องส้มและพี่แสนสแตนบายรอตอบแชทพี่อยู่นะคะ"
            </p>
            <p className="text-slate-500 font-medium">ยินดีให้คำปรึกษาแบบพี่แบบน้องค่ะ</p>
          </motion.div>
        </div>

        {/* Floating VIP Button as secondary action */}
        <div className="mt-32 flex flex-col items-center">
          <p className="text-slate-500 font-bold uppercase tracking-[0.3em] text-[10px] mb-8">หรือหากพี่พร้อมเริ่มงานแล้ว</p>
          <Link 
            to="/vip-qualification"
            className="px-12 py-5 bg-transparent border-2 border-brand text-brand hover:bg-brand hover:text-white text-lg font-black italic rounded-2xl transition-all shadow-[0_0_30px_rgba(107,138,37,0.2)]"
          >
            APPLY VIP ELITE ACCESS
          </Link>
        </div>
      </div>
    </div>
  );
}
