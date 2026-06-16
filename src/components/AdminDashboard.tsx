import React, { useState, useEffect } from 'react';
import { 
  Lock, 
  Settings, 
  Calendar, 
  Newspaper, 
  MessageSquare, 
  Plus, 
  Trash2, 
  Save, 
  LogOut, 
  RefreshCw, 
  Check, 
  X, 
  ArrowLeft,
  LayoutDashboard,
  Home,
  Users,
  FileText,
  ChevronRight
} from 'lucide-react';
import { motion } from 'motion/react';

interface AdminDashboardProps {
  lang: 'ENG' | 'ZUL';
  onBack: () => void;
  cmsData: any;
  onRefreshCMS: () => void;
}

const DEFAULT_STAFF = [
  {
    id: 'staff_1',
    name: 'Chaun Brown',
    roleENG: 'Agricultural Sciences Educator',
    roleZUL: 'Uthisha Wezezolimo',
    dept: 'sciences',
    subjectsENG: ['Agricultural Sciences'],
    subjectsZUL: ['EzoLimo'],
    bioENG: 'Agricultural sciences teacher devoted to practical farming and agro-development.',
    bioZUL: 'Uthisha wezolimo ozinikele ekulimeni okuphathekayo kanye nentuthuko kwezolimo.',
    experience: '8 Years',
    initials: 'CB',
    colorClass: 'from-amber-600 to-yellow-600',
    image: 'https://i.ibb.co/0jfNbNY2/file-00000000424871f4b7686970fd65031a.png'
  },
  {
    id: 'staff_2',
    name: 'Mandisa Dlamini',
    roleENG: 'isiZulu Language Educator',
    roleZUL: 'Uthisha weSizulu',
    dept: 'humanities',
    subjectsENG: ['isiZulu Home Language'],
    subjectsZUL: ['IsiZulu'],
    bioENG: 'Teaching isiZulu language, poetry, cultural preservation, and literature.',
    bioZUL: 'Ukufundisa ulimi lwesisizulu, izinkondlo, ukulondolozwa kwesiko kanye nezincwadi.',
    experience: '12 Years',
    initials: 'MD',
    colorClass: 'from-red-600 to-rose-500',
    image: 'https://i.ibb.co/VcR2k0Px/file-0000000054f471f4a64889b669a6299e.png'
  },
  {
    id: 'staff_3',
    name: 'Xolani Mazibuko',
    roleENG: 'History Educator',
    roleZUL: 'Uthisha Wezomlando',
    dept: 'humanities',
    subjectsENG: ['History'],
    subjectsZUL: ['Umlando'],
    bioENG: 'Educator centered on South African history, oral traditions, and world events.',
    bioZUL: 'Uthisha ogxile emlandweni waseNingizimu Afrika, amasiko omlomo, kanye nezehlakalo zomhlaba.',
    experience: '10 Years',
    initials: 'XM',
    colorClass: 'from-red-800 to-amber-700',
    image: 'https://i.ibb.co/Fqx6QF64/file-000000009c5c7243b919ae40f5f54a62.png'
  }
];

export default function AdminDashboard({ lang, onBack, cmsData, onRefreshCMS }: AdminDashboardProps) {
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginError, setLoginError] = useState('');
  
  // Sidebar view state
  const [activeView, setActiveView] = useState<'homepage' | 'staff' | 'admissions'>('homepage');

  // sub-tabs for Edit Homepage screen
  const [activeHomeTab, setActiveHomeTab] = useState<'info' | 'announcements' | 'news' | 'calendar'>('info');

  // CMS state variables - Banners & Modals
  const [bannerEng, setBannerEng] = useState('');
  const [bannerZul, setBannerZul] = useState('');
  const [modalTitleEng, setModalTitleEng] = useState('');
  const [modalTitleZul, setModalTitleZul] = useState('');
  const [modalMsgEng, setModalMsgEng] = useState('');
  const [modalMsgZul, setModalMsgZul] = useState('');

  // Homepage Editorial News states
  const [newsTitleEng, setNewsTitleEng] = useState('');
  const [newsTitleZul, setNewsTitleZul] = useState('');
  const [newsExcerptEng, setNewsExcerptEng] = useState('');
  const [newsExcerptZul, setNewsExcerptZul] = useState('');
  const [newsContentEngLines, setNewsContentEngLines] = useState<string[]>([]);
  const [newsContentZulLines, setNewsContentZulLines] = useState<string[]>([]);

  // Homepage General texts states
  const [heroTitleEng, setHeroTitleEng] = useState('');
  const [heroTitleZul, setHeroTitleZul] = useState('');
  const [heroDescEng, setHeroDescEng] = useState('');
  const [heroDescZul, setHeroDescZul] = useState('');
  const [mottoEng, setMottoEng] = useState('');
  const [mottoZul, setMottoZul] = useState('');
  const [welcomeTitleEng, setWelcomeTitleEng] = useState('');
  const [welcomeTitleZul, setWelcomeTitleZul] = useState('');
  const [welcomeDescEng, setWelcomeDescEng] = useState('');
  const [welcomeDescZul, setWelcomeDescZul] = useState('');
  const [principalQuoteEng, setPrincipalQuoteEng] = useState('');
  const [principalQuoteZul, setPrincipalQuoteZul] = useState('');

  // Admissions state variables
  const [admissionTitleEng, setAdmissionTitleEng] = useState('');
  const [admissionTitleZul, setAdmissionTitleZul] = useState('');
  const [admissionSubtitleEng, setAdmissionSubtitleEng] = useState('');
  const [admissionSubtitleZul, setAdmissionSubtitleZul] = useState('');
  const [admissionNoticeEng, setAdmissionNoticeEng] = useState('');
  const [admissionNoticeZul, setAdmissionNoticeZul] = useState('');
  const [requirementsTitleEng, setRequirementsTitleEng] = useState('');
  const [requirementsTitleZul, setRequirementsTitleZul] = useState('');
  const [requirementsEng, setRequirementsEng] = useState<string[]>([]);
  const [requirementsZul, setRequirementsZul] = useState<string[]>([]);
  const [grade8EnrollEng, setGrade8EnrollEng] = useState('');
  const [grade8EnrollZul, setGrade8EnrollZul] = useState('');
  const [grade8DescEng, setGrade8DescEng] = useState('');
  const [grade8DescZul, setGrade8DescZul] = useState('');
  const [transferStudentsEng, setTransferStudentsEng] = useState('');
  const [transferStudentsZul, setTransferStudentsZul] = useState('');
  const [transferDescEng, setTransferDescEng] = useState('');
  const [transferDescZul, setTransferDescZul] = useState('');
  const [googleFormEmbedUrl, setGoogleFormEmbedUrl] = useState('');

  // Staff States
  const [staffList, setStaffList] = useState<any[]>([]);
  // Form add state
  const [newStaffName, setNewStaffName] = useState('');
  const [newStaffRoleEng, setNewStaffRoleEng] = useState('');
  const [newStaffRoleZul, setNewStaffRoleZul] = useState('');
  const [newStaffDept, setNewStaffDept] = useState<'management' | 'sciences' | 'humanities'>('management');
  const [newStaffExperience, setNewStaffExperience] = useState('10 Years');
  const [newStaffSubjectsEng, setNewStaffSubjectsEng] = useState('');
  const [newStaffSubjectsZul, setNewStaffSubjectsZul] = useState('');
  const [newStaffBioEng, setNewStaffBioEng] = useState('');
  const [newStaffBioZul, setNewStaffBioZul] = useState('');
  const [newStaffInitials, setNewStaffInitials] = useState('');
  const [newStaffColor, setNewStaffColor] = useState('from-red-600 to-amber-600');

  // Calendar states
  const [calendarEng, setCalendarEng] = useState<any[]>([]);
  const [calendarZul, setCalendarZul] = useState<any[]>([]);
  const [selectedMonth, setSelectedMonth] = useState(0);
  const [newEventDate, setNewEventDate] = useState('');
  const [newEventTitleEng, setNewEventTitleEng] = useState('');
  const [newEventTitleZul, setNewEventTitleZul] = useState('');
  const [newEventType, setNewEventType] = useState<'academic' | 'event' | 'holiday' | 'exam'>('event');

  // Execution states
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<{ success?: boolean; message?: string } | null>(null);

  // Load from props or defaults
  useEffect(() => {
    if (localStorage.getItem('umzilikazi_admin_auth') === 'true') {
      setIsLoggedIn(true);
      const savedPass = localStorage.getItem('umzilikazi_admin_pass') || '';
      setPassword(savedPass);
    }
  }, []);

  useEffect(() => {
    if (cmsData) {
      const txt = cmsData.textResources || {};
      setBannerEng(txt.juneExamBannerText_ENG || '');
      setBannerZul(txt.juneExamBannerText_ZUL || '');
      setModalTitleEng(txt.juneExamModalTitle_ENG || '');
      setModalTitleZul(txt.juneExamModalTitle_ZUL || '');
      setModalMsgEng(txt.juneExamModalMessage_ENG || '');
      setModalMsgZul(txt.juneExamModalMessage_ZUL || '');

      setNewsTitleEng(txt.newsArticle_ENG?.title || '');
      setNewsTitleZul(txt.newsArticle_ZUL?.title || '');
      setNewsExcerptEng(txt.newsArticle_ENG?.excerpt || '');
      setNewsExcerptZul(txt.newsArticle_ZUL?.excerpt || '');
      setNewsContentEngLines(txt.newsArticle_ENG?.content || []);
      setNewsContentZulLines(txt.newsArticle_ZUL?.content || []);

      // Homepage general fields info
      setHeroTitleEng(txt.heroTitle_ENG || 'Umzilikazi Senior Secondary');
      setHeroTitleZul(txt.heroTitle_ZUL || 'Isikole saseMzilikazi');
      setHeroDescEng(txt.heroDesc_ENG || 'As a leading rural high school in our district, we are dedicated to providing world-class education to every learner, proving that excellence is a choice, not a privilege.');
      setHeroDescZul(txt.heroDesc_ZUL || 'Njengoba siyisikole samabanga aphakeme esihamba phambili emakhaya esifundeni sethu, sizibophezele ekunikezeni imfundo esezingeni lomhlaba kuwo wonke umfundi, sikhombisa ukuthi ukusebenza kahle kuwukuzikhethela, hhayi ilungelo.');
      setMottoEng(txt.motto_ENG || '“Hlonipha Ze Uhlonishwe” — Respect so that you may be respected');
      setMottoZul(txt.motto_ZUL || '“Hlonipha ukuze nawe uhlonishwe”');
      setWelcomeTitleEng(txt.welcomeTitle_ENG || 'Welcome to Umzilikazi');
      setWelcomeTitleZul(txt.welcomeTitle_ZUL || 'Siyakwamukela eMzilikazi');
      setWelcomeDescEng(txt.welcomeDesc_ENG || 'Where excellence is not just a goal, but a way of life. We believe every child deserves the opportunity to succeed, regardless of their circumstances.');
      setWelcomeDescZul(txt.welcomeDesc_ZUL || 'Lapho ukusebenza kahle kungeyona nje inhloso, kodwa kuyindlela yokuphila. Sikholelwa ukuthi wonke umntwana ufanelwe yithuba lokuphumelela, kungakhathaliseki izimo zakhe.');
      setPrincipalQuoteEng(txt.principalQuote_ENG || '“Our teachers are the backbone of our success. Their dedication, sacrifice, and belief in every learner have transformed our school into a beacon of excellence.”');
      setPrincipalQuoteZul(txt.principalQuote_ZUL || '“Othisha bethu bayinsika yempumelelo yethu. Ukuzinikela kwabo, ukuzidela kwabo, nokukholelwa kwabo kuwo wonke umfundi kuguqule isikole sethu saba yisibani sokusebenza kahle.”');

      // Admissions general fields info
      setAdmissionTitleEng(txt.admissionTitle_ENG || 'Admissions & Enrolment');
      setAdmissionTitleZul(txt.admissionTitle_ZUL || 'Ukungeniswa Nokubhaliswa');
      setAdmissionSubtitleEng(txt.admissionSubtitle_ENG || 'Join a tradition of excellence and community pride.');
      setAdmissionSubtitleZul(txt.admissionSubtitle_ZUL || 'Joyina isiko lokusebenza kahle nokuziqhenya komphakathi.');
      setAdmissionNoticeEng(txt.admissionNotice_ENG || 'Important Notice: Applications for the 2027 academic year will be officially announced in mid-2026. Please check back for updates.');
      setAdmissionNoticeZul(txt.admissionNotice_ZUL || 'Isaziso Esibalulekile: Izicelo zonyaka wokufunda ka-2027 zizomenyezelwa ngokusemthethweni maphakathi no-2026. Sicela uphinde uhlole ukuze uthole imininingwane.');
      setRequirementsTitleEng(txt.requirementsTitle_ENG || 'Admission Requirements');
      setRequirementsTitleZul(txt.requirementsTitle_ZUL || 'Izidingo Zokungeniswa');
      
      setRequirementsEng(txt.requirements_ENG || [
        "Certified copy of Learner's Birth Certificate",
        "Latest School Report",
        "Transfer Letter from previous school",
        "Certified copy of Parent/Guardian ID",
        "Proof of Residence"
      ]);
      setRequirementsZul(txt.requirements_ZUL || [
        "Ikhophi eqinisekisiwe yesitifiketi sokuzalwa somfundi",
        "Umbiko wesikole wakamuva",
        "Incwadi yokudlulisa evela esikoleni sangaphambilini",
        "Ikhophi eqinisekisiwe kamazisi womzali/umbheki",
        "Ubufakazi bendawo yokuhlala"
      ]);

      setGrade8EnrollEng(txt.grade8Enroll_ENG || 'Grade 8 Enrolment');
      setGrade8EnrollZul(txt.grade8Enroll_ZUL || 'Ukubhaliswa kweBanga lesi-8');
      setGrade8DescEng(txt.grade8Desc_ENG || 'We prioritise learners from our local feeder primary schools in Emadlangeni and surrounding areas. Space is limited, so early application is encouraged once the window opens.');
      setGrade8DescZul(txt.grade8Desc_ZUL || 'Sibeka eqhulwini abafundi abavela ezikoleni zethu zamabanga aphansi zaseMadlangeni nezindawo ezizungezile. Isikhala silinganiselwe, ngakho-ke ukufaka isicelo kusenesikhathi kuyakhuthazwa uma iwindi livulwa.');
      
      setTransferStudentsEng(txt.transferStudents_ENG || 'Transfer Students');
      setTransferStudentsZul(txt.transferStudents_ZUL || 'Abafundi Abadluliswayo');
      setTransferDescEng(txt.transferDesc_ENG || 'Learners wishing to transfer into Grades 9-11 must provide a valid transfer letter and their most recent academic records for review by the School Governing Body.');
      setTransferDescZul(txt.transferDesc_ZUL || 'Abafundi abafuna ukudluliselwa emabangeni 9-11 kumele balethe incwadi yokudlulisa esemthethweni nemibiko yabo yakamuva yezemfundo ukuze ibuyekezwe yiBhodi elilawula isikole.');
      setGoogleFormEmbedUrl(txt.googleFormEmbedUrl || 'https://docs.google.com/forms/d/e/1FAIpQLSdyT_h0_D3XQhU1u1l-W8YvMhO_XlE-bPlC-7S3fI700oKstA/viewform?embedded=true');

      setCalendarEng(cmsData.calendarEvents_ENG || []);
      setCalendarZul(cmsData.calendarEvents_ZUL || []);
      
      setStaffList(cmsData.staff && cmsData.staff.length > 0 ? cmsData.staff : DEFAULT_STAFF);
    }
  }, [cmsData]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });
      const data = await res.json();
      if (data.success) {
        setIsLoggedIn(true);
        localStorage.setItem('umzilikazi_admin_auth', 'true');
        localStorage.setItem('umzilikazi_admin_pass', password);
      } else {
        setLoginError(data.message || 'Incorrect password.');
      }
    } catch (err) {
      setLoginError('Error connecting to Server API.');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setPassword('');
    localStorage.removeItem('umzilikazi_admin_auth');
    localStorage.removeItem('umzilikazi_admin_pass');
  };

  const saveAllCMS = async () => {
    setIsSaving(true);
    setSaveStatus(null);

    const payload = {
      password,
      textResources: {
        juneExamBannerText_ENG: bannerEng,
        juneExamBannerText_ZUL: bannerZul,
        juneExamModalTitle_ENG: modalTitleEng,
        juneExamModalTitle_ZUL: modalTitleZul,
        juneExamModalMessage_ENG: modalMsgEng,
        juneExamModalMessage_ZUL: modalMsgZul,
        
        newsArticle_ENG: {
          title: newsTitleEng,
          date: cmsData?.textResources?.newsArticle_ENG?.date || "2 months ago",
          author: cmsData?.textResources?.newsArticle_ENG?.author || "School Administration",
          excerpt: newsExcerptEng,
          content: newsContentEngLines
        },
        newsArticle_ZUL: {
          title: newsTitleZul,
          date: cmsData?.textResources?.newsArticle_ZUL?.date || "ezinyangeni ezi-2 ezedlule",
          author: cmsData?.textResources?.newsArticle_ZUL?.author || "Abaphathi Besikole",
          excerpt: newsExcerptZul,
          content: newsContentZulLines
        },

        // Homepage general info
        heroTitle_ENG: heroTitleEng,
        heroTitle_ZUL: heroTitleZul,
        heroDesc_ENG: heroDescEng,
        heroDesc_ZUL: heroDescZul,
        motto_ENG: mottoEng,
        motto_ZUL: mottoZul,
        welcomeTitle_ENG: welcomeTitleEng,
        welcomeTitle_ZUL: welcomeTitleZul,
        welcomeDesc_ENG: welcomeDescEng,
        welcomeDesc_ZUL: welcomeDescZul,
        principalQuote_ENG: principalQuoteEng,
        principalQuote_ZUL: principalQuoteZul,

        // Admissions general info
        admissionTitle_ENG: admissionTitleEng,
        admissionTitle_ZUL: admissionTitleZul,
        admissionSubtitle_ENG: admissionSubtitleEng,
        admissionSubtitle_ZUL: admissionSubtitleZul,
        admissionNotice_ENG: admissionNoticeEng,
        admissionNotice_ZUL: admissionNoticeZul,
        requirementsTitle_ENG: requirementsTitleEng,
        requirementsTitle_ZUL: requirementsTitleZul,
        requirements_ENG: requirementsEng,
        requirements_ZUL: requirementsZul,
        grade8Enroll_ENG: grade8EnrollEng,
        grade8Enroll_ZUL: grade8EnrollZul,
        grade8Desc_ENG: grade8DescEng,
        grade8Desc_ZUL: grade8DescZul,
        transferStudents_ENG: transferStudentsEng,
        transferStudents_ZUL: transferStudentsZul,
        transferDesc_ENG: transferDescEng,
        transferDesc_ZUL: transferDescZul,
        googleFormEmbedUrl: googleFormEmbedUrl
      },
      calendarEvents_ENG: calendarEng,
      calendarEvents_ZUL: calendarZul,
      staff: staffList
    };

    try {
      const res = await fetch('/api/admin/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (data.success) {
        setSaveStatus({ success: true, message: 'All changes saved & updated successfully!' });
        onRefreshCMS();
      } else {
        setSaveStatus({ success: false, message: data.message || 'Saving failed' });
      }
    } catch (err) {
      setSaveStatus({ success: false, message: 'Server API communication error.' });
    } finally {
      setIsSaving(false);
    }
  };

  // Content Paragraph Helpers
  const addNewsParagraph = (langType: 'ENG' | 'ZUL') => {
    if (langType === 'ENG') {
      setNewsContentEngLines([...newsContentEngLines, '']);
    } else {
      setNewsContentZulLines([...newsContentZulLines, '']);
    }
  };

  const removeNewsParagraph = (index: number, langType: 'ENG' | 'ZUL') => {
    if (langType === 'ENG') {
      setNewsContentEngLines(newsContentEngLines.filter((_, i) => i !== index));
    } else {
      setNewsContentZulLines(newsContentZulLines.filter((_, i) => i !== index));
    }
  };

  const handleNewsParagraphChange = (index: number, val: string, langType: 'ENG' | 'ZUL') => {
    if (langType === 'ENG') {
      const copy = [...newsContentEngLines];
      copy[index] = val;
      setNewsContentEngLines(copy);
    } else {
      const copy = [...newsContentZulLines];
      copy[index] = val;
      setNewsContentZulLines(copy);
    }
  };

  // Calendar Event Builders
  const addCalendarEvent = () => {
    if (!newEventDate || !newEventTitleEng || !newEventTitleZul) return;

    // Eng
    const updatedEng = [...calendarEng];
    const monthRecordEng = updatedEng.find(m => m.month === selectedMonth);
    if (monthRecordEng) {
      if (!monthRecordEng.events) monthRecordEng.events = [];
      monthRecordEng.events.push({ date: newEventDate, title: newEventTitleEng, type: newEventType });
    } else {
      updatedEng.push({ month: selectedMonth, events: [{ date: newEventDate, title: newEventTitleEng, type: newEventType }] });
    }

    // Zul
    const updatedZul = [...calendarZul];
    const monthRecordZul = updatedZul.find(m => m.month === selectedMonth);
    if (monthRecordZul) {
      if (!monthRecordZul.events) monthRecordZul.events = [];
      monthRecordZul.events.push({ date: newEventDate, title: newEventTitleZul, type: newEventType });
    } else {
      updatedZul.push({ month: selectedMonth, events: [{ date: newEventDate, title: newEventTitleZul, type: newEventType }] });
    }

    setCalendarEng(updatedEng);
    setCalendarZul(updatedZul);

    // Clear Form inputs
    setNewEventDate('');
    setNewEventTitleEng('');
    setNewEventTitleZul('');
  };

  const removeCalendarEvent = (monthIndex: number, eventIndex: number) => {
    const updatedEng = [...calendarEng];
    const mRecordEng = updatedEng.find(m => m.month === monthIndex);
    if (mRecordEng && mRecordEng.events) {
      mRecordEng.events.splice(eventIndex, 1);
    }

    const updatedZul = [...calendarZul];
    const mRecordZul = updatedZul.find(m => m.month === monthIndex);
    if (mRecordZul && mRecordZul.events) {
      mRecordZul.events.splice(eventIndex, 1);
    }

    setCalendarEng(updatedEng);
    setCalendarZul(updatedZul);
  };



  const monthNames = [
    'January (Masingana)', 'February (Nhlolanja)', 'March (Ndasa)', 'April (Mbasa)',
    'May (Nhlaba)', 'June (Nhlangulana)', 'July (Ntulikazi)', 'August (Ncwaba)',
    'September (Mpandula)', 'October (Mfumfu)', 'November (Lwezi)', 'December (Zibandlela)'
  ];

  // --- LOGIN SCREEN ---
  if (!isLoggedIn) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center bg-surface px-6">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md bg-white border border-outline/10 p-8 shadow-xl rounded-sm text-slate-800"
        >
          <div className="flex justify-between items-center mb-6">
            <button 
              onClick={onBack}
              className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest font-black text-secondary hover:text-primary transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to School Site
            </button>
            <Settings className="w-5 h-5 text-primary" />
          </div>

          <h2 className="text-2xl font-headline font-black text-primary tracking-tight uppercase mb-2">School CMS Gate</h2>
          <p className="text-xs text-secondary mb-6 leading-relaxed">
            Authorized administrative access only. Authenticate with your administrator password to edit pages, timetables, notifications, guidelines, and moderate user submissions.
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-[9px] uppercase tracking-widest text-secondary font-bold block mb-1">Administrator Password</label>
              <div className="relative">
                <input 
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 focus:border-primary rounded-sm text-sm font-bold"
                  required
                />
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
              </div>
            </div>

            {loginError && (
              <p className="text-xs text-red-650 font-bold bg-red-50 p-2.5 rounded-sm border border-red-100 flex items-center gap-2">
                ⚠️ {loginError}
              </p>
            )}

            <button 
              type="submit"
              className="w-full py-3.5 bg-primary text-white font-bold hover:bg-primary/95 transition-all text-xs tracking-widest uppercase cursor-pointer flex items-center justify-center gap-2 rounded-sm"
            >
              Sign In to Dashboard
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-100 text-[10px] text-center text-slate-400 font-medium">
            Default pass is <code className="bg-slate-100 px-1 py-0.5 rounded text-primary font-mono text-[9px]">admin2026</code>. Configure in Env variables.
          </div>
        </motion.div>
      </div>
    );
  }

  // --- CMS ADMINISTRATIVE PORTAL ---
  return (
    <div className="bg-slate-50 min-h-screen pb-32 text-slate-800">
      {/* Top Admin Header */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-20 shadow-xs">
        <div className="max-w-7xl mx-auto px-6 md:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-sm flex items-center justify-center">
              <LayoutDashboard className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h1 className="text-lg md:text-xl font-headline font-black text-primary tracking-tight uppercase leading-none">Administration Portal</h1>
              <p className="text-[9px] uppercase tracking-widest text-secondary font-bold mt-1">UMZILIKAZI SENIOR SECONDARY SCHOOL CMS</p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <button
              onClick={saveAllCMS}
              disabled={isSaving}
              className={`px-4 py-2.5 bg-green-700 text-white font-bold hover:bg-green-800 transition-colors text-xs tracking-widest uppercase rounded-sm flex items-center gap-1.5 cursor-pointer shadow-sm ${isSaving ? 'opacity-50 cursor-wait' : ''}`}
            >
              {isSaving ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
              Save All Changes
            </button>
            <button 
              onClick={handleLogout}
              className="px-3 py-2.5 bg-slate-100 text-slate-700 font-bold hover:bg-slate-200 transition-colors text-xs tracking-widest uppercase rounded-sm flex items-center gap-1.5 cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              Sign Out
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-8 mt-6">
        {/* Status Notification */}
        {saveStatus && (
          <div className={`p-4 mb-6 rounded-sm border flex items-center justify-between ${saveStatus.success ? 'bg-green-50 border-green-200 text-green-800' : 'bg-red-50 border-red-200 text-red-800'}`}>
            <span className="text-xs font-bold leading-relaxed">{saveStatus.message}</span>
            <button onClick={() => setSaveStatus(null)} className="text-slate-400 hover:text-slate-600">
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* --- MAIN SIDEBAR + WORKSPACE RESPONSIVE LAYOUT --- */}
        <div className="flex flex-col lg:flex-row gap-8 min-h-[70vh]">
          
          {/* SIDEBAR NAVIGATION PANEL */}
          <div className="w-full lg:w-64 shrink-0">
            <div className="bg-white border border-slate-200 shadow-xs p-4 rounded-sm sticky top-24">
              <p className="text-[9px] uppercase font-bold tracking-widest text-slate-400 mb-3 px-3">CMS NAVIGATION</p>
              <nav className="space-y-1">
                <button
                  type="button"
                  onClick={() => setActiveView('homepage')}
                  className={`w-full text-left px-3 py-2.5 rounded-sm text-xs font-bold uppercase tracking-wider flex items-center justify-between transition-all cursor-pointer ${
                    activeView === 'homepage' 
                      ? 'bg-primary text-white shadow-xs' 
                      : 'text-slate-600 hover:bg-slate-50 hover:text-primary'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <Home className="w-4 h-4" /> Edit Homepage
                  </span>
                  <ChevronRight className="w-3.5 h-3.5 opacity-60" />
                </button>

                <button
                  type="button"
                  onClick={() => setActiveView('staff')}
                  className={`w-full text-left px-3 py-2.5 rounded-sm text-xs font-bold uppercase tracking-wider flex items-center justify-between transition-all cursor-pointer ${
                    activeView === 'staff' 
                      ? 'bg-primary text-white shadow-xs' 
                      : 'text-slate-600 hover:bg-slate-50 hover:text-primary'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <Users className="w-4 h-4" /> Edit Staff List
                  </span>
                  <ChevronRight className="w-3.5 h-3.5 opacity-60" />
                </button>

                <button
                  type="button"
                  onClick={() => setActiveView('admissions')}
                  className={`w-full text-left px-3 py-2.5 rounded-sm text-xs font-bold uppercase tracking-wider flex items-center justify-between transition-all cursor-pointer ${
                    activeView === 'admissions' 
                      ? 'bg-primary text-white shadow-xs' 
                      : 'text-slate-600 hover:bg-slate-50 hover:text-primary'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <FileText className="w-4 h-4" /> Edit Admissions
                  </span>
                  <ChevronRight className="w-3.5 h-3.5 opacity-60" />
                </button>
              </nav>

              <div className="mt-8 pt-6 border-t border-slate-100 px-3">
                <span className="text-[8px] uppercase tracking-widest font-bold text-slate-400 block mb-1">Active View</span>
                <span className="text-xs font-black uppercase text-secondary tracking-wide">
                  {activeView} editor
                </span>
                <span className="text-[9px] text-slate-400 block mt-1.5 leading-relaxed">
                  Click 'Save All Changes' above to persist edits permanently to custom data store.
                </span>
              </div>
            </div>
          </div>

          {/* ACTIVE CANVAS WORKING SPACE */}
          <div className="flex-1 w-full min-w-0">

            {/* VIEW 1: EDIT HOMEPAGE */}
            {activeView === 'homepage' && (
              <div className="space-y-6 animate-fade-in">
                
                {/* Horizontal Inner Tab List */}
                <div className="bg-white p-2 border border-slate-200 shadow-xs rounded-sm mb-6 flex flex-wrap gap-1.5">
                  <button
                    onClick={() => setActiveHomeTab('info')}
                    className={`px-3 py-2 text-[10px] uppercase font-black tracking-wider transition-all rounded-sm cursor-pointer ${activeHomeTab === 'info' ? 'bg-primary text-white shadow-xs' : 'bg-slate-50 text-slate-500 hover:text-primary'}`}
                  >
                    General Info & Quotes
                  </button>
                  <button
                    onClick={() => setActiveHomeTab('announcements')}
                    className={`px-3 py-2 text-[10px] uppercase font-black tracking-wider transition-all rounded-sm cursor-pointer ${activeHomeTab === 'announcements' ? 'bg-primary text-white shadow-xs' : 'bg-slate-50 text-slate-500 hover:text-primary'}`}
                  >
                    Banners & Exam Modals
                  </button>
                  <button
                    onClick={() => setActiveHomeTab('news')}
                    className={`px-3 py-2 text-[10px] uppercase font-black tracking-wider transition-all rounded-sm cursor-pointer ${activeHomeTab === 'news' ? 'bg-primary text-white shadow-xs' : 'bg-slate-50 text-slate-500 hover:text-primary'}`}
                  >
                    Editorial School News
                  </button>
                  <button
                    onClick={() => setActiveHomeTab('calendar')}
                    className={`px-3 py-2 text-[10px] uppercase font-black tracking-wider transition-all rounded-sm cursor-pointer ${activeHomeTab === 'calendar' ? 'bg-primary text-white shadow-xs' : 'bg-slate-50 text-slate-500 hover:text-primary'}`}
                  >
                    Term Calendar Events
                  </button>
                </div>

                {/* INNER TAB: GENERAL INFO */}
                {activeHomeTab === 'info' && (
                  <div className="space-y-6">
                    <div className="bg-white p-6 border border-slate-200 shadow-sm rounded-sm">
                      <h2 className="text-sm font-headline uppercase tracking-wider text-primary font-bold mb-4 border-b pb-2">Hero Header Settings</h2>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="text-[10px] uppercase tracking-widest font-bold text-secondary block mb-1">Hero Title (English)</label>
                          <input 
                            type="text"
                            value={heroTitleEng}
                            onChange={(e) => setHeroTitleEng(e.target.value)}
                            className="w-full p-3 bg-slate-50 border border-slate-200 focus:border-primary text-xs rounded-sm font-bold"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] uppercase tracking-widest font-bold text-secondary block mb-1">Hero Title (Zulu)</label>
                          <input 
                            type="text"
                            value={heroTitleZul}
                            onChange={(e) => setHeroTitleZul(e.target.value)}
                            className="w-full p-3 bg-slate-50 border border-slate-200 focus:border-primary text-xs rounded-sm font-bold"
                          />
                        </div>

                        <div>
                          <label className="text-[10px] uppercase tracking-widest font-bold text-secondary block mb-1">Hero Description (English)</label>
                          <textarea 
                            value={heroDescEng}
                            onChange={(e) => setHeroDescEng(e.target.value)}
                            rows={3}
                            className="w-full p-3 bg-slate-50 border border-slate-200 focus:border-primary text-xs rounded-sm leading-relaxed"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] uppercase tracking-widest font-bold text-secondary block mb-1">Hero Description (Zulu)</label>
                          <textarea 
                            value={heroDescZul}
                            onChange={(e) => setHeroDescZul(e.target.value)}
                            rows={3}
                            className="w-full p-3 bg-slate-50 border border-slate-200 focus:border-primary text-xs rounded-sm leading-relaxed"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="bg-white p-6 border border-slate-200 shadow-sm rounded-sm">
                      <h2 className="text-sm font-headline uppercase tracking-wider text-primary font-bold mb-4 border-b pb-2">School Motto Settings</h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="text-[10px] uppercase tracking-widest font-bold text-secondary block mb-1">School Motto Quote (English)</label>
                          <input 
                            type="text"
                            value={mottoEng}
                            onChange={(e) => setMottoEng(e.target.value)}
                            className="w-full p-3 bg-slate-50 border border-slate-200 focus:border-primary text-xs rounded-sm italic font-bold"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] uppercase tracking-widest font-bold text-secondary block mb-1">School Motto Quote (Zulu)</label>
                          <input 
                            type="text"
                            value={mottoZul}
                            onChange={(e) => setMottoZul(e.target.value)}
                            className="w-full p-3 bg-slate-50 border border-slate-200 focus:border-primary text-xs rounded-sm italic font-bold"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="bg-white p-6 border border-slate-200 shadow-sm rounded-sm">
                      <h2 className="text-sm font-headline uppercase tracking-wider text-primary font-bold mb-4 border-b pb-2">Welcome Description Section</h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="text-[10px] uppercase tracking-widest font-bold text-secondary block mb-1">Welcome Headline (English)</label>
                          <input 
                            type="text"
                            value={welcomeTitleEng}
                            onChange={(e) => setWelcomeTitleEng(e.target.value)}
                            className="w-full p-3 bg-slate-50 border border-slate-200 focus:border-primary text-xs rounded-sm font-bold"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] uppercase tracking-widest font-bold text-secondary block mb-1">Welcome Headline (Zulu)</label>
                          <input 
                            type="text"
                            value={welcomeTitleZul}
                            onChange={(e) => setWelcomeTitleZul(e.target.value)}
                            className="w-full p-3 bg-slate-50 border border-slate-200 focus:border-primary text-xs rounded-sm font-bold"
                          />
                        </div>

                        <div>
                          <label className="text-[10px] uppercase tracking-widest font-bold text-secondary block mb-1">Welcome Paragraph Info (English)</label>
                          <textarea 
                            value={welcomeDescEng}
                            onChange={(e) => setWelcomeDescEng(e.target.value)}
                            rows={4}
                            className="w-full p-3 bg-slate-50 border border-slate-200 focus:border-primary text-xs rounded-sm leading-relaxed"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] uppercase tracking-widest font-bold text-secondary block mb-1">Welcome Paragraph Info (Zulu)</label>
                          <textarea 
                            value={welcomeDescZul}
                            onChange={(e) => setWelcomeDescZul(e.target.value)}
                            rows={4}
                            className="w-full p-3 bg-slate-50 border border-slate-200 focus:border-primary text-xs rounded-sm leading-relaxed"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="bg-white p-6 border border-slate-200 shadow-sm rounded-sm">
                      <h2 className="text-sm font-headline uppercase tracking-wider text-primary font-bold mb-4 border-b pb-2">Principal's Speech Quote (About Educators & Community Success)</h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="text-[10px] uppercase tracking-widest font-bold text-secondary block mb-1">Speech Quote Statement (English)</label>
                          <textarea 
                            value={principalQuoteEng}
                            onChange={(e) => setPrincipalQuoteEng(e.target.value)}
                            rows={3}
                            className="w-full p-3 bg-slate-50 border border-slate-200 focus:border-primary text-xs rounded-sm italic leading-relaxed"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] uppercase tracking-widest font-bold text-secondary block mb-1">Speech Quote Statement (Zulu)</label>
                          <textarea 
                            value={principalQuoteZul}
                            onChange={(e) => setPrincipalQuoteZul(e.target.value)}
                            rows={3}
                            className="w-full p-3 bg-slate-50 border border-slate-200 focus:border-primary text-xs rounded-sm italic leading-relaxed"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* INNER TAB: ANNOUNCEMENTS & MODALS */}
                {activeHomeTab === 'announcements' && (
                  <div className="space-y-6">
                    <div className="bg-white p-6 border border-slate-200 shadow-sm rounded-sm">
                      <h2 className="text-sm font-headline uppercase tracking-wider text-primary font-bold mb-4 border-b pb-2">Top Glowing Announcement Banner</h2>
                      <p className="text-xs text-slate-500 mb-6 leading-relaxed">
                        Configure the bright red notification strip featured at the global header across all school pages. Supports direct instant translations.
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="text-[10px] uppercase tracking-widest font-bold text-secondary block mb-1">Banner Text (English)</label>
                          <textarea 
                            value={bannerEng}
                            onChange={(e) => setBannerEng(e.target.value)}
                            rows={2}
                            className="w-full p-3 bg-slate-50 border border-slate-200 focus:border-primary text-xs rounded-sm font-semibold animate-none"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] uppercase tracking-widest font-bold text-secondary block mb-1">Banner Text (Zulu - IsiZulu)</label>
                          <textarea 
                            value={bannerZul}
                            onChange={(e) => setBannerZul(e.target.value)}
                            rows={2}
                            className="w-full p-3 bg-slate-50 border border-slate-200 focus:border-primary text-xs rounded-sm font-semibold animate-none"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="bg-white p-6 border border-slate-200 shadow-sm rounded-sm">
                      <h2 className="text-sm font-headline uppercase tracking-wider text-primary font-bold mb-4 border-b pb-2">Active June Exam Modal Message</h2>
                      <p className="text-xs text-slate-500 mb-6 leading-relaxed">
                        Update the overlay instructions dialog details when students trigger the exam schedules. Adjust regulations or dates easily.
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div>
                            <label className="text-[10px] uppercase tracking-widest font-bold text-secondary block mb-1">Modal Title (English)</label>
                            <input 
                              type="text"
                              value={modalTitleEng}
                              onChange={(e) => setModalTitleEng(e.target.value)}
                              className="w-full p-3 bg-slate-50 border border-slate-200 focus:border-primary text-xs rounded-sm font-bold"
                            />
                          </div>
                          <div>
                            <label className="text-[10px] uppercase tracking-widest font-bold text-secondary block mb-1">Modal Instructions Details (English)</label>
                            <textarea 
                              value={modalMsgEng}
                              onChange={(e) => setModalMsgEng(e.target.value)}
                              rows={5}
                              className="w-full p-3 bg-slate-50 border border-slate-200 focus:border-primary text-xs rounded-sm leading-relaxed font-medium"
                            />
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div>
                            <label className="text-[10px] uppercase tracking-widest font-bold text-secondary block mb-1">Modal Title (Zulu)</label>
                            <input 
                              type="text"
                              value={modalTitleZul}
                              onChange={(e) => setModalTitleZul(e.target.value)}
                              className="w-full p-3 bg-slate-50 border border-slate-200 focus:border-primary text-xs rounded-sm font-bold"
                            />
                          </div>
                          <div>
                            <label className="text-[10px] uppercase tracking-widest font-bold text-secondary block mb-1">Modal Instructions Details (Zulu)</label>
                            <textarea 
                              value={modalMsgZul}
                              onChange={(e) => setModalMsgZul(e.target.value)}
                              rows={5}
                              className="w-full p-3 bg-slate-50 border border-slate-200 focus:border-primary text-xs rounded-sm leading-relaxed font-medium"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* INNER TAB: FEATURED NEWS ARTICLE */}
                {activeHomeTab === 'news' && (
                  <div className="bg-white p-6 border border-slate-200 shadow-sm rounded-sm">
                    <h2 className="text-sm font-headline uppercase tracking-wider text-primary font-bold mb-4 border-b pb-2">Hero Editorial School News</h2>
                    <p className="text-xs text-slate-500 mb-6 leading-relaxed">
                      Edit the headline report featured on the home screen. Fill in descriptive narrative paragraphs that inspire parents or reward teachers.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {/* ENGLISH COLUMN */}
                      <div className="space-y-4">
                        <span className="text-[10px] font-black uppercase text-secondary bg-slate-100 px-2 py-1 rounded-sm">English News Article</span>
                        
                        <div>
                          <label className="text-[10px] uppercase tracking-widest font-bold text-slate-500 block mb-1 mt-3 text-secondary">News Headline Title</label>
                          <input 
                            type="text"
                            value={newsTitleEng}
                            onChange={(e) => setNewsTitleEng(e.target.value)}
                            className="w-full p-3 bg-slate-50 border border-slate-200 focus:border-primary text-xs font-bold rounded-sm text-primary"
                          />
                        </div>

                        <div>
                          <label className="text-[10px] uppercase tracking-widest font-bold text-slate-500 block mb-1 text-secondary">Short Excerpt Summary</label>
                          <textarea 
                            value={newsExcerptEng}
                            onChange={(e) => setNewsExcerptEng(e.target.value)}
                            rows={2}
                            className="w-full p-3 bg-slate-50 border border-slate-200 focus:border-primary text-xs rounded-sm text-slate-705"
                          />
                        </div>

                        <div>
                          <label className="text-[10px] uppercase tracking-widest font-bold text-slate-500 block mb-2 text-secondary">Editorial Narrative Content Paragraphs</label>
                          <div className="space-y-3">
                            {newsContentEngLines.map((line, idx) => (
                              <div key={idx} className="flex gap-2 items-start">
                                <span className="text-[10px] font-mono text-slate-400 mt-3">{idx + 1}.</span>
                                <textarea 
                                  value={line}
                                  onChange={(e) => handleNewsParagraphChange(idx, e.target.value, 'ENG')}
                                  rows={3}
                                  className="flex-grow p-3 bg-slate-50 border border-slate-200 focus:border-primary text-xs rounded-sm leading-relaxed font-medium"
                                  placeholder={`Paragraph ${idx + 1}`}
                                />
                                <button
                                  onClick={() => removeNewsParagraph(idx, 'ENG')}
                                  className="text-red-500 hover:text-red-750 p-2 mt-1 hover:bg-red-50 rounded"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            ))}
                          </div>
                          <button
                            onClick={() => addNewsParagraph('ENG')}
                            className="mt-3 px-3 py-1.5 border border-dashed border-slate-300 text-slate-600 hover:text-primary hover:border-primary transition-colors text-[10px] uppercase tracking-widest font-black flex items-center gap-1 cursor-pointer"
                          >
                            <Plus className="w-3 h-3" /> Add Narrative Paragraph
                          </button>
                        </div>
                      </div>

                      {/* ZULU COLUMN */}
                      <div className="space-y-4">
                        <span className="text-[10px] font-black uppercase text-secondary bg-slate-100 px-2 py-1 rounded-sm">IsiZulu News Article</span>
                        
                        <div>
                          <label className="text-[10px] uppercase tracking-widest font-bold text-slate-500 block mb-1 mt-3 text-secondary">News Headline Title (Zulu)</label>
                          <input 
                            type="text"
                            value={newsTitleZul}
                            onChange={(e) => setNewsTitleZul(e.target.value)}
                            className="w-full p-3 bg-slate-50 border border-slate-200 focus:border-primary text-xs font-bold rounded-sm text-primary"
                          />
                        </div>

                        <div>
                          <label className="text-[10px] uppercase tracking-widest font-bold text-slate-500 block mb-1 text-secondary">Short Excerpt Summary (Zulu)</label>
                          <textarea 
                            value={newsExcerptZul}
                            onChange={(e) => setNewsExcerptZul(e.target.value)}
                            rows={2}
                            className="w-full p-3 bg-slate-50 border border-slate-200 focus:border-primary text-xs rounded-sm text-slate-705"
                          />
                        </div>

                        <div>
                          <label className="text-[10px] uppercase tracking-widest font-bold text-slate-500 block mb-2 text-secondary">Editorial Narrative Content Paragraphs (Zulu)</label>
                          <div className="space-y-3">
                            {newsContentZulLines.map((line, idx) => (
                              <div key={idx} className="flex gap-2 items-start">
                                <span className="text-[10px] font-mono text-slate-400 mt-3">{idx + 1}.</span>
                                <textarea 
                                  value={line}
                                  onChange={(e) => handleNewsParagraphChange(idx, e.target.value, 'ZUL')}
                                  rows={3}
                                  className="flex-grow p-3 bg-slate-50 border border-slate-200 focus:border-primary text-xs rounded-sm leading-relaxed font-medium"
                                  placeholder={`Isigaba ${idx + 1}`}
                                />
                                <button
                                  onClick={() => removeNewsParagraph(idx, 'ZUL')}
                                  className="text-red-500 hover:text-red-750 p-2 mt-1 hover:bg-red-50 rounded"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            ))}
                          </div>
                          <button
                            onClick={() => addNewsParagraph('ZUL')}
                            className="mt-3 px-3 py-1.5 border border-dashed border-slate-300 text-slate-600 hover:text-primary hover:border-primary transition-colors text-[10px] uppercase tracking-widest font-black flex items-center gap-1 cursor-pointer"
                          >
                            <Plus className="w-3 h-3" /> Add Zulu Paragraph
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* INNER TAB: TERM CALENDAR EVENTS */}
                {activeHomeTab === 'calendar' && (
                  <div className="bg-white p-6 border border-slate-200 shadow-sm rounded-sm space-y-8 animate-fade-in">
                    <div>
                      <h2 className="text-sm font-headline uppercase tracking-wider text-primary font-bold mb-4 border-b pb-2">Academic Term Calendar Schedule</h2>
                      <p className="text-xs text-slate-500 leading-relaxed">
                        Add or delete school schedule entries like administrative deadlines, exams, school assemblies, and sports days. Choose the month category to sync tables.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-slate-50 p-6 border border-slate-200/60 rounded">
                      <div>
                        <label className="text-[10px] uppercase tracking-widest font-bold text-secondary block mb-1">Target Month Category</label>
                        <select 
                          value={selectedMonth}
                          onChange={(e) => setSelectedMonth(Number(e.target.value))}
                          className="w-full p-2.5 bg-white border border-slate-200 text-xs rounded font-bold"
                        >
                          {monthNames.map((m, idx) => (
                            <option key={idx} value={idx}>{m}</option>
                          ))}
                        </select>
                      </div>

                      <div className="md:col-span-2">
                        <label className="text-[10px] uppercase tracking-widest font-bold text-secondary block mb-1 font-bold">Add Calendar Event Formulation</label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-1">
                          <input 
                            type="text" 
                            placeholder="Date text (e.g. June 15 or 15 Lwezi)"
                            value={newEventDate}
                            onChange={(e) => setNewEventDate(e.target.value)}
                            className="p-2 bg-white border border-slate-200 text-xs rounded font-semibold"
                          />
                          <select
                            value={newEventType}
                            onChange={(e: any) => setNewEventType(e.target.value)}
                            className="p-2 bg-white border border-slate-200 text-xs rounded font-bold"
                          >
                            <option value="academic">Academic / Teaching (Red)</option>
                            <option value="event">SGB Event / Meeting (Indigo)</option>
                            <option value="holiday">Official School Holiday (Green)</option>
                            <option value="exam">National Examinations (Deep Red)</option>
                          </select>

                          <input 
                            type="text" 
                            placeholder="Event Title Description (English)"
                            value={newEventTitleEng}
                            onChange={(e) => setNewEventTitleEng(e.target.value)}
                            className="p-2 bg-white border border-slate-200 text-xs rounded sm:col-span-2 font-semibold"
                          />
                          <input 
                            type="text" 
                            placeholder="Event Title Description (Zulu)"
                            value={newEventTitleZul}
                            onChange={(e) => setNewEventTitleZul(e.target.value)}
                            className="p-2 bg-white border border-slate-200 text-xs rounded sm:col-span-2 font-semibold"
                          />
                        </div>

                        <button
                          onClick={addCalendarEvent}
                          className="mt-3 px-4 py-2 bg-primary text-white font-black text-[9px] uppercase tracking-widest hover:bg-primary/95 transition-all rounded-sm cursor-pointer flex items-center gap-1 shadow-xs"
                        >
                          <Plus className="w-3.5 h-3.5" /> Inject New Event
                        </button>
                      </div>
                    </div>

                    {/* CURRENT CALENDAR MONTHS AND EVENTS */}
                    <div className="space-y-4">
                      <span className="text-[10px] uppercase tracking-widest font-bold text-slate-500 block">Currently Programmed Calendar Months ({calendarEng.length} months)</span>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {calendarEng.map((monthGroup, mIdx) => {
                          const monthZulGroup = calendarZul.find((m: any) => m.month === monthGroup.month) || { events: [] };
                          
                          return (
                            <div key={mIdx} className="p-4 bg-white border border-slate-200/85 hover:border-slate-300 shadow-3xs rounded flex flex-col justify-between">
                              <div>
                                <h3 className="text-xs font-black uppercase text-indigo-950 border-b pb-1.5 mb-2 flex justify-between items-center bg-slate-50 p-2 rounded">
                                  <span>📅 {monthNames[monthGroup.month] || `Month Code ${monthGroup.month}`}</span>
                                  <span className="text-[9px] font-mono text-secondary bg-white px-2 py-0.5 rounded border border-slate-200">{monthGroup.events?.length || 0} schedule lines</span>
                                </h3>

                                <div className="space-y-3">
                                  {!monthGroup.events || monthGroup.events.length === 0 ? (
                                    <p className="text-[11px] text-slate-400 italic py-2 text-center">No schedule lines locked in this month category.</p>
                                  ) : (
                                    monthGroup.events.map((evt: any, eIdx: number) => {
                                      const zulEvt = monthZulGroup.events ? monthZulGroup.events[eIdx] : null;
                                      const zulTitleStr = zulEvt ? zulEvt.title : 'Isitayela esingabhalwanga';
                                      return (
                                        <div key={eIdx} className="text-xs p-2.5 bg-slate-50 hover:bg-slate-100 rounded border border-slate-100/50 flex items-center justify-between gap-2">
                                          <div className="space-y-1">
                                            <div className="flex items-center gap-2">
                                              <span className="bg-primary/10 text-primary font-black px-1.5 py-0.2 text-[9px] rounded font-mono uppercase tracking-tight">{evt.date}</span>
                                              <span className="bg-slate-200 text-slate-700 font-bold px-1.5 py-0.2 text-[8px] rounded uppercase">{evt.type || 'event'}</span>
                                            </div>
                                            <p className="font-bold text-slate-900 text-[11px] leading-tight">ENG: {evt.title}</p>
                                            <p className="text-slate-600 text-[11px] leading-tight font-medium">ZUL: {zulTitleStr}</p>
                                          </div>
                                          <button
                                            onClick={() => removeCalendarEvent(monthGroup.month, eIdx)}
                                            className="text-red-500 hover:text-red-750 p-1.5 hover:bg-red-50 rounded shrink-0 transition-colors cursor-pointer"
                                            title="Prune event line"
                                          >
                                            <Trash2 className="w-3.5 h-3.5" />
                                          </button>
                                        </div>
                                      );
                                    })
                                  )}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* VIEW 2: EDIT STAFF */}
            {activeView === 'staff' && (
              <div className="space-y-6 animate-fade-in">
                
                {/* 1. Add Custom Educator Profile Form */}
                <div className="bg-white p-6 border border-slate-200 shadow-sm rounded-sm">
                  <div className="flex items-center gap-2 border-b pb-3 mb-5 text-secondary">
                    <div className="w-8 h-8 rounded bg-primary/15 text-primary flex items-center justify-center">
                      <Plus className="w-4 h-4" />
                    </div>
                    <div>
                      <h2 className="text-sm font-headline uppercase tracking-wider text-primary font-bold">Add Custom Educator Profile</h2>
                      <p className="text-[10px] text-slate-400">Initialize a custom teacher, HoD, deputy, or board administrator profile immediately</p>
                    </div>
                  </div>

                  {/* Form fields layout */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                    <div className="md:col-span-2">
                      <label className="text-[10px] uppercase tracking-widest font-black text-secondary block mb-1">Full Educator Name</label>
                      <input 
                        type="text" 
                        placeholder="e.g. Mr. S. M. Nkosi"
                        value={newStaffName}
                        onChange={(e) => setNewStaffName(e.target.value)}
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 focus:border-primary text-xs rounded"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] uppercase tracking-widest font-black text-secondary block mb-1">Experience Years</label>
                      <input 
                        type="text" 
                        placeholder="e.g. 16 Years"
                        value={newStaffExperience}
                        onChange={(e) => setNewStaffExperience(e.target.value)}
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 focus:border-primary text-xs rounded font-semibold"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] uppercase tracking-widest font-black text-secondary block mb-1">Initials Token</label>
                      <input 
                        type="text" 
                        placeholder="e.g. SN"
                        value={newStaffInitials}
                        onChange={(e) => setNewStaffInitials(e.target.value)}
                        maxLength={3}
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 focus:border-primary text-xs rounded uppercase text-center font-bold font-mono"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <label className="text-[10px] uppercase tracking-widest font-black text-secondary block mb-1">Role Title (English)</label>
                      <input 
                        type="text" 
                        placeholder="e.g. Senior Commercial School Educator"
                        value={newStaffRoleEng}
                        onChange={(e) => setNewStaffRoleEng(e.target.value)}
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 focus:border-primary text-xs rounded font-semibold"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] uppercase tracking-widest font-black text-secondary block mb-1">Role Title (Zulu)</label>
                      <input 
                        type="text" 
                        placeholder="e.g. Uthisha Omkhulu Wezohwebo"
                        value={newStaffRoleZul}
                        onChange={(e) => setNewStaffRoleZul(e.target.value)}
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 focus:border-primary text-xs rounded font-semibold"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] uppercase tracking-widest font-black text-secondary block mb-1">Department Category</label>
                      <select
                        value={newStaffDept}
                        onChange={(e: any) => setNewStaffDept(e.target.value)}
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 focus:border-primary text-xs rounded font-bold"
                      >
                        <option value="management">School Management (Principal & Deputy)</option>
                        <option value="sciences">Mathematics & Sciences Sector</option>
                        <option value="humanities">Languages & Humanities Sector</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="text-[10px] uppercase tracking-widest font-black text-secondary block mb-1">Subjects Educated (English - Comma separated)</label>
                      <input 
                        type="text" 
                        placeholder="e.g. Accounting, Business Studies"
                        value={newStaffSubjectsEng}
                        onChange={(e) => setNewStaffSubjectsEng(e.target.value)}
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 focus:border-primary text-xs rounded text-secondary"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] uppercase tracking-widest font-black text-secondary block mb-1">Subjects Educated (Zulu - Comma separated)</label>
                      <input 
                        type="text" 
                        placeholder="e.g. I-Accounting, I-Business Studies"
                        value={newStaffSubjectsZul}
                        onChange={(e) => setNewStaffSubjectsZul(e.target.value)}
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 focus:border-primary text-xs rounded text-secondary"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="text-[10px] uppercase tracking-widest font-black text-secondary block mb-1">Personal biography summary (English)</label>
                      <textarea 
                        value={newStaffBioEng}
                        onChange={(e) => setNewStaffBioEng(e.target.value)}
                        rows={3}
                        placeholder="Enter short teacher bio here..."
                        className="w-full p-3 bg-slate-50 border border-slate-200 focus:border-primary text-xs rounded text-secondary leading-relaxed"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] uppercase tracking-widest font-black text-secondary block mb-1">Personal biography summary (Zulu)</label>
                      <textarea 
                        value={newStaffBioZul}
                        onChange={(e) => setNewStaffBioZul(e.target.value)}
                        rows={3}
                        placeholder="Lola umlando omfushane kathisha lapha..."
                        className="w-full p-3 bg-slate-50 border border-slate-200 focus:border-primary text-xs rounded text-secondary leading-relaxed"
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="text-[10px] uppercase tracking-widest font-black text-secondary block mb-1">Avatar Theme Color Gradient</label>
                    <select
                      value={newStaffColor}
                      onChange={(e) => setNewStaffColor(e.target.value)}
                      className="p-2 bg-slate-50 border border-slate-200 text-xs rounded font-mono font-bold"
                    >
                      <option value="from-red-600 to-amber-600">Red to Gold Gradient (Principal Zulu style)</option>
                      <option value="from-[#b3000d] to-red-500">Royal Crimson Gradient</option>
                      <option value="from-amber-500 to-yellow-600">Goldenrod Yellow Gradient</option>
                      <option value="from-indigo-600 to-blue-500">Royal Science Blue Gradient</option>
                      <option value="from-emerald-600 to-teal-500">Emerald Green Gradient</option>
                      <option value="from-orange-600 to-amber-500">Bright Orange Sunset Gradient</option>
                    </select>
                  </div>

                  <button
                    onClick={() => {
                      if (!newStaffName || !newStaffRoleEng) {
                        alert('Full educator name and English role title are required');
                        return;
                      }
                      
                      const genId = 'staff_' + Date.now();
                      const parsedSubjEng = newStaffSubjectsEng ? newStaffSubjectsEng.split(',').map(s => s.trim()) : [];
                      const parsedSubjZul = newStaffSubjectsZul ? newStaffSubjectsZul.split(',').map(s => s.trim()) : [];
                      
                      const newMem = {
                        id: genId,
                        name: newStaffName,
                        roleENG: newStaffRoleEng,
                        roleZUL: newStaffRoleZul || newStaffRoleEng,
                        dept: newStaffDept,
                        subjectsENG: parsedSubjEng,
                        subjectsZUL: parsedSubjZul,
                        bioENG: newStaffBioEng || "Dedicated academic mentor.",
                        bioZUL: newStaffBioZul || "Uzinikele ekuthuthukiseni imfundo.",
                        experience: newStaffExperience || "5 Years",
                        initials: newStaffInitials || newStaffName.split(' ').map(s => s.charAt(0)).join('').toUpperCase(),
                        colorClass: newStaffColor
                      };

                      setStaffList([...staffList, newMem]);

                      // reset form
                      setNewStaffName('');
                      setNewStaffRoleEng('');
                      setNewStaffRoleZul('');
                      setNewStaffSubjectsEng('');
                      setNewStaffSubjectsZul('');
                      setNewStaffBioEng('');
                      setNewStaffBioZul('');
                      setNewStaffInitials('');
                    }}
                    className="px-5 py-2.5 bg-primary text-white font-black text-xs uppercase tracking-widest hover:bg-primary/95 transition-all rounded-sm cursor-pointer flex items-center gap-1 shadow-xs"
                  >
                    <Plus className="w-4 h-4" /> Inject Educator Profile
                  </button>
                </div>

                {/* 2. List & Editable Details of Current Staff members */}
                <div className="space-y-4">
                  <h3 className="text-xs font-black uppercase text-secondary tracking-widest">Current Educator Directory Profiles ({staffList.length})</h3>
                  
                  <div className="space-y-4">
                    {staffList.map((member, mIdx) => (
                      <div key={member.id || mIdx} className="bg-white border border-slate-200 p-5 rounded-sm shadow-3xs flex flex-col md:flex-row gap-6 justify-between items-start">
                        
                        {/* Preview / Badge col */}
                        <div className="flex items-center gap-3 w-full md:w-52 shrink-0 bg-slate-50 p-4 border border-slate-200/50 rounded-sm">
                          <div className={`w-12 h-12 rounded-sm bg-gradient-to-br ${member.colorClass || 'from-slate-600 to-slate-800'} flex items-center justify-center text-white font-black text-sm tracking-widest font-headline shrink-0`}>
                            {member.initials || 'TR'}
                          </div>
                          <div className="min-w-0">
                            <p className="font-headline font-black text-primary text-xs uppercase tracking-wide truncate">{member.name}</p>
                            <span className="text-[9px] uppercase tracking-wider text-slate-400 font-bold block mt-0.5">{member.dept} department</span>
                            <span className="text-[8px] bg-slate-200 text-slate-600 px-1.5 py-0.5 rounded-sm uppercase font-bold inline-block mt-1 font-mono">{member.experience || '5 Years'} Exp</span>
                          </div>
                        </div>

                        {/* Editable Form parameters Column */}
                        <div className="flex-grow w-full space-y-3">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                              <span className="text-[9px] text-slate-400 font-bold uppercase block mb-1">Educator Full Name String</span>
                              <input 
                                type="text"
                                value={member.name}
                                onChange={(e) => {
                                  const updated = [...staffList];
                                  updated[mIdx].name = e.target.value;
                                  setStaffList(updated);
                                }}
                                className="w-full p-2 bg-slate-50 border border-slate-200 text-xs rounded font-bold text-slate-900"
                              />
                            </div>
                            <div>
                              <span className="text-[9px] text-slate-400 font-bold uppercase block mb-1">Initials & Exp</span>
                              <div className="flex gap-2">
                                <input 
                                  type="text"
                                  value={member.initials || ''}
                                  onChange={(e) => {
                                    const updated = [...staffList];
                                    updated[mIdx].initials = e.target.value;
                                    setStaffList(updated);
                                  }}
                                  className="w-1/3 p-2 bg-slate-50 border border-slate-200 text-xs rounded text-center uppercase font-mono font-bold"
                                />
                                <input 
                                  type="text"
                                  value={member.experience || ''}
                                  onChange={(e) => {
                                    const updated = [...staffList];
                                    updated[mIdx].experience = e.target.value;
                                    setStaffList(updated);
                                  }}
                                  className="w-2/3 p-2 bg-slate-50 border border-slate-200 text-xs rounded"
                                />
                              </div>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                              <span className="text-[9px] text-slate-400 font-bold uppercase block mb-1">Role Title (English)</span>
                              <input 
                                type="text"
                                value={member.roleENG}
                                onChange={(e) => {
                                  const updated = [...staffList];
                                  updated[mIdx].roleENG = e.target.value;
                                  setStaffList(updated);
                                }}
                                className="w-full p-2 bg-slate-50 border border-slate-200 text-xs rounded font-semibold text-slate-800"
                              />
                            </div>
                            <div>
                              <span className="text-[9px] text-slate-400 font-bold uppercase block mb-1">Role Title (Zulu)</span>
                              <input 
                                type="text"
                                value={member.roleZUL}
                                onChange={(e) => {
                                  const updated = [...staffList];
                                  updated[mIdx].roleZUL = e.target.value;
                                  setStaffList(updated);
                                }}
                                className="w-full p-2 bg-slate-50 border border-slate-200 text-xs rounded font-semibold text-slate-800"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                              <span className="text-[9px] text-slate-400 font-bold uppercase block mb-1">Biography Statement (English)</span>
                              <textarea
                                value={member.bioENG}
                                onChange={(e) => {
                                  const updated = [...staffList];
                                  updated[mIdx].bioENG = e.target.value;
                                  setStaffList(updated);
                                }}
                                rows={2}
                                className="w-full p-2 bg-slate-50 border border-slate-200 text-xs rounded leading-relaxed text-slate-600 font-medium"
                              />
                            </div>
                            <div>
                              <span className="text-[9px] text-slate-400 font-bold uppercase block mb-1">Biography Statement (Zulu)</span>
                              <textarea
                                value={member.bioZUL}
                                onChange={(e) => {
                                  const updated = [...staffList];
                                  updated[mIdx].bioZUL = e.target.value;
                                  setStaffList(updated);
                                }}
                                rows={2}
                                className="w-full p-2 bg-slate-50 border border-slate-200 text-xs rounded leading-relaxed text-slate-600 font-medium"
                              />
                            </div>
                          </div>
                        </div>

                        {/* Action buttons list */}
                        <div className="w-full md:w-auto shrink-0 self-center">
                          <button
                            onClick={() => {
                              if (confirm(`Do you really want to delete / remove educator ${member.name}?`)) {
                                setStaffList(staffList.filter(item => item.id !== member.id));
                              }
                            }}
                            className="p-3 bg-red-50 text-red-600 border border-red-100 hover:bg-red-105 rounded-sm text-xs font-bold uppercase transition-colors flex items-center gap-1.5 cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" /> Remove SGB Profile
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* VIEW 3: EDIT ADMISSIONS */}
            {activeView === 'admissions' && (
              <div className="space-y-6 animate-fade-in">
                
                {/* General Headlines & Subtitles */}
                <div className="bg-white p-6 border border-slate-200 shadow-sm rounded-sm">
                  <h2 className="text-sm font-headline uppercase tracking-wider text-primary font-bold mb-4 border-b pb-2">Theme Titles & Slogans</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="text-[10px] uppercase tracking-widest font-bold text-secondary block mb-1">Admissions Display Title (English)</label>
                      <input 
                        type="text"
                        value={admissionTitleEng}
                        onChange={(e) => setAdmissionTitleEng(e.target.value)}
                        className="w-full p-3 bg-slate-50 border border-slate-200 focus:border-primary text-xs rounded font-bold text-slate-800"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] uppercase tracking-widest font-bold text-secondary block mb-1">Admissions Display Title (Zulu)</label>
                      <input 
                        type="text"
                        value={admissionTitleZul}
                        onChange={(e) => setAdmissionTitleZul(e.target.value)}
                        className="w-full p-3 bg-slate-50 border border-slate-200 focus:border-primary text-xs rounded font-bold text-slate-800"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] uppercase tracking-widest font-bold text-secondary block mb-1">Admissions Subtitle (English)</label>
                      <input 
                        type="text"
                        value={admissionSubtitleEng}
                        onChange={(e) => setAdmissionSubtitleEng(e.target.value)}
                        className="w-full p-3 bg-slate-50 border border-slate-200 focus:border-primary text-xs text-slate-600 font-semibold"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] uppercase tracking-widest font-bold text-secondary block mb-1">Admissions Subtitle (Zulu)</label>
                      <input 
                        type="text"
                        value={admissionSubtitleZul}
                        onChange={(e) => setAdmissionSubtitleZul(e.target.value)}
                        className="w-full p-3 bg-slate-50 border border-slate-200 focus:border-primary text-xs text-slate-600 font-semibold"
                      />
                    </div>
                  </div>
                </div>

                {/* Yellow Important Alert Box notice */}
                <div className="bg-white p-6 border border-slate-200 shadow-sm rounded-sm">
                  <h2 className="text-sm font-headline uppercase tracking-wider text-primary font-bold mb-4 border-b pb-2">Featured Alert Box Notice (Important Guidelines Highlight)</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="text-[10px] uppercase tracking-widest font-bold text-secondary block mb-1">Crucial Alert Message (English)</label>
                      <textarea 
                        value={admissionNoticeEng}
                        onChange={(e) => setAdmissionNoticeEng(e.target.value)}
                        rows={3}
                        className="w-full p-3 bg-amber-50/50 border border-amber-200 focus:border-primary text-xs rounded text-slate-800 leading-relaxed font-semibold"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] uppercase tracking-widest font-bold text-secondary block mb-1">Crucial Alert Message (Zulu)</label>
                      <textarea 
                        value={admissionNoticeZul}
                        onChange={(e) => setAdmissionNoticeZul(e.target.value)}
                        rows={3}
                        className="w-full p-3 bg-amber-50/50 border border-amber-200 focus:border-primary text-xs rounded text-slate-800 leading-relaxed font-semibold"
                      />
                    </div>
                  </div>
                </div>

                {/* Entry streams specs */}
                <div className="bg-white p-6 border border-slate-200 shadow-sm rounded-sm">
                  <h2 className="text-sm font-headline uppercase tracking-wider text-primary font-bold mb-4 border-b pb-2">Stream Definitions (Grade 8 Entry vs Transfer Students)</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Grade 8 Entry Card */}
                    <div className="space-y-4">
                      <span className="text-[10px] font-black uppercase text-secondary bg-slate-100 px-2 py-1 rounded-sm">Grade 8 Stream Specifications</span>
                      
                      <div>
                        <label className="text-[10px] uppercase tracking-widest font-bold text-slate-500 block mb-1 mt-2">Display Title (English & Zulu)</label>
                        <div className="space-y-2">
                          <input 
                            type="text" 
                            value={grade8EnrollEng}
                            onChange={(e) => setGrade8EnrollEng(e.target.value)}
                            className="w-full p-2.5 bg-slate-50 border border-slate-200 text-xs font-bold"
                            placeholder="ENG title"
                          />
                          <input 
                            type="text" 
                            value={grade8EnrollZul}
                            onChange={(e) => setGrade8EnrollZul(e.target.value)}
                            className="w-full p-2.5 bg-slate-50 border border-slate-200 text-xs font-bold"
                            placeholder="ZUL title"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-[10px] uppercase tracking-widest font-bold text-slate-500 block mb-1">Detailed description (English)</label>
                        <textarea 
                          value={grade8DescEng}
                          onChange={(e) => setGrade8DescEng(e.target.value)}
                          rows={4}
                          className="w-full p-3 bg-slate-50 border border-slate-200 text-xs rounded text-slate-600 leading-relaxed font-medium"
                        />
                      </div>

                      <div>
                        <label className="text-[10px] uppercase tracking-widest font-bold text-slate-500 block mb-1">Detailed description (Zulu)</label>
                        <textarea 
                          value={grade8DescZul}
                          onChange={(e) => setGrade8DescZul(e.target.value)}
                          rows={4}
                          className="w-full p-3 bg-slate-50 border border-slate-200 text-xs rounded text-slate-600 leading-relaxed font-medium"
                        />
                      </div>
                    </div>

                    {/* Transfer Applicants Card */}
                    <div className="space-y-4">
                      <span className="text-[10px] font-black uppercase text-secondary bg-slate-100 px-2 py-1 rounded-sm">Grade 9-11 Transfer Specifications</span>
                      
                      <div>
                        <label className="text-[10px] uppercase tracking-widest font-bold text-slate-500 block mb-1 mt-2">Display Title (English & Zulu)</label>
                        <div className="space-y-2">
                          <input 
                            type="text" 
                            value={transferStudentsEng}
                            onChange={(e) => setTransferStudentsEng(e.target.value)}
                            className="w-full p-2.5 bg-slate-50 border border-slate-200 text-xs font-bold"
                            placeholder="ENG title"
                          />
                          <input 
                            type="text" 
                            value={transferStudentsZul}
                            onChange={(e) => setTransferStudentsZul(e.target.value)}
                            className="w-full p-2.5 bg-slate-50 border border-slate-200 text-xs font-bold"
                            placeholder="ZUL title"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-[10px] uppercase tracking-widest font-bold text-slate-500 block mb-1">Detailed description (English)</label>
                        <textarea 
                          value={transferDescEng}
                          onChange={(e) => setTransferDescEng(e.target.value)}
                          rows={4}
                          className="w-full p-3 bg-slate-50 border border-slate-200 text-xs rounded text-slate-600 leading-relaxed font-medium"
                        />
                      </div>

                      <div>
                        <label className="text-[10px] uppercase tracking-widest font-bold text-slate-500 block mb-1">Detailed description (Zulu)</label>
                        <textarea 
                          value={transferDescZul}
                          onChange={(e) => setTransferDescZul(e.target.value)}
                          rows={4}
                          className="w-full p-3 bg-slate-50 border border-slate-200 text-xs rounded text-slate-600 leading-relaxed font-medium"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Google Forms Integration Card */}
                <div className="bg-white p-6 border border-slate-200 shadow-sm rounded-sm">
                  <h2 className="text-sm font-headline uppercase tracking-wider text-primary font-bold mb-4 border-b pb-2 flex items-center gap-2">
                    <svg className="w-4 h-4 text-purple-600" fill="currentColor" viewBox="0 0 24 24"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2m-2 10H7v-2h10v2m0-4H7V7h10v2m0 8H7v-2h10v2z"/></svg>
                    Google Forms Integration
                  </h2>
                  <p className="text-xs text-secondary leading-relaxed mb-4">
                    Link your public or embedded Google Form (e.g. Pre-admission Form, General Enquiry Form). This allows visitors of the school website to fill in the application or request directly on the Admissions page.
                  </p>
                  <div>
                    <label className="text-[10px] uppercase tracking-widest font-bold text-slate-500 block mb-1">Google Form public link or embed URL</label>
                    <input 
                      type="text"
                      value={googleFormEmbedUrl}
                      onChange={(e) => setGoogleFormEmbedUrl(e.target.value)}
                      placeholder="https://docs.google.com/forms/d/e/..."
                      className="w-full p-3 bg-slate-50 border border-slate-200 focus:border-primary text-xs rounded text-slate-800 font-mono"
                    />
                    <span className="text-[10px] text-slate-400 mt-1 block font-light">
                      Tip: Make sure the Google Form is shared publicly (Anyone with the link can view) so learners can fill it.
                    </span>
                  </div>
                </div>

                {/* Admission Requirements & Documentation lists */}
                <div className="bg-white p-6 border border-slate-200 shadow-sm rounded-sm">
                  <div className="border-b pb-3 mb-4 flex justify-between items-center flex-wrap gap-2">
                    <div>
                      <h2 className="text-sm font-headline uppercase tracking-wider text-primary font-bold">Requirement Lists Checklist</h2>
                      <p className="text-[10px] text-slate-400">Add, alter or remove essential documents required for the learner profile assessment file</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* ENGLISH LIST MANAGER */}
                    <div className="space-y-4">
                      <span className="text-[10px] font-black uppercase text-secondary bg-indigo-50 text-indigo-850 px-2 py-1 rounded-sm">Requirements (English Checklist)</span>
                      
                      <div className="space-y-2">
                        {requirementsEng.map((req, idx) => (
                          <div key={idx} className="flex gap-2 items-center">
                            <span className="text-[10px] font-mono text-slate-400 font-bold">{idx + 1}.</span>
                            <input 
                              type="text"
                              value={req}
                              onChange={(e) => {
                                const copy = [...requirementsEng];
                                copy[idx] = e.target.value;
                                setRequirementsEng(copy);
                              }}
                              className="flex-grow p-2 bg-slate-50 border border-slate-200 text-xs font-bold text-slate-800 focus:outline-none focus:border-primary"
                            />
                            <button
                              onClick={() => {
                                setRequirementsEng(requirementsEng.filter((_, i) => i !== idx));
                              }}
                              className="text-red-500 hover:text-red-750 p-2 hover:bg-red-50 rounded cursor-pointer"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>

                      <button
                        onClick={() => setRequirementsEng([...requirementsEng, 'New requirements details line'])}
                        className="px-3 py-1.5 border border-dashed border-slate-300 text-slate-600 hover:text-primary transition-colors text-[9px] uppercase tracking-widest font-black flex items-center gap-1 cursor-pointer mt-2"
                      >
                        <Plus className="w-3.5 h-3.5" /> Add English Item
                      </button>
                    </div>

                    {/* ZULU LIST MANAGER */}
                    <div className="space-y-4">
                      <span className="text-[10px] font-black uppercase text-secondary bg-indigo-50 text-indigo-850 px-2 py-1 rounded-sm">Requirements (IsiZulu Checklist)</span>
                      
                      <div className="space-y-2">
                        {requirementsZul.map((req, idx) => (
                          <div key={idx} className="flex gap-2 items-center">
                            <span className="text-[10px] font-mono text-slate-400 font-bold">{idx + 1}.</span>
                            <input 
                              type="text"
                              value={req}
                              onChange={(e) => {
                                const copy = [...requirementsZul];
                                copy[idx] = e.target.value;
                                setRequirementsZul(copy);
                              }}
                              className="flex-grow p-2 bg-slate-50 border border-slate-200 text-xs font-bold text-slate-800 focus:outline-none focus:border-primary"
                            />
                            <button
                              onClick={() => {
                                setRequirementsZul(requirementsZul.filter((_, i) => i !== idx));
                              }}
                              className="text-red-500 hover:text-red-750 p-2 hover:bg-red-50 rounded cursor-pointer"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>

                      <button
                        onClick={() => setRequirementsZul([...requirementsZul, 'Izidingo imininingwane emisha line'])}
                        className="px-3 py-1.5 border border-dashed border-slate-300 text-slate-600 hover:text-primary transition-colors text-[9px] uppercase tracking-widest font-black flex items-center gap-1 cursor-pointer mt-2"
                      >
                        <Plus className="w-3.5 h-3.5" /> Add Zulu Item
                      </button>
                    </div>
                  </div>
                </div>

              </div>
            )}



          </div>

        </div>
      </div>
    </div>
  );
}
