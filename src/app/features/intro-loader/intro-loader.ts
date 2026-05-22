import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';

@Component({
  selector: 'feature-intro-loader',
  template: `
    <div class="loader-container" [class.faded-out]="isFadedOut" *ngIf="!isDestroyed">

      <!-- Ambient glows -->
      <div class="ambient-glow-1"></div>
      <div class="ambient-glow-2"></div>

      <!-- Corner brackets -->
      <span class="corner-bracket top-left"></span>
      <span class="corner-bracket top-right"></span>
      <span class="corner-bracket bottom-left"></span>
      <span class="corner-bracket bottom-right"></span>

      <!-- HUD top tag -->
      <div class="hud-top-tag">[ NADEENI_SYSTEM_BOOT ]</div>

      <!-- ===== Nadeeni Logo Hologram ===== -->
      <div class="logo-hologram" [class.visible]="showLogo">
        <div class="logo-ring r1"></div>
        <div class="logo-ring r2"></div>
        <div class="logo-wrap">
          <img src="/LOgo nadeeni.png" alt="Nadeeni" class="nadeeni-logo" />
          <div class="logo-sweep"></div>
        </div>
        <div class="logo-shadow"></div>
      </div>

      <!-- ===== Narrative Slides ===== -->
      <div class="slides-wrapper">
        <div
          *ngFor="let text of slides; let i = index"
          class="slide"
          [class.slide-active]="i === activeIndex"
          [class.slide-out]="i < activeIndex"
        >
          <h2 class="slide-text">{{ text }}</h2>
        </div>
      </div>

      <!-- Progress dots -->
      <div class="dot-track" *ngIf="!showEnterButton">
        <span
          *ngFor="let d of slides; let i = index"
          class="dot"
          [class.dot-active]="i === activeIndex"
          [class.dot-done]="i < activeIndex"
        ></span>
      </div>

      <!-- Enter button -->
      <div class="enter-panel" *ngIf="showEnterButton">
        <button class="cyber-button primary glow-cyan" (click)="enterExperience()">
          INITIALIZE EXPERIENCE
          <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 -960 960 960" width="20" fill="currentColor">
            <path d="m560-240-56-58 142-142H160v-80h486L504-662l56-58 240 240-240 240Z"/>
          </svg>
        </button>
      </div>

    </div>
  `,
  styles: [`
    /* ===================== Container ===================== */
    .loader-container {
      position: fixed;
      inset: 0;
      background: #000408;
      z-index: 9999;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 48px;
      transition: opacity 1.4s cubic-bezier(0.77, 0, 0.175, 1);
      overflow: hidden;
    }
    .loader-container.faded-out {
      opacity: 0;
      pointer-events: none;
    }

    /* ===================== Ambient glows ===================== */
    .ambient-glow-1, .ambient-glow-2 {
      position: absolute;
      width: 650px; height: 650px;
      border-radius: 50%;
      filter: blur(100px);
      pointer-events: none;
      z-index: 1;
    }
    .ambient-glow-1 {
      background: radial-gradient(circle, rgba(89,146,236,0.13) 0%, transparent 70%);
      top: -180px; left: -180px;
      animation: drift1 10s infinite alternate ease-in-out;
    }
    .ambient-glow-2 {
      background: radial-gradient(circle, rgba(61,175,138,0.11) 0%, transparent 70%);
      bottom: -180px; right: -180px;
      animation: drift2 13s infinite alternate ease-in-out;
    }
    @keyframes drift1 { to { transform: translate(80px, 60px) scale(1.1); } }
    @keyframes drift2 { to { transform: translate(-60px, -50px) scale(1.15); } }

    /* ===================== Corner brackets ===================== */
    .corner-bracket {
      position: absolute;
      width: 36px; height: 36px;
      border: 2px solid rgba(61,175,138,0.45);
      pointer-events: none;
      z-index: 5;
      animation: bracket-glow 3s infinite alternate;
    }
    .top-left    { top: 22px;    left: 22px;    border-right: none; border-bottom: none; }
    .top-right   { top: 22px;    right: 22px;   border-left: none;  border-bottom: none; }
    .bottom-left { bottom: 22px; left: 22px;    border-right: none; border-top: none; }
    .bottom-right{ bottom: 22px; right: 22px;   border-left: none;  border-top: none; }
    @keyframes bracket-glow {
      from { border-color: rgba(61,175,138,0.3); }
      to   { border-color: rgba(61,175,138,0.9); box-shadow: 0 0 10px rgba(61,175,138,0.4); }
    }

    /* ===================== HUD tag ===================== */
    .hud-top-tag {
      position: absolute;
      top: 26px;
      font-family: var(--font-mono, monospace);
      font-size: 0.68rem;
      letter-spacing: 5px;
      color: rgba(61,175,138,0.75);
      text-shadow: 0 0 8px rgba(61,175,138,0.5);
      z-index: 5;
      animation: flicker 5s infinite;
    }
    @keyframes flicker {
      0%,89%,100% { opacity: 1; }
      90% { opacity: 0.2; }
      92% { opacity: 1; }
      94% { opacity: 0.4; }
    }

    /* ===================== Logo Hologram ===================== */
    .logo-hologram {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      z-index: 3;
      opacity: 0;
      transform: scale(0.8) translateY(16px);
      transition: opacity 1s ease, transform 1s cubic-bezier(0.16,1,0.3,1);
    }
    .logo-hologram.visible {
      opacity: 1;
      transform: scale(1) translateY(0);
    }

    .logo-ring {
      position: absolute;
      top: 50%; left: 50%;
      border-radius: 50%;
      border: 1px solid;
      transform: translate(-50%, -50%);
      pointer-events: none;
    }
    .logo-ring.r1 {
      width: 98px; height: 98px;
      border-color: rgba(61,175,138,0.4);
      animation: spin 8s linear infinite;
      box-shadow: 0 0 10px rgba(61,175,138,0.2);
    }
    .logo-ring.r2 {
      width: 138px; height: 138px;
      border-color: rgba(89,146,236,0.2);
      border-style: dashed;
      animation: spin 14s linear infinite reverse;
    }
    @keyframes spin {
      from { transform: translate(-50%,-50%) rotate(0deg); }
      to   { transform: translate(-50%,-50%) rotate(360deg); }
    }

    .logo-wrap {
      position: relative;
      width: 74px; height: 74px;
      z-index: 2;
      animation: float 3.5s ease-in-out infinite;
    }
    @keyframes float {
      0%,100% { transform: translateY(0);     filter: drop-shadow(0 0 14px rgba(61,175,138,0.6)); }
      50%      { transform: translateY(-12px); filter: drop-shadow(0 0 28px rgba(61,175,138,0.9)) drop-shadow(0 0 50px rgba(89,146,236,0.4)); }
    }

    .nadeeni-logo {
      width: 74px; height: 74px;
      object-fit: contain;
      background: rgba(255,255,255,0.95);
      border-radius: 16px;
      padding: 6px;
      box-shadow:
        0 0 20px rgba(61,175,138,0.55),
        0 0 60px rgba(89,146,236,0.25),
        0 18px 40px rgba(0,0,0,0.6);
    }

    .logo-sweep {
      position: absolute;
      top: 0; left: 0; width: 100%; height: 2px;
      background: linear-gradient(90deg, transparent, rgba(61,175,138,0.9), transparent);
      border-radius: 16px;
      animation: sweep 2.8s linear infinite;
    }
    @keyframes sweep {
      0%   { top: 0%;   opacity: 0; }
      10%  { opacity: 1; }
      90%  { opacity: 0.8; }
      100% { top: 100%; opacity: 0; }
    }

    .logo-shadow {
      width: 56px; height: 4px;
      background: radial-gradient(ellipse, rgba(61,175,138,0.55) 0%, transparent 70%);
      filter: blur(3px);
      margin-top: 8px;
      animation: shadow-pulse 3.5s ease-in-out infinite;
    }
    @keyframes shadow-pulse {
      0%,100% { transform: scaleX(0.7); opacity: 0.4; }
      50%      { transform: scaleX(1.2); opacity: 1; }
    }

    /* ===================== Slides ===================== */
    .slides-wrapper {
      position: relative;
      z-index: 3;
      text-align: center;
      width: 90%;
      max-width: 880px;
      height: 90px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .slide {
      position: absolute;
      width: 100%;
      opacity: 0;
      transform: translateY(28px);
      filter: blur(12px);
      transition:
        opacity 0.85s cubic-bezier(0.25,1,0.5,1),
        transform 0.85s cubic-bezier(0.25,1,0.5,1),
        filter 0.85s cubic-bezier(0.25,1,0.5,1);
      pointer-events: none;
    }
    .slide.slide-active {
      opacity: 1;
      transform: translateY(0);
      filter: blur(0);
      pointer-events: auto;
    }
    .slide.slide-out {
      opacity: 0;
      transform: translateY(-28px);
      filter: blur(12px);
    }

    .slide-text {
      font-family: var(--font-cyber, 'Orbitron', sans-serif);
      font-size: 2.2rem;
      font-weight: 900;
      letter-spacing: 4px;
      color: #ffffff;
      text-shadow:
        0 0 12px rgba(255,255,255,0.5),
        0 0 28px rgba(89,146,236,0.6),
        0 0 55px rgba(89,146,236,0.25);
      text-transform: uppercase;
      margin: 0;
      line-height: 1.3;
    }
    @media (max-width: 768px) {
      .slide-text { font-size: 1.35rem; letter-spacing: 2px; }
    }

    /* ===================== Progress dots ===================== */
    .dot-track {
      display: flex;
      gap: 10px;
      z-index: 4;
    }
    .dot {
      width: 6px; height: 6px;
      border-radius: 50%;
      background: rgba(255,255,255,0.15);
      border: 1px solid rgba(255,255,255,0.2);
      transition: all 0.5s ease;
    }
    .dot.dot-active {
      background: #3DAF8A;
      border-color: #3DAF8A;
      box-shadow: 0 0 10px rgba(61,175,138,0.7);
      transform: scale(1.3);
    }
    .dot.dot-done {
      background: rgba(61,175,138,0.35);
      border-color: rgba(61,175,138,0.4);
    }

    /* ===================== Enter button ===================== */
    .enter-panel {
      position: absolute;
      bottom: 18%;
      z-index: 4;
      animation: fade-up 0.9s forwards ease;
    }
    @keyframes fade-up {
      from { opacity: 0; transform: translateY(24px); }
      to   { opacity: 1; transform: translateY(0); }
    }
  `],
  standalone: false,
})
export class IntroLoader implements OnInit, OnDestroy {
  @Output() onComplete = new EventEmitter<void>();

  slides = [
    'Nadeeni is not just a team.',
    "It's a story of builders.",
    'Five minds.',
    'One vision.',
  ];

  activeIndex     = 0;
  showLogo        = false;
  showEnterButton = false;
  isFadedOut      = false;
  isDestroyed     = false;

  private timers: ReturnType<typeof setTimeout>[] = [];

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    // Show logo after a tiny delay
    this.addTimer(setTimeout(() => {
      this.showLogo = true;
      this.cdr.detectChanges();
    }, 400));

    // Cycle through slides
    this.slides.forEach((_, i) => {
      this.addTimer(setTimeout(() => {
        this.activeIndex = i;
        this.cdr.detectChanges();
      }, 400 + i * 2600));
    });

    // Show enter button after all slides finish
    const totalDelay = 400 + this.slides.length * 2600;
    this.addTimer(setTimeout(() => {
      this.showEnterButton = true;
      this.cdr.detectChanges();
    }, totalDelay));
  }

  ngOnDestroy(): void {
    this.timers.forEach(clearTimeout);
  }

  enterExperience(): void {
    this.isFadedOut = true;
    this.cdr.detectChanges();
    this.addTimer(setTimeout(() => {
      this.isDestroyed = true;
      this.onComplete.emit();
      this.cdr.detectChanges();
    }, 1500));
  }

  private addTimer(t: ReturnType<typeof setTimeout>): void {
    this.timers.push(t);
  }
}
