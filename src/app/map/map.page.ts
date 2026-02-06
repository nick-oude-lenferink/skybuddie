import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonMenuButton, IonButtons } from '@ionic/angular/standalone';
import {LeafletDirective} from '@bluehalo/ngx-leaflet'
import { latLng, tileLayer } from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
  standalone: true,
  imports: [IonButtons, IonContent, IonHeader, IonTitle, IonToolbar,IonMenuButton, CommonModule, FormsModule, LeafletDirective]
})
export class MapPage implements OnInit {
options = {
    layers: [
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      })
    ],
    zoom: 10,
    center: latLng(52.0705, 4.3007) // Den Haag
  };
  constructor() {
    
  }
 
  ngOnInit() {
    
  }

}
