import { Component, ElementRef, HostListener, QueryList, ViewChildren } from '@angular/core';

interface Member {
  id: string;
  name: string;
  role: string;
  desc: string;
  skills: string[];
  scanCode: string;
  image: string;
  theme: 'green' | 'blue' | 'gold';
  socials: {
    github?: string;
    linkedin?: string;
    email?: string;
    behance?: string;
    portfolio?: string;
  };
}

@Component({
  selector: 'feature-team',
  template: `
    <section class="team-section" id="team">
      <div class="hud-background-lines"></div>
      <div class="ambient-glow green"></div>
      <div class="ambient-glow blue"></div>
      <div class="ambient-glow gold"></div>

      <div class="team-header">
        <span class="hud-tag">[ CLASSIFIED_PERSONNEL_INDEX ]</span>
        <h2 class="section-title">THE BUILDERS</h2>
        <p class="section-subtitle">
          Five specialized minds collaborating to engineer futuristic digital architectures.
        </p>
        <div class="neon-line"></div>
      </div>

      <div class="team-grid">
        <div
          class="member-card"
          *ngFor="let m of members; let i = index"
          [attr.data-member]="m.id"
          [attr.data-theme]="m.theme"
          (mousemove)="onCardMouseMove($event, i)"
          (mouseleave)="onCardMouseLeave(i)"
          [style.transform]="cardTransforms[i]"
          [style.--card-theme-color]="themeColors[m.theme]"
          [style.--card-theme-rgb]="themeRgbs[m.theme]"
        >
          <!-- Holographic Dynamic Reflection overlay -->
          <div class="holographic-reflection"></div>

          <!-- Holographic Photo Container -->
          <div class="portrait-container">
            <!-- Grid Backdrop -->
            <div class="hud-grid-overlay"></div>

            <!-- Corner HUD decorations -->
            <div class="hud-corner tl"></div>
            <div class="hud-corner tr"></div>
            <div class="hud-corner bl"></div>
            <div class="hud-corner br"></div>

            <!-- Laser scanline -->
            <div class="hud-scanline"></div>

            <!-- Neon border frame -->
            <div class="neon-border"></div>

            <!-- Real Photo -->
            <div class="photo-wrapper">
              <img [src]="m.image" [alt]="m.name" class="member-photo" loading="lazy" />
              <div class="photo-overlay"></div>
              <div class="photo-vignette"></div>
            </div>

            <!-- Floating HUD data tags -->
            <div class="hud-status-bar">
              <span class="status-dot"></span>
              <span class="status-text">ONLINE</span>
            </div>

            <!-- Scanning Coordinate Tag -->
            <div class="coordinate-tag">{{ m.scanCode }}</div>

            <!-- Glitch lines effect -->
            <div class="glitch-lines"></div>
          </div>

          <!-- Info Card -->
          <div class="info-card">
            <span class="member-role">{{ m.role }}</span>
            <h3 class="member-name">{{ m.name }}</h3>

            <p class="member-desc">{{ m.desc }}</p>

            <!-- Technology Badges -->
            <div class="skills-container">
              <span class="skill-badge" *ngFor="let s of m.skills">
                <span class="badge-dot"></span>
                {{ s }}
              </span>
            </div>

            <!-- Cyber Social Links -->
            <div class="social-row">
              <a *ngIf="m.socials.github" [href]="m.socials.github" target="_blank" rel="noopener" class="social-icon" aria-label="GitHub">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
              </a>
              <a *ngIf="m.socials.linkedin" [href]="m.socials.linkedin" target="_blank" rel="noopener" class="social-icon" aria-label="LinkedIn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
              </a>
              <a *ngIf="m.socials.email" [href]="'mailto:' + m.socials.email" class="social-icon" aria-label="Email">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
              </a>
              <a *ngIf="m.socials.behance" [href]="m.socials.behance" target="_blank" rel="noopener" class="social-icon" aria-label="Behance">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-dasharray="" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10h-7M14 14h7a3.5 3.5 0 0 0-7 0zm-7 1.5h-3v-3h3a1.5 1.5 0 0 0 0-3h-3v-3h3a1.5 1.5 0 0 1 0 3 1.5 1.5 0 0 1 0 3zM15 7h5" /></svg>
              </a>
              <a *ngIf="m.socials.portfolio" [href]="m.socials.portfolio" target="_blank" rel="noopener" class="social-icon" aria-label="Portfolio">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .team-section {
      position: relative;
      background-color: #0c101b;
      padding: 140px 24px;
      overflow: hidden;
      width: 100%;
    }

    .hud-background-lines {
      position: absolute;
      top: 0; left: 0;
      width: 100%; height: 100%;
      background-image:
        radial-gradient(rgba(255, 255, 255, 0.012) 1px, transparent 1px);
      background-size: 40px 40px;
      pointer-events: none;
      z-index: 0;
    }

    .ambient-glow {
      position: absolute;
      border-radius: 50%;
      filter: blur(140px);
      opacity: 0.1;
      pointer-events: none;
      z-index: 1;
    }

    .ambient-glow.green {
      width: 600px; height: 600px;
      top: 5%; right: -200px;
      background: #3DAF8A;
      animation: shift-glow 14s infinite alternate ease-in-out;
    }

    .ambient-glow.blue {
      width: 500px; height: 500px;
      bottom: 5%; left: -150px;
      background: #5992EC;
      animation: shift-glow 18s infinite alternate ease-in-out reverse;
    }

    .ambient-glow.gold {
      width: 400px; height: 400px;
      top: 50%; left: 50%;
      transform: translate(-50%, -50%);
      background: #F5A623;
      animation: shift-glow 22s infinite alternate ease-in-out;
      opacity: 0.04;
    }

    @keyframes shift-glow {
      0%   { transform: translate(-5%, -5%) scale(1); }
      100% { transform: translate(5%, 5%) scale(1.15); }
    }

    .team-header {
      text-align: center;
      margin-bottom: 90px;
      position: relative;
      z-index: 2;
    }

    .hud-tag {
      font-family: var(--font-mono);
      font-size: 0.8rem;
      color: #3DAF8A;
      letter-spacing: 4px;
      text-shadow: 0 0 10px rgba(61, 175, 138, 0.5);
    }

    .section-title {
      font-family: var(--font-cyber);
      font-size: 3.2rem;
      font-weight: 900;
      letter-spacing: 8px;
      margin-top: 14px;
      color: var(--color-white);
      text-shadow: 0 0 20px rgba(255, 255, 255, 0.1);
    }

    .section-subtitle {
      font-size: 1.1rem;
      color: var(--color-white);
      opacity: 0.65;
      max-width: 600px;
      margin: 16px auto 0 auto;
      line-height: 1.7;
    }

    .neon-line {
      width: 200px;
      height: 2px;
      background: linear-gradient(90deg, transparent, #3DAF8A, #5992EC, #F5A623, transparent);
      margin: 28px auto 0 auto;
      box-shadow: 0 0 10px rgba(61, 175, 138, 0.4);
    }

    /* === Grid Layout === */
    .team-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 36px;
      max-width: 1400px;
      margin: 0 auto;
      position: relative;
      z-index: 2;
    }

    /* === Member Card === */
    .member-card {
      position: relative;
      transition: box-shadow 0.3s ease;
      transform-style: preserve-3d;
      will-change: transform;
      border-radius: 12px;
    }

    /* === Portrait Container === */
    .portrait-container {
      position: relative;
      width: 100%;
      height: 400px;
      border-radius: 10px;
      overflow: hidden;
      background-color: #060a14;
      margin-bottom: 24px;
      transition: all 0.4s ease;
    }

    /* === Real Photo === */
    .photo-wrapper {
      position: absolute;
      inset: 0;
      z-index: 2;
    }

    .member-photo {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center top;
      display: block;
      transition: all 0.5s ease;
      filter: saturate(0.85) contrast(1.05);
    }

    .member-card:hover .member-photo {
      filter: saturate(1.1) contrast(1.0) brightness(1.05);
      transform: scale(1.04);
    }

    .photo-overlay {
      position: absolute;
      inset: 0;
      background: linear-gradient(
        180deg,
        rgba(6, 10, 20, 0.05) 0%,
        rgba(6, 10, 20, 0.0) 40%,
        rgba(6, 10, 20, 0.65) 80%,
        rgba(6, 10, 20, 0.9) 100%
      );
      z-index: 3;
      transition: opacity 0.4s ease;
    }

    .photo-vignette {
      position: absolute;
      inset: 0;
      background:
        radial-gradient(ellipse at center, transparent 60%, rgba(var(--card-theme-rgb), 0.08) 100%);
      z-index: 4;
      transition: opacity 0.4s ease;
    }

    .member-card:hover .photo-overlay {
      background: linear-gradient(
        180deg,
        rgba(6, 10, 20, 0.0) 0%,
        rgba(6, 10, 20, 0.0) 30%,
        rgba(6, 10, 20, 0.5) 75%,
        rgba(6, 10, 20, 0.85) 100%
      );
    }

    /* === HUD Grid Overlay === */
    .hud-grid-overlay {
      position: absolute;
      inset: 0;
      background-image:
        linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px);
      background-size: 18px 18px;
      z-index: 5;
      pointer-events: none;
      opacity: 0.6;
      transition: opacity 0.4s ease;
    }

    .member-card:hover .hud-grid-overlay {
      opacity: 0.25;
    }

    /* === Neon Border === */
    .neon-border {
      position: absolute;
      inset: 0;
      border: 1.5px solid rgba(var(--card-theme-rgb), 0.2);
      border-radius: 10px;
      transition: all 0.4s ease;
      pointer-events: none;
      z-index: 10;
    }

    .member-card:hover .neon-border {
      border-color: rgba(var(--card-theme-rgb), 0.6);
      box-shadow:
        inset 0 0 20px rgba(var(--card-theme-rgb), 0.08),
        0 0 30px rgba(var(--card-theme-rgb), 0.15);
    }

    /* === HUD Corner Decorations === */
    .hud-corner {
      position: absolute;
      width: 16px; height: 16px;
      border-color: rgba(var(--card-theme-rgb), 0.5);
      border-style: solid;
      z-index: 10;
      transition: all 0.4s ease;
      pointer-events: none;
    }

    .hud-corner.tl { top: 8px; left: 8px; border-width: 2px 0 0 2px; }
    .hud-corner.tr { top: 8px; right: 8px; border-width: 2px 2px 0 0; }
    .hud-corner.bl { bottom: 8px; left: 8px; border-width: 0 0 2px 2px; }
    .hud-corner.br { bottom: 8px; right: 8px; border-width: 0 2px 2px 0; }

    .member-card:hover .hud-corner {
      width: 22px; height: 22px;
      border-color: rgba(var(--card-theme-rgb), 1);
      box-shadow: 0 0 8px rgba(var(--card-theme-rgb), 0.5);
    }

    /* === Laser Scanline === */
    .hud-scanline {
      position: absolute;
      top: 0; left: 0; width: 100%; height: 2px;
      background: linear-gradient(90deg, transparent, rgba(var(--card-theme-rgb), 0.7), transparent);
      box-shadow: 0 0 12px rgba(var(--card-theme-rgb), 0.5);
      animation: laser-sweep 4s linear infinite;
      z-index: 6;
      pointer-events: none;
    }

    @keyframes laser-sweep {
      0%   { top: 0%;   opacity: 0; }
      8%   { opacity: 0.9; }
      90%  { opacity: 0.8; }
      100% { top: 100%; opacity: 0; }
    }

    /* === HUD Status Bar === */
    .hud-status-bar {
      position: absolute;
      top: 14px;
      left: 14px;
      display: flex;
      align-items: center;
      gap: 6px;
      z-index: 8;
    }

    .status-dot {
      width: 6px; height: 6px;
      border-radius: 50%;
      background-color: rgba(var(--card-theme-rgb), 1);
      box-shadow: 0 0 6px rgba(var(--card-theme-rgb), 0.8);
      animation: status-blink 2s ease-in-out infinite;
    }

    @keyframes status-blink {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.4; }
    }

    .status-text {
      font-family: var(--font-mono);
      font-size: 0.6rem;
      color: rgba(var(--card-theme-rgb), 0.9);
      letter-spacing: 2px;
      text-shadow: 0 0 6px rgba(var(--card-theme-rgb), 0.5);
    }

    /* === Coordinate Tag === */
    .coordinate-tag {
      position: absolute;
      bottom: 12px;
      right: 12px;
      font-family: var(--font-mono);
      font-size: 0.6rem;
      color: rgba(255, 255, 255, 0.3);
      letter-spacing: 1px;
      z-index: 8;
    }

    /* === Glitch Lines === */
    .glitch-lines {
      position: absolute;
      inset: 0;
      z-index: 7;
      pointer-events: none;
      opacity: 0;
      transition: opacity 0.3s ease;
      background:
        repeating-linear-gradient(
          0deg,
          transparent,
          transparent 2px,
          rgba(var(--card-theme-rgb), 0.02) 2px,
          rgba(var(--card-theme-rgb), 0.02) 4px
        );
    }

    .member-card:hover .glitch-lines { opacity: 1; }

    /* === Info Card === */
    .info-card {
      position: relative;
      z-index: 2;
      padding: 0 4px;
    }

    .member-role {
      font-family: var(--font-mono);
      font-size: 0.72rem;
      color: rgba(var(--card-theme-rgb), 1);
      letter-spacing: 2px;
      text-transform: uppercase;
      display: block;
      margin-bottom: 6px;
      text-shadow: 0 0 8px rgba(var(--card-theme-rgb), 0.4);
    }

    .member-name {
      font-family: var(--font-cyber);
      font-size: 1.5rem;
      font-weight: 700;
      color: var(--color-white);
      margin-bottom: 14px;
      letter-spacing: 1.5px;
      text-transform: uppercase;
    }

    .member-desc {
      font-size: 0.88rem;
      line-height: 1.65;
      color: rgba(255, 255, 255, 0.68);
      margin-bottom: 20px;
    }

    /* === Skill Badges === */
    .skills-container {
      display: flex;
      flex-wrap: wrap;
      gap: 7px;
      margin-bottom: 22px;
    }

    .skill-badge {
      display: inline-flex;
      align-items: center;
      gap: 5px;
      font-family: var(--font-mono);
      font-size: 0.7rem;
      padding: 4px 10px;
      background: rgba(var(--card-theme-rgb), 0.06);
      border: 1px solid rgba(var(--card-theme-rgb), 0.2);
      border-radius: 3px;
      color: rgba(255, 255, 255, 0.8);
      transition: all 0.3s ease;
      cursor: default;
    }

    .skill-badge:hover {
      background: rgba(var(--card-theme-rgb), 0.14);
      border-color: rgba(var(--card-theme-rgb), 0.5);
      color: var(--color-white);
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(var(--card-theme-rgb), 0.15);
    }

    .badge-dot {
      width: 4px; height: 4px;
      border-radius: 50%;
      background-color: rgba(var(--card-theme-rgb), 1);
      flex-shrink: 0;
    }

    /* === Social Row === */
    .social-row {
      display: flex;
      gap: 14px;
      border-top: 1px solid rgba(255, 255, 255, 0.06);
      padding-top: 16px;
    }

    .social-icon {
      color: rgba(255, 255, 255, 0.45);
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      justify-content: center;

      &:hover {
        color: rgba(var(--card-theme-rgb), 1);
        transform: scale(1.2) translateY(-2px);
        filter: drop-shadow(0 0 6px rgba(var(--card-theme-rgb), 0.5));
      }
    }

    /* === Responsive === */
    @media (max-width: 768px) {
      .team-grid { gap: 24px; }
      .portrait-container { height: 340px; }
    }

    @media (max-width: 480px) {
      .team-grid { grid-template-columns: 1fr; }
    }
  `],
  standalone: false
})
export class Team {
  cardTransforms: string[] = [];

  themeColors: Record<string, string> = {
    green: '#3DAF8A',
    blue:  '#5992EC',
    gold:  '#F5A623'
  };

  themeRgbs: Record<string, string> = {
    green: '61, 175, 138',
    blue:  '89, 146, 236',
    gold:  '245, 166, 35'
  };

  members: Member[] = [
    {
      id: 'mohamed-m',
      name: 'Mohamed Mostafa',
      role: 'Flutter & Angular Developer',
      desc: 'Specialized in scalable mobile and web applications integrated with AI systems, REST APIs, and backend services. Passionate about futuristic user experiences and smart healthcare systems.',
      skills: ['Flutter', 'Angular', 'FastAPI', 'REST APIs', 'AI Integration', 'TypeScript'],
      image: '/mohamed mostafa.jpeg',
      theme: 'blue',
      scanCode: 'SECURE_NODE_M.M_88x22',
      socials: {
        github: 'https://github.com/gazar77',
        linkedin: 'https://www.linkedin.com/in/mohamed-mostafa-b4b483251',
        email: 'abvfxkiwkk55ggj@gmail.com'
      }
    },
    {
      id: 'yahia-n',
      name: 'Yahya Nageh',
      role: 'Flutter Developer',
      desc: 'Creative mobile developer focused on building smooth cross-platform applications, custom canvas renderings, and highly responsive user interfaces.',
      skills: ['Flutter', 'Firebase', 'UI Development', 'Mobile Performance', 'Dart'],
      image: '/Yahya nageh.jpeg',
      theme: 'green',
      scanCode: 'SECURE_NODE_Y.N_14x09',
      socials: {
        github: 'https://github.com/yahya512/Style-hup-.git',
        linkedin: 'https://www.linkedin.com/in/yahya-nageh/',
        email: 'yahyan.nageh@gmail.com'
      }
    },
    {
      id: 'mohamed-b',
      name: 'Mohamed Bahaa',
      role: 'UI/UX Designer & Frontend Dev',
      desc: 'Transforms interfaces into immersive digital experiences using modern design tokens, motion kinematics, and clean react/web architectures.',
      skills: ['Figma', 'React', 'Next.js', 'UI/UX', 'Prototyping', 'Design Systems'],
      image: '/mohamed bahaa.jpeg',
      theme: 'gold',
      scanCode: 'SECURE_NODE_M.B_40x77',
      socials: {
        github: 'https://github.com/mo-bahaa2',
        linkedin: 'https://www.linkedin.com/in/mohamed-bahaa-salah-b9a914275/',
        email: 'mohamedelbehiry2004@gmail.com',
        behance: 'https://www.behance.net/mohamedbahaa40',
        portfolio: 'https://potofolio-pi.vercel.app/'
      }
    },
    {
      id: 'mostafa-m',
      name: 'Mostafa Mahmoud',
      role: 'Spring Boot Backend Developer',
      desc: 'Backend engineer focused on highly scalable architectures, SQL/NoSQL databases, data security policies, and high-performance server modules.',
      skills: ['Spring Boot', 'REST APIs', 'SQL', 'Backend Architecture', 'Authentication', 'Java'],
      image: '/mostafa mahmoud.jpeg',
      theme: 'green',
      scanCode: 'SECURE_NODE_M.MA_55x61',
      socials: {
        github: 'https://github.com/MostafaMahmoudegy10',
        linkedin: 'https://www.linkedin.com/in/mostafa-mahmoud-egy10/',
        email: 'mostafa.mahmoudegy10@gmail.com'
      }
    },
    {
      id: 'youssef-m',
      name: 'Youssef Medhat',
      role: '.NET Backend Developer',
      desc: 'Builds secure, modular, and enterprise-grade backend systems utilizing Clean Architecture patterns and efficient asynchronous API operations.',
      skills: ['.NET', 'C#', 'SQL Server', 'API Development', 'System Design', 'Clean Code'],
      image: '/Youssef medhat.jpeg',
      theme: 'blue',
      scanCode: 'SECURE_NODE_Y.M_03x95',
      socials: {
        github: 'https://github.com/YoussefHassan4002',
        linkedin: 'https://www.linkedin.com/in/youssef-hassan-215921389/'
      }
    }
  ];

  constructor() {
    this.cardTransforms = this.members.map(() => 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)');
  }

  onCardMouseMove(event: MouseEvent, index: number): void {
    const card = (event.currentTarget as HTMLElement);
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;

    const rotateX = ((y - cy) / cy) * -9;
    const rotateY = ((x - cx) / cx) * 10;

    this.cardTransforms[index] =
      `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.025)`;

    // Inject dynamic CSS properties for real-time 3D holographic sheen reflection
    card.style.setProperty('--mouse-x', `${(x / rect.width) * 100}%`);
    card.style.setProperty('--mouse-y', `${(y / rect.height) * 100}%`);
  }

  onCardMouseLeave(index: number): void {
    this.cardTransforms[index] =
      'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
  }
}
