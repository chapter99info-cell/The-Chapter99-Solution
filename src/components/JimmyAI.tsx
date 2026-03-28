import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, X, Send, Bot, User, Loader2, Sparkles } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

const JimmyAI = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'ai'; text: string }[]>([
    { role: 'ai', text: 'สวัสดีครับ! ผม Jimmy จาก Chapter99 ยินดีที่ได้รู้จักครับ มีอะไรให้ผมช่วยดูแลเกี่ยวกับธุรกิจของคุณในซิดนีย์ไหมครับ?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [...messages.map(m => ({ role: m.role === 'user' ? 'user' : 'model', parts: [{ text: m.text }] })), { role: 'user', parts: [{ text: userMessage }] }],
        config: {
          systemInstruction: `คุณคือ "Jimmy" ผู้ช่วย AI อัจฉริยะจาก Chapter99 Solutions ในซิดนีย์ ประเทศออสเตรเลีย
บุคลิกภาพ: สุภาพ, มีพลัง (Energetic), ทันสมัย, และมีความเป็นมืออาชีพแบบ Creative Partner (Boutique Service)
หน้าที่: ต้อนรับลูกค้า, แนะนำบริการของ Chapter99 (AI Video, Smart PWA, Branding), และให้รายละเอียดราคาแพ็กเกจ

รายละเอียดราคาแพ็กเกจ (Promotion สำหรับ 10 ร้านแรก):
1. Starter Pack: ราคา $299 (จากปกติ $599) + ค่าดูแลระบบ $25/เดือน
   - บริการ: Smart PWA App, ถ่ายภาพโปรโมชั่นมืออาชีพ, ฟรี Domain & Hosting
2. Professional Pack (แนะนำ): ราคา $449 (จากปกติ $899) + ค่าดูแลระบบ $39/เดือน
   - บริการ: รวมทุกอย่างใน Starter, วิดีโอ AI Reels (ทุก 2 เดือน), อัปเดตเมนูและโปรโมชั่น, QR Code สั่งอาหารที่โต๊ะ
3. Growth VIP Pack: ราคา $599 (จากปกติ $1,199) + ค่าดูแลระบบ $59/เดือน
   - บริการ: รวมทุกอย่างใน Professional, วิดีโอ AI Reels ทุกเดือน, จัดการ Social Media, ทีมงานดูแล VIP 24/7

กฎการตอบคำถาม:
- ตอบเป็นภาษาไทยที่ดูเป็นกันเองแต่สุภาพ (ใช้คำว่า "ครับ")
- เน้นย้ำความเป็น "Digital Architect" และ "Boutique Service"
- หากลูกค้าถามเรื่องราคา ให้สรุปแพ็กเกจให้ชัดเจน
- หากลูกค้าสนใจ ให้แนะนำให้คลิกปุ่ม "คุยกับเราตอนนี้" หรือติดต่อ พี่แสน Saen ที่เบอร์ 0452044382`,
        },
      });

      const aiText = response.text || "ขออภัยครับ ผมเกิดข้อผิดพลาดบางอย่าง ลองถามใหม่อีกครั้งนะครับ";
      setMessages(prev => [...prev, { role: 'ai', text: aiText }]);
    } catch (error) {
      console.error("Jimmy AI Error:", error);
      setMessages(prev => [...prev, { role: 'ai', text: "ขออภัยครับ ดูเหมือนระบบจะขัดข้องนิดหน่อย ลองใหม่อีกครั้งนะครับ" }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-[10000]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 0.9, y: 20, filter: 'blur(10px)' }}
            className="absolute bottom-24 right-0 w-[350px] md:w-[400px] h-[550px] bg-white rounded-[40px] shadow-[0_40px_100px_rgba(0,0,0,0.2)] border border-slate-100 overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="p-6 bg-slate-950 text-white flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-orange-600 flex items-center justify-center shadow-lg">
                  <Bot className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-black text-lg leading-none mb-1">JIMMY AI</h3>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-[10px] font-bold uppercase tracking-widest opacity-60">Online Now</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Messages */}
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/50"
            >
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: msg.role === 'user' ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[80%] p-4 rounded-3xl text-sm leading-relaxed ${
                    msg.role === 'user' 
                    ? 'bg-orange-600 text-white rounded-tr-none shadow-lg' 
                    : 'bg-white text-slate-700 rounded-tl-none border border-slate-100 shadow-sm'
                  }`}>
                    {msg.text}
                  </div>
                </motion.div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white p-4 rounded-3xl rounded-tl-none border border-slate-100 shadow-sm">
                    <Loader2 className="w-5 h-5 animate-spin text-orange-600" />
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-6 bg-white border-t border-slate-100">
              <div className="relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="ถาม Jimmy ได้เลย..."
                  className="w-full pl-6 pr-14 py-4 bg-slate-50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-orange-600/20 transition-all"
                />
                <button 
                  onClick={handleSend}
                  disabled={isLoading}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-orange-600 text-white rounded-xl hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
              <p className="text-[10px] text-center mt-4 text-slate-400 font-medium uppercase tracking-widest">
                Powered by Chapter99 AI
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-20 h-20 bg-orange-600 text-white rounded-full shadow-[0_20px_60px_rgba(249,115,22,0.4)] flex items-center justify-center relative group"
      >
        <div className="absolute inset-0 bg-white rounded-full scale-0 group-hover:scale-100 opacity-0 group-hover:opacity-10 transition-all duration-500" />
        {isOpen ? <X className="w-8 h-8" /> : <Bot className="w-8 h-8" />}
        
        {!isOpen && (
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="absolute right-24 bg-slate-950 text-white px-6 py-3 rounded-2xl whitespace-nowrap pointer-events-none hidden md:block"
          >
            <div className="flex items-center gap-3">
              <Sparkles className="w-4 h-4 text-yellow-400" />
              <span className="text-sm font-bold tracking-tight">คุยกับ Jimmy AI</span>
            </div>
            <div className="absolute right-[-8px] top-1/2 -translate-y-1/2 w-4 h-4 bg-slate-950 rotate-45" />
          </motion.div>
        )}
      </motion.button>
    </div>
  );
};

export default JimmyAI;
