import { Component, ElementRef, HostListener, NgZone, OnDestroy, OnInit, ViewChild } from '@angular/core';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  alpha: number;
  decay: number;
}

@Component({
  selector: 'shared-particle-bg',
  template: `<canvas #canvas class="particles-canvas"></canvas>`,
  styles: [`
    .particles-canvas {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: block;
      pointer-events: none;
      z-index: 0;
    }
  `],
  standalone: false
})
export class ParticleBg implements OnInit, OnDestroy {
  @ViewChild('canvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;
  
  private ctx!: CanvasRenderingContext2D;
  private particles: Particle[] = [];
  private animationFrameId?: number;
  private mouseX = 0;
  private mouseY = 0;
  private targetMouseX = 0;
  private targetMouseY = 0;

  constructor(private ngZone: NgZone) {}

  ngOnInit(): void {
    const canvas = this.canvasRef.nativeElement;
    this.ctx = canvas.getContext('2d')!;
    this.resizeCanvas();
    this.initParticles();
    
    // Run animation outside of Angular's zone to prevent change detection from firing on every frame
    this.ngZone.runOutsideAngular(() => {
      this.animate();
    });
  }

  ngOnDestroy(): void {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
  }

  @HostListener('window:resize')
  onResize(): void {
    this.resizeCanvas();
    this.initParticles();
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    const width = window.innerWidth;
    const height = window.innerHeight;
    
    // Normalize coordinates from -30 to 30
    this.targetMouseX = ((event.clientX / width) - 0.5) * 60;
    this.targetMouseY = ((event.clientY / height) - 0.5) * 60;
  }

  private resizeCanvas(): void {
    const canvas = this.canvasRef.nativeElement;
    canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
    canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
  }

  private initParticles(): void {
    this.particles = [];
    const canvas = this.canvasRef.nativeElement;
    const particleCount = Math.min(80, Math.floor((canvas.width * canvas.height) / 18000));
    
    const colors = [
      'rgba(89, 146, 236, ', // Steel Blue
      'rgba(50, 214, 165, ',  // Emerald/Teal
      'rgba(255, 255, 255, '  // White
    ];

    for (let i = 0; i < particleCount; i++) {
      this.particles.push(this.createParticle(canvas.width, canvas.height, colors));
    }
  }

  private createParticle(width: number, height: number, colors: string[]): Particle {
    return {
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4 - 0.2, // Drift slightly upwards
      radius: Math.random() * 2 + 0.5,
      color: colors[Math.floor(Math.random() * colors.length)],
      alpha: Math.random() * 0.6 + 0.1,
      decay: 0.001
    };
  }

  private animate(): void {
    const canvas = this.canvasRef.nativeElement;
    if (!canvas) return;

    this.ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Smoothly interpolate mouse coordinates
    this.mouseX += (this.targetMouseX - this.mouseX) * 0.05;
    this.mouseY += (this.targetMouseY - this.mouseY) * 0.05;

    this.particles.forEach((p) => {
      // Draw particle with mouse-induced parallax offset
      const drawX = p.x + this.mouseX * (p.radius * 0.5);
      const drawY = p.y + this.mouseY * (p.radius * 0.5);

      this.ctx.beginPath();
      this.ctx.arc(drawX, drawY, p.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = `${p.color}${p.alpha})`;
      
      // Neon glow shadow for larger particles
      if (p.radius > 1.8) {
        this.ctx.shadowBlur = 10;
        this.ctx.shadowColor = p.color.includes('89') ? '#5992ec' : '#32d6a5';
      } else {
        this.ctx.shadowBlur = 0;
      }

      this.ctx.fill();

      // Move particle
      p.x += p.vx;
      p.y += p.vy;

      // Wrap-around screen bounds
      if (p.x < 0) p.x = canvas.width;
      if (p.x > canvas.width) p.x = 0;
      if (p.y < 0) p.y = canvas.height;
      if (p.y > canvas.height) p.y = 0;
    });

    this.animationFrameId = requestAnimationFrame(() => this.animate());
  }
}
