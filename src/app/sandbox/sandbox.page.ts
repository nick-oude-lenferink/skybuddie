import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonMenuButton, IonSearchbar, IonItem, IonList, IonLabel, IonButton } from '@ionic/angular/standalone';

@Component({
  selector: 'app-sandbox',
  templateUrl: './sandbox.page.html',
  styleUrls: ['./sandbox.page.scss'],
  standalone: true,
  imports: [IonButton, IonLabel, IonList, IonItem, IonSearchbar, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonMenuButton]
})
export class SandboxPage implements OnInit {
dynamicHeroHeight = window.innerHeight * 0.5; // Start at 50%
toolbarOpacity = 0;
logoTransform = '';
logoWidth= '';
onScroll(ev: any) {
  const scrollTop = ev.detail.scrollTop;
  const screenHeight = window.innerHeight;
  const initialHeroHeight = screenHeight * 0.5;
  const collapsedHeight = 56;// + 44; // Toolbar + Safe Area (approx)
  
  // The distance the header needs to shrink
  const shrinkDistance = initialHeroHeight - collapsedHeight;
  
  let progress = scrollTop / shrinkDistance;
  if (progress > 1) progress = 1;
  if (progress < 0) progress = 0;

  // 1. Shrink the height of the hero background
  this.dynamicHeroHeight = initialHeroHeight - (progress * shrinkDistance);
  
  // 2. Control Toolbar Visibility
  this.toolbarOpacity = progress;

  // 3. Move/Scale Logo relative to the shrinking container
  // We move it from the center of 50vh to the center of the toolbar
  const moveX = progress * -42; 
  const scale = 1 - (progress * 0.65);
  
  // We keep Y at 0 because the container itself is shrinking, 
  // effectively moving the center point upward for us.
  this.logoTransform = `translate3d(${moveX}vw, 0, 0) scale(${scale})`;
  console.log(progress);
  
  this.logoWidth = `${100 - (100*progress)}%`;
  console.log(this.logoWidth);
  
}

  constructor() { }

  ngOnInit() {
  }

}
