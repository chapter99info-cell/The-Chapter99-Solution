import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Clock, Timer, Sparkles, Send, CheckCircle2, MapPin, Building2, Wallet, MessageSquare, ArrowLeft } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { toast } from 'sonner';

import { db, auth } from '../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  }
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData?.map(provider => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || []
    },
    operationType,
    path
  }
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

export default function VIPQualificationPage() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialPlan = queryParams.get('plan') || 'basic';

  const [timeLeft, setTimeLeft] = useState({ minutes: 59, seconds: 59 });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    storeName: '',
    businessType: 'restaurant',
    location: '',
    challenge: '',
    budget: 'basic'
  });

  useEffect(() => {
    // Auto-select budget based on plan parameter
    const plan = initialPlan.toLowerCase();
    if (plan === 'master' || plan === 'professional') setFormData(prev => ({ ...prev, budget: 'standard' }));
    else if (plan === 'elite' || plan === 'growth-vip') setFormData(prev => ({ ...prev, budget: 'premium' }));
    else if (plan === 'essential' || plan === 'starter') setFormData(prev => ({ ...prev, budget: 'basic' }));
  }, [initialPlan]);

  const getWelcomeMessage = () => {
    const planMap: Record<string, string> = {
      essential: 'Essential',
      master: 'Master',
      elite: 'Elite',
      starter: 'Starter',
      professional: 'Professional',
      'growth-vip': 'Growth VIP'
    };
    const displayName = planMap[initialPlan.toLowerCase()] || initialPlan;
    return `คุณกำลังได้รับสิทธิ์ส่วนลด 50% สำหรับแพ็กเกจ ${displayName}`;
  };

  const welcomeMessage = getWelcomeMessage();

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { minutes: prev.minutes - 1, seconds: 59 };
        }
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const path = 'leads';
      await addDoc(collection(db, path), {
        ...formData,
        selectedPlan: initialPlan,
        createdAt: serverTimestamp(),
        userId: auth.currentUser?.uid || null,
        userEmail: auth.currentUser?.email || null
      });
      
      setIsSubmitted(true);
      toast.success('ได้รับข้อมูลแล้ว น้องส้มและพี่แสนจะติดต่อกลับเพื่อคุยคอนเซปต์โดยเร็วที่สุด', {
        duration: 5000,
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, 'leads');
      toast.error('ขออภัย เกิดข้อผิดพลาดในการส่งข้อมูล กรุณาลองใหม่อีกครั้ง');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-soft-white flex items-center justify-center p-6 text-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-xl bg-white p-12 rounded-[40px] shadow-2xl border border-champagne/20"
        >
          <div className="w-24 h-24 bg-brand/10 text-brand rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircle2 className="w-12 h-12" />
          </div>
          <h1 className="text-4xl font-black mb-6 text-slate-900">ส่งข้อมูลสำเร็จ!</h1>
          <p className="text-2xl text-slate-600 leading-relaxed font-medium">
            ได้รับข้อมูลแล้ว <br/>
            <span className="text-brand">น้องส้มและพี่แสน</span> <br/>
            จะติดต่อกลับเพื่อคุยคอนเซปต์โดยเร็วที่สุด
          </p>
          <Link to="/" className="mt-12 inline-block px-12 py-5 bg-champagne text-slate-900 font-black rounded-2xl shadow-xl hover:scale-105 transition-all">
            กลับหน้าหลัก
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-soft-white font-sans text-slate-900 selection:bg-champagne selection:text-slate-900 pb-20">
      {/* --- URGENCY HEADER --- */}
      <div className="bg-gradient-to-r from-red-600 via-orange-600 to-red-600 py-4 px-6 text-center text-white sticky top-0 z-40 shadow-xl overflow-hidden">
        <motion.div 
          animate={{ x: [0, 5, 0] }}
          transition={{ duration: 1, repeat: Infinity }}
          className="container mx-auto flex flex-col md:flex-row items-center justify-center gap-4"
        >
          <div className="flex items-center gap-3">
            <Timer className="w-6 h-6 animate-pulse" />
            <span className="text-xl md:text-3xl font-black italic tracking-tighter uppercase">
              เหลือเพียง 4 สิทธิ์สุดท้ายสำหรับโปรโมชั่น 50%
            </span>
          </div>
          <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-xl backdrop-blur-sm text-2xl font-black font-mono">
            <span>{timeLeft.minutes.toString().padStart(2, '0')}</span>
            <span className="animate-pulse">:</span>
            <span>{timeLeft.seconds.toString().padStart(2, '0')}</span>
          </div>
        </motion.div>
      </div>

      <div className="container mx-auto max-w-4xl pt-24 px-6">
        {/* --- HEADER --- */}
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-3 px-6 py-2 mb-8 text-[12px] font-black tracking-[0.4em] text-brand uppercase border border-brand/20 rounded-full bg-brand/5"
          >
            <Sparkles className="w-4 h-4" />
            <span>🔥 {welcomeMessage}</span>
          </motion.div>
          
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.9] italic text-slate-950 mb-8">
            THE VIP <br/> <span className="text-champagne">QUALIFICATION</span>
          </h1>
          
          <p className="text-2xl text-slate-500 font-light max-w-2xl mx-auto leading-relaxed">
            คัดกรองข้อมูลเบื้องต้นเพื่อให้ทีมงานเตรียมแผนงาน <br className="hidden md:block"/>
            ที่ตอบโจทย์ร้านของคุณได้อย่างแม่นยำที่สุด
          </p>
        </div>

        {/* --- FORM --- */}
        <motion.section 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white p-10 md:p-20 rounded-[64px] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.05)] border border-white/50"
        >
          <form onSubmit={handleSubmit} className="space-y-12">
            
            {/* Store Name */}
            <div className="space-y-4">
              <label className="flex items-center gap-3 text-2xl font-black text-slate-800">
                <Building2 className="w-6 h-6 text-brand" />
                <span>ชื่อร้านของคุณ (Store Name)</span>
              </label>
              <input 
                required
                type="text" 
                value={formData.storeName}
                onChange={(e) => setFormData({ ...formData, storeName: e.target.value })}
                placeholder="ระบุชื่อร้านอาหารหรือร้านนวด..."
                className="w-full px-8 py-6 text-2xl bg-slate-50 border-2 border-transparent focus:border-champagne focus:bg-white rounded-3xl outline-none transition-all placeholder:text-slate-300"
              />
            </div>

            {/* Business Type */}
            <div className="space-y-4">
              <label className="flex items-center gap-3 text-2xl font-black text-slate-800">
                <Sparkles className="w-6 h-6 text-brand" />
                <span>ประเภทธุรกิจ (Business Type)</span>
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className="relative group cursor-pointer">
                  <input 
                    type="radio" 
                    name="businessType" 
                    value="restaurant" 
                    checked={formData.businessType === 'restaurant'}
                    onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
                    className="peer sr-only" 
                  />
                  <div className="p-6 text-center text-xl font-bold bg-slate-50 border-2 border-transparent rounded-3xl group-hover:bg-slate-100 peer-checked:bg-white peer-checked:border-brand peer-checked:text-brand transition-all">
                    ร้านอาหาร (Restaurant)
                  </div>
                </label>
                <label className="relative group cursor-pointer">
                  <input 
                    type="radio" 
                    name="businessType" 
                    value="massage" 
                    checked={formData.businessType === 'massage'}
                    onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
                    className="peer sr-only" 
                  />
                  <div className="p-6 text-center text-xl font-bold bg-slate-50 border-2 border-transparent rounded-3xl group-hover:bg-slate-100 peer-checked:bg-white peer-checked:border-brand peer-checked:text-brand transition-all">
                    ร้านนวด (Massage & Spa)
                  </div>
                </label>
              </div>
            </div>

            {/* Location */}
            <div className="space-y-4">
              <label className="flex items-center gap-3 text-2xl font-black text-slate-800">
                <MapPin className="w-6 h-6 text-brand" />
                <span>ทำเลในซิดนีย์ (Location in Sydney)</span>
              </label>
              <input 
                required
                type="text" 
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="เช่น Haymarket, Newtown, Kingsford..."
                className="w-full px-8 py-6 text-2xl bg-slate-50 border-2 border-transparent focus:border-champagne focus:bg-white rounded-3xl outline-none transition-all placeholder:text-slate-300"
              />
            </div>

            {/* Problem */}
            <div className="space-y-4">
              <label className="flex items-center gap-3 text-2xl font-black text-slate-800">
                <MessageSquare className="w-6 h-6 text-brand" />
                <span>ปัญหาที่อยากให้เราช่วยแก้ (Challenge)</span>
              </label>
              <textarea 
                required
                rows={4}
                value={formData.challenge}
                onChange={(e) => setFormData({ ...formData, challenge: e.target.value })}
                placeholder="เช่น อยากได้รูปสวยขึ้น, อยากมีระบบจองอัตโนมัติ, อยากทำ PWA..."
                className="w-full px-8 py-6 text-2xl bg-slate-50 border-2 border-transparent focus:border-champagne focus:bg-white rounded-3xl outline-none transition-all placeholder:text-slate-300 min-h-[150px]"
              />
            </div>

            {/* Budget */}
            <div className="space-y-4">
              <label className="flex items-center gap-3 text-2xl font-black text-slate-800">
                <Wallet className="w-6 h-6 text-brand" />
                <span>งบประมาณที่เตรียมไว้ (Estimated Budget)</span>
              </label>
              <select 
                value={formData.budget}
                onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                className="w-full px-8 py-6 text-2xl font-black bg-slate-50 border-2 border-transparent focus:border-champagne focus:bg-white rounded-3xl outline-none transition-all appearance-none cursor-pointer text-brand"
              >
                <option value="basic">เริ่มต้นเบาๆ ($299 - $999) - เน้นสร้างตัวและระบบพื้นฐาน</option>
                <option value="standard">คุ้มค่าสูงสุด ($1,000 - $2,999) - แพ็กเกจยอดนิยม ครบเครื่องเรื่อง V4</option>
                <option value="premium">จัดเต็มระดับพรีเมียม ($3,000 - $5,000+) - สวยจบครบวงจรเพื่อแบรนด์ระดับโลก</option>
              </select>
            </div>

            {/* Submit */}
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-10 bg-champagne text-slate-950 text-3xl font-black rounded-3xl shadow-[0_25px_50px_-12px_rgba(229,196,139,0.5)] flex items-center justify-center gap-6 group transition-all ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <Send className={`w-8 h-8 ${isSubmitting ? 'animate-bounce' : 'group-hover:translate-x-2 group-hover:-translate-y-2'} transition-transform`} />
              <span>{isSubmitting ? 'กำลังส่งข้อมูล...' : 'จองสิทธิ์ส่วนลด 50% และคุยคอนเซปต์กับเรา'}</span>
            </motion.button>

            <p className="text-center text-slate-400 font-medium">
              ข้อมูลของคุณจะถูกเก็บเป็นความลับสูงสุดตามมาตรฐาน Australian Privacy Acts
            </p>
          </form>
        </motion.section>
      </div>
    </div>
  );
}
