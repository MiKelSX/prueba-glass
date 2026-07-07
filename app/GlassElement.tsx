'use client';

import React, { useRef, useEffect, useState, useCallback, useMemo } from 'react';
import { getDisplacementFilter, getDisplacementMap, detectSVGFilterSupport } from './DisplacementUtils';

export interface GlassElementProps {
  width?: number;
  height?: number;
  radius?: number;
  depth?: number;
  blur?: number;
  strength?: number;
  chromaticAberration?: number;
  debug?: boolean;
  backgroundColor?: string;
  autoSize?: boolean;
  minWidth?: number;
  minHeight?: number;
  className?: string;
  style?: React.CSSProperties;
  onClick?: (e: React.MouseEvent) => void;
  children?: React.ReactNode;
}

export const GlassElement: React.FC<GlassElementProps> = ({
  width = 200,
  height = 200,
  radius = 50,
  depth: baseDepth = 10,
  blur = 2,
  strength = 100,
  chromaticAberration = 0,
  debug = false,
  backgroundColor = 'rgba(255, 255, 255, 0.4)',
  autoSize = false,
  minWidth = 0,
  minHeight = 0,
  className = '',
  style = {},
  onClick,
  children,
}) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const [clicked, setClicked] = useState(false);
  const [hasSVGSupport, setHasSVGSupport] = useState(false); // ← FIX SSR: default false, detect in useEffect

  // Detectar soporte solo en cliente
  useEffect(() => {
    setHasSVGSupport(detectSVGFilterSupport());
  }, []);

  const depth = baseDepth / (clicked ? 0.7 : 1);

  const applyStyles = useCallback(() => {
    const element = elementRef.current;
    if (!element) return;

    element.style.borderRadius = `${radius}px`;

    if (autoSize) {
      element.style.backdropFilter = 'none';
      element.style.background = 'rgba(255, 255, 255, 0.4)';
      const rect = element.getBoundingClientRect();
      let actualWidth = Math.ceil(rect.width);
      let actualHeight = Math.ceil(rect.height);

      if (actualWidth === 0 || actualHeight === 0) {
        requestAnimationFrame(() => applyStyles());
        return;
      }
      actualWidth = Math.max(actualWidth, minWidth, 50);
      actualHeight = Math.max(actualHeight, minHeight, 30);

      if (debug) {
        element.style.background = `url("${getDisplacementMap({ height: actualHeight, width: actualWidth, radius, depth })}")`;
        element.style.boxShadow = 'none';
        element.style.backdropFilter = 'none';
      } else if (!hasSVGSupport) {
        element.style.backdropFilter = `blur(${blur * 2}px)`;
        element.style.background = backgroundColor;
        element.style.boxShadow = '1px 1px 1px 0px rgba(255,255,255,0.60) inset, -1px -1px 1px 0px rgba(255,255,255,0.60) inset, 0px 0px 16px 0px rgba(0,0,0,0.04)';
        element.style.border = '1px solid rgba(255,255,255,0.3)';
      } else {
        element.style.backdropFilter = `blur(${blur / 2}px) url('${getDisplacementFilter({ height: actualHeight, width: actualWidth, radius, depth, strength, chromaticAberration })}') blur(${blur}px) brightness(1.1) saturate(1.5)`;
        element.style.background = backgroundColor;
        element.style.boxShadow = '1px 1px 1px 0px rgba(255,255,255,0.60) inset, -1px -1px 1px 0px rgba(255,255,255,0.60) inset, 0px 0px 16px 0px rgba(0,0,0,0.04)';
      }
    } else {
      element.style.height = `${height}px`;
      element.style.width = `${width}px`;
      if (debug) {
        element.style.background = `url("${getDisplacementMap({ height, width, radius, depth })}")`;
        element.style.boxShadow = 'none';
        element.style.backdropFilter = 'none';
      } else if (!hasSVGSupport) {
        element.style.backdropFilter = `blur(${blur * 2}px)`;
        element.style.background = backgroundColor;
        element.style.boxShadow = '1px 1px 1px 0px rgba(255,255,255,0.60) inset, -1px -1px 1px 0px rgba(255,255,255,0.60) inset, 0px 0px 16px 0px rgba(0,0,0,0.04)';
        element.style.border = '1px solid rgba(255,255,255,0.3)';
      } else {
        element.style.backdropFilter = `blur(${blur / 2}px) url('${getDisplacementFilter({ height, width, radius, depth, strength, chromaticAberration })}') blur(${blur}px) brightness(1.1) saturate(1.5)`;
        element.style.background = backgroundColor;
        element.style.boxShadow = '1px 1px 1px 0px rgba(255,255,255,0.60) inset, -1px -1px 1px 0px rgba(255,255,255,0.60) inset, 0px 0px 16px 0px rgba(0,0,0,0.04)';
      }
    }
  }, [autoSize, width, height, radius, depth, blur, strength, chromaticAberration, debug, backgroundColor, hasSVGSupport, minWidth, minHeight]);

  useEffect(() => {
    if (autoSize) {
      const observer = new MutationObserver(() => setTimeout(() => applyStyles(), 0));
      if (elementRef.current) observer.observe(elementRef.current, { childList: true, subtree: true, characterData: true });
      let resizeObserver: ResizeObserver | null = null;
      if (window.ResizeObserver && elementRef.current) {
        resizeObserver = new ResizeObserver(() => applyStyles());
        resizeObserver.observe(elementRef.current);
      }
      requestAnimationFrame(() => requestAnimationFrame(() => applyStyles()));
      return () => { observer.disconnect(); resizeObserver?.disconnect(); };
    } else {
      applyStyles();
    }
  }, [autoSize, applyStyles]);

  const handleMouseDown = (e: React.MouseEvent) => { setClicked(true); onClick?.(e); };
  const handleMouseUp = () => setClicked(false);
  const handleMouseLeave = () => setClicked(false);

  useEffect(() => {
    const handleGlobalMouseUp = () => { if (clicked) setClicked(false); };
    document.addEventListener('mouseup', handleGlobalMouseUp);
    return () => document.removeEventListener('mouseup', handleGlobalMouseUp);
  }, [clicked]);

  const baseStyles: React.CSSProperties = {
    cursor: onClick ? 'pointer' : 'default',
    transition: 'transform 0.1s ease',
    position: 'relative',
    display: autoSize ? 'inline-flex' : 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    textAlign: 'center',
    fontFamily: 'sans-serif',
    padding: autoSize ? 'var(--glass-padding, 16px 24px)' : undefined,
    transform: clicked ? 'scale(0.98)' : 'scale(1)',
    ...style,
  };

  if (!autoSize) {
    baseStyles.width = width;
    baseStyles.height = height;
  }

  return (
    <div
      ref={elementRef}
      className={`glass-element ${className}`}
      style={baseStyles}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleMouseDown}
      onTouchEnd={handleMouseUp}
    >
      {children}
    </div>
  );
};

export default GlassElement;
