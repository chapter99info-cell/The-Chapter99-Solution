import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, Shield, Zap, Sparkles, MessageSquare, ArrowRight, Star, X, CheckCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const tiers = [
  {
    name: "Starter",
    price: "$149.50",
    originalPrice: "$299",
    description: "Essential digital presence for small shops.",
    features: [
      "Smart PWA Web App (Basic)",
      "Digital Menu with QR Code",
      "Professional Food Photo (10 items)",
      "Essential SEO Setup",
      "Email & Chat Support"
    ],
    cta: "Start Qualification",
    to: "/vip-qualification",
    type: "som",
    popular: false
  },
  {
    name: "Professional",
    price: "$224.50",
    originalPrice: "$449",
    description: "Complete system for growing businesses.",
    features: [
      "Online Ordering & Booking PWA",
      "AI Promo Videos (2 per month)",
      "Automated Social Posting (Basic)",
      "Custom QR Table Labels",
      "Priority 12h Support"
    ],
    cta: "Lock Special Price",
    to: "/service-summary?plan=Professional&price=$224.50",
    type: "summary",
    popular: true
  },
  {
    name: "Growth VIP",
    price: "$299.50",
    originalPrice: "$599",
    description: "Aggressive growth and social media dominance.",
    features: [
      "AI Concierge (Orange AI / น้องส้มสายชู 🍊⚡️)",
      "Unlimited AI Cinematic Content",
      "Cross-Store Ad Network",
      "Full White-Label Branding",
      "Dedicated account manager 24/7"
    ],
    cta: "Talk to Specialist",
    href: "https://m.me/chapter99",
    type: "chat",
    popular: false
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

              <div className="mb-10">
                <h3 className="text-3xl font-black italic mb-2">{tier.name}</h3>
                <p className="text-slate-400 font-medium">{tier.description}</p>
              </div>

              <div className="mb-10">
                <div className="flex items-baseline gap-3 mb-2">
                  <span className="text-2xl font-bold text-slate-400 line-through tracking-tighter">{tier.originalPrice}</span>
                  <span className="text-6xl font-black text-slate-950 tracking-tighter">{tier.price}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-slate-400 font-black uppercase tracking-widest text-xs">Per Month</span>
                  <div className="h-4 w-px bg-slate-200" />
                  <span className="text-brand font-black uppercase tracking-widest text-xs">No Contract</span>
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
    </div>
  );
}
