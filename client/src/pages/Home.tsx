﻿import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { lazy, Suspense, useEffect, useRef } from "react";
import { Heart, Calendar, MapPin, Clock } from "lucide-react";
import { useAudio } from "@/hooks/use-audio";
import { Section, SectionHeader } from "@/components/Section";
import { MusicPlayer } from "@/components/MusicPlayer";

const ASSET_BASE_URL = import.meta.env.BASE_URL;
// Placeholder audio URL - use a royalty free wedding track
const BG_MUSIC_URL = `${ASSET_BASE_URL}audios/nhac.mp3`;
const GROOM_MAP_URL = "https://maps.app.goo.gl/MkdpCoA3c5XcqdFLA";
const BRIDE_MAP_URL = "https://maps.app.goo.gl/aQZbrAk1x6uzZAKr8";
const LazyGallery = lazy(() =>
  import("@/components/Gallery").then((mod) => ({ default: mod.Gallery })),
);

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [showGallery, setShowGallery] = useState(false);
  const galleryRef = useRef<HTMLDivElement | null>(null);
  const { isPlaying, play, toggle } = useAudio(BG_MUSIC_URL);

  useEffect(() => {
    if (!isOpen || showGallery) return;
    const target = galleryRef.current;
    if (!target) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShowGallery(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" },
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, [isOpen, showGallery]);
  
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
                  Minh Quang
                  <span className="block text-2xl text-primary my-2 font-script">&</span>
                  Nguyễn Hảo
                </h1>
                <p className="text-muted-foreground uppercase tracking-widest text-sm">
                  08 . 02 . 2026
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
                src={`${ASSET_BASE_URL}images/banner.webp`} 
                alt="Couple" 
                loading="eager"
                fetchPriority="high"
                decoding="async"
                className="w-full h-full object-cover brightness-[0.7]"
              />
            </div>
            
            <div className="relative z-10 text-center text-white px-4">
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                <p className="font-script text-3xl md:text-5xl mb-4 text-primary">Chúng mình kết hôn!</p>
                <h1 className="font-serif text-5xl md:text-8xl font-bold mb-6 text-shadow-lg">
                  Minh Quang <span className="text-primary-foreground">&</span> Nguyễn Hảo
                </h1>
                <div className="inline-flex items-center gap-4 text-primary text-lg md:text-xl font-light tracking-widest border-t border-b border-white/30 py-4 px-8 backdrop-blur-sm bg-white/30 rounded-full">
                  <span>08</span>
                  <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                  <span>02</span>
                  <span className="w-1.5 h-1.5 bg-primary rounded-full" />
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
          <Section className="bg-secondary/20">
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
                  <img
                    src={`${ASSET_BASE_URL}images/chure.webp`}
                    alt="Chú rể Minh Quang"
                    loading="lazy"
                    decoding="async"
                    className="w-full max-w-[240px] aspect-[4/5] rounded-xl object-cover mx-auto mb-4 border-4 border-primary/20 shadow-md"
                  />
                  <p className="font-serif text-xl font-bold text-foreground mb-1">Minh Quang</p>
                  <h3 className="font-serif text-2xl font-bold text-primary mb-2">Nhà Trai</h3>
                  <div className="w-12 h-0.5 bg-primary/30 mx-auto mb-4" />
                  <p className="font-semibold text-foreground">Bà: Nguyễn Thị Khai</p>
                  <p className="mt-4 text-muted-foreground italic">Trân trọng báo tin</p>
                </motion.div>

                {/* Bride's Family */}
                <motion.div 
                  whileHover={{ y: -5 }}
                  className="p-6 rounded-2xl bg-secondary/30 border border-secondary"
                >
                  <img
                    src={`${ASSET_BASE_URL}images/codau.webp`}
                    alt="Cô dâu Nguyễn Hảo"
                    loading="lazy"
                    decoding="async"
                    className="w-full max-w-[240px] aspect-[4/5] rounded-xl object-cover mx-auto mb-4 border-4 border-primary/20 shadow-md"
                  />
                  <p className="font-serif text-xl font-bold text-foreground mb-1">Nguyễn Hảo</p>
                  <h3 className="font-serif text-2xl font-bold text-primary mb-2">Nhà Gái</h3>
                  <div className="w-12 h-0.5 bg-primary/30 mx-auto mb-4" />
                  <p className="font-semibold text-foreground">Ông: Nguyễn Văn Miu</p>
                  <p className="font-semibold text-foreground">Bà: Đỗ Thị Trang</p>
                  <p className="mt-4 text-muted-foreground italic">Trân trọng báo tin</p>
                </motion.div>
              </div>
            </div>
          </Section>

          {/* Love Story Timeline */}
          <Section className="bg-white">
            <SectionHeader title="Chuyện Tình Yêu" subtitle="Hành trình của chúng mình" />
            <div className="max-w-4xl mx-auto relative">
              {/* Vertical Line */}
              <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-0.5 bg-primary/20" />

              <div className="space-y-16">
                <TimelineItem 
                  year="12/2024"
                  title="Lần Đầu Làm Quen"
                  description="Lời chúc sinh nhật cuối ngày hôm ấy là điểm khởi đầu của tất cả"
                  align="left"
                  img={`${ASSET_BASE_URL}images/story-1.webp`}
                />
                <TimelineItem 
                  year="2/2025"
                  title="Chính Thức Hẹn Hò"
                  description="Lời tỏ tình vụng về nhưng chân thành đã mở đầu cho những ngày tháng ngọt ngào"
                  align="right"
                  img={`${ASSET_BASE_URL}images/story-2.webp`}
                />
                <TimelineItem 
                  year="12/2025"
                  title="Lời Cầu Hôn"
                  description="Chẳng có một lời cụ thể, chỉ đơn giản là 2 trái tim đã muốn về chung 1 nhà"
                  align="left"
                  img={`${ASSET_BASE_URL}images/story-3.webp`}
                />
              </div>
            </div>
          </Section>

          {/* Gallery */}
          <Section className="bg-secondary/20">
            <SectionHeader title="Album Ảnh Cưới" subtitle="Những khoảnh khắc đẹp nhất" />
            <div ref={galleryRef} className="max-w-6xl mx-auto">
              {showGallery ? (
                <Suspense fallback={<div className="h-48" />}>
                  <LazyGallery />
                </Suspense>
              ) : (
                <div className="h-48" />
              )}
            </div>
          </Section>

          {/* Events */}
          <Section className="bg-white">
            <SectionHeader title="Sự Kiện" subtitle="Chương trình lễ cưới" />
            <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
              <EventCard 
                title=""
                time="08:00 - 09:00"
                date="07/02/2026"
                location="Tư gia nhà gái"
                address="thôn Cẩm Vực, xã Ngũ Kiên"
                img={`${ASSET_BASE_URL}images/anhoi.webp`}
                mapUrl={BRIDE_MAP_URL}
              />
              <EventCard 
                title=""
                time="09:30 - 13:30"
                date="08/02/2026"
                location="Tư gia nhà trai"
                address="đường Nguyễn Tiến Sách, xã Tứ Trưng"
                img={`${ASSET_BASE_URL}images/vuquy.webp`}
                mapUrl={GROOM_MAP_URL}
              />
            </div>
          </Section>

          {/* Wedding Gift Box */}
          <Section className="bg-secondary/20">
            <SectionHeader title="Hộp Mừng Cưới" subtitle="Wedding Gift" />
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-10 max-w-2xl mx-auto">
                <p className="text-muted-foreground italic">
                  "Hạnh phúc của chúng mình là được đón tiếp bạn. Nếu bạn muốn gửi tặng một món quà nhỏ để chúc mừng, 
                  xin hãy sử dụng mã QR dưới đây. Mọi sự quan tâm và tình cảm của các bạn đều là món quà vô giá đối với chúng mình."
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Groom's QR */}
                <motion.div 
                  whileHover={{ y: -5 }}
                  className="bg-white p-8 rounded-3xl shadow-xl border border-border flex flex-col items-center text-center"
                >
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <Heart className="w-8 h-8 text-primary fill-primary" />
                  </div>
                  <h3 className="font-serif text-2xl font-bold mb-2">Chú rể Minh Quang</h3>
                  <p className="text-sm text-muted-foreground mb-6">Ngân hàng VCB<br/>STK: 1024198898</p>
                  <div className="relative p-4 bg-white border-2 border-primary/20 rounded-2xl shadow-inner">
                    <img 
                      src={`${ASSET_BASE_URL}images/chure_bank.jpg`} 
                      alt="Groom QR" 
                      loading="lazy"
                      decoding="async"
                      className="w-48 h-48 object-contain"
                    />
                  </div>
                </motion.div>

                {/* Bride's QR */}
                <motion.div 
                  whileHover={{ y: -5 }}
                  className="bg-white p-8 rounded-3xl shadow-xl border border-border flex flex-col items-center text-center"
                >
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <Heart className="w-8 h-8 text-primary fill-primary" />
                  </div>
                  <h3 className="font-serif text-2xl font-bold mb-2">Cô dâu Nguyễn Hảo</h3>
                  <p className="text-sm text-muted-foreground mb-6">Ngân hàng MB<br/>STK: 0000940360351</p>
                  <div className="relative p-4 bg-white border-2 border-primary/20 rounded-2xl shadow-inner">
                    <img 
                      src={`${ASSET_BASE_URL}images/codau_bank.jpg`} 
                      alt="Bride QR" 
                      loading="lazy"
                      decoding="async"
                      className="w-48 h-48 object-contain"
                    />
                  </div>
                </motion.div>
              </div>

              <div className="mt-12 text-center">
                <p className="font-script text-3xl text-primary">Trân trọng cảm ơn!</p>
              </div>
            </div>
          </Section>

          {/* Footer */}
          <footer className="bg-primary text-primary-foreground py-12 text-center">
            <h2 className="font-script text-5xl mb-4">Thank You!</h2>
            <p className="font-serif text-xl">Minh Quang & Nguyễn Hảo</p>
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
          <img
            src={img}
            alt={title}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </motion.div>
  );
}

function EventCard({ title, time, date, location, address, img, mapUrl }: { 
  title: string, time: string, date: string, location: string, address: string, img: string, mapUrl?: string 
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
          loading="lazy"
          decoding="async"
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
          href={mapUrl ?? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`}
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
