import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';

import { IntroLoader } from './intro-loader/intro-loader';
import { Hero } from './hero/hero';
import { StoryTimeline } from './story-timeline/story-timeline';
import { Team } from './team/team';
import { TechStack } from './tech-stack/tech-stack';
import { Projects } from './projects/projects';
import { Vision } from './vision/vision';
import { Contact } from './contact/contact';
import { Footer } from './footer/footer';
import { Navbar } from './navbar/navbar';

@NgModule({
  declarations: [
    IntroLoader,
    Hero,
    StoryTimeline,
    Team,
    TechStack,
    Projects,
    Vision,
    Contact,
    Footer,
    Navbar
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    IntroLoader,
    Hero,
    StoryTimeline,
    Team,
    TechStack,
    Projects,
    Vision,
    Contact,
    Footer,
    Navbar
  ]
})
export class FeaturesModule { }
