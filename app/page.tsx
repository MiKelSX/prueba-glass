'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { GlassElement } from './GlassElement';
import { detectSVGFilterSupport } from './DisplacementUtils';
 
// ============================================
// ICONOS SVG
// ============================================
const MenuIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
);
const CloseIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
);
const StarIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>;
const ZapIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>;
const HeartIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>;
const ShieldIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>;
const EyeIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>;
const ArrowRightIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>;
const CheckIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>;
const SunIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>;
const MoonIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>;
const UserIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>;
const BellIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>;
const SearchIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>;
const SettingsIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4 17.5a1.65 1.65 0 0 0-1.51-1H2a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4 12.6a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 7.5a1.65 1.65 0 0 0 1-1.51V5a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>;
const PlayIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>;
const PauseIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>;
const ImageIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>;
const LayersIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>;
const GridIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>;
const MaximizeIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/></svg>;
const MinimizeIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"/></svg>;

// ============================================
// NAVBAR
// ============================================
const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => { const h = () => setScrolled(window.scrollY > 50); window.addEventListener('scroll', h); return () => window.removeEventListener('scroll', h); }, []);
  const navLinks = [
    { label: 'Inicio', href: '#hero' }, { label: 'Matrix', href: '#matrix' }, { label: 'Galería', href: '#gallery' },
    { label: 'Playground', href: '#playground' }, { label: 'Comparativa', href: '#compare' }, { label: 'UI Kit', href: '#uikit' },
  ];
  return (
    <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000, padding: scrolled ? '10px 16px' : '16px', transition: 'all 0.3s ease' }}>
      <GlassElement autoSize radius={20} depth={8} blur={2} strength={60} chromaticAberration={1} backgroundColor="rgba(255,255,255,0.12)" style={{ width: '100%', maxWidth: '1200px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 'bold', fontSize: '1.1rem' }}>
          <span style={{ fontSize: '1.4rem' }}>💧</span><span>LiquidGlass</span>
        </div>
        <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }} className="desktop-nav">
          {navLinks.map(l => (
            <GlassElement key={l.href} autoSize radius={14} depth={4} blur={1} strength={40} backgroundColor="rgba(255,255,255,0.08)" style={{ fontSize: '0.85rem' }} onClick={() => document.querySelector(l.href)?.scrollIntoView({ behavior: 'smooth' })}>
              <span style={{ padding: '0' }}>{l.label}</span>
            </GlassElement>
          ))}
        </div>
        <button onClick={() => setMenuOpen(!menuOpen)} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', display: 'none' }} className="mobile-menu-btn">{menuOpen ? <CloseIcon /> : <MenuIcon />}</button>
      </GlassElement>
      {menuOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 999, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '12px', padding: '20px', background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(10px)' }}>
          <GlassElement width={280} height={420} radius={28} depth={12} blur={3} strength={80} chromaticAberration={2} backgroundColor="rgba(20,20,40,0.85)" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
            <button onClick={() => setMenuOpen(false)} style={{ position: 'absolute', top: '16px', right: '16px', background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}><CloseIcon /></button>
            {navLinks.map(l => (
              <GlassElement key={l.href} autoSize radius={18} depth={6} blur={2} strength={50} backgroundColor="rgba(255,255,255,0.1)" style={{ fontSize: '1rem', minWidth: '180px', justifyContent: 'center' }} onClick={() => { setMenuOpen(false); document.querySelector(l.href)?.scrollIntoView({ behavior: 'smooth' }); }}>
                {l.label}
              </GlassElement>
            ))}
          </GlassElement>
        </div>
      )}
    </nav>
  );
};

// ============================================
// HERO - Con imagen de fondo real
// ============================================
const HeroSection = () => {
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const heroRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const h = (e: MouseEvent) => { if (heroRef.current) { const r = heroRef.current.getBoundingClientRect(); setMousePos({ x: (e.clientX - r.left) / r.width, y: (e.clientY - r.top) / r.height }); } };
    window.addEventListener('mousemove', h); return () => window.removeEventListener('mousemove', h);
  }, []);
  return (
    <section id="hero" ref={heroRef} style={{
      minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden', padding: '100px 20px 60px',
      background: `radial-gradient(circle at ${mousePos.x * 100}% ${mousePos.y * 100}%, rgba(80,60,180,0.4) 0%, transparent 60%), linear-gradient(135deg, #0a0a1a 0%, #1a103c 50%, #0f0c29 100%)`
    }}>
      <div style={{ position: 'absolute', inset: 0, opacity: 0.3, backgroundImage: 'url(https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=80)', backgroundSize: 'cover', backgroundPosition: 'center', mixBlendMode: 'overlay' }} />
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '12%', left: '8%', animation: 'float 7s ease-in-out infinite' }}><GlassElement width={100} height={100} radius={50} depth={8} blur={2} strength={60} chromaticAberration={2} backgroundColor="rgba(255,255,255,0.08)" /></div>
        <div style={{ position: 'absolute', top: '65%', left: '5%', animation: 'float 9s ease-in-out infinite 1.5s' }}><GlassElement width={70} height={70} radius={35} depth={6} blur={1} strength={40} backgroundColor="rgba(255,100,200,0.08)" /></div>
        <div style={{ position: 'absolute', top: '18%', right: '12%', animation: 'float 8s ease-in-out infinite 0.8s' }}><GlassElement width={90} height={90} radius={45} depth={7} blur={2} strength={50} chromaticAberration={1} backgroundColor="rgba(100,255,200,0.08)" /></div>
        <div style={{ position: 'absolute', bottom: '18%', right: '8%', animation: 'float 10s ease-in-out infinite 2.5s' }}><GlassElement width={120} height={80} radius={40} depth={9} blur={2} strength={70} backgroundColor="rgba(200,100,255,0.08)" /></div>
        <div style={{ position: 'absolute', top: '45%', left: '50%', transform: 'translateX(-50%)', animation: 'float 6s ease-in-out infinite 3s' }}><GlassElement width={60} height={60} radius={30} depth={5} blur={1} strength={35} backgroundColor="rgba(255,255,255,0.06)" /></div>
      </div>
      <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', maxWidth: '850px' }}>
        <GlassElement autoSize radius={28} depth={12} blur={3} strength={80} chromaticAberration={2} backgroundColor="rgba(255,255,255,0.08)" style={{ marginBottom: '28px' }}>
          <div style={{ padding: '28px 40px' }}>
            <h1 style={{ fontSize: 'clamp(2.2rem, 6vw, 4.5rem)', fontWeight: '800', margin: '0 0 12px', lineHeight: 1.1, background: 'linear-gradient(135deg, #fff 0%, #c7b8ff 50%, #a5b4fc 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Liquid Glass</h1>
            <p style={{ fontSize: 'clamp(1rem, 2vw, 1.2rem)', opacity: 0.75, margin: 0, lineHeight: 1.6 }}>Efecto de cristal líquido con filtros SVG. Totalmente responsive, interactivo y compatible con todos los dispositivos.</p>
          </div>
        </GlassElement>
        <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <GlassElement autoSize radius={22} depth={10} blur={2} strength={60} chromaticAberration={1} backgroundColor="rgba(99,102,241,0.4)" style={{ fontWeight: '600' }} onClick={() => document.querySelector('#matrix')?.scrollIntoView({ behavior: 'smooth' })}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '2px 6px' }}><GridIcon /> Ver Matrix</div>
          </GlassElement>
          <GlassElement autoSize radius={22} depth={8} blur={2} strength={50} backgroundColor="rgba(255,255,255,0.12)" style={{ fontWeight: '600' }} onClick={() => document.querySelector('#playground')?.scrollIntoView({ behavior: 'smooth' })}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '2px 6px' }}><SettingsIcon /> Playground</div>
          </GlassElement>
        </div>
      </div>
      <div style={{ position: 'absolute', bottom: '24px', left: '50%', transform: 'translateX(-50%)', animation: 'bounce 2s infinite' }}>
        <GlassElement width={36} height={36} radius={18} depth={4} blur={1} strength={30} backgroundColor="rgba(255,255,255,0.15)"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg></GlassElement>
      </div>
    </section>
  );
};

// ============================================
// MATRIX TEST - Grid de pruebas sistemáticas
// ============================================
const MatrixSection = () => {
  const depthValues = [4, 8, 16, 24];
  const strengthValues = [30, 60, 100, 150];
  const blurValues = [1, 2, 4, 8];
  const radiusValues = [0, 12, 24, 50];
  const chromaValues = [0, 2, 5, 10];
  const [activeMatrix, setActiveMatrix] = useState<'depth' | 'strength' | 'blur' | 'radius' | 'chroma'>('depth');

  const renderGrid = () => {
    let values: number[] = [];
    let label = '';
    let fixed = { depth: 10, strength: 80, blur: 2, radius: 20, chroma: 2, chromaticAberration: 2 };
    switch (activeMatrix) {
      case 'depth': values = depthValues; label = 'Depth'; break;
      case 'strength': values = strengthValues; label = 'Strength'; fixed.strength = 0; break;
      case 'blur': values = blurValues; label = 'Blur'; fixed.blur = 0; break;
      case 'radius': values = radiusValues; label = 'Radius'; fixed.radius = 0; break;
      case 'chroma': values = chromaValues; label = 'Chromatic'; fixed.chromaticAberration = 0; break;
    }
    return (
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
        {values.map((v, i) => (
          <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: '1px' }}>{label} = {v}</span>
            <div style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400&q=80)', backgroundSize: 'cover', borderRadius: '16px', padding: '20px', width: '100%', minHeight: '160px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <GlassElement
                autoSize
                radius={activeMatrix === 'radius' ? v : fixed.radius}
                depth={activeMatrix === 'depth' ? v : fixed.depth}
                blur={activeMatrix === 'blur' ? v : fixed.blur}
                strength={activeMatrix === 'strength' ? v : fixed.strength}
                chromaticAberration={activeMatrix === 'chroma' ? v : fixed.chromaticAberration}
                backgroundColor="rgba(255,255,255,0.15)"
              >
                <div style={{ padding: '16px 24px', fontWeight: '600', fontSize: '0.95rem' }}>Test {i + 1}</div>
              </GlassElement>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const tabs = [
    { key: 'depth' as const, label: 'Depth' }, { key: 'strength' as const, label: 'Strength' },
    { key: 'blur' as const, label: 'Blur' }, { key: 'radius' as const, label: 'Radius' }, { key: 'chroma' as const, label: 'Chroma' },
  ];

  return (
    <section id="matrix" style={{ padding: '80px 20px', background: 'linear-gradient(180deg, #0f0c29 0%, #1a0b2e 100%)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <GlassElement autoSize radius={18} depth={6} blur={2} strength={40} backgroundColor="rgba(255,255,255,0.08)" style={{ marginBottom: '12px' }}>
            <span style={{ padding: '6px 14px', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '2px', opacity: 0.8 }}>Test Matrix</span>
          </GlassElement>
          <h2 style={{ fontSize: 'clamp(1.6rem, 4vw, 2.8rem)', color: 'white', margin: '12px 0 8px' }}>Matriz de Parámetros</h2>
          <p style={{ color: 'rgba(255,255,255,0.5)', maxWidth: '600px', margin: '0 auto', lineHeight: 1.5 }}>Compara cómo cada parámetro afecta visualmente el efecto glass sobre una imagen real.</p>
        </div>
        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '40px', flexWrap: 'wrap' }}>
          {tabs.map(t => (
            <GlassElement key={t.key} autoSize radius={14} depth={activeMatrix === t.key ? 8 : 4} blur={activeMatrix === t.key ? 2 : 1} strength={activeMatrix === t.key ? 50 : 30} backgroundColor={activeMatrix === t.key ? 'rgba(99,102,241,0.3)' : 'rgba(255,255,255,0.06)'} onClick={() => setActiveMatrix(t.key)}>
              <span style={{ padding: '2px 6px', fontSize: '0.85rem', fontWeight: activeMatrix === t.key ? '600' : '400' }}>{t.label}</span>
            </GlassElement>
          ))}
        </div>
        {renderGrid()}
      </div>
    </section>
  );
};

// ============================================
// GALLERY - Glass sobre imágenes reales
// ============================================
const GallerySection = () => {
  const images = [
    { url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80', title: 'Alpine Lake', desc: 'Profundidad: 12 | Blur: 3' },
    { url: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=600&q=80', title: 'Misty Forest', desc: 'Profundidad: 16 | Blur: 2' },
    { url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&q=80', title: 'Sunlight Woods', desc: 'Profundidad: 8 | Blur: 4' },
    { url: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=600&q=80', title: 'Green Valley', desc: 'Profundidad: 20 | Blur: 1' },
    { url: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=600&q=80', title: 'Aerial Coast', desc: 'Profundidad: 10 | Blur: 3' },
    { url: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600&q=80', title: 'Mountain Peak', desc: 'Profundidad: 14 | Blur: 2' },
  ];
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section id="gallery" style={{ padding: '80px 20px', background: 'linear-gradient(180deg, #1a0b2e 0%, #16213e 100%)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <GlassElement autoSize radius={18} depth={6} blur={2} strength={40} backgroundColor="rgba(255,255,255,0.08)" style={{ marginBottom: '12px' }}>
            <span style={{ padding: '6px 14px', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '2px', opacity: 0.8 }}><ImageIcon /> Gallery</span>
          </GlassElement>
          <h2 style={{ fontSize: 'clamp(1.6rem, 4vw, 2.8rem)', color: 'white', margin: '12px 0 8px' }}>Glass sobre Imágenes Reales</h2>
          <p style={{ color: 'rgba(255,255,255,0.5)', maxWidth: '600px', margin: '0 auto', lineHeight: 1.5 }}>El efecto se distorsiona según el contenido detrás. Pasa el mouse para ver la diferencia.</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
          {images.map((img, i) => (
            <div key={i} style={{ position: 'relative', borderRadius: '20px', overflow: 'hidden', aspectRatio: '4/3', backgroundImage: `url(${img.url})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
              onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(null)}>
              <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'flex-end', padding: '20px' }}>
                <GlassElement autoSize radius={16} depth={hovered === i ? 16 : 8} blur={hovered === i ? 3 : 2} strength={hovered === i ? 100 : 60} chromaticAberration={hovered === i ? 4 : 1} backgroundColor="rgba(0,0,0,0.45)" style={{ width: '100%' }}>
                  <div style={{ padding: '16px 20px', textAlign: 'left', width: '100%' }}>
                    <h3 style={{ margin: '0 0 4px', fontSize: '1.1rem', color: 'white' }}>{img.title}</h3>
                    <p style={{ margin: 0, fontSize: '0.8rem', color: 'rgba(255,255,255,0.6)' }}>{img.desc}</p>
                  </div>
                </GlassElement>
              </div>
              {hovered === i && (
                <div style={{ position: 'absolute', top: '16px', right: '16px' }}>
                  <GlassElement width={40} height={40} radius={20} depth={6} blur={1} strength={40} backgroundColor="rgba(255,255,255,0.2)"><MaximizeIcon /></GlassElement>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ============================================
// COMPARISON - Con vs Sin Glass
// ============================================
const CompareSection = () => {
  const [showGlass, setShowGlass] = useState(true);
  return (
    <section id="compare" style={{ padding: '80px 20px', background: 'linear-gradient(180deg, #16213e 0%, #0f0c29 100%)' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <h2 style={{ fontSize: 'clamp(1.6rem, 4vw, 2.8rem)', color: 'white', margin: '12px 0 8px' }}>Comparativa: Con vs Sin Glass</h2>
          <p style={{ color: 'rgba(255,255,255,0.5)', maxWidth: '600px', margin: '0 auto', lineHeight: 1.5 }}>Activa/desactiva el efecto para ver la diferencia sobre el mismo fondo.</p>
        </div>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginBottom: '30px' }}>
          <GlassElement autoSize radius={14} depth={showGlass ? 8 : 4} blur={2} strength={50} backgroundColor={showGlass ? 'rgba(99,102,241,0.4)' : 'rgba(255,255,255,0.1)'} onClick={() => setShowGlass(true)}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '2px 6px' }}><LayersIcon /> Con Glass</span>
          </GlassElement>
          <GlassElement autoSize radius={14} depth={!showGlass ? 8 : 4} blur={2} strength={50} backgroundColor={!showGlass ? 'rgba(99,102,241,0.4)' : 'rgba(255,255,255,0.1)'} onClick={() => setShowGlass(false)}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '2px 6px' }}><MinimizeIcon /> Sin Glass</span>
          </GlassElement>
        </div>
        <div style={{ position: 'relative', borderRadius: '24px', overflow: 'hidden', minHeight: '400px', backgroundImage: 'url(https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80)', backgroundSize: 'cover', backgroundPosition: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {showGlass ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center', width: '100%', maxWidth: '600px', padding: '20px' }}>
              <GlassElement autoSize radius={24} depth={14} blur={3} strength={100} chromaticAberration={3} backgroundColor="rgba(255,255,255,0.12)">
                <div style={{ padding: '24px 36px', textAlign: 'center' }}>
                  <h3 style={{ margin: '0 0 8px', fontSize: '1.4rem' }}>✨ Efecto Liquid Glass</h3>
                  <p style={{ margin: 0, opacity: 0.8, fontSize: '0.95rem' }}>Distorsión SVG + aberración cromática + profundidad dinámica</p>
                </div>
              </GlassElement>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
                <GlassElement autoSize radius={16} depth={8} blur={2} strength={60} backgroundColor="rgba(99,102,241,0.35)"><span style={{ padding: '0 4px' }}>Botón 1</span></GlassElement>
                <GlassElement autoSize radius={16} depth={8} blur={2} strength={60} backgroundColor="rgba(236,72,153,0.35)"><span style={{ padding: '0 4px' }}>Botón 2</span></GlassElement>
                <GlassElement autoSize radius={16} depth={8} blur={2} strength={60} backgroundColor="rgba(16,185,129,0.35)"><span style={{ padding: '0 4px' }}>Botón 3</span></GlassElement>
              </div>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center', width: '100%', maxWidth: '600px', padding: '20px' }}>
              <div style={{ background: 'rgba(255,255,255,0.85)', borderRadius: '24px', padding: '24px 36px', textAlign: 'center', color: '#333', backdropFilter: 'none' }}>
                <h3 style={{ margin: '0 0 8px', fontSize: '1.4rem' }}>❌ Sin Efecto</h3>
                <p style={{ margin: 0, fontSize: '0.95rem' }}>Fondo sólido sin distorsión ni transparencia real</p>
              </div>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
                <div style={{ background: 'rgba(99,102,241,0.85)', borderRadius: '16px', padding: '10px 20px', color: 'white' }}>Botón 1</div>
                <div style={{ background: 'rgba(236,72,153,0.85)', borderRadius: '16px', padding: '10px 20px', color: 'white' }}>Botón 2</div>
                <div style={{ background: 'rgba(16,185,129,0.85)', borderRadius: '16px', padding: '10px 20px', color: 'white' }}>Botón 3</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

// ============================================
// PLAYGROUND - Interactivo con sliders
// ============================================
const PlaygroundSection = () => {
  const [depth, setDepth] = useState(12);
  const [blur, setBlur] = useState(2);
  const [strength, setStrength] = useState(80);
  const [chroma, setChroma] = useState(2);
  const [radius, setRadius] = useState(24);
  const [bgOpacity, setBgOpacity] = useState(0.15);
  const [autoSize, setAutoSize] = useState(true);

  const bgColor = `rgba(255,255,255,${bgOpacity})`;

  return (
    <section id="playground" style={{ padding: '80px 20px', background: 'linear-gradient(180deg, #0f0c29 0%, #1a0b2e 100%)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <GlassElement autoSize radius={18} depth={6} blur={2} strength={40} backgroundColor="rgba(255,255,255,0.08)" style={{ marginBottom: '12px' }}>
            <span style={{ padding: '6px 14px', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '2px', opacity: 0.8 }}><SettingsIcon /> Playground</span>
          </GlassElement>
          <h2 style={{ fontSize: 'clamp(1.6rem, 4vw, 2.8rem)', color: 'white', margin: '12px 0 8px' }}>Laboratorio Interactivo</h2>
          <p style={{ color: 'rgba(255,255,255,0.5)', maxWidth: '600px', margin: '0 auto', lineHeight: 1.5 }}>Ajusta los parámetros en tiempo real y observa cómo cambia el efecto.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px', alignItems: 'start' }}>
          {/* Preview */}
          <div style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&q=80)', backgroundSize: 'cover', borderRadius: '24px', minHeight: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '30px' }}>
            {autoSize ? (
              <GlassElement autoSize radius={radius} depth={depth} blur={blur} strength={strength} chromaticAberration={chroma} backgroundColor={bgColor}>
                <div style={{ padding: '24px 32px', textAlign: 'center' }}>
                  <h3 style={{ margin: '0 0 8px', fontSize: '1.2rem' }}>Preview</h3>
                  <p style={{ margin: 0, fontSize: '0.85rem', opacity: 0.8 }}>Auto-size activado</p>
                </div>
              </GlassElement>
            ) : (
              <GlassElement width={250} height={150} radius={radius} depth={depth} blur={blur} strength={strength} chromaticAberration={chroma} backgroundColor={bgColor}>
                <div style={{ textAlign: 'center' }}>
                  <h3 style={{ margin: '0 0 8px', fontSize: '1.2rem' }}>Preview</h3>
                  <p style={{ margin: 0, fontSize: '0.85rem', opacity: 0.8 }}>Fixed size</p>
                </div>
              </GlassElement>
            )}
          </div>

          {/* Controls */}
          <GlassElement autoSize radius={20} depth={10} blur={2} strength={60} backgroundColor="rgba(255,255,255,0.06)" style={{ width: '100%' }}>
            <div style={{ padding: '28px', display: 'flex', flexDirection: 'column', gap: '20px', width: '100%' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ margin: 0, color: 'white', fontSize: '1.1rem' }}>Parámetros</h3>
                <GlassElement width={44} height={24} radius={12} depth={autoSize ? 6 : 3} blur={1} strength={30} backgroundColor={autoSize ? 'rgba(99,102,241,0.4)' : 'rgba(255,255,255,0.1)'} onClick={() => setAutoSize(!autoSize)} style={{ position: 'relative' }}>
                  <div style={{ width: '18px', height: '18px', borderRadius: '9px', background: 'white', position: 'absolute', left: autoSize ? '22px' : '4px', transition: 'left 0.3s ease', boxShadow: '0 2px 6px rgba(0,0,0,0.3)' }} />
                </GlassElement>
              </div>

              {[
                { label: 'Depth', value: depth, min: 0, max: 40, step: 1, set: setDepth },
                { label: 'Blur', value: blur, min: 0, max: 10, step: 0.5, set: setBlur },
                { label: 'Strength', value: strength, min: 0, max: 200, step: 5, set: setStrength },
                { label: 'Chromatic', value: chroma, min: 0, max: 20, step: 1, set: setChroma },
                { label: 'Radius', value: radius, min: 0, max: 60, step: 2, set: setRadius },
                { label: 'Opacity', value: bgOpacity, min: 0, max: 0.8, step: 0.05, set: setBgOpacity },
              ].map(ctrl => (
                <div key={ctrl.label}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <span style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)' }}>{ctrl.label}</span>
                    <span style={{ fontSize: '0.85rem', color: '#a5b4fc', fontWeight: '600' }}>{ctrl.value}</span>
                  </div>
                  <input type="range" min={ctrl.min} max={ctrl.max} step={ctrl.step} value={ctrl.value} onChange={e => ctrl.set(Number(e.target.value))} style={{ width: '100%', accentColor: '#6366f1' }} />
                </div>
              ))}
            </div>
          </GlassElement>
        </div>
      </div>
    </section>
  );
};

// ============================================
// UI KIT - Componentes de interfaz
// ============================================
const UIKitSection = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const [switchOn, setSwitchOn] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => { const iv = setInterval(() => setProgress(p => (p >= 100 ? 0 : p + 2)), 100); return () => clearInterval(iv); }, []);
  const showToast = () => { setToastVisible(true); setTimeout(() => setToastVisible(false), 3000); };

  const tabs = ['Botones', 'Inputs', 'Cards', 'Estados', 'Avatares'];

  return (
    <section id="uikit" style={{ padding: '80px 20px', background: 'linear-gradient(180deg, #1a0b2e 0%, #0f0c29 100%)', position: 'relative' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <h2 style={{ fontSize: 'clamp(1.6rem, 4vw, 2.8rem)', color: 'white', margin: '12px 0 8px' }}>UI Kit Glass</h2>
          <p style={{ color: 'rgba(255,255,255,0.5)', maxWidth: '600px', margin: '0 auto', lineHeight: 1.5 }}>Todos los componentes de interfaz con efecto Liquid Glass aplicado.</p>
        </div>

        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '40px', flexWrap: 'wrap' }}>
          {tabs.map((t, i) => (
            <GlassElement key={i} autoSize radius={14} depth={activeTab === i ? 8 : 4} blur={activeTab === i ? 2 : 1} strength={activeTab === i ? 50 : 30} backgroundColor={activeTab === i ? 'rgba(99,102,241,0.3)' : 'rgba(255,255,255,0.06)'} onClick={() => setActiveTab(i)}>
              <span style={{ padding: '2px 6px', fontSize: '0.85rem', fontWeight: activeTab === i ? '600' : '400' }}>{t}</span>
            </GlassElement>
          ))}
        </div>

        {/* BOTONES */}
        {activeTab === 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', alignItems: 'center' }}>
            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', justifyContent: 'center' }}>
              <GlassElement autoSize radius={20} depth={8} blur={2} strength={50} backgroundColor="rgba(99,102,241,0.4)" onClick={showToast}><span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><ZapIcon /> Primario</span></GlassElement>
              <GlassElement autoSize radius={20} depth={8} blur={2} strength={50} backgroundColor="rgba(236,72,153,0.4)" onClick={showToast}><span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><HeartIcon /> Secundario</span></GlassElement>
              <GlassElement autoSize radius={20} depth={8} blur={2} strength={50} backgroundColor="rgba(16,185,129,0.4)" onClick={showToast}><span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><CheckIcon /> Éxito</span></GlassElement>
              <GlassElement autoSize radius={20} depth={8} blur={2} strength={50} backgroundColor="rgba(245,158,11,0.4)" onClick={showToast}><span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><StarIcon /> Destacado</span></GlassElement>
              <GlassElement autoSize radius={20} depth={8} blur={2} strength={50} backgroundColor="rgba(239,68,68,0.4)" onClick={showToast}><span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><BellIcon /> Alerta</span></GlassElement>
            </div>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center' }}>
              {[20, 28, 36, 44, 52].map(s => (
                <GlassElement key={s} width={s} height={s} radius={s / 2} depth={5} blur={1} strength={35} backgroundColor="rgba(255,255,255,0.12)" onClick={showToast}>
                  <span style={{ fontSize: `${s * 0.35}px` }}>{s < 30 ? '🔹' : '🔷'}</span>
                </GlassElement>
              ))}
            </div>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center' }}>
              <GlassElement autoSize radius={10} depth={4} blur={1} strength={25} backgroundColor="rgba(255,255,255,0.06)" style={{ fontSize: '0.75rem' }}><span style={{ padding: '0 2px' }}>Small</span></GlassElement>
              <GlassElement autoSize radius={14} depth={6} blur={1} strength={35} backgroundColor="rgba(255,255,255,0.08)" style={{ fontSize: '0.85rem' }}><span style={{ padding: '0 2px' }}>Medium</span></GlassElement>
              <GlassElement autoSize radius={18} depth={8} blur={2} strength={45} backgroundColor="rgba(255,255,255,0.1)" style={{ fontSize: '1rem' }}><span style={{ padding: '0 2px' }}>Large</span></GlassElement>
              <GlassElement autoSize radius={24} depth={10} blur={2} strength={55} backgroundColor="rgba(255,255,255,0.12)" style={{ fontSize: '1.15rem' }}><span style={{ padding: '0 2px' }}>X-Large</span></GlassElement>
            </div>
          </div>
        )}

        {/* INPUTS */}
        {activeTab === 1 && (
          <div style={{ maxWidth: '500px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <GlassElement autoSize radius={14} depth={6} blur={2} strength={40} backgroundColor="rgba(255,255,255,0.08)" style={{ width: '100%' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 16px', width: '100%' }}>
                <SearchIcon />
                <input type="text" placeholder="Buscar..." style={{ background: 'transparent', border: 'none', outline: 'none', color: 'white', width: '100%', fontSize: '0.95rem' }} />
              </div>
            </GlassElement>
            <GlassElement autoSize radius={14} depth={6} blur={2} strength={40} backgroundColor="rgba(255,255,255,0.08)" style={{ width: '100%' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 16px', width: '100%' }}>
                <UserIcon />
                <input type="text" placeholder="Nombre de usuario" style={{ background: 'transparent', border: 'none', outline: 'none', color: 'white', width: '100%', fontSize: '0.95rem' }} />
              </div>
            </GlassElement>
            <GlassElement autoSize radius={14} depth={6} blur={2} strength={40} backgroundColor="rgba(255,255,255,0.08)" style={{ width: '100%' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 16px', width: '100%' }}>
                <BellIcon />
                <input type="email" placeholder="correo@ejemplo.com" style={{ background: 'transparent', border: 'none', outline: 'none', color: 'white', width: '100%', fontSize: '0.95rem' }} />
              </div>
            </GlassElement>
            <GlassElement autoSize radius={14} depth={6} blur={2} strength={40} backgroundColor="rgba(255,255,255,0.08)" style={{ width: '100%', minHeight: '120px' }}>
              <textarea placeholder="Escribe un mensaje..." style={{ background: 'transparent', border: 'none', outline: 'none', color: 'white', width: '100%', fontSize: '0.95rem', resize: 'none', minHeight: '100px', fontFamily: 'inherit', padding: '12px 16px' }} />
            </GlassElement>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem' }}>Modo oscuro</span>
              <GlassElement width={48} height={26} radius={13} depth={darkMode ? 6 : 3} blur={1} strength={30} backgroundColor={darkMode ? 'rgba(99,102,241,0.4)' : 'rgba(255,255,255,0.1)'} onClick={() => setDarkMode(!darkMode)} style={{ position: 'relative' }}>
                <div style={{ width: '20px', height: '20px', borderRadius: '10px', background: 'white', position: 'absolute', left: darkMode ? '24px' : '4px', transition: 'left 0.3s ease', boxShadow: '0 2px 6px rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {darkMode ? <MoonIcon /> : <SunIcon />}
                </div>
              </GlassElement>
            </div>
          </div>
        )}

        {/* CARDS */}
        {activeTab === 2 && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
            {[
              { img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80', title: 'Montaña', desc: 'Glass card con imagen de fondo completa' },
              { img: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400&q=80', title: 'Bosque', desc: 'Efecto de distorsión sobre naturaleza' },
              { img: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&q=80', title: 'Arboleda', desc: 'Transparencia con contenido detrás' },
            ].map((c, i) => (
              <div key={i} style={{ borderRadius: '20px', overflow: 'hidden', backgroundImage: `url(${c.img})`, backgroundSize: 'cover', backgroundPosition: 'center', minHeight: '280px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
                <GlassElement autoSize radius={0} depth={10} blur={3} strength={70} chromaticAberration={2} backgroundColor="rgba(0,0,0,0.4)" style={{ width: '100%' }}>
                  <div style={{ padding: '20px', textAlign: 'left' }}>
                    <h3 style={{ margin: '0 0 6px', fontSize: '1.1rem' }}>{c.title}</h3>
                    <p style={{ margin: 0, fontSize: '0.8rem', opacity: 0.7 }}>{c.desc}</p>
                  </div>
                </GlassElement>
              </div>
            ))}
          </div>
        )}

        {/* ESTADOS */}
        {activeTab === 3 && (
          <div style={{ maxWidth: '600px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '28px' }}>
            <div>
              <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '10px', fontSize: '0.85rem' }}>Progreso: {progress}%</p>
              <GlassElement autoSize radius={10} depth={4} blur={1} strength={25} backgroundColor="rgba(255,255,255,0.08)" style={{ width: '100%' }}>
                <div style={{ width: '100%', padding: '4px' }}>
                  <div style={{ height: '8px', borderRadius: '4px', background: 'linear-gradient(90deg, #6366f1, #ec4899)', width: `${progress}%`, transition: 'width 0.1s linear' }} />
                </div>
              </GlassElement>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem' }}>Notificaciones</span>
              <GlassElement width={52} height={28} radius={14} depth={switchOn ? 6 : 3} blur={1} strength={30} backgroundColor={switchOn ? 'rgba(99,102,241,0.4)' : 'rgba(255,255,255,0.1)'} onClick={() => setSwitchOn(!switchOn)} style={{ position: 'relative' }}>
                <div style={{ width: '22px', height: '22px', borderRadius: '11px', background: 'white', position: 'absolute', left: switchOn ? '26px' : '4px', transition: 'left 0.3s ease', boxShadow: '0 2px 6px rgba(0,0,0,0.3)' }} />
              </GlassElement>
              <span style={{ color: switchOn ? '#a5b4fc' : 'rgba(255,255,255,0.4)', fontSize: '0.8rem', fontWeight: 600 }}>{switchOn ? 'ON' : 'OFF'}</span>
            </div>
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
              <GlassElement autoSize radius={12} depth={4} blur={1} strength={20} backgroundColor="rgba(255,255,255,0.06)"><span style={{ fontSize: '0.75rem', padding: '0 2px' }}>Idle</span></GlassElement>
              <GlassElement autoSize radius={12} depth={6} blur={1} strength={30} backgroundColor="rgba(99,102,241,0.2)"><span style={{ fontSize: '0.75rem', padding: '0 2px' }}>Hover</span></GlassElement>
              <GlassElement autoSize radius={12} depth={8} blur={2} strength={45} backgroundColor="rgba(99,102,241,0.35)"><span style={{ fontSize: '0.75rem', padding: '0 2px' }}>Active</span></GlassElement>
              <GlassElement autoSize radius={12} depth={10} blur={2} strength={55} backgroundColor="rgba(99,102,241,0.5)"><span style={{ fontSize: '0.75rem', padding: '0 2px' }}>Focus</span></GlassElement>
              <GlassElement autoSize radius={12} depth={6} blur={1} strength={25} backgroundColor="rgba(239,68,68,0.3)"><span style={{ fontSize: '0.75rem', padding: '0 2px' }}>Error</span></GlassElement>
            </div>
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
              <GlassElement autoSize radius={10} depth={4} blur={1} strength={20} backgroundColor="rgba(16,185,129,0.3)"><span style={{ fontSize: '0.75rem', padding: '0 2px', display: 'flex', alignItems: 'center', gap: '4px' }}><CheckIcon /> Success</span></GlassElement>
              <GlassElement autoSize radius={10} depth={4} blur={1} strength={20} backgroundColor="rgba(245,158,11,0.3)"><span style={{ fontSize: '0.75rem', padding: '0 2px', display: 'flex', alignItems: 'center', gap: '4px' }}><BellIcon /> Warning</span></GlassElement>
              <GlassElement autoSize radius={10} depth={4} blur={1} strength={20} backgroundColor="rgba(59,130,246,0.3)"><span style={{ fontSize: '0.75rem', padding: '0 2px', display: 'flex', alignItems: 'center', gap: '4px' }}><SettingsIcon /> Info</span></GlassElement>
            </div>
          </div>
        )}

        {/* AVATARES */}
        {activeTab === 4 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', alignItems: 'center' }}>
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}>
              {[32, 40, 48, 56, 64].map(s => (
                <div key={s} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                  <GlassElement width={s} height={s} radius={s / 2} depth={6} blur={1} strength={35} backgroundColor="rgba(255,255,255,0.12)" onClick={showToast}>
                    <span style={{ fontSize: `${s * 0.4}px` }}>👤</span>
                  </GlassElement>
                  <span style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)' }}>{s}px</span>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center' }}>
              {['rgba(99,102,241,0.4)', 'rgba(236,72,153,0.4)', 'rgba(16,185,129,0.4)', 'rgba(245,158,11,0.4)', 'rgba(239,68,68,0.4)', 'rgba(6,182,212,0.4)'].map((c, i) => (
                <GlassElement key={i} width={48} height={48} radius={24} depth={6} blur={1} strength={35} backgroundColor={c} onClick={showToast}>
                  <span style={{ fontSize: '1.2rem' }}>{['👨', '👩', '👴', '👶', '🧑', '👧'][i]}</span>
                </GlassElement>
              ))}
            </div>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center' }}>
              <GlassElement autoSize radius={20} depth={6} blur={1} strength={30} backgroundColor="rgba(99,102,241,0.3)"><span style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '0 4px' }}><span style={{ fontSize: '1rem' }}>👨</span> Miguel</span></GlassElement>
              <GlassElement autoSize radius={20} depth={6} blur={1} strength={30} backgroundColor="rgba(236,72,153,0.3)"><span style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '0 4px' }}><span style={{ fontSize: '1rem' }}>👩</span> Ana</span></GlassElement>
              <GlassElement autoSize radius={20} depth={6} blur={1} strength={30} backgroundColor="rgba(16,185,129,0.3)"><span style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '0 4px' }}><span style={{ fontSize: '1rem' }}>👴</span> Carlos</span></GlassElement>
              <GlassElement autoSize radius={20} depth={6} blur={1} strength={30} backgroundColor="rgba(245,158,11,0.3)"><span style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '0 4px' }}><span style={{ fontSize: '1rem' }}>👶</span> Bebé</span></GlassElement>
            </div>
          </div>
        )}
      </div>

      {/* Modal */}
      {modalOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)' }} onClick={() => setModalOpen(false)}>
          <div onClick={e => e.stopPropagation()}>
            <GlassElement width={Math.min(480, typeof window !== 'undefined' ? window.innerWidth - 40 : 480)} height={380} radius={28} depth={14} blur={3} strength={90} chromaticAberration={3} backgroundColor="rgba(15,15,35,0.9)" style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ padding: '28px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                  <h3 style={{ color: 'white', margin: 0, fontSize: '1.3rem' }}>Modal Liquid Glass</h3>
                  <button onClick={() => setModalOpen(false)} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}><CloseIcon /></button>
                </div>
                <p style={{ color: 'rgba(255,255,255,0.7)', lineHeight: 1.6, margin: 0 }}>Este modal usa profundidad 14, blur 3, strength 90 y aberración cromática 3. El fondo usa backdrop-filter blur(8px).</p>
                <div style={{ marginTop: 'auto', display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                  <GlassElement autoSize radius={14} depth={6} blur={1} strength={35} backgroundColor="rgba(255,255,255,0.1)" onClick={() => setModalOpen(false)}><span style={{ fontSize: '0.85rem' }}>Cancelar</span></GlassElement>
                  <GlassElement autoSize radius={14} depth={8} blur={2} strength={45} backgroundColor="rgba(99,102,241,0.4)" onClick={() => { setModalOpen(false); showToast(); }}><span style={{ fontSize: '0.85rem', fontWeight: '600' }}>Confirmar</span></GlassElement>
                </div>
              </div>
            </GlassElement>
          </div>
        </div>
      )}

      {/* Toast */}
      {toastVisible && (
        <div style={{ position: 'fixed', bottom: '24px', left: '50%', transform: 'translateX(-50%)', zIndex: 3000, animation: 'slideUp 0.3s ease' }}>
          <GlassElement autoSize radius={14} depth={8} blur={2} strength={55} backgroundColor="rgba(16,185,129,0.25)">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '4px 8px' }}><CheckIcon /><span style={{ fontSize: '0.9rem' }}>¡Acción completada!</span></div>
          </GlassElement>
        </div>
      )}
    </section>
  );
};

// ============================================
// COLOR VARIANTS
// ============================================
const ColorVariantsSection = () => {
  const variants = [
    { name: 'Frost', bg: 'rgba(255,255,255,0.15)', text: '#fff' },
    { name: 'Ocean', bg: 'rgba(59,130,246,0.25)', text: '#fff' },
    { name: 'Rose', bg: 'rgba(236,72,153,0.25)', text: '#fff' },
    { name: 'Emerald', bg: 'rgba(16,185,129,0.25)', text: '#fff' },
    { name: 'Amber', bg: 'rgba(245,158,11,0.25)', text: '#fff' },
    { name: 'Midnight', bg: 'rgba(15,23,42,0.6)', text: '#fff' },
    { name: 'Lavender', bg: 'rgba(139,92,246,0.25)', text: '#fff' },
    { name: 'Coral', bg: 'rgba(239,68,68,0.25)', text: '#fff' },
  ];
  return (
    <section style={{ padding: '80px 20px', background: 'linear-gradient(180deg, #0f0c29 0%, #1a0b2e 100%)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <h2 style={{ fontSize: 'clamp(1.6rem, 4vw, 2.8rem)', color: 'white', margin: '12px 0 8px' }}>Variantes de Color</h2>
          <p style={{ color: 'rgba(255,255,255,0.5)', maxWidth: '600px', margin: '0 auto', lineHeight: 1.5 }}>El mismo efecto glass con diferentes colores de fondo.</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
          {variants.map((v, i) => (
            <div key={i} style={{ position: 'relative', borderRadius: '20px', overflow: 'hidden', minHeight: '180px', backgroundImage: `url(https://images.unsplash.com/photo-${['1506905925346-21bda4d32df4', '1470071459604-3b5ec3a7fe05', '1441974231531-c6227db76b6e', '1472214103451-9374bd1c798e', '1501854140801-50d01698950b', '1469474968028-56623f02e42e', '1501785888041-af3ef285b470', '1433086966353-c5496af8dfe4'][i]}?w=400&q=80)`, backgroundSize: 'cover', backgroundPosition: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <GlassElement autoSize radius={16} depth={10} blur={2} strength={60} chromaticAberration={1} backgroundColor={v.bg}>
                <div style={{ padding: '20px 28px', textAlign: 'center' }}>
                  <h3 style={{ margin: '0 0 4px', fontSize: '1.1rem', color: v.text }}>{v.name}</h3>
                  <p style={{ margin: 0, fontSize: '0.75rem', opacity: 0.7, color: v.text }}>{v.bg}</p>
                </div>
              </GlassElement>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ============================================
// SIZE & SHAPE VARIANTS
// ============================================
const ShapeVariantsSection = () => {
  const shapes = [
    { radius: 0, label: 'Square', w: 120, h: 120 },
    { radius: 8, label: 'Small R', w: 120, h: 120 },
    { radius: 24, label: 'Medium R', w: 120, h: 120 },
    { radius: 60, label: 'Circle', w: 120, h: 120 },
    { radius: 16, label: 'Wide', w: 200, h: 80 },
    { radius: 16, label: 'Tall', w: 80, h: 200 },
    { radius: 40, label: 'Pill H', w: 200, h: 60 },
    { radius: 30, label: 'Pill V', w: 60, h: 200 },
  ];
  return (
    <section style={{ padding: '80px 20px', background: 'linear-gradient(180deg, #1a0b2e 0%, #0f0c29 100%)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <h2 style={{ fontSize: 'clamp(1.6rem, 4vw, 2.8rem)', color: 'white', margin: '12px 0 8px' }}>Formas y Tamaños</h2>
          <p style={{ color: 'rgba(255,255,255,0.5)', maxWidth: '600px', margin: '0 auto', lineHeight: 1.5 }}>El efecto se adapta a cualquier forma y proporción.</p>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px', justifyContent: 'center', alignItems: 'center' }}>
          {shapes.map((s, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
              <div style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&q=80)', backgroundSize: 'cover', borderRadius: `${s.radius + 4}px`, padding: '8px' }}>
                <GlassElement width={s.w} height={s.h} radius={s.radius} depth={10} blur={2} strength={60} chromaticAberration={1} backgroundColor="rgba(255,255,255,0.12)">
                  <span style={{ fontSize: '0.75rem', opacity: 0.8 }}>{s.label}</span>
                </GlassElement>
              </div>
              <span style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)' }}>{s.w}×{s.h} r{s.radius}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ============================================
// CHROMATIC ABERRATION SHOWCASE
// ============================================
const ChromaSection = () => {
  const chromaValues = [0, 2, 5, 10, 15, 20];
  return (
    <section style={{ padding: '80px 20px', background: 'linear-gradient(180deg, #0f0c29 0%, #1a0b2e 100%)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <h2 style={{ fontSize: 'clamp(1.6rem, 4vw, 2.8rem)', color: 'white', margin: '12px 0 8px' }}>Aberración Cromática</h2>
          <p style={{ color: 'rgba(255,255,255,0.5)', maxWidth: '600px', margin: '0 auto', lineHeight: 1.5 }}>Efecto experimental que separa los canales RGB. Solo funciona en Chromium.</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '20px' }}>
          {chromaValues.map((c, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.6)', fontWeight: '600' }}>Chroma = {c}</span>
              <div style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=300&q=80)', backgroundSize: 'cover', borderRadius: '16px', padding: '16px', width: '100%', aspectRatio: '1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <GlassElement width={100} height={100} radius={50} depth={12} blur={2} strength={100} chromaticAberration={c} backgroundColor="rgba(255,255,255,0.1)">
                  <span style={{ fontSize: '0.75rem' }}>{c === 0 ? 'None' : `${c}px`}</span>
                </GlassElement>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ============================================
// PERFORMANCE / STRESS TEST
// ============================================
const StressTestSection = () => {
  const [count, setCount] = useState(20);
  const items = Array.from({ length: count }, (_, i) => i);
  return (
    <section style={{ padding: '80px 20px', background: 'linear-gradient(180deg, #1a0b2e 0%, #0f0c29 100%)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <h2 style={{ fontSize: 'clamp(1.6rem, 4vw, 2.8rem)', color: 'white', margin: '12px 0 8px' }}>Stress Test</h2>
          <p style={{ color: 'rgba(255,255,255,0.5)', maxWidth: '600px', margin: '0 auto', lineHeight: 1.5 }}>Múltiples elementos glass simultáneos. Ajusta la cantidad.</p>
        </div>
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginBottom: '30px', alignItems: 'center' }}>
          <GlassElement autoSize radius={12} depth={4} blur={1} strength={25} backgroundColor="rgba(239,68,68,0.3)" onClick={() => setCount(Math.max(5, count - 10))}><span style={{ padding: '0 4px' }}>-10</span></GlassElement>
          <span style={{ color: 'white', fontWeight: '600', minWidth: '60px', textAlign: 'center' }}>{count}</span>
          <GlassElement autoSize radius={12} depth={4} blur={1} strength={25} backgroundColor="rgba(16,185,129,0.3)" onClick={() => setCount(Math.min(100, count + 10))}><span style={{ padding: '0 4px' }}>+10</span></GlassElement>
          <GlassElement autoSize radius={12} depth={4} blur={1} strength={25} backgroundColor="rgba(99,102,241,0.3)" onClick={() => setCount(50)}><span style={{ padding: '0 4px' }}>Reset</span></GlassElement>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center' }}>
          {items.map(i => (
            <GlassElement key={i} width={50 + (i % 3) * 20} height={40} radius={12} depth={6} blur={1} strength={40} chromaticAberration={i % 5 === 0 ? 2 : 0} backgroundColor={`rgba(${100 + (i * 20) % 155}, ${50 + (i * 30) % 200}, ${200 + (i * 10) % 55}, 0.2)`}>
              <span style={{ fontSize: '0.7rem' }}>{i + 1}</span>
            </GlassElement>
          ))}
        </div>
      </div>
    </section>
  );
};

// ============================================
// FOOTER
// ============================================
const Footer = () => (
  <footer style={{ padding: '40px 20px', textAlign: 'center', background: '#000' }}>
    <GlassElement autoSize radius={14} depth={4} blur={1} strength={20} backgroundColor="rgba(255,255,255,0.04)">
      <span style={{ padding: '6px 14px', fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)' }}>Liquid Glass Demo © 2026 — Portado a React/TSX con SSR-safe detection</span>
    </GlassElement>
  </footer>
);

// ============================================
// PÁGINA PRINCIPAL
// ============================================
export default function LiquidGlassDemo() {
  const [svgSupport, setSvgSupport] = useState<boolean | null>(null);
  useEffect(() => { setSvgSupport(detectSVGFilterSupport()); }, []);

  return (
    <main style={{ minHeight: '100vh', background: '#0a0a1a', color: 'white', fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, sans-serif' }}>
      <style>{`
        @keyframes float { 0%,100%{transform:translateY(0) rotate(0)} 50%{transform:translateY(-18px) rotate(2deg)} }
        @keyframes bounce { 0%,100%{transform:translateX(-50%) translateY(0)} 50%{transform:translateX(-50%) translateY(-10px)} }
        @keyframes slideUp { from{transform:translateX(-50%) translateY(80px); opacity:0} to{transform:translateX(-50%) translateY(0); opacity:1} }
        *{box-sizing:border-box}
        body{margin:0;padding:0}
        @media(max-width:768px){.desktop-nav{display:none!important}.mobile-menu-btn{display:block!important}}
        @media(min-width:769px){.desktop-nav{display:flex!important}.mobile-menu-btn{display:none!important}}
        input::placeholder,textarea::placeholder{color:rgba(255,255,255,0.35)}
      `}</style>

      {svgSupport === false && (
        <div style={{ position: 'fixed', bottom: '16px', right: '16px', zIndex: 5000, maxWidth: '280px' }}>
          <GlassElement autoSize radius={10} depth={5} blur={1} strength={30} backgroundColor="rgba(245,158,11,0.25)">
            <div style={{ padding: '10px 14px', fontSize: '0.8rem' }}>⚠️ Fallback activo. Tu navegador no soporta filtros SVG en backdrop-filter.</div>
          </GlassElement>
        </div>
      )}

      <Navbar />
      <HeroSection />
      <MatrixSection />
      <GallerySection />
      <CompareSection />
      <PlaygroundSection />
      <UIKitSection />
      <ColorVariantsSection />
      <ShapeVariantsSection />
      <ChromaSection />
      <StressTestSection />
      <Footer />
    </main>
  );
}
