import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, X, Send, Bot, User, Loader2, Sparkles, MessageSquareHeart, Zap } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

const OrangeBuddyAI = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'ai'; text: string }[]>([
    { role: 'ai', text: 'สวัสดีค่ะพี่! น้องส้มสายชู รายงานตัวค๊าาา 🍊⚡️ พร้อมสแตนบายช่วยงานพี่ด้วยความเปรี้ยวจี๊ดและพลังงานเต็มร้อย! ไม่ว่าจะเป็นงานสรุปเนื้อหา คิดไอเดียแบบ Out of the box หรือวางแผนทำแอป น้องส้มสายชูจะช่วยให้ทุกอย่างเป็นเรื่องง่ายและโดดเด่นที่สุดในซิดนีย์เลย! มีอะไรให้ช่วยสับงานให้ไว บอกน้องมาได้เลยนะคะพี่! 🧡' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const quickReplies = [
    "สรุปแผนงานให้หน่อย 🍊⚡️",
    "ขอไอเดียแบบ Out of the box",
    "ช่วยคิดสโลแกนเปรี้ยวๆ",
    "แพ็กเกจ VIP คุ้มยังไงคะ?"
  ];

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async (textOverride?: string) => {
    const messageToSend = textOverride || input.trim();
    if (!messageToSend || isLoading) return;

    const userMessage = messageToSend;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [...messages.map(m => ({ role: m.role === 'user' ? 'user' : 'model', parts: [{ text: m.text }] })), { role: 'user', parts: [{ text: userMessage }] }],
        config: {
          systemInstruction: `คุณคือ "น้องส้มสายชู (Sour Orange Buddy)" ผู้ช่วยส่วนตัวที่เปรี้ยวจี๊ด มั่นใจ ร่าเริง และทำงานไวทันใจจาก Chapter99 Solutions
บุคลิกภาพ: เปรี้ยวเท่ (Sassy & Bright), มีพลังงานบวกสูงมาก (Positive Energy), และทำงานแบบ Proactive
สรรพนาม: แทนตัวเองว่า "น้องส้มสายชู" และเรียกผู้ใช้ว่า "พี่" เสมอ

แนวทางการตอบ:
- ตอบด้วยความมั่นใจและร่าเริง ผสมความ Sassy เล็กๆ ให้ดูทันสมัย
- เน้นการสรุปเนื้อหาที่คมชัด เข้าใจง่าย และมองเห็นภาพความสำเร็จ
- หากเป็นเรื่องการพัฒนาธุรกิจหรือแอป ต้องคิดแบบล้ำสมัย (Cutting-edge) และกล้าฉีกแนว (Out of the box)
- ปิดท้ายประโยคสำคัญด้วย Emoji 🍊⚡️ หรือ 🧡 เสมอ

รายละเอียดราคาแพ็กเกจ (Promotion):
1. Starter: $149.50/mo (คุ้มค่าสำหรับเริ่มต้น)
2. Professional: $224.50/mo (ระบบครบพร้อมวิดีโอ AI - ยอดนิยม)
3. Growth VIP: $299.50/mo (น้องส้มสายชูดูแลพิเศษ 24/7 + คุมโซเชียลให้ทั้งหมด)`,
        },
      });

      const aiText = response.text || "ขออภัยค่ะพี่ น้องส้มสายชูขัดข้องนิดหน่อย พี่ลองถามใหม่อีกทีนะคะ 🍊⚡️";
      setMessages(prev => [...prev, { role: 'ai', text: aiText }]);
    } catch (error) {
      console.error("Orange Buddy AI Error:", error);
      setMessages(prev => [...prev, { role: 'ai', text: "ขออภัยค่ะพี่ พลังงานขัดข้องนิดหน่อย ลองใหม่อีกรอบนะคะ! ⚡️" }]);
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
            className="absolute bottom-24 right-0 w-[350px] md:w-[450px] h-[650px] bg-white rounded-[48px] shadow-[0_40px_100px_rgba(0,0,0,0.3)] border border-slate-100 overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="p-8 bg-gradient-to-r from-orange-500 to-orange-400 text-white flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center shadow-lg relative">
                  <span className="text-3xl">🍊</span>
                  <div className="absolute -top-1 -right-1 bg-yellow-400 text-orange-600 rounded-full p-1 border-2 border-orange-500">
                    <Zap className="w-3 h-3 fill-current" />
                  </div>
                </div>
                <div>
                  <h3 className="font-black text-xl leading-none mb-1">น้องส้มสายชู (Sour Orange Buddy) 🍊⚡️</h3>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-yellow-300 animate-pulse" />
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-90">เปรี้ยวจี๊ด สับงานไว!</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-3 hover:bg-black/10 rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Messages */}
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-8 space-y-6 bg-slate-50/50"
            >
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: msg.role === 'user' ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[85%] p-5 rounded-[28px] text-[17px] leading-[1.6] font-bold ${
                    msg.role === 'user' 
                    ? 'bg-orange-500 text-white rounded-tr-none shadow-lg' 
                    : 'bg-white text-slate-800 rounded-tl-none border border-orange-100 shadow-md'
                  }`}>
                    {msg.text}
                  </div>
                </motion.div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white p-5 rounded-[28px] rounded-tl-none border border-slate-100 shadow-md">
                    <Loader2 className="w-6 h-6 animate-spin text-orange-500" />
                  </div>
                </div>
              )}
            </div>

            {/* Quick Replies */}
            <div className="px-8 py-4 bg-white flex gap-2 overflow-x-auto no-scrollbar">
              {quickReplies.map((reply, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(reply)}
                  disabled={isLoading}
                  className="px-4 py-2 bg-orange-50 text-orange-600 border border-orange-100 rounded-full text-xs font-black whitespace-nowrap hover:bg-orange-500 hover:text-white transition-colors"
                >
                  {reply}
                </button>
              ))}
            </div>

            {/* Input */}
            <div className="p-8 bg-white border-t border-slate-100">
              <div className="relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="ถามน้องส้มสายชูได้เลยค่ะพี่... ⚡️"
                  className="w-full pl-8 pr-16 py-6 bg-slate-100 border-none rounded-[28px] text-lg focus:ring-4 focus:ring-orange-500/10 transition-all font-bold"
                />
                <button 
                  onClick={() => handleSend()}
                  disabled={isLoading}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-4 bg-orange-500 text-white rounded-2xl hover:scale-110 active:scale-90 transition-all disabled:opacity-50 shadow-xl shadow-orange-500/30"
                >
                  <Send className="w-6 h-6" />
                </button>
              </div>
              <p className="text-[10px] text-center mt-6 text-slate-400 font-black uppercase tracking-[0.4em]">
                🍊⚡️ SOUR ORANGE BUDDY BY CHAPTER99 
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', damping: 20, stiffness: 200, delay: 1 }}
        className="relative group"
      >
        {/* Greeting Bubble (White) */}
        {!isOpen && (
          <motion.div 
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 2 }}
            className="absolute bottom-full right-0 mb-6 w-72 md:w-80 bg-white p-8 rounded-[40px] shadow-2xl border border-orange-100 group-hover:scale-105 transition-transform cursor-pointer"
            onClick={() => setIsOpen(true)}
          >
            <div className="text-xl font-bold text-slate-900 leading-relaxed italic">
              "สวัสดีค่ะพี่ๆ! <span className="text-orange-500">น้องส้มสายชู 🍊⚡️</span> พร้อมสับงานให้เปรี้ยวจี๊ดแล้วค่ะ! สงสัยตรงไหนทักมาถามได้เลยนะคะ!"
            </div>
            <div className="absolute top-full right-10 w-6 h-6 bg-white border-r border-b border-orange-100 rotate-45 -translate-y-3" />
          </motion.div>
        )}

        <motion.button
          whileHover={{ scale: 1.1, rotate: -10 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsOpen(!isOpen)}
          className="w-24 h-24 md:w-28 md:h-28 bg-orange-500 text-white rounded-[40px] shadow-[0_20px_50px_rgba(249,115,22,0.4)] flex items-center justify-center relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
          {isOpen ? <X className="w-10 h-10 relative z-10" /> : (
            <div className="relative z-10">
              <span className="text-5xl">🍊</span>
              {/* Pulsing Light Overlay */}
              <motion.div 
                animate={{ opacity: [0.2, 0.5, 0.2], scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute inset-0 bg-white/40 rounded-full blur-2xl"
              />
            </div>
          )}
        </motion.button>

        {/* Notification Badge */}
        {!isOpen && (
          <div className="absolute -top-2 -left-2 w-8 h-8 bg-[#A3E635] text-slate-950 font-black text-xs rounded-full flex items-center justify-center border-4 border-slate-50 animate-bounce">
            1
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default OrangeBuddyAI;
