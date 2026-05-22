import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ParticleBg } from './components/particle-bg';
import { GlowFrame } from './components/glow-frame';
import { GlassCard } from './components/glass-card';

@NgModule({
  declarations: [
    ParticleBg,
    GlowFrame,
    GlassCard
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ParticleBg,
    GlowFrame,
    GlassCard,
    CommonModule
  ]
})
export class SharedModule { }
