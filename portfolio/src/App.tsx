import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { profile, projects } from './data';
const Character = lazy(() => import('./Character'));
const categories = ['Semua', 'Web Apps', 'AI & Creative'];
export default function App() {
 const [filter,setFilter] = useState('Semua');
 const [selected,setSelected] = useState<(typeof projects)[number] | null>(null);
 const [motion,setMotion] = useState(() => !window.matchMedia('(prefers-reduced-motion: reduce)').matches);
 const dialog = useRef<HTMLDialogElement>(null);
 useEffect(()=>{ if(selected) dialog.current?.showModal(); },[selected]);
 const close = () => {dialog.current?.close();setSelected(null);};
 return <>
 <a className="skip" href="#work">Langsung ke proyek</a>
 <header><a className="logo" href="#home" aria-label="Fakhira beranda">fz<span>✳</span></a><nav aria-label="Navigasi utama"><a href="#about">Tentang</a><a href="#work">Proyek</a><a href="#contact">Kontak <span>↗</span></a></nav><a className="github-top" href={profile.github} target="_blank" rel="noreferrer">GitHub ↗</a></header>
 <main>
 <section className="hero" id="home">
 <div className="hero-top"><span className="eyebrow"><i/> PERSONAL PORTFOLIO / 2026</span><span className="location">IDEAS. DESIGN. CODE.</span></div>
 <div className="hero-title"><span>Hi, I’m</span><h1>Fakhira<span className="surname">Zahrany<span className="star">✳</span></span></h1></div>
 <div className="hero-art"><div className="orbit"/><div className="orbit second"/><div className="scene-fallback" aria-hidden="true">fz<span>✳</span></div><Suspense fallback={<span className="scene-status">Memuat ruang 3D…</span>}><Character motion={motion}/></Suspense><span className="art-caption">A LITTLE CURIOUS. ALWAYS CREATING.</span><button className="motion" onClick={()=>setMotion(!motion)} aria-pressed={motion}>{motion?'Ⅱ Jeda animasi':'▷ Putar animasi'}</button></div>
 <div className="hero-description"><span className="mini-label">BUSINESS × DESIGN × TECHNOLOGY</span><h2>Curious mind.<br/><em>Creative heart.</em></h2><p>{profile.intro}</p><a className="pill" href="#work">Jelajahi proyek <span>↘</span></a></div>
 <div className="hero-bottom"><span>{profile.role}</span><a href="#about">SCROLL TO EXPLORE ↓</a></div>
 </section>
 <div className="ribbon" aria-hidden="true">SYSTEM THINKING <span>✳</span> DIGITAL EXPERIENCES <span>✳</span> CREATIVE EXPLORATION <span>✳</span></div>
 <section id="about" className="about section"><div className="section-label">01 / TENTANG SAYA</div><div><h2>Di antara logika<br/>dan <em>imajinasi.</em></h2><p className="about-copy">{profile.about}</p><div className="focus-grid"><article><span>01</span><h3>Understand</h3><p>Memahami kebutuhan, menyusun alur, dan memetakan proses sistem.</p></article><article><span>02</span><h3>Design</h3><p>Mengeksplorasi antarmuka yang jelas, nyaman, dan berpusat pada pengguna.</p></article><article><span>03</span><h3>Explore</h3><p>Belajar lewat proyek web, eksperimen AI lokal, game, dan seni 3D.</p></article></div></div></section>
 <section id="work" className="work section"><div className="section-heading"><div><div className="section-label">02 / PROYEK PILIHAN</div><h2>Made with<br/><em>curiosity.</em></h2></div><p>Dari ide menjadi sesuatu yang bisa dicoba.<br/>Pilihan proyek dari GitHub saya.</p></div><div className="filters" role="group" aria-label="Filter proyek">{categories.map(c=><button key={c} aria-pressed={filter===c} className={filter===c?'active':''} onClick={()=>setFilter(c)}>{c}{c==='Semua'&&<small>03</small>}</button>)}</div><div className="projects">{projects.filter(p=>filter==='Semua'||filter===p.category).map((p)=><article className={'project '+p.id} key={p.id} style={{'--project-color':p.color} as React.CSSProperties}><button className="project-art" onClick={()=>setSelected(p)} aria-label={'Lihat detail '+p.title}><span className="project-label">{p.label}</span><span className="project-mark">{p.mark}<i>✳</i></span><div className="art-lines"/><span className="cover-note">{p.category} / PROJECT</span><span className="open-project">↗</span></button><div className="project-meta"><span>{p.type}</span><span>0{projects.indexOf(p)+1}</span></div><h3><button onClick={()=>setSelected(p)}>{p.title}</button><a href={profile.github+'/'+p.repo} target="_blank" rel="noreferrer" aria-label={'GitHub '+p.title}>↗</a></h3><p>{p.description}</p><div className="tags">{p.tags.map(t=><span key={t}>{t}</span>)}</div></article>)}</div><a className="text-link" href={profile.github+'?tab=repositories'} target="_blank" rel="noreferrer">Lihat semua repositori di GitHub ↗</a></section>
 <section className="toolkit section"><div className="section-label">03 / TOOLKIT</div><div><h2>Tools for<br/><em>turning ideas real.</em></h2><div className="skill-list">{profile.skills.map((s,i)=><span key={s}><small>0{i+1}</small>{s}</span>)}</div><p className="learning">Sedang mengeksplorasi <span>{profile.learning.join(' · ')}</span></p></div></section>
 <section className="contact section" id="contact"><div className="section-label">04 / LET’S CONNECT</div><span className="contact-star" aria-hidden="true">✳</span><h2>Good things start<br/>with <em>a hello.</em></h2><p>Punya ide, ingin berkolaborasi, atau sekadar melihat proses belajarku?</p><a className="pill" href={profile.github} target="_blank" rel="noreferrer">Temui saya di GitHub <span>↗</span></a></section>
 </main><footer><span>© {new Date().getFullYear()} {profile.name}</span><span>3D asset / Kabir Singh · MIT</span><a href="#home">Kembali ke atas ↑</a></footer>
 <dialog ref={dialog} onCancel={()=>setSelected(null)} onClick={e=>{if(e.target===e.currentTarget)close();}}><button className="dialog-close" aria-label="Tutup detail" onClick={close}>×</button>{selected&&<><span className="eyebrow">{selected.type}</span><h2>{selected.title}</h2><p>{selected.description}</p><p>{selected.detail}</p><div className="tags">{selected.tags.map(t=><span key={t}>{t}</span>)}</div><a className="pill" href={profile.github+'/'+selected.repo} target="_blank" rel="noreferrer">Buka repositori ↗</a></>}</dialog>
 </>;
}
