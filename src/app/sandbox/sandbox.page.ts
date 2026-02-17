import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonMenuButton, IonSearchbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-sandbox',
  templateUrl: './sandbox.page.html',
  styleUrls: ['./sandbox.page.scss'],
  standalone: true,
  imports: [IonSearchbar, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonMenuButton]
})
export class SandboxPage implements OnInit {
isShrunk = false;
  shrinkTrigger = 150; // adjust to control when shrinking happens

maxHeight = window.innerHeight * 0.5;
minHeight = 80;
currentHeight = this.maxHeight;

onScroll(event: any) {
  const scrollTop = event.detail.scrollTop;

  const newHeight = Math.max(
    this.maxHeight - scrollTop,
    this.minHeight
  );

  this.currentHeight = newHeight;
}
  constructor() { }

  ngOnInit() {
  }

}
