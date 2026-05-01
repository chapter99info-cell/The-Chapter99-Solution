import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, ExternalLink, Sparkles, ChevronRight, Home, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const categories = [
  { id: 'all', label: 'All Projects' },
  { id: 'restaurant', label: 'Restaurants' },
  { id: 'massage', label: 'Massage & Spa' },
  { id: 'ai', label: 'AI Cinematic' },
];

const projects = [
  {
    id: 1,
    title: "Thai Garlic Sydney",
    category: "restaurant",
    type: "Smart PWA & Branding",
    image: "https://firebasestorage.googleapis.com/v0/b/studio-6368441530-fca54.firebasestorage.app/o/Chapter99%20Solutions%2FPhotos%2Fd75c4bb5-64c5-4583-946d-655a0d2eb039.jpg?alt=media&token=47e28e0e-4131-4b9d-870d-b6a531de888f",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-chef-flaming-a-dish-in-a-pan-4628-large.mp4",
    stats: "+35% Direct Bookings",
    desc: "A complete digital transformation for one of Sydney's most beloved Thai spots."
  },
  {
    id: 2,
    title: "The Heritage Massage",
    category: "massage",
    type: "Premium Booking System",
    image: "https://firebasestorage.googleapis.com/v0/b/studio-6368441530-fca54.firebasestorage.app/o/Chapter99%20Solutions%2FPhotos%2F2b00bbd9-b774-4205-a3d8-8f8631e65d99.jpg?alt=media&token=ce10dde4-5e39-4726-8044-c88cb725f31e",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-massage-therapy-for-a-woman-in-a-spa-center-30230-large.mp4",
    stats: "Zero Booking Clashes",
    desc: "Luxury boutique experience brought to life through seamless UI and professional visuals."
  },
  {
    id: 3,
    title: "Signature Thai Reels",
    category: "ai",
    type: "AI Cinematic Content",
    image: "https://images.unsplash.com/photo-1552611052-33e04de081de?auto=format&fit=crop&q=80&w=800",
    videoUrl: "https://firebasestorage.googleapis.com/v0/b/studio-6368441530-fca54.firebasestorage.app/o/chapter99%20studio%2FChapter99%20Solution%2FVDO%2FCinematic_video_of_a_luxurious.mp4?alt=media&token=b38746e6-cfc2-4dfc-9317-192bbb021503",
    stats: "1.2M+ Reach in Sydney",
    desc: "Transforming standard dishes into cinematic masterpieces that stop the scroll."
  },
  {
    id: 4,
    title: "Siam Garden PWA",
    category: "restaurant",
    type: "Contactless Menu System",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=800",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-waiter-bringing-the-menu-to-a-client-at-the-table-41005-large.mp4",
    stats: "Reduced Wait Times 20%",
    desc: "Smart QR integration allowing customers to order and pay without waiting for staff."
  },
  {
    id: 5,
    title: "Zen Spa Sydney",
    category: "massage",
    type: "Photography & Reels",
    image: "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?auto=format&fit=crop&q=80&w=800",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-woman-lying-down-and-relaxing-in-a-spa-30229-large.mp4",
    stats: "Revenue +25%",
    desc: "Capturing the essence of tranquility through professional lens and AI editing."
  },
  {
    id: 6,
    title: "Elite BBQ Sydney",
    category: "restaurant",
    type: "Full Tech Stack",
    image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&q=80&w=800",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-close-up-of-a-person-pouring-a-drink-at-a-bar-41008-large.mp4",
    stats: "PWA Loyalty System",
    desc: "Integrated rewards system that keeps customers coming back weekly."
  }
];

export default function PortfolioPage() {
  const [activeTab, setActiveTab] = useState('all');
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  
  const filteredProjects = activeTab === 'all' 
    ? projects 
    : projects.filter(p => p.category === activeTab);

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-brand selection:text-white">
      {/* --- FIXED HOME BUTTON --- */}
      <div className="fixed top-8 left-8 z-[100]">
        <Link to="/">
          <motion.div 
            whileHover={{ scale: 1.1, x: 5 }}
            whileTap={{ scale: 0.9 }}
            className="flex items-center gap-3 px-6 py-3 bg-white/90 backdrop-blur-md rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.1)] border border-slate-100 group"
          >
            <ArrowLeft className="w-4 h-4 text-slate-900 group-hover:-translate-x-1 transition-transform" />
            <Home className="w-4 h-4 text-brand" />
            <span className="text-xs font-black uppercase tracking-widest text-slate-900">Back to Home</span>
          </motion.div>
        </Link>
      </div>

      {/* --- HERO --- */}
      <section className="relative pt-32 pb-20 px-6 bg-slate-950 text-white overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
           <motion.div 
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
            className="w-full h-full bg-[url('https://firebasestorage.googleapis.com/v0/b/studio-6368441530-fca54.firebasestorage.app/o/Chapter99%20Solutions%2FPhotos%2Fd75c4bb5-64c5-4583-946d-655a0d2eb039.jpg?alt=media&token=47e28e0e-4131-4b9d-870d-b6a531de888f')] bg-cover bg-center"
           />
        </div>
        <div className="container relative z-10 mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 mb-8 text-brand-light font-black uppercase tracking-[0.4em] text-xs"
          >
            <Sparkles className="w-4 h-4" />
            <span>Success Stories in Sydney</span>
          </motion.div>
          
          <h1 className="text-7xl md:text-[8rem] font-black italic tracking-tighter leading-none mb-12">
            OUR <span className="text-brand">WORKS</span>
          </h1>
          
          <p className="text-2xl text-slate-400 font-light max-w-2xl leading-relaxed">
            สัมผัสประสบการณ์ความสำเร็จที่เรามอบให้พันธมิตร <br className="hidden md:block" />
            ตั้งแต่การสร้างแบรนด์ที่หรูหราไปจนถึงระบบ AI ที่ทรงพลังที่สุด
          </p>
        </div>
      </section>

      {/* --- FILTERS --- */}
      <section className="py-12 border-b border-slate-100 bg-white sticky top-0 z-40 px-6">
        <div className="container mx-auto flex flex-wrap items-center justify-center gap-4 md:gap-8">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`px-8 py-3 rounded-full text-sm font-black uppercase tracking-widest transition-all duration-300 ${
                activeTab === cat.id 
                ? 'bg-brand text-white shadow-xl scale-105' 
                : 'text-slate-400 hover:text-slate-900 bg-slate-50'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </section>

      {/* --- GALLERY --- */}
      <section className="py-32 px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, idx) => (
                <motion.div
                  layout
                  key={project.id}
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.6, delay: idx * 0.05 }}
                  className="group"
                  onMouseEnter={() => setHoveredProject(project.id)}
                  onMouseLeave={() => setHoveredProject(null)}
                >
                  <div className="relative aspect-[4/5] overflow-hidden rounded-[48px] bg-slate-100 mb-8 border border-slate-100 shadow-sm transition-all duration-700 group-hover:shadow-[0_40px_80px_-15px_rgba(107,138,37,0.2)] group-hover:-translate-y-2">
                    {/* Image Layer */}
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className={`w-full h-full object-cover transition-all duration-700 ${
                        hoveredProject === project.id && project.videoUrl ? 'opacity-0 scale-110' : 'opacity-100 scale-100'
                      }`}
                    />
                    
                    {/* Video Layer */}
                    {project.videoUrl && (
                      <div className={`absolute inset-0 transition-opacity duration-700 ${
                        hoveredProject === project.id ? 'opacity-100' : 'opacity-0'
                      }`}>
                        <video
                          src={project.videoUrl}
                          autoPlay
                          muted
                          loop
                          playsInline
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                    
                    {/* Project Tag */}
                    <div className="absolute top-8 left-8 flex gap-2">
                      <div className="px-4 py-2 bg-white/90 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-widest text-slate-900 shadow-sm">
                        {project.type}
                      </div>
                    </div>

                    {/* Quick Stats Overlay - Bottom Left */}
                    <div className="absolute bottom-10 left-10 translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100 pointer-events-none">
                      <div className="inline-flex items-center gap-3 px-6 py-2 bg-brand text-white font-black italic text-xs rounded-full shadow-lg">
                        <Sparkles className="w-3 h-3" />
                        {project.stats}
                      </div>
                    </div>

                    {/* View Button Overlay - Center */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                       <div className="w-20 h-20 rounded-full bg-white text-slate-900 flex items-center justify-center shadow-2xl scale-50 group-hover:scale-100 transition-transform duration-500">
                          {project.videoUrl ? <Play className="w-8 h-8 fill-current" /> : <ExternalLink className="w-8 h-8" />}
                       </div>
                    </div>
                  </div>

                  <div className="px-4">
                    <h3 className="text-3xl font-black text-slate-900 mb-2 leading-tight group-hover:text-brand transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-slate-500 text-lg font-light leading-relaxed">
                      {project.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* --- TESTIMONIAL --- */}
      <section className="py-48 bg-slate-50 overflow-hidden relative">
        <div className="container mx-auto px-6 max-w-5xl text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="space-y-12"
          >
            <div className="text-xs font-black text-brand uppercase tracking-[0.5em]">Real Client Voice</div>
            <h2 className="text-4xl md:text-6xl font-black italic tracking-tighter leading-[1.1] text-slate-950">
              "Chapter99 เปลี่ยนร้านที่กำลังซบเซา <br className="hidden md:block" />
              ให้กลายเป็นแบรนด์ระดับพรีเมียมในซิดนีย์ได้เพียงชั่วข้ามคืน"
            </h2>
            <div className="flex flex-col items-center gap-4">
               <div className="w-20 h-20 rounded-full bg-slate-200" />
               <div>
                  <div className="text-xl font-bold">K. Somchai</div>
                  <div className="text-sm text-slate-400 uppercase tracking-widest">Thai Garlic Owner</div>
               </div>
            </div>
          </motion.div>
        </div>
        
        {/* Decorative Quote Mark */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[30rem] font-black text-slate-100/30 pointer-events-none z-0">"</div>
      </section>

      {/* --- CTA --- */}
      <section className="py-32 px-6">
        <div className="container mx-auto max-w-7xl">
           <div className="bg-brand rounded-[64px] p-16 md:p-32 text-center text-white relative overflow-hidden">
              <div className="relative z-10">
                <h2 className="text-5xl md:text-8xl font-black tracking-tighter mb-12 italic">
                  YOUR TURN <br className="hidden md:block"/> TO SHINE
                </h2>
                <p className="text-2xl text-white/80 font-light mb-16 max-w-2xl mx-auto">
                  พร้อมหรือยังที่จะเขียนบทบทใหม่ให้ธุรกิจของคุณ? <br/>
                  จองสิทธิ์ลด 50% สำหรับ 10 ท่านแรกเท่านั้น
                </p>
                <Link 
                  to="/contact" 
                  className="inline-flex items-center gap-6 px-16 py-8 bg-white text-brand text-2xl font-black rounded-full shadow-2xl hover:scale-105 transition-all group"
                >
                  <span>คุยกับเราตอนนี้</span>
                  <ChevronRight className="w-8 h-8 group-hover:translate-x-2 transition-transform" />
                </Link>
              </div>
              
              {/* Background Glow */}
              <div className="absolute top-[-20%] right-[-10%] w-1/2 h-full bg-white opacity-10 blur-[150px] rounded-full rotate-12" />
              <div className="absolute bottom-[-20%] left-[-10%] w-1/2 h-full bg-slate-900 opacity-30 blur-[150px] rounded-full -rotate-12" />
           </div>
        </div>
      </section>

      {/* --- FOOTER (MINI) --- */}
      <footer className="py-12 border-t border-slate-100 text-center text-slate-400 text-xs uppercase tracking-[0.2em] italic">
        © 2026 CHAPTER99 SOLUTIONS • SYDNEY AUSTRALIA
      </footer>
    </div>
  );
}
