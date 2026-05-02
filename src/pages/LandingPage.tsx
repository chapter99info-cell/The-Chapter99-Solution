import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { Sparkles, Camera, Smartphone, Users, ChevronRight, CheckCircle2, Play, MessageCircle, ArrowUpRight, X, CheckCircle, ArrowRight, Zap, Phone } from 'lucide-react';

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
              { num: "02", title: "ออกแบบไอเดีย", desc: "ดีไซน์ Web/App ที่ทันสมัยและใช้งานง่าย", icon: <Sparkles className="w-10 h-10" /> },
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
                "พี่เชื่อมือเถอะค่ะ! แค่เปลี่ยนมุมกล้องและจัดแสงแบบ Chapter99 ร้านพี่ก็กลายเป็นร้านมิชลินได้ในพริบตา! ใครๆ เห็นรูปสวยๆ ก็อยากจะเข้ามาสัมผัสบรรยากาศจริงและสั่งอาหารทันทีเลยค่ะ!" 🍊⚡️
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

      {/* --- 4 STEPS MASTERY (SYDNEY EDITION) --- */}
      <section className="py-24 bg-white border-b border-slate-100">
        <div className="container px-6 mx-auto">
          <div className="max-w-6xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-20"
            >
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                className="inline-block px-6 py-2 bg-slate-900 text-white rounded-full text-[10px] font-black tracking-[0.4em] mb-6 uppercase"
              >
                The Sydney Sales Engine 🇦🇺
              </motion.div>
              <h2 className="text-4xl md:text-7xl font-black italic tracking-tighter mb-6 leading-[0.9]">
                "Westerners <span className="text-brand">Buy With Their Eyes</span>"
              </h2>
              <p className="text-xl md:text-2xl text-slate-500 font-bold italic max-w-3xl mx-auto">
                ดึงดูดลูกค้าฝรั่งด้วยภาพลักษณ์ระดับอินเตอร์ และการตลาดภาษาอังกฤษที่โดนใจ <br />
                ดูแลโดยพี่แสน (Sydney Local Experience 29 Years) 🍊⚡️
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { icon: "💡", title: "คุยคอนเซปต์", desc: "วางแผนแบรนด์ให้เปรี้ยวจี๊ด แตกต่างเพื่อเข้าถึงตลาดซิดนีย์โดยเฉพาะ" },
                { icon: "📸", title: "Cinematic Photo", desc: "ถ่ายภาพอาหาร/นวด สไตล์ Cinema ดูแพงจนฝรั่งต้องเหลียวมอง" },
                { icon: "🎨", title: "AI Visual Content", desc: "ใช้ AI สร้าง Content สวยๆ อัปเดตโซเชียลให้ร้านดูเคลื่อนไหวตลอดเวลา" },
                { icon: "🚀", title: "English PWA V4", desc: "ระบบสั่งงานภาษาอังกฤษที่ลื่นไหล ใช้ง่าย เหมือนแบรนด์ระดับสากล" }
              ].map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="p-10 bg-slate-50 rounded-[48px] border-2 border-transparent hover:border-brand/20 transition-all text-center group relative overflow-hidden"
                >
                  <div className="absolute top-4 right-6 text-brand/20 font-black text-6xl">0{i+1}</div>
                  <div className="text-6xl mb-8 group-hover:scale-125 transition-transform relative z-10">{step.icon}</div>
                  <h4 className="text-2xl font-black mb-4 italic relative z-10">{step.title}</h4>
                  <p className="text-slate-600 font-bold leading-relaxed relative z-10">{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- PRICING SECTION (SYDNEY EDITION) --- */}
      <section id="pricing" className="py-48 bg-slate-50 relative overflow-hidden">
        <div className="container px-6 mx-auto relative z-10">
          <div className="max-w-5xl mx-auto text-center mb-32">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-brand font-black uppercase tracking-[0.5em] mb-6 text-sm"
            >
              V4 PREMIUM PACKAGES (AUD)
            </motion.div>
            <h2 className="text-5xl md:text-[9rem] font-black italic tracking-tighter leading-[0.8] mb-12">
              Invest in <br /> <span className="text-brand">Growth.</span>
            </h2>
            
            <div className="inline-flex flex-col md:flex-row items-center gap-10 bg-white p-10 rounded-[48px] shadow-2xl border-4 border-brand/20">
              <div className="flex flex-col items-center">
                <div className="bg-[#A3E635] text-slate-950 px-8 py-3 rounded-2xl rotate-[-2deg] mb-2 font-black text-2xl italic tracking-tighter">
                  VIP CARE HOOK
                </div>
                <Users className="w-10 h-10 text-brand" />
              </div>
              <div className="text-left">
                <p className="text-2xl md:text-3xl font-black text-slate-950 leading-tight italic">
                  "Stay with us, and your website stays online for FREE!"
                </p>
                <p className="text-lg text-slate-500 font-bold mt-2">
                  ฟรี Domain & Hosting ปีแรก! และฟรีต่อเนื่องในปีถัดไปตราบเท่าที่มีการใช้งานระบบรายเดือน ⚡️
                </p>
              </div>
            </div>
          </div>
          
          <div className="grid gap-12 lg:grid-cols-3 items-end mb-32">
            {[
              { 
                name: "Starter Package", 
                setup: "299",
                price: "30", 
                tag: "ทางเลือกเริ่มต้นสำหรับร้านสไตล์มินิมอล",
                features: [
                  "Setup Fee: $299 (จ่ายครั้งเดียวจบ)",
                  "ฟรี Domain & Hosting (ตลอดอายุสมาชิก)",
                  "ถ่ายภาพ 60 นาที (15 รูป)",
                  "English Menu Online",
                  "Add-on: ระบบจอง/POS/Ordering"
                ],
                cta: "💬 ทักแชทคุยคอนเซปต์กับน้องส้ม"
              },
              { 
                name: "Professional Package", 
                setup: "499",
                price: "49", 
                recommended: true,
                tag: "Visuals + Sales Engine สำหรับการเติบโตแบบก้าวกระโดด",
                features: [
                  "Setup Fee: $499 (จ่ายครั้งเดียวจบ)",
                  "ฟรี Domain & Hosting (ตลอดอายุสมาชิก)",
                  "ถ่ายภาพ 90 นาที (25 รูป + 1 Reel)",
                  "Advanced Menu (English Focus)",
                  "Add-on: ระบบจอง/POS/Ordering"
                ],
                cta: "💬 ทักแชทจองคิวพี่แสน (ยอดนิยม!)"
              },
              { 
                name: "Growth VIP Package", 
                setup: "699",
                price: "99", 
                tag: "Full English Marketing & AI อัปเดตตลาดทุกสัปดาห์",
                features: [
                  "Setup Fee: $699 (จ่ายครั้งเดียวจบ)",
                  "ฟรี Domain & Hosting (ตลอดอายุสมาชิก)",
                  "ถ่ายภาพ 120 นาที (3 Reels + รูปไม่จำกัด)",
                  "Full Marketing Content (English)",
                  "Add-on: ระบบจอง/POS/Ordering"
                ],
                cta: "💬 ทักแชทรับสิทธิ์ VIP กับพี่แสน"
              }
            ].map((plan, idx) => (
              <motion.div 
                key={idx}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.8 }}
                className={`flex flex-col relative p-12 md:p-16 rounded-[64px] border-4 transition-all duration-700 min-h-[950px] ${
                  plan.recommended 
                  ? 'bg-white border-brand shadow-[0_60px_120px_-20px_rgba(184,150,46,0.2)] z-20 scale-105' 
                  : 'bg-white border-slate-100 hover:border-brand/30'
                }`}
              >
                {plan.recommended && (
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-brand text-white px-10 py-3 rounded-full text-xs font-black uppercase tracking-widest shadow-xl whitespace-nowrap">
                    Best Value for Sydney Businesses 🇦🇺⚡️
                  </div>
                )}
                
                <div className="mb-12 text-slate-950">
                  <div className="mb-8">
                    <h3 className="text-4xl font-black italic tracking-tighter mb-4">{plan.name}</h3>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="px-4 py-1 bg-slate-900 text-white rounded-lg text-[10px] font-black uppercase tracking-widest">
                        Setup Fee: ${plan.setup}
                      </div>
                    </div>
                    <div className="flex items-baseline gap-4 mb-2 text-slate-950">
                      <span className="text-7xl font-black tracking-tighter">${plan.price}</span>
                      <span className="text-xl font-bold text-slate-400">/ Month (AUD)</span>
                    </div>
                  </div>
                  <p className="text-xl font-bold text-slate-600 leading-relaxed italic border-l-4 border-brand pl-6">{plan.tag}</p>
                </div>

                <div className="flex-1 mb-12 text-slate-950">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-8">What's Included:</p>
                  <ul className="space-y-6">
                    {plan.features.map((f, i) => (
                      <li key={i} className="flex items-start gap-4 text-xl font-bold">
                        <CheckCircle2 className={`w-6 h-6 flex-shrink-0 text-brand mt-1`} />
                        <span className="opacity-90">{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-4">
                  <a 
                    href="https://m.me/chapter99.solutions"
                    target="_blank"
                    rel="noreferrer"
                    className={`w-full py-8 text-xl font-black rounded-[32px] transition-all duration-500 shadow-xl flex items-center justify-center gap-4 group ${
                    plan.recommended 
                    ? 'bg-brand text-white hover:scale-105' 
                    : 'bg-slate-950 text-white hover:bg-brand'
                    }`}
                  >
                    <MessageCircle className="w-6 h-6" />
                    <span>{plan.cta}</span>
                  </a>
                </div>
              </motion.div>
            ))}
          </div>

          {/* --- VISUAL & COPY SHOWCASE (SYDNEY SAMPLES) --- */}
          <div className="max-w-6xl mx-auto mb-32">
            <div className="text-center mb-16">
              <h3 className="text-3xl md:text-5xl font-black italic tracking-tighter mb-4">คุณภาพที่คุณจะได้รับ</h3>
              <p className="text-xl text-slate-500 font-bold italic">ตัวอย่างงานภาพและ English Copywriting สไตล์ V4 🍊⚡️</p>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
              {/* Product Sample 1 */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-[48px] overflow-hidden shadow-xl border border-slate-100 group"
              >
                <div className="aspect-video bg-slate-200 relative overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=800" 
                    alt="Pad Thai King Prawn"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-6 left-6 bg-brand text-white px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest shadow-lg">
                    Restaurant Sample
                  </div>
                </div>
                <div className="p-10">
                  <h4 className="text-2xl font-black mb-4 flex items-center gap-3">
                    Pad Thai King Prawn (Signature)
                    <span className="text-brand">🍊</span>
                  </h4>
                  <div className="p-6 bg-slate-50 rounded-2xl border-l-4 border-brand italic font-medium text-slate-600 leading-relaxed">
                    "A Sydney icon with a Bangkok soul. Signature wok-tossed rice noodles featuring succulent King Prawns, crushed peanuts, and our secret 12-hour tamarind glaze. Experience the perfect balance of sweet, sour, and savory." 🥢🔥
                  </div>
                </div>
              </motion.div>

              {/* Product Sample 2 */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-[48px] overflow-hidden shadow-xl border border-slate-100 group"
              >
                <div className="aspect-video bg-slate-200 relative overflow-hidden">
                  <video 
                    src="https://firebasestorage.googleapis.com/v0/b/chapter99-solution.firebasestorage.app/o/VDO%2F%E0%B8%A7%E0%B8%B4%E0%B8%94%E0%B8%B5%E0%B9%82%E0%B8%AD%E0%B8%99%E0%B8%A7%E0%B8%94%E0%B8%99%E0%B9%89%E0%B8%B3%E0%B8%A1%E0%B8%B1%E0%B8%99%E0%B8%AD%E0%B9%82%E0%B8%A3%E0%B8%A1%E0%B9%88%E0%B8%B2.mp4?alt=media&token=39b1c008-c9a1-4416-8bdb-1d31b2ee53bf"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    autoPlay
                    loop
                    muted
                    playsInline
                  />
                  <div className="absolute top-6 left-6 bg-brand text-white px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest shadow-lg">
                    Massage Sample
                  </div>
                </div>
                <div className="p-10">
                  <h4 className="text-2xl font-black mb-4 flex items-center gap-3">
                    Deep Tissue (Office Syndrome Remedy)
                    <span className="text-brand">🧘‍♂️</span>
                  </h4>
                  <div className="p-6 bg-slate-50 rounded-2xl border-l-4 border-brand italic font-medium text-slate-600 leading-relaxed text-lg">
                    "Escape the Sydney hustle. Our specialized Deep Tissue therapy targets stubborn knots and chronic tension, specifically designed to relieve Office Syndrome. Restore your body’s alignment and feel the weight lift off your shoulders." 💆‍♂️✨
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Exclusive Contact Info */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto p-12 bg-white rounded-[48px] border-4 border-orange-100 shadow-xl text-center mb-24"
          >
            <h4 className="text-2xl font-black text-slate-900 mb-6 italic uppercase tracking-tight">Exclusive Contact</h4>
            <p className="text-xl text-slate-600 font-bold italic leading-relaxed">
              "เพื่อให้พี่แสนสามารถวิเคราะห์รูปแบบธุรกิจ และดูแลโปรเจกต์ V4 ของคุณได้อย่างลึกซึ้งที่สุด เราขออนุญาตรับการติดต่อเพื่อขอใบเสนอราคาผ่านทาง Facebook Messenger เท่านั้นนะคะ ทักมาพูดคุยคอนเซปต์กันก่อนได้เลยค่ะ น้องส้มสแตนบายรอพาไปเจอพี่แสนอยู่นะคะ!" 🍊⚡️
            </p>
          </motion.div>

          {/* --- PROJECT BRIEF FORM (FROM SCREENSHOT) --- */}
          <div id="contact" className="max-w-4xl mx-auto">
            <motion.div 
               initial={{ opacity: 0, scale: 0.95 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true }}
               className="bg-white rounded-[64px] shadow-3xl border-4 border-orange-100 p-12 md:p-20 relative overflow-hidden"
            >
              <div className="relative z-10">
                <div className="flex items-center gap-6 mb-16">
                  <div className="w-16 h-16 bg-orange-500 rounded-3xl flex items-center justify-center text-4xl shadow-xl rotate-6">
                    🍊
                  </div>
                  <div>
                    <h3 className="text-3xl font-black italic tracking-tight">ส่ง Project Brief ให้พี่แสน</h3>
                    <p className="text-slate-500 font-bold italic">ข้อมูลจะถูกส่งถึงพี่แสนที่ <span className="text-orange-600">chapter99info@gmail.com</span> ทันที ⚡️</p>
                  </div>
                </div>

                <div className="grid gap-12">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <label className="text-sm font-black text-slate-800 uppercase tracking-widest pl-4">ชื่อพี่ / ชื่อร้าน (Name / Shop)</label>
                      <input 
                        type="text" 
                        placeholder="ระบุชื่อพี่หรือชื่อร้านค่ะ"
                        className="w-full px-8 py-6 bg-slate-50 border-2 border-transparent focus:border-orange-500 focus:bg-white rounded-[24px] text-lg font-bold transition-all outline-none"
                      />
                    </div>
                    <div className="space-y-4">
                      <label className="text-sm font-black text-slate-800 uppercase tracking-widest pl-4">เบอร์โทรติดต่อ (AU Phone)</label>
                      <input 
                        type="tel" 
                        placeholder="04xx xxx xxx"
                        className="w-full px-8 py-6 bg-slate-50 border-2 border-transparent focus:border-orange-500 focus:bg-white rounded-[24px] text-lg font-bold transition-all outline-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <label className="text-sm font-black text-slate-800 uppercase tracking-widest pl-4">อีเมล (Email)</label>
                    <input 
                      type="email" 
                      placeholder="your@email.com"
                      className="w-full px-8 py-6 bg-slate-50 border-2 border-transparent focus:border-orange-500 focus:bg-white rounded-[24px] text-lg font-bold transition-all outline-none"
                    />
                  </div>

                  <div className="space-y-6">
                    <div className="flex items-center gap-4 text-slate-800 font-black italic text-xl">
                      <MessageCircle className="w-6 h-6 text-orange-500" />
                      <span>สิ่งที่พี่อยากปรึกษาน้องส้มเป็นพิเศษ (Inquiry)</span>
                    </div>
                    <textarea 
                      placeholder="เช่น อยากเปลี่ยนเมนูภาษาอังกฤษใหม่, อยากถ่ายวีดีโอ Reels สวยๆ แบบฝรั่งชอบ, อยากทำ App จองนวด..."
                      className="w-full px-8 py-8 bg-slate-50 border-2 border-transparent focus:border-orange-500 focus:bg-white rounded-[32px] text-lg font-bold transition-all outline-none min-h-[150px] resize-none"
                    />
                  </div>

                  <div className="space-y-6">
                    <div className="flex items-center gap-4 text-slate-800 font-black italic text-xl">
                      <Zap className="w-6 h-6 text-orange-500" />
                      <span>แพ็กเกจที่พี่สนใจ (Package Interest)</span>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      {[
                        { label: 'Starter Package ($299)', desc: 'เน้นเริ่มระบบและ Content พื้นฐาน' },
                        { label: 'Professional Package ($499)', desc: 'เน้นขยายตลาดและ Reels ประจำเดือน' },
                        { label: 'Growth VIP Package ($699)', desc: 'ดูแลแบรนด์ครบวงจร Marketing เต็มรูปแบบ' },
                        { label: 'คุยคอนเซปต์ก่อนค่ะ', desc: 'ยังไม่แน่ใจ อยากให้น้องส้มช่วยแนะนำ' }
                      ].map((opt, i) => (
                        <label key={i} className="flex flex-col p-6 bg-slate-50 border-2 border-transparent hover:border-orange-500/30 rounded-[32px] cursor-pointer transition-all group">
                          <input type="radio" name="budget" className="hidden" />
                          <span className="text-lg font-black text-slate-900 mb-1 group-hover:text-orange-500">{opt.label}</span>
                          <span className="text-xs font-bold text-slate-400 italic">{opt.desc}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <button 
                    onClick={() => alert('ข้อมูลของพี่ถูกส่งถึงพี่แสนที่ chapter99info@gmail.com แล้วค่ะ! รอน้องส้มหรือพี่แสนติดต่อกลับทาง Phone / Email / Inbox นะคะ 🍊🧡')}
                    className="w-full py-10 bg-brand/90 hover:bg-brand text-slate-950 text-2xl font-black rounded-[40px] shadow-2xl flex items-center justify-center gap-6 group transition-all"
                  >
                    <ArrowRight className="w-8 h-8 group-hover:translate-x-4 transition-transform" />
                    <span>กดส่งข้อมูลรับส่วนลด 50% ทันที!</span>
                  </button>
                  
                  <div className="p-8 bg-orange-50 rounded-[32px] border border-orange-100 italic">
                    <p className="text-sm font-bold text-orange-800 mb-2">💡 VIP Care Policy:</p>
                    <p className="text-xs text-orange-600 font-bold">"จ่ายรายเดือนเท่าเดิม เราดูแลค่า Domain และ Hosting ให้พี่ฟรีตลอดอายุสมาชิก ไม่ต้องปวดหัวเรื่องบิลรายปีค่ะ!"</p>
                  </div>

                  <p className="text-center text-slate-400 text-xs font-bold italic">
                    ข้อมูลของพี่จะถูกเก็บระนาบเดียวกับความลับสวรรค์ และปลอดภัยตามมาตรฐาน Privacy Acts 🇦🇺
                  </p>
                </div>
              </div>
            </motion.div>
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
                คุณพร้อมที่จะ <br className="md:hidden" /> <span className="italic">Transform</span> หรือยัง?
              </motion.h2>
              <p className="text-xl md:text-3xl text-white font-medium max-w-2xl mx-auto opacity-90">
                มาร่วมเป็นหนึ่งในธุรกิจไทยระดับหัวแถวในซิดนีย์ กับระบบ V4 ที่ดีที่สุด
              </p>
              
              <div className="pt-8">
                <a 
                  href="#pricing"
                  className="px-12 py-6 bg-white text-slate-950 text-xl font-black rounded-2xl shadow-xl flex items-center gap-4 mx-auto group hover:scale-105 transition-all w-fit"
                >
                  เลื่อนไปจองสิทธิ์ส่วนลด 50%
                  <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>

              <motion.p 
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-sm font-black uppercase tracking-[0.3em] text-[#A3E635]"
              >
                Limited to 10 Clients Only - เหลือเพียง 3 สิทธิ์สุดท้ายของเดือน!
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
                  <li><a href="https://www.facebook.com/profile.php?id=61586534972406" target="_blank" rel="noreferrer" className="hover:text-brand transition-colors">Facebook: Chapter99</a></li>
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
