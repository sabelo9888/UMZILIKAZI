import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Award, BookOpen, ChevronRight } from 'lucide-react';

interface StaffMember {
  id: string;
  name: string;
  roleENG: string;
  roleZUL: string;
  subjectsENG: string[];
  subjectsZUL: string[];
  image: string;
}

const STAFF_DATA: StaffMember[] = [
  {
    id: 'staff_1',
    name: 'Chaun Brown',
    roleENG: 'Agricultural Sciences Educator',
    roleZUL: 'Uthisha Wezezolimo',
    subjectsENG: ['Agricultural Sciences'],
    subjectsZUL: ['EzoLimo'],
    image: 'https://i.ibb.co/0jfNbNY2/file-00000000424871f4b7686970fd65031a.png'
  },
  {
    id: 'staff_2',
    name: 'Mandisa Dlamini',
    roleENG: 'isiZulu Language Educator',
    roleZUL: 'Uthisha weSizulu',
    subjectsENG: ['isiZulu Home Language'],
    subjectsZUL: ['IsiZulu'],
    image: 'https://i.ibb.co/VcR2k0Px/file-0000000054f471f4a64889b669a6299e.png'
  },
  {
    id: 'staff_3',
    name: 'Xolani Mazibuko',
    roleENG: 'History Educator',
    roleZUL: 'Uthisha Wezomlando',
    subjectsENG: ['History'],
    subjectsZUL: ['Umlando'],
    image: 'https://i.ibb.co/Fqx6QF64/file-000000009c5c7243b919ae40f5f54a62.png'
  }
];

interface StaffDirectoryProps {
  lang: 'ENG' | 'ZUL';
  cmsData?: any;
  onSeeMore?: () => void;
}

export default function StaffDirectory({ lang, onSeeMore }: StaffDirectoryProps) {
  const t = {
    ENG: {
      sectionTitle: 'Our Dedicated Teaching Staff',
      sectionSubtitle: 'Meet the passionate educators guiding our learners toward dynamic academic growth and our 100% pass rate legacy.',
      subjectsLabel: 'Subjects',
      seeMore: 'See More Staff',
    },
    ZUL: {
      sectionTitle: 'Othisha Bethu Abazinikele',
      sectionSubtitle: 'Hlangana nabafundisi abashisekayo abaqondisa abafundi bethu ekukhuleni kwezemfundo nomlando we-100%.',
      subjectsLabel: 'Izifundo',
      seeMore: 'Bona Othisha Abanye',
    }
  };

  const activeLabels = lang === 'ENG' ? t.ENG : t.ZUL;

  const displayedStaff = STAFF_DATA;

  return (
    <section className="py-16 md:py-24 bg-slate-50 border-b border-outline-variant/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 md:mb-12">
          <span className="text-editorial-label text-primary uppercase tracking-widest font-semibold flex items-center justify-center gap-2 mb-2 sm:mb-3">
            <Award className="w-4 h-4 text-primary" />
            {lang === 'ENG' ? 'Leaders & Educators' : 'Abaholi Nothisha'}
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-5xl editorial-heading mb-3 md:mb-6">{activeLabels.sectionTitle}</h2>
          <p className="text-xs sm:text-base md:text-lg text-secondary leading-relaxed font-light">
            {activeLabels.sectionSubtitle}
          </p>
        </div>

        {/* Responsive Grid List: 2 columns on mobile, 3 columns on desktop */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-6 md:gap-8 max-w-5xl mx-auto justify-center">
          <AnimatePresence mode="popLayout">
            {displayedStaff.map((member, idx) => (
              <motion.div
                key={member.id}
                layout
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="bg-white border border-outline-variant/10 rounded-xl p-2 sm:p-4 md:p-5 shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col group justify-between"
              >
                <div>
                  {/* Photo Container: aspect-square, elegant and small on mobile */}
                  <div className="relative aspect-square bg-surface-container rounded-lg overflow-hidden mb-3 border border-outline-variant/5">
                    <img 
                      src={member.image} 
                      alt={member.name}
                      referrerPolicy="no-referrer"
                      className="absolute inset-0 w-full h-full object-cover object-top transform group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  {/* Body Content */}
                  <div>
                    <span className="text-[8px] sm:text-[11px] font-bold text-primary uppercase tracking-wider block mb-0.5 sm:mb-1">
                      {lang === 'ENG' ? member.roleENG : member.roleZUL}
                    </span>
                    <h3 className="text-[11px] sm:text-lg font-headline font-black text-on-surface mb-2 sm:mb-3 tracking-tight leading-tight">
                      {member.name}
                    </h3>
                  </div>
                </div>

                {/* Subjects listing */}
                <div className="border-t border-outline-variant/10 pt-2 mt-2 sm:mt-4">
                  <span className="text-[8px] sm:text-[9px] uppercase tracking-widest font-bold text-secondary/60 block mb-1 flex items-center gap-1">
                    <BookOpen className="w-2.5 h-2.5 text-secondary/60" />
                    {activeLabels.subjectsLabel}
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {(lang === 'ENG' ? member.subjectsENG : member.subjectsZUL).map((subject, sIdx) => (
                      <span 
                        key={sIdx} 
                        className="bg-surface text-secondary text-[8px] sm:text-xs font-medium px-1.5 sm:px-2.5 py-0.5 border border-outline-variant/10 rounded-sm"
                      >
                        {subject}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* See More Navigation Button (Saves on home page and redirects to the About page) */}
        {onSeeMore && (
          <div className="mt-8 text-center max-w-lg mx-auto flex flex-col items-center gap-3">
            <button
              onClick={onSeeMore}
              className="px-6 py-2.5 bg-primary text-white hover:bg-red-700 shadow-sm hover:shadow transition-all text-xs font-bold uppercase tracking-widest rounded-full flex items-center gap-2 cursor-pointer border border-transparent"
            >
              {activeLabels.seeMore}
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
