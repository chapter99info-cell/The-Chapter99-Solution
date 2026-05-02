import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { Sparkles, Camera, Smartphone, Users, ChevronRight, CheckCircle2, Play, MessageCircle, ArrowUpRight, X, CheckCircle, ArrowRight, Zap } from 'lucide-react';

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
  const navigate = useNavigate();
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);
  
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [selectedTier, setSelectedTier] = useState<any | null>(null);
  const [redirecting, setRedirecting] = useState(false);

  const handleSelect = (plan: any) => {
    setSelectedTier(plan);
  };

  const handleConfirm = () => {
    setRedirecting(true);
    setTimeout(() => {
      navigate(`/vip-qualification?plan=${selectedTier?.name.toLowerCase().replace(' ', '-')}`);
    }, 1200);
  };

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
    <div className="font-sans text-slate-900 bg-white selection:bg-brand selection:text-white overflow-x-hidden">
      {/* Custom Cursor Glow */}
      <motion.div 
        animate={{ x: mousePos.x - 150, y: mousePos.y - 150 }}
        transition={{ type: 'spring', damping: 30, stiffness: 200, mass: 0.5 }}
        className="fixed top-0 left-0 w-[300px] h-[300px] bg-brand/10 blur-[100px] rounded-full pointer-events-none z-[9999] hidden lg:block"
      />

      {/* --- HERO SECTION --- */}
      <header className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-950">
        {/* Hero Background Image */}
        <div className="absolute inset-0 z-0">
          <motion.div 
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.8 }}
            transition={{ duration: 2.5, ease: "easeOut" }}
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ 
              backgroundImage: `url('https://firebasestorage.googleapis.com/v0/b/studio-6368441530-fca54.firebasestorage.app/o/Chapter99%20Solutions%2FPhotos%2Fd75c4bb5-64c5-4583-946d-655a0d2eb039.jpg?alt=media&token=47e28e0e-4131-4b9d-870d-b6a531de888f')`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/50 via-slate-950/20 to-slate-950" />
          <div className="absolute inset-0 bg-white/5 backdrop-blur-[0.5px]" />
        </div>
        {/* Vertical Rail Text */}
        <div className="absolute left-10 top-1/2 -translate-y-1/2 hidden xl:block">
          <div className="writing-mode-vertical-rl rotate-180 text-[10px] font-black tracking-[0.5em] text-slate-500 uppercase">
            SYDNEY • AUSTRALIA • CHAPTER99 • SOLUTIONS
          </div>
        </div>

        {/* Animated Background Elements */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-champagne/20 blur-[150px] rounded-full" 
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
            className="max-w-6xl mx-auto text-center"
          >
            <motion.div variants={itemVariants} className="inline-flex items-center gap-3 px-6 py-2 mb-10 text-[10px] font-black tracking-[0.3em] text-champagne uppercase border border-champagne/20 rounded-full bg-champagne/5 backdrop-blur-md">
              <Sparkles className="w-3 h-3" />
              <span>THE ART OF SOLUTIONS</span>
            </motion.div>

            <motion.h1 
              variants={itemVariants} 
              className="mb-8 text-4xl font-black leading-[1.1] text-champagne md:text-6xl lg:text-7xl tracking-tighter"
            >
              <span className="block mb-2 drop-shadow-lg">Simplify Your Business,</span>
              <span className="block italic pr-4 uppercase">
                Sustain Your Future
              </span>
            </motion.h1>

            <motion.div 
              variants={itemVariants} 
              className="text-soft-white font-medium tracking-wide text-sm md:text-xl lg:text-2xl mb-14 max-w-4xl mx-auto leading-relaxed border-y border-soft-white/10 py-6"
            >
              คุยคอนเซปต์ • ออกแบบไอเดีย • ถ่ายภาพระดับมืออาชีพ • พัฒนา App & Web • พร้อมเริ่มธุรกิจทันที
            </motion.div>

            <motion.p variants={itemVariants} className="mb-16 text-xl leading-relaxed text-slate-300 md:text-3xl font-light max-w-4xl mx-auto">
              เปลี่ยนร้านนวดและร้านอาหารไทยของคุณให้เป็น <br className="hidden md:block"/>
              <span className="text-white font-medium italic underline decoration-champagne decoration-2 underline-offset-8">
                "แบรนด์ระดับไฮเอนด์"
              </span> ด้วยนวัตรกรรมที่เหนือชั้น
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-col items-center justify-center gap-6 sm:flex-row">
              <Link 
                to="/vip-qualification" 
                className="group relative px-12 py-6 text-xl font-black text-slate-950 transition-all duration-500 bg-champagne rounded-2xl shadow-[0_20px_60px_rgba(229,196,139,0.2)] overflow-hidden"
              >
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="relative z-10">จองสิทธิ์ลด 50%</span>
                  <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                </motion.div>
              </Link>
              <Link 
                to="/portfolio" 
                className="group px-12 py-6 text-xl font-black text-white transition-all border-2 border-white/20 rounded-2xl hover:bg-white hover:text-slate-950 flex items-center gap-4"
              >
                <Play className="w-5 h-5 fill-current" />
                ชมผลงาน
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </header>

      {/* --- MARQUEE SECTION --- */}
      <div className="py-12 bg-brand overflow-hidden whitespace-nowrap border-y border-brand-dark relative z-20">
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

      {/* --- WORK PROCESS SECTION (สวยจบ ครบที่เรา) --- */}
      <section id="services" className="py-48 bg-soft-white relative overflow-hidden">
        <div className="container px-6 mx-auto relative z-10">
          <div className="text-center mb-32">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-3 px-6 py-2 mb-8 text-[12px] font-black tracking-[0.4em] text-brand uppercase border border-brand/20 rounded-full bg-brand/5"
            >
              <Sparkles className="w-4 h-4 text-brand" />
              <span>Beautiful & Complete Service</span>
            </motion.div>
            <h2 className="text-6xl md:text-9xl font-black italic tracking-tighter mb-10 leading-[0.85]">
              สวยจบ <span className="text-brand">ครบที่เรา</span>
            </h2>
            <p className="text-2xl md:text-3xl text-slate-500 font-bold max-w-3xl mx-auto italic leading-relaxed">
              สเต็ปการทำงานที่ง่ายที่สุดสำหรับพี่ๆ เจ้าของร้าน ไม่ต้องปวดหัว <br /> 
              ให้น้องส้มสายชูและทีม Chapter99 ดูแลให้ครบวงจรเลยค่ะ! 🍊⚡️
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { num: "01", title: "คุยคอนเซปต์", desc: "คุยความต้องการ วางแผนแบรนด์ให้เปรี้ยวจี๊ด", icon: <MessageCircle className="w-10 h-10" /> },
              { num: "02", title: "ออกแบบไอเดีย", desc: "ดีไซน์ Web/App และดีไซน์ที่ป้าๆ ชอบ", icon: <Sparkles className="w-10 h-10" /> },
              { num: "03", title: "ถ่ายภาพระดับมืออาชีพ", desc: "ภาพ Cinematic Food & Massage Photography", icon: <Camera className="w-10 h-10" /> },
              { num: "04", title: "สร้าง Web/App V4", desc: "ระบบจองและเมนูออนไลน์ที่ทันสมัยที่สุด", icon: <Smartphone className="w-10 h-10" /> },
            ].map((step, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 }}
                className="group p-12 bg-white rounded-[64px] shadow-sm hover:shadow-[0_40px_100px_rgba(0,0,0,0.1)] hover:-translate-y-4 transition-all duration-700 border border-slate-100 flex flex-col items-center text-center"
              >
                <div className="text-brand/20 font-black text-6xl italic mb-10">{step.num}</div>
                <div className="w-24 h-24 bg-brand/5 text-brand rounded-[32px] flex items-center justify-center mb-10 group-hover:bg-brand group-hover:text-white group-hover:scale-110 group-hover:rotate-6 transition-all duration-700">
                  {step.icon}
                </div>
                <h3 className="text-3xl font-black mb-6 tracking-tight text-slate-950">{step.title}</h3>
                <p className="text-xl text-slate-500 leading-relaxed font-bold italic">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- BEFORE & AFTER COMPARISON --- */}
      <section className="py-48 bg-slate-950 text-white overflow-hidden">
        <div className="container px-6 mx-auto">
          <div className="grid lg:grid-cols-2 gap-32 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
            >
              <div className="inline-flex items-center gap-3 px-6 py-2 mb-10 text-[10px] font-black tracking-[0.3em] text-brand uppercase border border-brand/20 rounded-full bg-brand/5">
                <Zap className="w-4 h-4 fill-current" />
                <span>SOUR ORANGE BUDDY REVEALS</span>
              </div>
              <h2 className="text-6xl md:text-8xl font-black italic tracking-tighter mb-10 leading-[0.9]">
                รูปสวย <br /> <span className="text-brand text-5xl md:text-7xl">รวยคูณสอง!</span>
              </h2>
              <p className="text-2xl text-slate-400 font-bold mb-12 italic leading-relaxed">
                "พี่เชื่อมือเถอะค่ะ! แค่เปลี่ยนมุมกล้องและจัดแสงแบบ Chapter99 ร้านป้าก็กลายเป็นร้านมิชลินได้ในพริบตา! ป้าๆ เห็นรูปสวยๆ แล้วจะรีบกดสั่งแพ็กเกจ Pro ทันทีเพราะอยากให้ร้านตัวเองดูหรูแบบนั้นบ้าง!" 🍊⚡️
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="relative"
            >
              <div className="relative rounded-[64px] overflow-hidden border-8 border-white/5 shadow-2xl">
                <div className="grid grid-cols-2">
                  <div className="relative group">
                    <img src="https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=800" alt="Before" className="w-full aspect-[4/5] object-cover grayscale opacity-50 grayscale" />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <span className="px-6 py-2 bg-black/60 rounded-full text-xs font-black tracking-widest text-white/60">BEFORE</span>
                    </div>
                  </div>
                  <div className="relative group">
                    <img src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=800" alt="After" className="w-full aspect-[4/5] object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand/40 to-transparent flex items-center justify-center">
                      <span className="px-6 py-2 bg-brand rounded-full text-xs font-black tracking-widest text-white shadow-xl">AFTER 😍</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

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
              <div className="text-[12rem] font-black text-slate-300/60 leading-none mb-4 tracking-tighter italic">WHY US</div>
              <h2 className="text-6xl md:text-8xl font-black leading-[0.9] mb-10 tracking-tighter">
                ทำไมต้อง <br/>
                <span className="text-brand italic">Chapter99?</span>
              </h2>
              <p className="text-3xl text-slate-500 leading-relaxed max-w-lg font-bold italic mb-12">
                "Chapter99 ไม่ใช่แค่ช่างภาพรับจ้างทั่วไป แต่เราคือพาร์ทเนอร์ที่จะพาธุรกิจพี่ไปสู่ระดับสากลค่ะ!" 🍊⚡️
              </p>

              <div className="space-y-10">
                {[
                  { title: "Digital Architect", desc: "วางโครงสร้างแบรนด์ใหม่ให้พรีเมียมและยั่งยืน" },
                  { title: "Thai Support in Sydney", desc: "ทีมงานคนไทย คุยง่าย เข้าใจหัวอกเจ้าของร้าน" },
                  { title: "Cutting-edge AI", desc: "ใช้น้องส้มสายชูและระบบ AI ช่วยสับงานให้ไวและทรงพลัง" }
                ].map((item, i) => (
                  <div key={i} className="flex gap-6 items-start">
                    <div className="w-12 h-12 bg-brand text-white rounded-2xl flex items-center justify-center shrink-0 shadow-lg shadow-brand/20">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-2xl font-black mb-2 text-slate-950 uppercase tracking-tight">{item.title}</h4>
                      <p className="text-xl text-slate-400 font-bold italic">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="relative rounded-[80px] overflow-hidden shadow-2xl border-8 border-slate-50"
            >
              <img 
                src="https://firebasestorage.googleapis.com/v0/b/studio-6368441530-fca54.firebasestorage.app/o/Chapter99%20Solutions%2FPhotos%2F2b00bbd9-b774-4205-a3d8-8f8631e65d99.jpg?alt=media&token=ce10dde4-5e39-4726-8044-c88cb725f31e" 
                alt="Saen - Digital Architect" 
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
              <div className="absolute bottom-20 left-20">
                <div className="text-6xl font-black text-brand italic mb-2 tracking-tighter">พี่แสน Saen</div>
                <div className="text-2xl font-black text-white uppercase tracking-[0.3em] opacity-80">Founder & Digital Architect</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- PRICING SECTION --- */}
      <section id="pricing" className="py-48 bg-slate-50 relative overflow-hidden">
        <div className="container px-6 mx-auto relative z-10">
          <div className="max-w-4xl mx-auto text-center mb-32">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="inline-block px-8 py-3 bg-brand/10 text-brand rounded-full text-sm font-black tracking-[0.4em] uppercase mb-8"
            >
              Simple, transparent pricing
            </motion.div>
            <h2 className="text-6xl md:text-[10rem] font-black italic tracking-tighter leading-[0.8] mb-12">
              The <span className="text-brand">V4</span> Pack
            </h2>
            <div className="inline-flex flex-col md:flex-row items-center gap-6 bg-white p-6 rounded-[32px] shadow-2xl shadow-brand/10 border border-brand/10">
              <div className="bg-[#A3E635] text-slate-950 px-10 py-5 rounded-2xl animate-pulse">
                <span className="text-4xl font-black italic tracking-tighter uppercase">50% OFF</span>
              </div>
              <div className="text-left">
                <p className="text-2xl font-black text-slate-950 leading-tight italic">
                  สิทธิ์พิเศษสำหรับ 10 ร้านแรกของเดือนเท่านั้น!
                </p>
                <div className="flex items-center gap-3 mt-2 text-brand font-black">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-200" />
                    ))}
                  </div>
                  <p className="text-sm uppercase tracking-widest animate-bounce">🔥 เหลือเพียง 3 สิทธิ์สุดท้าย!</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid gap-12 lg:grid-cols-3 items-end">
            {[
              { 
                name: "Basic", 
                price: "149.50", 
                oldPrice: "299", 
                tag: "Essential digital presence for small shops.",
                features: ["Smart PWA Web App (Basic)", "Digital Menu with QR Code", "Professional Food Photo (10 items)", "Essential SEO Setup"]
              },
              { 
                name: "Pro", 
                price: "224.50", 
                oldPrice: "449", 
                recommended: true,
                tag: "Complete system for growing businesses.",
                features: ["Online Ordering & Booking PWA", "AI Promo Videos (2/mo)", "Automated Social Posting", "Custom QR Table Labels"]
              },
              { 
                name: "Social Growth", 
                price: "299.50", 
                oldPrice: "599", 
                tag: "Aggressive growth and social media dominance.",
                features: ["AI Concierge (น้องส้มสายชู 🍊⚡️)", "Unlimited AI Cinematic Content", "Cross-Store Ad Network", "Dedicated account manager"]
              }
            ].map((plan, idx) => (
              <motion.div 
                key={idx}
                initial={{ y: 100, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.8 }}
                className={`flex flex-col relative p-12 md:p-16 rounded-[64px] border-4 transition-all duration-700 min-h-[800px] ${
                  plan.recommended 
                  ? 'bg-white border-brand shadow-[0_60px_120px_-20px_rgba(184,150,46,0.2)] z-20 scale-105 text-slate-950' 
                  : 'bg-white border-slate-100 hover:border-brand/30 text-slate-950'
                }`}
              >
                {plan.recommended && (
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-brand text-white px-10 py-3 rounded-full text-xs font-black uppercase tracking-widest shadow-xl">
                    Best Seller 🍊⚡️
                  </div>
                )}
                
                <div className="flex-grow">
                  <h3 className={`text-sm font-black uppercase tracking-[0.4em] mb-6 ${plan.recommended ? 'text-brand' : 'text-slate-400'}`}>
                    {plan.name}
                  </h3>
                  <p className="text-2xl font-black italic mb-12 leading-tight text-slate-900">
                    {plan.tag}
                  </p>
                  
                  <div className="mb-14 p-8 bg-slate-50 rounded-[32px] border border-slate-100 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:rotate-12 transition-transform">
                      <Zap className="w-20 h-20 text-brand" />
                    </div>
                    <div className="flex items-baseline gap-4 mb-2">
                      <span className="text-8xl font-black tracking-tighter text-slate-950">${plan.price}</span>
                      <span className="text-3xl line-through text-slate-300 font-bold tracking-tighter">${plan.oldPrice}</span>
                    </div>
                    <p className="text-sm font-black uppercase tracking-widest text-[#A3E635] bg-slate-950 inline-block px-4 py-1 rounded-lg">50% DISCOUNTED</p>
                  </div>

                  <ul className="mb-16 space-y-8">
                    {plan.features.map((f, i) => (
                      <li key={i} className="flex items-start gap-5 text-xl font-bold">
                        <CheckCircle2 className={`w-8 h-8 flex-shrink-0 text-brand`} />
                        <span className={i === 0 && plan.recommended ? 'font-black text-slate-950 underline decoration-brand decoration-4 underline-offset-8' : 'opacity-80'}>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-4">
                  <button 
                    onClick={() => handleSelect(plan)}
                    className={`w-full py-8 text-2xl font-black rounded-[32px] transition-all duration-500 shadow-xl flex items-center justify-center gap-4 group ${
                    plan.recommended 
                    ? 'bg-brand text-white hover:scale-105' 
                    : 'bg-slate-950 text-white hover:bg-brand'
                  }`}>
                    <span>Get Started</span>
                    <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                  </button>
                  
                  {plan.recommended && (
                    <button className="w-full py-5 text-lg font-black text-brand border-2 border-brand/20 rounded-[24px] hover:bg-brand/5 transition-colors flex items-center justify-center gap-3">
                      <MessageCircle className="w-5 h-5" />
                      <span>ขอคำปรึกษาฟรีกับพี่แสน</span>
                    </button>
                  )}
                </div>
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
            className="bg-brand rounded-[80px] p-20 md:p-40 text-center relative overflow-hidden border border-brand-light/20"
          >
            <div className="absolute inset-0 z-0 opacity-10">
              <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat grayscale"
                style={{ 
                  backgroundImage: `url('https://firebasestorage.googleapis.com/v0/b/studio-6368441530-fca54.firebasestorage.app/o/Chapter99%20Solutions%2FPhotos%2F2b00bbd9-b774-4205-a3d8-8f8631e65d99.jpg?alt=media&token=ce10dde4-5e39-4726-8044-c88cb725f31e')`,
                }}
              />
            </div>
            <div className="relative z-10 space-y-8">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="text-5xl md:text-8xl font-black text-slate-900 tracking-tight"
              >
                Ready for your transformation?
              </motion.h2>
              <p className="text-xl md:text-3xl text-white font-medium max-w-2xl mx-auto opacity-90">
                Join the top-performing Thai businesses in Sydney.
              </p>
              
              <div className="pt-8">
                <Link 
                  to="/vip-qualification"
                  className="px-12 py-6 bg-white text-slate-950 text-xl font-black rounded-2xl shadow-xl flex items-center gap-4 mx-auto group hover:scale-105 transition-all w-fit"
                >
                  Get Your 50% Discount Now
                  <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

              <motion.p 
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-sm font-black uppercase tracking-[0.3em] text-[#A3E635]"
              >
                Limited to 10 Clients Only
              </motion.p>
            </div>
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
                  <li><a href="#" className="hover:text-brand transition-colors">Services</a></li>
                  <li><a href="#" className="hover:text-brand transition-colors">Portfolio</a></li>
                  <li><a href="#" className="hover:text-brand transition-colors">Pricing</a></li>
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

      {/* --- CONFIRMATION MODAL --- */}
      <AnimatePresence>
        {selectedTier && (
          <div className="fixed inset-0 z-[10000] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedTier(null)}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 40 }}
              className="relative w-full max-w-2xl bg-white rounded-[64px] shadow-2xl overflow-hidden border border-white p-12 md:p-20 text-center"
            >
              <button 
                onClick={() => setSelectedTier(null)}
                className="absolute top-10 right-10 w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:text-slate-900 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
              
              <div className="mb-10 w-32 h-32 bg-brand/10 text-brand rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-16 h-16" />
              </div>

              <h2 className="text-5xl md:text-6xl font-black italic tracking-tighter mb-6 text-slate-950">
                ยินดีด้วย! <br/> <span className="text-brand">คุณได้รับสิทธิ์ส่วนลด 50%</span>
              </h2>

              <p className="text-2xl md:text-3xl text-slate-500 font-medium mb-12 leading-relaxed">
                คุณกำลังเลือกแพ็กเกจ <span className="text-slate-950 font-black">{selectedTier.name}</span> <br/>
                กรุณากรอกข้อมูลเพื่อล็อกสิทธิ์ของคุณตอนนี้
              </p>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleConfirm}
                disabled={redirecting}
                className="w-full py-10 bg-brand text-white text-3xl font-black rounded-[32px] shadow-xl flex items-center justify-center gap-6 group relative overflow-hidden"
              >
                {redirecting ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                      className="w-8 h-8 border-4 border-white border-t-transparent rounded-full"
                    />
                    <span>กำลังนำคุณไปรับสิทธิ์...</span>
                  </>
                ) : (
                  <>
                    <span>ไปกรอกข้อมูลรับสิทธิ์ตอนนี้</span>
                    <ArrowRight className="w-8 h-8 group-hover:translate-x-2 transition-transform" />
                  </>
                )}
              </motion.button>

              <p className="mt-8 text-slate-400 font-bold text-lg">
                * สิทธิ์มีจำนวนจำกัดต่อเดือนเท่านั้น
              </p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default LandingPage;
