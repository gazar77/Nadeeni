import { Component } from '@angular/core';

interface Project {
  id: string;
  name: string;
  category: string;
  tagline: string;
  desc: string;
  technologies: string[];
  mockupType: 'mobile' | 'web';
  mockupContent: {
    status: string;
    screenTitle: string;
    metrics: string[];
  };
}

@Component({
  selector: 'feature-projects',
  template: `
    <section class="projects-section" id="projects">
      <div class="hud-grid-background"></div>
      <div class="glow-radial purple"></div>
      <div class="glow-radial cyan"></div>

      <div class="projects-header">
        <span class="hud-category-tag">[ ACTIVE_CASE_STUDIES_INDEX ]</span>
        <h2 class="section-title">PROJECT SHOWCASE</h2>
        <p class="section-subtitle">
          Immersion into custom software systems engineered from initial design wireframes to production deployment.
        </p>
        <div class="divider"></div>
      </div>

      <div class="projects-list">
        <!-- Render glassmorphic showcase cards -->
        <div class="project-card-wrapper" *ngFor="let p of projects">
          <shared-glass-card [isHoverable]="true">
            <div class="project-layout">
              
              <!-- Case Study Information -->
              <div class="project-details">
                <span class="project-tag">[ {{ p.category }} ]</span>
                <h3 class="project-name">{{ p.name }}</h3>
                <h4 class="project-tagline">“{{ p.tagline }}”</h4>
                <p class="project-description">{{ p.desc }}</p>
                
                <!-- Skill badges -->
                <div class="tech-pills">
                  <span class="pill" *ngFor="let tech of p.technologies">
                    <span class="dot"></span>
                    {{ tech }}
                  </span>
                </div>
                
                <!-- Interactive Action button -->
                <button class="cyber-button glow-purple">
                  VIEW DEPLOYMENT
                  <svg xmlns="http://www.w3.org/2000/svg" height="18" viewBox="0 -960 960 960" width="18" fill="currentColor">
                    <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h560v-280h80v280q0 33-23.5 56.5T760-120H200Zm188-212-56-56 372-372H560v-80h280v280h-80v-144L388-332Z"/>
                  </svg>
                </button>
              </div>

              <!-- Cinematic Wireframe/Dashboard Mockup (Self-contained, Pure SCSS visual design) -->
              <div class="project-mockup" [ngClass]="p.mockupType">
                <!-- Outer Bezel Container -->
                <div class="bezel-frame">
                  
                  <!-- HUD Top Header -->
                  <div class="mockup-header">
                    <span class="status-indicator"></span>
                    <span class="mockup-title-text">{{ p.mockupContent.screenTitle }}</span>
                    <div class="header-dots" *ngIf="p.mockupType === 'web'">
                      <span></span><span></span><span></span>
                    </div>
                  </div>

                  <!-- Dynamic Mockup Visuals -->
                  <div class="mockup-body">
                    <!-- Tech metrics block inside dashboard -->
                    <div class="metric-block" *ngFor="let val of p.mockupContent.metrics">
                      <span class="metric-label">[ {{ val.split(':')[0] }} ]</span>
                      <span class="metric-value">{{ val.split(':')[1] }}</span>
                      <div class="metric-bar">
                        <div class="metric-bar-fill" [style.width]="(i * 12 + 62) + '%'" *ngFor="let i of [1]"></div>
                      </div>
                    </div>
                    
                    <!-- Futuristic geometric HUD grid -->
                    <div class="hud-circle-scanner"></div>
                  </div>
                  
                  <div class="mockup-footer">
                    <span>STATUS: {{ p.mockupContent.status }}</span>
                    <span>SECURE_NODE</span>
                  </div>

                </div>
              </div>

            </div>
          </shared-glass-card>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .projects-section {
      position: relative;
      background-color: #0c101b;
      padding: 120px 24px;
      overflow: hidden;
      width: 100%;
    }

    .hud-grid-background {
      position: absolute;
      top: 0; left: 0; width: 100%; height: 100%;
      background-image: 
        radial-gradient(rgba(255, 255, 255, 0.015) 1px, transparent 1px);
      background-size: 30px 30px;
      pointer-events: none;
      z-index: 0;
    }

    .glow-radial {
      position: absolute;
      width: 600px; height: 600px;
      border-radius: 50%;
      filter: blur(140px);
      opacity: 0.07;
      pointer-events: none;
      z-index: 1;
    }

    .glow-radial.purple {
      bottom: 10%; left: -250px;
      background: var(--color-purple);
    }

    .glow-radial.cyan {
      top: 15%; right: -250px;
      background: var(--color-cyan);
    }

    .projects-header {
      text-align: center;
      margin-bottom: 96px;
      position: relative;
      z-index: 2;
    }

    .hud-category-tag {
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

    .section-subtitle {
      font-size: 1.05rem;
      color: var(--color-white);
      opacity: 0.7;
      max-width: 650px;
      margin: 16px auto 0 auto;
      line-height: 1.6;
    }

    .divider {
      width: 120px;
      height: 2px;
      background: linear-gradient(90deg, transparent, var(--color-purple), var(--color-cyan), transparent);
      margin: 20px auto 0 auto;
      box-shadow: 0 0 8px var(--color-purple);
    }

    /* List Layout */
    .projects-list {
      max-width: 1100px;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      gap: 56px;
      position: relative;
      z-index: 2;
    }

    .project-card-wrapper {
      transition: all 0.4s ease;
    }

    .project-layout {
      display: grid;
      grid-template-columns: 1.1fr 0.9fr;
      gap: 40px;
      align-items: center;

      @media (max-width: 900px) {
        grid-template-columns: 1fr;
        gap: 32px;
      }
    }

    /* Left Details panel */
    .project-details {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
    }

    .project-tag {
      font-family: var(--font-mono);
      font-size: 0.75rem;
      color: var(--color-cyan);
      letter-spacing: 2px;
      margin-bottom: 12px;
    }

    .project-name {
      font-family: var(--font-cyber);
      font-size: 2.2rem;
      font-weight: 800;
      color: var(--color-white);
      margin-bottom: 8px;
      letter-spacing: 1px;
    }

    .project-tagline {
      font-size: 1.05rem;
      font-weight: 400;
      font-style: italic;
      color: var(--color-purple);
      margin-bottom: 16px;
    }

    .project-description {
      font-size: 0.95rem;
      line-height: 1.6;
      color: var(--color-white);
      opacity: 0.8;
      margin-bottom: 24px;
    }

    /* Skills */
    .tech-pills {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      margin-bottom: 32px;
    }

    .pill {
      font-family: var(--font-mono);
      font-size: 0.75rem;
      padding: 4px 12px;
      background: rgba(255, 255, 255, 0.02);
      border: 1px solid rgba(255, 255, 255, 0.06);
      border-radius: 20px;
      color: rgba(255, 255, 255, 0.75);
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .dot {
      width: 4px; height: 4px;
      border-radius: 50%;
      background-color: var(--color-cyan);
    }

    /* Mockups (Pure CSS futuristic representation) */
    .project-mockup {
      width: 100%;
      display: flex;
      justify-content: center;
      
      &.web .bezel-frame {
        width: 100%;
        max-width: 420px;
        height: 280px;
      }
      
      &.mobile .bezel-frame {
        width: 200px;
        height: 380px;
        border-radius: 24px;
        
        .mockup-header {
          justify-content: center;
          padding: 12px;
        }
      }
    }

    .bezel-frame {
      background: #06090e;
      border: 1.5px solid rgba(255, 255, 255, 0.1);
      border-radius: 10px;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      box-shadow: 0 15px 40px rgba(0, 0, 0, 0.5);
      position: relative;
      transition: all 0.5s ease;
      width: 100%;
    }

    .project-card-wrapper:hover .bezel-frame {
      border-color: rgba(61, 175, 138, 0.35);
      box-shadow: 0 15px 45px rgba(61, 175, 138, 0.15);
    }

    .mockup-header {
      background: rgba(255, 255, 255, 0.02);
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
      padding: 8px 16px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      position: relative;
    }

    .status-indicator {
      width: 6px; height: 6px;
      background: var(--color-cyan);
      border-radius: 50%;
      box-shadow: 0 0 8px var(--color-cyan);
      animation: blink-dot 1.5s infinite alternate;
    }

    .mockup-title-text {
      font-family: var(--font-mono);
      font-size: 0.65rem;
      color: rgba(255, 255, 255, 0.45);
      letter-spacing: 1px;
    }

    .header-dots {
      display: flex;
      gap: 4px;
      span {
        width: 5px; height: 5px;
        background: rgba(255, 255, 255, 0.2);
        border-radius: 50%;
      }
    }

    .mockup-body {
      flex: 1;
      padding: 16px;
      display: flex;
      flex-direction: column;
      gap: 12px;
      justify-content: center;
      position: relative;
      background-image: 
        radial-gradient(rgba(89, 146, 236, 0.04) 0%, transparent 80%),
        linear-gradient(rgba(255, 255, 255, 0.005) 1px, transparent 1px);
      background-size: 100% 100%, 15px 15px;
    }

    .metric-block {
      display: flex;
      flex-direction: column;
      gap: 4px;
      z-index: 2;
    }

    .metric-label {
      font-family: var(--font-mono);
      font-size: 0.6rem;
      color: rgba(255, 255, 255, 0.4);
    }

    .metric-value {
      font-family: var(--font-cyber);
      font-size: 0.85rem;
      color: var(--color-white);
      font-weight: bold;
    }

    .metric-bar {
      width: 100%;
      height: 3px;
      background: rgba(255, 255, 255, 0.05);
      border-radius: 1px;
      overflow: hidden;
    }

    .metric-bar-fill {
      height: 100%;
      background: linear-gradient(90deg, var(--color-purple), var(--color-cyan));
      border-radius: 1px;
    }

    .hud-circle-scanner {
      position: absolute;
      right: 12px;
      bottom: 12px;
      width: 60px; height: 60px;
      border: 1px dashed rgba(61, 175, 138, 0.2);
      border-radius: 50%;
      z-index: 1;
      animation: spin-hud 15s infinite linear;
      display: flex;
      align-items: center;
      justify-content: center;
      
      &::after {
        content: '';
        width: 40px; height: 40px;
        border: 1px dotted rgba(89, 146, 236, 0.2);
        border-radius: 50%;
      }
    }

    .mockup-footer {
      background: rgba(255, 255, 255, 0.01);
      border-top: 1px solid rgba(255, 255, 255, 0.05);
      padding: 6px 12px;
      display: flex;
      justify-content: space-between;
      font-family: var(--font-mono);
      font-size: 0.6rem;
      color: rgba(255, 255, 255, 0.3);
    }

    @keyframes blink-dot {
      from { opacity: 0.3; }
      to { opacity: 1; }
    }

    @keyframes spin-hud {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
  `],
  standalone: false
})
export class Projects {
  projects: Project[] = [
    {
      id: 'pulse-care',
      name: 'Pulse Care',
      category: 'Healthcare AI Application',
      tagline: 'Predictive bio-analytics at 120Hz native liquid layouts.',
      desc: 'Pulse Care delivers real-time diagnostic indicators by orchestrating FastAPIs local AI agents with 120Hz liquid-smooth Flutter modules. Built with an optimized reactive state engine, it bridges user biometrics instantly with cloud telemetry portals.',
      technologies: ['Flutter', 'FastAPI', 'AI Integration', 'REST APIs', 'SQL'],
      mockupType: 'mobile',
      mockupContent: {
        status: 'SECURE_ACTIVE',
        screenTitle: 'BIOMETRIC_FEED',
        metrics: [
          'NEURAL_LAG: 14ms',
          'SYS_ACCURACY: 99.4%',
          'BATTERY_TEMP: 32°C'
        ]
      }
    },
    {
      id: 'aura-designer',
      name: 'Aura Designer',
      category: 'Design Systems Orchestrator',
      tagline: 'Generates UI layouts instantly from Figma semantic models.',
      desc: 'Transforms complex vector tokens in Figma directly into clean web interfaces. Empowered by modern frontend compilers, it produces high-blur glassmorphic modules, styling hierarchies, and reactive states, cutting prototyping-to-production times by 80%.',
      technologies: ['Figma', 'Angular', 'React', 'TypeScript', 'Next.js'],
      mockupType: 'web',
      mockupContent: {
        status: 'SYNCED_LIVE',
        screenTitle: 'AURA_CORE_STUDIO',
        metrics: [
          'SEMANTIC_TOKENS: 4,022',
          'BUNDLE_SIZE: 12.4kb',
          'FIDELITY_INDEX: 1.00'
        ]
      }
    },
    {
      id: 'horizon-ledger',
      name: 'Horizon Ledger',
      category: 'Financial Core Ecosystem',
      tagline: 'Secure transactional ledger handling 50k requests/sec.',
      desc: 'Horizon Ledger leverages a highly parallel Spring Boot infrastructure paired with modular .NET pipelines to build an enterprise-level financial ledger. It integrates robust system encryption models and database optimizations for flawless execution.',
      technologies: ['Spring Boot', '.NET', 'C#', 'SQL Server', 'System Design'],
      mockupType: 'web',
      mockupContent: {
        status: 'SECURE_STABLE',
        screenTitle: 'HORIZON_LEDGER_SYSTEM',
        metrics: [
          'TRANSACTIONS_SEC: 52,800',
          'DB_LATENCY: 1.8ms',
          'SECURITY_HASH: SHA-512'
        ]
      }
    }
  ];
}
