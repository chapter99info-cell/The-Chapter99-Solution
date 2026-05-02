import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Check, Shield, Zap, Sparkles, MessageSquare, ArrowRight, Star, X, CheckCircle,
  Utensils, Palmtree, Home, Truck, Car
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const tiers = [
  {
    name: "1. FOUNDER'S SPECIAL (LTD)",
    setup: "$600",
    originalSetup: "$1,200",
    price: "$49",
    description: "เหมาะสำหรับร้านที่ต้องการความเรียบง่ายแต่ดูแพงและพรีเมียม",
    features: [
      "FOUNDER'S Setup Fee: $600 (AUD)",
      "Maintenance: $49/mo",
      "Consultant Duty: System setup + Digital Identity",
      "15-20 Professional Food Photos",
      "Chapter99 Standard Digital Menu",
      "QR Code Stand for Tables",
      "Square POS Ready",
      "Minimum 3 Months Contract"
    ],
    cta: "SECURE SPOT",
    to: "/vip-qualification",
    type: "som",
    popular: false
  },
  {
    name: "2. THE CINEMATIC SIGNATURE",
    setup: "$1,200",
    originalSetup: "$2,499",
    price: "$99",
    description: "ยอดนิยม! มัดรวมความ 'ว้าว' ของวิดีโอ Reels เพื่อกระตุ้นยอดขาย",
    features: [
      "FOUNDER'S Setup Fee: $1,200 (AUD)",
      "Maintenance: $99/mo",
      "Consultant Duty: AI Content Tools Installation",
      "AI Tool Package: ปุ่ม AI ช่วย Gen แคปชัน หรือสรุปยอด",
      "30-40 Professional Food Photos",
      "3 Cinematic Reels (15-30 Sec)",
      "ระบบ 'My Picks' Wishlist System",
      "Video Menu Integration",
      "Digital Asset Box (AI Assistant)",
      "Minimum 3 Months Contract"
    ],
    cta: "SECURE SPOT",
    to: "/service-summary?plan=Professional&price=$99",
    type: "summary",
    popular: true
  },
  {
    name: "3. THE BRAND STORYTELLING",
    setup: "$2,499",
    originalSetup: "$4,999",
    price: "$199",
    description: "สำหรับร้านที่ต้องการทำ Branding เต็มรูปแบบระดับ Enterprise",
    features: [
      "FOUNDER'S Setup Fee: $2,499 (AUD)",
      "Maintenance: $199/mo",
      "Consultant Duty: Monthly Photo/Video Refresh",
      "Content Refresh: ถ่ายรูป/Reels ให้ 90 นาที ทุกเดือน",
      "Unlimited Professional Food Photos",
      "7 Cinematic Reels (Weekly Content)",
      "1 Brand Story Video (1-2 Min)",
      "Dedicated Account Manager",
      "Minimum 3 Months Contract"
    ],
    cta: "SECURE SPOT",
    href: "https://m.me/chapter99",
    type: "chat",
    popular: false
  }
];

const industries = [
  {
    title: "ร้านอาหาร (RESTAURANTS)",
    icon: <Utensils className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=800",
    pain: "เมนูกระดาษแก้ไขยาก และไม่ดึงดูดใจ",
    solution: "เมนูดิจิทัลระดับ Cinematic ที่ลูกค้า \"อยากสั่ง\" แค่เพียงได้เห็นวิดีโอ"
  },
  {
    title: "ร้านนวด & สปา (MASSAGE)",
    icon: <Palmtree className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1544161515-4af6b1d462c2?auto=format&fit=crop&q=80&w=800",
    pain: "ลูกค้าจองคิวลำบาก และไม่เห็นบรรยากาศจริง",
    solution: "ภาพถ่าย Serenity Quality พร้อมระบบ \"My Picks\" ให้ลูกค้าเลือกคอร์สได้ง่ายขึ้น"
  },
  {
    title: "ร้านทำเล็บ & ขนตา (BEAUTY)",
    icon: <Sparkles className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1604902396830-aca29e19b067?auto=format&fit=crop&q=80&w=800",
    pain: "ต้องการโชว์งานละเอียดที่มือถือถ่ายไม่ชัด",
    solution: "วิดีโอ Macro Shot โชว์ทุกรายละเอียดความงาม พร้อม AI ช่วยคิดแคปชันโพสต์ IG"
  },
  {
    title: "นายหน้าขายบ้าน (REAL ESTATE)",
    icon: <Home className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=800",
    pain: "รูปโปรไฟล์ไม่ดูเป็นมืออาชีพเท่าเอเจนซี่ใหญ่",
    solution: "Personal Branding Profile ระดับพรีเมียม ช่วยสร้างความเชื่อถือเพื่อปิดดีลใหญ่"
  },
  {
    title: "บริการคลีนนิ่ง & ขนของ",
    icon: <Truck className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1581578731548-c64695ce6958?auto=format&fit=crop&q=80&w=800",
    pain: "ธุรกิจดูไม่เป็นระบบ และลูกค้ากังวลเรื่องความเชื่อมั่น",
    solution: "Digital Business Card และรีวิววิดีโอจากลูกค้าจริง สร้างความมั่นใจใน 1 นาที"
  },
  {
    title: "รถรับส่ง & ทัวร์ส่วนตัว (TRANSFER)",
    icon: <Car className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=800",
    pain: "ลูกค้ากังวลเรื่องความปลอดภัย และไม่เห็นสภาพรถจริง",
    solution: "ภาพถ่ายรถ/คนขับระดับโปร พร้อมระบบจอง (Booking) และรับชำระผ่าน Square บนรถ"
  }
];

const comparisons = [
  { feature: "PWA Web App", starter: true, pro: "Advanced", vip: "Enterprise" },
  { feature: "AI Promo Videos", starter: false, pro: "2 per month", vip: "Unlimited" },
  { feature: "AI Concierge (น้องส้มสายชู)", starter: false, pro: false, vip: true },
  { feature: "QR Code Ordering", starter: "View Only", pro: true, vip: true },
  { feature: "Social Media Automation", starter: false, pro: "Basic", vip: "Full Managed" },
  { feature: "Professional Photography", starter: "10 Items", pro: "20 Items", vip: "Continuous" },
];

const faqs = [
  { q: "ต้องมีสัญญานานแค่ไหน?", a: "ไม่มีสัญญาผูกมัดค่ะ พี่สามารถยกเลิกหรือเปลี่ยนแพ็กเกจได้ทุกเดือนตามความสะดวกของธุรกิจเลยค่ะ" },
  { q: "ทำไมถึงถูกกว่าจ้างพนักงานทั่วไป?", a: "เพราะเราใช้ระบบ AI (น้องส้มสายชู) และ Automation เข้ามาช่วยทำงานซ้ำซ้อนแทนคน ทำให้พี่จ่ายน้อยลง 70% แต่ได้งานคุณภาพพรีเมียมค่ะ" },
  { q: "ถ้าร้านมีเมนูใหม่ทำยังไง?", a: "ในแพ็กเกจ Pro และ VIP เรามีบริการอัปเดตข้อมูลให้ฟรีตลอดอายุการใช้งานค่ะ เพียงส่งรูปมาให้ น้องส้มสายชู จัดการให้เลย" },
  { q: "รองรับการรับเงิน GST ไหม?", a: "รองรับแน่นอนค่ะ ระบบเราออก Tax Invoice แบบมาตรฐานออสเตรเลียได้ทันที สบายใจเรื่องบัญชีได้เลย" },
];

export default function PricingPage() {
  const navigate = useNavigate();
  const [selectedTier, setSelectedTier] = useState<typeof tiers[0] | null>(null);
  const [redirecting, setRedirecting] = useState(false);

  const handleSelect = (tier: typeof tiers[0]) => {
    setSelectedTier(tier);
  };

  const handleConfirm = () => {
    setRedirecting(true);
    setTimeout(() => {
      navigate(`/vip-qualification?plan=${selectedTier?.name.toLowerCase()}`);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-soft-white font-sans text-slate-900 pb-32">
      {/* Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] bg-brand/5 blur-[100px] rounded-full" />
        <div className="absolute bottom-[10%] left-[-5%] w-[30%] h-[30%] bg-champagne/10 blur-[100px] rounded-full" />
      </div>

      <div className="container mx-auto px-6 relative z-10 pt-32">
        <div className="text-center mb-24">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-3 px-6 py-2 mb-8 text-[12px] font-black tracking-[0.4em] text-champagne uppercase border border-champagne/20 rounded-full bg-champagne/5"
          >
            <Zap className="w-4 h-4" />
            <span>Investment Plans</span>
          </motion.div>
          
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.85] italic text-slate-950 mb-10">
            CHOOSE YOUR <br/> <span className="text-brand">ADVANTAGE</span>
          </h1>
          
          <p className="text-2xl text-slate-500 font-black mb-12 uppercase tracking-widest bg-red-600 text-white inline-block px-8 py-2 rounded-xl">
            🔥 FOUNDER'S SPECIAL: 10 SPOTS ONLY! 50% OFF SETUP
          </p>
          
          <p className="text-2xl text-slate-500 font-light max-w-2xl mx-auto leading-relaxed">
            เลือกแพ็กเกจที่ใช่ เพื่อยกระดับธุรกิจของคุณ <br className="hidden md:block"/>
            ก้าวไปสู่การเป็นแบรนด์ระดับไฮเอนด์ในซิดนีย์
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {tiers.map((tier, idx) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className={`relative bg-white rounded-[56px] p-12 border shadow-sm transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 flex flex-col ${
                tier.popular ? 'border-brand ring-4 ring-brand/10' : 'border-slate-100'
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 px-8 py-3 bg-brand text-white text-sm font-black rounded-full shadow-lg flex items-center gap-2">
                  <Star className="w-4 h-4 fill-current" />
                  MOST POPULAR
                </div>
              )}

                <div className="mb-10 text-slate-950">
                  <h3 className="text-3xl font-black italic mb-2">{tier.name}</h3>
                  <p className="text-slate-400 font-medium mb-4">{tier.description}</p>
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-xl font-bold text-slate-400 line-through">{tier.originalSetup}</span>
                    <div className="inline-block px-4 py-1 bg-red-600 text-white rounded-lg text-[10px] font-black uppercase tracking-widest">
                      Founder's Setup: {tier.setup}
                    </div>
                  </div>
                </div>

                <div className="mb-10">
                  <div className="flex items-baseline gap-3 mb-2">
                    <span className="text-6xl font-black text-slate-950 tracking-tighter">{tier.price}</span>
                    <span className="text-xl font-bold text-slate-400">/ mo</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-2 mb-2">Consultant Duty:</p>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-2xl border-l-4 border-brand italic mb-4">
                    <p className="text-sm font-bold text-slate-600">
                      {tier.name.includes("FOUNDER") ? "System setup + Digital Identity" : tier.name.includes("CINEMATIC") ? "AI Content Tools Installation" : "Monthly Photo/Video Refresh"}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-brand font-black uppercase tracking-widest text-[10px]">VIP CARE: Domain & Hosting FREE</span>
                  </div>
                </div>

              <div className="space-y-6 mb-12 flex-grow">
                {tier.features.map((feature) => (
                  <div key={feature} className="flex gap-4 items-start">
                    <div className="mt-1 w-6 h-6 rounded-full bg-brand/10 text-brand flex items-center justify-center shrink-0">
                      <Check className="w-4 h-4" />
                    </div>
                    <span className="text-lg text-slate-600 font-medium">{feature}</span>
                  </div>
                ))}
              </div>

              <button 
                onClick={() => handleSelect(tier)}
                className={`w-full py-6 rounded-3xl text-xl font-black flex items-center justify-center gap-3 transition-all ${
                  tier.popular 
                    ? 'bg-brand text-white shadow-[0_20px_40px_rgba(107,138,37,0.3)] hover:scale-[1.02]' 
                    : 'bg-slate-950 text-white hover:bg-brand'
                }`}
              >
                {tier.type === 'som' && <Sparkles className="w-6 h-6" />}
                {tier.type === 'summary' && <Shield className="w-6 h-6" />}
                {tier.type === 'chat' && <MessageSquare className="w-6 h-6" />}
                <span>{tier.cta}</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              {tier.type === 'som' && (
                <p className="mt-6 text-center text-sm font-black text-brand italic">
                  * ทางเลือกที่ น้องส้มสายชู เชียร์ที่สุด!
                </p>
              )}
            </motion.div>
          ))}
        </div>

        {/* --- EVERY INDUSTRY NEEDS DIGITAL POWER --- */}
        <section className="mt-48 py-32 bg-slate-950 rounded-[80px] overflow-hidden relative">
          {/* Background effects */}
          <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
            <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-brand/30 blur-[120px] rounded-full" />
            <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-brand/20 blur-[100px] rounded-full" />
          </div>

          <div className="container mx-auto px-12 relative z-10">
            <div className="text-center mb-24">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                className="inline-flex items-center gap-2 px-4 py-1 border border-brand/40 rounded-full text-brand text-[10px] font-black uppercase tracking-[0.4em] mb-8"
              >
                <div className="w-1.5 h-1.5 bg-brand rounded-full animate-pulse" />
                WE UNDERSTAND SYDNEY BUSINESS
              </motion.div>
              <h2 className="text-5xl md:text-8xl font-black italic tracking-tighter leading-[0.8] mb-10 text-white">
                EVERY INDUSTRY <br/> <span className="text-brand">NEEDS DIGITAL POWER</span>
              </h2>
              <p className="text-xl md:text-2xl text-slate-400 font-medium max-w-3xl mx-auto leading-relaxed italic">
                เราไม่ใช่แค่เอเจนซี่ แต่เราคือผู้ช่วยสร้าง "เครื่องมือ" จากประสบการณ์จริง 10 ปีในซิดนีย์ เพื่อให้คุณเริ่มต้นได้อย่างแข็งแกร่ง
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {industries.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="group relative bg-slate-900/50 backdrop-blur-md rounded-[48px] border border-white/5 overflow-hidden hover:border-brand/30 transition-all duration-500 hover:-translate-y-2 h-[550px] flex flex-col"
                >
                  {/* Image Header */}
                  <div className="h-2/5 relative overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 opacity-60"
                    />
                    <div className="absolute top-6 left-6 w-12 h-12 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center text-white border border-white/20">
                      {item.icon}
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent " />
                  </div>

                  {/* Content */}
                  <div className="p-10 flex-grow flex flex-col">
                    <h3 className="text-2xl font-black mb-10 tracking-tight text-white italic">{item.title}</h3>
                    
                    <div className="space-y-6">
                      <div className="p-6 bg-red-500/5 border border-red-500/20 rounded-3xl group-hover:bg-red-500/10 transition-colors">
                        <p className="text-[10px] font-black text-red-400 uppercase tracking-widest mb-3">The Pain Point</p>
                        <p className="text-sm font-bold text-red-100/80 leading-relaxed italic">{item.pain}</p>
                      </div>

                      <div className="p-6 bg-brand/5 border border-brand/20 rounded-3xl group-hover:bg-brand/10 transition-colors">
                        <p className="text-[10px] font-black text-brand uppercase tracking-widest mb-3">Our Solution</p>
                        <p className="text-sm font-black text-brand leading-relaxed italic">{item.solution}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* --- SQUARE INTEGRATION --- */}
        <section className="mt-48 relative overflow-hidden">
          <div className="bg-slate-950 rounded-[80px] p-12 md:p-32 text-white relative z-10">
            <div className="grid lg:grid-cols-2 gap-20 items-center">
              <div>
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  className="text-brand font-black tracking-[0.3em] uppercase text-xs mb-8"
                >
                  SECURE PAYMENTS
                </motion.div>
                <h2 className="text-5xl md:text-8xl font-black italic tracking-tighter leading-[0.85] mb-12">
                  INTEGRATED <br /> SOLUTIONS WITH <span className="text-brand underline decoration-brand/30">SQUARE</span>
                </h2>
                <p className="text-2xl text-slate-400 font-medium italic mb-12 leading-relaxed">
                  "เพราะธุรกิจที่ดูโปรฯ ต้องรับชำระเงินได้ง่ายและรวดเร็ว"
                </p>

                <div className="grid gap-8">
                  {[
                    { title: "No Monthly Fees", desc: "Pay only when you take a payment (1.6% per tap). ไม่มีรายเดือนแอบแฝง" },
                    { title: "Fast & Secure", desc: "Next-day transfers to your bank account. โอนเข้าบัญชีธนาคารในวันถัดไปทันที" },
                    { title: "Seamless Sync", desc: "Real-time stock & sales tracking. เช็คสต็อกและยอดขายได้ทุกที่" }
                  ].map((item, i) => (
                    <div key={i} className="flex gap-6 group">
                      <div className="w-12 h-12 bg-brand/10 border border-brand/20 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-brand group-hover:text-white transition-all">
                        <Check className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-xl font-black mb-2 text-brand italic tracking-tight">{item.title}</p>
                        <p className="text-slate-400 font-medium leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative">
                <div className="absolute inset-0 bg-brand/20 blur-[120px] rounded-full" />
                <div className="relative bg-slate-900 border border-white/5 rounded-[64px] p-12 shadow-2xl">
                  <h3 className="text-2xl font-black mb-8 italic text-brand tracking-widest uppercase">CHAPTER99 SETUP INCLUDES:</h3>
                  <div className="space-y-6">
                    {[
                      "Account Configuration: เซตค่าบัญชีธุรกิจให้ถูกต้อง",
                      "Menu & Service Sync: นำข้อมูลจากแอปเข้าสู่ระบบ Square",
                      "Workflow Integration: วางระบบสั่งงานให้ส่งยอดไป POS ทันที",
                      "SETUP FEE INCLUDES FREE SQUARE INTEGRATION!"
                    ].map((step, i) => (
                      <div key={i} className="flex gap-4 items-center">
                        <div className="w-6 h-6 rounded-full bg-brand/10 text-brand flex items-center justify-center shrink-0">
                          <CheckCircle className="w-4 h-4" />
                        </div>
                        <span className="text-lg font-bold text-slate-300">{step}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-12 p-8 bg-slate-800/50 rounded-3xl border border-white/5">
                    <p className="text-xs font-black text-slate-500 uppercase tracking-widest mb-4">📟 เกี่ยวกับอุปกรณ์ (Total Ownership)</p>
                    <p className="text-[13px] text-slate-400 font-medium leading-relaxed italic">
                      "You own the hardware, we provide the smart system." ลูกค้าจะเป็นผู้เลือกซื้ออุปกรณ์ด้วยตนเอง เพื่อให้คุณเป็นเจ้าของธุรกิจอย่างแท้จริง ซื้อครั้งเดียวจบ
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- VISUAL IDENTITY EXPERT --- */}
        <section className="mt-48">
          <div className="text-center mb-24">
            <h2 className="text-5xl md:text-8xl font-black italic tracking-tighter leading-[0.8] mb-12">
              VISUAL IDENTITY <span className="text-brand">EXPERT</span>
            </h2>
            <p className="text-2xl text-slate-500 font-medium max-w-3xl mx-auto leading-relaxed italic">
              เปลี่ยนเมนูเดิมๆ ให้เป็นผลงานระดับ Cinematic ยกระดับภาพลักษณ์ร้านของคุณด้วยงานภาพจากช่างภาพประสบการณ์ 10 ปี ในซิดนีย์ ผสมผสานพลังแห่ง AI
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Still Photography",
                price: "$650 AUD",
                desc: "Studio Quality Images",
                details: [
                  "ช่างภาพมืออาชีพที่เข้าใจแสงและเงา",
                  "AI Image Enhancement: ปรับให้ 'ฉ่ำ'",
                  "ไฟล์ความละเอียดสูงสำหรับพิมพ์เมนู"
                ],
                target: "ร้านที่ต้องการรีเฟรชหน้าตาเมนูให้ดูแพง"
              },
              {
                title: "Cinematic Reels",
                price: "$990 AUD",
                desc: "Stop-the-Scroll Content",
                popular: true,
                details: [
                  "3 Cinematic Reels (15-30 วินาที)",
                  "ตัดต่อทันสมัย พร้อม Sound Effects",
                  "เทคนิค Slow Motion & Macro Shot"
                ],
                target: "ร้านที่ต้องการสร้างกระแสบน TikTok/IG"
              },
              {
                title: "The Master Bundle",
                price: "$2,499 AUD",
                desc: "Full Visual Transformation",
                details: [
                  "รวมบริการ Photography + Cinematic Reels",
                  "Generative AI Art: สร้างฉากหลังพรีเมียม",
                  "การันตี Mood & Tone พรีเมียมทั้งร้าน"
                ],
                target: "ร้านที่ต้องการเปลี่ยนโฉมการตลาดครบวงจร"
              }
            ].map((pkg, i) => (
              <div 
                key={i} 
                className={`p-12 rounded-[56px] border bg-white relative transition-all hover:shadow-2xl hover:-translate-y-2 ${pkg.popular ? 'border-brand' : 'border-slate-100'}`}
              >
                <div className="mb-8">
                  <p className="text-[10px] font-black text-brand uppercase tracking-widest mb-2">{pkg.desc}</p>
                  <h3 className="text-3xl font-black italic text-slate-950">{pkg.title}</h3>
                </div>
                
                <div className="text-5xl font-black text-slate-950 mb-10 tracking-tight">{pkg.price}</div>
                
                <div className="space-y-4 mb-12">
                  {pkg.details.map((d, idx) => (
                    <div key={idx} className="flex gap-4 items-start">
                      <Check className="w-5 h-5 text-brand shrink-0" />
                      <span className="text-slate-600 font-bold">{d}</span>
                    </div>
                  ))}
                </div>

                <div className="p-6 bg-slate-50 rounded-2xl mb-12 italic">
                  <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Best For</p>
                  <p className="text-sm font-bold text-slate-600">{pkg.target}</p>
                </div>

                <button className="w-full py-5 bg-slate-950 hover:bg-brand text-white font-black rounded-2xl transition-all">
                  BOOK A SHOOT
                </button>
              </div>
            ))}
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="mt-20 p-12 bg-red-600 rounded-[64px] text-white text-center relative overflow-hidden"
          >
            <div className="relative z-10">
              <h3 className="text-4xl md:text-6xl font-black italic mb-6">🔥 สมัครใช้งานระบบวันนี้... <br/> รับส่วนลดทันที $500!</h3>
              <p className="text-xl md:text-2xl font-bold opacity-90 mb-10 max-w-2xl mx-auto italic">
                เราไม่ได้แค่ถ่ายรูปให้คุณ แต่เราสร้างระบบที่ช่วยให้พนักงานของคุณทำงานง่ายขึ้นและลูกค้าประทับใจมากขึ้น
              </p>
              <div className="flex flex-col items-center gap-6">
                <div className="flex items-center gap-6">
                  <span className="text-4xl font-bold line-through opacity-50">$2,499</span>
                  <span className="text-7xl font-black tracking-tighter">$1,999 AUD</span>
                </div>
                <div className="px-10 py-4 bg-white text-red-600 rounded-full font-black text-2xl uppercase tracking-widest shadow-2xl">
                  YOU SAVE $500 INSTANTLY
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* --- COMPARE FEATURES TABLE --- */}
        <section className="mt-48 overflow-hidden rounded-[48px] bg-white border border-slate-100 shadow-sm">
          <div className="p-12 md:p-20">
            <h2 className="text-4xl md:text-5xl font-black italic tracking-tighter mb-16">Compare <span className="text-brand">Features</span></h2>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-slate-100">
                    <th className="py-8 text-sm font-black uppercase tracking-[0.3em] text-slate-400">Services</th>
                    <th className="py-8 text-sm font-black uppercase tracking-[0.3em] text-center">Starter</th>
                    <th className="py-8 text-sm font-black uppercase tracking-[0.3em] text-center text-brand">Professional</th>
                    <th className="py-8 text-sm font-black uppercase tracking-[0.3em] text-center">Growth VIP</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {comparisons.map((row) => (
                    <tr key={row.feature} className="group hover:bg-slate-50/50 transition-colors">
                      <td className="py-8 text-lg font-bold text-slate-900 pr-8">{row.feature}</td>
                      <td className="py-8 text-center">
                        {typeof row.starter === 'boolean' ? (
                          row.starter ? <Check className="w-6 h-6 mx-auto text-slate-300" /> : <X className="w-6 h-6 mx-auto text-slate-200" />
                        ) : <span className="text-slate-500 font-bold">{row.starter}</span>}
                      </td>
                      <td className="py-8 text-center bg-brand/5 px-4">
                        {typeof row.pro === 'boolean' ? (
                          row.pro ? <Check className="w-6 h-6 mx-auto text-brand" /> : <X className="w-6 h-6 mx-auto text-slate-200" />
                        ) : <span className="text-brand font-black">{row.pro}</span>}
                      </td>
                      <td className="py-8 text-center">
                        {typeof row.vip === 'boolean' ? (
                          row.vip ? <Check className="w-6 h-6 mx-auto text-slate-900" /> : <X className="w-6 h-6 mx-auto text-slate-200" />
                        ) : <span className="text-slate-900 font-black">{row.vip}</span>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* --- SUCCESS STORIES --- */}
        <section className="mt-48">
          <div className="text-center mb-24">
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-brand font-black tracking-[0.4em] uppercase text-xs mb-8"
            >
              SUCCESS STORIES
            </motion.div>
            <h2 className="text-5xl md:text-8xl font-black italic tracking-tighter leading-[0.8] mb-12">
              TRUSTED BY <span className="text-brand">BUSINESSES</span>
            </h2>
            <p className="text-xl text-slate-500 font-medium italic">
              เสียงตอบรับจากพาร์ทเนอร์ที่ไว้วางใจให้ Chapter99 ดูแลภาพลักษณ์และสื่อ Cinematic
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                industry: "RESTAURANT",
                quote: "ยอดขายพุ่งขึ้น 30% เพราะวิดีโอ Cinematic ใน My Picks ลูกค้าสั่งตามง่ายมาก ไม่ต้องอธิบายเยอะเลยครับ",
                english: "Sales up 30% thanks to Cinematic videos in My Picks. Ordering is so much easier for customers.",
                author: "Chef Tan",
                shop: "Baan Thai Cuisine"
              },
              {
                industry: "MASSAGE & SPA",
                quote: "ภาพถ่ายห้องนวดสวยสงบมาก ช่วยให้ลูกค้าตัดสินใจจองได้ง่ายขึ้นเยอะ โดยเฉพาะลูกค้าต่างชาติชอบมากค่ะ",
                english: "Stunning, peaceful room photos helped customers decide to book much faster, especially tourists.",
                author: "K. May",
                shop: "Serenity Thai Massage"
              },
              {
                industry: "BEAUTY",
                quote: "งานวิดีโอ Macro เห็นรายละเอียดชัดเจนมาก แตกต่างจากร้านอื่นในย่านนี้ทันที ยกระดับแบรนด์ให้ดูแพงเลยค่ะ",
                english: "Macro videos show every detail perfectly. It instantly sets us apart and elevates our brand.",
                author: "K. Bow",
                shop: "Lush Studio Sydney"
              }
            ].map((story, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                className="bg-white p-12 rounded-[56px] border border-slate-100 shadow-sm hover:shadow-xl transition-all"
              >
                <p className="text-[10px] font-black text-brand uppercase tracking-widest mb-8">{story.industry}</p>
                <p className="text-xl font-bold text-slate-800 italic mb-6 leading-relaxed">"{story.quote}"</p>
                <p className="text-sm text-slate-400 italic mb-8">"{story.english}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center font-black text-slate-400">
                    {story.author[0]}
                  </div>
                  <div>
                    <p className="font-black text-slate-900">{story.author}</p>
                    <p className="text-xs font-bold text-slate-400">{story.shop}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* --- FAQ SECTION --- */}
        <section className="mt-48 max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black italic tracking-tighter mb-4">Frequently Asked <span className="text-brand">Questions</span></h2>
            <p className="text-xl text-slate-500">น้องส้มสายชู คัดคำถามที่พี่ๆ สงสัยมาตอบให้แล้วค่ะ 🍊⚡️</p>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="p-8 bg-white rounded-3xl border border-slate-100 shadow-sm"
              >
                <h4 className="text-xl font-black mb-4 flex items-center gap-3">
                  <span className="w-8 h-8 bg-brand/10 text-brand rounded-lg flex items-center justify-center shrink-0 text-sm">Q</span>
                  {faq.q}
                </h4>
                <p className="text-slate-600 pl-11 text-lg italic leading-relaxed">
                  {faq.a}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Footer Guarantee */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-32 p-12 bg-slate-950 rounded-[64px] text-white text-center flex flex-col md:flex-row items-center justify-between gap-10"
        >
          <div className="text-left">
            <h4 className="text-3xl font-black italic mb-2">Unsure which plan is right?</h4>
            <p className="text-slate-400 text-xl font-light">Let us build a custom roadmap for your unique business needs.</p>
          </div>
          <Link 
            to="/contact"
            className="px-12 py-6 bg-white text-slate-950 text-xl font-black rounded-3xl hover:bg-brand hover:text-white transition-all whitespace-nowrap"
          >
            Custom Quote
          </Link>
        </motion.div>
      </div>

      {/* --- CONFIRMATION MODAL --- */}
      <AnimatePresence>
        {selectedTier && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
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

              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', damping: 12, stiffness: 200, delay: 0.2 }}
                className="w-32 h-32 bg-brand/10 text-brand rounded-full flex items-center justify-center mx-auto mb-10"
              >
                <CheckCircle className="w-16 h-16" />
              </motion.div>

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
      {/* --- FOOTER (MINI) --- */}
      <footer className="py-24 border-t border-slate-100 flex flex-col items-center gap-6 text-center text-slate-400 text-xs uppercase tracking-[0.2em] italic">
        <div className="flex items-center gap-6 text-slate-400">
          <a href="https://www.facebook.com/profile.php?id=61586534972406" target="_blank" rel="noreferrer" className="hover:text-brand transition-colors">Facebook</a>
          <span>•</span>
          <a href="#" className="hover:text-brand transition-colors">Instagram</a>
        </div>
        <div>
          © 2026 CHAPTER99 SOLUTIONS • SYDNEY AUSTRALIA
        </div>
      </footer>
    </div>
  );
}
