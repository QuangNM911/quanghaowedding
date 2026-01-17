import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Calendar, MapPin, Clock } from "lucide-react";
import { useAudio } from "@/hooks/use-audio";
import { Section, SectionHeader } from "@/components/Section";
import { Gallery } from "@/components/Gallery";
import { RsvpForm } from "@/components/RsvpForm";
import { MusicPlayer } from "@/components/MusicPlayer";

// Placeholder audio URL - use a royalty free wedding track
const BG_MUSIC_URL = "https://cdn.pixabay.com/download/audio/2022/10/18/audio_31c2730e64.mp3";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const { isPlaying, play, toggle } = useAudio(BG_MUSIC_URL);
  
  const handleOpenInvitation = () => {
    setIsOpen(true);
    play();
  };

  return (
    <div className="min-h-screen font-sans bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-fixed">
      {/* Opening Overlay */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 1 } }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background text-center p-6"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="relative max-w-md w-full aspect-[3/4] bg-white shadow-2xl p-8 rounded-2xl flex flex-col items-center justify-center border border-primary/10"
            >
              {/* Decorative border */}
              <div className="absolute inset-4 border-2 border-primary/20 rounded-xl pointer-events-none" />
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/flower-trail.png')] opacity-10" />

              <span className="font-script text-4xl text-primary mb-6">Save the Date</span>
              
              <div className="space-y-4 mb-8">
                <h1 className="text-4xl md:text-5xl font-bold text-foreground font-serif">
                  Văn Nam
                  <span className="block text-2xl text-primary my-2 font-script">&</span>
                  Ngọc Nhi
                </h1>
                <p className="text-muted-foreground uppercase tracking-widest text-sm">
                  01 . 02 . 2026
                </p>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleOpenInvitation}
                className="relative z-10 px-8 py-3 bg-primary text-white rounded-full font-medium shadow-lg hover:shadow-primary/30 transition-all flex items-center gap-2 group"
              >
                <Heart className="w-4 h-4 fill-current group-hover:animate-ping" />
                Mở Thiệp
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      {isOpen && (
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <MusicPlayer isPlaying={isPlaying} onToggle={toggle} />

          {/* Hero Section */}
          <section className="relative h-screen flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 z-0">
              {/* Couple Hero Image */}
              <img 
                src="https://pixabay.com/get/gbbfda781bfa14a91884b39c27e92f976106f0d5a26a4c20008b4aa5043c02e7728d1f6c1a4ec6d54495a696eeb32dd879a83fe4c6c8397b3df97ea55ca49adce_1280.jpg" 
                alt="Couple" 
                className="w-full h-full object-cover brightness-[0.7]"
              />
            </div>
            
            <div className="relative z-10 text-center text-white px-4">
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                <p className="font-script text-3xl md:text-5xl mb-4 text-white/90">Chúng mình kết hôn!</p>
                <h1 className="font-serif text-5xl md:text-8xl font-bold mb-6 text-shadow-lg">
                  Văn Nam <span className="text-primary-foreground/80">&</span> Ngọc Nhi
                </h1>
                <div className="inline-flex items-center gap-4 text-lg md:text-xl font-light tracking-widest border-t border-b border-white/30 py-4 px-8 backdrop-blur-sm bg-white/10 rounded-full">
                  <span>01</span>
                  <span className="w-1.5 h-1.5 bg-white rounded-full" />
                  <span>02</span>
                  <span className="w-1.5 h-1.5 bg-white rounded-full" />
                  <span>2026</span>
                </div>
              </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 1 }}
              className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-white/70"
            >
              <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center p-1">
                <div className="w-1 h-2 bg-white/80 rounded-full animate-float" />
              </div>
            </motion.div>
          </section>

          {/* Introduction */}
          <Section className="bg-white">
            <SectionHeader title="Lời Ngỏ" subtitle="Hân hoan báo tin vui" />
            <div className="max-w-3xl mx-auto text-center space-y-8">
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed font-light">
                "Yêu thương không chỉ là lời hứa, mà là hành trình chúng ta cùng nhau bước đi. 
                Sau những tháng ngày tìm hiểu và gắn bó, chúng mình quyết định về chung một nhà 
                để cùng nhau viết tiếp câu chuyện hạnh phúc."
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12">
                {/* Groom's Family */}
                <motion.div 
                  whileHover={{ y: -5 }}
                  className="p-6 rounded-2xl bg-secondary/30 border border-secondary"
                >
                  <h3 className="font-serif text-2xl font-bold text-primary mb-2">Nhà Trai</h3>
                  <div className="w-12 h-0.5 bg-primary/30 mx-auto mb-4" />
                  <p className="font-semibold text-foreground">Ông: Trần Văn Bố</p>
                  <p className="font-semibold text-foreground">Bà: Nguyễn Thị Mẹ</p>
                  <p className="mt-4 text-muted-foreground italic">Trân trọng báo tin</p>
                </motion.div>

                {/* Bride's Family */}
                <motion.div 
                  whileHover={{ y: -5 }}
                  className="p-6 rounded-2xl bg-secondary/30 border border-secondary"
                >
                  <h3 className="font-serif text-2xl font-bold text-primary mb-2">Nhà Gái</h3>
                  <div className="w-12 h-0.5 bg-primary/30 mx-auto mb-4" />
                  <p className="font-semibold text-foreground">Ông: Lê Văn Cha</p>
                  <p className="font-semibold text-foreground">Bà: Phạm Thị Mẫu</p>
                  <p className="mt-4 text-muted-foreground italic">Trân trọng báo tin</p>
                </motion.div>
              </div>
            </div>
          </Section>

          {/* Love Story Timeline */}
          <Section className="bg-secondary/20">
            <SectionHeader title="Chuyện Tình Yêu" subtitle="Hành trình của chúng mình" />
            <div className="max-w-4xl mx-auto relative">
              {/* Vertical Line */}
              <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-0.5 bg-primary/20" />

              <div className="space-y-16">
                <TimelineItem 
                  year="2022"
                  title="Lần Đầu Gặp Gỡ"
                  description="Một chiều thu Hà Nội, ánh mắt vô tình chạm nhau tại quán cà phê góc phố cổ."
                  align="left"
                  img="https://images.unsplash.com/photo-1516575150278-77136aed6920?w=400&q=80"
                />
                <TimelineItem 
                  year="2023"
                  title="Chính Thức Hẹn Hò"
                  description="Lời tỏ tình vụng về nhưng chân thành đã mở đầu cho những ngày tháng ngọt ngào."
                  align="right"
                  img="https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=400&q=80"
                />
                <TimelineItem 
                  year="2025"
                  title="Lời Cầu Hôn"
                  description="Dưới ánh nến lung linh, anh đã quỳ xuống và em đã nói 'Em đồng ý'."
                  align="left"
                  img="https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=400&q=80"
                />
              </div>
            </div>
          </Section>

          {/* Gallery */}
          <Section className="bg-white">
            <SectionHeader title="Album Ảnh Cưới" subtitle="Những khoảnh khắc đẹp nhất" />
            <div className="max-w-6xl mx-auto">
              <Gallery />
            </div>
          </Section>

          {/* Events */}
          <Section className="bg-secondary/20">
            <SectionHeader title="Sự Kiện" subtitle="Chương trình lễ cưới" />
            <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
              <EventCard 
                title="Lễ Vu Quy"
                time="08:30 - 10:30"
                date="01/02/2026"
                location="Tư gia nhà gái"
                address="123 Đường Nguyễn Trãi, Thanh Xuân, Hà Nội"
                img="https://images.unsplash.com/photo-1519225468359-294316dd56f4?w=800&q=80"
              />
              <EventCard 
                title="Tiệc Cưới"
                time="11:00 - 13:30"
                date="01/02/2026"
                location="Trung tâm Tiệc cưới Royal"
                address="456 Đường Láng, Đống Đa, Hà Nội"
                img="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&q=80"
              />
            </div>
          </Section>

          {/* RSVP */}
          <Section className="bg-white">
            <SectionHeader title="Xác Nhận Tham Dự" subtitle="RSVP" />
            <div className="text-center mb-8 max-w-2xl mx-auto">
              <p className="text-muted-foreground">
                Sự hiện diện của bạn là niềm vinh hạnh lớn nhất đối với gia đình chúng tôi. 
                Vui lòng xác nhận tham dự trước ngày <span className="font-bold text-primary">25/01/2026</span>.
              </p>
            </div>
            <RsvpForm />
          </Section>

          {/* Footer */}
          <footer className="bg-primary text-primary-foreground py-12 text-center">
            <h2 className="font-script text-5xl mb-4">Thank You!</h2>
            <p className="font-serif text-xl">Văn Nam & Ngọc Nhi</p>
            <div className="mt-8 text-sm opacity-60">
              © 2026 Wedding Invitation. Made with ❤️
            </div>
          </footer>
        </motion.main>
      )}
    </div>
  );
}

function TimelineItem({ year, title, description, align, img }: { 
  year: string, title: string, description: string, align: 'left' | 'right', img: string 
}) {
  return (
    <motion.div 
      initial={{ opacity: 0, x: align === 'left' ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      className={`flex items-center gap-8 ${align === 'right' ? 'flex-row-reverse text-right' : 'text-left'}`}
    >
      <div className="flex-1 space-y-2">
        <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full font-bold text-sm mb-2">
          {year}
        </span>
        <h3 className="text-2xl font-serif font-bold">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </div>
      <div className="w-12 h-12 flex-shrink-0 bg-white border-4 border-primary rounded-full z-10 shadow-lg flex items-center justify-center">
        <Heart className="w-5 h-5 fill-primary text-primary" />
      </div>
      <div className="flex-1">
        <div className={`relative aspect-video rounded-xl overflow-hidden shadow-lg ${align === 'left' ? 'rotate-2' : '-rotate-2'} hover:rotate-0 transition-transform duration-500`}>
          <img src={img} alt={title} className="w-full h-full object-cover" />
        </div>
      </div>
    </motion.div>
  );
}

function EventCard({ title, time, date, location, address, img }: { 
  title: string, time: string, date: string, location: string, address: string, img: string 
}) {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="group bg-white rounded-2xl overflow-hidden shadow-xl shadow-black/5 border border-border"
    >
      <div className="h-48 overflow-hidden relative">
        <div className="absolute inset-0 bg-primary/20 mix-blend-multiply z-10" />
        <img 
          src={img} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
        />
        <div className="absolute bottom-4 left-4 z-20 text-white">
          <h3 className="text-3xl font-serif font-bold text-shadow">{title}</h3>
        </div>
      </div>
      <div className="p-6 space-y-4">
        <div className="flex items-start gap-3">
          <Clock className="w-5 h-5 text-primary mt-0.5 shrink-0" />
          <div>
            <p className="font-semibold">{time}</p>
            <p className="text-sm text-muted-foreground">{date}</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <MapPin className="w-5 h-5 text-primary mt-0.5 shrink-0" />
          <div>
            <p className="font-semibold">{location}</p>
            <p className="text-sm text-muted-foreground">{address}</p>
          </div>
        </div>
        <a 
          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full py-3 text-center rounded-lg border-2 border-primary text-primary font-semibold hover:bg-primary hover:text-white transition-colors"
        >
          Xem bản đồ
        </a>
      </div>
    </motion.div>
  );
}
