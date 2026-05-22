import { Component } from '@angular/core';

@Component({
  selector: 'feature-footer',
  template: `
    <footer class="footer-container">
      <!-- Neon separator line -->
      <div class="glowing-divider"></div>
      
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
      padding: 48px 24px;
      width: 100%;
      overflow: hidden;
      z-index: 10;
    }

    .glowing-divider {
      width: 100%;
      height: 1px;
      background: linear-gradient(90deg, transparent, rgba(61, 175, 138, 0.4), rgba(89, 146, 236, 0.4), transparent);
      box-shadow: 0 0 10px rgba(61, 175, 138, 0.2);
      margin-bottom: 40px;
    }

    .footer-content {
      max-width: 1200px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 32px;
      
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

      &:hover {
        color: var(--color-cyan);
        text-shadow: 0 0 5px var(--color-cyan);
        transform: translateY(-1px);
      }
    }
  `],
  standalone: false
})
export class Footer {
  scrollTo(target: string, event: Event): void {
    event.preventDefault();
    const element = document.querySelector(target);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
