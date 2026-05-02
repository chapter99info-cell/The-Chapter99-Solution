import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, X, Send, Bot, User, Loader2, Sparkles, MessageSquareHeart, Zap } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

const OrangeBuddyAI = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [minimized, setMinimized] = useState(false);
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
    <div className="fixed inset-0 pointer-events-none z-[10000]">
      <AnimatePresence>
        {isOpen && (
          <div className="absolute inset-0 flex items-center justify-center p-4 md:p-10 pointer-events-auto bg-black/40 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="w-full max-w-[500px] h-[80vh] max-h-[800px] bg-white rounded-[48px] shadow-[0_40px_100px_rgba(0,0,0,0.3)] border border-slate-100 overflow-hidden flex flex-col relative"
            >
              {/* Header */}
              <div className="p-6 md:p-8 bg-gradient-to-r from-orange-500 to-orange-400 text-white flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center shadow-lg relative">
                    <span className="text-2xl">🍊</span>
                  </div>
                  <div>
                    <h3 className="font-black text-lg leading-none mb-1">น้องส้มสายชู 🍊⚡️</h3>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-yellow-300 animate-pulse" />
                      <span className="text-[9px] font-bold uppercase tracking-[0.2em] opacity-90">สับงานไว!</span>
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
                className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6 bg-slate-50/50"
              >
                {messages.map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: msg.role === 'user' ? 20 : -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[85%] p-5 rounded-[28px] text-[16px] leading-[1.6] font-bold ${
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

              {/* Input Area */}
              <div className="p-6 md:p-8 bg-white border-t border-slate-100">
                <div className="flex gap-2 mb-4 overflow-x-auto no-scrollbar py-1">
                  {quickReplies.map((reply, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSend(reply)}
                      className="px-4 py-2 bg-orange-50 text-orange-600 border border-orange-100 rounded-full text-[10px] font-black whitespace-nowrap hover:bg-orange-500 hover:text-white transition-colors"
                    >
                      {reply}
                    </button>
                  ))}
                </div>
                <div className="relative">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="ถามน้องส้มสายชูได้เลยค่ะพี่..."
                    className="w-full pl-6 pr-14 py-4 bg-slate-100 border-none rounded-[24px] text-base focus:ring-4 focus:ring-orange-500/10 transition-all font-bold"
                  />
                  <button 
                    onClick={() => handleSend()}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-3 bg-orange-500 text-white rounded-xl shadow-lg shadow-orange-500/30"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Floating Controller */}
      {!isOpen && (
        <motion.div
          drag
          dragConstraints={{ left: -1000, right: 0, top: -1000, bottom: 0 }}
          initial={{ x: 0, y: 0 }}
          className="absolute bottom-10 right-10 pointer-events-auto z-[5001]"
        >
          <AnimatePresence>
            {!minimized && (
              <motion.div 
                initial={{ scale: 0, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0, opacity: 0, y: 10 }}
                className="absolute bottom-full right-0 mb-6 w-64 md:w-80"
              >
                <div className="bg-white p-6 rounded-[32px] shadow-2xl border border-orange-100 relative group">
                  {/* Close Bubble Button */}
                  <button 
                    onClick={() => setMinimized(true)}
                    className="absolute -top-2 -right-2 w-8 h-8 bg-slate-900 text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform z-20"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  
                  <div 
                    className="text-lg font-bold text-slate-900 leading-relaxed italic cursor-pointer"
                    onClick={() => setIsOpen(true)}
                  >
                    "สวัสดีค่ะ! <span className="text-orange-500">น้องส้มสายชู 🍊⚡️</span> สงสัยตรงไหนทักมาถามได้เลยนะคะ!"
                  </div>
                  <div className="absolute top-full right-8 w-4 h-4 bg-white border-r border-b border-orange-100 rotate-45 -translate-y-2" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Smaller, Draggable Button */}
          <div className="relative group">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => {
                if (minimized) setMinimized(false);
                setIsOpen(true);
              }}
              className={`transition-all duration-500 flex items-center justify-center relative overflow-hidden bg-orange-500 shadow-[0_15px_40px_rgba(249,115,22,0.4)] ${
                minimized 
                ? 'w-12 h-12 rounded-2xl opacity-80 hover:opacity-100' 
                : 'w-16 h-16 md:w-20 md:h-20 rounded-[28px]'
              }`}
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              <span className={`${minimized ? 'text-2xl' : 'text-3xl md:text-5xl'} relative z-10 transition-all`}>🍊</span>
              
              {!minimized && (
                <motion.div 
                  animate={{ opacity: [0.2, 0.4, 0.2], scale: [1, 1.1, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="absolute inset-0 bg-white/40 rounded-full blur-xl"
                />
              )}
            </motion.button>

            {/* Notification Dot */}
            {!minimized && !isOpen && (
              <div className="absolute -top-1 -left-1 w-6 h-6 bg-[#A3E635] text-slate-950 font-black text-[10px] rounded-full flex items-center justify-center border-2 border-white animate-bounce shadow-md">
                1
              </div>
            )}
            
            {/* Tooltip for dragging */}
            {!minimized && (
              <div className="absolute top-1/2 right-full mr-4 -translate-y-1/2 px-3 py-1 bg-slate-900/80 backdrop-blur-md text-white text-[10px] rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap font-black uppercase tracking-widest pointer-events-none">
                Drag to Move 🤏
              </div>
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default OrangeBuddyAI;
