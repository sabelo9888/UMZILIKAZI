import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  GraduationCap, 
  Briefcase, 
  MapPin, 
  Calendar, 
  Quote, 
  ArrowRight, 
  ArrowLeft, 
  Award, 
  BookOpen, 
  Heart,
  Sparkles
} from 'lucide-react';

// @ts-ignore
import ThandekaImg from '../assets/images/alumna_thandeka_1781538663980.jpg';
// @ts-ignore
import SbusisoImg from '../assets/images/alumnus_sbusiso_1781538680953.jpg';
// @ts-ignore
import NokuthulaImg from '../assets/images/alumna_nokuthula_1781538696678.jpg';

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
  pathENG: string;
  pathZUL: string;
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
    id: 'alumnus_1',
    name: 'Dr. Thandeka Shabalala',
    classOf: '2014',
    careerENG: 'Registrar in Cardiothoracic Surgery',
    careerZUL: 'Uodokotela Ohlinzayo Wezenhliziyo',
    companyENG: 'Groote Schuur Hospital / UCT',
    companyZUL: 'Esibhedlela saseGroote Schuur / UCT',
    locationENG: 'Cape Town, South Africa',
    locationZUL: 'IKapa, Ningizimu Afrika',
    bioENG: 'Hailing from Utrecht, Thandeka achieved 7 distinctions in her 2014 Matric exams. She completed her MBChB with Honors at the University of Cape Town and is currently specializing in complex cardiovascular surgeries.',
    bioZUL: 'Odabuka e-Utrecht, uThandeka wathola izindondo ezinhle ezingu-7 ezivivinyweni zakhe zango-2014. Waqedela izifundo zakhe zezezifundiswa zezeMBChB eNyuvesi yaseKapa kanti manje usegantshisela ekuhlinzeni inhliziyo.',
    pathENG: 'Umzilikazi High School ➔ Bachelor of Medicine & Bachelor of Surgery (UCT) ➔ Registrar Residency in Cardiothoracic Surgery',
    pathZUL: 'Isikole saseMzilikazi ➔ Bachelor of Medicine & Bachelor of Surgery (UCT) ➔ Uhlelo lokukhulisa udokotela ohlinzayo wezenhliziyo',
    adviceENG: '“Never let your current circumstances define your altitude. At Umzilikazi, the educators give you the foundation; the rest is your determination. Dedicate 4 hours every single day after school to master past question papers.”',
    adviceZUL: '“Ungalokothi uvumele isimo sakho samanje sinqume ikusasa lakho. EMzilikazi, othisha bakunikeza isisekelo somhlaba; okunye ukuzimisela kwakho. Sinikeza amahora ama-4 usuku nosuku lokuhlola amaphepha adlule.”',
    matricAchievementsENG: ['7 Distinctions (Class of 2014)', 'Top Science Learner in Amajuba', 'Dux Scholar'],
    matricAchievementsZUL: ['Izindondo ezingu-7 (Class of 2014)', 'Umfundi Ohamba Phambili kwezesayensi', 'Dux Scholar'],
    initials: 'TS',
    gradientClass: 'from-amber-600 to-red-600',
    image: ThandekaImg
  },
  {
    id: 'alumnus_2',
    name: 'Sbusiso Cele',
    classOf: '2018',
    careerENG: 'Senior Software Engineer',
    careerZUL: 'Unjiniyela Omkhulu Wezinhlelo Zamakhompyutha',
    companyENG: 'Amazon Web Services (AWS)',
    companyZUL: 'Amazon Web Services (AWS)',
    locationENG: 'Johannesburg / Remote US',
    locationZUL: 'IGoli / Remote US',
    bioENG: 'Sbusiso taught himself Python programming using a borrowed mobile phone at the local library during high school. His outstanding Matric performance earned him a full scholarship to Wits University to study Computer Science.',
    bioZUL: 'USbusiso wazifundisa amakhodi we-Python esebenzisa umakhalekhukhwini owabolekwa ebhukwini lomphakathi. Ukusebenza kwakhe kahle kumatikuletsheni kwamtholela umfundaze ophelele waseWits University.',
    pathENG: 'Umzilikazi High School ➔ BSc in Computer Science (Wits) ➔ Software Engineer Intern ➔ AWS Cloud Engineer Builder',
    pathZUL: 'Isikole saseMzilikazi ➔ BSc in Computer Science (Wits) ➔ Ukujwayela Umsebenzi ➔ AWS Cloud Engineer Builder',
    adviceENG: '“The modern economy runs on digital skills. You don\'t need luxury computers to start learning code or logical reasoning. Leverage the school computer laboratory hours fully and participate in mathematical olympiads.”',
    adviceZUL: '“Umnotho wanamuhla uhamba ngamakhono edijithali. Awudingi amakhompyutha abizayo ukuze uqale ukufunda. Sebenzisa amahora e-computer lab yesikole ngokugcwele kanti ube khona emiqhudelwaneni.”',
    matricAchievementsENG: ['A in Mathematics & Physical Sciences', '100% in Information Technology exam'],
    matricAchievementsZUL: ['A kwi-Mathematics neSayensi', '100% ezivivinyweni zobuchwepheshe'],
    initials: 'SC',
    gradientClass: 'from-[#b3000d] to-rose-600',
    image: SbusisoImg
  },
  {
    id: 'alumnus_3',
    name: 'Advocate Nokuthula Sithole',
    classOf: '2011',
    careerENG: 'Human Rights Counsel & Legal Advisor',
    careerZUL: 'Ummeli Welungelo Lomuntu',
    companyENG: 'Johannesburg Bar Association',
    companyZUL: 'IQembu Labameli laseGoli',
    locationENG: 'Pretoria, South Africa',
    locationZUL: 'iPitoli, Ningizimu Afrika',
    bioENG: 'A fiery public speaker who led the Umzilikazi Debating Society, Nokuthula represented the school in provincial championships. She holds an LLB degree with distinction and advises public sector boards on policy and judicial rights.',
    bioZUL: 'Isikhulumi sasemthethweni esahola iqembu lempikiswano laseMzilikazi. UNokuthula wamelela isikole emiqhudelwaneni yesifundazwe. Uneziqu ze-LLB ngamalengiso kanti weluleka ezomthetho.',
    pathENG: 'Umzilikazi High School ➔ Bachelor of Laws - LLB (UKZN) ➔ Practical Legal Training ➔ Admitted Advocate of High Court of SA',
    pathZUL: 'Isikole saseMzilikazi ➔ Bachelor of Laws - LLB (UKZN) ➔ Training Yezomthetho ➔ Ummeli Ogcotshwe eNkantolo Ephakeme',
    adviceENG: '“Never allow lack of confidence to silence your dreams. Read everything you can lay your hands on—newspapers, books, journals. Strong literacy and critical reasoning are the absolute keys to changing lives in our community.”',
    adviceZUL: '“Ungalokothi uvumele ukuntuleka kokuzithemba kuthulise amaphupho akho. Funda konke ongakuthola ezandleni zakho. Ukufunda okuqinile nokuhlaziya yikhona okuvula iminyango empilweni.”',
    matricAchievementsENG: ['A in isiZulu Home Language & English', 'Founder of School Literacy Debate Union'],
    matricAchievementsZUL: ['A kwiSingisi nesiZulu Home Language', 'Umsunguli wenhlangano yenkulumompikiswano yesikole'],
    initials: 'NS',
    gradientClass: 'from-amber-600 to-yellow-500',
    image: NokuthulaImg
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
    setActiveIndex(initialIndex);
  }, [initialIndex]);

  const l = {
    ENG: {
      headline: 'Alumni Spotlight',
      leadSubtitle: 'Meet our successful graduates who walked these same hallways and are now making a significant impact across South Africa and the globe. Their stories prove that with discipline and respect, there is no limit to what you can achieve!',
      classOfLabel: 'Class of',
      atLabel: 'at',
      careerPath: 'Career & Educational Path',
      adviceLabel: 'Success Advice for Current Learners',
      achievementsLabel: 'Matric Legacy Highlights',
      learnMore: 'Read Next Spotlight',
      inspireTitle: 'Your Legacy Awaits',
      inspireDesc: 'Every graduate featured here once sat in the very classrooms you inhabit today. Their journeys are proof that your future is in your hands.',
      readFullStory: 'Read Full Story'
    },
    ZUL: {
      headline: 'Abafundi Bethu Abaphumelele (Alumni)',
      leadSubtitle: 'Hlangana nabafundi bethu abaphumelele abake bafunda kulezi zindlu kanti manje badala umehluko omkhulu eNingizimu Afrika nasemhlabeni jikelele. Uhambo lwabo lufakazela ukuthi ngenhlonipho nokuzimisela, asikho isiphelo kulokho ongakufinyelela!',
      classOfLabel: 'Waphothula ngo',
      atLabel: 'ku',
      careerPath: 'Uhambo lwezeMfundo nomSebenzi',
      adviceLabel: 'Iseluleko Sempumelelo Sabafundi Bamanje',
      achievementsLabel: 'Isikhumbuzo Sempumelelo kaMatric',
      learnMore: 'Bona Olandelayo',
      inspireTitle: 'Umlando Wakho Ulindile',
      inspireDesc: 'Wonke umfundi oveziwe lapha uke wahlala kulezo madolobha emikhakha ohlezi kuyo namuhla. Uhambo lwabo luwubufakazi bokuthi ikusasa lakho lisezandleni zakho.',
      readFullStory: 'Funda Lonke Uhambo'
    }
  };

  const activeLabels = lang === 'ENG' ? l.ENG : l.ZUL;
  const currentAlumnus = ALUMNI_DATA[activeIndex];

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % ALUMNI_DATA.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + ALUMNI_DATA.length) % ALUMNI_DATA.length);
  };

  // Compact homepage preview layout
  if (!isStandalonePage) {
    return (
      <section className="py-20 bg-surface-container-low border-b border-outline-variant/10 relative overflow-hidden">
        {/* Subtle decorative background blur elements */}
        <div className="absolute top-1/2 left-4 w-72 h-72 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 right-4 w-72 h-72 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-editorial-label text-primary uppercase tracking-widest font-semibold flex items-center justify-center gap-2 mb-3">
              <GraduationCap className="w-5 h-5 text-primary" />
              {lang === 'ENG' ? 'Inspirational Post-Matric Journeys' : 'Uhambo Lokuzimisela Ngale KukaMatric'}
            </span>
            <h2 className="text-3xl md:text-4xl editorial-heading mb-4 tracking-tight text-primary">
              {activeLabels.headline}
            </h2>
            <p className="text-xs md:text-sm text-secondary leading-relaxed font-light">
              {activeLabels.leadSubtitle}
            </p>
          </div>

          {/* Compact 3-card Grid layout requested by user */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-stretch mb-10">
            {ALUMNI_DATA.map((alumnus, idx) => (
              <div 
                key={alumnus.id}
                className="bg-white border border-outline-variant/10 hover:border-primary/20 rounded-lg shadow-xs hover:shadow-md hover:-translate-y-1.5 transition-all duration-300 ease-out flex flex-col justify-between overflow-hidden h-full group"
              >
                <div>
                  {/* Portrait Photo Frame with Hover Effects */}
                  <div className="relative aspect-[4/3] bg-surface-container-low overflow-hidden border-b border-outline-variant/10">
                    <img 
                      src={alumnus.image} 
                      alt={alumnus.name}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute bottom-3 left-3 bg-primary text-white text-[9px] uppercase tracking-widest font-bold px-2 py-0.5 rounded shadow-sm">
                      🎓 {activeLabels.classOfLabel} {alumnus.classOf}
                    </div>
                  </div>

                  {/* Clean text hierarchy with minimal info */}
                  <div className="p-5 space-y-2">
                    <h4 className="font-headline font-black text-primary text-base md:text-lg leading-tight group-hover:text-red-700 transition-colors">
                      {alumnus.name}
                    </h4>
                    <p className="text-xs text-red-750 font-bold uppercase tracking-wider">
                      {lang === 'ENG' ? alumnus.careerENG : alumnus.careerZUL}
                    </p>
                    <p className="text-[10px] text-secondary font-medium font-mono flex items-center gap-1">
                      📍 {lang === 'ENG' ? alumnus.locationENG : alumnus.locationZUL}
                    </p>
                    <p className="text-xs text-secondary/75 leading-relaxed font-light line-clamp-3 italic pt-1">
                      "{lang === 'ENG' ? alumnus.bioENG : alumnus.bioZUL}"
                    </p>
                  </div>
                </div>

                <div className="px-5 pb-5 pt-1">
                  <button
                    onClick={() => onViewFull && onViewFull(idx)}
                    className="text-xs font-bold text-primary hover:text-red-700 flex items-center gap-1.5 px-3 py-2 bg-primary/5 hover:bg-primary/10 rounded transition-all duration-300"
                  >
                    {activeLabels.readFullStory}
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>
    );
  }

  return (
    <section className={`relative overflow-hidden ${
      isStandalonePage 
        ? 'bg-surface min-h-screen py-10 md:py-16' 
        : 'py-20 md:py-28 bg-surface-container-low border-y border-outline-variant/10'
    }`}>
      {/* Decorative blurred background shapes */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10 animate-fade-in-up">
        
        {/* Standalone Header with Back Button */}
        {isStandalonePage && onBack ? (
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 border-b border-outline-variant/10 pb-8">
            <div className="flex items-center gap-4">
              <button 
                onClick={onBack}
                className="p-3 bg-white hover:bg-primary/5 text-primary border border-outline-variant/10 rounded-full transition-all duration-300 shadow-sm"
                aria-label="Back"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <span className="text-editorial-label text-primary uppercase tracking-widest font-semibold flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-primary" />
                  {lang === 'ENG' ? 'Alumni Legacy' : 'Abafundi Bethu Abadala'}
                </span>
                <h1 className="text-3xl md:text-5xl editorial-heading mt-1 text-primary">{activeLabels.headline}</h1>
              </div>
            </div>
          </div>
        ) : (
          /* Section Header for homepage/embed */
          <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
            <span className="text-editorial-label text-primary uppercase tracking-widest font-semibold flex items-center justify-center gap-2 mb-3">
              <GraduationCap className="w-5 h-5 text-primary animate-bounce" />
              {lang === 'ENG' ? 'Inspirational Post-Matric Journeys' : 'Uhambo Lokuzimisela Ngale KukaMatric'}
            </span>
            <h2 className="text-3xl md:text-5xl editorial-heading mb-6 tracking-tight text-primary">
              {activeLabels.headline}
            </h2>
            <p className="text-base md:text-lg text-secondary leading-relaxed font-light">
              {activeLabels.leadSubtitle}
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-stretch">
          
          {/* Alumni Selectors List (Left column on large screens) */}
          <div className="lg:col-span-4 flex flex-row lg:flex-col gap-4 overflow-x-auto lg:overflow-x-visible pb-4 lg:pb-0 scrollbar-none">
            {ALUMNI_DATA.map((alumnus, idx) => {
              const isActive = idx === activeIndex;
              return (
                <button
                  key={alumnus.id}
                  onClick={() => setActiveIndex(idx)}
                  className={`flex-shrink-0 lg:flex-shrink w-72 lg:w-full text-left p-4 rounded-lg border transition-all duration-300 flex items-center gap-4 ${
                    isActive 
                      ? 'bg-primary border-primary text-white shadow-md scale-[1.01]' 
                      : 'bg-white border-outline-variant/15 text-on-surface hover:shadow-sm hover:border-outline-variant/30'
                  }`}
                >
                  <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 border shadow-xs">
                    <img 
                      src={alumnus.image} 
                      alt={alumnus.name}
                      className="w-full h-full object-cover object-top"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="overflow-hidden">
                    <p className={`font-headline font-bold text-sm md:text-base truncate ${isActive ? 'text-white' : 'text-primary'}`}>
                      {alumnus.name}
                    </p>
                    <p className={`text-[10px] mt-0.5 truncate uppercase tracking-wider font-bold ${isActive ? 'text-[#FFD700]' : 'text-secondary/80'}`}>
                      {activeLabels.classOfLabel} {alumnus.classOf}
                    </p>
                    <p className={`text-[10px] truncate ${isActive ? 'text-white/80' : 'text-secondary/60 font-light'}`}>
                      {lang === 'ENG' ? alumnus.careerENG : alumnus.careerZUL}
                    </p>
                  </div>
                </button>
              );
            })}

            {/* Quick action inspiration helper */}
            <div className="hidden lg:block mt-6 bg-gradient-to-br from-primary/5 to-amber-500/5 p-6 rounded-lg border border-primary/10">
              <div className="flex items-center gap-2 text-primary mb-2">
                <Sparkles className="w-4 h-4 text-amber-500 animate-pulse" />
                <h4 className="text-xs font-bold uppercase tracking-wider">{activeLabels.inspireTitle}</h4>
              </div>
              <p className="text-xs text-secondary leading-relaxed font-light">
                {activeLabels.inspireDesc}
              </p>
            </div>
          </div>

          {/* Interactive Profile Details Card (Right column) */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentAlumnus.id}
                initial={{ opacity: 0, x: 25 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -25 }}
                transition={{ duration: 0.35 }}
                className="bg-white border border-outline-variant/10 shadow-lg rounded-sm overflow-hidden flex flex-col h-full justify-between"
              >
                <div className="p-6 md:p-10 space-y-6 md:space-y-8">
                  
                  {/* Top Name, Role & Location Metadata */}
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-outline-variant/15 pb-6">
                    <div className="flex flex-col md:flex-row items-center gap-5 text-center md:text-left">
                      {/* Premium real portrait image */}
                      <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden flex-shrink-0 border-4 border-slate-50 shadow-md">
                        <img 
                          src={currentAlumnus.image} 
                          alt={currentAlumnus.name}
                          className="w-full h-full object-cover object-top"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div>
                        <h3 className="text-2xl md:text-3xl font-headline font-black text-primary tracking-tight">
                          {currentAlumnus.name}
                        </h3>
                        <p className="text-xs md:text-sm font-bold text-red-700 uppercase tracking-wider mt-0.5">
                          {lang === 'ENG' ? currentAlumnus.careerENG : currentAlumnus.careerZUL}
                        </p>
                        <p className="text-xs text-secondary font-medium mt-1 flex items-center justify-center md:justify-start gap-1">
                          <Briefcase className="w-3.5 h-3.5 text-secondary/60" />
                          {lang === 'ENG' ? currentAlumnus.companyENG : currentAlumnus.companyZUL}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-row md:flex-col items-center md:items-end justify-center md:justify-start gap-3 md:gap-1.5">
                      <span className="bg-primary text-white text-[10px] md:text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-sm">
                        🎓 {activeLabels.classOfLabel} {currentAlumnus.classOf}
                      </span>
                      <span className="text-[10px] md:text-xs text-secondary flex items-center gap-1 font-light">
                        <MapPin className="w-3.5 h-3.5 text-red-600" />
                        {lang === 'ENG' ? currentAlumnus.locationENG : currentAlumnus.locationZUL}
                      </span>
                    </div>
                  </div>

                  {/* Graduate Bio */}
                  <div>
                    <p className="text-base md:text-lg text-secondary leading-relaxed font-light mb-4 text-center md:text-left">
                      {lang === 'ENG' ? currentAlumnus.bioENG : currentAlumnus.bioZUL}
                    </p>
                  </div>

                  {/* Career & Academic Journey Pathway Flow (Styled as timeline link blocks) */}
                  <div className="bg-surface p-4 md:p-6 border-l-4 border-primary rounded-r-sm">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-primary block mb-3">
                      🗺️ {activeLabels.careerPath}
                    </span>
                    <p className="text-xs md:text-sm font-semibold text-on-surface leading-relaxed">
                      {lang === 'ENG' ? currentAlumnus.pathENG : currentAlumnus.pathZUL}
                    </p>
                  </div>

                  {/* Advice quote */}
                  <div className="relative p-6 md:p-8 bg-red-50/40 border border-red-100 italic rounded-lg">
                    <Quote className="absolute -top-3 left-4 w-8 h-8 text-red-600/10 fill-red-600/5 rotate-180" />
                    <span className="text-[10px] text-red-700 font-bold uppercase tracking-widest block mb-2 not-italic">
                      🎯 {activeLabels.adviceLabel}
                    </span>
                    <p className="text-xs md:text-sm md:text-base font-medium text-secondary/95 leading-relaxed pl-1">
                      {lang === 'ENG' ? currentAlumnus.adviceENG : currentAlumnus.adviceZUL}
                    </p>
                  </div>

                  {/* Matric achievements highlight pill elements */}
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-widest text-secondary block mb-3 text-center md:text-left">
                      🏆 {activeLabels.achievementsLabel}
                    </span>
                    <div className="flex flex-wrap justify-center md:justify-start gap-2 text-xs">
                      {(lang === 'ENG' ? currentAlumnus.matricAchievementsENG : currentAlumnus.matricAchievementsZUL).map((ach, idx) => (
                        <span 
                          key={idx} 
                          className="bg-white border border-outline-variant/15 text-primary text-[10px] md:text-xs font-semibold px-3 py-1.5 rounded-sm flex items-center gap-1.5"
                        >
                          <Award className="w-3.5 h-3.5 text-amber-500" />
                          {ach}
                        </span>
                      ))}
                    </div>
                  </div>

                </div>

                {/* Footer Controls */}
                <div className="bg-surface border-t border-outline-variant/10 p-4 md:p-6 flex items-center justify-between gap-4">
                  <div className="flex gap-2">
                    <button
                      onClick={handlePrev}
                      className="p-3 bg-white hover:bg-primary hover:text-white border border-outline-variant/15 text-primary rounded transition-all"
                      aria-label="Previous Alumnus"
                    >
                      <ArrowLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={handleNext}
                      className="p-3 bg-white hover:bg-primary hover:text-white border border-outline-variant/15 text-primary rounded transition-all"
                      aria-label="Next Alumnus"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>

                  <span className="text-[11px] font-mono tracking-widest text-secondary font-semibold uppercase">
                    🎓 Alumnus {activeIndex + 1} of {ALUMNI_DATA.length}
                  </span>
                </div>

              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}
