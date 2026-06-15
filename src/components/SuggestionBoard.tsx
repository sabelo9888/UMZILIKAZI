import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  MessageSquare, 
  Plus, 
  ThumbsUp, 
  Filter, 
  Search, 
  User, 
  Users, 
  CheckCircle,
  MessageCircle,
  X,
  Send,
  Sparkles,
  Heart
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Comment {
  id: string;
  author: string;
  role: 'learner' | 'parent' | 'educator';
  text: string;
  timestamp: string;
}

interface Suggestion {
  id: string;
  title: string;
  description: string;
  category: 'academic' | 'extracurricular' | 'environment' | 'parental' | 'other';
  author: string;
  role: 'learner' | 'parent' | 'educator';
  upvotes: number;
  comments: Comment[];
  schoolResponse?: string;
  createdAt: string;
  userUpvoted?: boolean;
}

interface SuggestionBoardProps {
  lang: 'ENG' | 'ZUL';
  t: any;
  onBack: () => void;
}

const DEFAULT_SUGGESTIONS: Suggestion[] = [
  {
    id: 's1',
    title: 'After-School Peer-Led Matric Study Groups in Classrooms',
    description: 'We should organize Grade 12 peer-led study groups immediately after school in the classrooms. Having dedicated study groups for Mathematics, Physical Sciences, and Accounting where we work through past papers together would help those who are struggling. Teachers or senior pupils can supervise.',
    category: 'academic',
    author: 'Sipho Khumalo',
    role: 'learner',
    upvotes: 48,
    createdAt: '2026-06-12T14:30:00Z',
    comments: [
      {
        id: 'c1_1',
        author: 'Melokuhle Ziyanda',
        role: 'learner',
        text: 'This would be so helpful, especially for math paper 2 geometry prep!',
        timestamp: '1 hour ago'
      },
      {
        id: 'c1_2',
        author: 'Mrs. Hlengiwe Buthelezi',
        role: 'parent',
        text: 'As parents, we support this 100%. We can help arrange healthy afternoon snacks for the learners who stay behind.',
        timestamp: '30 mins ago'
      }
    ],
    schoolResponse: 'Excellent initiative, Sipho! The school management team has approved the use of classrooms 10A and 10B until 17:00. Mr. S. Nkosi has kindly volunteered to supervise and assist with resources on Tuesdays and Thursdays.'
  },
  {
    id: 's2',
    title: 'Establish a School Organic Vegetable Garden',
    description: 'I propose that we start a community organic vegetable garden behind the Life Sciences laboratory. It will provide hands-on agricultural and environmental education for pupils, and the harvest can supplement our school daily nutrition program and feed needy families.',
    category: 'environment',
    author: 'Mrs. Gertrude Khumalo',
    role: 'parent',
    upvotes: 39,
    createdAt: '2026-06-10T09:15:00Z',
    comments: [
      {
        id: 'c2_1',
        author: 'Mr. S. Nkosi',
        role: 'educator',
        text: 'Superb proposal! It perfectly aligns with our Life Sciences curriculum. I am happy to help allocate tools.',
        timestamp: '2 days ago'
      }
    ],
    schoolResponse: 'Wonderful ideas! The School Governing Body (SGB) has agreed to fund the initial fencing and purchase of seedlings. Parents who would like to assist with preparing the soil on Saturday, June 20th, please register at the main office.'
  },
  {
    id: 's3',
    title: 'Cell Phone Coding and Typing Club on Friday Afternoons',
    description: 'Since we have limited desktop computers, we can start a Friday Coding & Typing Club where we learn basic terminal typing, scratch programming, and web development using our mobile phones and free apps. It does not require premium laptops, just enthusiasm!',
    category: 'extracurricular',
    author: 'Melokuhle Ziyanda',
    role: 'learner',
    upvotes: 31,
    createdAt: '2026-06-14T11:00:00Z',
    comments: [
      {
        id: 'c3_1',
        author: 'Bandile Zulu',
        role: 'learner',
        text: 'Keen to join! Can we also learn basic mobile UI design?',
        timestamp: '5 hours ago'
      }
    ]
  },
  {
    id: 's4',
    title: 'Parent-Teacher Homework Support WhatsApp Channel',
    description: 'We can create a structured Grade 8 and 9 homework helpline on WhatsApp. Volunteer educators and parent reps can monitor the channel in the evenings to help junior learners understand complex homework problems, keeping them focused and out of trouble.',
    category: 'parental',
    author: 'Mr. S. Nkosi',
    role: 'educator',
    upvotes: 27,
    createdAt: '2026-06-08T08:00:00Z',
    comments: [
      {
        id: 'c4_1',
        author: 'Mrs. Gertrude Khumalo',
        role: 'parent',
        text: 'I can help coordinate the Grade 8 group. Excellent idea to bridge home and school.',
        timestamp: '4 days ago'
      }
    ],
    schoolResponse: 'This is brilliant, Mr. Nkosi. We will send a circular to all Grade 8/9 parents containing the joining links next week.'
  }
];

export default function SuggestionBoard({ lang, t, onBack }: SuggestionBoardProps) {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);

  const fetchSuggestions = () => {
    fetch('/api/suggestions')
      .then(res => res.json())
      .then(data => {
        if (data && data.length > 0) {
          setSuggestions(data);
        } else {
          setSuggestions(DEFAULT_SUGGESTIONS);
        }
      })
      .catch(err => {
        console.error("Error loading suggestions from backend:", err);
        setSuggestions(DEFAULT_SUGGESTIONS);
      });
  };

  useEffect(() => {
    fetchSuggestions();
  }, []);

  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedRole, setSelectedRole] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'popular' | 'latest'>('popular');

  // Form State
  const [showAddForm, setShowAddForm] = useState(false);
  const [formName, setFormName] = useState('');
  const [formRole, setFormRole] = useState<'learner' | 'parent' | 'educator'>('learner');
  const [formTitle, setFormTitle] = useState('');
  const [formCategory, setFormCategory] = useState<'academic' | 'extracurricular' | 'environment' | 'parental' | 'other'>('academic');
  const [formDescription, setFormDescription] = useState('');
  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState(false);

  // Active expanded comments dialog / view
  const [expandedSuggestionId, setExpandedSuggestionId] = useState<string | null>(null);
  const [newCommentAuthor, setNewCommentAuthor] = useState('');
  const [newCommentRole, setNewCommentRole] = useState<'learner' | 'parent' | 'educator'>('learner');
  const [newCommentText, setNewCommentText] = useState('');



  // Labels based on Language
  const l = {
    ENG: {
      boardTitle: 'Community Suggestion Board',
      boardSubtitle: 'Where Learners, Parents, and Educators collaborate and share positive ideas for our school.',
      searchPlaceholder: 'Search suggestions, ideas, and feedback...',
      addIdea: 'Share New Idea',
      filterCategory: 'Category',
      filterRole: 'Role',
      sortBy: 'Sort By',
      popular: 'Most Liked',
      latest: 'Latest',
      student: 'Learner / Child',
      parent: 'Parent / Guardian',
      educator: 'Educator',
      anonymous: 'Anonymous Member',
      all: 'All',
      academic: 'Academic prep & Studies',
      extracurricular: 'Sports & Extracurricular',
      environment: 'School Environment',
      parental: 'Parent Engagement',
      other: 'Other General Ideas',
      upvotes: 'Likes',
      officialResponse: 'School Management Response',
      addComment: 'Write a comment...',
      commentsTitle: 'Discussion & Support',
      formTitleLabel: 'Title of your Idea',
      formDescLabel: 'Describe your Idea in detail',
      formNameLabel: 'Your name (or leave empty for anonymous)',
      formSuccessMsg: '🎉 Thank you! Your suggestion has been posted onto the community board.',
      cancel: 'Cancel',
      submit: 'Post Idea',
      seeComments: 'Comments & Discussion',
      noComments: 'No comments yet. Start the conversation!',
      learnersAndParents: 'Learners & Parents Board',
      writeCommentBtn: 'Comment'
    },
    ZUL: {
      boardTitle: 'Ibhodi Leziphakamiso Zomphakathi',
      boardSubtitle: 'Lapho abafundi, abazali, nothisha babambisana baphinde babelane ngemibono emihle yesikole sethu.',
      searchPlaceholder: 'Hlola iziphakamiso, imibono, nempendulo...',
      addIdea: 'Bhala Umbono Omusha',
      filterCategory: 'Isigaba',
      filterRole: 'Iqhaza',
      sortBy: 'Hlela Ngokwesikhathi',
      popular: 'Okuthandwayo Kakhulu',
      latest: 'Okusha Kakhulu',
      student: 'Umfundi / Ingane',
      parent: 'Umzali / Umgcinisihlalo',
      educator: 'Uthisha / Ofundisayo',
      anonymous: 'Ongaziwa',
      all: 'Konke',
      academic: 'Ezemfundo nezifundo',
      extracurricular: 'Ezomdlalo neziNhlaka tobe',
      environment: 'Indawo Yesikole',
      parental: 'Ukubamba Qhaza Kwabazali',
      other: 'Eminye Imibono Evulelekile',
      upvotes: 'Okuthandwayo',
      officialResponse: 'Impendulo Yesikole Nokulawulwa',
      addComment: 'Bhala ukuphawula kwakho lapha...',
      commentsTitle: 'Izinkulumo nokuxhasana',
      formTitleLabel: 'Isihloko Sombono wakho',
      formDescLabel: 'Chaza Umbono wakho kabanzi',
      formNameLabel: 'Igama lakho (bhala ungalishiyi uma ufuna kube yimfihlo)',
      formSuccessMsg: '🎉 Ngiyabonga! Isiphakamiso sakho sishicilelwe phambi kwebhodi lomphakathi wesikole.',
      cancel: 'Kansela',
      submit: 'Shicilela Umbono',
      seeComments: 'Ukuphawula neZingxoxo',
      noComments: 'Akusekho ukuphawula. Qala ingxoxo manje!',
      learnersAndParents: 'Ibhodi Labafundi Nabazali',
      writeCommentBtn: 'Phawula'
    }
  };

  const activeLabels = lang === 'ENG' ? l.ENG : l.ZUL;

  const handleUpvote = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    
    // Optimistic local update
    setSuggestions(prev => prev.map(item => {
      if (item.id === id) {
        const upvoted = !item.userUpvoted;
        return {
          ...item,
          upvotes: upvoted ? item.upvotes + 1 : item.upvotes - 1,
          userUpvoted: upvoted
        };
      }
      return item;
    }));

    // Post to API backend
    fetch(`/api/suggestions/${id}/upvote`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    })
    .then(res => res.json())
    .then(data => {
      if (data.success && data.suggestions) {
        // Keep in sync with server state
        setSuggestions(data.suggestions);
      }
    })
    .catch(err => console.error("Error upvoting suggestions:", err));
  };

  const handleCreateSuggestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim()) {
      setFormError(lang === 'ENG' ? 'Please enter a title for your idea.' : 'Sicela ufake isihloko sombono wakho.');
      return;
    }
    if (!formDescription.trim()) {
      setFormError(lang === 'ENG' ? 'Please describe your idea in detail.' : 'Sicela uchaze umbono wakho kabanzi.');
      return;
    }

    const payload = {
      title: formTitle,
      description: formDescription,
      category: formCategory,
      author: formName.trim() || activeLabels.anonymous,
      role: formRole
    };

    fetch('/api/suggestions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
    .then(res => res.json())
    .then(data => {
      if (data.success && data.suggestions) {
        setSuggestions(data.suggestions);
        setFormSuccess(true);
        setFormError('');
        
        // Clear form
        setFormTitle('');
        setFormDescription('');
        setFormName('');
        setFormRole('learner');
        setFormCategory('academic');

        setTimeout(() => {
          setFormSuccess(false);
          setShowAddForm(false);
        }, 2500);
      } else {
        setFormError(lang === 'ENG' ? 'Failed to submit suggestion.' : 'Yehlulekile ukuthumela isiphakamiso.');
      }
    })
    .catch(err => {
      console.error(err);
      setFormError(lang === 'ENG' ? 'Server communication failure.' : 'Ukuxhumana kweseva kuhlulekile.');
    });
  };

  const handleAddComment = (e: React.FormEvent, suggestionId: string) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;

    const payload = {
      author: newCommentAuthor.trim() || activeLabels.anonymous,
      role: newCommentRole,
      text: newCommentText
    };

    // Optimistically push comment locally
    const clientTempComment: Comment = {
      id: 'c_temp_' + Date.now(),
      author: payload.author,
      role: payload.role,
      text: payload.text,
      timestamp: lang === 'ENG' ? 'Just now' : 'Manje nje'
    };

    setSuggestions(prev => prev.map(item => {
      if (item.id === suggestionId) {
        return {
          ...item,
          comments: [...item.comments, clientTempComment]
        };
      }
      return item;
    }));

    setNewCommentText('');

    // Trigger backend save
    fetch(`/api/suggestions/${suggestionId}/comment`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
    .then(res => res.json())
    .then(data => {
      if (data.success && data.suggestions) {
        setSuggestions(data.suggestions);
      }
    })
    .catch(err => console.error(err));
  };

  // Filter and Sort implementation
  const filteredSuggestions = suggestions.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(search.toLowerCase()) || 
                          item.description.toLowerCase().includes(search.toLowerCase()) || 
                          item.author.toLowerCase().includes(search.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesRole = selectedRole === 'all' || item.role === selectedRole;

    return matchesSearch && matchesCategory && matchesRole;
  }).sort((a, b) => {
    if (sortBy === 'popular') {
      return b.upvotes - a.upvotes;
    } else {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
  });

  return (
    <div className="bg-surface min-h-screen py-10 md:py-16">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        {/* Back button & header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 border-b border-outline-variant/10 pb-8">
          <div className="flex items-center gap-4">
            <button 
              onClick={onBack}
              className="p-3 bg-white hover:bg-primary/5 text-primary border border-outline-variant/10 rounded-full transition-all duration-300 shadow-sm"
              aria-label="Back"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <span className="text-editorial-label text-primary uppercase tracking-widest">{activeLabels.learnersAndParents}</span>
              <h1 className="text-3xl md:text-5xl editorial-heading mt-1">{activeLabels.boardTitle}</h1>
            </div>
          </div>
          <button
            onClick={() => {
              setFormError('');
              setFormSuccess(false);
              setShowAddForm(true);
            }}
            className="self-start md:self-center bg-primary hover:bg-primary-hover text-white font-bold px-6 py-3.5 rounded-sm tracking-widest text-xs uppercase flex items-center gap-2 shadow-md hover:shadow-lg transition-all duration-300"
          >
            <Plus className="w-4 h-4 text-[#FFD700]" />
            {activeLabels.addIdea}
          </button>
        </div>

        {/* Board Subtitle banner with organic styled background */}
        <div className="bg-gradient-to-r from-primary/5 to-amber-500/5 border-l-4 border-primary p-6 rounded-r-lg mb-12 flex flex-col md:flex-row md:items-center gap-4 justify-between">
          <div className="flex items-start gap-3">
            <div className="bg-primary/10 p-2.5 rounded-full text-primary mt-0.5">
              <Sparkles className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <p className="text-base md:text-lg text-secondary leading-relaxed font-light">
                {activeLabels.boardSubtitle}
              </p>
              <p className="text-xs text-primary/75 mt-1 font-semibold">
                {lang === 'ENG' ? '💡 Popular and constructive ideas will be reviewed weekly by the School Governing Body and Principal Zulu!' : '💡 Imibono edumile nezahlukahlukene izobuyekezwa njalo ngesonto nguGwala woMkhandlu Wesikole kanye noThishanhloko uZulu!'}
              </p>
            </div>
          </div>
        </div>

        {/* Controls block (Search, Filters, Sorters) */}
        <div className="bg-white p-6 md:p-8 rounded-lg border border-outline-variant/10 shadow-sm mb-10 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 md:gap-6">
            {/* Search Box */}
            <div className="lg:col-span-2 relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-secondary/60 w-4 h-4" />
              <input
                type="text"
                placeholder={activeLabels.searchPlaceholder}
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-3 placeholder-secondary/50 text-sm md:text-base border border-outline-variant/20 rounded focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary background-white transition-all duration-200"
              />
            </div>

            {/* Category Select */}
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary/60 flex items-center pointer-events-none">
                <Filter className="w-4 h-4 mr-1" />
              </div>
              <select
                value={selectedCategory}
                onChange={e => setSelectedCategory(e.target.value)}
                className="w-full pl-8 pr-4 py-3.5 border border-outline-variant/20 rounded text-xs md:text-sm font-medium focus:outline-none focus:border-primary bg-white appearance-none transition-all cursor-pointer"
              >
                <option value="all">📁 {activeLabels.filterCategory}: {activeLabels.all}</option>
                <option value="academic">🎓 {activeLabels.academic}</option>
                <option value="extracurricular">⚽ {activeLabels.extracurricular}</option>
                <option value="environment">🌿 {activeLabels.environment}</option>
                <option value="parental">🤝 {activeLabels.parental}</option>
                <option value="other">💬 {activeLabels.other}</option>
              </select>
            </div>

            {/* Sort Order Select */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value as any)}
                className="w-full px-4 py-3.5 border border-outline-variant/20 rounded text-xs md:text-sm font-medium focus:outline-none focus:border-primary bg-white appearance-none transition-all cursor-pointer"
              >
                <option value="popular">🔥 Sort: {activeLabels.popular}</option>
                <option value="latest">⏱️ Sort: {activeLabels.latest}</option>
              </select>
            </div>
          </div>

          <div className="flex gap-2 flex-wrap pt-2 border-t border-outline-variant/10">
            <span className="text-editorial-label text-secondary mr-2 self-center block">{activeLabels.filterRole}:</span>
            {['all', 'learner', 'parent', 'educator'].map((role) => (
              <button
                key={role}
                onClick={() => setSelectedRole(role)}
                className={`px-4 py-2 text-xs font-semibold tracking-wider uppercase transition-all duration-200 rounded-full ${
                  selectedRole === role 
                    ? 'bg-primary text-white shadow-sm' 
                    : 'bg-surface-container hover:bg-surface-container-high text-secondary'
                }`}
              >
                {role === 'all' ? activeLabels.all : activeLabels[role as keyof typeof activeLabels] as string}
              </button>
            ))}
          </div>
        </div>

        {/* Suggestion list flow */}
        <div className="grid grid-cols-1 gap-6 md:gap-8">
          <AnimatePresence mode="popLayout">
            {filteredSuggestions.length > 0 ? (
              filteredSuggestions.map((item) => {
                const isExpanded = expandedSuggestionId === item.id;
                return (
                  <motion.div
                    key={item.id}
                    layout="position"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white border border-outline-variant/10 rounded-sm shadow-sm hover:shadow-md transition-all duration-300"
                  >
                    <div className="p-6 md:p-8">
                      {/* Meta information row */}
                      <div className="flex items-center justify-between gap-4 flex-wrap mb-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold uppercase text-xs ${
                            item.role === 'educator' 
                              ? 'bg-blue-100 text-blue-700' 
                              : item.role === 'parent' 
                                ? 'bg-[#FFD700]/20 text-yellow-800' 
                                : 'bg-red-100 text-red-700'
                          }`}>
                            {item.author.charAt(0)}
                          </div>
                          <div>
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="text-sm font-headline font-bold text-on-surface">{item.author}</span>
                              <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full tracking-wider ${
                                item.role === 'educator' 
                                  ? 'bg-blue-50 text-blue-600' 
                                  : item.role === 'parent' 
                                    ? 'bg-[#FFD700]/10 text-yellow-800' 
                                    : 'bg-red-50 text-red-600'
                              }`}>
                                {activeLabels[item.role]}
                              </span>
                            </div>
                            <span className="text-[10px] text-secondary font-light mt-0.5 block">{item.createdAt.includes('T') ? new Date(item.createdAt).toLocaleDateString() : 'Active Idea'}</span>
                          </div>
                        </div>

                        {/* Category label */}
                        <span className="text-[10px] md:text-editorial-label font-bold uppercase bg-surface p-2 text-primary tracking-widest">
                          {activeLabels[item.category as keyof typeof activeLabels] as string}
                        </span>
                      </div>

                      {/* Title & Body */}
                      <h3 className="text-xl md:text-2xl font-headline font-black text-primary mb-3">
                        {item.title}
                      </h3>
                      <p className="text-sm md:text-base text-secondary font-light leading-relaxed mb-6 whitespace-pre-wrap">
                        {item.description}
                      </p>

                      {/* Official School Admin Response */}
                      {item.schoolResponse && (
                        <div className="bg-red-50/50 dark:bg-red-950/5 border-l-4 border-red-700 p-4 md:p-6 rounded-r-lg mb-6 shadow-xs">
                          <div className="flex items-center gap-2 mb-2 text-primary">
                            <CheckCircle className="w-5 h-5 flex-shrink-0" />
                            <span className="text-xs md:text-sm font-bold uppercase tracking-wider">
                              {activeLabels.officialResponse}
                            </span>
                          </div>
                          <p className="text-xs md:text-sm text-secondary font-medium italic leading-relaxed">
                            "{item.schoolResponse}"
                          </p>
                        </div>
                      )}

                      {/* Footer interaction bar of suggestion */}
                      <div className="flex items-center justify-between gap-4 border-t border-outline-variant/10 pt-4 flex-wrap">
                        <div className="flex items-center gap-4">
                          {/* Upvote button */}
                          <button
                            onClick={(e) => handleUpvote(item.id, e)}
                            className={`flex items-center gap-2 px-3 py-1.5 rounded-full transition-all text-xs md:text-xs font-semibold uppercase tracking-wider ${
                              item.userUpvoted 
                                ? 'bg-primary/10 text-primary p-4 scale-102 font-bold shadow-xs' 
                                : 'hover:bg-surface text-secondary'
                            }`}
                          >
                            <UserUpvoteIcon isUpvoted={!!item.userUpvoted} />
                            <span>{item.upvotes} {activeLabels.upvotes}</span>
                          </button>

                          {/* Comments Trigger Link */}
                          <button
                            onClick={() => setExpandedSuggestionId(isExpanded ? null : item.id)}
                            className={`flex items-center gap-2 px-3 py-1.5 hover:bg-surface rounded-full transition-all text-xs md:text-xs font-semibold uppercase tracking-wider ${
                              isExpanded ? 'text-primary bg-primary/5' : 'text-secondary'
                            }`}
                          >
                            <MessageSquare className="w-4 h-4 text-primary" />
                            <span>{item.comments.length} Comments</span>
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Comments Dropdown section */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.25 }}
                          className="bg-surface border-t border-outline-variant/10 overflow-hidden"
                        >
                          <div className="p-6 md:p-8 space-y-6">
                            <h4 className="text-sm md:text-base font-headline font-bold text-primary border-b border-outline-variant/10 pb-2">
                              💬 {activeLabels.commentsTitle}
                            </h4>

                            {/* Comment items list */}
                            <div className="space-y-4 max-h-80 overflow-y-auto pr-2">
                              {item.comments.length > 0 ? (
                                item.comments.map((comment) => (
                                  <div key={comment.id} className="bg-white p-4 border border-outline-variant/10 rounded-sm shadow-xs flex gap-3">
                                    <div className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center font-bold text-xs uppercase text-primary self-start">
                                      {comment.author.charAt(0)}
                                    </div>
                                    <div className="flex-1">
                                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                                        <span className="text-xs font-bold text-on-surface">{comment.author}</span>
                                        <span className="text-[9px] uppercase px-1.5 py-0.2 bg-surface rounded-full text-secondary font-medium">
                                          {activeLabels[comment.role]}
                                        </span>
                                        <span className="text-[9px] text-secondary font-light ml-auto">{comment.timestamp}</span>
                                      </div>
                                      <p className="text-xs md:text-sm text-secondary font-normal leading-relaxed">
                                        {comment.text}
                                      </p>
                                    </div>
                                  </div>
                                ))
                              ) : (
                                <p className="text-xs text-secondary/60 italic py-4 text-center">
                                  {activeLabels.noComments}
                                </p>
                              )}
                            </div>

                            {/* Write a comment form */}
                            <form 
                              onSubmit={(e) => handleAddComment(e, item.id)}
                              className="mt-4 pt-4 border-t border-outline-variant/10 grid grid-cols-1 md:grid-cols-12 gap-3"
                            >
                              <div className="md:col-span-3">
                                <input
                                  type="text"
                                  placeholder={lang === 'ENG' ? 'Your Name' : 'Igama Lakho'}
                                  required
                                  value={newCommentAuthor}
                                  onChange={e => setNewCommentAuthor(e.target.value)}
                                  className="w-full px-3 py-2 text-xs border border-outline-variant/20 rounded focus:outline-none focus:border-primary bg-white h-[42px]"
                                />
                              </div>
                              <div className="md:col-span-3 relative">
                                <select
                                  value={newCommentRole}
                                  onChange={e => setNewCommentRole(e.target.value as any)}
                                  className="w-full px-3 py-2 text-xs border border-outline-variant/20 rounded focus:outline-none focus:border-primary bg-white appearance-none cursor-pointer h-[42px]"
                                >
                                  <option value="learner">👦 {activeLabels.student}</option>
                                  <option value="parent">🏡 {activeLabels.parent}</option>
                                  <option value="educator">💼 {activeLabels.educator}</option>
                                </select>
                              </div>
                              <div className="md:col-span-4">
                                <input
                                  type="text"
                                  placeholder={activeLabels.addComment}
                                  required
                                  value={newCommentText}
                                  onChange={e => setNewCommentText(e.target.value)}
                                  className="w-full px-3 py-2 text-xs border border-outline-variant/20 rounded focus:outline-none focus:border-primary bg-white h-[42px]"
                                />
                              </div>
                              <div className="md:col-span-2">
                                <button
                                  type="submit"
                                  className="w-full h-[42px] bg-primary hover:bg-primary-hover text-white text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-1 shadow-sm rounded-sm"
                                >
                                  <Send className="w-3 h-3 text-[#FFD700]" />
                                  {activeLabels.writeCommentBtn}
                                </button>
                              </div>
                            </form>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })
            ) : (
              <motion.div 
                layout
                className="bg-white p-16 text-center border border-outline-variant/10 rounded"
              >
                <MessageSquare className="w-16 h-16 text-secondary/30 mx-auto mb-4" />
                <h4 className="text-xl font-bold font-headline text-primary mb-2">
                  {lang === 'ENG' ? 'No suggestions match your filters.' : 'Akukho ziphakamiso ezihambelana nezihlungi zakho.'}
                </h4>
                <p className="text-secondary max-w-md mx-auto text-sm leading-relaxed">
                  {lang === 'ENG' ? 'Try searching for something else or be the first to post a new idea by clicking the Share New Idea button!' : 'Zama ukuhlola enye into noma ube ngowokuqala ukubhala isiphakamiso sethu esisha!'}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Share New Idea Modal Pop-up Form */}
      <AnimatePresence>
        {showAddForm && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAddForm(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-xs"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-white rounded-lg shadow-2xl relative max-w-xl w-full overflow-hidden z-[101]"
            >
              {/* Form title header */}
              <div className="bg-primary text-white p-6 relative flex justify-between items-center border-b border-primary-container">
                <div>
                  <h3 className="text-xl md:text-2xl font-headline font-black tracking-tight text-white uppercase flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-[#FFD700]" />
                    {activeLabels.addIdea}
                  </h3>
                  <p className="text-[10px] text-white/70 uppercase tracking-widest mt-1">Umzilikazi community dialogue</p>
                </div>
                <button
                  onClick={() => setShowAddForm(false)}
                  className="p-1 rounded-full hover:bg-white/10 transition-colors text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Form container */}
              <form onSubmit={handleCreateSuggestion} className="p-6 md:p-8 space-y-5">
                {formSuccess ? (
                  <div className="py-12 text-center text-primary space-y-4">
                    <CheckCircle className="w-16 h-16 text-green-600 mx-auto animate-bounce" />
                    <p className="text-lg font-headline font-black text-primary leading-relaxed px-4">
                      {activeLabels.formSuccessMsg}
                    </p>
                  </div>
                ) : (
                  <>
                    {formError && (
                      <div className="bg-red-50 border-l-4 border-red-600 text-red-700 p-3 h-auto text-xs rounded">
                        <strong>⚠️ {lang === 'ENG' ? 'Error' : 'Iphutha'}:</strong> {formError}
                      </div>
                    )}

                    {/* Author Personal Info row (Name + Role) */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold uppercase text-secondary mb-1.5">{activeLabels.formNameLabel}</label>
                        <input
                          type="text"
                          placeholder="e.g. Sipho Sithole"
                          value={formName}
                          onChange={e => setFormName(e.target.value)}
                          className="w-full px-3.5 py-3 border border-outline-variant/20 rounded text-sm focus:outline-none focus:border-primary bg-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase text-secondary mb-1.5">{activeLabels.filterRole}</label>
                        <select
                          value={formRole}
                          onChange={e => setFormRole(e.target.value as any)}
                          className="w-full px-3.5 py-3 border border-outline-variant/20 rounded text-sm focus:outline-none focus:border-primary bg-white appearance-none cursor-pointer"
                        >
                          <option value="learner">👦 {activeLabels.student}</option>
                          <option value="parent">🏡 {activeLabels.parent}</option>
                          <option value="educator">💼 {activeLabels.educator}</option>
                        </select>
                      </div>
                    </div>

                    {/* Category Selector */}
                    <div>
                      <label className="block text-xs font-bold uppercase text-secondary mb-1.5">{activeLabels.filterCategory}</label>
                      <select
                        value={formCategory}
                        onChange={e => setFormCategory(e.target.value as any)}
                        className="w-full px-3.5 py-3 border border-outline-variant/20 rounded text-sm focus:outline-none focus:border-primary bg-white appearance-none cursor-pointer"
                      >
                        <option value="academic">🎓 {activeLabels.academic}</option>
                        <option value="extracurricular">⚽ {activeLabels.extracurricular}</option>
                        <option value="environment">🌿 {activeLabels.environment}</option>
                        <option value="parental">🤝 {activeLabels.parental}</option>
                        <option value="other">💬 {activeLabels.other}</option>
                      </select>
                    </div>

                    {/* Idea title */}
                    <div>
                      <label className="block text-xs font-bold uppercase text-secondary mb-1.5">{activeLabels.formTitleLabel} *</label>
                      <input
                        type="text"
                        placeholder={lang === 'ENG' ? 'e.g. Setting up weekend study groups' : 'isb. Ezokusunguzwa kweqembu lokufunda ngempelasonto'}
                        required
                        value={formTitle}
                        onChange={e => setFormTitle(e.target.value)}
                        className="w-full px-3.5 py-3 border border-outline-variant/20 rounded text-sm focus:outline-none focus:border-primary bg-white"
                      />
                    </div>

                    {/* Idea body details */}
                    <div>
                      <label className="block text-xs font-bold uppercase text-secondary mb-1.5">{activeLabels.formDescLabel} *</label>
                      <textarea
                        rows={4}
                        placeholder={lang === 'ENG' ? 'Describe your idea, who it benefits, and how the school can organize it...' : 'Chaza imininingwane yephrojekthi, ukuthi yikuphi abagqugquzeli abazohlomula, nokuthi isikole singasihlela kanjani...'}
                        required
                        value={formDescription}
                        onChange={e => setFormDescription(e.target.value)}
                        className="w-full px-3.5 py-3 border border-outline-variant/20 rounded text-sm focus:outline-none focus:border-primary bg-white"
                      />
                    </div>

                    {/* Form actions */}
                    <div className="flex gap-3 justify-end pt-3 border-t border-outline-variant/10">
                      <button
                        type="button"
                        onClick={() => setShowAddForm(false)}
                        className="px-5 py-3 bg-surface hover:bg-surface-container-high text-secondary rounded-sm text-xs font-bold uppercase tracking-widest transition-all"
                      >
                        {activeLabels.cancel}
                      </button>
                      <button
                        type="submit"
                        className="px-6 py-3 bg-primary hover:bg-primary-hover text-white font-bold rounded-sm text-xs uppercase tracking-widest flex items-center gap-1 shadow-md hover:shadow-lg transition-all"
                      >
                        <Send className="w-3.5 h-3.5 text-[#FFD700]" />
                        {activeLabels.submit}
                      </button>
                    </div>
                  </>
                )}
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Micro-component for neat upvote heart feedback
function UserUpvoteIcon({ isUpvoted }: { isUpvoted: boolean }) {
  if (isUpvoted) {
    return (
      <motion.div
        animate={{ scale: [1, 1.4, 1] }}
        transition={{ duration: 0.3 }}
      >
        <ThumbsUp className="w-4 h-4 text-primary fill-primary" />
      </motion.div>
    );
  }
  return <ThumbsUp className="w-4 h-4 text-secondary/60" />;
}
