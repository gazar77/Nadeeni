import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'feature-navbar',
  template: `
    <nav class="navbar" [class.scrolled]="isScrolled" [class.hidden]="isHidden">
      <div class="nav-container">
        <!-- Logo -->
        <a class="nav-logo" href="#hero" (click)="scrollTo('#hero', $event)" aria-label="Nadeeni Home">
          <div class="logo-3d-wrapper">
            <img src="/LOgo nadeeni.png" alt="Nadeeni Logo" class="logo-img" />
            <div class="logo-glow-ring"></div>
          </div>
          <span class="logo-text">NADEENI</span>
        </a>

        <!-- Desktop Navigation Links -->
        <ul class="nav-links" role="navigation" aria-label="Main Navigation">
          <li *ngFor="let link of navLinks">
            <a
              [href]="link.href"
              class="nav-link"
              [class.active]="activeSection === link.id"
              (click)="scrollTo(link.href, $event)"
              [attr.aria-label]="link.label"
            >
              <span class="link-bracket">[</span>
              <span class="link-text">{{ link.label }}</span>
              <span class="link-bracket">]</span>
              <div class="link-underline"></div>
            </a>
          </li>
        </ul>

        <!-- CTA -->
        <a href="#contact" class="nav-cta" (click)="scrollTo('#contact', $event)" aria-label="Start a Project">
          <span class="cta-pulse"></span>
          <span class="cta-text">LAUNCH PROJECT</span>
        </a>

        <!-- Mobile Hamburger -->
        <button
          class="hamburger"
          [class.open]="mobileOpen"
          (click)="mobileOpen = !mobileOpen"
          aria-label="Toggle navigation"
          [attr.aria-expanded]="mobileOpen"
        >
          <span></span><span></span><span></span>
        </button>
      </div>

      <!-- Mobile Menu Overlay -->
      <div class="mobile-menu" [class.open]="mobileOpen" role="dialog" aria-label="Mobile Navigation">
        <ul>
          <li *ngFor="let link of navLinks; let i = index" [style.animationDelay]="(i * 0.07) + 's'">
            <a [href]="link.href" (click)="mobileNav(link.href, $event)" class="mobile-link">
              <span class="mobile-index">0{{ i + 1 }}</span>
              {{ link.label }}
            </a>
          </li>
        </ul>
        <a href="#contact" class="mobile-cta" (click)="mobileNav('#contact', $event)">LAUNCH PROJECT</a>
      </div>
    </nav>
  `,
  styles: [`
    :host {
      display: block;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      z-index: 9990;
    }

    .navbar {
      width: 100%;
      padding: 18px 0;
      transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
      background: transparent;
    }

    .navbar.scrolled {
      background: rgba(11, 15, 25, 0.82);
      backdrop-filter: blur(24px);
      -webkit-backdrop-filter: blur(24px);
      border-bottom: 1px solid rgba(61, 175, 138, 0.15);
      box-shadow:
        0 4px 32px rgba(0, 0, 0, 0.5),
        0 1px 0 rgba(89, 146, 236, 0.1) inset;
      padding: 12px 0;
    }

    .navbar.hidden {
      transform: translateY(-105%);
    }

    .nav-container {
      max-width: 1280px;
      margin: 0 auto;
      padding: 0 32px;
      display: flex;
      align-items: center;
      gap: 32px;
    }

    /* Logo */
    .nav-logo {
      display: flex;
      align-items: center;
      gap: 12px;
      text-decoration: none;
      flex-shrink: 0;
    }

    .logo-3d-wrapper {
      position: relative;
      width: 44px;
      height: 44px;
      transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
      transform-style: preserve-3d;
    }

    .nav-logo:hover .logo-3d-wrapper {
      transform: rotateY(15deg) rotateX(10deg) scale(1.12);
    }

    .logo-img {
      width: 44px;
      height: 44px;
      object-fit: contain;
      border-radius: 10px;
      background: white;
      padding: 3px;
      position: relative;
      z-index: 1;
      box-shadow: 0 0 15px rgba(61, 175, 138, 0.3);
      transition: box-shadow 0.4s ease;
    }

    .nav-logo:hover .logo-img {
      box-shadow: 0 0 30px rgba(61, 175, 138, 0.6), 0 0 60px rgba(89, 146, 236, 0.3);
    }

    .logo-glow-ring {
      position: absolute;
      inset: -4px;
      border-radius: 14px;
      border: 1px solid rgba(61, 175, 138, 0.4);
      animation: logo-ring-pulse 3s infinite alternate ease-in-out;
      pointer-events: none;
      z-index: 0;
    }

    @keyframes logo-ring-pulse {
      0% { opacity: 0.3; transform: scale(1); box-shadow: 0 0 8px rgba(61, 175, 138, 0.3); }
      100% { opacity: 0.8; transform: scale(1.05); box-shadow: 0 0 20px rgba(61, 175, 138, 0.6); }
    }

    .logo-text {
      font-family: var(--font-cyber);
      font-size: 1.15rem;
      font-weight: 900;
      letter-spacing: 4px;
      background: linear-gradient(135deg, #3DAF8A 0%, #5992EC 60%, #F5A623 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      transition: filter 0.3s ease;
    }

    .nav-logo:hover .logo-text {
      filter: brightness(1.3) drop-shadow(0 0 8px rgba(61, 175, 138, 0.5));
    }

    /* Nav Links */
    .nav-links {
      display: flex;
      align-items: center;
      gap: 4px;
      list-style: none;
      margin: 0;
      padding: 0;
      flex: 1;
      justify-content: center;
    }

    .nav-link {
      display: inline-flex;
      align-items: center;
      gap: 2px;
      font-family: var(--font-mono);
      font-size: 0.75rem;
      letter-spacing: 2px;
      color: rgba(255, 255, 255, 0.6);
      text-decoration: none;
      padding: 8px 14px;
      border-radius: 4px;
      position: relative;
      transition: all 0.3s ease;
      overflow: hidden;
    }

    .link-bracket {
      color: rgba(61, 175, 138, 0.5);
      transition: all 0.3s ease;
      font-size: 0.9rem;
    }

    .link-text {
      transition: all 0.3s ease;
    }

    .link-underline {
      position: absolute;
      bottom: 4px;
      left: 14px;
      right: 14px;
      height: 1px;
      background: linear-gradient(90deg, #3DAF8A, #5992EC);
      transform: scaleX(0);
      transform-origin: left;
      transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
      border-radius: 1px;
    }

    .nav-link:hover,
    .nav-link.active {
      color: var(--color-white);
    }

    .nav-link:hover .link-bracket,
    .nav-link.active .link-bracket {
      color: #3DAF8A;
      text-shadow: 0 0 8px rgba(61, 175, 138, 0.6);
    }

    .nav-link:hover .link-underline,
    .nav-link.active .link-underline {
      transform: scaleX(1);
    }

    .nav-link.active .link-text {
      color: #3DAF8A;
    }

    /* CTA Button */
    .nav-cta {
      flex-shrink: 0;
      font-family: var(--font-cyber);
      font-size: 0.72rem;
      font-weight: 600;
      letter-spacing: 2px;
      padding: 10px 22px;
      background: linear-gradient(135deg, rgba(61, 175, 138, 0.15) 0%, rgba(89, 146, 236, 0.1) 100%);
      border: 1px solid rgba(61, 175, 138, 0.4);
      border-radius: 4px;
      color: #3DAF8A;
      text-decoration: none;
      position: relative;
      overflow: hidden;
      transition: all 0.35s cubic-bezier(0.19, 1, 0.22, 1);
    }

    .cta-pulse {
      position: absolute;
      top: 50%; left: 50%;
      transform: translate(-50%, -50%);
      width: 0; height: 0;
      background: rgba(61, 175, 138, 0.15);
      border-radius: 50%;
      transition: all 0.5s ease;
    }

    .nav-cta:hover .cta-pulse {
      width: 200%;
      height: 500%;
    }

    .nav-cta:hover {
      border-color: #3DAF8A;
      color: var(--color-white);
      box-shadow: 0 0 20px rgba(61, 175, 138, 0.35), 0 0 40px rgba(89, 146, 236, 0.15);
      transform: translateY(-1px);
    }

    .cta-text {
      position: relative;
      z-index: 1;
    }

    /* Hamburger */
    .hamburger {
      display: none;
      flex-direction: column;
      gap: 5px;
      background: transparent;
      border: none;
      cursor: pointer;
      padding: 8px;
      margin-left: auto;
    }

    .hamburger span {
      display: block;
      width: 24px;
      height: 1.5px;
      background: rgba(255, 255, 255, 0.7);
      transition: all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
      transform-origin: center;
    }

    .hamburger.open span:nth-child(1) { transform: translateY(6.5px) rotate(45deg); }
    .hamburger.open span:nth-child(2) { opacity: 0; transform: scaleX(0); }
    .hamburger.open span:nth-child(3) { transform: translateY(-6.5px) rotate(-45deg); }

    /* Mobile Menu */
    .mobile-menu {
      position: fixed;
      top: 0; left: 0;
      width: 100%; height: 100%;
      background: rgba(11, 15, 25, 0.97);
      backdrop-filter: blur(24px);
      -webkit-backdrop-filter: blur(24px);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 32px;
      opacity: 0;
      visibility: hidden;
      pointer-events: none;
      transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
      z-index: -1;
    }

    .mobile-menu.open {
      opacity: 1;
      visibility: visible;
      pointer-events: all;
      z-index: 9989;
    }

    .mobile-menu ul {
      list-style: none;
      padding: 0; margin: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 12px;
    }

    .mobile-menu li {
      opacity: 0;
      transform: translateY(20px);
      transition: all 0.4s ease;
    }

    .mobile-menu.open li {
      opacity: 1;
      transform: translateY(0);
    }

    .mobile-link {
      font-family: var(--font-cyber);
      font-size: 1.8rem;
      font-weight: 700;
      letter-spacing: 6px;
      color: rgba(255, 255, 255, 0.8);
      text-decoration: none;
      display: flex;
      align-items: center;
      gap: 16px;
      transition: all 0.3s ease;
    }

    .mobile-link:hover {
      color: #3DAF8A;
      text-shadow: 0 0 20px rgba(61, 175, 138, 0.5);
      transform: translateX(8px);
    }

    .mobile-index {
      font-family: var(--font-mono);
      font-size: 0.75rem;
      color: rgba(61, 175, 138, 0.6);
      letter-spacing: 2px;
    }

    .mobile-cta {
      font-family: var(--font-cyber);
      font-size: 0.9rem;
      letter-spacing: 3px;
      padding: 14px 36px;
      background: linear-gradient(135deg, #3DAF8A, #5992EC);
      color: white;
      text-decoration: none;
      border-radius: 4px;
      transition: all 0.3s ease;
    }

    .mobile-cta:hover {
      transform: scale(1.05);
      box-shadow: 0 0 30px rgba(61, 175, 138, 0.5);
    }

    @media (max-width: 900px) {
      .nav-links, .nav-cta { display: none; }
      .hamburger { display: flex; }
    }

    @media (max-width: 480px) {
      .logo-text { display: none; }
    }
  `],
  standalone: false
})
export class Navbar {
  isScrolled = false;
  isHidden = false;
  mobileOpen = false;
  activeSection = 'hero';
  private lastScrollY = 0;

  navLinks = [
    { id: 'story',    href: '#story',    label: 'STORY' },
    { id: 'team',     href: '#team',     label: 'TEAM' },
    { id: 'tech',     href: '#tech',     label: 'TECH' },
    { id: 'projects', href: '#projects', label: 'WORK' },
    { id: 'vision',   href: '#vision',   label: 'VISION' },
  ];

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    const currentY = window.scrollY;
    this.isScrolled = currentY > 60;
    this.isHidden = currentY > this.lastScrollY + 10 && currentY > 120;
    if (currentY < this.lastScrollY - 10) this.isHidden = false;
    this.lastScrollY = currentY;

    // Active section tracking
    const sections = ['hero', 'story', 'team', 'tech', 'projects', 'vision', 'contact'];
    for (const id of sections.slice().reverse()) {
      const el = document.getElementById(id);
      if (el && el.getBoundingClientRect().top <= 120) {
        this.activeSection = id;
        break;
      }
    }
  }

  scrollTo(target: string, event: Event): void {
    event.preventDefault();
    const el = document.querySelector(target);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    this.mobileOpen = false;
  }

  mobileNav(target: string, event: Event): void {
    this.scrollTo(target, event);
    this.mobileOpen = false;
  }
}
