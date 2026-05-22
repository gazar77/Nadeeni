import { Component, ElementRef, HostListener, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'feature-story-timeline',
  template: `
    <section class="timeline-section" id="story">
      <div class="hud-background-grid"></div>
      
      <!-- Ambient backing lights -->
      <div class="glow-backdrop purple"></div>
      <div class="glow-backdrop cyan"></div>

      <div class="timeline-header">
        <span class="hud-category">[ SYSTEM_CHRONOLOGY ]</span>
        <h2 class="section-title">The Nadeeni Chronicle</h2>
        <div class="glowing-divider"></div>
      </div>

      <div class="timeline-container">
        <!-- Interactive Vertical Tracking Laser -->
        <div class="vertical-track">
          <div class="tracker-laser" [style.height.%]="scrollPercent"></div>
        </div>

        <!-- Timeline Chapter 1 -->
        <div class="timeline-item chapter-node-0" [class.visible]="activeChapters[0]">
          <div class="timeline-marker" [class.active]="activeChapters[0]">
            <span class="marker-glow"></span>
            <span class="number">01</span>
          </div>
          <div class="timeline-card-wrapper left">
            <shared-glow-frame theme="purple" [showScanner]="activeChapters[0]" [enableHover]="true">
              <span class="chapter-date">2023 — THE SPARKS</span>
              <h3 class="chapter-title">Started as University Students</h3>
              <p class="chapter-desc">
                Five eager minds connected by a shared fascination for technology. We met in halls of academia, discussing algorithms, clean structures, and questioning why software couldn't feel more alive.
              </p>
              <div class="tech-pill-row">
                <span class="tech-pill">Collaboration</span>
                <span class="tech-pill">Academia</span>
                <span class="tech-pill">Algorithms</span>
              </div>
            </shared-glow-frame>
          </div>
        </div>

        <!-- Timeline Chapter 2 -->
        <div class="timeline-item chapter-node-1" [class.visible]="activeChapters[1]">
          <div class="timeline-marker" [class.active]="activeChapters[1]">
            <span class="marker-glow"></span>
            <span class="number">02</span>
          </div>
          <div class="timeline-card-wrapper right">
            <shared-glow-frame theme="cyan" [showScanner]="activeChapters[1]" [enableHover]="true">
              <span class="chapter-date">2024 — TOOLKIT EXPANSION</span>
              <h3 class="chapter-title">Mastering Modern Technology</h3>
              <p class="chapter-desc">
                We realized academic lectures were just the beginning. We went deep into real-world tech stacks: exploring Flutter for responsive mobile applications, mastering Angular modules, building robust Spring Boot and .NET microservices, and researching cloud APIs.
              </p>
              <div class="tech-pill-row">
                <span class="tech-pill">TypeScript</span>
                <span class="tech-pill">Dart</span>
                <span class="tech-pill">Java</span>
                <span class="tech-pill">C#</span>
              </div>
            </shared-glow-frame>
          </div>
        </div>

        <!-- Timeline Chapter 3 -->
        <div class="timeline-item chapter-node-2" [class.visible]="activeChapters[2]">
          <div class="timeline-marker" [class.active]="activeChapters[2]">
            <span class="marker-glow"></span>
            <span class="number">03</span>
          </div>
          <div class="timeline-card-wrapper left">
            <shared-glow-frame theme="purple" [showScanner]="activeChapters[2]" [enableHover]="true">
              <span class="chapter-date">2025 — CONVERGENCE</span>
              <h3 class="chapter-title">Synthesizing Design & Code</h3>
              <p class="chapter-desc">
                A powerful synergy emerged. We began combining Yahia & Mohamed Mostafa's Flutter frameworks, Mohamed Bahaa's fluid UI/UX designs, Mostafa Mahmoud's backend architectural engines, and Youssef Medhat's system integrations.
              </p>
              <div class="tech-pill-row">
                <span class="tech-pill">Figma</span>
                <span class="tech-pill">SQL</span>
                <span class="tech-pill">FastAPI</span>
                <span class="tech-pill">Synergy</span>
              </div>
            </shared-glow-frame>
          </div>
        </div>

        <!-- Timeline Chapter 4 -->
        <div class="timeline-item chapter-node-3" [class.visible]="activeChapters[3]">
          <div class="timeline-marker" [class.active]="activeChapters[3]">
            <span class="marker-glow"></span>
            <span class="number">04</span>
          </div>
          <div class="timeline-card-wrapper right">
            <shared-glow-frame theme="cyan" [showScanner]="activeChapters[3]" [enableHover]="true">
              <span class="chapter-date">2026 — GENESIS</span>
              <h3 class="chapter-title">Becoming Nadeeni</h3>
              <p class="chapter-desc">
                With the addition of intelligent AI orchestration and advanced modular frontend layers, we formalized our alliance. **Nadeeni** was born. Five minds unified under a single vision: crafting immersive, breathtaking software that leaves an impact.
              </p>
              <div class="tech-pill-row">
                <span class="tech-pill">AI Agents</span>
                <span class="tech-pill">Modern Web</span>
                <span class="tech-pill">Startup</span>
              </div>
            </shared-glow-frame>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .timeline-section {
      position: relative;
      background-color: var(--color-bg-dark);
      padding: 120px 24px;
      overflow: hidden;
      width: 100%;
    }

    .hud-background-grid {
      position: absolute;
      top: 0; left: 0;
      width: 100%; height: 100%;
      background-image: 
        linear-gradient(rgba(255, 255, 255, 0.006) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255, 255, 255, 0.006) 1px, transparent 1px);
      background-size: 50px 50px;
      pointer-events: none;
      z-index: 0;
    }

    .glow-backdrop {
      position: absolute;
      width: 500px;
      height: 500px;
      border-radius: 50%;
      filter: blur(140px);
      opacity: 0.07;
      pointer-events: none;
      z-index: 1;
    }

    .glow-backdrop.purple {
      top: 25%; left: -200px;
      background: var(--color-purple);
    }

    .glow-backdrop.cyan {
      bottom: 25%; right: -200px;
      background: var(--color-cyan);
    }

    .timeline-header {
      text-align: center;
      margin-bottom: 96px;
      position: relative;
      z-index: 2;
    }

    .hud-category {
      font-family: var(--font-mono);
      font-size: 0.8rem;
      color: var(--color-cyan);
      letter-spacing: 4px;
      text-shadow: 0 0 8px rgba(61, 175, 138, 0.4);
    }

    .section-title {
      font-family: var(--font-cyber);
      font-size: 2.8rem;
      font-weight: 800;
      letter-spacing: 4px;
      margin-top: 12px;
      color: var(--color-white);
      text-transform: uppercase;
    }

    .glowing-divider {
      width: 120px;
      height: 2px;
      background: linear-gradient(90deg, transparent, var(--color-cyan), var(--color-purple), transparent);
      margin: 20px auto 0 auto;
      box-shadow: 0 0 10px rgba(61, 175, 138, 0.5);
    }

    .timeline-container {
      position: relative;
      max-width: 1100px;
      margin: 0 auto;
      z-index: 2;
    }

    /* Laser Scroll Track */
    .vertical-track {
      position: absolute;
      left: 50%;
      top: 0;
      bottom: 0;
      width: 2px;
      background: rgba(255, 255, 255, 0.05);
      transform: translateX(-50%);
      z-index: 1;
    }

    .tracker-laser {
      position: absolute;
      top: 0; left: 0;
      width: 100%;
      background: linear-gradient(to bottom, var(--color-purple), var(--color-cyan));
      box-shadow: 0 0 12px var(--color-cyan), 0 0 20px var(--color-purple);
      border-radius: 1px;
      transition: height 0.1s ease-out;
    }

    /* Timeline Items */
    .timeline-item {
      position: relative;
      width: 100%;
      margin-bottom: 90px;
      display: flex;
      justify-content: flex-end;
      min-height: 200px;
      transition: all 1s cubic-bezier(0.16, 1, 0.3, 1);
      opacity: 0;
    }

    .timeline-item:nth-child(even) {
      justify-content: flex-start;
    }

    .timeline-item.visible {
      opacity: 1;
    }

    /* Markers */
    .timeline-marker {
      position: absolute;
      left: 50%;
      top: 30px;
      width: 44px;
      height: 44px;
      border-radius: 50%;
      background: var(--color-bg-dark);
      border: 2px solid rgba(255, 255, 255, 0.1);
      transform: translate(-50%, 0);
      z-index: 3;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .timeline-marker.active {
      border-color: var(--color-cyan);
      box-shadow: 0 0 15px rgba(61, 175, 138, 0.4);
    }

    .marker-glow {
      position: absolute;
      width: 100%; height: 100%;
      border-radius: 50%;
      background: transparent;
      transition: all 0.5s ease;
    }

    .timeline-marker.active .marker-glow {
      background: radial-gradient(circle, rgba(61, 175, 138, 0.2) 0%, transparent 70%);
      animation: pulse-marker 2s infinite ease-in-out;
    }

    .number {
      font-family: var(--font-mono);
      font-size: 0.85rem;
      color: rgba(255, 255, 255, 0.5);
      font-weight: bold;
      transition: color 0.3s ease;
    }

    .timeline-marker.active .number {
      color: var(--color-cyan);
    }

    /* Timeline Cards */
    .timeline-card-wrapper {
      width: 45%;
      position: relative;
      transition: transform 1s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .timeline-item.chapter-node-0 .timeline-card-wrapper { transform: translateX(-40px); }
    .timeline-item.chapter-node-1 .timeline-card-wrapper { transform: translateX(40px); }
    .timeline-item.chapter-node-2 .timeline-card-wrapper { transform: translateX(-40px); }
    .timeline-item.chapter-node-3 .timeline-card-wrapper { transform: translateX(40px); }

    .timeline-item.visible .timeline-card-wrapper {
      transform: translateX(0) !important;
    }

    .chapter-date {
      font-family: var(--font-mono);
      font-size: 0.75rem;
      color: var(--color-cyan);
      letter-spacing: 2px;
      display: block;
      margin-bottom: 8px;
    }
    
    .timeline-item:nth-child(odd) .chapter-date {
      color: var(--color-purple);
    }

    .chapter-title {
      font-family: var(--font-cyber);
      font-size: 1.5rem;
      font-weight: 700;
      color: var(--color-white);
      margin-bottom: 14px;
    }

    .chapter-desc {
      font-size: 0.95rem;
      line-height: 1.6;
      color: var(--color-white);
      opacity: 0.8;
      margin-bottom: 20px;
    }

    .tech-pill-row {
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
    }

    .tech-pill {
      font-family: var(--font-mono);
      font-size: 0.75rem;
      padding: 4px 12px;
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 20px;
      color: rgba(255, 255, 255, 0.7);
    }

    @keyframes pulse-marker {
      0%, 100% { transform: scale(1); opacity: 0.7; }
      50% { transform: scale(1.25); opacity: 1; }
    }

    @media (max-width: 768px) {
      .vertical-track {
        left: 20px;
      }
      .timeline-marker {
        left: 20px;
      }
      .timeline-card-wrapper {
        width: calc(100% - 60px);
        margin-left: 60px !important;
        transform: translateX(30px) !important;
      }
      .timeline-item {
        justify-content: flex-start !important;
        margin-bottom: 60px;
      }
      .section-title {
        font-size: 2rem;
      }
    }
  `],
  standalone: false
})
export class StoryTimeline implements OnInit, OnDestroy {
  scrollPercent = 0;
  activeChapters: boolean[] = [false, false, false, false];
  private observer?: IntersectionObserver;

  ngOnInit(): void {
    this.calculateScroll();
    this.setupIntersectionObserver();
  }

  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  @HostListener('window:scroll')
  onWindowScroll(): void {
    this.calculateScroll();
  }

  private calculateScroll(): void {
    const timelineEl = document.getElementById('story');
    if (!timelineEl) return;

    const rect = timelineEl.getBoundingClientRect();
    const timelineHeight = rect.height;
    
    // Calculate how far down the timeline element has scrolled relative to the viewport
    const scrolled = window.innerHeight - rect.top;
    
    if (scrolled < 0) {
      this.scrollPercent = 0;
    } else if (scrolled > timelineHeight) {
      this.scrollPercent = 100;
    } else {
      this.scrollPercent = (scrolled / timelineHeight) * 100;
    }
  }

  private setupIntersectionObserver(): void {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.2 // Trigger when 20% of the element is visible
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const classes = entry.target.className;
          if (classes.includes('chapter-node-0')) this.activeChapters[0] = true;
          if (classes.includes('chapter-node-1')) this.activeChapters[1] = true;
          if (classes.includes('chapter-node-2')) this.activeChapters[2] = true;
          if (classes.includes('chapter-node-3')) this.activeChapters[3] = true;
        }
      });
    }, options);

    // Track each timeline item element
    setTimeout(() => {
      const items = document.querySelectorAll('.timeline-item');
      items.forEach((item) => this.observer?.observe(item));
    }, 200);
  }
}
