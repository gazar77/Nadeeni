import { Component, OnInit, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'feature-footer',
  template: `
    <footer class="footer-container">
      <!-- Moving Cyber Grid Background -->
      <div class="moving-grid-bg"></div>
      
      <!-- Neon separator line -->
      <div class="glowing-divider"></div>

      <!-- Secure Contact Email Row -->
      <div class="footer-email-row">
        <span class="email-label">SYSTEM_CONTACT_GATE:</span>
        <a href="mailto:Nadeeni.Group@gmail.com" class="email-link">Nadeeni.Group@gmail.com</a>
      </div>
      
      <div class="footer-content">
        <!-- Copyright details -->
        <div class="footer-branding">
          <span class="footer-logo">NADEENI</span>
          <span class="footer-copyright">© 2026 NADEENI. ALL CORE INTERFACES OPERATIONAL.</span>
        </div>
        
        <!-- Navigation routes -->
        <div class="footer-nav">
          <a href="#hero" (click)="scrollTo('#hero', $event)" class="nav-link">[ TERMINAL ]</a>
          <a href="#story" (click)="scrollTo('#story', $event)" class="nav-link">[ CHRONOLOGY ]</a>
          <a href="#team" (click)="scrollTo('#team', $event)" class="nav-link">[ BUILDERS ]</a>
          <a href="#tech" (click)="scrollTo('#tech', $event)" class="nav-link">[ UNIVERSE ]</a>
          <a href="#projects" (click)="scrollTo('#projects', $event)" class="nav-link">[ SHOWCASE ]</a>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    .footer-container {
      position: relative;
      background-color: #06090e;
      padding: 64px 24px 48px 24px;
      width: 100%;
      overflow: hidden;
      z-index: 10;
    }

    /* Moving Cyber Grid ripple background */
    .moving-grid-bg {
      position: absolute;
      inset: 0;
      background-image: 
        linear-gradient(rgba(255, 255, 255, 0.005) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255, 255, 255, 0.005) 1px, transparent 1px);
      background-size: 25px 25px;
      z-index: 1;
      opacity: 0.85;
      mask-image: radial-gradient(circle at 50% 50%, black, transparent 80%);
      -webkit-mask-image: radial-gradient(circle at 50% 50%, black, transparent 80%);
      animation: ripple-grid 20s infinite linear;
      pointer-events: none;
    }

    @keyframes ripple-grid {
      0% { background-position: 0 0; }
      100% { background-position: 50px 50px; }
    }

    .glowing-divider {
      width: 100%;
      height: 1px;
      background: linear-gradient(90deg, transparent, rgba(61, 175, 138, 0.4), rgba(89, 146, 236, 0.4), transparent);
      box-shadow: 0 0 10px rgba(61, 175, 138, 0.2);
      margin-bottom: 40px;
      position: relative;
      z-index: 2;
    }

    /* Email row styling */
    .footer-email-row {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 12px;
      margin-bottom: 40px;
      position: relative;
      z-index: 2;
      will-change: transform, opacity;

      @media (max-width: 600px) {
        flex-direction: column;
        gap: 8px;
      }
    }

    .email-label {
      font-family: var(--font-mono);
      font-size: 0.7rem;
      color: rgba(255, 255, 255, 0.4);
      letter-spacing: 2px;
    }

    .email-link {
      font-family: var(--font-cyber);
      font-size: 0.95rem;
      color: var(--color-cyan);
      letter-spacing: 1px;
      text-decoration: none;
      transition: all 0.3s ease;
      text-shadow: 0 0 10px rgba(61, 175, 138, 0.3);
      border-bottom: 1px dashed rgba(61, 175, 138, 0.4);
      padding-bottom: 2px;
      
      &:hover {
        color: var(--color-gold);
        text-shadow: 0 0 15px var(--color-gold);
        border-color: var(--color-gold);
        transform: translateY(-1px);
      }
    }

    .footer-content {
      max-width: 1200px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 32px;
      position: relative;
      z-index: 2;
      
      @media (max-width: 768px) {
        flex-direction: column;
        text-align: center;
      }
    }

    .footer-branding {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 8px;

      @media (max-width: 768px) {
        align-items: center;
      }
    }

    .footer-logo {
      font-family: var(--font-cyber);
      font-size: 1.25rem;
      font-weight: 900;
      letter-spacing: 3px;
      color: var(--color-white);
      text-shadow: 0 0 8px rgba(255, 255, 255, 0.2);
    }

    .footer-copyright {
      font-family: var(--font-mono);
      font-size: 0.65rem;
      color: rgba(255, 255, 255, 0.35);
      letter-spacing: 1px;
    }

    /* Links navigation styling */
    .footer-nav {
      display: flex;
      gap: 16px;
      flex-wrap: wrap;
      justify-content: center;
    }

    .nav-link {
      font-family: var(--font-mono);
      font-size: 0.75rem;
      color: rgba(255, 255, 255, 0.55);
      letter-spacing: 1px;
      text-decoration: none;
      transition: all 0.3s ease;
      display: inline-block;
      will-change: transform, opacity;

      &:hover {
        color: var(--color-cyan);
        text-shadow: 0 0 5px var(--color-cyan);
        transform: translateY(-2px);
      }
    }
  `],
  standalone: false
})
export class Footer implements OnInit, AfterViewInit {
  private isBrowser = false;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    if (!this.isBrowser) return;

    // Staggered bounce entry for navigation routes
    gsap.from('.footer-container .nav-link', {
      opacity: 0,
      y: 15,
      stagger: 0.08,
      duration: 0.9,
      ease: 'back.out(2.2)',
      scrollTrigger: {
        trigger: '.footer-container',
        start: 'top 95%'
      }
    });

    // Fade-in core contact rows
    gsap.from('.footer-email-row', {
      opacity: 0,
      scale: 0.95,
      y: 10,
      duration: 1.2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.footer-container',
        start: 'top 95%'
      }
    });
  }

  scrollTo(target: string, event: Event): void {
    event.preventDefault();
    const element = document.querySelector(target);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
