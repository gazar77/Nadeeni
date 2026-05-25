import { Component, ElementRef, Inject, NgZone, OnInit, OnDestroy, ViewChild, HostListener, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { gsap } from 'gsap';

@Component({
  selector: 'shared-cursor',
  template: `
    <div #cursorDot class="custom-cursor-dot"></div>
    <div #cursorRing class="custom-cursor-ring"></div>
  `,
  styles: [`
    :host {
      display: block;
      pointer-events: none;
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      z-index: 99999;
      mix-blend-mode: difference;
    }

    .custom-cursor-dot {
      position: absolute;
      top: 0;
      left: 0;
      width: 6px;
      height: 6px;
      background-color: #3DAF8A; /* Cyber Green */
      border-radius: 50%;
      transform: translate(-50%, -50%);
      pointer-events: none;
      z-index: 999999;
      box-shadow: 0 0 10px #3DAF8A, 0 0 20px #3DAF8A;
      transition: background-color 0.3s ease;
    }

    .custom-cursor-ring {
      position: absolute;
      top: 0;
      left: 0;
      width: 36px;
      height: 36px;
      border: 1.5px solid rgba(89, 146, 236, 0.7); /* Steel Blue */
      border-radius: 50%;
      transform: translate(-50%, -50%);
      pointer-events: none;
      z-index: 999998;
      box-shadow: 0 0 8px rgba(89, 146, 236, 0.3);
      transition: width 0.3s cubic-bezier(0.25, 1, 0.5, 1),
                  height 0.3s cubic-bezier(0.25, 1, 0.5, 1),
                  border-color 0.3s ease,
                  background-color 0.3s ease;
    }

    /* Hover interactive states */
    :host-context(.cursor-hovered) .custom-cursor-ring {
      width: 56px;
      height: 56px;
      border-color: #3DAF8A;
      background-color: rgba(61, 175, 138, 0.08);
      box-shadow: 0 0 15px rgba(61, 175, 138, 0.5);
    }

    :host-context(.cursor-hovered) .custom-cursor-dot {
      width: 4px;
      height: 4px;
      background-color: #F5A623; /* Gold */
      box-shadow: 0 0 8px #F5A623;
    }

    /* Hidden state (mobile/touch devices or outside screen) */
    .custom-cursor-dot.hidden,
    .custom-cursor-ring.hidden {
      opacity: 0;
    }
  `],
  standalone: false
})
export class CursorComponent implements OnInit, OnDestroy {
  @ViewChild('cursorDot', { static: true }) cursorDot!: ElementRef<HTMLDivElement>;
  @ViewChild('cursorRing', { static: true }) cursorRing!: ElementRef<HTMLDivElement>;

  private mouseX = 0;
  private mouseY = 0;
  private ringX = 0;
  private ringY = 0;
  private isHovering = false;
  private isBrowser = false;
  private rafId: number | null = null;

  constructor(
    private zone: NgZone,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    if (!this.isBrowser) return;

    // Detect touch device to avoid rendering cursor
    if (window.matchMedia('(pointer: coarse)').matches) {
      this.hideCursors();
      return;
    }

    // Run custom mouse movements outside Angular to avoid trigger change detection on every pixel scroll/move
    this.zone.runOutsideAngular(() => {
      window.addEventListener('mousemove', this.onMouseMove);
      window.addEventListener('mouseover', this.onMouseOver);
      window.addEventListener('mouseout', this.onMouseOut);
      
      // Start render loop
      this.tick();
    });
  }

  ngOnDestroy(): void {
    if (!this.isBrowser) return;

    window.removeEventListener('mousemove', this.onMouseMove);
    window.removeEventListener('mouseover', this.onMouseOver);
    window.removeEventListener('mouseout', this.onMouseOut);

    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
    }
  }

  private onMouseMove = (e: MouseEvent) => {
    this.mouseX = e.clientX;
    this.mouseY = e.clientY;
    
    if (this.cursorDot && this.cursorDot.nativeElement) {
      this.cursorDot.nativeElement.classList.remove('hidden');
    }
    if (this.cursorRing && this.cursorRing.nativeElement) {
      this.cursorRing.nativeElement.classList.remove('hidden');
    }
  };

  private onMouseOver = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (!target) return;

    // Check if hovering interactive element
    const isInteractive = 
      target.tagName === 'A' ||
      target.tagName === 'BUTTON' ||
      target.tagName === 'INPUT' ||
      target.tagName === 'TEXTAREA' ||
      target.closest('a') !== null ||
      target.closest('button') !== null ||
      target.closest('.hoverable') !== null ||
      target.closest('shared-glass-card') !== null ||
      target.closest('.member-card') !== null ||
      target.closest('.project-card') !== null ||
      target.closest('.timeline-item') !== null;

    if (isInteractive && !this.isHovering) {
      this.isHovering = true;
      document.documentElement.classList.add('cursor-hovered');
    }
  };

  private onMouseOut = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (!target) return;

    // Check if mouse left the interactive container
    const isLeavingInteractive = 
      target.tagName === 'A' ||
      target.tagName === 'BUTTON' ||
      target.tagName === 'INPUT' ||
      target.tagName === 'TEXTAREA' ||
      target.closest('a') !== null ||
      target.closest('button') !== null ||
      target.closest('.hoverable') !== null ||
      target.closest('shared-glass-card') !== null ||
      target.closest('.member-card') !== null ||
      target.closest('.project-card') !== null ||
      target.closest('.timeline-item') !== null;

    if (isLeavingInteractive) {
      // Small timeout or boundary check to ensure we aren't immediately moving to another interactive element
      setTimeout(() => {
        const hoveredEl = document.querySelector(':hover');
        const stillHovering = hoveredEl && (
          hoveredEl.tagName === 'A' ||
          hoveredEl.tagName === 'BUTTON' ||
          hoveredEl.tagName === 'INPUT' ||
          hoveredEl.tagName === 'TEXTAREA' ||
          hoveredEl.closest('a') !== null ||
          hoveredEl.closest('button') !== null ||
          hoveredEl.closest('.hoverable') !== null ||
          hoveredEl.closest('shared-glass-card') !== null ||
          hoveredEl.closest('.member-card') !== null ||
          hoveredEl.closest('.project-card') !== null ||
          hoveredEl.closest('.timeline-item') !== null
        );

        if (!stillHovering && this.isHovering) {
          this.isHovering = false;
          document.documentElement.classList.remove('cursor-hovered');
        }
      }, 10);
    }
  };

  private hideCursors() {
    if (this.cursorDot && this.cursorDot.nativeElement) {
      this.cursorDot.nativeElement.classList.add('hidden');
    }
    if (this.cursorRing && this.cursorRing.nativeElement) {
      this.cursorRing.nativeElement.classList.add('hidden');
    }
  }

  // Linear interpolation for cursor lagging effect
  private lerp(start: number, end: number, amt: number): number {
    return (1 - amt) * start + amt * end;
  }

  private tick = () => {
    // Smoothly interpolate the outer ring coordinate toward the mouse
    this.ringX = this.lerp(this.ringX, this.mouseX, 0.15);
    this.ringY = this.lerp(this.ringY, this.mouseY, 0.15);

    if (this.cursorDot && this.cursorDot.nativeElement) {
      this.cursorDot.nativeElement.style.transform = `translate3d(${this.mouseX}px, ${this.mouseY}px, 0) translate(-50%, -50%)`;
    }

    if (this.cursorRing && this.cursorRing.nativeElement) {
      this.cursorRing.nativeElement.style.transform = `translate3d(${this.ringX}px, ${this.ringY}px, 0) translate(-50%, -50%)`;
    }

    this.rafId = requestAnimationFrame(this.tick);
  };
}
