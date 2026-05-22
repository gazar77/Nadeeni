import { Component } from '@angular/core';

interface TechNode {
  name: string;
  theme: 'purple' | 'cyan' | 'white';
  angle: number; // Position in degrees (0 - 360)
  orbitRadius: number; // Distance in pixels from center
  desc: string;
}

@Component({
  selector: 'feature-tech-stack',
  template: `
    <section class="tech-section" id="tech">
      <div class="grid-backdrop"></div>
      <div class="ambient-glow purple"></div>
      <div class="ambient-glow cyan"></div>

      <div class="tech-header">
        <span class="hud-category">[ COGNITIVE_TECTONIC_SPHERE ]</span>
        <h2 class="section-title">THE TECH UNIVERSE</h2>
        <p class="section-subtitle">
          An interactive digital solar system representing our interconnected engineering capabilities.
        </p>
        <div class="divider"></div>
      </div>

      <!-- Universe Container with Mouse-Interactive 3D Tilt -->
      <div class="universe-wrapper" (mousemove)="onMouseMove($event)" (mouseleave)="onMouseLeave()">
        <div class="universe-system" [style.transform]="tiltStyle" [class.paused]="paused">
          
          <!-- Concentric Orbit Lines -->
          <div class="orbit-line inner"></div>
          <div class="orbit-line middle"></div>
          <div class="orbit-line outer"></div>

          <!-- Central Core Energy Sphere -->
          <div class="core-hub" (mouseenter)="paused = true" (mouseleave)="paused = false">
            <div class="core-particles"></div>
            <div class="core-glow"></div>
            <div class="core-ring r1"></div>
            <div class="core-ring r2"></div>
            <span class="core-text">NADEENI CORE</span>
          </div>

          <!-- Orbiting Nodes distributed geometrically -->
          <div class="tech-node-container" 
               *ngFor="let node of nodes; let i = index"
               [attr.data-theme]="node.theme"
               [style.--orbit-radius.px]="node.orbitRadius"
               [style.--init-angle.deg]="node.angle"
               [style.--spin-duration]="(node.orbitRadius * 0.12) + 's'"
               (mouseenter)="onNodeHover(node)"
               (mouseleave)="onNodeLeave()">
            
            <div class="node-scaler">
              <!-- Reversible rotation keeps node text upright while orbit spins! -->
              <div class="node-body">
                <span class="tech-glow"></span>
                <span class="tech-icon">+</span>
                <span class="tech-label">{{ node.name }}</span>
              </div>
            </div>

          </div>

        </div>
      </div>

      <!-- Interactive Context Overlay Panel -->
      <div class="overlay-panel" [class.visible]="hoveredNode">
        <div class="glow-frame purple" *ngIf="hoveredNode">
          <span class="panel-tag">[ COGNITIVE_INDEX: {{ hoveredNode.name | uppercase }} ]</span>
          <h3 class="panel-title">{{ hoveredNode.name }}</h3>
          <p class="panel-desc">{{ hoveredNode.desc }}</p>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .tech-section {
      position: relative;
      background-color: #0b0f19;
      padding: 120px 24px;
      overflow: hidden;
      width: 100%;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      perspective: 1200px;
    }

    .grid-backdrop {
      position: absolute;
      top: 0; left: 0; width: 100%; height: 100%;
      background-image: 
        linear-gradient(rgba(255, 255, 255, 0.005) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255, 255, 255, 0.005) 1px, transparent 1px);
      background-size: 60px 60px;
      pointer-events: none;
      z-index: 0;
    }

    .ambient-glow {
      position: absolute;
      width: 600px; height: 600px;
      border-radius: 50%;
      filter: blur(140px);
      opacity: 0.06;
      pointer-events: none;
      z-index: 1;
    }

    .ambient-glow.purple {
      top: 10%; left: -200px;
      background: var(--color-purple);
    }

    .ambient-glow.cyan {
      bottom: 10%; right: -200px;
      background: var(--color-cyan);
    }

    .tech-header {
      text-align: center;
      margin-bottom: 64px;
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
      background: linear-gradient(90deg, transparent, var(--color-cyan), var(--color-purple), transparent);
      margin: 20px auto 0 auto;
      box-shadow: 0 0 8px var(--color-cyan);
    }

    /* Universe wrapper for mouse interaction */
    .universe-wrapper {
      position: relative;
      width: 100%;
      max-width: 800px;
      height: 600px;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 2;
      cursor: crosshair;
    }

    .universe-system {
      position: relative;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      transform-style: preserve-3d;
      transition: transform 0.25s cubic-bezier(0.25, 0.8, 0.25, 1);
    }

    /* Orbit Rings Background */
    .orbit-line {
      position: absolute;
      border: 1px solid rgba(255, 255, 255, 0.03);
      border-radius: 50%;
      pointer-events: none;
      transform-style: preserve-3d;
      
      &.inner {
        width: 280px; height: 280px;
        border-color: rgba(89, 146, 236, 0.08);
      }
      &.middle {
        width: 460px; height: 460px;
        border-color: rgba(50, 214, 165, 0.08);
      }
      &.outer {
        width: 640px; height: 640px;
        border-color: rgba(255, 255, 255, 0.04);
      }
    }

    /* Central Hub */
    .core-hub {
      position: relative;
      width: 120px;
      height: 120px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 10;
      cursor: pointer;
      transform-style: preserve-3d;
      transform: translateZ(20px);
    }

    .core-glow {
      position: absolute;
      width: 100%; height: 100%;
      border-radius: 50%;
      background: radial-gradient(circle, var(--color-purple) 0%, transparent 80%);
      box-shadow: 0 0 30px rgba(89, 146, 236, 0.4);
      opacity: 0.65;
      animation: pulse-core 4s infinite alternate ease-in-out;
    }

    .core-ring {
      position: absolute;
      border: 1.5px dashed rgba(50, 214, 165, 0.4);
      border-radius: 50%;
      
      &.r1 {
        width: 140px; height: 140px;
        animation: spin-hub 25s infinite linear;
      }
      
      &.r2 {
        width: 110px; height: 110px;
        border-style: dotted;
        border-color: rgba(89, 146, 236, 0.5);
        animation: spin-hub 15s infinite linear reverse;
      }
    }

    .core-text {
      font-family: var(--font-cyber);
      font-size: 0.75rem;
      font-weight: 900;
      color: var(--color-white);
      letter-spacing: 2px;
      z-index: 2;
      text-shadow: 0 0 8px var(--color-purple);
    }

    /* Orbiting Nodes */
    .tech-node-container {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 0;
      height: 0;
      z-index: 5;
      transform-style: preserve-3d;
      
      /* Circular orbit trajectory via CSS Keyframes! */
      animation: orbital-rotation var(--spin-duration) infinite linear;
    }

    /* Pause orbit rotation on global paused triggers */
    .universe-system.paused .tech-node-container {
      animation-play-state: paused;
    }

    .node-scaler {
      position: absolute;
      top: 0; left: 0;
      transform: translate(-50%, -50%);
      transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }

    /* Reverse-rotation of the node body cancels text spinning! */
    .node-body {
      position: relative;
      padding: 10px 20px;
      background: rgba(11, 15, 25, 0.85);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 4px;
      display: flex;
      align-items: center;
      gap: 10px;
      cursor: pointer;
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
      box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
      transition: all 0.4s ease;
      
      animation: orbital-reverse-rotation var(--spin-duration) infinite linear;
    }

    .universe-system.paused .node-body {
      animation-play-state: paused;
    }

    .tech-node-container[data-theme="purple"] .node-body { border-color: rgba(89, 146, 236, 0.25); }
    .tech-node-container[data-theme="cyan"] .node-body { border-color: rgba(50, 214, 165, 0.25); }

    .tech-glow {
      position: absolute;
      top: 0; left: 0; width: 100%; height: 100%;
      border-radius: 4px;
      opacity: 0;
      pointer-events: none;
      transition: all 0.3s ease;
    }

    .tech-node-container[data-theme="purple"] .tech-glow { background: radial-gradient(circle, rgba(89, 146, 236, 0.2) 0%, transparent 90%); }
    .tech-node-container[data-theme="cyan"] .tech-glow { background: radial-gradient(circle, rgba(50, 214, 165, 0.2) 0%, transparent 90%); }

    .tech-icon {
      font-family: var(--font-mono);
      font-size: 0.95rem;
      font-weight: bold;
      color: rgba(255, 255, 255, 0.4);
      transition: all 0.3s ease;
    }

    .tech-label {
      font-family: var(--font-cyber);
      font-size: 0.85rem;
      font-weight: 600;
      letter-spacing: 1px;
      color: var(--color-white);
      opacity: 0.85;
      white-space: nowrap;
      transition: all 0.3s ease;
    }

    /* Node Hover Behaviors */
    .tech-node-container:hover {
      z-index: 20;
    }

    .tech-node-container:hover .node-scaler {
      transform: translate(-50%, -50%) scale(1.15) translateZ(30px);
    }

    .tech-node-container:hover .node-body {
      background: rgba(17, 24, 39, 0.95);
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.45);
    }

    .tech-node-container[data-theme="purple"]:hover .node-body {
      border-color: var(--color-purple);
      box-shadow: 0 0 20px rgba(89, 146, 236, 0.4);
      .tech-icon, .tech-label { color: var(--color-purple); opacity: 1; text-shadow: 0 0 6px var(--color-purple); }
    }

    .tech-node-container[data-theme="cyan"]:hover .node-body {
      border-color: var(--color-cyan);
      box-shadow: 0 0 20px rgba(50, 214, 165, 0.4);
      .tech-icon, .tech-label { color: var(--color-cyan); opacity: 1; text-shadow: 0 0 6px var(--color-cyan); }
    }

    .tech-node-container:hover .tech-glow {
      opacity: 1;
    }

    /* Overlay Panel description */
    .overlay-panel {
      position: absolute;
      bottom: 40px;
      width: 100%;
      max-width: 500px;
      height: 120px;
      display: flex;
      justify-content: center;
      z-index: 10;
      pointer-events: none;
      opacity: 0;
      transform: translateY(20px);
      transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
      
      &.visible {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .panel-tag {
      font-family: var(--font-mono);
      font-size: 0.65rem;
      color: var(--color-purple);
      letter-spacing: 2px;
      display: block;
      margin-bottom: 4px;
    }

    .panel-title {
      font-family: var(--font-cyber);
      font-size: 1.25rem;
      font-weight: 700;
      color: var(--color-white);
      margin-bottom: 8px;
    }

    .panel-desc {
      font-size: 0.85rem;
      line-height: 1.5;
      color: var(--color-white);
      opacity: 0.8;
    }

    /* Concentric Orbiting Animations (Math-linked values) */
    @keyframes orbital-rotation {
      from { transform: rotate(var(--init-angle)) translateX(var(--orbit-radius)) rotate(0deg); }
      to { transform: rotate(var(--init-angle)) translateX(var(--orbit-radius)) rotate(360deg); }
    }

    @keyframes orbital-reverse-rotation {
      from { transform: rotate(0deg); }
      to { transform: rotate(-360deg); }
    }

    @keyframes pulse-core {
      0%, 100% { opacity: 0.55; transform: translateZ(20px) scale(0.98); }
      50% { opacity: 0.75; transform: translateZ(20px) scale(1.02); }
    }

    @keyframes spin-hub {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }

    @media (max-width: 768px) {
      .universe-wrapper {
        transform: scale(0.7);
        height: 480px;
      }
      .tech-section {
        padding: 64px 16px;
      }
      .section-title {
        font-size: 2rem;
      }
    }
  `],
  standalone: false
})
export class TechStack {
  paused = false;
  hoveredNode: TechNode | null = null;
  tiltStyle = '';

  // Concentric Orbit nodes positioning (10 items)
  // Orbit Radii: Inner (140px), Middle (230px), Outer (320px)
  nodes: TechNode[] = [
    // Inner Orbit: 3 nodes
    { name: 'AI Integration', theme: 'purple', angle: 0, orbitRadius: 140, desc: 'Advanced cognitive systems, prompt architectures, and local/cloud neural orchestration layers.' },
    { name: 'Figma', theme: 'cyan', angle: 120, orbitRadius: 140, desc: 'Ultra-modern collaborative prototyping, responsive screen wireframing, and componentized design tokens.' },
    { name: 'REST APIs', theme: 'white', angle: 240, orbitRadius: 140, desc: 'Secure, low-latency communication endpoints structuring modular distributed data ecosystems.' },
    
    // Middle Orbit: 4 nodes
    { name: 'FastAPI', theme: 'cyan', angle: 45, orbitRadius: 230, desc: 'Asynchronous Python core microservices delivering lightning-fast AI integration routing endpoints.' },
    { name: 'Firebase', theme: 'white', angle: 135, orbitRadius: 230, desc: 'Cloud storage syncing, serverless functions, authentication hooks, and real-time document models.' },
    { name: 'SQL', theme: 'purple', angle: 225, orbitRadius: 230, desc: 'Relational data query optimizations, transaction compliance, and high-performance tabular storage.' },
    { name: 'Flutter', theme: 'cyan', angle: 315, orbitRadius: 230, desc: 'Cross-platform mobile applications delivering 120Hz native liquid layouts and graphic-heavy UIs.' },
    
    // Outer Orbit: 3 nodes
    { name: 'Angular', theme: 'purple', angle: 0, orbitRadius: 320, desc: 'Enterprise modular frontends implementing reactive RxJS stream networks and strict typings.' },
    { name: 'Spring Boot', theme: 'white', angle: 120, orbitRadius: 320, desc: 'Secure Java microservices engineering clean transactional databases and corporate architectures.' },
    { name: '.NET', theme: 'cyan', angle: 240, orbitRadius: 320, desc: 'Scalable C# backends featuring modular architecture blueprints and enterprise API pipelines.' }
  ];

  onMouseMove(event: MouseEvent): void {
    const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    // Center normalized values from -15 to 15
    const tiltX = ((y / rect.height) - 0.5) * -20;
    const tiltY = ((x / rect.width) - 0.5) * 20;

    this.tiltStyle = `rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
  }

  onMouseLeave(): void {
    this.tiltStyle = 'rotateX(0deg) rotateY(0deg)';
  }

  onNodeHover(node: TechNode): void {
    this.paused = true;
    this.hoveredNode = node;
  }

  onNodeLeave(): void {
    this.paused = false;
    this.hoveredNode = null;
  }
}
