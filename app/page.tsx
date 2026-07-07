'use client';

import React, { useState, useEffect, useRef } from 'react';
import { GlassElement } from './GlassElement';
import { detectSVGFilterSupport } from './DisplacementUtils';

// ============================================
// ICONOS SVG
// ============================================
const MenuIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);

const CloseIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const StarIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
  </svg>
);

const ZapIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
  </svg>
);

const HeartIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
  </svg>
);

const ShieldIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
);

const EyeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
);

const ArrowRightIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"/>
    <polyline points="12 5 19 12 12 19"/>
  </svg>
);

const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

// ============================================
// COMPONENTE: NAVBAR
// ============================================
const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Inicio', href: '#hero' },
    { label: 'Características', href: '#features' },
    { label: 'Galería', href: '#gallery' },
    { label: 'Componentes', href: '#components' },
    { label: 'Contacto', href: '#contact' },
  ];

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      padding: scrolled ? '12px 20px' : '20px',
      transition: 'all 0.3s ease',
    }}>
      <GlassElement
        autoSize
        radius={24}
        depth={8}
        blur={2}
        strength={60}
        chromaticAberration={1}
        backgroundColor="rgba(255, 255, 255, 0.15)"
        style={{ width: '100%', maxWidth: '1200px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 'bold', fontSize: '1.2rem' }}>
          <span style={{ fontSize: '1.5rem' }}>💧</span>
          <span>LiquidGlass</span>
        </div>

        {/* Desktop Nav */}
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }} className="desktop-nav">
          {navLinks.map((link) => (
            <GlassElement
              key={link.href}
              autoSize
              radius={16}
              depth={4}
              blur={1}
              strength={40}
              backgroundColor="rgba(255,255,255,0.1)"
              style={{ fontSize: '0.9rem' }}
              onClick={() => document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' })}
            >
              <span style={{ padding: '0' }}>{link.label}</span>
            </GlassElement>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            background: 'none',
            border: 'none',
            color: 'white',
            cursor: 'pointer',
            display: 'none',
          }}
          className="mobile-menu-btn"
        >
          {menuOpen ? <CloseIcon /> : <MenuIcon />}
        </button>
      </GlassElement>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 999,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '16px',
          padding: '20px',
        }} className="mobile-menu-overlay">
          <GlassElement
            width={300}
            height={400}
            radius={32}
            depth={12}
            blur={3}
            strength={80}
            chromaticAberration={2}
            backgroundColor="rgba(20, 20, 40, 0.8)"
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '12px' }}
          >
            <button
              onClick={() => setMenuOpen(false)}
              style={{ position: 'absolute', top: '20px', right: '20px', background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}
            >
              <CloseIcon />
            </button>
            {navLinks.map((link) => (
              <GlassElement
                key={link.href}
                autoSize
                radius={20}
                depth={6}
                blur={2}
                strength={50}
                backgroundColor="rgba(255,255,255,0.1)"
                style={{ fontSize: '1.1rem', minWidth: '200px', justifyContent: 'center' }}
                onClick={() => {
                  setMenuOpen(false);
                  document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                {link.label}
              </GlassElement>
            ))}
          </GlassElement>
        </div>
      )}
    </nav>
  );
};

// ============================================
// COMPONENTE: HERO SECTION
// ============================================
const HeroSection = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        setMousePos({
          x: (e.clientX - rect.left) / rect.width,
          y: (e.clientY - rect.top) / rect.height,
        });
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section
      id="hero"
      ref={heroRef}
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        padding: '120px 20px 60px',
        background: `radial-gradient(circle at ${mousePos.x * 100}% ${mousePos.y * 100}%, rgba(100, 100, 255, 0.3) 0%, transparent 50%), linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)`,
        transition: 'background 0.3s ease',
      }}
    >
      {/* Floating Glass Cards Background */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '15%', left: '10%', animation: 'float 6s ease-in-out infinite' }}>
          <GlassElement width={120} height={120} radius={60} depth={8} blur={2} strength={60} chromaticAberration={2} backgroundColor="rgba(255,255,255,0.1)" />
        </div>
        <div style={{ position: 'absolute', top: '60%', left: '5%', animation: 'float 8s ease-in-out infinite 1s' }}>
          <GlassElement width={80} height={80} radius={40} depth={6} blur={1} strength={40} backgroundColor="rgba(255,100,200,0.1)" />
        </div>
        <div style={{ position: 'absolute', top: '20%', right: '15%', animation: 'float 7s ease-in-out infinite 0.5s' }}>
          <GlassElement width={100} height={100} radius={50} depth={7} blur={2} strength={50} chromaticAberration={1} backgroundColor="rgba(100,255,200,0.1)" />
        </div>
        <div style={{ position: 'absolute', bottom: '20%', right: '10%', animation: 'float 9s ease-in-out infinite 2s' }}>
          <GlassElement width={140} height={90} radius={45} depth={9} blur={2} strength={70} backgroundColor="rgba(200,100,255,0.1)" />
        </div>
      </div>

      <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', maxWidth: '800px' }}>
        <GlassElement
          autoSize
          radius={32}
          depth={12}
          blur={3}
          strength={80}
          chromaticAberration={2}
          backgroundColor="rgba(255, 255, 255, 0.1)"
          style={{ marginBottom: '32px' }}
        >
          <div style={{ padding: '32px 48px' }}>
            <h1 style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', fontWeight: '800', margin: '0 0 16px', lineHeight: 1.1, background: 'linear-gradient(135deg, #fff 0%, #a5b4fc 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Liquid Glass
            </h1>
            <p style={{ fontSize: 'clamp(1rem, 2vw, 1.25rem)', opacity: 0.8, margin: 0, lineHeight: 1.6 }}>
              Efecto de cristal líquido con filtros SVG. Totalmente responsive, interactivo y compatible con todos los dispositivos.
            </p>
          </div>
        </GlassElement>

        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <GlassElement
            autoSize
            radius={24}
            depth={10}
            blur={2}
            strength={60}
            chromaticAberration={1}
            backgroundColor="rgba(99, 102, 241, 0.4)"
            style={{ fontWeight: '600' }}
            onClick={() => document.querySelector('#features')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '4px 8px' }}>
              Explorar <ArrowRightIcon />
            </div>
          </GlassElement>

          <GlassElement
            autoSize
            radius={24}
            depth={8}
            blur={2}
            strength={50}
            backgroundColor="rgba(255, 255, 255, 0.15)"
            style={{ fontWeight: '600' }}
            onClick={() => document.querySelector('#components')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <div style={{ padding: '4px 8px' }}>Ver Componentes</div>
          </GlassElement>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div style={{ position: 'absolute', bottom: '30px', left: '50%', transform: 'translateX(-50%)', animation: 'bounce 2s infinite' }}>
        <GlassElement width={40} height={40} radius={20} depth={4} blur={1} strength={30} backgroundColor="rgba(255,255,255,0.2)">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="6 9 12 15 18 9"/>
          </svg>
        </GlassElement>
      </div>
    </section>
  );
};

// ============================================
// COMPONENTE: FEATURES SECTION
// ============================================
const FeaturesSection = () => {
  const features = [
    { icon: <ZapIcon />, title: 'Rendimiento', desc: 'Optimizado para 60fps en todos los dispositivos' },
    { icon: <ShieldIcon />, title: 'Seguro', desc: 'Fallback automático para navegadores sin soporte SVG' },
    { icon: <EyeIcon />, title: 'Visual', desc: 'Efecto de aberración cromática configurable' },
    { icon: <HeartIcon />, title: 'Responsive', desc: 'Adaptable a cualquier resolución y dispositivo' },
  ];

  return (
    <section id="features" style={{ padding: '80px 20px', background: 'linear-gradient(180deg, #24243e 0%, #1a1a2e 100%)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <GlassElement autoSize radius={20} depth={6} blur={2} strength={40} backgroundColor="rgba(255,255,255,0.1)" style={{ marginBottom: '16px' }}>
            <span style={{ padding: '8px 16px', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '2px', opacity: 0.8 }}>Características</span>
          </GlassElement>
          <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', color: 'white', margin: '16px 0 0' }}>Todo lo que necesitas</h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px' }}>
          {features.map((f, i) => (
            <GlassElement
              key={i}
              autoSize
              radius={24}
              depth={10}
              blur={2}
              strength={60}
              chromaticAberration={1}
              backgroundColor="rgba(255, 255, 255, 0.08)"
              style={{ width: '100%' }}
            >
              <div style={{ padding: '32px', textAlign: 'left', width: '100%' }}>
                <div style={{ marginBottom: '16px', color: '#a5b4fc' }}>{f.icon}</div>
                <h3 style={{ margin: '0 0 8px', fontSize: '1.25rem', color: 'white' }}>{f.title}</h3>
                <p style={{ margin: 0, opacity: 0.7, fontSize: '0.95rem', lineHeight: 1.5 }}>{f.desc}</p>
              </div>
            </GlassElement>
          ))}
        </div>
      </div>
    </section>
  );
};

// ============================================
// COMPONENTE: GALLERY SECTION
// ============================================
const GallerySection = () => {
  const [activeImage, setActiveImage] = useState(0);
  const images = [
    { color: '#6366f1', label: 'Primary' },
    { color: '#ec4899', label: 'Pink' },
    { color: '#10b981', label: 'Emerald' },
    { color: '#f59e0b', label: 'Amber' },
    { color: '#8b5cf6', label: 'Violet' },
    { color: '#06b6d4', label: 'Cyan' },
  ];

  return (
    <section id="gallery" style={{ padding: '80px 20px', background: 'linear-gradient(180deg, #1a1a2e 0%, #16213e 100%)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', color: 'white', margin: 0 }}>Galería Interactiva</h2>
          <p style={{ color: 'rgba(255,255,255,0.6)', marginTop: '12px' }}>Haz clic en las tarjetas para explorar</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
          {images.map((img, i) => (
            <GlassElement
              key={i}
              autoSize
              radius={24}
              depth={activeImage === i ? 16 : 8}
              blur={activeImage === i ? 3 : 2}
              strength={activeImage === i ? 100 : 60}
              chromaticAberration={activeImage === i ? 3 : 1}
              backgroundColor={`${img.color}20`}
              style={{ width: '100%', transition: 'all 0.3s ease' }}
              onClick={() => setActiveImage(i === activeImage ? -1 : i)}
            >
              <div style={{ padding: '40px', textAlign: 'center', width: '100%' }}>
                <div style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '24px',
                  background: img.color,
                  margin: '0 auto 20px',
                  boxShadow: `0 8px 32px ${img.color}60`,
                  transition: 'transform 0.3s ease',
                  transform: activeImage === i ? 'scale(1.1) rotate(5deg)' : 'scale(1)',
                }} />
                <h3 style={{ color: 'white', margin: '0 0 8px' }}>{img.label}</h3>
                <p style={{ color: 'rgba(255,255,255,0.5)', margin: 0, fontSize: '0.85rem' }}>
                  {activeImage === i ? '✨ Activo' : 'Clic para activar'}
                </p>
              </div>
            </GlassElement>
          ))}
        </div>
      </div>
    </section>
  );
};

// ============================================
// COMPONENTE: COMPONENTS SHOWCASE
// ============================================
const ComponentsSection = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [progress, setProgress] = useState(0);
  const [switchOn, setSwitchOn] = useState(false);
  const [sliderValue, setSliderValue] = useState(50);

  useEffect(() => {
    if (modalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [modalOpen]);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(p => (p >= 100 ? 0 : p + 1));
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const showToast = () => {
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 3000);
  };

  const tabs = ['Botones', 'Modal', 'Formularios', 'Estados'];

  return (
    <section id="components" style={{ padding: '80px 20px', background: 'linear-gradient(180deg, #16213e 0%, #0f0c29 100%)', position: 'relative' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', color: 'white', margin: 0 }}>Componentes Interactivos</h2>
          <p style={{ color: 'rgba(255,255,255,0.6)', marginTop: '12px' }}>Todos los elementos UI con efecto Liquid Glass</p>
        </div>

        {/* Tabs Navigation */}
        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '40px', flexWrap: 'wrap' }}>
          {tabs.map((tab, i) => (
            <GlassElement
              key={i}
              autoSize
              radius={16}
              depth={activeTab === i ? 10 : 4}
              blur={activeTab === i ? 2 : 1}
              strength={activeTab === i ? 60 : 30}
              backgroundColor={activeTab === i ? 'rgba(99, 102, 241, 0.3)' : 'rgba(255,255,255,0.08)'}
              onClick={() => setActiveTab(i)}
            >
              <span style={{ padding: '4px 8px', fontSize: '0.9rem', fontWeight: activeTab === i ? '600' : '400' }}>{tab}</span>
            </GlassElement>
          ))}
        </div>

        {/* Tab Content */}
        <div style={{ minHeight: '400px' }}>
          {/* BOTONES */}
          {activeTab === 0 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', alignItems: 'center' }}>
              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
                <GlassElement autoSize radius={20} depth={8} blur={2} strength={50} backgroundColor="rgba(99, 102, 241, 0.4)" onClick={showToast}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><ZapIcon /> Primario</span>
                </GlassElement>
                <GlassElement autoSize radius={20} depth={8} blur={2} strength={50} backgroundColor="rgba(236, 72, 153, 0.4)" onClick={showToast}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><HeartIcon /> Secundario</span>
                </GlassElement>
                <GlassElement autoSize radius={20} depth={8} blur={2} strength={50} backgroundColor="rgba(16, 185, 129, 0.4)" onClick={showToast}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><CheckIcon /> Éxito</span>
                </GlassElement>
                <GlassElement autoSize radius={20} depth={8} blur={2} strength={50} backgroundColor="rgba(245, 158, 11, 0.4)" onClick={showToast}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><StarIcon /> Destacado</span>
                </GlassElement>
              </div>

              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
                {[24, 32, 48, 64].map((size) => (
                  <GlassElement
                    key={size}
                    width={size}
                    height={size}
                    radius={size / 2}
                    depth={6}
                    blur={1}
                    strength={40}
                    backgroundColor="rgba(255,255,255,0.15)"
                  >
                    <span style={{ fontSize: `${size * 0.4}px` }}>🔘</span>
                  </GlassElement>
                ))}
              </div>
            </div>
          )}

          {/* MODAL */}
          {activeTab === 1 && (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px' }}>
              <GlassElement
                autoSize
                radius={24}
                depth={10}
                blur={2}
                strength={60}
                chromaticAberration={1}
                backgroundColor="rgba(99, 102, 241, 0.4)"
                onClick={() => setModalOpen(true)}
              >
                <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>Abrir Modal</span>
              </GlassElement>

              <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem' }}>Haz clic para ver el modal con efecto glass</p>
            </div>
          )}

          {/* FORMULARIOS */}
          {activeTab === 2 && (
            <div style={{ maxWidth: '500px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <GlassElement autoSize radius={16} depth={6} blur={2} strength={40} backgroundColor="rgba(255,255,255,0.08)" style={{ width: '100%' }}>
                <input
                  type="text"
                  placeholder="Nombre completo"
                  style={{
                    background: 'transparent',
                    border: 'none',
                    outline: 'none',
                    color: 'white',
                    width: '100%',
                    fontSize: '1rem',
                  }}
                />
              </GlassElement>

              <GlassElement autoSize radius={16} depth={6} blur={2} strength={40} backgroundColor="rgba(255,255,255,0.08)" style={{ width: '100%' }}>
                <input
                  type="email"
                  placeholder="correo@ejemplo.com"
                  style={{
                    background: 'transparent',
                    border: 'none',
                    outline: 'none',
                    color: 'white',
                    width: '100%',
                    fontSize: '1rem',
                  }}
                />
              </GlassElement>

              <GlassElement autoSize radius={16} depth={6} blur={2} strength={40} backgroundColor="rgba(255,255,255,0.08)" style={{ width: '100%', minHeight: '120px' }}>
                <textarea
                  placeholder="Mensaje..."
                  style={{
                    background: 'transparent',
                    border: 'none',
                    outline: 'none',
                    color: 'white',
                    width: '100%',
                    fontSize: '1rem',
                    resize: 'none',
                    minHeight: '100px',
                    fontFamily: 'inherit',
                  }}
                />
              </GlassElement>

              <GlassElement
                autoSize
                radius={20}
                depth={10}
                blur={2}
                strength={60}
                backgroundColor="rgba(99, 102, 241, 0.5)"
                style={{ width: '100%', justifyContent: 'center' }}
                onClick={showToast}
              >
                <span style={{ fontWeight: '600' }}>Enviar Mensaje</span>
              </GlassElement>
            </div>
          )}

          {/* ESTADOS */}
          {activeTab === 3 && (
            <div style={{ maxWidth: '600px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '32px' }}>
              {/* Progress Bar */}
              <div>
                <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '12px', fontSize: '0.9rem' }}>Progreso: {progress}%</p>
                <GlassElement autoSize radius={12} depth={4} blur={1} strength={30} backgroundColor="rgba(255,255,255,0.1)" style={{ width: '100%' }}>
                  <div style={{ width: '100%', padding: '4px' }}>
                    <div style={{
                      height: '8px',
                      borderRadius: '4px',
                      background: 'linear-gradient(90deg, #6366f1, #ec4899)',
                      width: `${progress}%`,
                      transition: 'width 0.1s linear',
                    }} />
                  </div>
                </GlassElement>
              </div>

              {/* Switch Toggle */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <span style={{ color: 'rgba(255,255,255,0.7)' }}>Modo Avanzado</span>
                <GlassElement
                  width={60}
                  height={32}
                  radius={16}
                  depth={switchOn ? 8 : 4}
                  blur={1}
                  strength={switchOn ? 50 : 30}
                  backgroundColor={switchOn ? 'rgba(99, 102, 241, 0.4)' : 'rgba(255,255,255,0.1)'}
                  onClick={() => setSwitchOn(!switchOn)}
                  style={{ position: 'relative' }}
                >
                  <div style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '12px',
                    background: 'white',
                    position: 'absolute',
                    left: switchOn ? '32px' : '4px',
                    transition: 'left 0.3s ease',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
                  }} />
                </GlassElement>
                <span style={{ color: switchOn ? '#a5b4fc' : 'rgba(255,255,255,0.4)', fontSize: '0.85rem' }}>
                  {switchOn ? 'ON' : 'OFF'}
                </span>
              </div>

              {/* Slider */}
              <div>
                <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '12px', fontSize: '0.9rem' }}>Intensidad: {sliderValue}</p>
                <GlassElement autoSize radius={12} depth={4} blur={1} strength={30} backgroundColor="rgba(255,255,255,0.1)" style={{ width: '100%' }}>
                  <div style={{ width: '100%', padding: '12px 16px' }}>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={sliderValue}
                      onChange={(e) => setSliderValue(Number(e.target.value))}
                      style={{ width: '100%', accentColor: '#6366f1' }}
                    />
                  </div>
                </GlassElement>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modal Overlay */}
      {modalOpen && (
        <div style={{
          position: 'fixed',
          inset: 0,
          zIndex: 2000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px',
          background: 'rgba(0,0,0,0.6)',
          backdropFilter: 'blur(8px)',
        }} onClick={() => setModalOpen(false)}>
          <div onClick={(e) => e.stopPropagation()}>
            <GlassElement
              width={Math.min(500, typeof window !== 'undefined' ? window.innerWidth - 40 : 500)}
              height={400}
              radius={32}
              depth={16}
              blur={4}
              strength={100}
              chromaticAberration={3}
              backgroundColor="rgba(20, 20, 50, 0.85)"
              style={{ display: 'flex', flexDirection: 'column' }}
            >
              <div style={{ padding: '32px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                  <h3 style={{ color: 'white', margin: 0, fontSize: '1.5rem' }}>Modal Liquid Glass</h3>
                  <button
                    onClick={() => setModalOpen(false)}
                    style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', padding: '8px' }}
                  >
                    <CloseIcon />
                  </button>
                </div>
                <p style={{ color: 'rgba(255,255,255,0.7)', lineHeight: 1.6, margin: 0 }}>
                  Este es un modal completamente funcional con el efecto Liquid Glass aplicado. 
                  Incluye aberración cromática, desplazamiento SVG y profundidad dinámica. 
                  Funciona perfectamente en móviles, tablets y computadoras.
                </p>
                <div style={{ marginTop: 'auto', display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                  <GlassElement
                    autoSize
                    radius={16}
                    depth={6}
                    blur={1}
                    strength={40}
                    backgroundColor="rgba(255,255,255,0.1)"
                    onClick={() => setModalOpen(false)}
                  >
                    <span style={{ fontSize: '0.9rem' }}>Cancelar</span>
                  </GlassElement>
                  <GlassElement
                    autoSize
                    radius={16}
                    depth={8}
                    blur={2}
                    strength={50}
                    backgroundColor="rgba(99, 102, 241, 0.4)"
                    onClick={() => { setModalOpen(false); showToast(); }}
                  >
                    <span style={{ fontSize: '0.9rem', fontWeight: '600' }}>Aceptar</span>
                  </GlassElement>
                </div>
              </div>
            </GlassElement>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toastVisible && (
        <div style={{
          position: 'fixed',
          bottom: '30px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 3000,
          animation: 'slideUp 0.3s ease',
        }}>
          <GlassElement
            autoSize
            radius={16}
            depth={8}
            blur={2}
            strength={60}
            backgroundColor="rgba(16, 185, 129, 0.3)"
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '4px 8px' }}>
              <CheckIcon />
              <span>¡Acción completada con éxito!</span>
            </div>
          </GlassElement>
        </div>
      )}
    </section>
  );
};

// ============================================
// COMPONENTE: CONTACT SECTION
// ============================================
const ContactSection = () => {
  return (
    <section id="contact" style={{ padding: '80px 20px', background: 'linear-gradient(180deg, #0f0c29 0%, #000000 100%)' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
        <GlassElement
          autoSize
          radius={32}
          depth={12}
          blur={3}
          strength={80}
          chromaticAberration={2}
          backgroundColor="rgba(255, 255, 255, 0.05)"
          style={{ width: '100%' }}
        >
          <div style={{ padding: '48px' }}>
            <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', color: 'white', margin: '0 0 16px' }}>¿Listo para usar Liquid Glass?</h2>
            <p style={{ color: 'rgba(255,255,255,0.6)', margin: '0 0 32px', lineHeight: 1.6 }}>
              Integra este efecto en tus proyectos React, Vue, Angular o vanilla JS. 
              Compatible con todos los navegadores modernos y dispositivos.
            </p>
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <GlassElement
                autoSize
                radius={24}
                depth={10}
                blur={2}
                strength={60}
                chromaticAberration={1}
                backgroundColor="rgba(99, 102, 241, 0.4)"
              >
                <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <StarIcon /> GitHub
                </span>
              </GlassElement>
              <GlassElement
                autoSize
                radius={24}
                depth={8}
                blur={2}
                strength={50}
                backgroundColor="rgba(255, 255, 255, 0.1)"
              >
                <span>Documentación</span>
              </GlassElement>
            </div>
          </div>
        </GlassElement>
      </div>
    </section>
  );
};

// ============================================
// COMPONENTE: FOOTER
// ============================================
const Footer = () => (
  <footer style={{ padding: '40px 20px', textAlign: 'center', background: '#000' }}>
    <GlassElement
      autoSize
      radius={16}
      depth={4}
      blur={1}
      strength={20}
      backgroundColor="rgba(255,255,255,0.05)"
    >
      <span style={{ padding: '8px 16px', fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)' }}>
        Liquid Glass Demo © 2026 — Vanilla JS Web Component portado a React/TSX
      </span>
    </GlassElement>
  </footer>
);

// ============================================
// PÁGINA PRINCIPAL
// ============================================
export default function LiquidGlassDemo() {
  const [svgSupport, setSvgSupport] = useState<boolean | null>(null);

  useEffect(() => {
    setSvgSupport(detectSVGFilterSupport());
  }, []);

  return (
    <main style={{ minHeight: '100vh', background: '#0f0c29', color: 'white', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      {/* Global Styles */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(2deg); }
        }
        @keyframes bounce {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50% { transform: translateX(-50%) translateY(-10px); }
        }
        @keyframes slideUp {
          from { transform: translateX(-50%) translateY(100px); opacity: 0; }
          to { transform: translateX(-50%) translateY(0); opacity: 1; }
        }
        * { box-sizing: border-box; }
        body { margin: 0; padding: 0; }

        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
        @media (min-width: 769px) {
          .desktop-nav { display: flex !important; }
          .mobile-menu-btn { display: none !important; }
          .mobile-menu-overlay { display: none !important; }
        }

        input::placeholder, textarea::placeholder { color: rgba(255,255,255,0.4); }
        input, textarea { background: transparent; }
      `}</style>

      {/* Support Banner */}
      {svgSupport === false && (
        <div style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          zIndex: 5000,
          maxWidth: '300px',
        }}>
          <GlassElement
            autoSize
            radius={12}
            depth={6}
            blur={2}
            strength={40}
            backgroundColor="rgba(245, 158, 11, 0.3)"
          >
            <div style={{ padding: '12px 16px', fontSize: '0.85rem' }}>
              ⚠️ Tu navegador usa el fallback de blur. Los filtros SVG no son soportados.
            </div>
          </GlassElement>
        </div>
      )}

      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <GallerySection />
      <ComponentsSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
