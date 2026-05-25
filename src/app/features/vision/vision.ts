import { Component, ElementRef, OnInit, OnDestroy, AfterViewInit, ViewChild, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'feature-vision',
  template: `
    <section class="vision-section" id="vision">
      <div class="glow-bg"></div>
      
      <div class="vision-container">
        <span class="hud-tag">[ CORE_PHILOSOPHY_SYSTEM ]</span>
        
        <div class="phrases-wrapper">
          <div class="phrase-block phrase-node-{{i}}" 
               *ngFor="let phrase of phrases; let i = index">
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
      will-change: transform, opacity;
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
      transition: opacity 0.8s ease, filter 0.8s ease, transform 0.8s ease;
      will-change: opacity, filter, transform;
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
      line-height: 1.3;
      text-transform: uppercase;
      letter-spacing: 2px;
      position: relative;
      display: inline-block;
      background: linear-gradient(135deg, #ffffff 40%, rgba(255, 255, 255, 0.4) 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      user-select: none;
    }

    /* Kinetic shifting rainbow gradient highlight for the final phrase */
    .phrase-node-2 .reveal-text {
      background: linear-gradient(90deg, #3DAF8A, #5992EC, #F5A623, #3DAF8A);
      background-size: 300% 100%;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      animation: gradient-shift 8s infinite linear;
      filter: drop-shadow(0 0 15px rgba(89, 146, 236, 0.15));
    }

    @keyframes gradient-shift {
      0% { background-position: 0% 50%; }
      100% { background-position: 300% 50%; }
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
export class Vision implements OnInit, OnDestroy, AfterViewInit {
  phrases: string[] = [
    'We believe software should feel alive.',
    'We don’t just build apps.',
    'We build experiences.'
  ];
  private isBrowser = false;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {}

  ngAfterViewInit(): void {
    if (!this.isBrowser) return;

    // 1. Tag reveal
    gsap.from('.vision-section .hud-tag', {
      y: 20,
      opacity: 0,
      duration: 1,
      scrollTrigger: {
        trigger: '.vision-section .hud-tag',
        start: 'top 85%'
      }
    });

    // 2. Custom hacker letter scramble sequence reveal per phrase
    const blocks = document.querySelectorAll('.phrase-block');
    blocks.forEach((block, blockIndex) => {
      const textEl = block.querySelector('.reveal-text') as HTMLElement;
      if (!textEl) return;
      const originalText = textEl.textContent || '';
      
      // Cyber characters list for scrambling
      const scrambleChars = 'XYZ0123456789#%&@!_[]+<>';

      ScrollTrigger.create({
        trigger: block,
        start: 'top 80%',
        onEnter: () => {
          block.classList.add('active');

          const scrambleObj = { progress: 0 };
          gsap.to(scrambleObj, {
            progress: 1,
            duration: 1.8,
            ease: 'power2.out',
            onUpdate: () => {
              const currentResolvedLen = Math.floor(scrambleObj.progress * originalText.length);
              let tempResult = '';
              
              for (let i = 0; i < originalText.length; i++) {
                if (i < currentResolvedLen) {
                  // Keep correct resolved character
                  tempResult += originalText[i];
                } else if (originalText[i] === ' ') {
                  // Keep spaces clean
                  tempResult += ' ';
                } else if (i === currentResolvedLen || Math.random() < 0.3) {
                  // Scramble with futuristic hacker symbols
                  tempResult += scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
                } else {
                  // Hidden buffer using non-breaking spaces
                  tempResult += '&nbsp;';
                }
              }
              
              textEl.innerHTML = tempResult;
            },
            onComplete: () => {
              textEl.textContent = originalText;
            }
          });
        }
      });
    });
  }
}
