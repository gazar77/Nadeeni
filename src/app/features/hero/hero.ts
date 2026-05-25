import { Component, HostListener, OnInit, AfterViewInit, ElementRef, ViewChild, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'feature-hero',
  template: `
    <section class="hero-section" id="hero">
      <!-- Dynamic lighting globes -->
      <div class="glow-sphere purple"></div>
      <div class="glow-sphere cyan"></div>

      <!-- 3D Glassmorphic Cubes in Background -->
      <div class="cube-container cube-1" #cube1>
        <div class="face front"></div>
        <div class="face back"></div>
        <div class="face right"></div>
        <div class="face left"></div>
        <div class="face top"></div>
        <div class="face bottom"></div>
      </div>
      <div class="cube-container cube-2" #cube2>
        <div class="face front"></div>
        <div class="face back"></div>
        <div class="face right"></div>
        <div class="face left"></div>
        <div class="face top"></div>
        <div class="face bottom"></div>
      </div>
      
      <div class="hero-container">
        <!-- 3D Interactive Parallax Panel -->
        <div class="interactive-grid" [style.transform]="parallaxStyle" #heroGrid>
          <div class="cyber-bracket" #cyberBracket>[ NADEENI_COGNITIVE_INTERFACE_v1.2 ]</div>
          
          <!-- 3D Floating Logo Hologram -->
          <div class="hero-logo-hologram" #logoHologram>
            <div class="hologram-rings">
              <div class="h-ring r1"></div>
              <div class="h-ring r2"></div>
              <div class="h-ring r3"></div>
            </div>
            <div class="logo-float-container">
              <img src="/LOgo nadeeni.png" alt="Nadeeni Logo" class="hero-logo-img" />
              <div class="logo-scan-sweep"></div>
            </div>
            <div class="hologram-base"></div>
          </div>
          
          <!-- Animated neon glitch header -->
          <h1 class="hero-title" data-text="NADEENI" #heroTitle>NADEENI</h1>
          
          <!-- Description subtitle with stagger reveal -->
          <p class="hero-subtitle" #heroSubtitle>We craft digital experiences through code, creativity, and intelligence.</p>

          <!-- Core Call to Actions -->
          <div class="button-group" #btnGroup>
            <a href="#team" class="cyber-button primary glow-blue" (click)="scrollTo('#team', $event)">
              MEET THE TEAM
              <svg xmlns="http://www.w3.org/2000/svg" height="18" viewBox="0 -960 960 960" width="18" fill="currentColor">
                <path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-240v-32q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q30 15 47 43.5t17 62.5v32q0 33-23.5 56.5T720-160H240q-33 0-56.5-23.5T160-240Z"/>
              </svg>
            </a>
            <a href="#story" class="cyber-button glow-green" (click)="scrollTo('#story', $event)">
              EXPLORE THE JOURNEY
              <svg xmlns="http://www.w3.org/2000/svg" height="18" viewBox="0 -960 960 960" width="18" fill="currentColor">
                <path d="m560-240-56-58 142-142H160v-80h486L504-662l56-58 240 240-240 240Z"/>
              </svg>
            </a>
          </div>

          <!-- Animated Stats Counter Row -->
          <div class="hero-stats-row" #statsRow>
            <div class="stat-box">
              <div class="stat-glow"></div>
              <div class="stat-num-container">
                <span class="stat-number" #statDevelopers>0</span>
              </div>
              <span class="stat-label">CORE BUILDERS</span>
            </div>
            
            <div class="stat-divider"></div>
            
            <div class="stat-box">
              <div class="stat-glow"></div>
              <div class="stat-num-container">
                <span class="stat-number" #statProjects>0</span><span class="stat-accent">+</span>
              </div>
              <span class="stat-label">DIGITAL CONSTRUCTS</span>
            </div>
            
            <div class="stat-divider"></div>
            
            <div class="stat-box">
              <div class="stat-glow"></div>
              <div class="stat-num-container">
                <span class="stat-number" #statPassion>0</span><span class="stat-accent">%</span>
              </div>
              <span class="stat-label">SYSTEM INTEGRITY</span>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Dynamic mouse scrolling cue -->
      <div class="scroll-indicator" (click)="scrollTo('#story', $event)" #scrollCue>
        <span class="scroll-text">SYSTEM_SCROLL</span>
        <div class="scroll-arrow"></div>
      </div>
    </section>
  `,
  styles: [`
    .hero-section {
      position: relative;
      min-height: 100vh;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: var(--color-bg-dark);
      overflow: hidden;
      perspective: 1200px;
    }

    /* 3D Glassmorphic Cubes */
    .cube-container {
      position: absolute;
      width: 60px;
      height: 60px;
      transform-style: preserve-3d;
      pointer-events: none;
      opacity: 0.35;
      z-index: 1;
    }

    .cube-1 {
      top: 15%;
      left: 8%;
    }

    .cube-2 {
      bottom: 20%;
      right: 8%;
      width: 80px;
      height: 80px;
    }

    .cube-2 .face {
      transform-origin: center center -40px;
    }

    .face {
      position: absolute;
      width: 100%;
      height: 100%;
      background: rgba(89, 146, 236, 0.03);
      border: 1px solid rgba(61, 175, 138, 0.25);
      backdrop-filter: blur(4px);
      box-shadow: inset 0 0 10px rgba(61, 175, 138, 0.1);
    }

    .cube-1 .face {
      transform-origin: center center -30px;
    }

    .face.front  { transform: rotateY(0deg); }
    .face.back   { transform: rotateY(180deg); }
    .face.right  { transform: rotateY(90deg); }
    .face.left   { transform: rotateY(-90deg); }
    .face.top    { transform: rotateX(90deg); }
    .face.bottom { transform: rotateX(-90deg); }

    .glow-sphere {
      position: absolute;
      border-radius: 50%;
      filter: blur(120px);
      pointer-events: none;
      z-index: 1;
      opacity: 0.16;
    }

    .glow-sphere.purple {
      top: 15%; left: 15%;
      width: 450px; height: 450px;
      background: var(--color-purple);
      animation: rotate-glow 20s infinite linear;
    }

    .glow-sphere.cyan {
      bottom: 15%; right: 15%;
      width: 500px; height: 500px;
      background: var(--color-cyan);
      animation: rotate-glow 25s infinite linear reverse;
    }

    .hero-container {
      position: relative;
      z-index: 2;
      text-align: center;
      max-width: 950px;
      padding: 40px 24px;
      width: 100%;
    }

    .interactive-grid {
      transition: transform 0.2s cubic-bezier(0.25, 0.8, 0.25, 1);
      padding: 56px 40px 48px 40px;
      border: 1px solid rgba(255, 255, 255, 0.03);
      background: rgba(11, 15, 25, 0.35);
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      border-radius: 18px;
      box-shadow: 0 25px 60px rgba(0, 0, 0, 0.45);
      position: relative;
      transform-style: preserve-3d;
    }

    .interactive-grid::before {
      content: '';
      position: absolute;
      top: 0; left: 0;
      width: 100%; height: 100%;
      background-image: 
      linear-gradient(rgba(255, 255, 255, 0.015) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255, 255, 255, 0.015) 1px, transparent 1px);
      background-size: 32px 32px;
      z-index: -1;
      border-radius: 18px;
      pointer-events: none;
    }

    .cyber-bracket {
      font-family: var(--font-mono);
      font-size: 0.75rem;
      color: var(--color-cyan);
      letter-spacing: 3px;
      margin-bottom: 24px;
      text-transform: uppercase;
      text-shadow: 0 0 8px rgba(61, 175, 138, 0.4);
      transform: translateZ(30px);
    }

    /* 3D Floating Logo Hologram */
    .hero-logo-hologram {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-bottom: 28px;
      transform: translateZ(45px);
    }

    .hologram-rings {
      position: absolute;
      top: 50%; left: 50%;
      transform: translate(-50%, -50%);
      pointer-events: none;
    }

    .h-ring {
      position: absolute;
      border-radius: 50%;
      border: 1px solid;
      top: 50%; left: 50%;
      transform: translate(-50%, -50%);
    }

    .h-ring.r1 {
      width: 120px; height: 120px;
      border-color: rgba(61, 175, 138, 0.3);
      animation: h-ring-spin 8s linear infinite;
      box-shadow: 0 0 12px rgba(61, 175, 138, 0.2);
    }

    .h-ring.r2 {
      width: 160px; height: 160px;
      border-color: rgba(89, 146, 236, 0.2);
      border-style: dashed;
      animation: h-ring-spin 12s linear infinite reverse;
    }

    .h-ring.r3 {
      width: 200px; height: 200px;
      border-color: rgba(245, 166, 35, 0.1);
      border-style: dotted;
      animation: h-ring-spin 18s linear infinite;
    }

    @keyframes h-ring-spin {
      from { transform: translate(-50%, -50%) rotate(0deg); }
      to   { transform: translate(-50%, -50%) rotate(360deg); }
    }

    .logo-float-container {
      position: relative;
      width: 90px; height: 90px;
      animation: logo-float 4s ease-in-out infinite;
      z-index: 2;
    }

    @keyframes logo-float {
      0%, 100% { transform: translateY(0px); filter: drop-shadow(0 0 12px rgba(61, 175, 138, 0.5)); }
      50% { transform: translateY(-14px); filter: drop-shadow(0 0 25px rgba(61, 175, 138, 0.8)) drop-shadow(0 0 50px rgba(89, 146, 236, 0.3)); }
    }

    .hero-logo-img {
      width: 90px; height: 90px;
      object-fit: contain;
      background: rgba(255, 255, 255, 0.95);
      border-radius: 18px;
      padding: 8px;
      box-shadow:
      0 0 20px rgba(61, 175, 138, 0.4),
      0 0 60px rgba(89, 146, 236, 0.2),
      0 25px 50px rgba(0, 0, 0, 0.5);
    }

    .logo-scan-sweep {
      position: absolute;
      top: 0; left: 0; width: 100%; height: 2px;
      background: linear-gradient(90deg, transparent, rgba(61, 175, 138, 0.8), transparent);
      border-radius: 0 0 18px 18px;
      animation: logo-sweep 3s linear infinite;
    }

    @keyframes logo-sweep {
      0% { top: 0%; opacity: 0; }
      10% { opacity: 1; }
      90% { opacity: 0.8; }
      100% { top: 100%; opacity: 0; }
    }

    .hologram-base {
      width: 70px; height: 3px;
      background: radial-gradient(ellipse, rgba(61, 175, 138, 0.5) 0%, transparent 70%);
      margin-top: 8px;
      filter: blur(2px);
      animation: base-pulse 4s ease-in-out infinite;
    }

    @keyframes base-pulse {
      0%, 100% { opacity: 0.4; transform: scaleX(0.8); }
      50% { opacity: 1; transform: scaleX(1.2); }
    }

    .hero-title {
      font-family: var(--font-cyber);
      font-size: 6.8rem;
      font-weight: 900;
      letter-spacing: 14px;
      color: var(--color-white);
      line-height: 1;
      margin-bottom: 28px;
      position: relative;
      background: linear-gradient(to right, #ffffff 40%, rgba(255, 255, 255, 0.65) 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      transform: translateZ(60px);
      user-select: none;
    }

    .hero-title::after {
      content: attr(data-text);
      position: absolute;
      left: 3px; top: 0;
      width: 100%; height: 100%;
      color: var(--color-cyan);
      background: transparent;
      clip: rect(0, 900px, 0, 0);
      animation: glitch-anim-1 3s infinite linear alternate-reverse;
      z-index: -1;
      -webkit-background-clip: unset;
      -webkit-text-fill-color: var(--color-cyan);
    }

    .hero-title::before {
      content: attr(data-text);
      position: absolute;
      left: -3px; top: 0;
      width: 100%; height: 100%;
      color: var(--color-purple);
      background: transparent;
      clip: rect(0, 900px, 0, 0);
      animation: glitch-anim-2 2.5s infinite linear alternate-reverse;
      z-index: -2;
      -webkit-background-clip: unset;
      -webkit-text-fill-color: var(--color-purple);
    }

    .hero-subtitle {
      font-size: 1.3rem;
      font-weight: 300;
      color: var(--color-white);
      opacity: 0.88;
      max-width: 680px;
      margin: 0 auto 44px auto;
      line-height: 1.6;
      letter-spacing: 0.5px;
      transform: translateZ(40px);
    }

    .button-group {
      display: flex;
      gap: 20px;
      justify-content: center;
      flex-wrap: wrap;
      transform: translateZ(50px);
      margin-bottom: 56px;
    }

    /* Stats Counter Row Styles */
    .hero-stats-row {
      display: flex;
      justify-content: space-around;
      align-items: center;
      background: rgba(8, 12, 22, 0.55);
      border: 1px solid rgba(255, 255, 255, 0.05);
      border-radius: 12px;
      padding: 24px 16px;
      margin-top: 10px;
      transform: translateZ(35px);
      backdrop-filter: blur(10px);
      position: relative;
      overflow: hidden;
    }

    .stat-box {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      position: relative;
    }

    .stat-glow {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 80px;
      height: 80px;
      background: radial-gradient(circle, rgba(61, 175, 138, 0.08) 0%, transparent 70%);
      pointer-events: none;
    }

    .stat-num-container {
      display: flex;
      align-items: baseline;
      justify-content: center;
      margin-bottom: 6px;
    }

    .stat-number {
      font-family: var(--font-cyber);
      font-size: 2.5rem;
      font-weight: 800;
      color: var(--color-white);
      text-shadow: 0 0 15px rgba(255, 255, 255, 0.2);
    }

    .stat-accent {
      font-family: var(--font-cyber);
      font-size: 1.8rem;
      font-weight: 800;
      color: var(--color-cyan);
      margin-left: 2px;
      text-shadow: 0 0 10px rgba(61, 175, 138, 0.4);
    }

    .stat-label {
      font-family: var(--font-mono);
      font-size: 0.72rem;
      color: rgba(255, 255, 255, 0.55);
      letter-spacing: 2px;
      text-align: center;
      text-transform: uppercase;
    }

    .stat-divider {
      width: 1px;
      height: 48px;
      background: linear-gradient(to bottom, transparent, rgba(255, 255, 255, 0.12), transparent);
    }

    .scroll-indicator {
      position: absolute;
      bottom: 40px;
      display: flex;
      flex-direction: column;
      align-items: center;
      cursor: pointer;
      z-index: 10;
      opacity: 0.65;
      transition: opacity 0.3s ease;
    }

    .scroll-indicator:hover {
      opacity: 1;
    }

    .scroll-indicator:hover .scroll-arrow {
      height: 38px;
    }

    .scroll-indicator:hover .scroll-arrow::after {
      border-color: var(--color-cyan);
    }

    .scroll-text {
      font-family: var(--font-mono);
      font-size: 0.7rem;
      letter-spacing: 3px;
      color: var(--color-white);
      margin-bottom: 12px;
    }

    .scroll-arrow {
      width: 1px;
      height: 24px;
      background: rgba(255, 255, 255, 0.35);
      position: relative;
      transition: height 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .scroll-arrow::after {
      content: '';
      position: absolute;
      bottom: 0; left: -4px;
      width: 7px; height: 7px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.65);
      border-right: 1px solid rgba(255, 255, 255, 0.65);
      transform: rotate(45deg);
      transition: border-color 0.3s ease;
    }

    @media (max-width: 768px) {
      .hero-title {
        font-size: 3.2rem;
        letter-spacing: 5px;
      }
      .hero-subtitle {
        font-size: 1rem;
        margin-bottom: 32px;
      }
      .interactive-grid {
        padding: 40px 24px;
      }
      .hero-stats-row {
        flex-direction: column;
        gap: 20px;
        padding: 20px;
      }
      .stat-divider {
        width: 80%;
        height: 1px;
        background: linear-gradient(to right, transparent, rgba(255, 255, 255, 0.12), transparent);
      }
      .cube-container {
        display: none; /* Hide background cubes on mobile */
      }
    }

    /* Keyframes */
    @keyframes rotate-glow {
      0% { transform: rotate(0deg) translate(0, 0); }
      50% { transform: rotate(180deg) translate(15px, 15px) scale(1.05); }
      100% { transform: rotate(360deg) translate(0, 0); }
    }

    @keyframes glitch-anim-1 {
      0% { clip: rect(15px, 9999px, 66px, 0); }
      12% { clip: rect(32px, 9999px, 85px, 0); }
      25% { clip: rect(80px, 9999px, 115px, 0); }
      38% { clip: rect(10px, 9999px, 45px, 0); }
      50% { clip: rect(95px, 9999px, 155px, 0); }
      62% { clip: rect(40px, 9999px, 75px, 0); }
      75% { clip: rect(110px, 9999px, 145px, 0); }
      88% { clip: rect(25px, 9999px, 95px, 0); }
      100% { clip: rect(0, 9999px, 0, 0); }
    }

    @keyframes glitch-anim-2 {
      0% { clip: rect(50px, 9999px, 105px, 0); }
      12% { clip: rect(20px, 9999px, 65px, 0); }
      25% { clip: rect(90px, 9999px, 145px, 0); }
      38% { clip: rect(60px, 9999px, 125px, 0); }
      50% { clip: rect(15px, 9999px, 80px, 0); }
      62% { clip: rect(100px, 9999px, 160px, 0); }
      75% { clip: rect(45px, 9999px, 95px, 0); }
      88% { clip: rect(75px, 9999px, 135px, 0); }
      100% { clip: rect(0, 9999px, 0, 0); }
    }
  `],
  standalone: false
})
export class Hero implements OnInit, AfterViewInit {
  parallaxStyle = '';
  private isBrowser = false;

  @ViewChild('heroGrid', { static: true }) heroGrid!: ElementRef<HTMLDivElement>;
  @ViewChild('cyberBracket', { static: true }) cyberBracket!: ElementRef<HTMLDivElement>;
  @ViewChild('logoHologram', { static: true }) logoHologram!: ElementRef<HTMLDivElement>;
  @ViewChild('heroTitle', { static: true }) heroTitle!: ElementRef<HTMLHeadingElement>;
  @ViewChild('heroSubtitle', { static: true }) heroSubtitle!: ElementRef<HTMLParagraphElement>;
  @ViewChild('btnGroup', { static: true }) btnGroup!: ElementRef<HTMLDivElement>;
  @ViewChild('statsRow', { static: true }) statsRow!: ElementRef<HTMLDivElement>;
  @ViewChild('scrollCue', { static: true }) scrollCue!: ElementRef<HTMLDivElement>;

  // Stats numbers views
  @ViewChild('statDevelopers') statDevsRef!: ElementRef<HTMLSpanElement>;
  @ViewChild('statProjects') statProjRef!: ElementRef<HTMLSpanElement>;
  @ViewChild('statPassion') statPassion!: ElementRef<HTMLSpanElement>;

  // Background cubes
  @ViewChild('cube1', { static: true }) cube1!: ElementRef<HTMLDivElement>;
  @ViewChild('cube2', { static: true }) cube2!: ElementRef<HTMLDivElement>;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    if (!this.isBrowser) return;

    // 1. Split subtitle characters for the premium staggering slide-fade reveal
    const subtitleEl = this.heroSubtitle.nativeElement;
    const rawText = subtitleEl.textContent || '';
    subtitleEl.innerHTML = rawText.split('').map(char => 
      `<span class="char" style="display: inline-block; opacity: 0; transform: translate3d(0, 15px, 0); will-change: transform, opacity;">${char === ' ' ? '&nbsp;' : char}</span>`
    ).join('');

    // 2. Hide elements for the GSAP initial timeline sequence
    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

    gsap.set([
      this.cyberBracket.nativeElement,
      this.logoHologram.nativeElement,
      this.heroTitle.nativeElement,
      this.btnGroup.nativeElement,
      this.statsRow.nativeElement,
      this.scrollCue.nativeElement
    ], { opacity: 0, y: 30 });

    // Initial state of stats numbers
    if (this.statDevsRef) this.statDevsRef.nativeElement.innerText = '0';
    if (this.statProjRef) this.statProjRef.nativeElement.innerText = '0';
    if (this.statPassion) this.statPassion.nativeElement.innerText = '0';

    // 3. Play entry cinematic animation timeline
    tl.to(this.heroGrid.nativeElement, { opacity: 1, duration: 0.1 })
      .to(this.logoHologram.nativeElement, { opacity: 1, y: 0, duration: 1.2, ease: 'back.out(1.5)' })
      .to(this.cyberBracket.nativeElement, { opacity: 1, y: 0, duration: 0.8 }, '-=0.8')
      .to(this.heroTitle.nativeElement, { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }, '-=0.6')
      // Staggered letters slide-up reveal (our premium typewriter replacement)
      .to(subtitleEl.querySelectorAll('.char'), {
        opacity: 1,
        y: 0,
        stagger: 0.015,
        duration: 0.6,
        ease: 'power2.out'
      }, '-=0.5')
      .to(this.btnGroup.nativeElement, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }, '-=0.3')
      .to(this.statsRow.nativeElement, { 
        opacity: 1, 
        y: 0, 
        duration: 0.8, 
        onComplete: () => {
          // Trigger the counting up sequence once stats row displays
          this.animateCounters();
        }
      }, '-=0.6')
      .to(this.scrollCue.nativeElement, { opacity: 0.65, y: 0, duration: 0.8 }, '-=0.4');

    // 4. Animate the background rotating 3D cubes continuously
    gsap.to(this.cube1.nativeElement, {
      rotateX: 360,
      rotateY: 720,
      z: 50,
      yoyo: true,
      repeat: -1,
      duration: 25,
      ease: 'none'
    });

    gsap.to(this.cube2.nativeElement, {
      rotateX: -720,
      rotateY: 360,
      z: -100,
      yoyo: true,
      repeat: -1,
      duration: 30,
      ease: 'none'
    });
  }

  private animateCounters(): void {
    const devObj = { val: 0 };
    const projObj = { val: 0 };
    const passObj = { val: 0 };

    gsap.to(devObj, {
      val: 5,
      duration: 2.2,
      ease: 'power2.out',
      onUpdate: () => {
        if (this.statDevsRef) this.statDevsRef.nativeElement.innerText = Math.floor(devObj.val).toString();
      }
    });

    gsap.to(projObj, {
      val: 3,
      duration: 2.5,
      ease: 'power2.out',
      onUpdate: () => {
        if (this.statProjRef) this.statProjRef.nativeElement.innerText = Math.floor(projObj.val).toString();
      }
    });

    gsap.to(passObj, {
      val: 100,
      duration: 2.8,
      ease: 'power3.out',
      onUpdate: () => {
        if (this.statPassion) this.statPassion.nativeElement.innerText = Math.floor(passObj.val).toString();
      }
    });
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    if (!this.isBrowser) return;
    const width = window.innerWidth;
    const height = window.innerHeight;
    
    // Smooth 3D tilt
    const rotateX = ((event.clientY / height) - 0.5) * -12; // cap rotation
    const rotateY = ((event.clientX / width) - 0.5) * 12;
    
    this.parallaxStyle = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  }

  scrollTo(target: string, event: Event): void {
    event.preventDefault();
    const element = document.querySelector(target);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
