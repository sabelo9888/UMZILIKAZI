import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  GraduationCap, 
  Briefcase, 
  MapPin, 
  Quote, 
  ArrowRight, 
  ArrowLeft, 
  Award, 
  Calendar,
  BookOpen,
  ArrowUpRight
} from 'lucide-react';

interface Alumnus {
  id: string;
  name: string;
  classOf: string;
  careerENG: string;
  careerZUL: string;
  companyENG: string;
  companyZUL: string;
  locationENG: string;
  locationZUL: string;
  bioENG: string;
  bioZUL: string;
  timelineStepsENG: { title: string; subtitle: string; date: string }[];
  timelineStepsZUL: { title: string; subtitle: string; date: string }[];
  adviceENG: string;
  adviceZUL: string;
  matricAchievementsENG: string[];
  matricAchievementsZUL: string[];
  initials: string;
  gradientClass: string;
  image: string;
}

const ALUMNI_DATA: Alumnus[] = [
  {
    id: 'alumnus_thenjiwe',
    name: 'Thenjiwe Dladla',
    classOf: '2017',
    careerENG: 'High School Educator',
    careerZUL: 'Uthisha Wesikole Esiphakeme',
    companyENG: 'Umzilikazi High School',
    companyZUL: 'Isikole saseMzilikazi',
    locationENG: 'Utrecht, KwaZulu-Natal',
    locationZUL: 'Utrecht, iKwaZulu-Natal',
    bioENG: 'Thenjiwe graduated from Umzilikazi High School as one of the top academic performers in the Class of 2017. Driven by a deep commitment to uplift children from her own community, she pursued a Bachelor of Education degree and proudly returned to her alma mater as a fully qualified educator, guiding the school\'s next generation of learners.',
    bioZUL: 'UThenjiwe waphothula kwi-Class of 2017 eMzilikazi High School njengomunye wabafundi abenza kahle kakhulu. Egqugquzelwa ukuzibophezela ekuthuthukiseni izingane zomphakathi wakubo, wenza iziqu ze-Bachelor of Education wase ebuyela esikoleni asifundela esebenza njengothisha oqeqeshiwe oqondisa isizukulwane esisha.',
    timelineStepsENG: [
      {
        title: 'Matriculated at Umzilikazi',
        subtitle: 'Graduated as a top academic performer in the Class of 2017 with distinctions.',
        date: '2017'
      },
      {
        title: 'Tertiary Studies',
        subtitle: 'Enrolled in and completed a Bachelor of Education (B.Ed) degree at a top South African university.',
        date: '2018 - 2021'
      },
      {
        title: 'Returned to Alma Mater',
        subtitle: 'Appointed as a professional High School Educator at Umzilikazi High School, dedicated to service.',
        date: '2022 - Present'
      }
    ],
    timelineStepsZUL: [
      {
        title: 'Waphothula uMatric eMzilikazi',
        subtitle: 'Waphothula njengomunye wabafundi abenza kahle eKlasi lika-2017 enamalengiso.',
        date: '2017'
      },
      {
        title: 'Izifundo eSikhungweni Sezemfundo Ephakeme',
        subtitle: 'Wenza futhi waphothula iziqu ze-Bachelor of Education (B.Ed) enyuvesi ehlonishwayo eNingizimu Afrika.',
        date: '2018 - 2021'
      },
      {
        title: 'Ukubuyela esikoleni asifundela',
        subtitle: 'Uqashwe njengothisha osebenzela uMzilikazi High School, ezinikele ekuthuthukiseni intsha.',
        date: '2022 - Manje'
      }
    ],
    adviceENG: '“Educating our youth is a labour of love and service. To all learners at Umzilikazi, remember that your current circumstances never define your ultimate potential. Through consistent effort, discipline, and respect for your teachers, you can turn any academic dream into reality.”',
    adviceZUL: '“Ukufundisa intsha yethu kuwumsebenzi wothando nokuzisiza. Kubafundi baseMzilikazi, khumbulani ukuthi isimo sasekhaya asingeke sanquma amandla enu aphelele. Ngokuzimisela njalo, ukuziphatha kahle, kanye nokuhlonipha othisha, ningenza lonke iphupho lezemfundo libe ngokoqobo.”',
    matricAchievementsENG: [
      'Distinction in isiZulu Home Language', 
      'Top Performer in Life Orientation', 
      'Representative Council of Learners (RCL) Leader'
    ],
    matricAchievementsZUL: [
      'Ukuphasa ngamalengiso kwi-IsiZulu Home Language', 
      'Umfundi Ohamba Phambili kwi-Life Orientation', 
      'Umholi we-Student Representative Council'
    ],
    initials: 'TD',
    gradientClass: 'from-red-600 to-amber-600',
    image: 'https://i.ibb.co/qYpkQZzg/file-00000000b91472439e10ad04685a8148.png'
  }
];

interface AlumniSpotlightProps {
  lang: 'ENG' | 'ZUL';
  onBack?: () => void;
  isStandalonePage?: boolean;
  onViewFull?: (index: number) => void;
  initialIndex?: number;
}

export default function AlumniSpotlight({ lang, onBack, isStandalonePage = false, onViewFull, initialIndex = 0 }: AlumniSpotlightProps) {
  const [activeIndex, setActiveIndex] = useState(initialIndex);

  React.useEffect(() => {
    if (initialIndex < ALUMNI_DATA.length) {
      setActiveIndex(initialIndex);
    } else {
      setActiveIndex(0);
    }
  }, [initialIndex]);

  const l = {
    ENG: {
      headline: 'Alumni Spotlight',
      leadSubtitle: 'Meet our successful graduates who walked these same hallways and are now making a significant impact. Their stories prove that with discipline and respect, there is no limit to what you can achieve!',
      classOfLabel: 'Class of',
      atLabel: 'at',
      careerPath: 'Journey Timeline',
      adviceLabel: 'Success Advice for Current Learners',
      achievementsLabel: 'Matric Legacy Highlights',
      learnMore: 'Read Next Spotlight',
      inspireTitle: 'Your Legacy Awaits',
      inspireDesc: 'Every graduate featured here once sat in the very classrooms you inhabit today. Their journeys are proof that your future is in your hands.',
      readFullStory: 'Read Full Story',
      backToList: 'Back to Homepage',
      alumniStory: 'Alumni Story',
      matricYear: 'Matric Class of',
      verifiedGraduate: 'Verified Graduate'
    },
    ZUL: {
      headline: 'Abafundi Bethu Abaphumelele (Alumni)',
      leadSubtitle: 'Hlangana nabafundi bethu abaphumelele abake bafunda kulezi zindlu kanti manje badala umehluko omkhulu. Uhambo lwabo lufakazela ukuthi ngenhlonipho nokuzimisela, asikho isiphelo kulokho ongakufinyelela!',
      classOfLabel: 'Waphothula ngo',
      atLabel: 'ku',
      careerPath: 'Uhambo Lokukhula',
      adviceLabel: 'Iseluleko Sempumelelo Sabafundi Bamanje',
      achievementsLabel: 'Isikhumbuzo Sempumelelo kaMatric',
      learnMore: 'Bona Olandelayo',
      inspireTitle: 'Umlando Wakho Ulindile',
      inspireDesc: 'Wonke umfundi oveziwe lapha uke wahlala kulezo madolobha emikhakha ohlezi kuyo namuhla. Uhambo lwabo luwubufakazi bokuthi ikusasa lakho lisezandleni zakho.',
      readFullStory: 'Funda Lonke Uhambo',
      backToList: 'Buyela eKhaya',
      alumniStory: 'Uhambo Lwalowo Owayefunda Lapha',
      matricYear: 'U-Matric weKlasi lika',
      verifiedGraduate: 'Umfundi Oqinisekisiwe'
    }
  };

  const activeLabels = lang === 'ENG' ? l.ENG : l.ZUL;
  const currentAlumnus = ALUMNI_DATA[activeIndex] || ALUMNI_DATA[0];

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % ALUMNI_DATA.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + ALUMNI_DATA.length) % ALUMNI_DATA.length);
  };

  // Compact homepage preview layout
  if (!isStandalonePage) {
    return (
      <section className="py-16 md:py-24 bg-surface-container-low border-b border-outline-variant/10 relative overflow-hidden">
        {/* Decorative background blurs */}
        <div className="absolute top-1/2 left-4 w-72 h-72 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 right-4 w-72 h-72 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 relative z-10">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-10 md:mb-14">
            <span className="text-editorial-label text-primary uppercase tracking-widest font-semibold flex items-center justify-center gap-2 mb-2 sm:mb-3">
              <GraduationCap className="w-5 h-5 text-primary" />
              {lang === 'ENG' ? 'Inspirational Post-Matric Journeys' : 'Uhambo Lokuzimisela Ngale KukaMatric'}
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-5xl editorial-heading mb-3 md:mb-6 leading-tight text-primary">
              {activeLabels.headline}
            </h2>
            <p className="text-xs sm:text-base md:text-lg text-secondary leading-relaxed font-light">
              {activeLabels.leadSubtitle}
            </p>
          </div>

          {/* Centered card for Thenjiwe Dladla */}
          <div className="max-w-md mx-auto px-2">
            <div className="bg-white border border-outline-variant/10 hover:border-primary/20 rounded-xl shadow-xs hover:shadow-md hover:-translate-y-1.5 transition-all duration-300 ease-out flex flex-col justify-between overflow-hidden h-full group">
              <div>
                {/* Portrait Photo Frame with Hover Effects */}
                <div className="relative aspect-[4/3] bg-surface-container-low overflow-hidden border-b border-outline-variant/10">
                  <img 
                    src={currentAlumnus.image} 
                    alt={currentAlumnus.name}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute bottom-3 left-3 bg-primary text-white text-[9px] uppercase tracking-widest font-bold px-2.5 py-1 rounded shadow-sm">
                    🎓 {activeLabels.classOfLabel} {currentAlumnus.classOf}
                  </div>
                </div>

                {/* Clean text hierarchy with minimal info */}
                <div className="p-5 space-y-2">
                  <h4 className="font-headline font-black text-primary text-base md:text-lg leading-tight group-hover:text-red-700 transition-colors">
                    {currentAlumnus.name}
                  </h4>
                  <p className="text-xs text-red-750 font-bold uppercase tracking-wider">
                    {lang === 'ENG' ? currentAlumnus.careerENG : currentAlumnus.careerZUL}
                  </p>
                  <p className="text-[10px] text-secondary font-medium font-mono flex items-center gap-1">
                    📍 {lang === 'ENG' ? currentAlumnus.locationENG : currentAlumnus.locationZUL}
                  </p>
                  <p className="text-xs text-secondary/75 leading-relaxed font-light line-clamp-3 italic pt-1">
                    "{lang === 'ENG' ? currentAlumnus.bioENG : currentAlumnus.bioZUL}"
                  </p>
                </div>
              </div>

              <div className="p-5 pt-1">
                <button
                  onClick={() => onViewFull && onViewFull(0)}
                  className="text-xs font-bold text-primary hover:text-white flex items-center gap-1.5 px-4 py-2.5 bg-primary/5 hover:bg-primary rounded transition-all duration-300 w-full justify-center border border-primary/25 cursor-pointer"
                >
                  {activeLabels.readFullStory}
                  <ArrowRight className="w-3.5 h-3.5 animate-pulse" />
                </button>
              </div>
            </div>
          </div>

        </div>
      </section>
    );
  }

  // Pure representation of Standalone dedicated Alumni Showcase - Mobile First Redesign
  return (
    <section className="bg-slate-50 min-h-screen py-6 sm:py-12 md:py-16 relative overflow-x-hidden">
      {/* Decorative dynamic ambient circles */}
      <div className="absolute top-20 -left-20 w-80 h-80 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-40 -right-20 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Navigation & Header - Mobile First Header bar */}
        <div className="mb-6 sm:mb-8 flex items-center justify-between">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 px-3 py-2 bg-white hover:bg-primary hover:text-white text-primary text-xs font-bold uppercase tracking-wider rounded-lg border border-outline-variant/15 transition-all shadow-xs cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">{activeLabels.backToList}</span>
            <span className="sm:hidden">{lang === 'ENG' ? 'Back' : 'Emuva'}</span>
          </button>

          <span className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider bg-primary/10 text-primary px-3 py-1 rounded-full flex items-center gap-1">
            <Award className="w-3 h-3 text-amber-500" />
            {activeLabels.verifiedGraduate}
          </span>
        </div>

        {/* Editorial Profile Frame */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          
          {/* Cover Banner Area (Elegant Gradient backplate) */}
          <div className="h-28 sm:h-44 bg-gradient-to-r from-primary to-red-800 relative">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-yellow-300/10 via-transparent to-transparent" />
            <div className="absolute bottom-3 right-4 text-white/40 text-4xl sm:text-6xl font-black font-mono tracking-tighter opacity-15 select-none pointer-events-none">
              UMZILIKAZI 2017
            </div>
          </div>

          {/* Profile Card Body */}
          <div className="px-5 sm:px-10 pb-10 relative">
            
            {/* Overlapping Avatar Area */}
            <div className="flex flex-col sm:flex-row sm:items-end gap-4 -mt-14 sm:-mt-20 mb-6 border-b border-slate-100 pb-6">
              <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-2xl overflow-hidden border-4 border-white shadow-md bg-white flex-shrink-0">
                <img 
                  src={currentAlumnus.image} 
                  alt={currentAlumnus.name}
                  className="w-full h-full object-cover object-top"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="pt-2 sm:pt-0">
                <span className="text-[9px] sm:text-xs font-mono font-bold text-red-750 uppercase tracking-wider block">
                  {activeLabels.matricYear} {currentAlumnus.classOf}
                </span>
                <h1 className="text-xl sm:text-3xl font-headline font-black text-primary tracking-tight mt-0.5">
                  {currentAlumnus.name}
                </h1>
                
                {/* Flexible flex-wrap metadata lines */}
                <div className="flex flex-wrap items-center gap-y-1.5 gap-x-3 mt-2 text-xs text-secondary">
                  <span className="inline-flex items-center gap-1 font-bold text-red-700 bg-red-50 px-2 py-0.5 rounded">
                    <Briefcase className="w-3.5 h-3.5 text-red-650" />
                    {lang === 'ENG' ? currentAlumnus.careerENG : currentAlumnus.careerZUL}
                  </span>
                  <span className="inline-flex items-center gap-1 font-medium bg-slate-50 px-2 py-0.5 rounded">
                    📍 {lang === 'ENG' ? currentAlumnus.locationENG : currentAlumnus.locationZUL}
                  </span>
                </div>
              </div>
            </div>

            {/* Core Sections Layout - 100% Mobile Friendly */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
              
              {/* Left Column (Bio Narrative, Advice Block) */}
              <div className="md:col-span-7 space-y-6">
                
                {/* Section Title */}
                <div>
                  <h2 className="text-xs font-black uppercase tracking-widest text-primary flex items-center gap-1.5 mb-2.5">
                    <GraduationCap className="w-4 h-4 text-primary" />
                    {lang === 'ENG' ? 'About Chef-d\'œuvre' : 'Sifingeko Sempumelelo'}
                  </h2>
                  <p className="text-sm sm:text-base text-secondary leading-relaxed font-light font-sans text-justify">
                    {lang === 'ENG' ? currentAlumnus.bioENG : currentAlumnus.bioZUL}
                  </p>
                </div>

                {/* Section: Custom interactive timeline of her actual steps */}
                <div className="border-t border-slate-100 pt-6">
                  <h2 className="text-xs font-black uppercase tracking-widest text-primary flex items-center gap-1.5 mb-5">
                    <Calendar className="w-4 h-4 text-primary" />
                    {activeLabels.careerPath}
                  </h2>
                  
                  {/* Visual Step Timeline */}
                  <div className="relative pl-6 border-l border-primary/20 space-y-6 sm:space-y-8">
                    {(lang === 'ENG' ? currentAlumnus.timelineStepsENG : currentAlumnus.timelineStepsZUL).map((step, idx) => (
                      <div key={idx} className="relative">
                        {/* Timeline Node Point Dot */}
                        <div className="absolute -left-[30px] top-1 w-4 h-4 rounded-full bg-white border-2 border-primary flex items-center justify-center">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                        </div>
                        
                        {/* Date Label */}
                        <span className="text-[9px] font-mono font-bold text-red-750 bg-red-50 px-2 py-0.5 rounded inline-block mb-1">
                          {step.date}
                        </span>
                        {/* Title & Description */}
                        <h3 className="text-xs sm:text-sm font-bold text-primary tracking-tight leading-snug">
                          {step.title}
                        </h3>
                        <p className="text-xs text-secondary leading-relaxed font-light mt-0.5">
                          {step.subtitle}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Right Column (Reflective Advice Quote block, Academic distinctions legacy) */}
              <div className="md:col-span-5 space-y-6">

                {/* Success Quote Card */}
                <div className="relative p-5 sm:p-6 bg-amber-50/30 border border-amber-500/10 rounded-xl overflow-hidden flex flex-col justify-between">
                  {/* Decorative quote mark */}
                  <Quote className="absolute -top-1.5 -right-1 w-12 h-12 text-amber-500/5 fill-amber-500/5 rotate-180" />
                  
                  <div>
                    <span className="text-[9px] uppercase tracking-widest font-black text-amber-800 block mb-3 flex items-center gap-1">
                      <Quote className="w-3.5 h-3.5 text-amber-500" />
                      {activeLabels.adviceLabel}
                    </span>
                    <p className="text-xs sm:text-sm text-secondary/90 italic leading-relaxed font-medium">
                      {lang === 'ENG' ? currentAlumnus.adviceENG : currentAlumnus.adviceZUL}
                    </p>
                  </div>
                </div>

                {/* Distinction accomplishments pill area */}
                <div className="border-t border-slate-100 pt-6 md:border-t-0 md:pt-0">
                  <h2 className="text-xs font-black uppercase tracking-widest text-primary flex items-center gap-1.5 mb-3.5">
                    <Award className="w-4 h-4 text-amber-500" />
                    {activeLabels.achievementsLabel}
                  </h2>
                  <div className="space-y-2">
                    {(lang === 'ENG' ? currentAlumnus.matricAchievementsENG : currentAlumnus.matricAchievementsZUL).map((ach, idx) => (
                      <div 
                        key={idx} 
                        className="p-3 bg-slate-50 border border-slate-150 rounded-lg flex items-start gap-2.5 hover:shadow-2xs transition-shadow duration-300"
                      >
                        <Award className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                        <span className="text-xs font-medium text-slate-800 leading-tight select-none">
                          {ach}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

            </div>

          </div>

        </div>

        {/* Footer Guidance Line & Secondary Back Button */}
        <div className="mt-8 text-center bg-white rounded-xl border border-slate-100 p-6 flex flex-col items-center justify-center gap-4">
          <p className="text-xs text-secondary leading-relaxed max-w-md italic font-light">
            "{lang === 'ENG' 
              ? 'Our school has a proud legacy of generating high-caliber professionals. Strive for excellence in your studies so you too can inspire tomorrow.' 
              : 'Isikole sethu sinomlando omuhle wokuveza abaphumelele ezingeni eliphakeme. Zimisele ezifundweni zakho ukuze nawe ugqugquzele ikusasa.'}"
          </p>
          <button
            onClick={onBack}
            className="px-6 py-2.5 bg-primary hover:bg-red-700 text-white font-bold tracking-widest text-xs uppercase rounded-full flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            {activeLabels.backToList}
          </button>
        </div>

      </div>
    </section>
  );
}
