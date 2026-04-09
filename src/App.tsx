import { 
  Menu, 
  Radio, 
  GraduationCap, 
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

const GALLERY_IMAGES = [
  { url: 'https://i.ibb.co/JjQQNNnN/93011.jpg', label: 'Academic Excellence' },
  { url: 'https://i.ibb.co/xKDbSqW8/93012-1.jpg', label: 'Academic Excellence' },
  { url: 'https://i.ibb.co/WpW4CGMC/93013.jpg', label: 'Gagasi FM Geleza Nathi' },
  { url: 'https://i.ibb.co/YBZp9SWt/93014.jpg', label: 'Gagasi FM Geleza Nathi' },
  { url: 'https://i.ibb.co/b5Rj96j4/93015.jpg', label: 'Gagasi FM Geleza Nathi' },
  { url: 'https://i.ibb.co/JjQQNNnN/93011.jpg', label: 'Academic Excellence' }
];

const LOGO_URL = 'https://i.ibb.co/bMdVhRn5/Chat-GPT-Image-Apr-6-2026-10-27-34-PM.png';

function CookieConsent() {
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
              <h4 className="font-headline font-bold text-lg mb-2 tracking-tight">Cookie Policy</h4>
              <p className="text-xs md:text-sm opacity-80 leading-relaxed max-w-2xl">
                We use cookies to enhance your experience, analyze site traffic, and serve better content. By clicking "Accept All", you consent to our use of cookies.
              </p>
            </div>
            <div className="flex items-center gap-4 w-full md:w-auto">
              <button 
                onClick={() => setIsVisible(false)}
                className="flex-1 md:flex-none px-6 py-3 text-[10px] uppercase font-bold tracking-widest hover:bg-white/10 transition-colors"
              >
                Decline
              </button>
              <button 
                onClick={acceptCookies}
                className="flex-1 md:flex-none px-8 py-3 bg-primary text-white text-[10px] uppercase font-bold tracking-widest hover:shadow-lg transition-all"
              >
                Accept All
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function StormAppeal({ onContactClick }: { onContactClick: () => void }) {
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
            <span className="text-editorial-label text-white/70 mb-4 block">Urgent Appeal</span>
            <h2 className="text-3xl md:text-5xl editorial-heading mb-6 leading-tight tracking-tight">
              Rebuilding After the Storm: A Call for Support
            </h2>
            <div className="space-y-6 text-white/90 text-sm md:text-lg leading-relaxed">
              <p>
                On the 26th and 27th of December, our school was struck by devastating thunderstorms that leveled six classrooms and severely damaged ten others. This catastrophe has left over 1,600 learners with only six safe classrooms to share.
              </p>
              <p>
                Currently, over 600 of our matric and Grade 11 learners are forced to commute to a neighboring primary school, where they face extreme overcrowding with 60 to 70 students packed into single classrooms.
              </p>
              <p className="font-bold text-white">
                Despite achieving a 100% pass rate and proving our commitment to excellence, we are now fighting for our survival. We are making an urgent call to businesses and the private sector for assistance in rebuilding our facilities.
              </p>
              <div className="pt-4">
                <button 
                  onClick={onContactClick}
                  className="inline-block px-8 py-4 bg-white text-tertiary font-bold uppercase tracking-widest text-sm hover:bg-white/90 transition-all"
                >
                  Offer Assistance
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

  const visibleContent = isExpanded ? NEWS_ARTICLE.content : NEWS_ARTICLE.content.slice(0, 3);

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
            <ChevronRight className="w-4 h-4 rotate-180" /> Back to Home
          </button>
          <div className="flex items-center gap-4 text-[10px] md:text-xs text-white/70 mb-6 uppercase tracking-widest font-bold">
            <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {NEWS_ARTICLE.date}</span>
            <span className="flex items-center gap-1"><User className="w-3 h-3" /> {NEWS_ARTICLE.author}</span>
          </div>
          <h1 className="text-3xl md:text-6xl editorial-heading leading-tight mb-8">
            {NEWS_ARTICLE.title}
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
              alt={NEWS_ARTICLE.title} 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          
          <div className="p-8 md:p-16">
            <div className={`space-y-8 text-on-surface/80 text-base md:text-xl leading-relaxed font-body relative ${!isExpanded ? 'max-h-[500px] overflow-hidden' : ''}`}>
              {visibleContent.map((para, i) => (
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
                  Read Full Article <ChevronRight className="w-4 h-4 rotate-90" />
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
      schoolLife: 'School Life'
    },
    ZUL: {
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
      schoolLife: 'Impilo Yasesikoleni'
    }
  };

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
                  Excellence in Education
                </span>
              </div>
            </div>
          </div>
          <nav className="hidden md:flex gap-8 items-center">
            <button 
              onClick={() => setCurrentPage('home')}
              className={`${currentPage === 'home' ? 'text-primary border-b-2 border-primary' : 'text-secondary hover:text-primary'} pb-1 text-editorial-label transition-colors duration-300`}
            >
              Home
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
                      Menu
                    </span>
                    <span className="text-[8px] text-secondary uppercase tracking-widest font-medium">
                      Umzilikazi School
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
                  { name: 'Home', id: 'home' },
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
                  <Counter value={10} prefix="#" /> {lang === 'ENG' ? 'National Rank 2024' : 'Ezweni 2024'}
                </span>
                <span className="text-white text-[10px] md:text-sm font-bold bg-white/10 backdrop-blur px-2 py-1 border border-white/20">
                  <Counter value={100} suffix="%" /> {lang === 'ENG' ? 'Pass Rate' : 'Okuphasa'}
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
              {[
                { label: 'Enrolled Learners', value: 1657, suffix: '+' },
                { label: '10-Year Average Pass Rate', value: 97.8, suffix: '%' },
                { label: 'National Rank in 2024', value: 10, prefix: '#' },
                { label: 'Dedicated Educators', value: 23 }
              ].map((stat, idx) => (
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
                <span className="text-editorial-label text-primary mb-3 md:mb-6 block">Leadership Voice</span>
                <h2 className="text-2xl md:text-5xl editorial-heading mb-4 md:mb-8 leading-tight tracking-tight">Welcome to Umzilikazi</h2>
                <p className="text-base md:text-2xl font-light text-on-surface leading-relaxed mb-6 md:mb-10">
                  Where excellence is not just a goal, but a way of life. We believe every child deserves the opportunity to succeed, regardless of their circumstances.
                </p>
                <div className="mt-6 md:mt-8">
                  <p className="text-lg md:text-2xl font-bold font-headline text-primary tracking-tight">Mr. Zulu</p>
                  <p className="text-editorial-label text-secondary mt-1">School Principal</p>
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
                <span className="text-editorial-label text-primary mb-3 block">Our Heritage</span>
                <h2 className="text-2xl md:text-5xl editorial-heading mb-6 leading-tight tracking-tight">Named for a King. Built by a Community.</h2>
                <div className="space-y-4 md:space-y-6 text-on-surface/80 text-sm md:text-lg leading-relaxed">
                  <p>Named in honour of King Mzilikazi — the great Zulu commander who founded the Matabele nation — our school stands as a pillar of hope in the Emadlangeni Local Municipality. As a dedicated rural high school serving Wards 3 and 5 of Emadlangeni, we face immense challenges.</p>
                  <p>Yet, under the unwavering leadership of Principal Mr. Zulu and our dedicated School Governing Body, our learners continue to defy every expectation, proving that talent lives everywhere.</p>
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
                  “Our teachers are the backbone of our success. Their dedication, sacrifice, and belief in every learner have transformed our school into a beacon of excellence.”
                  <footer className="mt-4 md:mt-6 text-xs md:text-base font-bold text-primary not-italic">— Mr. Zulu, School Principal</footer>
                </blockquote>
              </motion.div>
            </div>
            {/* Three Pillars */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {[
                { title: '1. Community First', desc: 'We serve our community with pride, ensuring every learner has access to quality education.' },
                { title: '2. Excellence Always', desc: 'Our 100% matric pass rate in 2024 proves dedication and hard work achieve results.' },
                { title: '3. Resilient Spirit', desc: 'Named after King Mzilikazi, we embody resilience and determination in everything we do.' }
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
              <span className="text-editorial-label text-primary mb-3 block">Our Team</span>
              <h2 className="text-2xl md:text-5xl editorial-heading mb-4 md:mb-6 leading-tight tracking-tight">Exceptional Teaching Staff</h2>
              <p className="text-sm md:text-lg text-secondary leading-relaxed">Behind every successful student is a dedicated educator. Our 23 teachers bring passion, expertise, and unwavering commitment to every classroom.</p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 mb-10 md:mb-16">
              {[
                { title: 'Dedicated', desc: 'Our teachers go above and beyond, often staying after hours to help struggling students succeed.' },
                { title: 'Expert Knowledge', desc: 'Qualified educators with deep subject expertise who make complex topics accessible.' },
                { title: 'Student-Focused', desc: 'Every educator is committed to understanding each student\'s unique learning needs.' },
                { title: 'Results-Driven', desc: 'Their dedication is reflected in our consistent academic excellence and 100% pass rate.' }
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
                <h3 className="text-lg md:text-3xl font-headline font-bold mb-4 md:mb-6 tracking-tight">The Heart of Our Success.</h3>
                <p className="text-sm md:text-lg text-white/90 leading-relaxed mb-6 md:mb-8 max-w-4xl">
                  Our teachers are more than educators — they are mentors, role models, and champions of every learner's potential. With limited resources but unlimited dedication, they transform challenges into opportunities for growth.
                </p>
                <div className="flex flex-wrap gap-2 md:gap-3">
                  {['Innovative Teaching', 'Genuine Care', 'Proven Results'].map((tag, idx) => (
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
              <span className="text-editorial-label text-primary mb-3 inline-block">Our Results</span>
              <h2 className="text-2xl md:text-5xl editorial-heading mb-4 md:mb-6 leading-tight tracking-tight">A Decade of Academic Excellence</h2>
              <p className="text-sm md:text-lg text-secondary max-w-2xl mx-auto">Our matric results speak for themselves. Consistently ranked in the top 0.2% of all South African schools.</p>
            </motion.div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-8 mb-10 md:mb-16">
              {[
                { title: '100% Pass Rate', desc: 'Achieved in 2024, 2019, and 2017. Ranked #10 nationally in 2024 out of 6,949 South African schools.' },
                { title: 'Top 0.2% Nationally', desc: 'Consistently ranked in the top 0.2% of all schools nationally, and top 0.6% of all Quintile 2 schools in KwaZulu-Natal.' },
                { title: 'Amajuba District Leader', desc: 'Ranked #1 in the Amajuba District in 2024 and #3 in 2025, out of 72 district schools.' }
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
                    <th className="p-3 text-[10px] md:text-editorial-label text-primary">Year</th>
                    <th className="p-3 text-[10px] md:text-editorial-label text-primary">Candidates</th>
                    <th className="p-3 text-[10px] md:text-editorial-label text-primary">Passed</th>
                    <th className="p-3 text-[10px] md:text-editorial-label text-primary">Pass %</th>
                    <th className="p-3 text-[10px] md:text-editorial-label text-primary">Standing</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/10 text-[10px] md:text-sm">
                  {[
                    { year: '2025', cand: '321', passed: '320', perc: '99.69%', standing: '#3' },
                    { year: '2024', cand: '177', passed: '177', perc: '100.00%', standing: '#1', highlight: true },
                    { year: '2023', cand: '284', passed: '270', perc: '95.07%', standing: 'Top Tier' },
                    { year: '2022', cand: '229', passed: '214', perc: '93.45%', standing: 'Top Tier' },
                    { year: '2021', cand: '168', passed: '160', perc: '95.24%', standing: 'Top Tier' },
                    { year: '2020', cand: '80', passed: '79', perc: '98.75%', standing: 'Top Tier' },
                    { year: '2019', cand: '64', passed: '64', perc: '100.00%', standing: 'Top Tier' },
                    { year: '2018', cand: '59', passed: '58', perc: '98.31%', standing: 'Top Tier' },
                    { year: '2017', cand: '25', passed: '25', perc: '100.00%', standing: 'Top Tier' },
                    { year: '2016', cand: '39', passed: '38', perc: '97.44%', standing: 'Top Tier' }
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

        <StormAppeal onContactClick={() => setCurrentPage('contact')} />

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
              <h2 className="text-2xl md:text-5xl editorial-heading mb-4 md:mb-6 leading-tight tracking-tight">Moments That Matter</h2>
              <p className="text-sm md:text-lg text-secondary">Explore the vibrant life at Umzilikazi Senior Secondary School through our gallery of achievements, events, and community moments.</p>
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
                View Full Gallery
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
              <span className="text-editorial-label text-primary mb-3 inline-block">Our Alliances</span>
              <h2 className="text-2xl md:text-5xl editorial-heading mb-4 md:mb-6 leading-tight tracking-tight">Our Community Stands With Us</h2>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {[
                { icon: <Radio className="text-primary" />, title: 'Gagasi FM (99.5 FM)', desc: 'Gagasi FM adopted Umzilikazi Senior Secondary School as part of their Geleza Ne Gagasi 2025 CSI campaign, providing essential resources for the 2025 academic year.' },
                { icon: <GraduationCap className="text-primary" />, title: 'Durban University of Technology (DUT)', desc: 'DUT\'s UNI4ALL Community Engagement Programme sends students to assist our Grade 12 learners with tertiary applications, breaking down barriers to higher education.' },
                { icon: <Landmark className="text-primary" />, title: 'eMadlangeni Local Municipality', desc: 'The eMadlangeni Municipality has honoured our school\'s academic excellence at Mayoral Excellence Awards ceremonies, recognising our consistent 100% pass rates.' }
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
                <span className="text-editorial-label text-white/70 mb-3 block">Enrollment</span>
                <h2 className="text-2xl md:text-5xl editorial-heading mb-6 leading-tight tracking-tight">Become Part of the Umzilikazi Family</h2>
                <p className="text-sm md:text-xl font-light leading-relaxed mb-8 text-white/90">
                  Umzilikazi Senior Secondary School is a public, rural institution. We welcome learners from all Emadlangeni and surrounding areas. Admission is open to Grade 8 through Grade 12 learners. For enquiries, contact our office directly or use the form below.
                </p>
                <div className="grid grid-cols-2 gap-4 md:gap-6">
                  {[
                    { label: 'School Type', value: 'Public Rural School (Quintile 2)' },
                    { label: 'Grades', value: 'Grade 8 to Grade 12' },
                    { label: 'Enrolment', value: <><Counter value={1657} suffix="+" /> Learners</> },
                    { label: 'Educators', value: <Counter value={23} /> }
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
                <h3 className="text-lg md:text-2xl font-headline font-bold mb-6 md:mb-8 tracking-tight">Contact Information</h3>
                <div className="space-y-6 md:space-y-8">
                  <div>
                    <span className="text-[9px] uppercase tracking-widest text-white/60 block mb-1">Phone Enquiries</span>
                    <p className="text-xl md:text-3xl font-light">073 336 3970 / 084 485 5879</p>
                  </div>
                  <div>
                    <span className="text-[9px] uppercase tracking-widest text-white/60 block mb-1">Address</span>
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
                <h2 className="text-2xl md:text-4xl editorial-heading mb-8 md:mb-10 tracking-tight">Get in Touch / Contact Us</h2>
                <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                  {[
                    { label: 'Full Name', placeholder: 'Your Name', type: 'text' },
                    { label: 'Email Address', placeholder: 'email@example.com', type: 'email' },
                    { label: 'Phone Number', placeholder: '071 234 5678', type: 'tel' }
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
                    <label className="text-[9px] uppercase tracking-widest text-secondary absolute top-0 left-0">Message</label>
                    <textarea 
                      className="w-full bg-transparent border-b-2 border-outline-variant py-2 focus:outline-none focus:border-primary transition-colors text-on-surface text-sm" 
                      placeholder="How can we assist you?" 
                      rows={3}
                    ></textarea>
                  </div>
                  <button className="bg-primary text-white px-10 py-3 font-bold tracking-widest text-[10px] uppercase hover:shadow-lg transition-all w-full md:w-auto" type="submit">
                    SEND MESSAGE
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
                    { icon: <MapPin className="text-primary w-5 h-5" />, label: 'Location', value: '326 D-Off Utrecht Road, Utrecht, KwaZulu-Natal' },
                    { icon: <Mail className="text-primary w-5 h-5" />, label: 'Postal Address', value: 'P.O. Box 77, Utrecht, 2980' },
                    { icon: <Phone className="text-primary w-5 h-5" />, label: 'Phone', value: '073 336 3970 / 084 485 5879' },
                    { icon: <User className="text-primary w-5 h-5" />, label: 'Principal', value: 'Mr. Zulu' }
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
                      <h2 className="text-2xl md:text-3xl editorial-heading text-primary mb-4">2027 Applications</h2>
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
                    <h4 className="font-headline font-bold text-lg mb-4">Grade 8 Enrollment</h4>
                    <p className="text-secondary text-sm leading-relaxed">
                      We prioritize learners from our local feeder primary schools in Emadlangeni and surrounding areas. Space is limited, so early application is encouraged once the window opens.
                    </p>
                  </motion.div>
                  <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="bg-surface-container-low p-8 rounded-sm"
                  >
                    <h4 className="font-headline font-bold text-lg mb-4">Transfer Students</h4>
                    <p className="text-secondary text-sm leading-relaxed">
                      Learners wishing to transfer into Grades 9-11 must provide a valid transfer letter and their most recent academic records for review by the School Governing Body.
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
                    { val: '#10', label: 'National Rank 2024' },
                    { val: '100%', label: 'Pass Rate (Multiple Years)' },
                    { val: 'Top 0.2%', label: 'Nationally Ranked Schools' }
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
                  <h2 className="text-2xl md:text-4xl editorial-heading mb-8">Matric Results History</h2>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[600px]">
                      <thead>
                        <tr className="bg-surface-container-high">
                          <th className="p-4 text-editorial-label text-primary">Year</th>
                          <th className="p-4 text-editorial-label text-primary">Candidates</th>
                          <th className="p-4 text-editorial-label text-primary">Passed</th>
                          <th className="p-4 text-editorial-label text-primary">Pass Rate</th>
                          <th className="p-4 text-editorial-label text-primary">National Rank</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-outline-variant/10">
                        {[
                          { year: '2025', cand: '321', passed: '320', perc: '99.69%', rank: '#3' },
                          { year: '2024', cand: '177', passed: '177', perc: '100.00%', rank: '#1', highlight: true },
                          { year: '2023', cand: '284', passed: '270', perc: '95.07%', rank: 'Top Tier' },
                          { year: '2022', cand: '229', passed: '214', perc: '93.45%', rank: 'Top Tier' },
                          { year: '2021', cand: '168', passed: '160', perc: '95.24%', rank: 'Top Tier' },
                          { year: '2020', cand: '80', passed: '79', perc: '98.75%', rank: 'Top Tier' },
                          { year: '2019', cand: '64', passed: '64', perc: '100.00%', rank: 'Top Tier' },
                          { year: '2018', cand: '59', passed: '58', perc: '98.31%', rank: 'Top Tier' },
                          { year: '2017', cand: '25', passed: '25', perc: '100.00%', rank: 'Top Tier' },
                          { year: '2016', cand: '39', passed: '38', perc: '97.44%', rank: 'Top Tier' }
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
                        <span className="text-editorial-label text-primary mb-1 block uppercase tracking-widest">Umzilikazi Life</span>
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
              <h4 className="text-base font-bold mb-4 font-headline uppercase tracking-widest">Umzilikazi Senior Secondary School</h4>
              <div className="text-white/80 text-[10px] md:text-xs space-y-2 mb-6 font-body">
                <p>EMIS: 500401413</p>
                <p>326 D-Off Utrecht Road, Utrecht, KZN</p>
                <p>073 336 3970 / 084 485 5879</p>
                <p>Principal: Mr. Zulu</p>
              </div>
              <div className="p-4 bg-white/10 rounded-sm">
                <p className="text-[9px] font-bold uppercase tracking-widest text-white/70 mb-2">Special Recognition</p>
                <p className="text-[10px] md:text-xs italic">Proudly adopted by Gagasi FM — Geleza Ne Gagasi 2025</p>
              </div>
            </div>
            <div>
              <h4 className="text-editorial-label text-white/50 mb-5 md:mb-6">Quick Links</h4>
              <nav className="grid grid-cols-2 gap-x-4 gap-y-3 text-[10px] md:text-xs">
                {[
                  { name: 'Home', page: 'home' },
                  { name: 'News', page: 'news' },
                  { name: 'Academics', page: 'academics' },
                  { name: 'Admissions', page: 'admissions' },
                  { name: 'Gallery', page: 'gallery' },
                  { name: 'Uniforms', page: 'uniforms' },
                  { name: 'Contact', page: 'contact' }
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
              <h4 className="text-editorial-label text-white/50 mb-5 md:mb-6">District Affiliation</h4>
              <p className="text-[10px] md:text-xs leading-relaxed text-white/80 mb-6 font-body">
                Amajuba District, KwaZulu-Natal Department of Education.
              </p>
              <div className="flex gap-3">
                <a className="w-8 h-8 md:w-10 md:h-10 border border-white/20 flex items-center justify-center hover:bg-white hover:text-primary transition-all" href="#">
                  <Share2 className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
          <div className="mt-12 md:mt-16 pt-6 md:pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-[8px] md:text-[10px] text-white/50 uppercase tracking-widest font-bold">
            <p>© 2026 Umzilikazi Senior Secondary School. All Rights Reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Use</a>
            </div>
          </div>
        </div>
      </footer>
      <CookieConsent />
    </div>
  );
}
