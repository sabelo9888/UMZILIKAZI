import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  User, 
  BookOpen, 
  Award, 
  GraduationCap, 
  Briefcase, 
  Mail, 
  Sparkles,
  Search,
  Filter
} from 'lucide-react';

interface StaffMember {
  id: string;
  name: string;
  roleENG: string;
  roleZUL: string;
  dept: 'management' | 'sciences' | 'humanities';
  subjectsENG: string[];
  subjectsZUL: string[];
  bioENG: string;
  bioZUL: string;
  experience: string;
  initials: string;
  colorClass: string;
}

const STAFF_DATA: StaffMember[] = [
  {
    id: 'staff_1',
    name: 'Mr. M. S. Zulu',
    roleENG: 'Principal / Head of School',
    roleZUL: 'UThishanhloko / Umphathi Wesikole',
    dept: 'management',
    subjectsENG: ['School Governance', 'History'],
    subjectsZUL: ['Ukuphathwa Kwasetshenziswa', 'Umlando'],
    bioENG: 'Under Mr. Zulu\'s visionary leadership for over 15 years, Umzilikazi has achieved standard 100% matric pass rates and established itself as a beacon of discipline and excellence in the Amajuba District.',
    bioZUL: 'Ngaphansi kobuholi obuqotho bukaMnu. Zulu iminyaka engaphezu kwengu-15, isikole saseMzilikazi sizuze amaphuzu aphelele angu-100% kumatikuletsheni, nokuqinisekisile ukuthi siba isibuko sokuziphatha kahle emfundweni.',
    experience: '28 Years',
    initials: 'MZ',
    colorClass: 'from-red-600 to-amber-600'
  },
  {
    id: 'staff_2',
    name: 'Mrs. N. F. Buthelezi',
    roleENG: 'Deputy Principal',
    roleZUL: 'Isekela Likathishanhloko',
    dept: 'management',
    subjectsENG: ['Mathematics', 'Physical Sciences'],
    subjectsZUL: ['I-Mathematics', 'I-Physical Sciences'],
    bioENG: 'A passionate advocate for STEM education, Mrs. Buthelezi streamlines the curriculum delivery, steering active tutoring systems, and fostering our elite math and science achievements.',
    bioZUL: 'Ulwela imfundo yezesayensi nezobuchwepheshe, uNkk. Buthelezi uqinisekisa ukuthunyelwa kohlelo lokufunda ngendlela egculisayo nokuqhuba izinhlelo zokufundisa ezikhethekile zezibalo.',
    experience: '22 Years',
    initials: 'NB',
    colorClass: 'from-[#b3000d] to-red-500'
  },
  {
    id: 'staff_3',
    name: 'Mr. S. M. Nkosi',
    roleENG: 'Head of Department: Sciences',
    roleZUL: 'Inhloko YoMnyango: EzeSayensi',
    dept: 'sciences',
    subjectsENG: ['Life Sciences', 'Agricultural Sciences'],
    subjectsZUL: ['I-Life Sciences', 'I-Agricultural Sciences'],
    bioENG: 'Mr. Nkosi champions student research projects and coordinates our daily afternoon matric study networks. He firmly believes hands-on agricultural studies foster community sustainability.',
    bioZUL: 'UMnu. Nkosi ukhuthaza amaphrojekthi wocwaningo lwabafundi baphinde baqhube amaqembu okufunda ntambama. Ukholelwa ukuthi ezolimo ziqinisekisa ukusimama komphakathi wetshu.',
    experience: '16 Years',
    initials: 'SN',
    colorClass: 'from-amber-500 to-yellow-600'
  },
  {
    id: 'staff_4',
    name: 'Miss T. P. Shabalala',
    roleENG: 'Head of Department: Languages',
    roleZUL: 'Inhloko YoMnyango: Izilimi',
    dept: 'humanities',
    subjectsENG: ['English First Additional Language', 'isiZulu Home Language'],
    subjectsZUL: ['IsiNgisi', 'IsiZulu'],
    bioENG: 'Miss Shabalala believes in preserving local heritage while empowering learners with international communication skills. She heads the debating union and school editorial board.',
    bioZUL: 'UNkosazana Shabalala ukholelwa ekulondolozeni amagugu emveli ngenkathi enikeza abafundi amakhono okuxhumana omhlaba. Uhola iqembu lempikiswano neyamabhuku yesikole.',
    experience: '14 Years',
    initials: 'TS',
    colorClass: 'from-red-700 to-rose-500'
  },
  {
    id: 'staff_5',
    name: 'Mr. J. B. Smith',
    roleENG: 'Senior Commercial Educator',
    roleZUL: 'Uthisha Omkhulu Wezohwebo',
    dept: 'humanities',
    subjectsENG: ['Accounting', 'Business Studies'],
    subjectsZUL: ['I-Accounting', 'I-Business Studies'],
    bioENG: 'An enthusiastic educator who instills strong entrepreneurial ethics and commercial knowledge, preparing high-performance learners for economic success after their secondary education.',
    bioZUL: 'Uthisha oshisekayo ogxilisa isimilo esiqotho sezozibhizinisi nolwazi lwezohwebo kubafundi bethu, ebalungiselela uhambo lwangemva kwesikole esiphakeme.',
    experience: '18 Years',
    initials: 'JS',
    colorClass: 'from-red-800 to-amber-700'
  },
  {
    id: 'staff_6',
    name: 'Mrs. L. G. Dlamini',
    roleENG: 'Senior Humanities Educator',
    roleZUL: 'Uthisha Omkhulu Wezobuntu',
    dept: 'humanities',
    subjectsENG: ['Geography', 'Tourism'],
    subjectsZUL: ['I-Geography', 'I-Tourism'],
    bioENG: 'Dedicated to cultivating environmental stewardship and tourism sector insights, Mrs. Dlamini organizes local field studies mapping geographic features and South African wonders.',
    bioZUL: 'Uzinikele ekuhlinzekeni ukuvikeleka kwemvelo kanye nokuqonda umkhakha wezokuvakasha. UNkk. Dlamini uhlela uhambo lwangaphandle lokuhlola i-Geography nezindawo zezwe lethu.',
    experience: '12 Years',
    initials: 'LD',
    colorClass: 'from-orange-600 to-amber-500'
  }
];

interface StaffDirectoryProps {
  lang: 'ENG' | 'ZUL';
  cmsData?: any;
}

export default function StaffDirectory({ lang, cmsData }: StaffDirectoryProps) {
  const [selectedDept, setSelectedDept] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const l = {
    ENG: {
      sectionTitle: 'Our Dedicated Faculty',
      sectionSubtitle: 'Meet the passionate educators and leaders guiding the minds of tomorrow and upholding our 100% pass legacy.',
      placeholderIndicator: '📸 Photos coming soon',
      experienceLabel: 'Experience',
      subjectsLabel: 'Subjects',
      filterAll: 'All Faculty',
      filterMgmt: 'Management',
      filterSciences: 'Sciences & Math',
      filterHumanities: 'Languages & Humanities',
      searchPlaceholder: 'Search staff by name or role...',
      noResults: 'No staff members found matching your search.'
    },
    ZUL: {
      sectionTitle: 'Othisha Bethu Abazinikele',
      sectionSubtitle: 'Hlangana nabafundisi abashisekayo nabaholi abaqondisa izingqondo zakusasa futhi bamele umlando wokuphasa no-100%.',
      placeholderIndicator: '📸 Izithombe ziyeza maduze',
      experienceLabel: 'Isipiliyoni',
      subjectsLabel: 'Izifundo',
      filterAll: 'Bonke Othisha',
      filterMgmt: 'Abaphathi',
      filterSciences: 'Ezesayensi neZibalo',
      filterHumanities: 'Izilimi neZobuntu',
      searchPlaceholder: 'Hlola othisha ngegama noma ngomsebenzi...',
      noResults: 'Abekho othisha abatholakele abahambisana nalokho okuhlolayo.'
    }
  };

  const activeLabels = lang === 'ENG' ? l.ENG : l.ZUL;

  const staffArray = (cmsData?.staff && cmsData.staff.length > 0) ? cmsData.staff : STAFF_DATA;

  const filteredStaff = staffArray.filter((member: StaffMember) => {
    const matchesDept = selectedDept === 'all' || member.dept === selectedDept;
    
    const roleText = lang === 'ENG' ? member.roleENG : member.roleZUL;
    const subjectsText = lang === 'ENG' ? member.subjectsENG.join(' ') : member.subjectsZUL.join(' ');
    const bioText = lang === 'ENG' ? member.bioENG : member.bioZUL;

    const matchesSearch = member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          roleText.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          subjectsText.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          bioText.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesDept && matchesSearch;
  });

  return (
    <section className="py-20 bg-surface-container-lowest border-t border-outline-variant/10">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-editorial-label text-primary uppercase tracking-widest font-semibold flex items-center justify-center gap-2 mb-3">
            <Award className="w-4 h-4 text-primary" />
            {lang === 'ENG' ? 'Leaders & Educators' : 'Abaholi Nothisha'}
          </span>
          <h2 className="text-3xl md:text-5xl editorial-heading mb-6">{activeLabels.sectionTitle}</h2>
          <p className="text-base md:text-lg text-secondary leading-relaxed font-light">
            {activeLabels.sectionSubtitle}
          </p>
        </div>

        {/* Filters and Search toolbar */}
        <div className="bg-white p-4 md:p-6 rounded-lg border border-outline-variant/10 shadow-sm mb-12 flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Department Filter buttons */}
          <div className="flex gap-2 flex-wrap justify-center md:justify-start w-full md:w-auto">
            {[
              { id: 'all', label: activeLabels.filterAll },
              { id: 'management', label: activeLabels.filterMgmt },
              { id: 'sciences', label: activeLabels.filterSciences },
              { id: 'humanities', label: activeLabels.filterHumanities }
            ].map(btn => (
              <button
                key={btn.id}
                onClick={() => setSelectedDept(btn.id)}
                className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-all duration-300 rounded-full ${
                  selectedDept === btn.id
                    ? 'bg-primary text-white shadow-xs'
                    : 'bg-surface-container hover:bg-surface-container-high text-secondary'
                }`}
              >
                {btn.label}
              </button>
            ))}
          </div>

          {/* Search Input bar */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary/50 w-4 h-4" />
            <input
              type="text"
              placeholder={activeLabels.searchPlaceholder}
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-outline-variant/20 rounded text-xs md:text-sm focus:outline-none focus:border-primary bg-white transition-all"
            />
          </div>
        </div>

        {/* Grid List */}
        <AnimatePresence mode="popLayout">
          {filteredStaff.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredStaff.map((member, idx) => (
                <motion.div
                  key={member.id}
                  layout="position"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  className="bg-white border border-outline-variant/10 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col group h-full"
                >
                  {/* Photo Placeholder Container */}
                  <div className="relative aspect-[4/3] bg-surface-container flex items-center justify-center overflow-hidden border-b border-outline-variant/5">
                    {/* Abstract colorful geometric backdrop matching their role */}
                    <div className="absolute inset-0 bg-radial from-transparent to-black/10 opacity-30 pointer-events-none" />
                    
                    {/* Aesthetic gradient initials avatar placeholder requested by user */}
                    <div className={`w-28 h-28 rounded-full bg-gradient-to-br ${member.colorClass} text-white flex flex-col items-center justify-center shadow-lg transform group-hover:scale-105 transition-transform duration-500 border-4 border-white`}>
                      <span className="text-3xl font-headline font-black tracking-tight">{member.initials}</span>
                      <Briefcase className="w-4 h-4 text-white/80 mt-1" />
                    </div>

                    {/* Badge Indicator for placeholder status */}
                    <span className="absolute bottom-3 right-3 bg-black/70 text-white text-[9px] uppercase tracking-widest font-mono py-1 px-2.5 rounded-sm backdrop-blur-xs font-semibold">
                      {activeLabels.placeholderIndicator}
                    </span>
                    
                    {/* Soft Experience badge at top */}
                    <div className="absolute top-3 left-3 bg-primary/10 text-primary border border-primary/25 text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-sm">
                      🕒 {member.experience} {lang === 'ENG' ? 'Exp' : 'Isipil'}
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 md:p-8 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Name & Role */}
                      <span className="text-[10px] md:text-editorial-label font-bold text-primary uppercase tracking-wider block mb-1">
                        {lang === 'ENG' ? member.roleENG : member.roleZUL}
                      </span>
                      <h3 className="text-xl md:text-2xl font-headline font-black text-on-surface mb-3 tracking-tight">
                        {member.name}
                      </h3>
                      
                      {/* Professional Bio */}
                      <p className="text-xs md:text-sm text-secondary font-light leading-relaxed mb-6 italic">
                        "{lang === 'ENG' ? member.bioENG : member.bioZUL}"
                      </p>
                    </div>

                    {/* Specialized Subjects chips */}
                    <div className="border-t border-outline-variant/10 pt-4">
                      <span className="text-[9px] uppercase tracking-widest font-bold text-secondary/60 block mb-2">
                        📚 {activeLabels.subjectsLabel}
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {(lang === 'ENG' ? member.subjectsENG : member.subjectsZUL).map((subject, sIdx) => (
                          <span 
                            key={sIdx} 
                            className="bg-surface text-secondary text-[10px] md:text-xs font-medium px-2.5 py-1 border border-outline-variant/10 rounded-sm"
                          >
                            {subject}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="py-16 text-center border border-outline-variant/10 rounded bg-white">
              <User className="w-12 h-12 text-secondary/30 mx-auto mb-4" />
              <p className="text-secondary text-sm font-medium">
                {activeLabels.noResults}
              </p>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
