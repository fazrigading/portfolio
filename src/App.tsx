/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, useScroll, useSpring, AnimatePresence } from 'motion/react';
import { 
  ExternalLink, 
  ChevronRight,
  Menu,
  X,
  Sun,
  Moon,
  BookOpen,
  Cpu
} from 'lucide-react';
import { useState, useEffect } from 'react';

// Data Imports
import researchData from './data/research.json';
import learningDataRaw from './data/learning.json';
import experienceDataRaw from './data/experience.json';
import projectsDataRaw from './data/projects.json';
import navLinks from './data/navigation.json';
import socialData from './data/social.json';
import profile from './data/profile.json';
import { getIcon } from './data/icons';

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') || 'dark';
    }
    return 'dark';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };
  const [activeFilter, setActiveFilter] = useState('All');
  const [researchSortBy, setResearchSortBy] = useState('year');

  const [activeExpFilter, setActiveExpFilter] = useState('All');

  const sortedResearch = [...researchData].sort((a, b) => {
    if (researchSortBy === 'year') return b.year - a.year;
    return a.title.localeCompare(b.title);
  });

  const [activeLearningFilter, setActiveLearningFilter] = useState('All');
  const [activeTagFilter, setActiveTagFilter] = useState('All');
  
  const learningData = learningDataRaw.map(item => ({
    ...item,
    icon: getIcon(item.icon, 24)
  }));

  const experienceData = experienceDataRaw.map(item => ({ ...item }));

  const learningTags = ['All', 'AI', 'ML', 'DL', 'CV', 'SWE', 'Java', 'Web', 'Linux', 'DS', 'Cloud', 'Python', 'R', 'TF', 'Git', 'SQL', 'PHP', 'JS'];

  const [activeProjectFilter, setActiveProjectFilter] = useState('All');

  const projectsData = projectsDataRaw.map(item => ({
    ...item,
    icon: getIcon(item.icon, 24)
  }));
  
  const [activeSection, setActiveSection] = useState('home');
  const [expScroll, setExpScroll] = useState({ top: false, bottom: false });
  const [researchScroll, setResearchScroll] = useState({ top: false, bottom: false });
  const [learningScroll, setLearningScroll] = useState({ top: false, bottom: false });

  const handleScroll = (setter: React.Dispatch<React.SetStateAction<{ top: boolean; bottom: boolean }>>) => (e: React.UIEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    setter({ top: el.scrollTop > 0, bottom: el.scrollTop < el.scrollHeight - el.clientHeight - 1 });
  };


  const [roleIndex, setRoleIndex] = useState(0);
  const [techIndex, setTechIndex] = useState(0);

  const roles = profile.roles;
  const techs = profile.techs;

  const socialLinks = socialData.socialLinks.map(link => ({
    ...link,
    icon: getIcon(link.icon, 18)
  }));

  useEffect(() => {
    const roleTimer = setInterval(() => {
      setRoleIndex((prev) => {
        let next;
        do {
          next = Math.floor(Math.random() * roles.length);
        } while (next === prev);
        return next;
      });
    }, 3500);

    const techTimer = setInterval(() => {
      setTechIndex((prev) => {
        let next;
        do {
          next = Math.floor(Math.random() * techs.length);
        } while (next === prev);
        return next;
      });
    }, 3500);

    return () => {
      clearInterval(roleTimer);
      clearInterval(techTimer);
    };
  }, []);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['about', 'experience', 'research', 'learning', 'projects'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element && scrollPosition >= element.offsetTop && scrollPosition < element.offsetTop + element.offsetHeight) {
          setActiveSection(section);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen font-sans selection:bg-brand-accent/30 selection:text-white bg-brand-bg relative overflow-hidden transition-colors duration-300 animate-gradient">
      {/* Dynamic Background Pattern */}
      <div className="fixed inset-0 bg-dot-grid opacity-[0.12] pointer-events-none z-0" />
      <div className="fixed inset-0 bg-noise opacity-[0.03] pointer-events-none z-0 mix-blend-overlay" />
      <div className="fixed inset-0 scanline opacity-[0.2] pointer-events-none z-0" />

      {/* Floating Decorative Elements */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <motion.div 
          animate={{
            x: [0, 20, 0],
            y: [0, -20, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-40 -left-40 w-96 h-96 bg-brand-accent/5 rounded-full blur-[150px]" 
        />
        <motion.div 
          animate={{
            x: [0, -30, 0],
            y: [0, 30, 0],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-40 -right-40 w-96 h-96 bg-brand-accent/10 rounded-full blur-[150px]" 
        />
      </div>

      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-brand-accent z-100 origin-left"
        style={{ scaleX }}
      />

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 border-b border-brand-border bg-brand-bg/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <motion.a 
            href="#home"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-xl font-bold tracking-tighter flex items-center gap-4"
          >
            <div className="w-8 h-8 rounded-none border border-brand-accent flex items-center justify-center">
              <span className="text-brand-accent font-mono text-[10px] font-bold">{profile.nameShort}</span>
            </div>
            <span className="hidden sm:inline uppercase tracking-tight font-bold">{profile.name}</span>
          </motion.a>

          {/* Desktop Nav */}
          <div className="desktop-nav hidden items-center gap-8">
            {navLinks.map((link, i) => (
              <motion.a
                key={link.name}
                href={link.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`text-[10px] uppercase tracking-widest font-medium transition-colors hover:text-brand-accent ${
                  activeSection === link.href.slice(1) ? 'text-brand-accent' : 'text-brand-secondary'
                }`}
              >
                {link.name}
              </motion.a>
            ))}
            <motion.a
              href={`mailto:${profile.email}`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="px-4 py-1.5 border border-brand-primary text-[10px] uppercase font-bold hover:bg-brand-primary hover:text-brand-bg transition-all active:scale-95"
            >
              Contact
            </motion.a>

            {/* Theme Toggle */}
            <motion.button
              onClick={toggleTheme}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              className="p-2 border border-brand-border hover:border-brand-accent transition-all text-brand-secondary hover:text-brand-accent"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
            </motion.button>
          </div>

          {/* Mobile Menu Actions */}
          <div className="mobile-nav flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="p-2 text-brand-secondary hover:text-brand-accent transition-colors"
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button 
              className="p-2 text-brand-primary/70 hover:text-brand-primary transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Nav Overlay */}
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mobile-nav absolute top-20 left-0 w-full bg-brand-bg border-b border-brand-border p-6 flex flex-col gap-4"
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="text-lg font-medium text-brand-secondary active:text-brand-accent"
              >
                {link.name}
              </a>
            ))}
          </motion.div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        {/* Background Decor */}
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-brand-accent/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-brand-accent/10 rounded-full blur-[100px]" />

        <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1 bg-brand-muted text-[12px] font-mono tracking-widest text-brand-accent uppercase mb-8 border-l-2 border-brand-accent"
            >
              {profile.heroBadge}
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-9xl font-bold tracking-tighter mb-4 leading-[0.85] uppercase italic flex flex-col sm:flex-row sm:items-baseline gap-y-2 gap-x-2 sm:gap-x-4 md:gap-x-8"
            >
              <div className="relative h-[1em] overflow-visible inline-flex">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={techs[techIndex]}
                    initial={{ y: "100%", opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: "-100%", opacity: 0 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="whitespace-nowrap inline-block"
                  >
                    {techs[techIndex]}
                  </motion.span>
                </AnimatePresence>
              </div>
              <div className="relative h-[1em] overflow-visible inline-flex">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={roles[roleIndex]}
                    initial={{ y: "100%", opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: "-100%", opacity: 0 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
                    className="whitespace-nowrap inline-block"
                  >
                    {roles[roleIndex]}
                  </motion.span>
                </AnimatePresence>
              </div>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg md:text-xl text-brand-secondary font-mono mb-4 max-w-2xl leading-relaxed"
            >
              &mdash; {profile.heroTagline}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-col gap-4 items-start"
            >
              <div className="flex flex-wrap gap-3">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    whileHover={{ scale: 1.02 }}
                    className={`flex items-center h-12 px-4 glass-panel transition-colors ${social.color} group relative overflow-hidden`}
                  >
                    <div className="relative z-10">{social.icon}</div>
                    <span className="whitespace-nowrap text-[10px] font-mono font-bold uppercase tracking-widest relative z-10 overflow-hidden transition-all duration-500 ease-in-out opacity-100 ml-2 max-w-37.5 sm:max-w-0 sm:opacity-0 sm:ml-0 group-hover:sm:max-w-37.5 group-hover:sm:opacity-100 group-hover:sm:ml-2">
                      {social.name}
                    </span>
                    <div className="absolute inset-0 bg-brand-accent/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </motion.a>
                ))}
              </div>
              
              <a href="#projects" className="h-12 px-8 border border-brand-accent/30 text-[12px] uppercase tracking-widest font-bold hover:bg-brand-accent hover:text-brand-bg transition-all inline-flex items-center gap-2 group">
                Access Projects
                <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative aspect-square glass-panel p-2 flex items-center justify-center group overflow-hidden"
            >
              <div className="absolute inset-0 bg-brand-accent/5 transition-opacity group-hover:opacity-10" />
              <div className="relative z-10 text-center space-y-4">
                <div className="w-20 h-20 mx-auto bg-brand-accent/5 flex items-center justify-center border border-brand-accent/20">
                  <Cpu size={30} className="text-brand-accent" />
                </div>
                <h3 className="text-2xl font-serif italic text-brand-secondary/80">Innovation in Bloom</h3>
                <p className="mono-label">{profile.name} | AI Systems</p>
              </div>
              
              {/* Dynamic corners */}
              <div className="absolute top-4 left-4 w-6 h-6 border-t border-l border-brand-accent/40" />
              <div className="absolute bottom-4 right-4 w-6 h-6 border-b border-r border-brand-accent/40" />
            </motion.div>

            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-sm font-mono text-brand-accent tracking-widest uppercase">01 / About Me</h2>
                <h3 className="text-4xl font-bold tracking-tight">{profile.about.title}</h3>
              </div>
              
              <div className="space-y-6 text-brand-secondary font-light leading-relaxed">
                <p dangerouslySetInnerHTML={{ __html: profile.about.intro.replace(/\*\*(.*?)\*\*/g, '<span class="text-brand-primary font-medium italic">$1</span>') }} />
                <p dangerouslySetInnerHTML={{ __html: profile.about.detailed.replace(/\*\*(.*?)\*\*/g, '<span class="text-brand-accent">$1</span>') }} />
              </div>

              <div className="grid grid-cols-2 gap-6 pt-4">
                {profile.about.highlights.map((highlight) => (
                  <div key={highlight.title} className="p-4 glass-panel border-brand-border space-y-2">
                    {getIcon(highlight.icon, 20)}
                    <h4 className="text-sm font-semibold">{highlight.title}</h4>
                    <p className="text-xs text-brand-secondary">{highlight.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

       {/* Experience Section */}
      <section id="experience" className="py-32 bg-brand-muted/40 border-y border-brand-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
            <div className="space-y-4">
              <h2 className="text-sm font-mono text-brand-accent tracking-widest uppercase">02 / Experience</h2>
              <h3 className="text-4xl md:text-5xl font-bold tracking-tight leading-none">Professional Journey.</h3>
            </div>
            
            {/* Experience Filters */}
            <div className="flex flex-wrap gap-2">
              {['All', 'Technical', 'Research', 'Organizational', 'Design', 'Other'].map((f) => (
                <button
                  key={f}
                  onClick={() => setActiveExpFilter(f)}
                  className={`px-3 py-1.5 text-[12px] font-mono border transition-all ${
                    activeExpFilter === f 
                      ? 'bg-brand-accent border-brand-accent text-brand-bg font-bold' 
                      : 'border-brand-border text-brand-secondary hover:border-brand-accent'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className={`absolute top-0 left-0 right-4 h-6 bg-gradient-to-b from-brand-primary/10 to-transparent z-10 pointer-events-none transition-opacity duration-200 ${expScroll.top ? 'opacity-100' : 'opacity-0'}`} />
            <div className={`absolute bottom-0 left-0 right-4 h-6 bg-gradient-to-t from-brand-primary/10 to-transparent z-10 pointer-events-none transition-opacity duration-200 ${expScroll.bottom ? 'opacity-100' : 'opacity-0'}`} />
            <div className="max-h-130 overflow-y-auto pr-4 custom-scrollbar" onScroll={handleScroll(setExpScroll)}>
              <div className="space-y-4">
              <AnimatePresence mode="popLayout">
                {experienceData
                  .filter(item => activeExpFilter === 'All' || item.type === activeExpFilter)
                  .map((exp, i) => (
                    <motion.div
                      key={exp.id + exp.role}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ delay: i * 0.05 }}
                      className="group p-8 bg-brand-bg/60 hover:bg-brand-muted/80 backdrop-blur-sm transition-all flex flex-col lg:flex-row gap-8 items-start lg:items-center relative border border-brand-border hover:border-brand-accent/30 shadow-sm"
                    >
                    <div className="flex items-center gap-6 lg:w-1/3">
                      <span className="hidden sm:block font-mono text-xs text-brand-secondary/40 group-hover:text-brand-accent transition-colors">
                        {exp.id}
                      </span>
                      <div className="space-y-1 w-full">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                          <h4 className="text-lg font-bold uppercase leading-tight">{exp.role}</h4>
                          <span className="px-1.5 py-0.5 bg-brand-accent/10 text-brand-accent text-[8px] font-mono uppercase rounded whitespace-nowrap">
                            {exp.type}
                          </span>
                        </div>
                        <p className="text-brand-accent text-[11px] font-mono tracking-widest uppercase font-bold">{exp.company}</p>
                      </div>
                    </div>
                    
                    <div className="lg:w-1/2 space-y-4">
                      <p className="text-brand-secondary text-sm font-light leading-relaxed">
                        {exp.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {exp.skills.map(skill => (
                          <span key={skill} className="text-[12px] font-mono px-2 py-0.5 bg-brand-muted border border-brand-border rounded text-brand-accent/70">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="lg:w-1/6 lg:text-right font-mono text-[14px] text-brand-secondary/60 font-bold">
                      {exp.period}
                    </div>
                    {/* Hover Decor */}
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-brand-accent scale-y-0 group-hover:scale-y-100 transition-transform origin-top duration-300" />
                  </motion.div>
                ))}
              </AnimatePresence>
              </div>
          </div>
        </div>
      </div>
    </section>

      {/* Research Section */}
      <section id="research" className="py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4 space-y-8">
              <div className="space-y-4">
                <h2 className="text-sm font-mono text-brand-accent tracking-widest uppercase">03 / Research</h2>
                <h3 className="text-4xl font-bold tracking-tight">Academic Contributions.</h3>
                <p className="text-brand-secondary font-light leading-relaxed">
                  Dedicated to advancing the state-of-the-art in deep learning applications for the agricultural sector. My research focuses on reliability in uncontrolled natural backgrounds.
                </p>
              </div>

              {/* Profile Links */}
              <div className="space-y-4">
                <h4 className="text-xs font-mono uppercase tracking-widest text-brand-secondary">Scholarly Profiles</h4>
                <div className="grid grid-cols-2 gap-3">
                  {socialData.scholarProfiles.map((profile) => (
                    <a
                      key={profile.name}
                      href={profile.href}
                      className={`flex items-center gap-2 p-3 glass-panel text-xs uppercase font-mono tracking-tight ${profile.color} transition-colors group`}
                    >
                      <span className="text-brand-secondary group-hover:text-inherit">{getIcon(profile.icon, 14)}</span>
                      {profile.name}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-8 space-y-8">
              {/* Filters & Sorting */}
              <div className="flex flex-col sm:flex-row justify-between gap-4 pb-4 border-b border-brand-border">
                <div className="flex flex-wrap gap-2">
                  {['All', 'Scopus Q1', 'Scopus Q2', 'Scopus Q3', 'Scopus Q4', 'IEEE', 'Conference', 'SINTA 1', 'SINTA 2', 'SINTA 3', 'SINTA 4'].map((f) => (
                    <button
                      key={f}
                      onClick={() => setActiveFilter(f)}
                      className={`px-3 py-1.5 text-[10px] font-mono border transition-all ${
                        activeFilter === f 
                          ? 'bg-brand-accent border-brand-accent text-brand-bg font-bold' 
                          : 'border-brand-border text-brand-secondary hover:border-brand-accent'
                      }`}
                    >
                      {f}
                    </button>
                  ))}
                </div>
                
                <div className="flex items-center gap-2 border-l border-brand-border pl-4">
                  <span className="text-[10px] font-mono text-brand-secondary uppercase">Sort:</span>
                  <button 
                    onClick={() => setResearchSortBy('year')}
                    className={`text-[10px] font-mono uppercase ${researchSortBy === 'year' ? 'text-brand-accent font-bold' : 'text-brand-secondary hover:text-brand-primary'}`}
                  >
                    Year
                  </button>
                  <span className="text-brand-border h-3 w-px bg-brand-border" />
                  <button 
                    onClick={() => setResearchSortBy('title')}
                    className={`text-[10px] font-mono uppercase ${researchSortBy === 'title' ? 'text-brand-accent font-bold' : 'text-brand-secondary hover:text-brand-primary'}`}
                  >
                    Title
                  </button>
                </div>
              </div>

              {/* Research Entries */}
              <div className="relative">
                <div className={`absolute top-0 left-0 right-4 h-6 bg-gradient-to-b from-brand-primary/10 to-transparent z-10 pointer-events-none transition-opacity duration-200 ${researchScroll.top ? 'opacity-100' : 'opacity-0'}`} />
                <div className={`absolute bottom-0 left-0 right-4 h-6 bg-gradient-to-t from-brand-primary/10 to-transparent z-10 pointer-events-none transition-opacity duration-200 ${researchScroll.bottom ? 'opacity-100' : 'opacity-0'}`} />
                <div className="space-y-6 max-h-127.5 overflow-y-auto pr-4 custom-scrollbar" onScroll={handleScroll(setResearchScroll)}>
                  <AnimatePresence mode="popLayout">
                    {sortedResearch
                    .filter(item => activeFilter === 'All' || item.category === activeFilter)
                    .map((item, idx) => (
                      <motion.div
                        key={item.title}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ delay: idx * 0.05 }}
                        className="p-6 md:p-8 glass-panel border-l-2 border-l-brand-accent bg-brand-muted/40 group relative"
                      >
                        <div className="absolute top-2 right-4 text-[40px] font-bold text-brand-accent/5 pointer-events-none group-hover:text-brand-accent/10 transition-colors">
                          {(idx + 1).toString().padStart(2, '0')}
                        </div>
                        <div className="flex flex-col md:flex-row justify-between gap-4">
                          <div className="space-y-3">
                            <div className="flex items-center gap-3 flex-wrap">
                              <span className="px-2 py-0.5 bg-brand-accent text-brand-bg text-[9px] font-mono font-bold uppercase">
                                {item.category}
                              </span>
                              <span className={`px-2 py-0.5 text-[9px] font-mono font-bold uppercase ${
                                item.status === 'Published' ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
                                item.status === 'Accepted' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' :
                                item.status === 'In-Review' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' :
                                item.status === 'Submitted' ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30' :
                                item.status === 'Draft' ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30' :
                                'bg-gray-500/20 text-gray-400 border border-gray-500/30'
                              }`}>
                                {item.status}
                              </span>
                              <span className="text-brand-secondary font-mono text-[10px]">{item.year}</span>
                            </div>
                            <h4 className="text-xl font-serif italic leading-snug group-hover:text-brand-accent transition-colors">
                              {item.title}
                            </h4>
                            <p className="text-brand-secondary text-xs font-light italic">
                              {item.authors.split('; ').map((author, i, arr) => (
                                <span key={i}>
                                  <span className={author === 'Gading, F.R.N.' ? 'font-bold text-brand-primary' : ''}>{author}</span>
                                  {i < arr.length - 1 && '; '}
                                </span>
                              ))}
                            </p>
                            <div className="flex items-center gap-4 pt-2">
                              {item.articleUrl !== '#' && (
                                <a 
                                  href={item.articleUrl} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="flex items-center gap-1.5 text-[10px] font-mono text-brand-accent hover:underline uppercase tracking-widest"
                                >
                                  View <ExternalLink size={10} />
                                </a>
                              )}
                              <a 
                                href={item.journalUrl} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="flex items-center gap-1.5 text-[10px] font-mono text-brand-secondary hover:text-brand-primary uppercase tracking-widest"
                              >
                                {item.journal} <BookOpen size={10} />
                              </a>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Learning Section */}
      <section id="learning" className="py-32 bg-brand-muted/20 border-y border-brand-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 mb-16">
            <div className="space-y-4">
              <h2 className="text-sm font-mono text-brand-accent tracking-widest uppercase">04 / Continuous Learning</h2>
              <h3 className="text-4xl md:text-5xl font-bold tracking-tight leading-none">Certifications & Training.</h3>
            </div>
            
            <div className="space-y-4">
              {/* Type Filters */}
              <div className="flex flex-wrap gap-2">
                <span className="text-[10px] font-mono text-brand-secondary uppercase self-center mr-2">Type:</span>
                {['All', 'Certification', 'Bootcamp', 'Course'].map((f) => (
                  <button
                    key={f}
                    onClick={() => setActiveLearningFilter(f)}
                    className={`px-3 py-1.5 text-[10px] font-mono border transition-all ${
                      activeLearningFilter === f 
                        ? 'bg-brand-accent border-brand-accent text-brand-bg font-bold' 
                        : 'border-brand-border text-brand-secondary hover:border-brand-accent'
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
              
              {/* Tag Filters */}
              <div className="flex flex-wrap gap-2">
                <span className="text-[10px] font-mono text-brand-secondary uppercase self-center mr-2">Tag:</span>
                {learningTags.map((t) => (
                  <button
                    key={t}
                    onClick={() => setActiveTagFilter(t)}
                    className={`px-3 py-1.5 text-[10px] font-mono border transition-all ${
                      activeTagFilter === t 
                        ? 'bg-brand-accent border-brand-accent text-brand-bg font-bold' 
                        : 'border-brand-border text-brand-secondary hover:border-brand-accent'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="relative">
                <div className={`absolute top-0 left-0 right-4 h-6 bg-gradient-to-b from-brand-primary/10 to-transparent z-10 pointer-events-none transition-opacity duration-200 ${learningScroll.top ? 'opacity-100' : 'opacity-0'}`} />
                <div className={`absolute bottom-0 left-0 right-4 h-6 bg-gradient-to-t from-brand-primary/10 to-transparent z-10 pointer-events-none transition-opacity duration-200 ${learningScroll.bottom ? 'opacity-100' : 'opacity-0'}`} />
                <div className="max-h-150 overflow-y-auto pr-4 custom-scrollbar" onScroll={handleScroll(setLearningScroll)}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              <AnimatePresence mode="popLayout">
                {learningData
                  .filter(item => (activeLearningFilter === 'All' || item.type === activeLearningFilter) && (activeTagFilter === 'All' || item.tags.includes(activeTagFilter)))
                  .map((item, i) => (
                    <motion.div
                      key={item.title}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.3, delay: i * 0.03 }}
                      className="p-8 glass-panel border border-brand-border hover:border-brand-accent/30 bg-brand-bg transition-all group flex flex-col justify-between min-h-55 shadow-sm hover:shadow-md"
                    >
                      <div className="space-y-5">
<div className="flex justify-between items-start">
                            <div className="p-3 bg-brand-accent/5 text-brand-accent group-hover:bg-brand-accent transition-all duration-300 group-hover:text-brand-bg rounded-lg">
                              {item.icon}
                            </div>
                            <span className="text-xs font-mono text-brand-secondary/60 uppercase font-medium">{(item as any).date}</span>
                          </div>
                        <div>
                          <h4 className="text-lg font-bold leading-tight group-hover:text-brand-accent transition-colors line-clamp-2">{item.title}</h4>
                          <p className="text-sm text-brand-secondary mt-2 font-mono uppercase tracking-tighter opacity-80">{item.provider}</p>
                          {(item as any).credentialId && (
                            <p className="text-[10px] font-mono text-brand-accent/60 mt-1">ID: {(item as any).credentialId}</p>
                          )}
                        </div>
                      </div>
                      <div className="mt-6 pt-6 border-t border-brand-border/30 flex justify-between items-start gap-4">
                        <div className="flex gap-2">
                          <span className="text-[10px] font-mono px-2.5 py-1 bg-brand-accent/10 text-brand-accent border border-brand-accent/20 rounded">
                            {item.type}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-1 justify-end">
                          {item.tags.map(tag => (
                            <span key={tag} className="text-[9px] font-mono px-1.5 py-0.5 bg-brand-muted text-brand-secondary border border-brand-border rounded">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  ))}
              </AnimatePresence>
            </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-32 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-sm font-mono text-brand-accent tracking-widest uppercase">05 / Featured Work</h2>
            <h3 className="text-4xl md:text-6xl font-bold tracking-tight">Engineering Solutions.</h3>
          </div>

          {/* Project Filters */}
          <div className="flex flex-wrap justify-center gap-2 mb-16 pb-8 border-b border-brand-border">
            {['All', 'AI / Computer Vision', 'AI / Deep Learning', 'AI / Retrieval-Augmented Generation', 'AI / Machine Learning', 'Software Engineering', 'Data Science', 'Data Engineering'].map((f) => (
              <button
                key={f}
                onClick={() => setActiveProjectFilter(f)}
                className={`px-4 py-2 text-[10px] font-mono border transition-all ${
                  activeProjectFilter === f 
                    ? 'bg-brand-accent border-brand-accent text-brand-bg font-bold' 
                    : 'border-brand-border text-brand-secondary hover:border-brand-accent'
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {projectsData
                .filter(item => activeProjectFilter === 'All' || item.category === activeProjectFilter)
                .map((project, i) => (
                  <motion.div
                    key={project.title}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3, delay: i * 0.05 }}
                    className="group flex flex-col glass-panel hover:border-brand-accent/50 transition-all p-8 relative overflow-hidden bg-brand-muted/50 shadow-sm"
                  >
                    <div className="flex justify-between items-start mb-8">
                      <div className="w-12 h-12 glass-panel border-brand-accent/20 flex items-center justify-center text-brand-accent group-hover:bg-brand-accent/10 transition-colors">
                        {project.icon}
                      </div>
                      <a href={project.link} className="p-2 border border-brand-border group-hover:border-brand-accent/30 transition-all">
                        <ExternalLink size={14} className="group-hover:text-brand-accent transition-colors" />
                      </a>
                    </div>

                    <div className="text-[10px] font-mono text-brand-accent tracking-widest uppercase mb-2">
                        {project.category}
                    </div>

                    <h4 className="text-lg font-bold uppercase tracking-tight group-hover:text-brand-accent transition-colors">
                      {project.title}
                    </h4>
                    {(project as any).subtitle && (
                      <p className="text-xs text-brand-secondary/70 font-mono mt-1 mb-4 tracking-wide">
                        {(project as any).subtitle}
                      </p>
                    )}
                    
                    <p className="text-brand-secondary text-sm font-light leading-relaxed mb-8 grow">
                      {project.desc}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {project.tech.map(t => (
                        <span key={t} className="text-[10px] font-mono px-2 py-1 bg-brand-muted text-brand-secondary/80 border border-brand-border/50">
                          {t}
                        </span>
                      ))}
                    </div>

                    {/* Corner Accent */}
                    <div className="absolute -top-4 -right-4 w-12 h-12 bg-brand-accent/5 rotate-45 group-hover:bg-brand-accent/10 transition-colors" />
                  </motion.div>
                ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 border-t border-brand-border bg-brand-muted/20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-12">
            <div className="space-y-4 text-center md:text-left">
              <h4 className="text-2xl font-bold">{profile.name}</h4>
              <p className="text-brand-secondary font-light max-w-xs text-sm">
                {profile.footer.tagline}
              </p>
            </div>

            <div className="flex gap-8">
              {socialData.socialLinks.slice(0, 3).map(link => (
                <a key={link.name} href={link.href} className="text-brand-secondary hover:text-brand-primary transition-colors text-sm">{link.name}</a>
              ))}
            </div>

            <div className="text-brand-secondary/40 text-[10px] font-mono uppercase tracking-[0.2em]">
              &copy; {profile.footer.copyright}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
