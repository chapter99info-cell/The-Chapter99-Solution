import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { Sparkles, Camera, Smartphone, Users, ChevronRight, CheckCircle2, Play, MessageCircle, ArrowUpRight } from 'lucide-react';

const StaggeredText = ({ text, className }: { text: string; className?: string }) => {
  return (
    <span className={className}>
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{
            duration: 0.8,
            delay: i * 0.03,
            ease: [0.2, 0.65, 0.3, 0.9],
          }}
          style={{ display: "inline-block", whiteSpace: "pre" }}
        >
          {char}
        </motion.span>
      ))}
    </span>
  );
};

const TypewriterText = ({ text, className, delay = 0 }: { text: string; className?: string; delay?: number }) => {
  return (
    <span className={className}>
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.01,
            delay: delay + i * 0.03,
            ease: "linear",
          }}
        >
          {char}
        </motion.span>
      ))}
    </span>
  );
};

const LandingPage = () => {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);
  
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 40, opacity: 0, filter: 'blur(10px)' },
    visible: {
      y: 0,
      opacity: 1,
      filter: 'blur(0px)',
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
    }
  };

  const marqueeVariants = {
    animate: {
      x: [0, -1000],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop",
          duration: 25,
          ease: "linear",
        },
      },
    },
  };

  return (
    <div className="font-sans text-slate-900 bg-white selection:bg-orange-500 selection:text-white overflow-x-hidden">
      {/* Custom Cursor Glow */}
      <motion.div 
        animate={{ x: mousePos.x - 150, y: mousePos.y - 150 }}
        transition={{ type: 'spring', damping: 30, stiffness: 200, mass: 0.5 }}
        className="fixed top-0 left-0 w-[300px] h-[300px] bg-orange-600/10 blur-[100px] rounded-full pointer-events-none z-[9999] hidden lg:block"
      />

      {/* --- HERO SECTION --- */}
      <header className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-950">
        {/* Hero Background Image */}
        <div className="absolute inset-0 z-0">
          <motion.div 
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.4 }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ 
              backgroundImage: `url('https://firebasestorage.googleapis.com/v0/b/studio-6368441530-fca54.firebasestorage.app/o/Chapter99%20Solutions%2FPhotos%2Fd75c4bb5-64c5-4583-946d-655a0d2eb039.jpg?alt=media&token=47e28e0e-4131-4b9d-870d-b6a531de888f')`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/40 to-slate-950" />
        </div>
        {/* Vertical Rail Text */}
        <div className="absolute left-10 top-1/2 -translate-y-1/2 hidden xl:block">
          <div className="writing-mode-vertical-rl rotate-180 text-[10px] font-black tracking-[0.5em] text-slate-700 uppercase">
            SYDNEY • AUSTRALIA • CHAPTER99 • SOLUTIONS
          </div>
        </div>

        {/* Animated Background Elements */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-orange-600/10 blur-[150px] rounded-full" 
          />
        </div>

        <motion.div 
          style={{ opacity, scale }}
          className="container relative z-10 px-6 mx-auto"
        >
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="max-w-5xl mx-auto text-center"
          >
            <motion.div variants={itemVariants} className="inline-flex items-center gap-3 px-6 py-2 mb-12 text-[10px] font-black tracking-[0.3em] text-yellow-400 uppercase border border-yellow-400/20 rounded-full bg-yellow-400/5 backdrop-blur-md">
              <Sparkles className="w-3 h-3" />
              <span>The Future of Thai Business in Sydney</span>
            </motion.div>

            <motion.h1 variants={itemVariants} className="mb-10 text-7xl font-black leading-[0.85] text-white md:text-[10rem] lg:text-[13rem] tracking-tighter">
              <span className="block mb-4">REDEFINE</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-orange-500 to-orange-400 italic pr-4">
                REALITY
              </span>
            </motion.h1>

            <motion.p variants={itemVariants} className="mb-16 text-xl leading-relaxed text-slate-400 md:text-4xl font-light max-w-4xl mx-auto">
              <StaggeredText text="เปลี่ยนร้านนวดและร้านอาหารไทยของคุณให้เป็น" /> <br className="hidden md:block"/>
              <span className="text-white font-medium underline decoration-orange-600 decoration-4 underline-offset-8">
                <StaggeredText text='"แบรนด์ระดับโลก"' />
              </span> <StaggeredText text="ด้วยพลัง AI" />
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-col items-center justify-center gap-8 sm:flex-row">
              <motion.a 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="#pricing" 
                className="group relative px-14 py-7 text-2xl font-black text-white transition-all duration-500 bg-orange-600 rounded-full shadow-[0_20px_60px_rgba(249,115,22,0.3)] overflow-hidden"
              >
                <span className="relative z-10">จองสิทธิ์ลด 50%</span>
                <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                <span className="absolute inset-0 flex items-center justify-center text-orange-600 font-black translate-y-full group-hover:translate-y-0 transition-transform duration-500">CLICK NOW</span>
              </motion.a>
              <Link 
                to="/portfolio" 
                className="group px-14 py-7 text-2xl font-black text-white transition-all border-2 border-slate-800 rounded-full hover:border-white flex items-center gap-4"
              >
                <Play className="w-6 h-6 fill-current group-hover:scale-125 transition-transform" />
                ชมผลงาน
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </header>

      {/* --- MARQUEE SECTION --- */}
      <div className="py-12 bg-orange-600 overflow-hidden whitespace-nowrap border-y border-orange-700 relative z-20">
        <motion.div 
          variants={marqueeVariants}
          animate="animate"
          className="flex gap-24 text-5xl md:text-8xl font-black text-white/10 uppercase italic"
        >
          <span>AI Cinematic</span>
          <span>Smart PWA App</span>
          <span>Thai Support Sydney</span>
          <span>Premium Branding</span>
          <span>AI Cinematic</span>
          <span>Smart PWA App</span>
          <span>Thai Support Sydney</span>
          <span>Premium Branding</span>
        </motion.div>
      </div>

      {/* --- WHY CHOOSE US --- */}
      <section className="py-48 bg-white relative">
        <div className="container px-6 mx-auto">
          <div className="grid lg:grid-cols-2 gap-32 items-start">
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="sticky top-32"
            >
              <div className="text-[12rem] font-black text-slate-50 leading-none mb-4">01</div>
              <h2 className="text-6xl md:text-8xl font-black leading-[0.9] mb-10 tracking-tighter">
                <StaggeredText text="ทำไมต้อง" /> <br/>
                <span className="text-orange-600">Chapter99?</span>
              </h2>
              <p className="text-2xl text-slate-400 leading-relaxed max-w-lg font-light mb-6">
                เราคือ <span className="text-slate-900 font-bold italic">Digital Architect</span> ที่พร้อมจะเปลี่ยนโฉมธุรกิจของคุณด้วยนวัตกรรมที่ซิดนีย์ไม่เคยเห็น
              </p>
              <motion.p 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-xl text-orange-600/80 font-medium italic mb-12"
              >
                "Chapter99 ไม่ใช่แค่สตูดิโอถ่ายภาพทั่วไป"
              </motion.p>
              
              <div className="relative group inline-block">
                <div className="flex items-center gap-4 text-slate-900 font-black uppercase tracking-widest text-sm cursor-pointer">
                  <span className="relative">
                    Learn our process
                    <motion.span 
                      className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-600 group-hover:w-full transition-all duration-500"
                    />
                  </span>
                  <div className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center group-hover:bg-slate-950 group-hover:text-white transition-all duration-500">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>

                {/* Boutique Hint - Enhanced with new content and "Digital Architect" vibe */}
                <motion.div 
                  className="absolute top-full left-0 mt-8 p-10 bg-white/95 backdrop-blur-2xl border border-slate-100 shadow-[0_40px_80px_-15px_rgba(0,0,0,0.1)] rounded-[48px] z-30 w-[320px] md:w-[500px] pointer-events-none opacity-0 translate-y-4 scale-95 group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-100 group-hover:pointer-events-auto transition-all duration-700 cubic-bezier(0.22, 1, 0.36, 1)"
                >
                  <div className="space-y-8">
                    <div className="flex items-center gap-4">
                      <div className="w-3 h-3 rounded-full bg-orange-600 animate-ping absolute opacity-20" />
                      <div className="w-3 h-3 rounded-full bg-orange-600 relative" />
                      <p className="text-[10px] font-black text-orange-600 uppercase tracking-[0.4em]">The Digital Architect</p>
                    </div>
                    
                    <div className="space-y-6">
                      <h4 className="text-3xl font-black text-slate-950 leading-[1.1] tracking-tight">
                        "Chapter99 ไม่ใช่แค่ช่างภาพรับจ้างทั่วไป"
                      </h4>
                      <p className="text-xl text-slate-600 leading-relaxed font-light">
                        แต่ผมคือ <span className="text-slate-950 font-bold italic underline decoration-orange-600/30 decoration-4 underline-offset-4">Digital Architect</span> ที่จะเข้ามาวางโครงสร้างภาพลักษณ์ใหม่ให้ธุรกิจของคุณ ผมเชื่อว่าธุรกิจที่ดีต้องมีทั้ง <span className="text-orange-600 font-semibold">'ภาพที่สวยจับใจ'</span> และ <span className="text-orange-600 font-semibold">'ระบบที่ใช้งานง่าย'</span>
                      </p>
                      
                      <div className="h-px bg-slate-100 w-1/4" />
                      
                      <p className="text-xl text-slate-500 leading-relaxed font-light italic">
                        ในยุคที่ซิดนีย์ขยับตัวไปข้างหน้า ผมพร้อมนำนวัตกรรม AI และแอปพลิเคชันที่ทันสมัยที่สุดมาไว้ในมือคุณ โดยที่คุณไม่ต้องวุ่นวายกับทางเทคนิค เพราะผมจะดูแลให้คุณเองแบบครบวงจร <span className="text-slate-950 font-medium">ตั้งแต่หลังเลนส์ไปจนถึงหน้าจอสมาร์ตโฟน</span>
                      </p>
                    </div>

                    <div className="flex gap-2">
                      {[1,2,3,4].map(i => (
                        <div key={i} className="w-8 h-1 rounded-full bg-slate-100 overflow-hidden">
                          <motion.div 
                            animate={{ x: ["-100%", "100%"] }}
                            transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                            className="w-full h-full bg-orange-600/20"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            <div className="grid gap-8">
              {[
                { 
                  emoji: "🎬", 
                  title: "Breathtaking AI Video", 
                  desc: (
                    <>
                      บอกลาภาพนิ่งที่แสนธรรมดา... ผมเปลี่ยนภาพถ่ายในร้านให้กลายเป็น <span className="font-black text-slate-900 group-hover:text-white transition-colors">AI-Enhanced Cinematic Reels</span> ที่จะทำให้ 'อาหาร' ดูน่ากินจนต้องสั่ง และทำให้ 'สปา' ดูหรูหราเหมือนโรงแรม 5 ดาว ด้วยนวัตกรรมที่ซิดนีย์ไม่เคยเห็น
                    </>
                  )
                },
                { emoji: "📱", title: "Smart PWA App", desc: "ระบบจองและเมนูออนไลน์ที่ใช้งานง่าย ไม่ต้องโหลดแอป แค่สแกน QR Code ก็พร้อมใช้" },
                { emoji: "👥", title: "Thai Support Sydney", desc: "ดูแลโดยทีมงานคนไทยในซิดนีย์ เข้าใจหัวอกเจ้าของร้าน คุยง่าย ปรึกษาได้ตลอด" }
              ].map((feature, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ x: 50, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="group p-8 bg-white rounded-2xl shadow-sm border-b-4 border-orange-500 hover:bg-orange-600 transition-all duration-500"
                >
                  <div className="mb-4 text-4xl group-hover:scale-110 transition-transform duration-500">
                    {feature.emoji}
                  </div>
                  <h3 className="mb-2 text-2xl font-bold text-gray-800 group-hover:text-white transition-colors">{feature.title}</h3>
                  <div className="text-gray-600 leading-relaxed group-hover:text-orange-100 transition-colors text-lg">
                    {typeof feature.desc === 'string' ? feature.desc : feature.desc}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- PRICING SECTION --- */}
      <section id="pricing" className="py-48 bg-slate-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-30">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ 
              backgroundImage: `url('https://firebasestorage.googleapis.com/v0/b/studio-6368441530-fca54.firebasestorage.app/o/Chapter99%20Solutions%2FPhotos%2F2b00bbd9-b774-4205-a3d8-8f8631e65d99.jpg?alt=media&token=ce10dde4-5e39-4726-8044-c88cb725f31e')`,
            }}
          />
        </div>
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(249,115,22,0.1),transparent_70%)] z-1" />

        <div className="container px-6 mx-auto relative z-10">
          <div className="max-w-5xl mx-auto mb-32 text-center">
            <motion.h2 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="text-7xl md:text-[10rem] font-black mb-10 tracking-tighter leading-none"
            >
              THE <span className="text-orange-600 italic">OFFER</span>
            </motion.h2>
            <p className="text-2xl text-slate-500 font-light">สิทธิพิเศษสำหรับ 10 ร้านแรกที่ต้องการเป็นผู้นำตลาดอย่างแท้จริง</p>
          </div>
          
          <div className="grid gap-12 lg:grid-cols-3 items-end">
            {[
              { 
                name: "Starter", 
                price: "299", 
                oldPrice: "599", 
                fee: "25",
                oldFee: "49",
                features: ["Smart PWA App", "Professional Photography", "Free Domain & Hosting"]
              },
              { 
                name: "Professional", 
                price: "449", 
                oldPrice: "899", 
                fee: "39",
                oldFee: "99",
                recommended: true,
                features: ["Everything in Basic", "AI Reels (Every 2 Months)", "Menu & Promo Updates", "Custom Table QR Codes"]
              },
              { 
                name: "Growth VIP", 
                price: "599", 
                oldPrice: "1,199", 
                fee: "59",
                oldFee: "199",
                features: ["Everything in Professional", "Monthly AI Reels Content", "Social Media Management", "24/7 VIP Support"]
              }
            ].map((plan, idx) => (
              <motion.div 
                key={idx}
                initial={{ y: 100, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.8 }}
                className={`relative p-14 rounded-[64px] border transition-all duration-700 ${
                  plan.recommended 
                  ? 'bg-orange-600 border-orange-500 shadow-[0_40px_100px_rgba(249,115,22,0.3)] z-20 h-[110%]' 
                  : 'bg-white/5 border-white/10 hover:border-white/30'
                }`}
              >
                <h3 className={`text-sm font-black uppercase tracking-[0.4em] mb-12 ${plan.recommended ? 'text-white' : 'text-slate-500'}`}>
                  {plan.name}
                </h3>
                <div className="mb-14">
                  <div className="flex items-baseline gap-4">
                    <span className="text-8xl font-black tracking-tighter">${plan.price}</span>
                    <span className={`text-2xl line-through ${plan.recommended ? 'text-orange-300' : 'text-slate-700'}`}>${plan.oldPrice}</span>
                  </div>
                  <div className={`mt-4 font-bold ${plan.recommended ? 'text-orange-100' : 'text-slate-500'}`}>
                    <TypewriterText text={`+$${plan.fee}/mo maintenance`} delay={0.5 + idx * 0.2} />
                    <span className="ml-2 opacity-60 font-light text-sm italic">
                      <TypewriterText text={`ปกติ $${plan.oldFee}/ mo`} delay={1.5 + idx * 0.2} />
                    </span>
                  </div>
                </div>
                <ul className="mb-16 space-y-8">
                  {plan.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-5 text-xl">
                      <CheckCircle2 className={`w-7 h-7 flex-shrink-0 ${plan.recommended ? 'text-white' : 'text-orange-600'}`} />
                      <span className={i === 1 && plan.recommended ? 'font-black text-white underline' : 'opacity-80'}>{f}</span>
                    </li>
                  ))}
                </ul>
                <button className={`w-full py-8 text-2xl font-black rounded-[32px] transition-all duration-500 ${
                  plan.recommended 
                  ? 'bg-white text-orange-600 hover:scale-105 shadow-2xl' 
                  : 'bg-white/10 text-white hover:bg-white hover:text-black'
                }`}>
                  Select Plan
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- CTA SECTION --- */}
      <section className="py-48 bg-white">
        <div className="container px-6 mx-auto">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            className="bg-slate-950 rounded-[80px] p-20 md:p-40 text-center text-white relative overflow-hidden border border-white/5"
          >
            <div className="absolute inset-0 z-0 opacity-40">
              <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ 
                  backgroundImage: `url('https://firebasestorage.googleapis.com/v0/b/studio-6368441530-fca54.firebasestorage.app/o/Chapter99%20Solutions%2FPhotos%2F2b00bbd9-b774-4205-a3d8-8f8631e65d99.jpg?alt=media&token=ce10dde4-5e39-4726-8044-c88cb725f31e')`,
                }}
              />
            </div>
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-slate-950 via-transparent to-slate-950 z-1" />
            <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 z-2" />
            <motion.h2 
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="relative text-6xl md:text-[12rem] font-black mb-12 leading-none tracking-tighter"
            >
              READY?
            </motion.h2>
            <p className="relative text-2xl md:text-5xl mb-20 opacity-60 font-light max-w-4xl mx-auto leading-tight">
              อย่าปล่อยให้ร้านของคุณดู "เก่า" ในสายตาลูกค้า <br/>
              เริ่มสร้างความแตกต่างตั้งแต่วันนี้
            </p>
            <motion.button 
              whileHover={{ scale: 1.1, rotate: -2 }}
              whileTap={{ scale: 0.9 }}
              className="relative px-20 py-10 bg-orange-600 text-white text-3xl font-black rounded-full shadow-[0_30px_80px_rgba(249,115,22,0.4)] flex items-center gap-6 mx-auto group"
            >
              <MessageCircle className="w-10 h-10 group-hover:rotate-12 transition-transform" />
              คุยกับเราตอนนี้
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="py-32 text-slate-300 bg-[#5A5A40] border-t border-white/10">
        <div className="container px-6 mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start gap-20 mb-32">
            <div>
              <div className="text-6xl font-black text-white tracking-tighter mb-8">CHAPTER99</div>
              <p className="text-2xl font-light max-w-md leading-relaxed">
                เราคือทีมงานคนไทยที่พร้อมจะเปลี่ยนธุรกิจของคุณให้เป็นที่หนึ่งในซิดนีย์ ด้วยนวัตกรรมและดีไซน์ที่เหนือระดับ
              </p>
            </div>
            <div className="grid grid-cols-2 gap-20">
              <div className="space-y-6">
                <p className="text-xs font-black uppercase tracking-[0.4em] text-white/60">Navigation</p>
                <ul className="space-y-4 text-xl font-bold text-white">
                  <li><a href="#" className="hover:text-orange-600 transition-colors">Services</a></li>
                  <li><a href="#" className="hover:text-orange-600 transition-colors">Portfolio</a></li>
                  <li><a href="#" className="hover:text-orange-600 transition-colors">Pricing</a></li>
                </ul>
              </div>
              <div className="space-y-6">
                <p className="text-xs font-black uppercase tracking-[0.4em] text-white/60">Contact</p>
                <ul className="space-y-4 text-xl font-bold text-white">
                  <li>พี่แสน Saen: 0452044382</li>
                  <li>Sydney, Australia</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-8 text-xs uppercase tracking-[0.2em] opacity-60 italic text-white">
            <span>© 2026 Chapter99 Solutions. All rights reserved.</span>
            <span>*โปรโมชั่นจำกัด 10 ร้านแรกเท่านั้น</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
