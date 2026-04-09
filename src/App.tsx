import { 
  Menu, 
  Radio, 
  GraduationCap, 
  BookOpen,
  Landmark, 
  MapPin, 
  Mail, 
  Phone, 
  User, 
  Share2,
  ChevronRight,
  X,
  Facebook,
  Twitter,
  Link,
  MessageCircle,
  Calendar,
  Clock
} from 'lucide-react';
import { motion, AnimatePresence, animate, useMotionValue, useTransform, useInView } from 'motion/react';
import { useState, useEffect, useRef, FormEvent } from 'react';

function Counter({ value, duration = 2, decimals = 0, prefix = '', suffix = '' }: { value: number, duration?: number, decimals?: number, prefix?: string, suffix?: string }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => {
    const val = latest.toFixed(decimals);
    if (decimals === 0) return parseInt(val).toLocaleString();
    return val;
  });
  const [displayValue, setDisplayValue] = useState("0");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, value, { duration, ease: "easeOut" });
      return controls.stop;
    }
  }, [isInView, value, duration]);

  useEffect(() => {
    return rounded.on("change", (v) => setDisplayValue(v));
  }, [rounded]);

  return <span ref={ref}>{prefix}{displayValue}{suffix}</span>;
}

const HERO_IMAGES = [
  'https://i.ibb.co/WpW4CGMC/93013.jpg',
  'https://i.ibb.co/YBZp9SWt/93014.jpg',
  'https://i.ibb.co/b5Rj96j4/93015.jpg',
  'https://i.ibb.co/xKDbSqW8/93012-1.jpg'
];

const LOGO_URL = 'https://i.ibb.co/bMdVhRn5/Chat-GPT-Image-Apr-6-2026-10-27-34-PM.png';

function CookieConsent({ lang, t }: { lang: 'ENG' | 'ZUL', t: any }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookie-consent', 'true');
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-0 left-0 right-0 z-[100] p-4 md:p-6"
        >
          <div className="max-w-4xl mx-auto bg-inverse-surface text-inverse-on-surface p-6 md:p-8 shadow-2xl border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex-grow">
              <h4 className="font-headline font-bold text-lg mb-2 tracking-tight">{t[lang].cookiePolicy}</h4>
              <p className="text-xs md:text-sm opacity-80 leading-relaxed max-w-2xl">
                {t[lang].cookieDesc}
              </p>
            </div>
            <div className="flex items-center gap-4 w-full md:w-auto">
              <button 
                onClick={() => setIsVisible(false)}
                className="flex-1 md:flex-none px-6 py-3 text-[10px] uppercase font-bold tracking-widest hover:bg-white/10 transition-colors"
              >
                {t[lang].decline}
              </button>
              <button 
                onClick={acceptCookies}
                className="flex-1 md:flex-none px-8 py-3 bg-primary text-white text-[10px] uppercase font-bold tracking-widest hover:shadow-lg transition-all"
              >
                {t[lang].acceptAll}
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function StormAppeal({ lang, t, onContactClick }: { lang: 'ENG' | 'ZUL', t: any, onContactClick: () => void }) {
  const [currentImage, setCurrentImage] = useState(0);
  const images = [
    'https://i.ibb.co/nqgH8Vkz/jpeg.jpg',
    'https://i.ibb.co/Df1bhcC0/kzn-school-damaged-by-storm-2-5-Lee-Ffc.jpg'
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <section id="urgent-appeal" className="py-12 md:py-24 bg-tertiary text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <span className="text-editorial-label text-white/70 mb-4 block">{t[lang].urgentAppeal}</span>
            <h2 className="text-3xl md:text-5xl editorial-heading mb-6 leading-tight tracking-tight">
              {t[lang].rebuildingTitle}
            </h2>
            <div className="space-y-6 text-white/90 text-sm md:text-lg leading-relaxed">
              <p>
                {t[lang].stormDesc1}
              </p>
              <p>
                {t[lang].stormDesc2}
              </p>
              <p className="font-bold text-white">
                {t[lang].stormDesc3}
              </p>
              <div className="pt-4">
                <button 
                  onClick={onContactClick}
                  className="inline-block px-8 py-4 bg-white text-tertiary font-bold uppercase tracking-widest text-sm hover:bg-white/90 transition-all"
                >
                  {t[lang].offerAssistance}
                </button>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative aspect-video lg:aspect-square overflow-hidden rounded-sm shadow-2xl border-4 border-white/10"
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={currentImage}
                src={images[currentImage]}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 1 }}
                className="absolute inset-0 w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </AnimatePresence>
            <div className="absolute bottom-4 right-4 flex gap-2 z-10">
              {images.map((_, idx) => (
                <div 
                  key={idx} 
                  className={`w-2 h-2 rounded-full transition-all ${idx === currentImage ? 'bg-white w-6' : 'bg-white/40'}`}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

const NEWS_ARTICLE = {
  title: "Our Learners Relocated to Sgodiphola Primary Following Severe Storm Damage",
  date: "2 months ago",
  author: "School Administration",
  image: "https://i.ibb.co/nqgH8Vkz/jpeg.jpg",
  excerpt: "Following the devastating storm damage that destroyed several of our classrooms earlier this month, we have temporarily relocated our learners to Sgodiphola Primary School...",
  content: [
    "Following the devastating storm damage that destroyed several of our classrooms earlier this month, we have temporarily relocated our learners to Sgodiphola Primary School to ensure their education continues without further disruption.",
    "The KwaZulu-Natal Department of Education has confirmed that this move is an interim measure. 'This arrangement has been implemented as an interim measure to ensure the continuity of teaching and learning,' the Department stated.",
    "Our School Governing Body (SGB) chairperson, Mduduzi Madi, noted that the storm has worsened an infrastructure problem we have faced for years. 'From the moment I took over as SGB chairperson, our school already had a serious shortage of classrooms,' Madi said. 'We did not have enough proper, permanent buildings, and most of our classrooms were mobile units or temporary structures.'",
    "We have previously raised these safety and infrastructure concerns. Our principal at the time explained that there were ongoing discussions with the Department about building a permanent school, and all necessary documentation had been submitted to the Department of Public Works.",
    "We still remember the unfortunate incident where one of our teachers was injured due to the poor condition of the mobile classrooms. Following that, we approached the district office again and were informed that plans to build were in place.",
    "However, funding constraints have consistently delayed the construction of permanent buildings. We were told the Department lacked the necessary budget to proceed.",
    "During the 2024 exam period, the MEC for Education visited us. We made a pledge that if we achieved a 100% pass rate, a permanent school would be built. We are proud to say we achieved that 100% pass rate, but the issue of funding was raised once again.",
    "Instead of the permanent buildings we hoped for, we received additional mobile classrooms, six of which were unfortunately destroyed in the early January storm.",
    "The storm also struck our administration block, blowing off the roof. We had to act immediately to repair it to protect our stationery and vital school materials.",
    "In response to this crisis, we held consultative meetings between our SGB, our School Management Team, and our counterparts at Sgodiphola Primary School. We are deeply grateful to Sgodiphola for agreeing to assist us by providing 14 vacant classrooms.",
    "On January 14, the Circuit Education Specialist (CES) formally secured this agreement. We want to thank our educators and the staff at Sgodiphola for their incredible cooperation during this transition.",
    "While some of our learners now face longer travel distances, we are monitoring the situation closely and have not encountered major challenges so far. This remains a temporary arrangement while the Amajuba District works with the Head Office to provide more mobile classrooms as a medium-term solution."
  ]
};

function NewsPage({ lang, t, onBack }: { lang: 'ENG' | 'ZUL', t: any, onBack: () => void }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const shareLink = window.location.href;
  const article = t[lang].newsArticle;

  const handleShare = (platform: string) => {
    let url = "";
    const text = encodeURIComponent(article.title);
    const link = encodeURIComponent(shareLink);

    switch (platform) {
      case "twitter":
        url = `https://twitter.com/intent/tweet?text=${text}&url=${link}`;
        break;
      case "facebook":
        url = `https://www.facebook.com/sharer/sharer.php?u=${link}`;
        break;
      case "whatsapp":
        url = `https://wa.me/?text=${text}%20${link}`;
        break;
      case "copy":
        navigator.clipboard.writeText(shareLink);
        alert("Link copied to clipboard!");
        return;
    }
    if (url) window.open(url, "_blank");
  };

  const visibleContent = isExpanded ? article.content : article.content.slice(0, 3);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-surface min-h-screen pb-20"
    >
      <section className="bg-primary text-white py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-6 md:px-8">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold mb-8 hover:text-white/70 transition-colors"
          >
            <ChevronRight className="w-4 h-4 rotate-180" /> {t[lang].backToHome}
          </button>
          <div className="flex items-center gap-4 text-[10px] md:text-xs text-white/70 mb-6 uppercase tracking-widest font-bold">
            <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {article.date}</span>
            <span className="flex items-center gap-1"><User className="w-3 h-3" /> {article.author}</span>
          </div>
          <h1 className="text-3xl md:text-6xl editorial-heading leading-tight mb-8">
            {article.title}
          </h1>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 md:px-8 -mt-12 md:-mt-20">
        <motion.div 
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-white shadow-2xl rounded-sm overflow-hidden"
        >
          <div className="aspect-video md:aspect-[21/9] overflow-hidden">
            <img 
              src={NEWS_ARTICLE.image} 
              alt={article.title} 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          
          <div className="p-8 md:p-16">
            <div className={`space-y-8 text-on-surface/80 text-base md:text-xl leading-relaxed font-body relative ${!isExpanded ? 'max-h-[500px] overflow-hidden' : ''}`}>
              {visibleContent.map((para: string, i: number) => (
                <p key={i}>{para}</p>
              ))}
              
              {!isExpanded && (
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent pointer-events-none" />
              )}
            </div>

            {!isExpanded && (
              <div className="mt-8 text-center">
                <button 
                  onClick={() => setIsExpanded(true)}
                  className="px-10 py-4 bg-primary text-white font-bold uppercase tracking-widest text-xs hover:shadow-xl transition-all flex items-center gap-2 mx-auto"
                >
                  {t[lang].readFullArticle} <ChevronRight className="w-4 h-4 rotate-90" />
                </button>
              </div>
            )}
            
            <div className="mt-16 pt-10 border-t border-outline-variant/20 flex flex-col md:flex-row justify-between items-center gap-8">
              <div className="flex items-center gap-6">
                <span className="text-[10px] uppercase font-bold tracking-widest text-secondary">Share this update:</span>
                <div className="flex items-center gap-3">
                  <button onClick={() => handleShare('facebook')} className="p-3 bg-primary/5 hover:bg-primary hover:text-white text-primary rounded-full transition-all"><Facebook className="w-5 h-5" /></button>
                  <button onClick={() => handleShare('twitter')} className="p-3 bg-primary/5 hover:bg-primary hover:text-white text-primary rounded-full transition-all"><Twitter className="w-5 h-5" /></button>
                  <button onClick={() => handleShare('whatsapp')} className="p-3 bg-primary/5 hover:bg-primary hover:text-white text-primary rounded-full transition-all"><MessageCircle className="w-5 h-5" /></button>
                  <button onClick={() => handleShare('copy')} className="p-3 bg-primary/5 hover:bg-primary hover:text-white text-primary rounded-full transition-all"><Link className="w-5 h-5" /></button>
                </div>
              </div>
              <button 
                onClick={onBack}
                className="px-10 py-4 bg-primary text-white font-bold uppercase tracking-widest text-xs hover:shadow-xl transition-all"
              >
                Return to Homepage
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

function NewsSection({ onReadMore }: { onReadMore: () => void }) {
  const shareLink = window.location.href;

  const handleShare = (platform: string) => {
    let url = "";
    const text = encodeURIComponent(NEWS_ARTICLE.title);
    const link = encodeURIComponent(shareLink);

    switch (platform) {
      case "twitter":
        url = `https://twitter.com/intent/tweet?text=${text}&url=${link}`;
        break;
      case "facebook":
        url = `https://www.facebook.com/sharer/sharer.php?u=${link}`;
        break;
      case "whatsapp":
        url = `https://wa.me/?text=${text}%20${link}`;
        break;
      case "copy":
        navigator.clipboard.writeText(shareLink);
        alert("Link copied to clipboard!");
        return;
    }
    if (url) window.open(url, "_blank");
  };

  return (
    <section className="py-12 md:py-24 bg-surface-container-lowest">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 md:mb-16 text-center"
        >
          <span className="text-editorial-label text-primary mb-3 block">Latest Updates</span>
          <h2 className="text-2xl md:text-5xl editorial-heading mb-4 leading-tight tracking-tight">News & Announcements</h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-1 gap-8">
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-white shadow-xl overflow-hidden flex flex-col md:flex-row group"
          >
            <div className="md:w-1/3 aspect-video md:aspect-auto overflow-hidden">
              <img 
                src={NEWS_ARTICLE.image} 
                alt={NEWS_ARTICLE.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="p-6 md:p-10 md:w-2/3 flex flex-col justify-center">
              <div className="flex items-center gap-4 text-[10px] md:text-xs text-secondary mb-4 uppercase tracking-widest font-bold">
                <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {NEWS_ARTICLE.date}</span>
                <span className="flex items-center gap-1"><User className="w-3 h-3" /> {NEWS_ARTICLE.author}</span>
              </div>
              <h3 className="text-xl md:text-3xl font-headline font-bold text-primary mb-4 leading-tight">
                {NEWS_ARTICLE.title}
              </h3>
              <p className="text-sm md:text-base text-secondary leading-relaxed mb-6 line-clamp-3">
                {NEWS_ARTICLE.excerpt}
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <button 
                  onClick={onReadMore}
                  className="px-6 py-3 bg-primary text-white font-bold uppercase tracking-widest text-[10px] md:text-xs hover:bg-primary/90 transition-all"
                >
                  Read Full Notice
                </button>
                <div className="flex items-center gap-2">
                  <button onClick={() => handleShare('facebook')} className="p-2 hover:bg-primary/5 text-secondary hover:text-primary transition-colors" title="Share on Facebook"><Facebook className="w-4 h-4" /></button>
                  <button onClick={() => handleShare('twitter')} className="p-2 hover:bg-primary/5 text-secondary hover:text-primary transition-colors" title="Share on Twitter"><Twitter className="w-4 h-4" /></button>
                  <button onClick={() => handleShare('whatsapp')} className="p-2 hover:bg-primary/5 text-secondary hover:text-primary transition-colors" title="Share on WhatsApp"><MessageCircle className="w-4 h-4" /></button>
                  <button onClick={() => handleShare('copy')} className="p-2 hover:bg-primary/5 text-secondary hover:text-primary transition-colors" title="Copy Link"><Link className="w-4 h-4" /></button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
function ContactPage({ lang, t }: { lang: 'ENG' | 'ZUL', t: any }) {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex-grow"
    >
      <section className="bg-primary text-white py-20">
        <div className="max-w-7xl mx-auto px-6 md:px-8 text-center">
          <h1 className="text-4xl md:text-6xl editorial-heading mb-6">{t[lang].contactTitle}</h1>
          <p className="text-xl md:text-2xl font-light opacity-90">{t[lang].contactSubtitle}</p>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-surface">
        <div className="max-w-3xl mx-auto px-6 md:px-8">
          {isSubmitted ? (
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white p-12 text-center shadow-xl border-t-4 border-primary"
            >
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <ChevronRight className="w-10 h-10 text-primary rotate-[-90deg]" />
              </div>
              <h3 className="text-2xl font-headline font-bold mb-4">{t[lang].contactSuccess}</h3>
              <button 
                onClick={() => setIsSubmitted(false)}
                className="text-primary font-bold uppercase tracking-widest text-sm hover:underline"
              >
                Send another message
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white p-8 md:p-12 shadow-xl border-t-4 border-primary space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-bold tracking-widest text-secondary">{t[lang].contactName}</label>
                  <input required type="text" className="w-full p-3 bg-surface-container-low border border-outline-variant/30 focus:border-primary outline-none transition-colors" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-bold tracking-widest text-secondary">{t[lang].contactEmail}</label>
                  <input required type="email" className="w-full p-3 bg-surface-container-low border border-outline-variant/30 focus:border-primary outline-none transition-colors" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-bold tracking-widest text-secondary">{t[lang].contactSubject}</label>
                <input required type="text" className="w-full p-3 bg-surface-container-low border border-outline-variant/30 focus:border-primary outline-none transition-colors" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-bold tracking-widest text-secondary">{t[lang].contactMessage}</label>
                <textarea required rows={5} className="w-full p-3 bg-surface-container-low border border-outline-variant/30 focus:border-primary outline-none transition-colors resize-none"></textarea>
              </div>
              <button 
                type="submit"
                className="w-full py-4 bg-primary text-white font-bold uppercase tracking-widest text-sm hover:bg-primary/90 transition-all shadow-lg"
              >
                {t[lang].contactSubmit}
              </button>
            </form>
          )}

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="space-y-2">
              <div className="w-12 h-12 bg-primary/5 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-5 h-5 text-primary" />
              </div>
              <h4 className="font-bold text-sm uppercase tracking-widest">Phone</h4>
              <p className="text-secondary text-sm">073 336 3970</p>
            </div>
            <div className="space-y-2">
              <div className="w-12 h-12 bg-primary/5 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-5 h-5 text-primary" />
              </div>
              <h4 className="font-bold text-sm uppercase tracking-widest">Email</h4>
              <p className="text-secondary text-sm">info@umzilikazi.co.za</p>
            </div>
            <div className="space-y-2">
              <div className="w-12 h-12 bg-primary/5 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-5 h-5 text-primary" />
              </div>
              <h4 className="font-bold text-sm uppercase tracking-widest">Location</h4>
              <p className="text-secondary text-sm">326 D-Off Utrecht Road, Utrecht, KZN</p>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
}

function HamburgerIcon({ isOpen, onClick }: { isOpen: boolean, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className="relative w-12 h-12 flex flex-col items-center justify-center z-[110] md:hidden group focus:outline-none"
      aria-label="Toggle Menu"
    >
      <div className="w-6 h-5 flex flex-col justify-between relative">
        <motion.span 
          animate={isOpen ? { rotate: 45, y: 9 } : { rotate: 0, y: 0 }}
          className="w-full h-0.5 bg-primary rounded-full origin-center"
        />
        <motion.span 
          animate={isOpen ? { opacity: 0, x: -10 } : { opacity: 1, x: 0 }}
          className="w-full h-0.5 bg-primary rounded-full"
        />
        <motion.span 
          animate={isOpen ? { rotate: -45, y: -9 } : { rotate: 0, y: 0 }}
          className="w-full h-0.5 bg-primary rounded-full origin-center"
        />
      </div>
    </button>
  );
}

export default function App() {
  const [currentHero, setCurrentHero] = useState(0);
  const [lang, setLang] = useState<'ENG' | 'ZUL'>('ENG');
  const [currentPage, setCurrentPage] = useState<'home' | 'admissions' | 'academics' | 'gallery' | 'uniforms' | 'contact' | 'news'>('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const t = {
    ENG: {
      home: 'Home',
      academics: 'Academics',
      admissions: 'Admissions',
      gallery: 'Gallery',
      uniforms: 'Uniforms',
      schoolName: 'Umzilikazi Senior Secondary',
      motto: '“Hlonipha Ze Uhlonishwe” — Respect so that you may be respected',
      rank: '#10 National Rank 2024',
      passRate: '100% Pass Rate',
      heroTitle: 'Umzilikazi Senior Secondary',
      heroDesc: 'As a leading rural high school in our district, we are dedicated to providing world-class education to every learner, proving that excellence is a choice, not a privilege.',
      discover: 'Discover Our Story',
      apply: 'Apply Now',
      admissionTitle: 'Admissions & Enrollment',
      admissionSubtitle: 'Join a tradition of excellence and community pride.',
      admissionNotice: 'Important Notice: Applications for the 2027 academic year will be officially announced in mid-2026. Please check back for updates.',
      requirementsTitle: 'Admission Requirements',
      requirements: [
        'Certified copy of Learner\'s Birth Certificate',
        'Latest School Report',
        'Transfer Letter from previous school',
        'Certified copy of Parent/Guardian ID',
        'Proof of Residence'
      ],
      academicsTitle: 'Academic Excellence',
      academicsSubtitle: 'A decade of consistent high performance and national recognition.',
      galleryTitle: 'School Gallery',
      gallerySubtitle: 'Capturing moments of growth, achievement, and community spirit.',
      uniformTitle: 'School Uniform',
      uniformSubtitle: 'Dressing with pride and representing our heritage.',
      contact: 'Contact Us',
      contactTitle: 'Get in Touch',
      contactSubtitle: 'Have questions or want to offer support? We are here to listen.',
      contactName: 'Full Name',
      contactEmail: 'Email Address',
      contactSubject: 'Subject',
      contactMessage: 'Message',
      contactSubmit: 'Send Message',
      contactSuccess: 'Thank you! Your message has been sent. We will get back to you soon.',
      boysUniform: 'Boys Uniform',
      boysDesc: 'Grey trousers, white long/short-sleeved shirt, maroon blazer with school badge, school tie, and black school shoes.',
      girlsUniform: 'Girls Uniform',
      girlsDesc: 'Maroon skirt or tunic, white long/short-sleeved shirt, maroon blazer with school badge, school tie, white socks or black tights, and black school shoes.',
      sportsUniform: 'Sports & Tracksuit',
      sportsDesc: 'Official school tracksuit and sports shirt, worn during physical education and sporting events.',
      offerAssistance: 'Offer Assistance',
      news: 'News',
      schoolLife: 'School Life',
      latestUpdates: 'Latest Updates',
      newsAnnouncements: 'News & Announcements',
      readFullNotice: 'Read Full Notice',
      shareUpdate: 'Share this update:',
      returnHome: 'Return to Homepage',
      backToHome: 'Back to Home',
      readFullArticle: 'Read Full Article',
      urgentAppeal: 'Urgent Appeal',
      rebuildingTitle: 'Rebuilding After the Storm: A Call for Support',
      stormDesc1: 'On the 26th and 27th of December, our school was struck by devastating thunderstorms that leveled six classrooms and severely damaged ten others. This catastrophe has left over 1,600 learners with only six safe classrooms to share.',
      stormDesc2: 'Currently, over 600 of our matric and Grade 11 learners are forced to commute to a neighboring primary school, where they face extreme overcrowding with 60 to 70 students packed into single classrooms.',
      stormDesc3: 'Despite achieving a 100% pass rate and proving our commitment to excellence, we are now fighting for our survival. We are making an urgent call to businesses and the private sector for assistance in rebuilding our facilities.',
      leadershipVoice: 'Leadership Voice',
      welcomeTitle: 'Welcome to Umzilikazi',
      welcomeDesc: 'Where excellence is not just a goal, but a way of life. We believe every child deserves the opportunity to succeed, regardless of their circumstances.',
      principalTitle: 'School Principal',
      ourHeritage: 'Our Heritage',
      heritageTitle: 'Named for a King. Built by a Community.',
      heritageDesc1: 'Named in honour of King Mzilikazi — the great Zulu commander who founded the Matabele nation — our school stands as a pillar of hope in the Emadlangeni Local Municipality. As a dedicated rural high school serving Wards 3 and 5 of Emadlangeni, we face immense challenges.',
      heritageDesc2: 'Yet, under the unwavering leadership of Principal Mr. Zulu and our dedicated School Governing Body, our learners continue to defy every expectation, proving that talent lives everywhere.',
      principalQuote: '“Our teachers are the backbone of our success. Their dedication, sacrifice, and belief in every learner have transformed our school into a beacon of excellence.”',
      pillar1Title: '1. Community First',
      pillar1Desc: 'We serve our community with pride, ensuring every learner has access to quality education.',
      pillar2Title: '2. Excellence Always',
      pillar2Desc: 'Our 100% matric pass rate in 2024 proves dedication and hard work achieve results.',
      pillar3Title: '3. Resilient Spirit',
      pillar3Desc: 'Named after King Mzilikazi, we embody resilience and determination in everything we do.',
      ourTeam: 'Our Team',
      educatorsTitle: 'Exceptional Teaching Staff',
      educatorsDesc: 'Behind every successful student is a dedicated educator. Our 23 teachers bring passion, expertise, and unwavering commitment to every classroom.',
      eduFeature1Title: 'Dedicated',
      eduFeature1Desc: 'Our teachers go above and beyond, often staying after hours to help struggling students succeed.',
      eduFeature2Title: 'Expert Knowledge',
      eduFeature2Desc: 'Qualified educators with deep subject expertise who make complex topics accessible.',
      eduFeature3Title: 'Student-Focused',
      eduFeature3Desc: 'Every educator is committed to understanding each student\'s unique learning needs.',
      eduFeature4Title: 'Results-Driven',
      eduFeature4Desc: 'Their dedication is reflected in our consistent academic excellence and 100% pass rate.',
      heartSuccessTitle: 'The Heart of Our Success.',
      heartSuccessDesc: 'Our teachers are more than educators — they are mentors, role models, and champions of every learner\'s potential. With limited resources but unlimited dedication, they transform challenges into opportunities for growth.',
      tags: ['Innovative Teaching', 'Genuine Care', 'Proven Results'],
      ourResults: 'Our Results',
      academicDecadeTitle: 'A Decade of Academic Excellence',
      academicDecadeDesc: 'Our matric results speak for themselves. Consistently ranked in the top 0.2% of all South African schools.',
      result1Title: '100% Pass Rate',
      result1Desc: 'Achieved in 2024, 2019, and 2017. Ranked #10 nationally in 2024 out of 6,949 South African schools.',
      result2Title: 'Top 0.2% Nationally',
      result2Desc: 'Consistently ranked in the top 0.2% of all schools nationally, and top 0.6% of all Quintile 2 schools in KwaZulu-Natal.',
      result3Title: 'Amajuba District Leader',
      result3Desc: 'Ranked #1 in the Amajuba District in 2024 and #3 in 2025, out of 72 district schools.',
      tableYear: 'Year',
      tableCandidates: 'Candidates',
      tablePassed: 'Passed',
      tablePassRate: 'Pass %',
      tableStanding: 'Standing',
      topTier: 'Top Tier',
      tableNationalRank: 'National Rank',
      momentsMatter: 'Moments That Matter',
      momentsDesc: 'Explore the vibrant life at Umzilikazi Senior Secondary School through our gallery of achievements, events, and community moments.',
      viewFullGallery: 'View Full Gallery',
      ourAlliances: 'Our Alliances',
      communityStands: 'Our Community Stands With Us',
      partner1Title: 'Gagasi FM (99.5 FM)',
      partner1Desc: 'Gagasi FM adopted Umzilikazi Senior Secondary School as part of their Geleza Ne Gagasi 2025 CSI campaign, providing essential resources for the 2025 academic year.',
      partner2Title: 'Durban University of Technology (DUT)',
      partner2Desc: 'DUT\'s UNI4ALL Community Engagement Programme sends students to assist our Grade 12 learners with tertiary applications, breaking down barriers to higher education.',
      partner3Title: 'eMadlangeni Local Municipality',
      partner3Desc: 'The eMadlangeni Municipality has honoured our school\'s academic excellence at Mayoral Excellence Awards ceremonies, recognising our consistent 100% pass rates.',
      enrollment: 'Enrollment',
      becomePart: 'Become Part of the Umzilikazi Family',
      enrollmentDesc: 'Umzilikazi Senior Secondary School is a public, rural institution. We welcome learners from all Emadlangeni and surrounding areas. Admission is open to Grade 8 through Grade 12 learners. For enquiries, contact our office directly or use the form below.',
      schoolType: 'School Type',
      schoolTypeValue: 'Public Rural School (Quintile 2)',
      grades: 'Grades',
      gradesValue: 'Grade 8 to Grade 12',
      curriculumTitle: 'Our Curriculum',
      curriculumDesc: 'We offer a comprehensive CAPS-aligned curriculum from Grade 8 through Grade 12, designed to prepare learners for higher education and future careers.',
      getPhaseTitle: 'General Education & Training (Grade 8 - 9)',
      getPhaseDesc: 'The GET phase focuses on building a strong foundation across a broad range of subjects.',
      getSubjects: [
        'isiZulu Home Language',
        'English First Additional Language',
        'Mathematics',
        'Natural Sciences (Physics & Biology)',
        'Social Sciences (History & Geography)',
        'Economic & Management Sciences (EMS)',
        'Technology',
        'Life Orientation',
        'Creative Arts'
      ],
      fetPhaseTitle: 'Further Education & Training (Grade 10 - 12)',
      fetPhaseDesc: 'In the FET phase, learners specialize in specific streams to prepare for the National Senior Certificate (NSC).',
      fetCompulsoryTitle: 'Compulsory Subjects',
      fetCompulsorySubjects: [
        'isiZulu Home Language',
        'English First Additional Language',
        'Mathematics or Mathematical Literacy',
        'Life Orientation'
      ],
      fetElectiveTitle: 'Elective Streams',
      fetStreams: [
        {
          name: 'Science Stream',
          subjects: ['Physical Sciences', 'Life Sciences', 'Agricultural Sciences']
        },
        {
          name: 'Commerce Stream',
          subjects: ['Accounting', 'Business Studies', 'Economics']
        },
        {
          name: 'Humanities Stream',
          subjects: ['Geography', 'History', 'Tourism']
        }
      ],
      enrolmentLabel: 'Ukubhaliswa',
      learners: 'Learners',
      educators: 'Educators',
      contactInfo: 'Contact Information',
      phoneEnquiries: 'Phone Enquiries',
      address: 'Address',
      location: 'Location',
      postalAddress: 'Postal Address',
      principal: 'Principal',
      grade8Enroll: 'Grade 8 Enrollment',
      grade8Desc: 'We prioritize learners from our local feeder primary schools in Emadlangeni and surrounding areas. Space is limited, so early application is encouraged once the window opens.',
      transferStudents: 'Transfer Students',
      transferDesc: 'Learners wishing to transfer into Grades 9-11 must provide a valid transfer letter and their most recent academic records for review by the School Governing Body.',
      matricHistory: 'Matric Results History',
      quickLinks: 'Quick Links',
      districtAffiliation: 'District Affiliation',
      districtDesc: 'Amajuba District, KwaZulu-Natal Department of Education.',
      specialRecognition: 'Special Recognition',
      gagasiRecognition: 'Proudly adopted by Gagasi FM — Geleza Ne Gagasi 2025',
      allRightsReserved: 'All Rights Reserved.',
      privacyPolicy: 'Privacy Policy',
      termsOfUse: 'Terms of Use',
      cookiePolicy: 'Cookie Policy',
      cookieDesc: 'We use cookies to enhance your experience, analyze site traffic, and serve better content. By clicking "Accept All", you consent to our use of cookies.',
      decline: 'Decline',
      acceptAll: 'Accept All',
      phone: 'Phone',
      email: 'Email',
      menu: 'Menu',
      excellenceInEducation: 'Excellence in Education',
      academicExcellence: 'Academic Excellence',
      gagasiFmGelezaNathi: 'Gagasi FM Geleza Nathi',
      nationalRank2024: 'National Rank 2024',
      passRateMultipleYears: 'Pass Rate (Multiple Years)',
      nationallyRankedSchools: 'Nationally Ranked Schools',
      newsArticle: {
        title: "Our Learners Relocated to Sgodiphola Primary Following Severe Storm Damage",
        date: "2 months ago",
        author: "School Administration",
        excerpt: "Following the devastating storm damage that destroyed several of our classrooms earlier this month, we have temporarily relocated our learners to Sgodiphola Primary School...",
        content: [
          "Following the devastating storm damage that destroyed several of our classrooms earlier this month, we have temporarily relocated our learners to Sgodiphola Primary School to ensure their education continues without further disruption.",
          "The KwaZulu-Natal Department of Education has confirmed that this move is an interim measure. 'This arrangement has been implemented as an interim measure to ensure the continuity of teaching and learning,' the Department stated.",
          "Our School Governing Body (SGB) chairperson, Mduduzi Madi, noted that the storm has worsened an infrastructure problem we have faced for years. 'From the moment I took over as SGB chairperson, our school already had a serious shortage of classrooms,' Madi said. 'We did not have enough proper, permanent buildings, and most of our classrooms were mobile units or temporary structures.'",
          "We have previously raised these safety and infrastructure concerns. Our principal at the time explained that there were ongoing discussions with the Department about building a permanent school, and all necessary documentation had been submitted to the Department of Public Works.",
          "We still remember the unfortunate incident where one of our teachers was injured due to the poor condition of the mobile classrooms. Following that, we approached the district office again and were informed that plans to build were in place.",
          "However, funding constraints have consistently delayed the construction of permanent buildings. We were told the Department lacked the necessary budget to proceed.",
          "During the 2024 exam period, the MEC for Education visited us. We made a pledge that if we achieved a 100% pass rate, a permanent school would be built. We are proud to say we achieved that 100% pass rate, but the issue of funding was raised once again.",
          "Instead of the permanent buildings we hoped for, we received additional mobile classrooms, six of which were unfortunately destroyed in the early January storm.",
          "The storm also struck our administration block, blowing off the roof. We had to act immediately to repair it to protect our stationery and vital school materials.",
          "In response to this crisis, we held consultative meetings between our SGB, our School Management Team, and our counterparts at Sgodiphola Primary School. We are deeply grateful to Sgodiphola for agreeing to assist us by providing 14 vacant classrooms.",
          "On January 14, the Circuit Education Specialist (CES) formally secured this agreement. We want to thank our educators and the staff at Sgodiphola for their incredible cooperation during this transition.",
          "While some of our learners now face longer travel distances, we are monitoring the situation closely and have not encountered major challenges so far. This remains a temporary arrangement while the Amajuba District works with the Head Office to provide more mobile classrooms as a medium-term solution."
        ]
      },
      stats: [
        { label: 'Enrolled Learners', value: 1657, suffix: '+' },
        { label: '10-Year Average Pass Rate', value: 97.8, suffix: '%' },
        { label: 'National Rank in 2024', value: 10, prefix: '#' },
        { label: 'Dedicated Educators', value: 23 }
      ]
    },
    ZUL: {
      home: 'Ekhaya',
      academics: 'Ezokufunda',
      admissions: 'Ukungena',
      gallery: 'Imifanekiso',
      uniforms: 'Iyunifomu',
      schoolName: 'Umzilikazi Senior Secondary',
      motto: '“Hlonipha ukuze nawe uhlonishwe”',
      rank: 'Inombolo 10 Ezweni 2024',
      passRate: '100% Okuphasa',
      heroTitle: 'Isikole saseMzilikazi',
      heroDesc: 'Njengoba siyisikole samabanga aphakeme esihamba phambili emakhaya esifundeni sethu, sizibophezele ekunikezeni imfundo esezingeni lomhlaba kuwo wonke umfundi, sikhombisa ukuthi ukusebenza kahle kuwukuzikhethela, hhayi ilungelo.',
      discover: 'Thola Indaba Yethu',
      apply: 'Faka Isicelo Manje',
      admissionTitle: 'Ukungeniswa Nokubhaliswa',
      admissionSubtitle: 'Joyina isiko lokusebenza kahle nokuziqhenya komphakathi.',
      admissionNotice: 'Isaziso Esibalulekile: Izicelo zonyaka wokufunda ka-2027 zizomenyezelwa ngokusemthethweni maphakathi no-2026. Sicela uphinde uhlole ukuze uthole imininingwane.',
      requirementsTitle: 'Izidingo Zokungeniswa',
      requirements: [
        'Ikhophi eqinisekisiwe yesitifiketi sokuzalwa somfundi',
        'Umbiko wesikole wakamuva',
        'Incwadi yokudlulisa evela esikoleni sangaphambilini',
        'Ikhophi eqinisekisiwe kamazisi womzali/umbheki',
        'Ubufakazi bendawo yokuhlala'
      ],
      academicsTitle: 'Ukusebenza Kahle Kwezemfundo',
      academicsSubtitle: 'Iminyaka eyishumi yokusebenza kahle okungaguquki nokuqashelwa kuzwelonke.',
      galleryTitle: 'Igalari Yesikole',
      gallerySubtitle: 'Ukuthwebula izikhathi zokukhula, impumelelo, nomoya womphakathi.',
      uniformTitle: 'Iyunifomu Yesikole',
      uniformSubtitle: 'Ukugqoka ngokuziqhenya nokumela amagugu ethu.',
      contact: 'Xhumana Nathi',
      contactTitle: 'Thintana Nathi',
      contactSubtitle: 'Unemibuzo noma ufuna ukunikeza ukwesekwa? Silapha ukuze silalele.',
      contactName: 'Igama Eligcwele',
      contactEmail: 'Ikheli Le-imeyili',
      contactSubject: 'Isihloko',
      contactMessage: 'Umlayezo',
      contactSubmit: 'Thumela Umlayezo',
      contactSuccess: 'Ngiyabonga! Umlayezo wakho uthunyelwe. Sizobuyela kuwe maduze.',
      boysUniform: 'Iyunifomu Yabafana',
      boysDesc: 'Ibhulukwe elimpunga, ihembe elimhlophe elinemikhono emide/emifushane, ibhantshi elibomvu (maroon) elinebheji lesikole, uthayi wesikole, nezicathulo zesikole ezimnyama.',
      girlsUniform: 'Iyunifomu Yamantombazane',
      girlsDesc: 'Isiketi esibomvu (maroon) noma itunic, ihembe elimhlophe elinemikhono emide/emifushane, ibhantshi elibomvu (maroon) elinebheji lesikole, uthayi wesikole, amasokisi amhlophe noma amateyithi amnyama, nezicathulo zesikole ezimnyama.',
      sportsUniform: 'Izemidlalo neTracksuit',
      sportsDesc: 'I-tracksuit yesikole esemthethweni nehembe lezemidlalo, okugqokwa ngesikhathi semfundo yomzimba nemicimbi yezemidlalo.',
      offerAssistance: 'Nikela Ngosizo',
      news: 'Izindaba',
      schoolLife: 'Impilo Yasesikoleni',
      latestUpdates: 'Izindaba Zakamuva',
      newsAnnouncements: 'Izindaba Nezimemezelo',
      readFullNotice: 'Funda Isaziso Esigcwele',
      shareUpdate: 'Yabelana ngalezi zindaba:',
      returnHome: 'Buyela Ekhasini Lasekhaya',
      backToHome: 'Buyela Ekhaya',
      readFullArticle: 'Funda Isihloko Esigcwele',
      urgentAppeal: 'Isicelo Esiphuthumayo',
      rebuildingTitle: 'Ukuvuselela Ngemuva Kwesiphepho: Isicelo Sokusekelwa',
      stormDesc1: 'Ngomhla zingama-26 nezama-27 kuZibandlela, isikole sethu sahlaselwa yizulu elinamandla elaceka amagumbi okufundela ayisithupha kwathi amanye ayishumi onakala kakhulu. Le nhlekelele ishiye abafundi abangaphezu kwe-1,600 namagumbi okufundela ayisithupha kuphela aphephile.',
      stormDesc2: 'Njengamanje, abafundi bethu bakamatikuletsheni nabasebangeni le-11 abangaphezu kwama-600 baphoqeleka ukuba baye esikoleni samabanga aphansi esingumakhelwane, lapho bebhekana nokuminyana okwedlulele lapho abafundi abangama-60 kuya kwama-70 beminyene egumbini elilodwa.',
      stormDesc3: 'Naphezu kokuthola izinga lokuphasa elingama-100% nokukhombisa ukuzibophezela kwethu ekusebenzeni kahle, manje silwela ukuphila kwethu. Senza isicelo esiphuthumayo emabhizinisini nasezinkampanini ezizimele ukuba basisize ekuvuseleleni izakhiwo zethu.',
      leadershipVoice: 'Izwi Lobuholi',
      welcomeTitle: 'Siyakwamukela eMzilikazi',
      welcomeDesc: 'Lapho ukusebenza kahle kungeyona nje inhloso, kodwa kuyindlela yokuphila. Sikholelwa ukuthi wonke umntwana ufanelwe yithuba lokuphumelela, kungakhathaliseki izimo zakhe.',
      principalTitle: 'Uthishanhloko Wesikole',
      ourHeritage: 'Amagugu Ethu',
      heritageTitle: 'Eqanjwe Ngenkosi. Yakhiwe Ngumphakathi.',
      heritageDesc1: 'Eqanjwe ngokuhlonipha iNkosi uMzilikazi — umkhuzi omkhulu wamaZulu owasungula isizwe samaNdebele — isikole sethu simi njengensika yethemba kuMasipala waseMadlangeni. Njengesikole samabanga aphakeme sasemakhaya esikhonza amaWadi 3 no-5 waseMadlangeni, sibhekene nezinselelo ezinkulu.',
      heritageDesc2: 'Nokho, ngaphansi kobuholi obungantengantengi bukaThishanhloko uMnu. Zulu kanye neBhodi elilawula isikole (SGB), abafundi bethu bayaqhubeka nokunqoba zonke izithiyo, bakhombisa ukuthi ithalente likhona yonke indawo.',
      principalQuote: '“Othisha bethu bayinsika yempumelelo yethu. Ukuzinikela kwabo, ukuzidela kwabo, nokukholelwa kwabo kuwo wonke umfundi kuguqule isikole sethu saba yisibani sokusebenza kahle.”',
      pillar1Title: '1. Umphakathi Kuqala',
      pillar1Desc: 'Sikhonza umphakathi wethu ngokuziqhenya, siqinisekisa ukuthi wonke umfundi uthola imfundo esezingeni eliphezulu.',
      pillar2Title: '2. Ukusebenza Kahle Njalo',
      pillar2Desc: 'Izinga lethu lokuphasa likamatikuletsheni elingama-100% ngo-2024 likhombisa ukuthi ukuzinikela nokusebenza kanzima kuletha imiphumela.',
      pillar3Title: '3. Umoya Wokuqina',
      pillar3Desc: 'Eqanjwe ngeNkosi uMzilikazi, simele ukuqina nokuzimisela kukho konke esikwenzayo.',
      ourTeam: 'Ithimba Lethu',
      educatorsTitle: 'Abasebenzi Bokufundisa Abavelele',
      educatorsDesc: 'Ngemuva kwawo wonke umfundi ophumelelayo kukhona uthisha ozinikele. Othisha bethu abangama-23 baletha intshisekelo, ubuchwepheshe, nokuzibophezela okungaguquki kuwo wonke amagumbi okufundela.',
      eduFeature1Title: 'Ozinikele',
      eduFeature1Desc: 'Othisha bethu benza okungaphezu kwalokho okulindelekile, bavame ukuhlala ngemuva kwamahora omsebenzi ukuze basize abafundi abashaywayo ukuze baphumelele.',
      eduFeature2Title: 'Ulwazi Lobuchwepheshe',
      eduFeature2Desc: 'Othisha abaqeqeshiwe abanolwazi olujulile lwezifundo abenza izihloko ezinzima ziqondakale kalula.',
      eduFeature3Title: 'Okugxile Kumfundi',
      eduFeature3Desc: 'Wonke uthisha uzibophezele ekuqondeni izidingo zokufunda zomfundi ngamunye.',
      eduFeature4Title: 'Okuqhutshwa Yimiphumela',
      eduFeature4Desc: 'Ukuzinikela kwabo kubonakala ekusebenzeni kwethu kahle kwezemfundo okuqhubekayo kanye nezinga lokuphasa elingama-100%.',
      heartSuccessTitle: 'Inhliziyo Yempumelelo Yethu.',
      heartSuccessDesc: 'Othisha bethu bangaphezu kwabafundisi — bangabeluleki, bayizibonelo ezinhle, nabavikeli bamakhono awo wonke umfundi. Ngezinsiza ezilinganiselwe kodwa ngokuzinikela okungenamkhawulo, baguqula izinselelo zibe ngamathuba okukhula.',
      tags: ['Ukufundisa Okusha', 'Ukunakekela Kwangempela', 'Imiphumela Eqinisekisiwe'],
      ourResults: 'Imiphumela Yethu',
      academicDecadeTitle: 'Iminyaka Eyishumi Yokusebenza Kahle Kwezemfundo',
      academicDecadeDesc: 'Imiphumela yethu kamatikuletsheni iyazikhulumela. Sihlale sibalwa phakathi kwama-0.2% aphezulu azo zonke izikole zaseNingizimu Afrika.',
      result1Title: '100% Izinga Lokuphasa',
      result1Desc: 'Kutholwe ngo-2024, 2019, nango-2017. Sibekwe endaweni ye-10 ezweni lonke ngo-2024 phakathi kwezikole zaseNingizimu Afrika eziyizinkulungwane eziyisithupha namakhulu ayisishiyagalolunye namashumi amane nesishiyagalolunye (6,949).',
      result2Title: 'Ama-0.2% Aphezulu Ezweni',
      result2Desc: 'Sihlale sibalwa phakathi kwama-0.2% aphezulu azo zonke izikole ezweni lonke, kanye nama-0.6% aphezulu azo zonke izikole ze-Quintile 2 KwaZulu-Natal.',
      result3Title: 'Umholi Wesifunda sase-Amajuba',
      result3Desc: 'Sibekwe endaweni yoku-1 esifundeni sase-Amajuba ngo-2024 nendawo yesi-3 ngo-2025, phakathi kwezikole zesifunda ezingama-72.',
      tableYear: 'Unyaka',
      tableCandidates: 'Abafundi',
      tablePassed: 'Abaphasile',
      tablePassRate: 'Ukuphasa %',
      tableStanding: 'Isimo',
      topTier: 'Izinga Eliphezulu',
      tableNationalRank: 'Izinga Ezweni',
      momentsMatter: 'Izikhathi Ezibalulekile',
      momentsDesc: 'Hlola impilo enomdlandla eMzilikazi Senior Secondary School ngegalari yethu yempumelelo, imicimbi, nezikhathi zomphakathi.',
      viewFullGallery: 'Buka Igalari Ephelele',
      ourAlliances: 'Ukusebenzisana Kwethu',
      communityStands: 'Umphakathi Wethu Unathi',
      partner1Title: 'Gagasi FM (99.5 FM)',
      partner1Desc: 'IGagasi FM lamukela iMzilikazi Senior Secondary School njengengxenye yomkhankaso wabo we-Geleza Ne Gagasi 2025 CSI, linikeza izinsiza ezibalulekile zonyaka wokufunda ka-2025.',
      partner2Title: 'Durban University of Technology (DUT)',
      partner2Desc: 'Uhlelo lwe-DUT UNI4ALL Community Engagement luthumela abafundi ukuzosiza abafundi bethu bebanga le-12 ngezicelo zemfundo ephakeme, basuse izithiyo zemfundo ephakeme.',
      partner3Title: 'uMasipala waseMadlangeni',
      partner3Desc: 'UMasipala waseMadlangeni uhloniphe ukusebenza kahle kwesikole sethu kwezemfundo emicimbini ye-Mayoral Excellence Awards, uqaphela amazinga ethu okuphasa angama-100%.',
      enrollment: 'Ukubhaliswa',
      becomePart: 'Yiba Ingxenye Yomndeni waseMzilikazi',
      enrollmentDesc: 'Umzilikazi Senior Secondary School isikole somphakathi sasemakhaya. Samukela abafundi abavela kuyo yonke iMadlangeni nezindawo ezizungezile. Ukwamukelwa kuvulelekile kubafundi beBanga lesi-8 kuya kwele-12. Ngemibuzo, thintana nehhovisi lethu ngqo noma usebenzise ifomu elingezansi.',
      schoolType: 'Uhlobo lwesikole',
      schoolTypeValue: 'Isikole Somphakathi Sasemakhaya (Quintile 2)',
      grades: 'Amabanga',
      gradesValue: 'IBanga lesi-8 kuya kwele-12',
      curriculumTitle: 'Uhlelo Lwethu Lokufunda',
      curriculumDesc: 'Sinikela ngohlelo lokufunda olubanzi oluhambisana ne-CAPS kusukela eBangeni lesi-8 kuya eBangeni le-12, oluklanyelwe ukulungiselela abafundi imfundo ephakeme nemisebenzi yakusasa.',
      getPhaseTitle: 'Imfundo Nezoqeqesho Olujwayelekile (IBanga 8 - 9)',
      getPhaseDesc: 'Isigaba se-GET sigxile ekwakheni isisekelo esiqinile ezifundweni eziningi ezahlukene.',
      getSubjects: [
        'IsiZulu Home Language',
        'English First Additional Language',
        'I-Mathematics',
        'I-Natural Sciences (Physics & Biology)',
        'I-Social Sciences (History & Geography)',
        'I-Economic & Management Sciences (EMS)',
        'I-Technology',
        'I-Life Orientation',
        'I-Creative Arts'
      ],
      fetPhaseTitle: 'Imfundo Nezoqeqesho Olunwetshiwe (IBanga 10 - 12)',
      fetPhaseDesc: 'Esigabeni se-FET, abafundi bagxila emikhakheni ethile ukuze balungiselele i-National Senior Certificate (NSC).',
      fetCompulsoryTitle: 'Izifundo Eziphoqelekile',
      fetCompulsorySubjects: [
        'IsiZulu Home Language',
        'English First Additional Language',
        'I-Mathematics noma i-Mathematical Literacy',
        'I-Life Orientation'
      ],
      fetElectiveTitle: 'Imikhakha Ongayikhetha',
      fetStreams: [
        {
          name: 'Umkhakha Wezesayensi',
          subjects: ['I-Physical Sciences', 'I-Life Sciences', 'I-Agricultural Sciences']
        },
        {
          name: 'Umkhakha Wezohwebo',
          subjects: ['I-Accounting', 'I-Business Studies', 'I-Economics']
        },
        {
          name: 'Umkhakha Wezobuntu',
          subjects: ['I-Geography', 'I-History', 'I-Tourism']
        }
      ],
      enrolmentLabel: 'Ukubhaliswa',
      learners: 'Abafundi',
      educators: 'Othisha',
      contactInfo: 'Imininingwane Yokuxhumana',
      phoneEnquiries: 'Imibuzo Ngocingo',
      address: 'Ikheli',
      location: 'Indawo',
      postalAddress: 'Ikheli Leposi',
      principal: 'Uthishanhloko',
      grade8Enroll: 'Ukubhaliswa kweBanga lesi-8',
      grade8Desc: 'Sibeka eqhulwini abafundi abavela ezikoleni zethu zamabanga aphansi zaseMadlangeni nezindawo ezizungezile. Isikhala silinganiselwe, ngakho-ke ukufaka isicelo kusenesikhathi kuyakhuthazwa uma iwindi livulwa.',
      transferStudents: 'Abafundi Abadluliswayo',
      transferDesc: 'Abafundi abafuna ukudluliselwa emabangeni 9-11 kumele balethe incwadi yokudlulisa esemthethweni nemibiko yabo yakamuva yezemfundo ukuze ibuyekezwe yiBhodi elilawula isikole.',
      matricHistory: 'Umlando Wemiphumela Kamatikuletsheni',
      quickLinks: 'Izixhumanisi Ezisheshayo',
      districtAffiliation: 'Ukuxhumana Nesifunda',
      districtDesc: 'Isifunda sase-Amajuba, uMnyango Wezemfundo KwaZulu-Natal.',
      specialRecognition: 'Ukuqashelwa Okukhethekile',
      gagasiRecognition: 'Samukelwe ngokuziqhenya yiGagasi FM — Geleza Ne Gagasi 2025',
      allRightsReserved: 'Wonke Amalungelo Agodliwe.',
      privacyPolicy: 'Inqubomgomo Yobumfihlo',
      termsOfUse: 'Imigomo Yokusebenzisa',
      cookiePolicy: 'Inqubomgomo Yama-Cookie',
      cookieDesc: 'Sisebenzisa ama-cookie ukuze sithuthukise ulwazi lwakho, sihlaziye ithrafikhi yesayithi, futhi sinikeze okuqukethwe okungcono. Ngokuchofoza "Yamukela Konke", uvumela ukusetshenziswa kwethu kwama-cookie.',
      decline: 'Yenqaba',
      acceptAll: 'Yamukela Konke',
      phone: 'Ucingo',
      email: 'I-imeyili',
      menu: 'Imenyu',
      excellenceInEducation: 'Ukusebenza Kahle Kwezemfundo',
      academicExcellence: 'Ukusebenza Kahle Kwezemfundo',
      gagasiFmGelezaNathi: 'IGagasi FM Geleza Nathi',
      nationalRank2024: 'Izinga Ezweni ngo-2024',
      passRateMultipleYears: 'Izinga Lokuphasa (Iminyaka Eminingi)',
      nationallyRankedSchools: 'Izikole Ezibalwa Phakathi Kweziphezulu Ezweni',
      newsArticle: {
        title: "Abafundi Bethu Bathuthelwe eSgodiphola Primary Ngemuva Komonakalo Omkhulu Wesiphepho",
        date: "ezinyangeni ezi-2 ezedlule",
        author: "Abaphathi Besikole",
        excerpt: "Ngemuva komonakalo owesabekayo wesiphepho ocekele phansi amagumbi ethu okufundela amaningi ekuqaleni kwale nyanga, sibathuthele okwesikhashana abafundi bethu eSgodiphola Primary School...",
        content: [
          "Ngemuva komonakalo owesabekayo wesiphepho ocekele phansi amagumbi ethu okufundela amaningi ekuqaleni kwale nyanga, sibathuthele okwesikhashana abafundi bethu eSgodiphola Primary School ukuze siqinisekise ukuthi imfundo yabo iyaqhubeka ngaphandle kokuphazamiseka okwengeziwe.",
          "UMnyango Wezemfundo KwaZulu-Natal ukuqinisekisile ukuthi lokhu kuthutha kuyisinyathelo sesikhashana. 'Lolu hlelo lwenziwe njengesinyathelo sesikhashana sokuqinisekisa ukuqhubeka kokufundisa nokufunda,' kusho uMnyango.",
          "Usihlalo weBhodi elilawula isikole (SGB), uMduduzi Madi, uthe isiphepho sibhebhethekise inkinga yengqalasizinda esibhekane nayo iminyaka. 'Kusukela ngesikhathi ngithatha izintambo njengosihlalo we-SGB, isikole sethu besivele sinenkinga enkulu yokushoda kwamagumbi okufundela,' kusho uMadi. 'Besingenazo izakhiwo ezifanele nezingunaphakade, futhi amaningi amagumbi ethu okufundela bekungamobile units noma izakhiwo zesikhashana.'",
          "Sike saziveza lezi zinkinga zokuphepha nengqalasizinda ngaphambilini. Uthishanhloko wethu ngaleso sikhathi wachaza ukuthi kunezingxoxo eziqhubekayo noMnyango mayelana nokwakhiwa kwesikole esingunaphakade, futhi yonke imibhalo edingekayo yayihanjisiwe eMnyangweni Wezemisebenzi Yomphakathi.",
          "Sisakhumbula isigameko esibi lapho omunye wothisha bethu alimala khona ngenxa yesimo esibi samagumbi okufundela angomahamba-nendlwana. Ngemuva kwalokho, saphinde sathinta ihhovisi lesifunda sazikwa ukuthi izinhlelo zokwakha zikhona.",
          "Nokho, ukushoda kwezimali kuye kwabambezela njalo ukwakhiwa kwezakhiwo ezingunaphakade. Satshelwa ukuthi uMnyango awunayo isabelomali esidingekayo ukuze uqhubeke.",
          "Ngesikhathi sokuhlolwa kuka-2024, u-MEC Wezemfundo wasivakashela. Senza isithembiso sokuthi uma sithola izinga lokuphasa elingama-100%, kuzokwakhiwa isikole esingunaphakade. Siyaziqhenya ngokuthi sasilithola lelo zinga lokuphasa elingama-100%, kodwa inkinga yezimali yaphakanyiswa futhi.",
          "Esikhundleni sezakhiwo ezingunaphakade ebesizithembe, sathola amanye amagumbi okufundela angomahamba-nendlwana, ayisithupha kuwo adliwa yisiphepho sasekuqaleni kukaZibandlela.",
          "Isiphepho siphinde sahlasela ibhulokhi yethu yokuphatha, saphephetha uphahla. Kwadingeka sithathe isinyathelo ngokushesha ukuze silulungise ukuze sivikele izinto zethu zokubhala nezinto zesikole ezibalulekile.",
          "Ekuphenduleni le nkinga, saba nemihlangano yokubonisana phakathi kwe-SGB yethu, Ithimba Labaphathi Besikole, nabalingani bethu eSgodiphola Primary School. Sibonga kakhulu eSgodiphola ngokuvuma ukusisiza ngokusinika amagumbi okufundela ayi-14 ayengasetshenziswa.",
          "Ngomhla ziyi-14 kuMasingana, uCircuit Education Specialist (CES) wasiqinisekisa ngokusemthethweni lesi sivumelwano. Sifuna ukubonga othisha bethu nabasebenzi baseSgodiphola ngokubambisana kwabo okumangalisayo phakathi nalolu shintsho.",
          "Nakuba abanye babafundi bethu manje bebhekene namabanga amade okuhamba, siyasigada isimo eduze futhi asikaze sihlangabezane nezinselelo ezinkulu kuze kube manje. Lokhu kuhlala kuyilungiselelo lesikhashana ngenkathi isifunda sase-Amajuba sisebenzisana neHhovisi Elikhulu ukuhlinzeka ngamagumbi okufundela angomahamba-nendlwana amaningi njengesixazululo sesikhathi esiphakathi."
        ]
      },
      stats: [
        { label: 'Abafundi Ababhalisile', value: 1657, suffix: '+' },
        { label: 'Isilinganiso sokuphasa seminyaka eyi-10', value: 97.8, suffix: '%' },
        { label: 'Izinga Ezweni ngo-2024', value: 10, prefix: '#' },
        { label: 'Othisha Abazinikele', value: 23 }
      ]
    }
  };

  const GALLERY_IMAGES = [
    { url: 'https://i.ibb.co/JjQQNNnN/93011.jpg', label: t[lang].academicExcellence },
    { url: 'https://i.ibb.co/xKDbSqW8/93012-1.jpg', label: t[lang].academicExcellence },
    { url: 'https://i.ibb.co/WpW4CGMC/93013.jpg', label: t[lang].gagasiFmGelezaNathi },
    { url: 'https://i.ibb.co/YBZp9SWt/93014.jpg', label: t[lang].gagasiFmGelezaNathi },
    { url: 'https://i.ibb.co/b5Rj96j4/93015.jpg', label: t[lang].gagasiFmGelezaNathi },
    { url: 'https://i.ibb.co/JjQQNNnN/93011.jpg', label: t[lang].academicExcellence }
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentHero((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      {/* TopAppBar */}
      <header className="bg-white/90 backdrop-blur-md sticky top-0 shadow-sm z-50 border-b border-outline-variant/10">
        <div className="flex justify-between items-center w-full px-4 md:px-8 py-3 md:py-4 max-w-screen-2xl mx-auto">
          <div className="flex items-center gap-2">
            <HamburgerIcon isOpen={isMenuOpen} onClick={() => setIsMenuOpen(!isMenuOpen)} />
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => { setCurrentPage('home'); setIsMenuOpen(false); }}>
              <img 
                src={LOGO_URL} 
                alt="Umzilikazi Logo" 
                className="h-10 md:h-16 w-auto object-contain transition-transform hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="flex flex-col hidden sm:flex">
                <span className="text-sm md:text-xl font-bold tracking-tight text-primary font-headline leading-none">
                  {t[lang].schoolName}
                </span>
                <span className="text-[8px] md:text-[10px] uppercase tracking-[0.2em] text-secondary font-medium mt-1">
                  {t[lang].excellenceInEducation}
                </span>
              </div>
            </div>
          </div>
          <nav className="hidden md:flex gap-8 items-center">
            <button 
              onClick={() => setCurrentPage('home')}
              className={`${currentPage === 'home' ? 'text-primary border-b-2 border-primary' : 'text-secondary hover:text-primary'} pb-1 text-editorial-label transition-colors duration-300`}
            >
              {t[lang].home}
            </button>
            <button 
              onClick={() => setCurrentPage('academics')}
              className={`${currentPage === 'academics' ? 'text-primary border-b-2 border-primary' : 'text-secondary hover:text-primary'} pb-1 text-editorial-label transition-colors duration-300`}
            >
              {t[lang].academics}
            </button>
            <button 
              onClick={() => setCurrentPage('admissions')}
              className={`${currentPage === 'admissions' ? 'text-primary border-b-2 border-primary' : 'text-secondary hover:text-primary'} pb-1 text-editorial-label transition-colors duration-300`}
            >
              {t[lang].admissions}
            </button>
            <button 
              onClick={() => setCurrentPage('gallery')}
              className={`${currentPage === 'gallery' ? 'text-primary border-b-2 border-primary' : 'text-secondary hover:text-primary'} pb-1 text-editorial-label transition-colors duration-300`}
            >
              {t[lang].gallery}
            </button>
            <button 
              onClick={() => setCurrentPage('uniforms')}
              className={`${currentPage === 'uniforms' ? 'text-primary border-b-2 border-primary' : 'text-secondary hover:text-primary'} pb-1 text-editorial-label transition-colors duration-300`}
            >
              {t[lang].uniforms}
            </button>
            <button 
              onClick={() => setCurrentPage('news')}
              className={`${currentPage === 'news' ? 'text-primary border-b-2 border-primary' : 'text-secondary hover:text-primary'} pb-1 text-editorial-label transition-colors duration-300`}
            >
              {t[lang].news}
            </button>
            <button 
              onClick={() => setCurrentPage('contact')}
              className={`${currentPage === 'contact' ? 'text-primary border-b-2 border-primary' : 'text-secondary hover:text-primary'} pb-1 text-editorial-label transition-colors duration-300`}
            >
              {t[lang].contact}
            </button>
          </nav>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setLang(lang === 'ENG' ? 'ZUL' : 'ENG')}
              className="text-[10px] md:text-editorial-label text-primary font-bold hover:bg-primary/5 px-2 py-1 rounded transition-colors"
            >
              {lang === 'ENG' ? 'ENG / ZUL' : 'ZUL / ENG'}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay - Moved outside header for better stacking context */}
      <AnimatePresence>
        {isMenuOpen && (
          <div className="fixed inset-0 z-[100] md:hidden">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="absolute inset-0 bg-primary/40 backdrop-blur-md"
            />
            
            {/* Menu Content */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="absolute top-0 left-0 bottom-0 w-[min(85vw,380px)] bg-white shadow-2xl flex flex-col"
              style={{ paddingTop: 'env(safe-area-inset-top)' }}
            >
              <div className="p-6 border-b border-outline-variant/10 flex items-center justify-between bg-white sticky top-0 z-10">
                <div className="flex items-center gap-3">
                  <img 
                    src={LOGO_URL} 
                    alt="Logo" 
                    className="h-10 w-auto"
                    referrerPolicy="no-referrer"
                  />
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-primary font-headline uppercase tracking-wider">
                      {t[lang].menu}
                    </span>
                    <span className="text-[8px] text-secondary uppercase tracking-widest font-medium">
                      {t[lang].schoolName}
                    </span>
                  </div>
                </div>
                <button 
                  onClick={() => setIsMenuOpen(false)}
                  className="w-10 h-10 flex items-center justify-center hover:bg-primary/5 rounded-full transition-colors focus:outline-none"
                >
                  <X className="w-6 h-6 text-primary" />
                </button>
              </div>

              <nav className="flex-grow overflow-y-auto p-4 flex flex-col gap-1">
                {[
                  { name: t[lang].home, id: 'home' },
                  { name: t[lang].news, id: 'news' },
                  { name: t[lang].academics, id: 'academics' },
                  { name: t[lang].admissions, id: 'admissions' },
                  { name: t[lang].gallery, id: 'gallery' },
                  { name: t[lang].uniforms, id: 'uniforms' },
                  { name: t[lang].contact, id: 'contact' }
                ].map((item, idx) => (
                  <motion.button
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    onClick={() => {
                      setCurrentPage(item.id as any);
                      setIsMenuOpen(false);
                    }}
                    className={`text-left min-h-[56px] px-5 rounded-2xl text-lg font-headline transition-all flex items-center justify-between group ${
                      currentPage === item.id 
                        ? 'bg-primary/5 text-primary font-bold shadow-sm' 
                        : 'text-secondary hover:bg-surface-container-low active:bg-surface-container-high'
                    }`}
                  >
                    <span className="tracking-tight">{item.name}</span>
                    <ChevronRight className={`w-5 h-5 transition-transform duration-300 ${currentPage === item.id ? 'translate-x-0 opacity-100' : '-translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100'}`} />
                  </motion.button>
                ))}
              </nav>

              <div className="p-8 border-t border-outline-variant/10 bg-surface-container-lowest" style={{ paddingBottom: 'calc(2rem + env(safe-area-inset-bottom))' }}>
                <div className="flex flex-col gap-5">
                  <div className="space-y-3">
                    <div className="flex items-center gap-4 text-secondary group cursor-pointer">
                      <div className="w-8 h-8 rounded-full bg-primary/5 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                        <Phone className="w-4 h-4" />
                      </div>
                      <span className="text-xs font-semibold tracking-tight">073 336 3970</span>
                    </div>
                    <div className="flex items-center gap-4 text-secondary group cursor-pointer">
                      <div className="w-8 h-8 rounded-full bg-primary/5 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                        <Mail className="w-4 h-4" />
                      </div>
                      <span className="text-xs font-semibold tracking-tight break-all">info@umzilikazi.co.za</span>
                    </div>
                  </div>
                  <div className="flex gap-4 pt-2">
                    <button className="w-10 h-10 bg-primary/5 rounded-full text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-all shadow-sm">
                      <Facebook className="w-5 h-5" />
                    </button>
                    <button className="w-10 h-10 bg-primary/5 rounded-full text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-all shadow-sm">
                      <Twitter className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <main className="flex-grow">
        {currentPage === 'home' ? (
          <>
            {/* HERO SECTION WITH SLIDER */}
        <section className="relative h-[75vh] md:h-screen min-h-[500px] flex items-end overflow-hidden">
          <div className="absolute inset-0 z-0">
            <AnimatePresence mode="wait">
              <motion.img 
                key={currentHero}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.5 }}
                alt="School Environment" 
                className="w-full h-full object-cover" 
                src={HERO_IMAGES[currentHero]}
                referrerPolicy="no-referrer"
              />
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
          </div>
          
          {/* Slider Indicators */}
          <div className="absolute bottom-8 right-8 z-20 flex gap-2">
            {HERO_IMAGES.map((_, idx) => (
              <button 
                key={idx}
                onClick={() => setCurrentHero(idx)}
                className={`w-12 h-1 transition-all duration-300 ${idx === currentHero ? 'bg-primary' : 'bg-white/30'}`}
              />
            ))}
          </div>

          <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-8 pb-12 md:pb-24">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-3xl"
            >
              <span className="text-[9px] md:text-editorial-label text-white bg-primary px-3 py-1 inline-block mb-3 md:mb-6">
                {t[lang].motto}
              </span>
              <div className="flex flex-wrap gap-2 md:gap-4 mb-3 md:mb-4">
                <span className="text-white text-[10px] md:text-sm font-bold bg-white/10 backdrop-blur px-2 py-1 border border-white/20">
                  <Counter value={10} prefix="#" /> {t[lang].nationalRank2024}
                </span>
                <span className="text-white text-[10px] md:text-sm font-bold bg-white/10 backdrop-blur px-2 py-1 border border-white/20">
                  <Counter value={100} suffix="%" /> {t[lang].tablePassRate}
                </span>
              </div>
              <h1 className="text-4xl md:text-8xl editorial-heading text-white mb-4 md:mb-6 leading-tight tracking-tight">
                {t[lang].heroTitle}
              </h1>
              <p className="text-sm md:text-xl text-white/90 leading-relaxed mb-6 md:mb-8 font-light max-w-2xl">
                {t[lang].heroDesc}
              </p>
              <div className="flex flex-wrap gap-3 md:gap-4">
                <a className="inline-block px-5 py-3 md:px-8 md:py-4 bg-white text-primary font-bold hover:bg-white/90 transition-all duration-300 tracking-widest text-[10px] md:text-sm uppercase" href="#">
                  {t[lang].discover}
                </a>
                <a className="inline-block px-5 py-3 md:px-8 md:py-4 border-2 border-white text-white font-bold hover:bg-white hover:text-primary transition-all duration-300 tracking-widest text-[10px] md:text-sm uppercase" 
                  href="#urgent-appeal"
                  onClick={(e) => { 
                    e.preventDefault(); 
                    document.getElementById('urgent-appeal')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  {t[lang].offerAssistance}
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* STATS */}
        <section className="py-12 bg-surface-container-lowest border-b border-outline-variant/30">
          <div className="max-w-7xl mx-auto px-6 md:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {t[lang].stats.map((stat: any, idx: number) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex flex-col text-center md:text-left"
                >
                  <span className="text-3xl md:text-4xl font-headline font-extrabold text-primary tracking-tight">
                    <Counter value={stat.value} prefix={stat.prefix} suffix={stat.suffix} decimals={stat.value % 1 !== 0 ? 1 : 0} />
                  </span>
                  <span className="text-[10px] md:text-editorial-label text-secondary font-medium uppercase mt-1">{stat.label}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* WELCOME FROM PRINCIPAL */}
        <section className="py-12 md:py-24 bg-surface overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 md:px-8 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="md:col-span-5 relative order-first"
            >
              <div className="aspect-[4/5] overflow-hidden rounded-sm shadow-xl">
                <img 
                  alt="Principal Mr. Zulu" 
                  className="w-full h-full object-cover" 
                  src="https://lh3.googleusercontent.com/aida/ADBb0ujj4B6RplTco8dfBgZez80ql-TggZJmeuvYwDOZOtVpUnq3VWG2eyiQCE260KoOb2rRRGurXVqJF9LlJVGrKgR3D1pUFgr3jR5ldiwQ6FDEfApNQKi2Endd0MORi60EJzxGaxruJKD_rngfRvBMTNDguOr5Bkv85Wv-Q8ziqRelcsGnOOlIdRfqV3mrWtFi0S28AvRSBHa8tOBWk-GjDUeYVUdO_Aw45QOKcB0ZeseTloMHCNbVHSIwceayTDgjoy72w6iP5VJN8Jk"
                  referrerPolicy="no-referrer"
                />
              </div>
            </motion.div>
            <div className="md:col-span-7">
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <span className="text-editorial-label text-primary mb-3 md:mb-6 block">{t[lang].leadershipVoice}</span>
                <h2 className="text-2xl md:text-5xl editorial-heading mb-4 md:mb-8 leading-tight tracking-tight">{t[lang].welcomeTitle}</h2>
                <p className="text-base md:text-2xl font-light text-on-surface leading-relaxed mb-6 md:mb-10">
                  {t[lang].welcomeDesc}
                </p>
                <div className="mt-6 md:mt-8">
                  <p className="text-lg md:text-2xl font-bold font-headline text-primary tracking-tight">Mr. Zulu</p>
                  <p className="text-editorial-label text-secondary mt-1">{t[lang].principalTitle}</p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* OUR STORY SECTION */}
        <section className="py-12 md:py-24 bg-surface-container-low">
          <div className="max-w-7xl mx-auto px-6 md:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-24 mb-12 md:mb-24">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <span className="text-editorial-label text-primary mb-3 block">{t[lang].ourHeritage}</span>
                <h2 className="text-2xl md:text-5xl editorial-heading mb-6 leading-tight tracking-tight">{t[lang].heritageTitle}</h2>
                <div className="space-y-4 md:space-y-6 text-on-surface/80 text-sm md:text-lg leading-relaxed">
                  <p>{t[lang].heritageDesc1}</p>
                  <p>{t[lang].heritageDesc2}</p>
                </div>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="flex items-center"
              >
                <blockquote className="text-base md:text-3xl font-light italic text-on-surface leading-relaxed border-l-4 md:border-l-8 border-primary pl-6 md:pl-8 py-2">
                  {t[lang].principalQuote}
                  <footer className="mt-4 md:mt-6 text-xs md:text-base font-bold text-primary not-italic">— Mr. Zulu, {t[lang].principalTitle}</footer>
                </blockquote>
              </motion.div>
            </div>
            {/* Three Pillars */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {[
                { title: t[lang].pillar1Title, desc: t[lang].pillar1Desc },
                { title: t[lang].pillar2Title, desc: t[lang].pillar2Desc },
                { title: t[lang].pillar3Title, desc: t[lang].pillar3Desc }
              ].map((pillar, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.2 }}
                  whileHover={{ y: -5 }}
                  className="bg-white p-6 md:p-8 border-t-4 border-primary shadow-sm"
                >
                  <h3 className="font-headline font-bold text-lg md:text-xl mb-3 text-primary tracking-tight">{pillar.title}</h3>
                  <p className="text-secondary text-sm md:text-base leading-relaxed">{pillar.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* OUR EDUCATORS SECTION */}
        <section className="py-12 md:py-24 bg-surface-container-highest">
          <div className="max-w-7xl mx-auto px-6 md:px-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-3xl mb-10 md:mb-16"
            >
              <span className="text-editorial-label text-primary mb-3 block">{t[lang].ourTeam}</span>
              <h2 className="text-2xl md:text-5xl editorial-heading mb-4 md:mb-6 leading-tight tracking-tight">{t[lang].educatorsTitle}</h2>
              <p className="text-sm md:text-lg text-secondary leading-relaxed">{t[lang].educatorsDesc}</p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 mb-10 md:mb-16">
              {[
                { title: t[lang].eduFeature1Title, desc: t[lang].eduFeature1Desc },
                { title: t[lang].eduFeature2Title, desc: t[lang].eduFeature2Desc },
                { title: t[lang].eduFeature3Title, desc: t[lang].eduFeature3Desc },
                { title: t[lang].eduFeature4Title, desc: t[lang].eduFeature4Desc }
              ].map((item, idx) => (
                <motion.div 
                  key={idx} 
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-surface p-5 md:p-8 rounded-sm"
                >
                  <h4 className="font-headline font-bold text-base md:text-lg mb-2">{item.title}</h4>
                  <p className="text-secondary text-xs md:text-sm leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-primary text-white p-6 md:p-12 rounded-sm relative overflow-hidden"
            >
              <div className="relative z-10">
                <h3 className="text-lg md:text-3xl font-headline font-bold mb-4 md:mb-6 tracking-tight">{t[lang].heartSuccessTitle}</h3>
                <p className="text-sm md:text-lg text-white/90 leading-relaxed mb-6 md:mb-8 max-w-4xl">
                  {t[lang].heartSuccessDesc}
                </p>
                <div className="flex flex-wrap gap-2 md:gap-3">
                  {t[lang].tags.map((tag: string, idx: number) => (
                    <span key={idx} className="px-2 py-1 bg-white/10 border border-white/20 text-[9px] md:text-xs uppercase tracking-widest font-bold">{tag}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ACADEMICS SECTION */}
        <section className="py-12 md:py-24 bg-surface">
          <div className="max-w-7xl mx-auto px-6 md:px-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-10 md:mb-16"
            >
              <span className="text-editorial-label text-primary mb-3 inline-block">{t[lang].ourResults}</span>
              <h2 className="text-2xl md:text-5xl editorial-heading mb-4 md:mb-6 leading-tight tracking-tight">{t[lang].academicDecadeTitle}</h2>
              <p className="text-sm md:text-lg text-secondary max-w-2xl mx-auto">{t[lang].academicDecadeDesc}</p>
            </motion.div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-8 mb-10 md:mb-16">
              {[
                { title: t[lang].result1Title, desc: t[lang].result1Desc },
                { title: t[lang].result2Title, desc: t[lang].result2Desc },
                { title: t[lang].result3Title, desc: t[lang].result3Desc }
              ].map((card, idx) => (
                <motion.div 
                  key={idx} 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-surface-container-low p-6 md:p-8 border-l-4 border-primary"
                >
                  <h3 className="font-headline font-bold text-lg md:text-xl mb-3 tracking-tight">{card.title}</h3>
                  <p className="text-xs md:text-sm text-secondary">{card.desc}</p>
                </motion.div>
              ))}
            </div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="overflow-x-auto -mx-6 px-6"
            >
              <table className="w-full text-left border-collapse min-w-[500px]">
                <thead>
                  <tr className="bg-surface-container-high">
                    <th className="p-3 text-[10px] md:text-editorial-label text-primary">{t[lang].tableYear}</th>
                    <th className="p-3 text-[10px] md:text-editorial-label text-primary">{t[lang].tableCandidates}</th>
                    <th className="p-3 text-[10px] md:text-editorial-label text-primary">{t[lang].tablePassed}</th>
                    <th className="p-3 text-[10px] md:text-editorial-label text-primary">{t[lang].tablePassRate}</th>
                    <th className="p-3 text-[10px] md:text-editorial-label text-primary">{t[lang].tableStanding}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/10 text-[10px] md:text-sm">
                  {[
                    { year: '2025', cand: '321', passed: '320', perc: '99.69%', standing: '#3' },
                    { year: '2024', cand: '177', passed: '177', perc: '100.00%', standing: '#1', highlight: true },
                    { year: '2023', cand: '284', passed: '270', perc: '95.07%', standing: t[lang].topTier },
                    { year: '2022', cand: '229', passed: '214', perc: '93.45%', standing: t[lang].topTier },
                    { year: '2021', cand: '168', passed: '160', perc: '95.24%', standing: t[lang].topTier },
                    { year: '2020', cand: '80', passed: '79', perc: '98.75%', standing: t[lang].topTier },
                    { year: '2019', cand: '64', passed: '64', perc: '100.00%', standing: t[lang].topTier },
                    { year: '2018', cand: '59', passed: '58', perc: '98.31%', standing: t[lang].topTier },
                    { year: '2017', cand: '25', passed: '25', perc: '100.00%', standing: t[lang].topTier },
                    { year: '2016', cand: '39', passed: '38', perc: '97.44%', standing: t[lang].topTier }
                  ].map((row, idx) => (
                    <tr key={idx} className={`${row.highlight ? 'bg-primary/5 font-bold' : 'hover:bg-primary/5 transition-colors'}`}>
                      <td className="p-3">{row.year}</td>
                      <td className="p-3">{row.cand}</td>
                      <td className="p-3">{row.passed}</td>
                      <td className="p-3 font-bold text-primary">{row.perc}</td>
                      <td className="p-3">{row.standing}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </motion.div>
          </div>
        </section>

        <StormAppeal lang={lang} t={t} onContactClick={() => setCurrentPage('contact')} />

        {/* SCHOOL LIFE SECTION */}
        <section className="py-12 md:py-24 bg-surface-container-low">
          <div className="max-w-7xl mx-auto px-6 md:px-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-10"
            >
              <span className="text-editorial-label text-primary mb-3 block">{t[lang].schoolLife}</span>
              <h2 className="text-2xl md:text-5xl editorial-heading mb-4 md:mb-6 leading-tight tracking-tight">{t[lang].momentsMatter}</h2>
              <p className="text-sm md:text-lg text-secondary">{t[lang].momentsDesc}</p>
            </motion.div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 mb-10">
              {GALLERY_IMAGES.map((item, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  className="aspect-square bg-surface-dim relative group overflow-hidden cursor-pointer"
                >
                  <img 
                    src={item.url} 
                    alt={item.label} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute bottom-3 left-3 text-white text-[8px] md:text-xs font-bold uppercase z-10">{item.label}</div>
                </motion.div>
              ))}
            </div>
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <button 
                onClick={() => setCurrentPage('gallery')}
                className="inline-block border-2 border-primary text-primary px-8 py-3 font-bold uppercase text-[10px] md:text-sm hover:bg-primary hover:text-white transition-all"
              >
                {t[lang].viewFullGallery}
              </button>
            </motion.div>
          </div>
        </section>

        {/* COMMUNITY PARTNERS SECTION */}
        <section className="py-12 md:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6 md:px-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-10 md:mb-16"
            >
              <span className="text-editorial-label text-primary mb-3 inline-block">{t[lang].ourAlliances}</span>
              <h2 className="text-2xl md:text-5xl editorial-heading mb-4 md:mb-6 leading-tight tracking-tight">{t[lang].communityStands}</h2>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {[
                { icon: <Radio className="text-primary" />, title: t[lang].partner1Title, desc: t[lang].partner1Desc },
                { icon: <GraduationCap className="text-primary" />, title: t[lang].partner2Title, desc: t[lang].partner2Desc },
                { icon: <Landmark className="text-primary" />, title: t[lang].partner3Title, desc: t[lang].partner3Desc }
              ].map((partner, idx) => (
                <motion.div 
                  key={idx} 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="p-6 md:p-8 border border-outline-variant/20 rounded-sm hover:shadow-md transition-shadow"
                >
                  <div className="w-10 h-10 bg-primary/10 flex items-center justify-center mb-5">
                    {partner.icon}
                  </div>
                  <h4 className="font-headline font-bold text-lg md:text-xl mb-3 tracking-tight">{partner.title}</h4>
                  <p className="text-secondary text-xs md:text-sm leading-relaxed">{partner.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <NewsSection onReadMore={() => setCurrentPage('news')} />

        {/* JOIN US / ADMISSIONS SECTION */}
        <section className="py-12 md:py-24 bg-primary text-white overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 md:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <span className="text-editorial-label text-white/70 mb-3 block">{t[lang].enrollment}</span>
                <h2 className="text-2xl md:text-5xl editorial-heading mb-6 leading-tight tracking-tight">{t[lang].becomePart}</h2>
                <p className="text-sm md:text-xl font-light leading-relaxed mb-8 text-white/90">
                  {t[lang].enrollmentDesc}
                </p>
                <div className="grid grid-cols-2 gap-4 md:gap-6">
                  {[
                    { label: t[lang].schoolType, value: t[lang].schoolTypeValue },
                    { label: t[lang].grades, value: t[lang].gradesValue },
                    { label: t[lang].enrolmentLabel, value: <><Counter value={1657} suffix="+" /> {t[lang].learners}</> },
                    { label: t[lang].educators, value: <Counter value={23} /> }
                  ].map((info, idx) => (
                    <div key={idx}>
                      <span className="text-[9px] uppercase tracking-widest text-white/60 block mb-1">{info.label}</span>
                      <div className="font-bold text-xs md:text-base">{info.value}</div>
                    </div>
                  ))}
                </div>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="bg-white/10 backdrop-blur-md p-6 md:p-12 border border-white/10"
              >
                <h3 className="text-lg md:text-2xl font-headline font-bold mb-6 md:mb-8 tracking-tight">{t[lang].contactInfo}</h3>
                <div className="space-y-6 md:space-y-8">
                  <div>
                    <span className="text-[9px] uppercase tracking-widest text-white/60 block mb-1">{t[lang].phoneEnquiries}</span>
                    <p className="text-xl md:text-3xl font-light">073 336 3970 / 084 485 5879</p>
                  </div>
                  <div>
                    <span className="text-[9px] uppercase tracking-widest text-white/60 block mb-1">{t[lang].address}</span>
                    <p className="text-base md:text-xl font-light">326 D-Off Utrecht Road, Utrecht, KZN</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section className="py-12 md:py-24 bg-surface">
          <div className="max-w-7xl mx-auto px-6 md:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-2xl md:text-4xl editorial-heading mb-8 md:mb-10 tracking-tight">{t[lang].contactTitle}</h2>
                <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                   {[
                    { label: t[lang].contactName, placeholder: 'Your Name', type: 'text' },
                    { label: t[lang].contactEmail, placeholder: 'email@example.com', type: 'email' },
                    { label: t[lang].phone, placeholder: '071 234 5678', type: 'tel' }
                  ].map((field, idx) => (
                    <div key={idx} className="relative pt-4">
                      <label className="text-[9px] uppercase tracking-widest text-secondary absolute top-0 left-0">{field.label}</label>
                      <input 
                        className="w-full bg-transparent border-b-2 border-outline-variant py-2 focus:outline-none focus:border-primary transition-colors text-on-surface text-sm" 
                        placeholder={field.placeholder} 
                        type={field.type}
                      />
                    </div>
                  ))}
                  <div className="relative pt-4">
                    <label className="text-[9px] uppercase tracking-widest text-secondary absolute top-0 left-0">{t[lang].contactMessage}</label>
                    <textarea 
                      className="w-full bg-transparent border-b-2 border-outline-variant py-2 focus:outline-none focus:border-primary transition-colors text-on-surface text-sm" 
                      placeholder="How can we assist you?" 
                      rows={3}
                    ></textarea>
                  </div>
                  <button className="bg-primary text-white px-10 py-3 font-bold tracking-widest text-[10px] uppercase hover:shadow-lg transition-all w-full md:w-auto" type="submit">
                    {t[lang].contactSubmit}
                  </button>
                </form>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <div className="space-y-5">
                  {[
                    { icon: <MapPin className="text-primary w-5 h-5" />, label: t[lang].location, value: '326 D-Off Utrecht Road, Utrecht, KwaZulu-Natal' },
                    { icon: <Mail className="text-primary w-5 h-5" />, label: t[lang].postalAddress, value: 'P.O. Box 77, Utrecht, 2980' },
                    { icon: <Phone className="text-primary w-5 h-5" />, label: t[lang].phone, value: '073 336 3970 / 084 485 5879' },
                    { icon: <User className="text-primary w-5 h-5" />, label: t[lang].principal, value: 'Mr. Zulu' }
                  ].map((item, idx) => (
                    <div key={idx} className="flex gap-4">
                      {item.icon}
                      <div>
                        <h4 className="font-bold text-[10px] uppercase tracking-widest text-secondary mb-1">{item.label}</h4>
                        <p className="text-on-surface text-xs md:text-sm">{item.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>
          </>
        ) : currentPage === 'admissions' ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-surface min-h-screen"
          >
            {/* Admissions Hero */}
            <section className="bg-primary text-white py-20">
              <div className="max-w-7xl mx-auto px-6 md:px-8 text-center">
                <h1 className="text-4xl md:text-6xl editorial-heading mb-6">{t[lang].admissionTitle}</h1>
                <p className="text-xl md:text-2xl font-light opacity-90">{t[lang].admissionSubtitle}</p>
              </div>
            </section>

            {/* Admissions Content */}
            <section className="py-16 md:py-24">
              <div className="max-w-4xl mx-auto px-6 md:px-8">
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bg-white p-8 md:p-12 shadow-xl border-t-8 border-primary rounded-sm mb-12"
                >
                  <div className="flex items-start gap-4 mb-8">
                    <div className="bg-primary/10 p-3 rounded-full">
                      <GraduationCap className="text-primary w-8 h-8" />
                    </div>
                    <div>
                      <h2 className="text-2xl md:text-3xl editorial-heading text-primary mb-4">{t[lang].newsAnnouncements}</h2>
                      <p className="text-lg text-secondary leading-relaxed font-medium">
                        {t[lang].admissionNotice}
                      </p>
                    </div>
                  </div>

                  <hr className="border-outline-variant/20 mb-8" />

                  <h3 className="text-xl md:text-2xl editorial-heading mb-6">{t[lang].requirementsTitle}</h3>
                  <ul className="space-y-4">
                    {t[lang].requirements.map((req, idx) => (
                      <li key={idx} className="flex items-center gap-3 text-secondary">
                        <ChevronRight className="text-primary w-5 h-5 flex-shrink-0" />
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="bg-surface-container-low p-8 rounded-sm"
                  >
                    <h4 className="font-headline font-bold text-lg mb-4">{t[lang].grade8Enroll}</h4>
                    <p className="text-secondary text-sm leading-relaxed">
                      {t[lang].grade8Desc}
                    </p>
                  </motion.div>
                  <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="bg-surface-container-low p-8 rounded-sm"
                  >
                    <h4 className="font-headline font-bold text-lg mb-4">{t[lang].transferStudents}</h4>
                    <p className="text-secondary text-sm leading-relaxed">
                      {t[lang].transferDesc}
                    </p>
                  </motion.div>
                </div>
              </div>
            </section>
          </motion.div>
        ) : currentPage === 'academics' ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-surface min-h-screen"
          >
            {/* Academics Hero */}
            <section className="bg-primary text-white py-20">
              <div className="max-w-7xl mx-auto px-6 md:px-8 text-center">
                <h1 className="text-4xl md:text-6xl editorial-heading mb-6">{t[lang].academicsTitle}</h1>
                <p className="text-xl md:text-2xl font-light opacity-90">{t[lang].academicsSubtitle}</p>
              </div>
            </section>

            {/* Academics Content */}
            <section className="py-16 md:py-24">
              <div className="max-w-7xl mx-auto px-6 md:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                  {[
                    { val: '#10', label: t[lang].nationalRank2024 },
                    { val: '100%', label: t[lang].passRateMultipleYears },
                    { val: 'Top 0.2%', label: t[lang].nationallyRankedSchools }
                  ].map((item, idx) => (
                    <motion.div 
                      key={idx}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1 }}
                      className="bg-white p-8 shadow-md border-b-4 border-primary"
                    >
                      <h3 className="text-3xl font-headline font-extrabold text-primary mb-2">{item.val}</h3>
                      <p className="text-editorial-label text-secondary uppercase">{item.label}</p>
                    </motion.div>
                  ))}
                </div>

                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bg-white p-6 md:p-12 shadow-xl rounded-sm overflow-hidden"
                >
                  <h2 className="text-2xl md:text-4xl editorial-heading mb-8">{t[lang].matricHistory}</h2>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[600px]">
                      <thead>
                        <tr className="bg-surface-container-high">
                          <th className="p-4 text-editorial-label text-primary">{t[lang].tableYear}</th>
                          <th className="p-4 text-editorial-label text-primary">{t[lang].tableCandidates}</th>
                          <th className="p-4 text-editorial-label text-primary">{t[lang].tablePassed}</th>
                          <th className="p-4 text-editorial-label text-primary">{t[lang].tablePassRate}</th>
                          <th className="p-4 text-editorial-label text-primary">{t[lang].tableNationalRank}</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-outline-variant/10">
                        {[
                          { year: '2025', cand: '321', passed: '320', perc: '99.69%', rank: '#3' },
                          { year: '2024', cand: '177', passed: '177', perc: '100.00%', rank: '#1', highlight: true },
                          { year: '2023', cand: '284', passed: '270', perc: '95.07%', rank: t[lang].topTier },
                          { year: '2022', cand: '229', passed: '214', perc: '93.45%', rank: t[lang].topTier },
                          { year: '2021', cand: '168', passed: '160', perc: '95.24%', rank: t[lang].topTier },
                          { year: '2020', cand: '80', passed: '79', perc: '98.75%', rank: t[lang].topTier },
                          { year: '2019', cand: '64', passed: '64', perc: '100.00%', rank: t[lang].topTier },
                          { year: '2018', cand: '59', passed: '58', perc: '98.31%', rank: t[lang].topTier },
                          { year: '2017', cand: '25', passed: '25', perc: '100.00%', rank: t[lang].topTier },
                          { year: '2016', cand: '39', passed: '38', perc: '97.44%', rank: t[lang].topTier }
                        ].map((row, idx) => (
                          <tr key={idx} className={`${row.highlight ? 'bg-primary/5 font-bold' : 'hover:bg-primary/5 transition-colors'}`}>
                            <td className="p-4">{row.year}</td>
                            <td className="p-4">{row.cand}</td>
                            <td className="p-4">{row.passed}</td>
                            <td className="p-4 text-primary font-bold">{row.perc}</td>
                            <td className="p-4">{row.rank}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </motion.div>

                {/* Detailed Curriculum Section */}
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="mt-16 md:mt-24"
                >
                  <div className="text-center mb-12">
                    <span className="text-editorial-label text-primary mb-3 inline-block">{t[lang].gradesValue}</span>
                    <h2 className="text-2xl md:text-4xl editorial-heading mb-6">{t[lang].curriculumTitle}</h2>
                    <p className="text-sm md:text-lg text-secondary max-w-3xl mx-auto">{t[lang].curriculumDesc}</p>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
                    {/* GET Phase */}
                    <div className="bg-white p-8 md:p-10 shadow-lg border-t-4 border-primary/40">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="bg-primary/5 p-3 rounded-full">
                          <BookOpen className="text-primary w-6 h-6" />
                        </div>
                        <h3 className="text-xl md:text-2xl font-headline font-bold tracking-tight">{t[lang].getPhaseTitle}</h3>
                      </div>
                      <p className="text-secondary text-sm md:text-base mb-8 leading-relaxed">{t[lang].getPhaseDesc}</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6">
                        {t[lang].getSubjects.map((subject: string, idx: number) => (
                          <div key={idx} className="flex items-center gap-3 text-secondary text-sm">
                            <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                            <span>{subject}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* FET Phase */}
                    <div className="bg-white p-8 md:p-10 shadow-lg border-t-4 border-primary">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="bg-primary/5 p-3 rounded-full">
                          <GraduationCap className="text-primary w-6 h-6" />
                        </div>
                        <h3 className="text-xl md:text-2xl font-headline font-bold tracking-tight">{t[lang].fetPhaseTitle}</h3>
                      </div>
                      <p className="text-secondary text-sm md:text-base mb-8 leading-relaxed">{t[lang].fetPhaseDesc}</p>
                      
                      <div className="space-y-8">
                        <div>
                          <h4 className="text-editorial-label text-primary mb-4 uppercase tracking-widest font-bold text-[10px]">{t[lang].fetCompulsoryTitle}</h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6">
                            {t[lang].fetCompulsorySubjects.map((subject: string, idx: number) => (
                              <div key={idx} className="flex items-center gap-3 text-secondary text-sm">
                                <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                                <span>{subject}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h4 className="text-editorial-label text-primary mb-4 uppercase tracking-widest font-bold text-[10px]">{t[lang].fetElectiveTitle}</h4>
                          <div className="space-y-6">
                            {t[lang].fetStreams.map((stream: any, idx: number) => (
                              <div key={idx} className="bg-surface-container-lowest p-4 border-l-2 border-primary/20">
                                <h5 className="font-bold text-sm mb-3 text-on-surface">{stream.name}</h5>
                                <div className="flex flex-wrap gap-2">
                                  {stream.subjects.map((subject: string, sIdx: number) => (
                                    <span key={sIdx} className="px-2 py-1 bg-primary/5 text-primary text-[10px] font-medium rounded-sm">
                                      {subject}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </section>
          </motion.div>
        ) : currentPage === 'gallery' ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-surface min-h-screen"
          >
            {/* Gallery Hero */}
            <section className="bg-primary text-white py-20">
              <div className="max-w-7xl mx-auto px-6 md:px-8 text-center">
                <h1 className="text-4xl md:text-6xl editorial-heading mb-6">{t[lang].galleryTitle}</h1>
                <p className="text-xl md:text-2xl font-light opacity-90">{t[lang].gallerySubtitle}</p>
              </div>
            </section>

            {/* Gallery Content */}
            <section className="py-16 md:py-24">
              <div className="max-w-7xl mx-auto px-6 md:px-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                  {GALLERY_IMAGES.map((item, idx) => (
                    <motion.div 
                      key={idx}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1 }}
                      whileHover={{ y: -10 }}
                      className="bg-white shadow-lg overflow-hidden group cursor-pointer"
                    >
                      <div className="aspect-square relative overflow-hidden">
                        <img 
                          src={item.url} 
                          alt={item.label} 
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors"></div>
                      </div>
                      <div className="p-6">
                        <span className="text-editorial-label text-primary mb-1 block uppercase tracking-widest">{t[lang].schoolLife}</span>
                        <h3 className="text-xl font-headline font-bold text-on-surface">{item.label}</h3>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>
          </motion.div>
        ) : currentPage === 'uniforms' ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-surface min-h-screen"
          >
            {/* Uniform Hero */}
            <section className="bg-primary text-white py-20">
              <div className="max-w-7xl mx-auto px-6 md:px-8 text-center">
                <h1 className="text-4xl md:text-6xl editorial-heading mb-6">{t[lang].uniformTitle}</h1>
                <p className="text-xl md:text-2xl font-light opacity-90">{t[lang].uniformSubtitle}</p>
              </div>
            </section>

            {/* Uniform Content */}
            <section className="py-16 md:py-24">
              <div className="max-w-7xl mx-auto px-6 md:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                  {[
                    { 
                      title: t[lang].boysUniform, 
                      desc: t[lang].boysDesc, 
                      img: 'https://i.ibb.co/hRGcfThW/95079.jpg' 
                    },
                    { 
                      title: t[lang].girlsUniform, 
                      desc: t[lang].girlsDesc, 
                      img: 'https://i.ibb.co/tpn0w3JZ/95077.jpg' 
                    },
                    { 
                      title: t[lang].sportsUniform, 
                      desc: t[lang].sportsDesc, 
                      img: 'https://i.ibb.co/HTW5mW5H/95078.jpg' 
                    }
                  ].map((item, idx) => (
                    <motion.div 
                      key={idx}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1 }}
                      className="flex flex-col"
                    >
                      <div className="aspect-[3/4] overflow-hidden rounded-sm shadow-lg mb-6">
                        <img 
                          src={item.img} 
                          alt={item.title} 
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <h3 className="text-2xl font-headline font-bold text-primary mb-4">{item.title}</h3>
                      <p className="text-secondary leading-relaxed">{item.desc}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>
          </motion.div>
        ) : currentPage === 'news' ? (
          <NewsPage lang={lang} t={t} onBack={() => setCurrentPage('home')} />
        ) : (
          <ContactPage lang={lang} t={t} />
        )}
      </main>

      <footer className="bg-primary text-white">
        <div className="max-w-7xl mx-auto px-6 py-10 md:px-8 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div>
              <h4 className="text-base font-bold mb-4 font-headline uppercase tracking-widest">{t[lang].schoolName}</h4>
              <div className="text-white/80 text-[10px] md:text-xs space-y-2 mb-6 font-body">
                <p>EMIS: 500401413</p>
                <p>326 D-Off Utrecht Road, Utrecht, KZN</p>
                <p>073 336 3970 / 084 485 5879</p>
                <p>{t[lang].principal}: Mr. Zulu</p>
              </div>
              <div className="p-4 bg-white/10 rounded-sm">
                <p className="text-[9px] font-bold uppercase tracking-widest text-white/70 mb-2">{t[lang].specialRecognition}</p>
                <p className="text-[10px] md:text-xs italic">{t[lang].gagasiRecognition}</p>
              </div>
            </div>
            <div>
              <h4 className="text-editorial-label text-white/50 mb-5 md:mb-6">{t[lang].quickLinks}</h4>
              <nav className="grid grid-cols-2 gap-x-4 gap-y-3 text-[10px] md:text-xs">
                {[
                  { name: t[lang].home, page: 'home' },
                  { name: t[lang].news, page: 'news' },
                  { name: t[lang].academics, page: 'academics' },
                  { name: t[lang].admissions, page: 'admissions' },
                  { name: t[lang].gallery, page: 'gallery' },
                  { name: t[lang].uniforms, page: 'uniforms' },
                  { name: t[lang].contact, page: 'contact' }
                ].map((link, idx) => (
                  <button 
                    key={idx} 
                    onClick={() => setCurrentPage(link.page as any)}
                    className="hover:text-white/70 transition-colors flex items-center gap-1 text-left"
                  >
                    <ChevronRight className="w-3 h-3" /> {link.name}
                  </button>
                ))}
              </nav>
            </div>
            <div>
              <h4 className="text-editorial-label text-white/50 mb-5 md:mb-6">{t[lang].districtAffiliation}</h4>
              <p className="text-[10px] md:text-xs leading-relaxed text-white/80 mb-6 font-body">
                {t[lang].districtDesc}
              </p>
              <div className="flex gap-3">
                <a className="w-8 h-8 md:w-10 md:h-10 border border-white/20 flex items-center justify-center hover:bg-white hover:text-primary transition-all" href="#">
                  <Share2 className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
          <div className="mt-12 md:mt-16 pt-6 md:pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-[8px] md:text-[10px] text-white/50 uppercase tracking-widest font-bold">
            <p>© {new Date().getFullYear()} {t[lang].schoolName}. {t[lang].allRightsReserved}</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors">{t[lang].privacyPolicy}</a>
              <a href="#" className="hover:text-white transition-colors">{t[lang].termsOfUse}</a>
            </div>
          </div>
        </div>
      </footer>
      <CookieConsent lang={lang} t={t} />
    </div>
  );
}
