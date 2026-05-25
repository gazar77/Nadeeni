import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ParticleBg } from './components/particle-bg';
import { GlowFrame } from './components/glow-frame';
import { GlassCard } from './components/glass-card';
import { CursorComponent } from './components/cursor';

@NgModule({
  declarations: [
    ParticleBg,
    GlowFrame,
    GlassCard,
    CursorComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ParticleBg,
    GlowFrame,
    GlassCard,
    CursorComponent,
    CommonModule
  ]
})
export class SharedModule { }

