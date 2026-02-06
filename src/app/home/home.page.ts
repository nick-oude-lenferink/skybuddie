import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonMenuButton, IonButtons, IonSearchbar, IonIcon, IonGrid, IonRow, IonCol } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { star, starOutline } from 'ionicons/icons';
import L, { tileLayer, latLng, marker, icon } from 'leaflet';
import { LeafletDirective } from '@bluehalo/ngx-leaflet';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonCol, IonRow, IonGrid, IonIcon, IonSearchbar, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonMenuButton, LeafletDirective]
})
export class HomePage implements OnInit {
  map!: L.Map;

  reviews: Review[] = [];
  options = {
    layers: [
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      }),
      marker([52.370216, 4.895168], {
        icon: icon({
          iconSize: [25, 41],
          iconAnchor: [13, 41],
          iconUrl: 'assets/marker-icon.png',
          shadowUrl: 'assets/marker-shadow.png'
        })
      })
    ],
    zoom: 10,
    center: latLng(52.0705, 4.3007) // Den Haag
  };
  constructor() {
    addIcons({ starOutline, star }); // you are missing addIcons Import
  }
  onMapReady(map: L.Map) {
    this.map = map;
    map.on('baselayerchange', (eventLayer) => {
      const v1 = 1;
      const v2 = 2;
      const v3 = 3;
      const legend = new (L.Control.extend({
        options: { position: 'bottomright' }
      }));

      const vm = this;
      legend.onAdd = function (map) {
        const div = L.DomUtil.create('div', 'legend');
        const labels = [
          'Sales greater than ' + v1,
          'Sales greater than ' + v2,
          'Sales equal or less than ' + v3
        ];
        const grades = [v1 + 1, v2 + 1, v3];
        div.innerHTML = '<div><b>Legend</b></div>';
        for (let i = 0; i < grades.length; i++) {
          div.innerHTML += '<i style="background:' + 'blue' + '"> &nbsp; &nbsp;</i> &nbsp; &nbsp;'
            + labels[i] + '<br/>';
        }
        return div;
      };
      legend.addTo(map);
    });
  }
  ionViewDidEnter() {
    setTimeout(() => {
      console.log('did');

      this.map.invalidateSize();
    }, 200);
  }
  ngOnInit() {
    this.reviews = [
      {
        userFullName: 'Jan Jansen',
        date: new Date(),
        description: 'Excellent tool for VFR planning! The airspaces are clearly marked and the map is well organized.',
        rating: 5,
        location: 'EHTE - Teuge'
      },
      {
        userFullName: 'Lisa van der Berg',
        date: new Date(),
        description: 'Exactly what I was looking for. All relevant information for VFR flights in one overview. Top!',
        rating: 4,
        location: 'EHTE - Teuge'
      }
    ];
  }

}

export class Review {
  userFullName!: string;
  date!: Date;
  description!: string;
  location!: string;
  rating!: number;
}
