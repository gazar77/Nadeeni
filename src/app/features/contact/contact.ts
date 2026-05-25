import { Component, OnInit, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'feature-contact',
  template: `
    <section class="contact-section" id="contact">
      <!-- Ambient backing stardust -->
      <shared-particle-bg></shared-particle-bg>
      
      <!-- Backing light sources -->
      <div class="ambient-glow purple"></div>
      <div class="ambient-glow cyan"></div>
      
      <div class="contact-container">
        
        <!-- Cinematic Ending Scene Narrative -->
        <div class="ending-panel">
          <span class="hud-mono">[ CONCLUDING_SYSTEM_RESOLVE ]</span>
          <h2 class="sequence-title">
            <span class="phrase">Five Minds.</span>
            <span class="phrase">One Vision.</span>
            <span class="phrase accent glow-purple">Nadeeni.</span>
          </h2>
        </div>

        <!-- Cyber Form Dispatch Panel -->
        <div class="form-wrapper">
          <shared-glow-frame theme="cyan" [showScanner]="false" [enableHover]="false">
            <h3 class="form-title">COMMENCE INTEGRATION</h3>
            <p class="form-desc">Sync your requirements directly with our developers to start building.</p>
            
            <form class="cyber-form" (submit)="onSubmit($event)">
              <div class="input-group">
                <span class="corner-bracket">[</span>
                <input type="text" placeholder="IDENTITY_NAME" required name="name" class="cyber-input" />
                <span class="corner-bracket">]</span>
              </div>

              <div class="input-group">
                <span class="corner-bracket">[</span>
                <input type="email" placeholder="IDENTITY_EMAIL" required name="email" class="cyber-input" />
                <span class="corner-bracket">]</span>
              </div>

              <div class="input-group text-area">
                <span class="corner-bracket">[</span>
                <textarea placeholder="SYSTEM_OBJECTIVES_DESC" required rows="4" name="message" class="cyber-input"></textarea>
                <span class="corner-bracket">]</span>
              </div>

              <button type="submit" class="cyber-button primary glow-cyan submit-btn" [disabled]="isSubmitting">
                {{ isSubmitting ? 'DISPATCHING PACKETS...' : 'SUBMIT PROJECT DISPATCH' }}
                <svg *ngIf="!isSubmitting" xmlns="http://www.w3.org/2000/svg" height="18" viewBox="0 -960 960 960" width="18" fill="currentColor">
                  <path d="M120-160v-640l760 320-760 320Zm80-120 474-200-474-200v134l240 66-240 66v134Z"/>
                </svg>
                <svg *ngIf="isSubmitting" class="spinner" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><circle cx="12" cy="12" r="10" stroke-dasharray="32" stroke-dashoffset="8"></circle></svg>
              </button>
            </form>
          </shared-glow-frame>
        </div>

      </div>

      <!-- Futuristic Cyber Notification Toast -->
      <div 
        class="cyber-notification-toast" 
        [class.active]="showToast" 
        [class.error-theme]="toastTheme === 'error'"
      >
        <div class="toast-header">
          <span class="status-pulse"></span>
          <span>{{ toastHeader }}</span>
        </div>
        <div class="toast-body" [innerHTML]="toastBody"></div>
      </div>
    </section>
  `,
  styles: [`
    .contact-section {
      position: relative;
      background-color: #080b13;
      padding: 140px 24px;
      overflow: hidden;
      width: 100%;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .ambient-glow {
      position: absolute;
      width: 500px; height: 500px;
      border-radius: 50%;
      filter: blur(140px);
      opacity: 0.08;
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

    .contact-container {
      position: relative;
      z-index: 2;
      max-width: 1100px;
      width: 100%;
      display: grid;
      grid-template-columns: 1.1fr 0.9fr;
      gap: 56px;
      align-items: center;

      @media (max-width: 900px) {
        grid-template-columns: 1fr;
        gap: 64px;
      }
    }

    /* Narrative panel */
    .ending-panel {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      text-align: left;
      will-change: transform, opacity;
    }

    .hud-mono {
      font-family: var(--font-mono);
      font-size: 0.8rem;
      color: var(--color-cyan);
      letter-spacing: 4px;
      margin-bottom: 24px;
      text-shadow: 0 0 8px rgba(61, 175, 138, 0.4);
    }

    .sequence-title {
      font-family: var(--font-cyber);
      font-size: 4rem;
      font-weight: 900;
      line-height: 1.2;
      color: var(--color-white);
      display: flex;
      flex-direction: column;
      gap: 8px;
      text-transform: uppercase;
      letter-spacing: 2px;
      
      .accent {
        color: var(--color-purple);
        text-shadow: 0 0 20px rgba(89, 146, 236, 0.5);
      }
      
      @media (max-width: 768px) {
        font-size: 2.5rem;
      }
    }

    /* Form Styles */
    .form-wrapper {
      width: 100%;
      will-change: transform, opacity;
    }

    .form-title {
      font-family: var(--font-cyber);
      font-size: 1.4rem;
      font-weight: 700;
      color: var(--color-white);
      margin-bottom: 8px;
      letter-spacing: 2px;
    }

    .form-desc {
      font-size: 0.85rem;
      color: var(--color-white);
      opacity: 0.7;
      margin-bottom: 32px;
      line-height: 1.5;
    }

    .cyber-form {
      display: flex;
      flex-direction: column;
      gap: 24px;
    }

    .input-group {
      display: flex;
      align-items: center;
      position: relative;
      background: rgba(255, 255, 255, 0.02);
      border: 1px solid rgba(255, 255, 255, 0.05);
      border-radius: 4px;
      transition: all 0.3s ease;

      &.text-area {
        align-items: flex-start;
        padding-top: 8px;
      }
      
      &:hover {
        border-color: rgba(61, 175, 138, 0.2);
        background: rgba(61, 175, 138, 0.01);
      }

      &:focus-within {
        border-color: var(--color-cyan);
        box-shadow: 0 0 15px rgba(61, 175, 138, 0.15);
        background: rgba(61, 175, 138, 0.02);
        
        .corner-bracket {
          color: var(--color-cyan);
          text-shadow: 0 0 5px var(--color-cyan);
        }
      }
    }

    .corner-bracket {
      font-family: var(--font-mono);
      font-size: 1.1rem;
      color: rgba(255, 255, 255, 0.15);
      padding: 0 12px;
      pointer-events: none;
      transition: all 0.3s ease;
      user-select: none;
    }

    .cyber-input {
      flex: 1;
      background: transparent;
      border: none;
      outline: none;
      color: var(--color-white);
      font-family: var(--font-mono);
      font-size: 0.85rem;
      padding: 14px 0;
      letter-spacing: 1px;
      
      &::placeholder {
        color: rgba(255, 255, 255, 0.3);
      }
    }

    textarea.cyber-input {
      resize: none;
    }

    .submit-btn {
      width: 100%;
      margin-top: 8px;
    }
    .spinner {
      animation: spin 1s linear infinite;
    }
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
  `],
  standalone: false
})
export class Contact implements OnInit, AfterViewInit {
  showToast = false;
  toastHeader = '';
  toastBody = '';
  toastTheme: 'success' | 'error' = 'success';
  isSubmitting = false;
  private isBrowser = false;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    if (!this.isBrowser) return;

    // Slide in concluding narrative phrases
    gsap.from('.contact-section .ending-panel', {
      x: -45,
      opacity: 0,
      duration: 1.2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.contact-section .contact-container',
        start: 'top 85%'
      }
    });

    // Fade and slide form dispatch wrapper
    gsap.from('.contact-section .form-wrapper', {
      x: 45,
      opacity: 0,
      duration: 1.2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.contact-section .contact-container',
        start: 'top 85%'
      }
    });
  }

  async onSubmit(event: Event): Promise<void> {
    event.preventDefault();
    if (this.isSubmitting) return;

    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    
    // Create a plain object from the form data
    const formObject: Record<string, string> = {};
    formData.forEach((value, key) => {
      formObject[key] = value.toString();
    });

    // Custom system boot notification
    this.triggerToast(
      'CONNECTING_NODES', 
      'Syncing parameters... Dispatching system packet through secure quantum channel.', 
      'success'
    );
    this.isSubmitting = true;

    try {
      const response = await fetch('https://formsubmit.co/ajax/Nadeeni.Group@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formObject)
      });

      const result = await response.json();

      if (response.ok && (result.success === 'true' || result.success === true)) {
        this.triggerToast(
          'INTEGRATION_SUCCESSFUL',
          'SYSTEM_RESOLVE: Dispatch request successfully synchronized and delivered to [Nadeeni.Group@gmail.com]. Protocols initialized!',
          'success'
        );
        form.reset();
      } else {
        throw new Error(result.message || 'Transmission hand-shake rejected.');
      }
    } catch (error: any) {
      console.error(error);
      this.triggerToast(
        'HANDSHAKE_ERROR',
        `PROTOCOL_FAILURE: ${error.message || 'Unable to route transmission packets. Check your uplink/connection and retry.'}`,
        'error'
      );
    } finally {
      this.isSubmitting = false;
    }
  }

  private triggerToast(header: string, body: string, theme: 'success' | 'error'): void {
    this.toastHeader = `[ ${header} ]`;
    this.toastBody = body;
    this.toastTheme = theme;
    this.showToast = true;

    // Auto fade-out after 5.5 seconds
    setTimeout(() => {
      if (this.toastHeader === `[ ${header} ]`) {
        this.showToast = false;
      }
    }, 5500);
  }
}
