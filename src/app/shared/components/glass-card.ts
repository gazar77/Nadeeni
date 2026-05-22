import { Component, Input } from '@angular/core';

@Component({
  selector: 'shared-glass-card',
  template: `
    <div class="glass-card" [class.hoverable]="isHoverable">
      <div class="card-bg-glow"></div>
      <div class="card-content">
        <ng-content></ng-content>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }

    .glass-card {
      position: relative;
      border-radius: 12px;
      background: rgba(17, 24, 39, 0.45);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border: 1px solid rgba(255, 255, 255, 0.05);
      padding: 24px;
      overflow: hidden;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
      transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .card-bg-glow {
      position: absolute;
      top: -50%; left: -50%;
      width: 200%; height: 200%;
      background: radial-gradient(circle at 50% 50%, rgba(89, 146, 236, 0.06) 0%, transparent 60%);
      pointer-events: none;
      z-index: 1;
      transition: background 0.5s ease, transform 0.5s ease;
    }

    .card-content {
      position: relative;
      z-index: 2;
    }

    /* Hover States */
    .glass-card.hoverable {
      cursor: pointer;
    }

    .glass-card.hoverable:hover {
      transform: translateY(-6px);
      border-color: rgba(61, 175, 138, 0.18);
      box-shadow: 0 15px 45px rgba(61, 175, 138, 0.12);
    }

    .glass-card.hoverable:hover .card-bg-glow {
      background: radial-gradient(circle at 50% 50%, rgba(61, 175, 138, 0.12) 0%, transparent 50%);
    }
  `],
  standalone: false
})
export class GlassCard {
  @Input() isHoverable = true;
}
