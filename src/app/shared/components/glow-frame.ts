import { Component, Input } from '@angular/core';

@Component({
  selector: 'shared-glow-frame',
  template: `
    <div class="glow-frame" [class]="theme" [class.hover-effect]="enableHover">
      <!-- Cybernetic Corner Brackets -->
      <span class="corner top-left"></span>
      <span class="corner top-right"></span>
      <span class="corner bottom-left"></span>
      <span class="corner bottom-right"></span>
      
      <!-- Content Container -->
      <div class="frame-content">
        <ng-content></ng-content>
      </div>
      
      <!-- Laser Scanning Line -->
      <div class="laser-scanner" *ngIf="showScanner"></div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }

    .glow-frame {
      position: relative;
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 8px;
      background: rgba(11, 15, 25, 0.65);
      backdrop-filter: blur(14px);
      -webkit-backdrop-filter: blur(14px);
      padding: 24px;
      box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.35);
      transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
      overflow: hidden;
    }

    /* Accented Borders */
    .glow-frame.purple {
      border-color: rgba(89, 146, 236, 0.2);
    }
    .glow-frame.cyan {
      border-color: rgba(50, 214, 165, 0.2);
    }

    /* Hover interactive behaviors */
    .glow-frame.hover-effect:hover {
      transform: translateY(-4px);
      background: rgba(17, 24, 39, 0.75);
    }

    .glow-frame.purple.hover-effect:hover {
      border-color: rgba(89, 146, 236, 0.55);
      box-shadow: 0 12px 40px rgba(89, 146, 236, 0.2);
    }

    .glow-frame.cyan.hover-effect:hover {
      border-color: rgba(50, 214, 165, 0.55);
      box-shadow: 0 12px 40px rgba(50, 214, 165, 0.2);
    }

    .glow-frame.purple.hover-effect:hover .corner {
      border-color: var(--color-purple);
      box-shadow: 0 0 8px var(--color-purple);
    }

    .glow-frame.cyan.hover-effect:hover .corner {
      border-color: var(--color-cyan);
      box-shadow: 0 0 8px var(--color-cyan);
    }

    /* Cyber Corner Brackets */
    .corner {
      position: absolute;
      width: 14px;
      height: 14px;
      border: 2px solid rgba(255, 255, 255, 0.25);
      transition: all 0.3s ease;
      pointer-events: none;
      z-index: 3;
    }

    .corner.top-left {
      top: -1px; left: -1px;
      border-right: none; border-bottom: none;
    }
    .corner.top-right {
      top: -1px; right: -1px;
      border-left: none; border-bottom: none;
    }
    .corner.bottom-left {
      bottom: -1px; left: -1px;
      border-right: none; border-top: none;
    }
    .corner.bottom-right {
      bottom: -1px; right: -1px;
      border-left: none; border-top: none;
    }

    .frame-content {
      position: relative;
      z-index: 2;
    }

    /* Laser Scanner Animation */
    .laser-scanner {
      position: absolute;
      top: 0; left: 0;
      width: 100%; height: 2px;
      background: linear-gradient(90deg, transparent, var(--color-cyan), transparent);
      box-shadow: 0 0 8px var(--color-cyan);
      opacity: 0;
      z-index: 1;
      pointer-events: none;
      animation: scanning 5s linear infinite;
    }
    
    .glow-frame.purple .laser-scanner {
      background: linear-gradient(90deg, transparent, var(--color-purple), transparent);
      box-shadow: 0 0 8px var(--color-purple);
    }

    @keyframes scanning {
      0% { top: 0%; opacity: 0; }
      10% { opacity: 0.8; }
      90% { opacity: 0.8; }
      100% { top: 100%; opacity: 0; }
    }
  `],
  standalone: false
})
export class GlowFrame {
  @Input() theme: 'purple' | 'cyan' | 'default' = 'default';
  @Input() showScanner = false;
  @Input() enableHover = true;
}
