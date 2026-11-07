import React, { useEffect, useState } from 'react';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  HeartHandshake,
  MessageSquareHeart,
  LineChart,
  FileCheck2,
  ExternalLink,
  Menu,
  X,
  CheckCircle2,
  ChevronDown,
  GraduationCap,
  Lightbulb,
  Award,
  Quote,
  AlertTriangle,
  Users,
  MessageCircle,
  Mail,
  Phone,
  Scale,
  Rocket,
  Trophy
} from 'lucide-react';
import { WingsIcon } from './components/WingsIcon';

interface FaqItem {
  id: number;
  q: string;
  a: React.ReactNode;
}

interface FaqCategory {
  category: string;
  items: FaqItem[];
}

// Биография сооснователя: виден первый абзац, остальное раскрывается кнопкой, цитата — внизу.
function ExpandableBio({ children, quote }: { children: React.ReactNode; quote: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [intro, ...rest] = React.Children.toArray(children);

  return (
    <div className="lg:col-span-8 space-y-4 text-[#94A3B8] text-sm sm:text-base leading-relaxed">
      {intro}
      {open && rest}
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="inline-flex items-center gap-1.5 text-cyan-400 hover:text-cyan-300 font-semibold text-sm transition-colors"
      >
        {open ? 'Show less' : 'Show more'}
        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>
      {quote}
    </div>
  );
}

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(1);

  // Появление блоков при прокрутке: только прозрачность и сдвиг. Без движения, если в системе отключена анимация.
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return;
    const targets = document.querySelectorAll<HTMLElement>('main section:not(.hero-in) > *');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -10% 0px' }
    );
    targets.forEach((el) => {
      el.classList.add('reveal');
      observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const studentPains = [
    {
      tag: 'Safe Space',
      pain: '“My idea feels too rough or naive right now — I feel awkward sharing it with anyone.”',
      solutionTitle: 'Zero judgment, zero grades',
      solutionText:
        'In Terata, nobody grades you or tells you “that will never work.” Your AI thinking partner listens patiently to even the messiest stream of thoughts and helps you uncover the strong core inside.'
    },
    {
      tag: 'Clear Structure',
      pain: '“It makes sense in my head, but how do I turn it into a grant application, pitch deck, or thesis project?”',
      solutionTitle: 'No more blank-page anxiety',
      solutionText:
        'You don’t have to write formal documents from scratch. Just answer simple, friendly questions in chat — like talking to a smart friend — and Terata builds a clear project structure for you.'
    },
    {
      tag: 'Proof of Authorship',
      pain: '“I’m afraid to pitch my idea at competitions or in class — what if someone takes it and builds it without me?”',
      solutionTitle: 'Your authorship is on record',
      solutionText:
        'Before you ever show your project to judges, professors, or partners, Terata creates a digital certificate that records exactly what your idea looked like and when — under your name. The timestamp is recorded on a public blockchain, so it can’t be changed or backdated — not even by us.'
    }
  ];

  const partners = [
    {
      name: 'Christopher',
      role: 'Facilitator',
      badge: 'Live in beta • Helps you open up and move forward',
      accent: 'from-cyan-500/20 to-sky-500/5 border-[#C7D2E0]/12 text-cyan-300',
      icon: <MessageSquareHeart className="w-6 h-6 text-cyan-400" />,
      description:
        'Christopher is the facilitator of your session and the partner we are testing in this beta. He doesn’t judge or give ready-made answers. He guides the conversation: listens to your idea in any form, helps you get past creative blocks, asks warm, structured questions, and keeps the session moving step by step — from a messy first thought to a clear project structure.',
      quote:
        '“Tell me in your own words, just like explaining to a friend over coffee: what excited you most about this idea?”'
    },
    {
      name: 'Ralphie',
      role: 'Practical Strategist & Analyst',
      badge: 'Strengthens your plan',
      accent: 'from-indigo-500/20 to-blue-500/5 border-[#C7D2E0]/12 text-indigo-300',
      icon: <LineChart className="w-6 h-6 text-indigo-400" />,
      description:
        'Explains in plain language who truly needs your project, how it will work in the real world, and what questions judges or grant committees will likely ask.',
      quote:
        '“Awesome concept! Let’s figure out: who will be the very first person to thank you for building this, and why?”'
    },
    {
      name: 'Isida',
      role: 'Guardian of Your IP & Rights',
      badge: 'Protects your ownership',
      accent: 'from-emerald-500/20 to-teal-500/5 border-[#C7D2E0]/12 text-emerald-300',
      icon: <ShieldCheck className="w-6 h-6 text-emerald-400" />,
      description:
        'Makes sure your work stays yours: highlights what makes your solution original, formats your Project Passport, and creates your digital proof of authorship.',
      quote:
        '“I’ve captured the core novelty of your project and recorded the exact creation time under your name.”'
    }
  ];

  const steps = [
    {
      num: '01',
      title: 'Share your thought in plain words',
      text: 'Type your idea into the chat just as it sounds in your head. No buzzwords, spreadsheets, or business plans required.'
    },
    {
      num: '02',
      title: 'Shape the details in conversation',
      text: 'Answer simple, friendly questions from your AI partners. Step by step, scattered thoughts turn into a solid concept.'
    },
    {
      num: '03',
      title: 'Record your authorship in one click',
      text: 'Create a tamper-proof timestamp of your idea — a digital record showing that this version of the idea existed, under your name, at that exact moment.'
    },
    {
      num: '04',
      title: 'Download your ready Project Passport',
      text: 'Get a clean, structured PDF document ready for hackathons, student grants, thesis defense, accelerators, or early investors.'
    }
  ];

  const stats = [
    { value: '3', label: 'AI thinking partners in one chat' },
    { value: '20–30 min', label: 'From raw thought to project structure' },
    { value: '1 click', label: 'Proof of authorship with exact date & time' },
    { value: '0', label: 'Forms or spreadsheets' }
  ];

  const faqCategories: FaqCategory[] = [
    {
      category: 'About the beta',
      items: [
        {
          id: 1,
          q: '1. What does “MVP” and “beta” mean for me?',
          a: (
            <p>
              Terata is an early version of the platform, built to test the core experience with real users. All three AI partners are working, and right now we are mainly testing{' '}
              <strong className="text-white font-semibold">Christopher, your AI facilitator</strong>. Some things may change or not work perfectly yet — and your feedback directly shapes what Terata becomes.
            </p>
          )
        },
        {
          id: 2,
          q: '2. Which languages can I use?',
          a: (
            <p>
              During the beta, Terata works in <strong className="text-white font-semibold">English only</strong>. Other languages are in development and will be added soon.
            </p>
          )
        },
        {
          id: 3,
          q: '3. Is Terata really free?',
          a: (
            <p>
              Yes. During the beta, everything in Terata is completely free. No credit card is needed.
            </p>
          )
        }
      ]
    },
    {
      category: 'About getting started',
      items: [
        {
          id: 4,
          q: '4. What if I only have a vague thought and zero numbers or calculations — is Terata for me?',
          a: (
            <p>
              Yes! That is the exact moment Terata was built for. Most great projects start with “Wouldn’t it be cool if…”. Christopher, Ralphie and Isida will help you turn that first spark into a structured project step by step.
            </p>
          )
        },
        {
          id: 5,
          q: '5. Do I need coding skills or a business background?',
          a: (
            <p>
              Not at all. Terata is built for students of every major — from arts, humanities, medicine, and design to engineering and computer science. Everything is explained in clear, everyday language.
            </p>
          )
        },
        {
          id: 6,
          q: '6. How long does one session take?',
          a: (
            <p>
              You can go from a raw thought to a first clear project structure in about 20–30 minutes of natural conversation. And if you want to refine it deeper, you can pause and continue anytime.
            </p>
          )
        }
      ]
    },
    {
      category: 'About privacy and your data',
      items: [
        {
          id: 7,
          q: '7. What should I NOT share during the beta?',
          a: (
            <div className="space-y-3">
              <p>
                While Terata is an MVP, please don’t share ideas or information that would cause real harm if they became known. In particular, avoid:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-slate-300">
                <li>
                  <strong className="text-white font-semibold">Patentable technical inventions before a patent application is filed</strong> — formulas, algorithms, technical drawings, chemical compositions, source code
                </li>
                <li>
                  <strong className="text-white font-semibold">Confidential information of your employer, university lab, or research group</strong> — trade secrets, internal data, unpublished research results
                </li>
                <li>
                  <strong className="text-white font-semibold">Anything covered by an NDA</strong> — details about clients, partners, or projects you have agreed to keep confidential
                </li>
                <li>
                  <strong className="text-white font-semibold">Personal data of other people</strong> — names, contacts, health or financial information about real individuals
                </li>
                <li>
                  <strong className="text-white font-semibold">Your own sensitive data</strong> — passwords, bank details, ID documents, health information
                </li>
                <li>
                  <strong className="text-white font-semibold">Ideas related to defense, security, or dual-use technologies</strong>, or anything subject to export restrictions
                </li>
                <li>
                  <strong className="text-white font-semibold">Commercially sensitive financial details</strong> — real budgets, investor terms, company valuations
                </li>
              </ul>
              <p className="pt-1 text-cyan-300 font-medium">
                Describe your idea at the level of the problem, the audience, and the general approach — that is enough for a strong session.
              </p>
            </div>
          )
        },
        {
          id: 8,
          q: '8. Can anyone else see my chat or my idea?',
          a: (
            <p>
              No other users can see your drafts or conversations. Your data is stored anonymously, and you decide when and with whom to share your final Project Passport.
            </p>
          )
        },
        {
          id: 9,
          q: '9. Is my idea used to train AI models?',
          a: (
            <p>
              No. We do not use your ideas to train AI. To improve the quality of the dialogue, we only use anonymized annotations and corrections — for example, marking where a conversation went off track — never the content of your idea. FSIF Sp. z o.o. is a company registered in Poland, and we handle your data in line with the EU General Data Protection Regulation (GDPR).
            </p>
          )
        },
        {
          id: 10,
          q: '10. Can I delete my data?',
          a: (
            <p>
              Yes. You can delete your data at any time with one click — just use the “Delete my data” button in your account.
            </p>
          )
        }
      ]
    },
    {
      category: 'About authorship and the certificate',
      items: [
        {
          id: 11,
          q: '11. Does the certificate replace a patent or copyright registration?',
          a: (
            <p>
              No — and we want to be honest about that. The certificate is a tamper-proof record showing that this exact version of your idea existed, under your name, at a specific date and time. That is valuable evidence in a dispute or when talking to partners, but it is not a patent. If your idea becomes a real product, Terata helps you arrive at a patent attorney or IP office well prepared.
            </p>
          )
        },
        {
          id: 12,
          q: '12. How can someone check that my certificate is real?',
          a: (
            <p>
              Every certificate contains a unique digital fingerprint (SHA-256) of your Project Passport. If even one character of the document changes, the fingerprint changes too. Your timestamp is recorded on a public blockchain, so it can’t be altered. A simple way for judges, investors or partners to verify a certificate themselves is in development.
            </p>
          )
        },
        {
          id: 13,
          q: '13. What if someone else already had a similar idea?',
          a: (
            <p>
              That happens more often than people think — and it isn’t the end. What matters is how you solve the problem and for whom. Ralphie helps you find what makes your approach different, and Isida records that specific version under your name.
            </p>
          )
        }
      ]
    },
    {
      category: 'About using the result',
      items: [
        {
          id: 14,
          q: '14. Where can I use the final Project Passport?',
          a: (
            <p>
              You can use it right away to apply for student startup grants, university accelerators, and hackathons, to pitch professors or teammates, or as the foundation for your capstone or thesis project.
            </p>
          )
        },
        {
          id: 15,
          q: '15. Can Terata help me find teammates?',
          a: (
            <p>
              That’s exactly what we’re building next. Soon Terata will help you connect with students and creators from other universities and fields whose skills complement your idea, and form a team to develop it further. Until then, join our{' '}
              <a href="#community" className="text-cyan-400 underline hover:text-cyan-300">
                community (see below)
              </a>{' '}
              — it’s a great place to meet people who are building too.
            </p>
          )
        },
        {
          id: 16,
          q: '16. What if I get stuck or something doesn’t work?',
          a: (
            <div className="space-y-3">
              <p className="text-white font-semibold">
                Contact our support team — a real person will answer.
              </p>
              <p>
                A small honest note: we’re ordinary people, just like you. We all have day jobs, and we build Terata in our free time — in the evenings, on weekends, and often late at night. So sometimes it may take us a little while to reply, but we read every message and we will get back to you. Thank you for your patience — and for building this with us.
              </p>
              <div className="pt-2 flex flex-col sm:flex-row gap-4 text-sm">
                <a
                  href="mailto:support.terata@gmail.com"
                  className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-medium"
                >
                  <Mail className="w-4 h-4" />
                  <span>Email: support.terata@gmail.com</span>
                </a>
                <a
                  href="https://wa.me/380963815386"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 font-medium"
                >
                  <Phone className="w-4 h-4" />
                  <span>Phone / WhatsApp: +380 96 381 5386</span>
                </a>
              </div>
            </div>
          )
        }
      ]
    }
  ];

  const jumpToSensitiveFaq = (e: React.MouseEvent) => {
    e.preventDefault();
    setOpenFaq(7);
    const el = document.getElementById('faq-item-7');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <div className="min-h-screen bg-[#070B14] text-[#F8FAFC] flex flex-col font-['Manrope'] selection:bg-cyan-500/20 selection:text-cyan-200">
      {/* Top Navigation */}
      <header className="relative z-30 border-b border-[#C7D2E0]/10 bg-[#070B14] sticky top-0 pt-[env(safe-area-inset-top)]">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <a href="#" className="flex items-center gap-3.5">
            <WingsIcon size={36} />
            <div className="flex flex-col">
              <div className="flex items-center gap-2.5">
                <span className="text-xl font-extrabold tracking-tight text-white">
                  Terata
                </span>
                <span className="hidden sm:inline-block font-['JetBrains_Mono'] text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 border border-[#C7D2E0]/12">
                  For Students & Creators
                </span>
              </div>
              <span className="text-xs font-medium text-cyan-400/90 tracking-wide">
                Scared? Do it anyway.
              </span>
            </div>
          </a>

          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-[#94A3B8]">
            <a href="#why-terata" className="hover:text-cyan-400 transition-colors">Why Terata</a>
            <a href="#partners" className="hover:text-cyan-400 transition-colors">AI Partners</a>
            <a href="#steps" className="hover:text-cyan-400 transition-colors">How It Works</a>
            <a href="#result" className="hover:text-cyan-400 transition-colors">What You Get</a>
            <a href="#about" className="hover:text-cyan-400 transition-colors">About Us</a>
            <a href="#faq" className="hover:text-cyan-400 transition-colors">FAQ</a>
            <a href="#community" className="hover:text-cyan-400 transition-colors">Community</a>
            <a href="#contact" className="hover:text-cyan-400 transition-colors">Contact Us</a>
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <a
              href="https://terata-production.up.railway.app/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold bg-gradient-to-r from-cyan-500 to-blue-600 text-white transition-colors"
            >
              Try for Free
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/50"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile dropdown menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden px-6 py-5 border-b border-[#C7D2E0]/10 bg-[#0B1220] flex flex-col gap-3 text-sm font-medium">
            <a href="#why-terata" onClick={() => setMobileMenuOpen(false)} className="py-2 text-[#94A3B8] hover:text-cyan-400">Why Terata</a>
            <a href="#partners" onClick={() => setMobileMenuOpen(false)} className="py-2 text-[#94A3B8] hover:text-cyan-400">AI Partners</a>
            <a href="#steps" onClick={() => setMobileMenuOpen(false)} className="py-2 text-[#94A3B8] hover:text-cyan-400">How It Works</a>
            <a href="#result" onClick={() => setMobileMenuOpen(false)} className="py-2 text-[#94A3B8] hover:text-cyan-400">What You Get</a>
            <a href="#about" onClick={() => setMobileMenuOpen(false)} className="py-2 text-[#94A3B8] hover:text-cyan-400">About Us</a>
            <a href="#faq" onClick={() => setMobileMenuOpen(false)} className="py-2 text-[#94A3B8] hover:text-cyan-400">FAQ</a>
            <a href="#community" onClick={() => setMobileMenuOpen(false)} className="py-2 text-[#94A3B8] hover:text-cyan-400">Community</a>
            <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="py-2 text-[#94A3B8] hover:text-cyan-400">Contact Us</a>
            <a
              href="https://terata-production.up.railway.app/"
              target="_blank"
              rel="noreferrer"
              className="mt-2 w-full text-center py-3 rounded-xl text-sm font-semibold bg-gradient-to-r from-cyan-500 to-blue-600 text-white"
            >
              Try for Free
            </a>
          </div>
        )}
      </header>

      {/* BETA BANNER (Top of Page, Above Hero) */}
      <div className="beta-banner relative z-20 overflow-hidden bg-[#1D1015]">
        <div className="relative z-10 max-w-6xl mx-auto px-6 py-4 text-center flex flex-col items-center gap-1.5">
          <div className="inline-flex items-center gap-2 font-['JetBrains_Mono'] text-xs sm:text-sm font-bold uppercase tracking-wider text-amber-300">
            <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
            <span>THIS IS AN MVP — TERATA IS IN BETA</span>
          </div>
          <p className="font-['JetBrains_Mono'] text-[11px] sm:text-xs font-semibold uppercase tracking-wide text-cyan-300 max-w-4xl">
            RIGHT NOW WE ARE MAINLY TESTING CHRISTOPHER, YOUR AI FACILITATOR. RALPHIE AND ISIDA ARE ALSO AVAILABLE AND WORKING.
          </p>
          <p className="font-['JetBrains_Mono'] text-[11px] sm:text-xs font-medium uppercase tracking-wide text-slate-300">
            THE PLATFORM CURRENTLY WORKS IN ENGLISH ONLY. OTHER LANGUAGES ARE COMING SOON.
          </p>
          <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
            <strong className="text-white font-semibold">
              Please don’t share sensitive ideas during the beta —{' '}
              <a
                href="#faq-item-7"
                onClick={jumpToSensitiveFaq}
                className="text-cyan-400 underline hover:text-cyan-300"
              >
                see the list in our FAQ
              </a>
              .
            </strong>{' '}
            Your feedback helps us make Terata better for every creator.
          </p>
        </div>
      </div>

      <main className="relative z-10 flex-1">
        {/* BLOCK 1: HERO SECTION */}
        <section className="hero-in pt-14 sm:pt-20 pb-20 px-6 max-w-6xl mx-auto text-center flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#C7D2E0]/12 bg-cyan-500/10 text-cyan-300 text-xs font-semibold mb-8">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Your personal support team for new ideas • Zero judgment, zero blank-page fear</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-300 to-indigo-300 max-w-4xl leading-[1.12] pb-2 mb-4">
            Turn the idea in your head into a clear, timestamped project
          </h1>

          <p className="text-lg sm:text-xl text-[#94A3B8] max-w-2xl font-normal leading-relaxed mb-10">
            Have a spark for a startup, grant, hackathon, or thesis, but don’t know where to start?{' '}
            <strong className="text-white font-semibold">Terata</strong> helps you organize your thoughts, reality-check your concept, and record your authorship — all through a simple conversation with three AI thinking partners.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <a
              href="https://terata-production.up.railway.app/"
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto px-8 py-4 rounded-xl text-base font-bold bg-gradient-to-r from-cyan-500 to-blue-600 text-white transition-colors flex items-center justify-center gap-2"
            >
              Shape My Idea for Free
              <ArrowRight className="w-5 h-5" />
            </a>

            <a
              href="#steps"
              className="w-full sm:w-auto px-8 py-4 rounded-xl text-base font-semibold border border-[#C7D2E0]/20 bg-[#101827]/60 text-[#F8FAFC] hover:bg-[#101827] hover:border-cyan-500/40 transition-colors flex items-center justify-center gap-2"
            >
              See How It Works
            </a>
          </div>

          {/* Key Stats Bar */}
          <div className="mt-16 sm:mt-20 w-full grid grid-cols-2 md:grid-cols-4 gap-4 p-6 rounded-2xl glass-card">
            {stats.map((s, idx) => (
              <div key={idx} className="flex flex-col items-center justify-center text-center p-3">
                <span className="font-['JetBrains_Mono'] text-2xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-sky-200">
                  {s.value}
                </span>
                <span className="text-xs sm:text-sm text-[#94A3B8] mt-1.5 font-medium">
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* BLOCK 2: WHY TERATA */}
        <section id="why-terata" className="py-20 px-6 max-w-7xl mx-auto border-t border-[#C7D2E0]/10">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="font-['JetBrains_Mono'] text-xs uppercase tracking-widest text-cyan-400 font-semibold">
              SOUND FAMILIAR?
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mt-2 mb-4">
              Why great student ideas so often stay stuck in phone notes
            </h2>
            <p className="text-[#94A3B8] text-base leading-relaxed">
              We removed the three biggest barriers that stop students from taking the first step from a rough thought to a real project.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {studentPains.map((item, idx) => (
              <div key={idx} className="p-7 rounded-2xl glass-card flex flex-col justify-between">
                <div>
                  <div className="p-4 rounded-xl bg-[#070B14]/70 border border-[#C7D2E0]/10 text-sm italic text-slate-300 leading-relaxed mb-6">
                    {item.pain}
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0" />
                    <h3 className="text-lg font-bold text-white">
                      {item.solutionTitle}
                    </h3>
                  </div>
                  <p className="text-[#94A3B8] text-sm leading-relaxed">
                    {item.solutionText}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#C7D2E0]/10 flex items-center justify-between">
                  <span className="font-['JetBrains_Mono'] text-xs text-cyan-400 font-medium">
                    ✓ How Terata helps
                  </span>
                  <span className="text-xs px-2.5 py-1 rounded-full bg-cyan-950/50 border border-[#C7D2E0]/12 text-cyan-300">
                    {item.tag}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* BLOCK 3: THREE AI THINKING PARTNERS */}
        <section id="partners" className="py-20 px-6 max-w-7xl mx-auto border-t border-[#C7D2E0]/10">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="font-['JetBrains_Mono'] text-xs uppercase tracking-widest text-cyan-400 font-semibold">
              YOUR TEAM INSIDE THE PLATFORM
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mt-2 mb-4">
              Three AI thinking partners who are always on your side
            </h2>
            <p className="text-[#94A3B8] text-base leading-relaxed">
              Instead of a cold generic chatbot, you collaborate with three specialized AI partners — like having an empathetic sounding board, a practical product strategist, and an IP guardian in one room. They help you think; every decision stays yours.
            </p>
          </div>

          {/* Beta Note inside Partners section */}
          <div className="max-w-4xl mx-auto mb-12 p-4 rounded-2xl bg-cyan-950/30 border border-[#C7D2E0]/12 text-center">
            <span className="font-['JetBrains_Mono'] text-xs sm:text-sm font-semibold uppercase tracking-wide text-cyan-300">
              BETA NOTE: ALL THREE PARTNERS ARE WORKING. IN THIS MVP WE ARE MAINLY TESTING CHRISTOPHER, SO YOUR FEEDBACK ON HIM MATTERS MOST.
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {partners.map((partner, idx) => (
              <div key={idx} className="p-8 rounded-2xl glass-card flex flex-col justify-between relative overflow-hidden">
                <div>
                  <div className="flex items-start justify-between gap-3 mb-6">
                    <div className="p-3.5 rounded-xl bg-slate-800/80 border border-[#C7D2E0]/10 shrink-0">
                      {partner.icon}
                    </div>
                    <span className={`font-['JetBrains_Mono'] text-[11px] font-medium px-3 py-1 rounded-full bg-gradient-to-r border text-right ${partner.accent}`}>
                      {partner.badge}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-1">{partner.name}</h3>
                  <p className="text-sm font-semibold text-cyan-400 mb-4">{partner.role}</p>
                  <p className="text-[#94A3B8] text-sm leading-relaxed mb-6">
                    {partner.description}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#070B14]/80 border border-[#C7D2E0]/10 text-xs text-slate-300 leading-relaxed">
                  <span className="block font-['JetBrains_Mono'] text-[11px] text-cyan-400 mb-1">
                    In conversation:
                  </span>
                  {partner.quote}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* BLOCK 4: HOW IT WORKS (4 Easy Steps) */}
        <section id="steps" className="py-20 px-6 max-w-7xl mx-auto border-t border-[#C7D2E0]/10">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="font-['JetBrains_Mono'] text-xs uppercase tracking-widest text-cyan-400 font-semibold">
              SIMPLE JOURNEY
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mt-2 mb-4">
              How it works: 4 easy steps
            </h2>
            <p className="text-[#94A3B8] text-base leading-relaxed">
              No complex templates or forms to fill out — everything happens through a relaxed, natural conversation.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, idx) => (
              <div key={idx} className="p-7 rounded-2xl glass-card flex flex-col justify-between relative">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-['JetBrains_Mono'] text-3xl font-extrabold text-cyan-400">
                      {step.num}
                    </span>
                    <span className="font-['JetBrains_Mono'] text-xs text-[#94A3B8] px-2.5 py-1 rounded-md bg-slate-800/60">
                      Step {idx + 1} of 4
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-3">
                    {step.title}
                  </h3>
                  <p className="text-[#94A3B8] text-sm leading-relaxed">
                    {step.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* BLOCK 5: WHAT YOU GET (Deliverables Showcase) */}
        <section id="result" className="py-20 px-6 max-w-7xl mx-auto border-t border-[#C7D2E0]/10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left column: description */}
            <div className="lg:col-span-6">
              <span className="font-['JetBrains_Mono'] text-xs uppercase tracking-widest text-cyan-400 font-semibold">
                TANGIBLE OUTCOME
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mt-2 mb-5">
                What you walk away with after a session
              </h2>
              <p className="text-[#94A3B8] text-base leading-relaxed mb-8">
                Instead of messy notes, you finish with two ready-to-use documents that speak the language of professors, grant committees, and startup accelerators:
              </p>

              <div className="space-y-4 mb-8">
                <div className="p-5 rounded-2xl glass-card flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-cyan-500/10 border border-[#C7D2E0]/12 text-cyan-400 shrink-0">
                    <FileCheck2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white mb-1">
                      1. Ready-to-Pitch Project Passport
                    </h3>
                    <p className="text-sm text-[#94A3B8] leading-relaxed">
                      A clean, structured summary covering the problem you solve, who it helps, what makes it unique, and how it works in practice.
                    </p>
                  </div>
                </div>

                <div className="p-5 rounded-2xl glass-card flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-emerald-500/10 border border-[#C7D2E0]/12 text-emerald-400 shrink-0">
                    <Award className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white mb-1">
                      2. Digital Certificate of Authorship
                    </h3>
                    <p className="text-sm text-[#94A3B8] leading-relaxed">
                      A unique digital fingerprint of your concept with the exact date and time — solid proof of what you had and when.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <span className="text-xs px-3 py-1.5 rounded-lg bg-[#101827] border border-[#C7D2E0]/15 text-slate-300">
                  <GraduationCap className="w-4 h-4 inline -mt-0.5 mr-1.5" />Thesis & Capstone Projects
                </span>
                <span className="text-xs px-3 py-1.5 rounded-lg bg-[#101827] border border-[#C7D2E0]/15 text-slate-300">
                  <Rocket className="w-4 h-4 inline -mt-0.5 mr-1.5" />Student Startup Grants
                </span>
                <span className="text-xs px-3 py-1.5 rounded-lg bg-[#101827] border border-[#C7D2E0]/15 text-slate-300">
                  <Trophy className="w-4 h-4 inline -mt-0.5 mr-1.5" />Hackathons & Accelerators
                </span>
              </div>
            </div>

            {/* Right column: Visual mockup of the Project Passport */}
            <div className="lg:col-span-6">
              <div className="p-7 sm:p-8 rounded-3xl glass-card border border-[#C7D2E0]/12 relative overflow-hidden">

                <div className="flex items-center justify-between pb-5 mb-6 border-b border-[#C7D2E0]/10">
                  <div className="flex items-center gap-3">
                    <WingsIcon size={28} />
                    <div>
                      <span className="block text-xs font-['JetBrains_Mono'] text-cyan-400 uppercase">
                        Terata • Project Passport
                      </span>
                      <span className="text-sm font-bold text-white">
                        Student Deliverable Preview
                      </span>
                    </div>
                  </div>
                  <span className="font-['JetBrains_Mono'] text-[11px] px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-300 border border-[#C7D2E0]/12">
                    Timestamped
                  </span>
                </div>

                <div className="space-y-4 text-sm">
                  <div className="p-4 rounded-xl bg-[#070B14]/70 border border-[#C7D2E0]/10">
                    <span className="block font-['JetBrains_Mono'] text-[11px] text-[#94A3B8] mb-1">
                      PROJECT TITLE & CORE CONCEPT
                    </span>
                    <p className="font-semibold text-white">
                      Smart Campus Lab Matcher for First- and Second-Year Undergraduates
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-[#070B14]/70 border border-[#C7D2E0]/10">
                      <span className="block font-['JetBrains_Mono'] text-[11px] text-cyan-400 mb-1">
                        PROBLEM & AUDIENCE
                      </span>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        Freshmen want hands-on research experience early on, but don’t know which university labs welcome beginners.
                      </p>
                    </div>
                    <div className="p-4 rounded-xl bg-[#070B14]/70 border border-[#C7D2E0]/10">
                      <span className="block font-['JetBrains_Mono'] text-[11px] text-indigo-400 mb-1">
                        KEY NOVELTY
                      </span>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        Matches bite-sized research micro-tasks from campus labs to a student’s current skills in under 15 minutes.
                      </p>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-cyan-950/20 border border-[#C7D2E0]/12 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <span className="block font-['JetBrains_Mono'] text-[10px] text-cyan-400 uppercase">
                        Author Digital Fingerprint (SHA-256)
                      </span>
                      <span className="font-['JetBrains_Mono'] text-xs text-slate-300">
                        8f4e...9c2a • Timestamped ✓
                      </span>
                    </div>
                    <span className="font-['JetBrains_Mono'] text-[11px] text-cyan-300 shrink-0">
                      Ready to Pitch ✓
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* BLOCK 6: ABOUT US & OUR MISSION */}
        <section id="about" className="py-20 px-6 max-w-7xl mx-auto border-t border-[#C7D2E0]/10">
          <div className="p-8 sm:p-12 rounded-3xl glass-card relative overflow-hidden">

            <div className="max-w-3xl mb-12">
              <span className="font-['JetBrains_Mono'] text-xs uppercase tracking-widest text-cyan-400 font-semibold">
                ABOUT US & OUR MISSION
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mt-2 mb-5">
                We built Terata so no brilliant idea goes to waste
              </h2>
              <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed mb-4">
                We’ve been there ourselves — as founders pushing our own projects, as teachers beside students, in the room during investor negotiations, and in global banking, where every risk has to be faced honestly. Time and again, we saw talented people light up with an exciting idea — only to give up a week later. Some ran into cold skepticism, some got lost in complicated grant forms, and others were simply afraid to share their idea out loud.
              </p>
              <p className="text-slate-200 text-base sm:text-lg leading-relaxed font-medium">
                <strong className="text-cyan-400">Terata</strong> was born from a simple belief: at the fragile moment an idea is born, a creator doesn’t need a harsh examiner — they need a safe space, a thoughtful sparring partner, and a reliable record of their authorship.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl bg-[#070B14]/70 border border-[#C7D2E0]/10">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-[#C7D2E0]/12 flex items-center justify-center text-cyan-400 mb-4">
                  <HeartHandshake className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white mb-2">
                  Respect & Care for the Creator
                </h3>
                <p className="text-sm text-[#94A3B8] leading-relaxed">
                  We combine cognitive psychology and AI so that every session builds your confidence instead of triggering imposter syndrome.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[#070B14]/70 border border-[#C7D2E0]/10">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-[#C7D2E0]/12 flex items-center justify-center text-indigo-400 mb-4">
                  <Lightbulb className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white mb-2">
                  Clarity Over Bureaucracy
                </h3>
                <p className="text-sm text-[#94A3B8] leading-relaxed">
                  We turned complex startup and research requirements into plain, friendly questions that make sense to any student or first-time creator.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[#070B14]/70 border border-[#C7D2E0]/10">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-[#C7D2E0]/12 flex items-center justify-center text-emerald-400 mb-4">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white mb-2">
                  A Launchpad for Real Action
                </h3>
                <p className="text-sm text-[#94A3B8] leading-relaxed">
                  Our goal is for everyone to finish a Terata session with a ready Project Passport, a timestamped record of authorship, and clear next steps — and soon, the right teammates to take the idea further.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* BLOCK 7: OUR TEAM */}
        <section id="team" className="py-20 px-6 max-w-7xl mx-auto border-t border-[#C7D2E0]/10">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="font-['JetBrains_Mono'] text-xs uppercase tracking-widest text-cyan-400 font-semibold">
              THE PEOPLE BEHIND TERATA
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mt-2 mb-4">
              Our Team
            </h2>
            <p className="text-[#94A3B8] text-base leading-relaxed">
              Terata was built at the intersection of systems architecture, cognitive psychology, clear human communication, and institutional risk management — by people who have been through the ups and downs of building projects themselves.
            </p>
          </div>

          {/* Three Co-Founders Cards */}
          <div className="space-y-8 mb-10">
            {/* 1. Maksym Morenets */}
            <div className="p-8 sm:p-10 rounded-3xl glass-card border border-[#C7D2E0]/12 relative overflow-hidden">

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-6 border-b border-[#C7D2E0]/10">
                <div>
                  <span className="inline-block font-['JetBrains_Mono'] text-xs uppercase tracking-wider text-cyan-400 mb-1">
                    Founder & Systems Architect
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white">
                    Maksym Morenets
                  </h3>
                  <p className="text-xs sm:text-sm text-[#94A3B8] mt-1 font-medium">
                    Author of the Terata Methodology • Founder of FSIF Sp. z o.o. (Poland)
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs px-3 py-1 rounded-full bg-slate-800/80 border border-[#C7D2E0]/10 text-slate-300">
                    Three-Agent Architecture
                  </span>
                  <span className="text-xs px-3 py-1 rounded-full bg-slate-800/80 border border-[#C7D2E0]/10 text-slate-300">
                    IP & Access Control Design
                  </span>
                  <span className="text-xs px-3 py-1 rounded-full bg-slate-800/80 border border-[#C7D2E0]/10 text-slate-300">
                    Psychology of Innovation
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-4 flex flex-col gap-5">
                  <div className="w-full aspect-square rounded-2xl overflow-hidden border border-[#C7D2E0]/12 bg-black flex items-center justify-center">
                    <img
                      loading="lazy"
                      decoding="async"
                      src="/team/maksym.jpg"
                      alt="Maksym Morenets — Founder & Systems Architect of Terata"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                <ExpandableBio
                  quote={
                    <div className="p-6 rounded-2xl bg-[#070B14]/80 border border-[#C7D2E0]/12">
                    <Quote className="w-6 h-6 text-cyan-400 mb-3 opacity-80" />
                    <p className="text-sm sm:text-base font-medium text-white italic leading-relaxed">
                      “I know how lonely and slow it feels to carry an idea nobody else can see yet. Every breakthrough starts as a fragile, imperfect thought, and how we treat it in the first 30 minutes decides whether it lives or dies.”
                    </p>
                  </div>
                  }
                >
                  <p>
                    Maksym didn’t design Terata from a whiteboard. He built it from scars. Before Terata, he spent years pushing his own projects from rough ideas toward something real, and the road was anything but smooth. He went through dozens of attempts and mistakes, and learned from every one of them. He knocked on investors’ doors and walked away without funding. He burned out, carrying everything on his own shoulders. And at one point, he watched an idea he had shared too early get taken and built by someone else.
                  </p>
                  <p>
                    He knows exactly what that road feels like: the long stretches with no visible progress, the people who didn’t get it, the nights you wonder whether to keep going, and the painful lesson of sharing an idea before it’s protected.
                  </p>
                  <p>
                    He saw that most ideas don’t die because they’re bad. They die because the creator runs out of energy, support or clarity at exactly the wrong moment. Terata is his answer. It maps how a fragile personal spark grows into real teamwork and names the barriers waiting at each step. Three AI partners, <strong className="text-white font-semibold">Christopher, Ralphie and Isida</strong>, walk that path with you, so you never have to face it alone. Your ownership and privacy stay protected the whole way.
                  </p>
                  <p>
                    Every part of Terata comes from a lesson Maksym learned the hard way. Christopher exists because he remembers how much a raw idea needs to be heard before it is judged. Ralphie exists because he knows how many weeks can be lost without someone asking the right practical questions early. Isida exists because he knows the fear of showing an unfinished idea to the world and wondering whether it will still be yours afterwards. As the founder of FSIF Sp. z o.o., he turned that experience into a working system: clear steps instead of guesswork, real protection instead of hope, and support at exactly the moments when most people quietly give up.
                  </p>
                </ExpandableBio>
              </div>
            </div>

            {/* 2. Hanna Andrieieva */}
            <div className="p-8 sm:p-10 rounded-3xl glass-card border border-[#C7D2E0]/12 relative overflow-hidden">

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-6 border-b border-[#C7D2E0]/10">
                <div>
                  <span className="inline-block font-['JetBrains_Mono'] text-xs uppercase tracking-wider text-indigo-400 mb-1">
                    Co-Founder, Methodology Co-Architect & Human Experience Lead
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white">
                    Hanna Andrieieva
                  </h3>
                  <p className="text-xs sm:text-sm text-[#94A3B8] mt-1 font-medium">
                    Dialogue Logic, Cognitive Empathy & Clarity Specialist
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs px-3 py-1 rounded-full bg-slate-800/80 border border-[#C7D2E0]/10 text-slate-300">
                    Zero Dead-Ends in Dialogue
                  </span>
                  <span className="text-xs px-3 py-1 rounded-full bg-slate-800/80 border border-[#C7D2E0]/10 text-slate-300">
                    Psychological Safety
                  </span>
                  <span className="text-xs px-3 py-1 rounded-full bg-slate-800/80 border border-[#C7D2E0]/10 text-slate-300">
                    Making Complex Ideas Simple
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-4 flex flex-col gap-5">
                  <div className="w-full rounded-2xl overflow-hidden border border-[#C7D2E0]/12 bg-[#F3F4F6] flex items-center justify-center">
                    <img
                      loading="lazy"
                      decoding="async"
                      src="/team/hanna.jpg?v=6"
                      alt="Hanna Andrieieva — Co-Founder, Methodology Co-Architect & Human Experience Lead"
                      className="w-full h-auto object-contain"
                    />
                  </div>
                </div>

                <ExpandableBio
                  quote={
                    <div className="p-6 rounded-2xl bg-[#070B14]/80 border border-[#C7D2E0]/12">
                    <Quote className="w-6 h-6 text-indigo-400 mb-3 opacity-80" />
                    <p className="text-sm sm:text-base font-medium text-white italic leading-relaxed">
                      “I’ve seen brilliant students give up because no one helped them at the right moment, and strong founders lose their spark in a single tough meeting. Bringing an idea to life shouldn’t feel like passing a bureaucratic exam. When the process is simple, clear and human, anyone can turn a small spark into a real project.”
                    </p>
                  </div>
                  }
                >
                  <p>
                    Hanna has watched ideas live and die from two very different seats. As a teacher, she has spent years beside students at the moment a bright idea meets reality. She knows that what decides the outcome is rarely talent. It’s whether someone is there, at the right time, to help shape a raw thought into something feasible before the excitement fades.
                  </p>
                  <p>
                    As an interpreter, she took part in more than ten negotiations with investors and saw the other side of the journey up close: founders defending their ideas under pressure, fielding tough questions, trying to secure funding without giving away too much, and trying not to lose heart when the answer was “not yet.” She learned how hard it is to protect an idea and stay motivated at the same time.
                  </p>
                  <p>
                    She has also walked this road as a founder. Hanna built several of her own educational projects and, like many first-time creators, tried to do everything herself — content, teaching, organization, promotion. It led to burnout. That was the turning point: she started looking for the right partners and for investment instead of carrying everything alone. That search taught her how much an idea needs the right people around it — and that is exactly the shift she wants every Terata user to make sooner.
                  </p>
                  <p>
                    Hanna has worked on <strong className="text-white font-semibold">Terata</strong> from day one, and she brings both experiences into every conversation with the AI partners. She makes sure talking to them feels natural, logical and genuinely supportive. She spots the exact moments where creators stall or feel overwhelmed, and turns complex requirements into simple, encouraging steps forward.
                  </p>
                </ExpandableBio>
              </div>
            </div>

            {/* 3. Julia Umurova */}
            <div className="p-8 sm:p-10 rounded-3xl glass-card border border-[#C7D2E0]/12 relative overflow-hidden">

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-6 border-b border-[#C7D2E0]/10">
                <div>
                  <span className="inline-block font-['JetBrains_Mono'] text-xs uppercase tracking-wider text-emerald-400 mb-1">
                    Co-Founder & Risk and Integrity Lead
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white">
                    Julia Umurova
                  </h3>
                  <p className="text-xs sm:text-sm text-[#94A3B8] mt-1 font-medium">
                    20+ Years in Banking, Fraud Prevention & Risk Management • Oxford Saïd Business School, AI Ethics, Regulation & Compliance
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs px-3 py-1 rounded-full bg-slate-800/80 border border-[#C7D2E0]/10 text-slate-300">
                    Risk & Blind-Spot Analysis
                  </span>
                  <span className="text-xs px-3 py-1 rounded-full bg-slate-800/80 border border-[#C7D2E0]/10 text-slate-300">
                    Data Confidentiality & Responsible AI
                  </span>
                  <span className="text-xs px-3 py-1 rounded-full bg-slate-800/80 border border-[#C7D2E0]/10 text-slate-300">
                    Investor-Ready Project Assessment
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-4 flex flex-col gap-5">
                  <div className="w-full aspect-square rounded-2xl overflow-hidden border border-[#C7D2E0]/12 bg-white flex items-center justify-center">
                    <img
                      loading="lazy"
                      decoding="async"
                      src="/team/julia.jpg?v=3"
                      alt="Julia Umurova — Co-Founder & Risk and Integrity Lead"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                <ExpandableBio
                  quote={
                    <div className="p-6 rounded-2xl bg-[#070B14]/80 border border-[#C7D2E0]/12">
                    <Quote className="w-6 h-6 text-emerald-400 mb-3 opacity-80" />
                    <p className="text-sm sm:text-base font-medium text-white italic leading-relaxed">
                      “Every idea has weak spots, and that’s normal. What matters is finding them before someone else does. A project that has honestly faced its risks walks into any room with confidence.”
                    </p>
                  </div>
                  }
                >
                  <p>
                    For more than 20 years, Julia has built her career in international banking, specialising in fraud prevention, operational risk, internal controls and governance. Her experience spans senior leadership positions, including Vice President in London with global risk oversight responsibilities. She has led teams, developed fraud prevention strategies, challenged complex risk assessments and helped strengthen control frameworks across international financial operations.
                  </p>
                  <p>
                    Throughout her career, Julia has learned that even the most promising initiatives can fail when critical assumptions go unchallenged and hidden risks are discovered too late. She understands the importance of asking difficult questions early — before weaknesses become costly problems.
                  </p>
                  <p>
                    At Terata, Julia brings this experience into the world of entrepreneurship and innovation. She helps creators identify blind spots, assess potential risks, challenge assumptions and strengthen their ideas without compromising the creativity that makes them valuable.
                  </p>
                  <p>
                    She also contributes to Terata&apos;s approach to data confidentiality, responsible AI and the protection of creators&apos; intellectual work. Her training in AI Ethics, Regulation and Compliance at Oxford Saïd Business School further informs this work.
                  </p>
                  <p>
                    Julia helps shape Terata&apos;s Project Passports, ensuring that ideas are presented with clarity, credibility and a structured understanding of their risks — qualities that matter when approaching investors, corporate partners and funding organisations.
                  </p>
                  <p>
                    Her philosophy is simple: rigorous thinking should protect ambition, not limit it.
                  </p>
                </ExpandableBio>
              </div>
            </div>
          </div>

          {/* Shared Message from the Team: A Word From Us */}
          <div className="p-8 sm:p-10 rounded-3xl glass-card border border-[#C7D2E0]/12 bg-gradient-to-r from-[#101827]/90 via-[#0B1220]/90 to-[#101827]/90 relative overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-4">
                <span className="inline-block font-['JetBrains_Mono'] text-xs uppercase tracking-widest text-cyan-400 font-semibold">
                  A Word From Us • Why We Built Terata
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold text-white">
                  Great ideas shouldn’t stay trapped in one dorm room or one lab
                </h3>
                <p className="text-[#94A3B8] text-sm sm:text-base leading-relaxed">
                  What motivates us is a simple truth: the rarest resource in innovation isn’t talent or money — it’s bringing the right people together safely. Too often, brilliant student ideas stay trapped inside one university, one major, or one notebook because sharing an unfinished thought feels risky. <strong className="text-white font-semibold">Terata</strong> exists so you can develop your concept and collaborate across boundaries without ever losing control or ownership of your work.
                </p>
                <div className="p-5 rounded-2xl bg-cyan-950/25 border border-[#C7D2E0]/12">
                  <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
                    <strong className="text-cyan-400 font-bold">Coming next — Find your team:</strong> Ideas grow faster with the right people around them. We’re building a way to connect creators across universities and fields of study: a designer with an engineer, a medical student with a data analyst. Terata will help you form a team around your idea to strengthen it — while your authorship record stays in place, so you can share openly and safely.
                  </p>
                </div>
              </div>

              <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-4 justify-end">
                <div className="p-5 rounded-2xl bg-[#070B14]/80 border border-[#C7D2E0]/10">
                  <span className="block font-['JetBrains_Mono'] text-xl font-bold text-cyan-400 mb-1">
                    77+ Sessions
                  </span>
                  <span className="text-xs text-[#94A3B8]">
                    Completed in our pilot during the first month, across 3 languages
                  </span>
                </div>
                <div className="p-5 rounded-2xl bg-[#070B14]/80 border border-[#C7D2E0]/10">
                  <span className="block font-['JetBrains_Mono'] text-base font-bold text-white mb-1">
                    FSIF Sp. z o.o. (Poland)
                  </span>
                  <span className="text-xs text-[#94A3B8]">
                    Official European entity behind the Terata platform
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* BLOCK 8: FREQUENTLY ASKED QUESTIONS (FAQ) */}
        <section id="faq" className="py-20 px-6 max-w-4xl mx-auto border-t border-[#C7D2E0]/10">
          <div className="text-center mb-14">
            <span className="font-['JetBrains_Mono'] text-xs uppercase tracking-widest text-cyan-400 font-semibold">
              SIMPLE & HONEST ANSWERS
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mt-2 mb-4">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-10">
            {faqCategories.map((cat, cIdx) => (
              <div key={cIdx}>
                <h3 className="font-['JetBrains_Mono'] text-xs sm:text-sm uppercase tracking-wider text-cyan-400 font-semibold mb-4 pl-1">
                  {cat.category}
                </h3>
                <div className="space-y-3.5">
                  {cat.items.map((item) => {
                    const isOpen = openFaq === item.id;
                    return (
                      <div
                        key={item.id}
                        id={`faq-item-${item.id}`}
                        className="rounded-2xl glass-card overflow-hidden"
                      >
                        <button
                          onClick={() => setOpenFaq(isOpen ? null : item.id)}
                          aria-expanded={isOpen}
                          className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 hover:bg-slate-800/30 transition-colors"
                        >
                          <span className="text-base sm:text-lg font-bold text-white">
                            {item.q}
                          </span>
                          <ChevronDown
                            className={`w-5 h-5 text-cyan-400 shrink-0 transition-transform duration-200 ${
                              isOpen ? 'rotate-180' : ''
                            }`}
                          />
                        </button>
                        {isOpen && (
                          <div className="px-6 pb-6 pt-2 text-sm sm:text-base text-[#94A3B8] leading-relaxed border-t border-[#C7D2E0]/10">
                            {item.a}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* BLOCK 9: JOIN OUR COMMUNITY */}
        <section id="community" className="py-20 px-6 max-w-5xl mx-auto border-t border-[#C7D2E0]/10">
          <div className="p-8 sm:p-12 rounded-3xl glass-card border border-[#C7D2E0]/12 relative overflow-hidden text-center">

            <span className="inline-block font-['JetBrains_Mono'] text-xs uppercase tracking-widest text-emerald-400 font-semibold mb-2">
              BUILD TERATA WITH US
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4">
              Want to help shape Terata?
            </h2>
            <p className="text-[#94A3B8] max-w-2xl mx-auto text-base sm:text-lg leading-relaxed mb-8">
              Have ideas, suggestions, or just want to be around people who are building their own projects? Join our community of like-minded creators. Share feedback on the beta, suggest features, find future teammates, and be the first to try what we launch next.
            </p>
            <a
              href="https://chat.whatsapp.com/K0mGKoNkGtb0cnCOWJw3Gi?s=cl&p=a&iam=2"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl text-base font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
              Join the Community on WhatsApp
            </a>
          </div>
        </section>

        {/* BLOCK 10: CONTACT US */}
        <section id="contact" className="py-20 px-6 max-w-5xl mx-auto border-t border-[#C7D2E0]/10">
          <div className="p-8 sm:p-12 rounded-3xl glass-card border border-[#C7D2E0]/12 relative overflow-hidden">

            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="inline-block font-['JetBrains_Mono'] text-xs uppercase tracking-widest text-cyan-400 font-semibold mb-2">
                REAL PEOPLE • DIRECT SUPPORT
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4">
                Contact Us
              </h2>
              <p className="text-white font-semibold text-base sm:text-lg mb-3">
                Got stuck, have a question, or want to share feedback? Contact our support team — a real person will answer.
              </p>
              <p className="text-[#94A3B8] text-sm sm:text-base leading-relaxed">
                A small honest note: we’re ordinary people, just like you. We all have day jobs, and we build Terata in our free time — in the evenings, on weekends, and often late at night. So sometimes it may take us a little while to reply, but we read every message and we will get back to you. Thank you for your patience — and for building this with us.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
              <a
                href="mailto:support.terata@gmail.com"
                className="p-6 rounded-2xl bg-[#070B14]/80 border border-[#C7D2E0]/12 hover:bg-[#0B1220] transition-colors flex items-center gap-4 group"
              >
                <div className="w-12 h-12 rounded-xl bg-cyan-500/15 border border-[#C7D2E0]/12 flex items-center justify-center text-cyan-400 shrink-0">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <span className="block font-['JetBrains_Mono'] text-xs uppercase tracking-wider text-[#94A3B8] mb-1">
                    Email Support
                  </span>
                  <span className="text-base sm:text-lg font-bold text-white group-hover:text-cyan-300 transition-colors break-all">
                    support.terata@gmail.com
                  </span>
                </div>
              </a>

              <a
                href="https://wa.me/380963815386"
                target="_blank"
                rel="noreferrer"
                className="p-6 rounded-2xl bg-[#070B14]/80 border border-[#C7D2E0]/12 hover:bg-[#0B1220] transition-colors flex items-center gap-4 group"
              >
                <div className="w-12 h-12 rounded-xl bg-emerald-500/15 border border-[#C7D2E0]/12 flex items-center justify-center text-emerald-400 shrink-0">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <span className="block font-['JetBrains_Mono'] text-xs uppercase tracking-wider text-[#94A3B8] mb-1">
                    Phone / WhatsApp
                  </span>
                  <span className="text-base sm:text-lg font-bold text-white group-hover:text-emerald-300 transition-colors">
                    +380 96 381 5386
                  </span>
                </div>
              </a>
            </div>
          </div>
        </section>

        {/* FINAL CALL TO ACTION */}
        <section className="py-16 px-6 max-w-5xl mx-auto text-center">
          <div className="p-10 sm:p-14 rounded-3xl bg-gradient-to-b from-[#101827] to-[#070B14] border border-[#C7D2E0]/12 relative overflow-hidden">
            <span className="inline-block font-['JetBrains_Mono'] text-sm sm:text-base font-bold uppercase tracking-widest text-cyan-400 mb-2">
              Scared? Do it anyway.
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white mb-5">
              Ready to test your idea right now?
            </h2>
            <p className="text-[#94A3B8] max-w-xl mx-auto mb-8 text-base sm:text-lg leading-relaxed">
              Send Christopher a couple of sentences about what you’re thinking. No grades, no boring forms — and your feedback helps us build the full version of Terata.
            </p>
            <a
              href="https://terata-production.up.railway.app/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-base font-bold bg-cyan-500 hover:bg-cyan-400 text-slate-950 transition-colors"
            >
              Start a Free Beta Session
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer id="contacts" className="border-t border-[#C7D2E0]/10 bg-[#070B14] py-12 px-6 relative z-10 text-xs sm:text-sm text-[#94A3B8]">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 text-center lg:text-left">
              <WingsIcon size={26} />
              <span className="font-bold text-white tracking-tight">
                © 2026 Terata • Scared? Do it anyway.
              </span>
              <span className="text-slate-600">|</span>
              <span>
                Safe Idea Structuring & Proof of Authorship Platform • MVP / Beta. All rights reserved. Built for students, researchers, and creators.
              </span>
            </div>
          </div>

          <div className="pt-6 border-t border-[#C7D2E0]/10 flex flex-col lg:flex-row items-center justify-between gap-4 text-xs text-slate-400">
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a href="#faq-item-7" onClick={jumpToSensitiveFaq} className="hover:text-cyan-400 transition-colors">
                Privacy Policy
              </a>
              <span className="text-slate-700">|</span>
              <a href="#faq" className="hover:text-cyan-400 transition-colors">
                Terms of Use
              </a>
              <span className="text-slate-700">|</span>
              <a href="#community" className="hover:text-cyan-400 transition-colors">
                Community
              </a>
              <span className="text-slate-700">|</span>
              <span>
                Support:{' '}
                <a href="mailto:support.terata@gmail.com" className="text-slate-300 hover:text-cyan-400">
                  support.terata@gmail.com
                </a>{' '}
                •{' '}
                <a href="https://wa.me/380963815386" target="_blank" rel="noreferrer" className="text-slate-300 hover:text-cyan-400">
                  +380 96 381 5386
                </a>
              </span>
            </div>

            <div className="text-center lg:text-right font-['JetBrains_Mono'] text-[11px] text-slate-500">
              FSIF Sp. z o.o. • KRS: [TO CONFIRM] • NIP: [TO CONFIRM] • [TO CONFIRM: registered address], Poland
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
