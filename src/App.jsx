import { useState, useEffect } from 'react';
import {
  Server,
  Terminal,
  Code2,
  Database,
  Layers,
  Cpu,
  GitBranch,
  ExternalLink,
  Mail,
  Copy,
  Check,
  ChevronRight,
  BookOpen,
  Briefcase,
  GraduationCap,
  Sparkles,
  Download,
  Menu,
  X,
  FileText,
  CornerDownRight,
  Send,
  Activity,
  ShieldCheck,
  ArrowUpRight
} from 'lucide-react';
import profileImg from './assets/profile.jpg';
import './App.css';

const GithubIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export default function App() {
  const [activeNav, setActiveNav] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const [selectedSkillTab, setSelectedSkillTab] = useState('all');
  const [activeModalProject, setActiveModalProject] = useState(null);
  const [cvModalOpen, setCvModalOpen] = useState(false);
  const [copiedCurl, setCopiedCurl] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
  const [formSent, setFormSent] = useState(false);

  // Show temporary toast message
  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  // Copy helper
  const handleCopy = (text, type) => {
    navigator.clipboard.writeText(text);
    if (type === 'curl') {
      setCopiedCurl(true);
      setTimeout(() => setCopiedCurl(false), 2000);
      triggerToast('Perintah cURL disalin ke clipboard!');
    } else if (type === 'email') {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
      triggerToast('Alamat email disalin ke clipboard!');
    } else {
      triggerToast('Teks disalin ke clipboard!');
    }
  };

  // Scrollspy navigation highlight
  useEffect(() => {
    const sections = ['home', 'about', 'skills', 'projects', 'experience', 'education', 'contact'];
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveNav(sectionId);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Skills Data strictly based on user's confirmed skills
  const skillsData = [
    {
      id: 'java',
      name: 'Java',
      category: 'languages',
      categoryLabel: 'Programming Language',
      desc: 'Pemrograman berorientasi objek (OOP), perancangan arsitektur kelas, dan logika sistem inventaris.',
      appliedIn: 'Digunakan di: Sistem Informasi Inventaris'
    },
    {
      id: 'python',
      name: 'Python',
      category: 'languages',
      categoryLabel: 'Programming Language',
      desc: 'Pengembangan backend service, scripting sistem, pemrosesan data pipeline, dan integrasi API.',
      appliedIn: 'Digunakan di: REST API Flask & Monitoring Data'
    },
    {
      id: 'flask',
      name: 'Flask',
      category: 'backend',
      categoryLabel: 'Backend Framework',
      desc: 'Micro-framework Python untuk membangun RESTful API modular, route handling, dan request processing.',
      appliedIn: 'Digunakan di: REST API untuk Aplikasi Mobile'
    },
    {
      id: 'oop',
      name: 'Object-Oriented Programming (OOP)',
      category: 'backend',
      categoryLabel: 'Backend Paradigm',
      desc: 'Penerapan konsep enkapsulasi, abstraksi, inheritance, dan modularitas struktur kode.',
      appliedIn: 'Digunakan di: Aplikasi Java Inventaris'
    },
    {
      id: 'system-logic',
      name: 'Pemrograman & Logika Sistem',
      category: 'backend',
      categoryLabel: 'Core Logic',
      desc: 'Perancangan alur algoritma, penanganan validasi stok, error handling, dan aturan bisnis server.',
      appliedIn: 'Digunakan di: Seluruh Proyek Backend'
    },
    {
      id: 'data-processing',
      name: 'Pengolahan Data',
      category: 'backend',
      categoryLabel: 'Data Engineering',
      desc: 'Penerimaan, parsing format data masukan, transformasi, serta pemfilteran data berkala.',
      appliedIn: 'Digunakan di: Sistem Monitoring Data'
    },
    {
      id: 'mysql',
      name: 'MySQL',
      category: 'database',
      categoryLabel: 'Relational Database',
      desc: 'Perancangan skema tabel relasional, normalisasi data, query CRUD, dan integritas transaksi inventaris.',
      appliedIn: 'Digunakan di: Inventaris & REST API Flask'
    },
    {
      id: 'postgresql',
      name: 'PostgreSQL',
      category: 'database',
      categoryLabel: 'Relational Database',
      desc: 'Penyimpanan data terstruktur dengan integritas tinggi untuk mencatat riwayat pemantauan data.',
      appliedIn: 'Digunakan di: Sistem Monitoring Data'
    },
    {
      id: 'rest-api',
      name: 'REST API',
      category: 'api',
      categoryLabel: 'API Architecture',
      desc: 'Perancangan endpoint HTTP (GET, POST, PUT, DELETE), response JSON terstandarisasi, dan autentikasi.',
      appliedIn: 'Digunakan di: REST API Mobile & Data Monitoring'
    },
    {
      id: 'git',
      name: 'Git & GitHub',
      category: 'tools',
      categoryLabel: 'Version Control',
      desc: 'Manajemen versi kode, pelacakan commit, struktur branch, dan kolaborasi repositori proyek.',
      appliedIn: 'Digunakan di: Manajemen seluruh kode proyek'
    }
  ];

  const filteredSkills = selectedSkillTab === 'all'
    ? skillsData
    : skillsData.filter((s) => s.category === selectedSkillTab);

  // Projects Data strictly based on user's confirmed projects
  const projectsData = [
    {
      id: 'proj-1',
      priorityRank: 'Prioritas #1 (Utama)',
      categoryTag: 'REST API & Backend Service',
      title: 'REST API untuk Aplikasi Mobile',
      overview: 'Layanan backend berbasis RESTful API menggunakan Python dan framework Flask untuk menjembatani komunikasi data antara aplikasi mobile dan basis data MySQL secara terpusat dan konsisten.',
      problem: 'Aplikasi mobile membutuhkan antarmuka backend yang aman dan konsisten untuk autentikasi pengguna serta manipulasi data secara real-time tanpa akses langsung ke basis data.',
      solution: 'Mengembangkan REST API modular dengan Flask yang terhubung ke database MySQL, menyediakan endpoint terstandarisasi untuk validasi identitas dan operasi data.',
      features: [
        'Endpoint autentikasi pengguna',
        'Operasi CRUD data lengkap (Create, Read, Update, Delete)',
        'Pertukaran data berbasis format JSON terstandarisasi',
        'Integrasi query terstruktur dan koneksi ke database MySQL'
      ],
      techStack: ['Python', 'Flask', 'MySQL', 'REST API', 'Git', 'GitHub'],
      myRole: 'Backend Developer — Merancang seluruh struktur endpoint API, mengimplementasikan logika autentikasi, validasi data, serta mengintegrasikan database MySQL.',
      developmentProcess: 'Perancangan skema endpoint, pemodelan tabel MySQL, penulisan fungsi handler di Flask, pengujian HTTP request/response, dan version control dengan Git.',
      result: 'API berfungsi melayani pertukaran data aplikasi mobile secara konsisten dan teruji.',
      demoCurl: 'curl -X GET http://localhost:5000/api/v1/auth/verify \\\n  -H "Authorization: Bearer <token>"'
    },
    {
      id: 'proj-2',
      priorityRank: 'Prioritas #2',
      categoryTag: 'Aplikasi Web & Manajemen Logika',
      title: 'Sistem Informasi Inventaris Berbasis Web',
      overview: 'Aplikasi web pengelolaan inventaris yang dibangun menggunakan bahasa pemrograman Java dan MySQL untuk mencatat dan mengendalikan alur mutasi barang secara sistematis.',
      problem: 'Pencatatan inventaris manual rentan terhadap selisih stok, duplikasi data barang, serta lambatnya pencarian status ketersediaan barang.',
      solution: 'Membangun aplikasi berbasis Java dengan prinsip Object-Oriented Programming (OOP) yang mengotomatiskan validasi stok dan sinkronisasi transaksi langsung ke database MySQL.',
      features: [
        'Sistem login dan autentikasi pengguna',
        'Pengelolaan data barang dan kategori',
        'Operasi CRUD (tambah, lihat, ubah, hapus) data inventaris',
        'Validasi otomatis pembaruan stok pada setiap transaksi masuk/keluar'
      ],
      techStack: ['Java', 'MySQL', 'OOP', 'Web System', 'Git', 'GitHub'],
      myRole: 'Backend & Application Developer — Mengembangkan logika aplikasi berbasis OOP, merancang skema relasi database MySQL, dan memastikan validasi mutasi barang.',
      developmentProcess: 'Analisis kebutuhan entitas inventaris, normalisasi database MySQL, implementasi struktur kelas Java (OOP), penanganan koneksi database, dan verifikasi alur mutasi stok.',
      result: 'Sistem berhasil mengotomatiskan pencatatan mutasi stok dan mempermudah pelacakan barang dengan arsitektur OOP Java.',
      demoCurl: '// Struktur Method Java\npublic boolean processStockTransaction(int itemId, int qty, TransactionType type) {\n  // Validasi stok & eksekusi query update ke MySQL\n}'
    },
    {
      id: 'proj-3',
      priorityRank: 'Prioritas #3',
      categoryTag: 'Data Processing & Integration',
      title: 'Sistem Monitoring dan Pengolahan Data',
      overview: 'Sistem backend berbasis Python dan PostgreSQL yang bertugas menerima, memproses, menyimpan data pemantauan, serta menyediakannya kembali melalui endpoint API.',
      problem: 'Data yang masuk secara berkala membutuhkan alur penerimaan, pembersihan, dan penyimpanan yang konsisten agar dapat disajikan secara akurat bagi aplikasi lain.',
      solution: 'Mengembangkan alur kerja pemrosesan data dengan Python yang mengintegrasikan penyimpanan relasional PostgreSQL dan mengekspos data olahan melalui endpoint API.',
      features: [
        'Penerimaan dan parsing alur data masukan secara periodik',
        'Penyimpanan terstruktur pada database PostgreSQL',
        'Pengambilan dan pembacaan riwayat data monitoring',
        'Penyediaan endpoint API agar data dapat diakses oleh aplikasi/sistem lain'
      ],
      techStack: ['Python', 'PostgreSQL', 'REST API', 'Data Pipeline', 'Git', 'GitHub'],
      myRole: 'Backend / Data Processing Developer — Merancang alur pemrosesan data, integrasi database PostgreSQL, serta pembuatan endpoint penyedia data monitoring.',
      developmentProcess: 'Perancangan skema tabel PostgreSQL, pembuatan skrip pemrosesan data di Python, penulisan rute API untuk ekspos data, dan pengujian integritas data.',
      result: 'Sistem mampu memproses pipeline dan menyajikan data monitoring secara stabil melalui API.',
      demoCurl: 'curl -X GET http://localhost:8000/api/v1/monitoring/logs \\\n  -H "Accept: application/json"'
    }
  ];

  const handleContactSubmit = (e) => {
    e.preventDefault();
    setFormSent(true);
    triggerToast('Pesan berhasil disimulasikan terkirim!');
    setTimeout(() => {
      setContactForm({ name: '', email: '', message: '' });
      setFormSent(false);
    }, 4000);
  };

  return (
    <div className="portfolio-app">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="toast-notice" role="alert">
          <Check size={18} className="text-emerald" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Navigation */}
      <header className="navbar">
        <div className="container nav-container">
          <a href="#home" className="nav-brand">
            <img src={profileImg} alt="Afrizal Baihaqi" className="nav-brand-avatar" />
            <span className="brand-dot"></span>
            <span>afrizal.dev</span>
          </a>

          <nav>
            <ul className="nav-links">
              <li>
                <a href="#home" className={activeNav === 'home' ? 'active' : ''}>Home</a>
              </li>
              <li>
                <a href="#about" className={activeNav === 'about' ? 'active' : ''}>About</a>
              </li>
              <li>
                <a href="#skills" className={activeNav === 'skills' ? 'active' : ''}>Skills</a>
              </li>
              <li>
                <a href="#projects" className={activeNav === 'projects' ? 'active' : ''}>Projects</a>
              </li>
              <li>
                <a href="#experience" className={activeNav === 'experience' ? 'active' : ''}>Experience</a>
              </li>
              <li>
                <a href="#education" className={activeNav === 'education' ? 'active' : ''}>Education</a>
              </li>
              <li>
                <a href="#contact" className={activeNav === 'contact' ? 'active' : ''}>Contact</a>
              </li>
            </ul>
          </nav>

          <div className="nav-actions">
            <a
              href="https://github.com/afrizalbaihq-blip"
              target="_blank"
              rel="noreferrer"
              className="btn btn-secondary"
              style={{ padding: '8px 14px' }}
              title="GitHub Profile"
            >
              <GithubIcon size={18} />
              <span>afrizalbaihq-blip</span>
            </a>
            <a href="#contact" className="btn btn-primary" style={{ padding: '8px 18px' }}>
              Kontak
            </a>
            <button
              className="mobile-menu-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <div className={`mobile-drawer ${mobileMenuOpen ? 'open' : ''}`}>
          <a href="#home" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>Home</a>
          <a href="#about" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>About</a>
          <a href="#skills" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>Skills</a>
          <a href="#projects" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>Projects</a>
          <a href="#experience" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>Experience</a>
          <a href="#education" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>Education</a>
          <a href="#contact" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>Contact</a>
        </div>
      </header>

      {/* SECTION 1: HOME (HERO) */}
      <section id="home" className="hero-section">
        <div className="container hero-grid">
          <div className="hero-content-col">
            <div className="hero-status-pill">
              <span className="brand-dot" style={{ width: '8px', height: '8px' }}></span>
              <span>OPEN TO WORK: BACKEND DEVELOPER</span>
            </div>

            <p className="hero-greeting">Halo, saya <span className="greeting-name">Afrizal Baihaqi</span></p>
            <h1 className="hero-title">
              Backend Developer <br />
              <span className="gradient-accent">Java & Python</span>
            </h1>

            <p className="hero-tagline">
              Mahasiswa <strong>S.Tr. Teknologi Rekayasa Internet</strong> di <strong>Politeknik Elektronika Negeri Surabaya (PENS)</strong>. Membangun layanan backend yang terstruktur, integrasi database yang andal, dan efisiensi logika sistem.
            </p>

            <div className="hero-cta-group">
              <a href="#projects" className="btn btn-primary">
                <span>Lihat Proyek</span>
                <ChevronRight size={18} />
              </a>
              <a href="#contact" className="btn btn-secondary">
                <span>Hubungi Saya</span>
              </a>
              <button onClick={() => setCvModalOpen(true)} className="btn btn-outline-emerald">
                <Download size={18} />
                <span>Unduh CV</span>
              </button>
            </div>

            <div className="hero-tech-strip">
              <span className="tech-strip-label">Stack Inti:</span>
              <div className="tech-strip-tags">
                <span className="badge badge-emerald">Java</span>
                <span className="badge badge-emerald">Python</span>
                <span className="badge badge-cyan">Flask</span>
                <span className="badge badge-cyan">MySQL</span>
                <span className="badge badge-indigo">PostgreSQL</span>
                <span className="badge">REST API</span>
                <span className="badge">Git</span>
              </div>
            </div>
          </div>

          {/* Interactive Backend Terminal Mockup & User Profile Photo */}
          <div className="hero-terminal-col">
            <div className="hero-profile-card">
              <div className="hero-profile-image-wrap">
                <img src={profileImg} alt="Afrizal Baihaqi" className="hero-profile-img" />
                <div className="hero-profile-status-tag">
                  <span className="live-pulse"></span>
                  <span>PENS • Aktif</span>
                </div>
              </div>
              <div className="hero-profile-details">
                <div className="hero-profile-header-info">
                  <h3 className="hero-profile-name">Afrizal Baihaqi</h3>
                  <span className="badge badge-emerald">Backend Dev</span>
                </div>
                <p className="hero-profile-sub">
                  S.Tr. Teknologi Rekayasa Internet • Politeknik Elektronika Negeri Surabaya
                </p>
                <div className="hero-profile-meta-row">
                  <span className="meta-chip">
                    <Database size={13} />
                    <span>Java / Python</span>
                  </span>
                  <span className="meta-chip">
                    <Server size={13} />
                    <span>Flask & MySQL</span>
                  </span>
                </div>
              </div>
            </div>

            <div className="terminal-window">
              <div className="terminal-header">
                <div className="terminal-dots">
                  <span className="t-dot t-red"></span>
                  <span className="t-dot t-yellow"></span>
                  <span className="t-dot t-green"></span>
                </div>
                <span className="terminal-title">bash — api-profile-inspect</span>
                <Terminal size={14} color="#64748b" />
              </div>

              <div className="terminal-body">
                <div className="term-cmd-line">
                  <span className="term-cmd">
                    <span style={{ color: '#10b981' }}>$</span> curl -i http://api.local/v1/profile
                  </span>
                  <button
                    className="term-copy-btn"
                    onClick={() => handleCopy('curl -i http://api.local/v1/profile', 'curl')}
                    title="Salin cURL"
                  >
                    {copiedCurl ? <Check size={14} color="#10b981" /> : <Copy size={14} />}
                  </button>
                </div>

                <div className="term-status-row">
                  <span className="term-status-ok">
                    <Activity size={13} /> HTTP/1.1 200 OK
                  </span>
                  <span>Latency: 24ms</span>
                  <span>Content-Type: application/json</span>
                </div>

                <pre className="term-json-code">
{`{
  `}<span className="json-key">"name"</span>{`: `}<span className="json-str">"Afrizal Baihaqi"</span>{`,
  `}<span className="json-key">"role"</span>{`: `}<span className="json-str">"Backend Developer"</span>{`,
  `}<span className="json-key">"campus"</span>{`: `}<span className="json-str">"Politeknik Elektronika Negeri Surabaya"</span>{`,
  `}<span className="json-key">"major"</span>{`: `}<span className="json-str">"S.Tr. Teknologi Rekayasa Internet"</span>{`,
  `}<span className="json-key">"languages"</span>{`: [`}<span className="json-str">"Java"</span>{`, `}<span className="json-str">"Python"</span>{`],
  `}<span className="json-key">"frameworks"</span>{`: [`}<span className="json-str">"Flask"</span>{`, `}<span className="json-str">"OOP"</span>{`, `}<span className="json-str">"System Logic"</span>{`],
  `}<span className="json-key">"databases"</span>{`: [`}<span className="json-str">"MySQL"</span>{`, `}<span className="json-str">"PostgreSQL"</span>{`],
  `}<span className="json-key">"email"</span>{`: `}<span className="json-str">"afrizalbaihq@gmail.com"</span>{`,
  `}<span className="json-key">"github"</span>{`: `}<span className="json-str">"afrizalbaihq-blip"</span>{`,
  `}<span className="json-key">"status"</span>{`: `}<span className="json-str">"Ready for Opportunities"</span>{`
}`}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: ABOUT */}
      <section id="about">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Tentang Saya</span>
            <h2 className="section-title">Membangun Fondasi Sistem di Sisi Server</h2>
            <p className="section-description">
              Dedikasi pada arsitektur kode terstruktur, integrasi basis data, dan efisiensi logika server.
            </p>
          </div>

          <div className="about-grid">
            <div className="about-text-wrapper">
              <p className="about-p">
                Saya adalah mahasiswa <strong>S.Tr. Teknologi Rekayasa Internet</strong> di <strong>Politeknik Elektronika Negeri Surabaya (PENS)</strong> dengan fokus utama pada <strong>Backend Development</strong> dan perancangan sistem perangkat lunak. Selama masa studi dan pengerjaan proyek, saya terbiasa membangun fondasi sisi server menggunakan bahasa pemrograman <strong>Java</strong> dan <strong>Python</strong>, didukung oleh pengelolaan basis data relasional seperti <strong>MySQL</strong> dan <strong>PostgreSQL</strong>.
              </p>

              <p className="about-p">
                Fokus teknis saya mencakup perancangan logika bisnis aplikasi (OOP), pengembangan layanan REST API modular menggunakan framework <strong>Flask</strong>, serta pengolahan dan integrasi data agar dapat dikonsumsi dengan andal oleh aplikasi klien. Saya tertarik menyelesaikan masalah seputar keandalan alur data, validasi logika server, dan pengelolaan transaksi database secara terstruktur.
              </p>

              <div className="about-quick-specs">
                <div className="spec-item">
                  <div className="spec-label">Nama Lengkap</div>
                  <div className="spec-val">Afrizal Baihaqi</div>
                </div>
                <div className="spec-item">
                  <div className="spec-label">Perguruan Tinggi</div>
                  <div className="spec-val">Politeknik Elektronika Negeri Surabaya (PENS)</div>
                </div>
                <div className="spec-item">
                  <div className="spec-label">Program Studi</div>
                  <div className="spec-val">S.Tr. Teknologi Rekayasa Internet</div>
                </div>
                <div className="spec-item">
                  <div className="spec-label">Target Role</div>
                  <div className="spec-val">Backend Developer / Software Engineer</div>
                </div>
                <div className="spec-item">
                  <div className="spec-label">Bahasa Utama</div>
                  <div className="spec-val">Java & Python</div>
                </div>
                <div className="spec-item">
                  <div className="spec-label">Database Relasional</div>
                  <div className="spec-val">MySQL & PostgreSQL</div>
                </div>
              </div>
            </div>

            {/* Engineering Pillars Card */}
            <div className="glass-card pillars-card">
              <h3 className="pillars-title">
                <ShieldCheck size={20} color="#10b981" />
                <span>Pilar Rekayasa Backend</span>
              </h3>

              <div className="pillars-list">
                <div className="pillar-item">
                  <div className="pillar-icon-box">
                    <Code2 size={20} />
                  </div>
                  <div className="pillar-content">
                    <h4>Object-Oriented Programming (OOP)</h4>
                    <p>Menerapkan abstraksi, enkapsulasi, dan struktur kelas modular untuk memelihara skalabilitas kode.</p>
                  </div>
                </div>

                <div className="pillar-item">
                  <div className="pillar-icon-box">
                    <Server size={20} />
                  </div>
                  <div className="pillar-content">
                    <h4>Desain & Endpoint REST API</h4>
                    <p>Penyusunan endpoint modular (GET, POST, PUT, DELETE), validasi request, dan format respons JSON terstandarisasi.</p>
                  </div>
                </div>

                <div className="pillar-item">
                  <div className="pillar-icon-box">
                    <Database size={20} />
                  </div>
                  <div className="pillar-content">
                    <h4>Integritas Basis Data Relasional</h4>
                    <p>Pemodelan skema tabel dan query terstruktur pada MySQL dan PostgreSQL untuk memastikan konsistensi data transaksi.</p>
                  </div>
                </div>

                <div className="pillar-item">
                  <div className="pillar-icon-box">
                    <Layers size={20} />
                  </div>
                  <div className="pillar-content">
                    <h4>Alur & Pengolahan Data</h4>
                    <p>Pengelolaan alur penerimaan, pembersihan (filtering), dan pengarsipan data monitoring secara teratur.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: SKILLS */}
      <section id="skills">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Keahlian & Teknologi</span>
            <h2 className="section-title">Teknologi yang Benar-Benar Digunakan</h2>
            <p className="section-description">
              Daftar keahlian teknis yang telah saya implementasikan langsung dalam pengerjaan proyek backend dan sistem.
            </p>
          </div>

          {/* Skill Category Tabs */}
          <div className="skills-tabs">
            <button
              className={`skill-tab-btn ${selectedSkillTab === 'all' ? 'active' : ''}`}
              onClick={() => setSelectedSkillTab('all')}
            >
              Semua Skill ({skillsData.length})
            </button>
            <button
              className={`skill-tab-btn ${selectedSkillTab === 'languages' ? 'active' : ''}`}
              onClick={() => setSelectedSkillTab('languages')}
            >
              Programming Languages
            </button>
            <button
              className={`skill-tab-btn ${selectedSkillTab === 'backend' ? 'active' : ''}`}
              onClick={() => setSelectedSkillTab('backend')}
            >
              Backend & Logika
            </button>
            <button
              className={`skill-tab-btn ${selectedSkillTab === 'database' ? 'active' : ''}`}
              onClick={() => setSelectedSkillTab('database')}
            >
              Database
            </button>
            <button
              className={`skill-tab-btn ${selectedSkillTab === 'api' ? 'active' : ''}`}
              onClick={() => setSelectedSkillTab('api')}
            >
              API
            </button>
            <button
              className={`skill-tab-btn ${selectedSkillTab === 'tools' ? 'active' : ''}`}
              onClick={() => setSelectedSkillTab('tools')}
            >
              Tools & DevOps
            </button>
          </div>

          {/* Skills Grid */}
          <div className="skills-grid">
            {filteredSkills.map((skill) => (
              <div key={skill.id} className="glass-card skill-card">
                <div className="skill-card-top">
                  <div className="skill-icon-bubble">
                    {skill.category === 'languages' && <Code2 size={20} />}
                    {skill.category === 'backend' && <Server size={20} />}
                    {skill.category === 'database' && <Database size={20} />}
                    {skill.category === 'api' && <Layers size={20} />}
                    {skill.category === 'tools' && <GitBranch size={20} />}
                  </div>
                  <span className="skill-category-badge">{skill.categoryLabel}</span>
                </div>

                <h3 className="skill-name">{skill.name}</h3>
                <p className="skill-desc">{skill.desc}</p>
                <div className="skill-applied-in">{skill.appliedIn}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: PROJECTS */}
      <section id="projects">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Portofolio Proyek</span>
            <h2 className="section-title">Proyek Backend Unggulan</h2>
            <p className="section-description">
              Disusun berdasarkan relevansi teknis tertinggi untuk target posisi Backend Developer.
            </p>
          </div>

          <div className="projects-grid">
            {projectsData.map((project) => (
              <div key={project.id} className="glass-card project-card">
                <span className="project-priority-badge">{project.priorityRank}</span>
                <span className="project-category-tag">{project.categoryTag}</span>
                <h3 className="project-title">{project.title}</h3>
                <p className="project-overview">{project.overview}</p>

                <div className="project-columns">
                  <div className="project-prob-sol">
                    <div className="ps-item">
                      <span className="project-block-title">Problem:</span>
                      <p className="ps-text">{project.problem}</p>
                    </div>
                    <div className="ps-item">
                      <span className="project-block-title">Solution:</span>
                      <p className="ps-text">{project.solution}</p>
                    </div>
                  </div>

                  <div className="ps-item">
                    <span className="project-block-title">Fitur Utama:</span>
                    <ul className="features-list">
                      {project.features.map((feat, idx) => (
                        <li key={idx}>
                          <ChevronRight size={14} />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="project-tech-stack">
                  {project.techStack.map((tech, idx) => (
                    <span key={idx} className="badge badge-emerald">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="project-card-footer">
                  <div className="project-role-note">
                    <strong>Peran Saya:</strong> {project.myRole}
                  </div>

                  <div className="project-actions">
                    <button
                      className="btn btn-primary"
                      onClick={() => setActiveModalProject(project)}
                      style={{ padding: '8px 16px', fontSize: '0.88rem' }}
                    >
                      <span>Detail & Arsitektur</span>
                      <ArrowUpRight size={16} />
                    </button>
                    <button
                      className="btn btn-secondary"
                      onClick={() => handleCopy(project.demoCurl, 'snippet')}
                      style={{ padding: '8px 14px', fontSize: '0.88rem' }}
                      title="Salin cuplikan cURL / method"
                    >
                      <Copy size={15} />
                      <span>Salin Snippet</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5: EXPERIENCE */}
      <section id="experience">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Pengalaman Kerja & Proyek</span>
            <h2 className="section-title">Rekam Jejak Pengembangan Sistem</h2>
            <p className="section-description">
              Pengalaman membangun arsitektur backend, manajemen database, dan modul pemrosesan data.
            </p>
          </div>

          <div className="timeline-list">
            <div className="glass-card timeline-item">
              <div className="timeline-meta">
                <span className="timeline-period">Project-Based & Akademik</span>
                <span className="timeline-institution">Politeknik Elektronika Negeri Surabaya</span>
                <span className="timeline-location">Surabaya, Indonesia</span>
              </div>

              <div className="timeline-body-col">
                <h3 className="timeline-role">Backend Developer</h3>
                <p className="timeline-desc">
                  Bertanggung jawab merancang arsitektur backend, pemodelan database relasional, dan perancangan endpoint integrasi data.
                </p>

                <ul className="timeline-bullets">
                  <li>
                    <CornerDownRight size={16} />
                    <span>Mengembangkan arsitektur backend, manajemen database, dan modul pemrosesan data menggunakan Java dan Python.</span>
                  </li>
                  <li>
                    <CornerDownRight size={16} />
                    <span>Menerapkan kontrol versi kode dan kolaborasi repositori menggunakan Git dan GitHub.</span>
                  </li>
                  <li>
                    <CornerDownRight size={16} />
                    <span>Merancang endpoint REST API dan memastikan integritas transaksi data pada sistem berbasis MySQL dan PostgreSQL.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: EDUCATION */}
      <section id="education">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Pendidikan</span>
            <h2 className="section-title">Latar Belakang Akademik</h2>
            <p className="section-description">
              Fondasi ilmu rekayasa sistem, jaringan internet, dan teknologi perangkat lunak.
            </p>
          </div>

          <div className="timeline-list">
            <div className="glass-card timeline-item">
              <div className="timeline-meta">
                <span className="timeline-period">Mahasiswa Aktif</span>
                <span className="timeline-institution">Politeknik Elektronika Negeri Surabaya (PENS)</span>
                <span className="timeline-location">Surabaya, Indonesia</span>
              </div>

              <div className="timeline-body-col">
                <h3 className="timeline-role">S.Tr. Teknologi Rekayasa Internet</h3>
                <p className="timeline-desc">
                  Program studi Sarjana Terapan berfokus pada arsitektur sistem internet, rekayasa jaringan, pemrograman perangkat lunak sisi server, serta manajemen basis data di Politeknik Elektronika Negeri Surabaya.
                </p>

                <ul className="timeline-bullets">
                  <li>
                    <GraduationCap size={16} />
                    <span><strong>Fokus Keilmuan:</strong> Pemrograman Backend, Arsitektur Jaringan & Server, Rekayasa Basis Data Relasional, dan Pengolahan Data Sistem.</span>
                  </li>
                  <li>
                    <GraduationCap size={16} />
                    <span><strong>Implementasi Praktis:</strong> Penerapan logika sistem menggunakan Java dan Python untuk menyelesaikan studi kasus aplikasi inventaris dan monitoring data.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7: CONTACT */}
      <section id="contact">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Kontak</span>
            <h2 className="section-title">Mari Terhubung & Berdiskusi</h2>
            <p className="section-description">
              Saya terbuka untuk peluang kerja sebagai Backend Developer atau Software Engineer.
            </p>
          </div>

          <div className="contact-grid">
            {/* Contact cards info */}
            <div className="contact-cards-group">
              <div className="glass-card contact-card-item">
                <div className="contact-card-left">
                  <div className="contact-icon-box">
                    <Mail size={22} />
                  </div>
                  <div>
                    <span className="contact-item-title">Gmail</span>
                    <div className="contact-item-value">afrizalbaihq@gmail.com</div>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    className="copy-mini-btn"
                    onClick={() => handleCopy('afrizalbaihq@gmail.com', 'email')}
                    title="Salin email"
                  >
                    {copiedEmail ? <Check size={14} color="#10b981" /> : <Copy size={14} />}
                    <span>Salin</span>
                  </button>
                  <a
                    href="mailto:afrizalbaihq@gmail.com"
                    className="copy-mini-btn"
                    title="Kirim email"
                  >
                    <ExternalLink size={14} />
                    <span>Kirim</span>
                  </a>
                </div>
              </div>

              <div className="glass-card contact-card-item">
                <div className="contact-card-left">
                  <div className="contact-icon-box">
                    <LinkedinIcon size={22} />
                  </div>
                  <div>
                    <span className="contact-item-title">LinkedIn</span>
                    <div className="contact-item-value">Afrizal Baihaqi</div>
                  </div>
                </div>
                <a
                  href="https://www.linkedin.com/search/results/all/?keywords=Afrizal%20Baihaqi"
                  target="_blank"
                  rel="noreferrer"
                  className="copy-mini-btn"
                >
                  <ExternalLink size={14} />
                  <span>Buka</span>
                </a>
              </div>

              <div className="glass-card contact-card-item">
                <div className="contact-card-left">
                  <div className="contact-icon-box">
                    <GithubIcon size={22} />
                  </div>
                  <div>
                    <span className="contact-item-title">GitHub</span>
                    <div className="contact-item-value">afrizalbaihq-blip</div>
                  </div>
                </div>
                <a
                  href="https://github.com/afrizalbaihq-blip"
                  target="_blank"
                  rel="noreferrer"
                  className="copy-mini-btn"
                >
                  <ExternalLink size={14} />
                  <span>Buka</span>
                </a>
              </div>
            </div>

            {/* Interactive message form simulator */}
            <div className="glass-card contact-form-card">
              <h3 className="contact-form-title">Kirim Pesan Langsung</h3>
              <p className="contact-form-subtitle">
                Formulir ini dapat digunakan oleh recruiter atau kolega untuk mengirim pesan pengantar.
              </p>

              <form onSubmit={handleContactSubmit}>
                <div className="form-group">
                  <label className="form-label">Nama Anda</label>
                  <input
                    type="text"
                    required
                    className="form-input"
                    placeholder="Contoh: HR Manager / Tech Lead"
                    value={contactForm.name}
                    onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Email Anda</label>
                  <input
                    type="email"
                    required
                    className="form-input"
                    placeholder="nama@perusahaan.com"
                    value={contactForm.email}
                    onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Pesan / Diskusi Peluang</label>
                  <textarea
                    required
                    className="form-textarea"
                    placeholder="Halo, kami tertarik mendiskusikan peluang posisi Backend Developer..."
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                  ></textarea>
                </div>

                <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                  <Send size={18} />
                  <span>{formSent ? 'Pesan Terkirim!' : 'Kirim Pesan'}</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="container footer-inner">
          <div className="footer-copy">
            &copy; {new Date().getFullYear()} Afrizal Baihaqi — Backend Developer Portfolio.
          </div>
          <div className="footer-signature">
            Politeknik Elektronika Negeri Surabaya (PENS) • S.Tr. Teknologi Rekayasa Internet
          </div>
        </div>
      </footer>

      {/* MODAL: DETAIL PROYEK */}
      {activeModalProject && (
        <div className="modal-overlay" onClick={() => setActiveModalProject(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <span className="project-category-tag">{activeModalProject.categoryTag}</span>
                <h3 style={{ fontSize: '1.4rem' }}>{activeModalProject.title}</h3>
              </div>
              <button
                className="modal-close-btn"
                onClick={() => setActiveModalProject(null)}
                aria-label="Tutup"
              >
                <X size={20} />
              </button>
            </div>

            <div className="modal-body">
              <div>
                <span className="project-block-title">Ringkasan Proyek</span>
                <p style={{ color: '#cbd5e1', lineHeight: '1.6' }}>{activeModalProject.overview}</p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div className="ps-item">
                  <span className="project-block-title">Problem</span>
                  <p className="ps-text">{activeModalProject.problem}</p>
                </div>
                <div className="ps-item">
                  <span className="project-block-title">Solution</span>
                  <p className="ps-text">{activeModalProject.solution}</p>
                </div>
              </div>

              <div>
                <span className="project-block-title">Fitur Teknis yang Dikerjakan</span>
                <ul className="features-list">
                  {activeModalProject.features.map((f, i) => (
                    <li key={i}>
                      <ChevronRight size={14} />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <span className="project-block-title">Proses Pengembangan & Kontribusi</span>
                <p style={{ color: '#94a3b8', fontSize: '0.92rem', marginBottom: '8px' }}>
                  <strong>Peran:</strong> {activeModalProject.myRole}
                </p>
                <p style={{ color: '#94a3b8', fontSize: '0.92rem' }}>
                  <strong>Alur Pengerjaan:</strong> {activeModalProject.developmentProcess}
                </p>
              </div>

              <div>
                <span className="project-block-title">Hasil Project</span>
                <p style={{ color: '#cbd5e1', fontSize: '0.92rem' }}>{activeModalProject.result}</p>
              </div>

              <div>
                <span className="project-block-title">Cuplikan Kode / Endpoint Command</span>
                <pre className="term-json-code">{activeModalProject.demoCurl}</pre>
              </div>

              <div>
                <span className="project-block-title">Tautan Repositori & Demo</span>
                <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
                  <a
                    href="https://github.com/afrizalbaihq-blip"
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-secondary"
                  >
                    <GithubIcon size={16} />
                    <span>GitHub: afrizalbaihq-blip</span>
                  </a>
                  <button
                    className="btn btn-secondary"
                    onClick={() => triggerToast('Kode proyek tersedia pada repositori')}
                  >
                    <ExternalLink size={16} />
                    <span>Status: Terverifikasi</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: UNDUH CV */}
      {cvModalOpen && (
        <div className="modal-overlay" onClick={() => setCvModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '520px' }}>
            <div className="modal-header">
              <h3 style={{ fontSize: '1.25rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <FileText size={20} color="#10b981" />
                <span>Unduh Curriculum Vitae (CV)</span>
              </h3>
              <button className="modal-close-btn" onClick={() => setCvModalOpen(false)}>
                <X size={20} />
              </button>
            </div>

            <div className="modal-body">
              <p style={{ color: '#cbd5e1', fontSize: '0.95rem', lineHeight: '1.6' }}>
                Curriculum Vitae untuk <strong>Afrizal Baihaqi</strong> (Backend Developer - S.Tr. Teknologi Rekayasa Internet PENS).
              </p>
              <div className="ps-item" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: '#38bdf8' }}>
                1. Simpan file PDF CV Anda ke dalam folder: <code>public/cv-afrizal-baihaqi.pdf</code><br />
                2. Tombol ini otomatis mengunduh dokumen Anda secara instan.
              </div>

              <button
                className="btn btn-primary"
                onClick={() => {
                  triggerToast('Profil Afrizal Baihaqi siap diexport atau ditautkan ke PDF.');
                  setCvModalOpen(false);
                }}
              >
                <span>Mengerti & Tutup</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
