import { Component, ElementRef, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'feature-vision',
  template: `
    <section class="vision-section" id="vision">
      <div class="glow-bg"></div>
      
      <div class="vision-container">
        <span class="hud-tag">[ CORE_PHILOSOPHY_SYSTEM ]</span>
        
        <div class="phrases-wrapper">
          <div class="phrase-block phrase-node-{{i}}" 
               *ngFor="let phrase of phrases; let i = index" 
               [class.active]="activePhrases[i]">
            <p class="reveal-text" [attr.data-text]="phrase">{{ phrase }}</p>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .vision-section {
      position: relative;
      background-color: #0b0f19;
      padding: 160px 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      width: 100%;
    }

    .glow-bg {
      position: absolute;
      width: 600px; height: 600px;
      background: radial-gradient(circle, rgba(61, 175, 138, 0.05) 0%, rgba(89, 146, 236, 0.03) 50%, transparent 100%);
      filter: blur(120px);
      pointer-events: none;
    }

    .vision-container {
      max-width: 950px;
      text-align: center;
      z-index: 2;
    }

    .hud-tag {
      font-family: var(--font-mono);
      font-size: 0.8rem;
      color: var(--color-cyan);
      letter-spacing: 4px;
      margin-bottom: 56px;
      display: block;
      text-shadow: 0 0 8px rgba(61, 175, 138, 0.3);
    }

    .phrases-wrapper {
      display: flex;
      flex-direction: column;
      gap: 48px;
    }

    .phrase-block {
      opacity: 0.12;
      filter: blur(8px);
      transform: translateY(32px);
      transition: all 1.2s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .phrase-block.active {
      opacity: 1;
      filter: blur(0px);
      transform: translateY(0);
    }

    .reveal-text {
      font-family: var(--font-cyber);
      font-size: 2.8rem;
      font-weight: 800;
      color: var(--color-white);
      line-height: 1.3;
      text-transform: uppercase;
      letter-spacing: 2px;
      position: relative;
      display: inline-block;
    }

    .phrase-block.active .reveal-text {
      animation: flicker-text 1.5s ease-out;
    }

    @keyframes flicker-text {
      0%, 100% { opacity: 1; }
      15% { opacity: 0.8; }
      17% { opacity: 1; }
      30% { opacity: 0.6; }
      35% { opacity: 1; }
    }

    @media (max-width: 768px) {
      .reveal-text {
        font-size: 1.5rem;
        letter-spacing: 1px;
      }
      .phrases-wrapper {
        gap: 32px;
      }
    }
  `],
  standalone: false
})
export class Vision implements OnInit, OnDestroy {
  phrases: string[] = [
    'We believe software should feel alive.',
    'We don’t just build apps.',
    'We build experiences.'
  ];
  activePhrases: boolean[] = [false, false, false];
  private observer?: IntersectionObserver;

  ngOnInit(): void {
    this.setupIntersectionObserver();
  }

  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  private setupIntersectionObserver(): void {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.3
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const classes = entry.target.className;
          if (classes.includes('phrase-node-0')) this.activePhrases[0] = true;
          if (classes.includes('phrase-node-1')) this.activePhrases[1] = true;
          if (classes.includes('phrase-node-2')) this.activePhrases[2] = true;
        }
      });
    }, options);

    setTimeout(() => {
      const elements = document.querySelectorAll('.phrase-block');
      elements.forEach((el) => this.observer?.observe(el));
    }, 200);
  }
}
