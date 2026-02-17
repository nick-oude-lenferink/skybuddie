import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonMenuButton, IonButtons } from '@ionic/angular/standalone';
import { LeafletDirective, LeafletLayersDirective } from '@bluehalo/ngx-leaflet'
import L, { latLng, tileLayer } from 'leaflet';
import { MapMarker } from '../home/map-marker.model';
import { MarkerService } from '../home/marker.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
  standalone: true,
  imports: [IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, IonMenuButton, CommonModule, FormsModule, LeafletDirective, LeafletLayersDirective]
})
export class MapPage {
  map!: L.Map;
  options: L.MapOptions = {
    center: [51.505, -0.09],
    zoom: 13
  };

  layers: L.Layer[] = [];

  constructor(private markerService: MarkerService) { }
  onMapReady(map: L.Map) {
    this.map = map;

    const tileLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19 });
    this.layers = [tileLayer]; // Bind tile layer via directive

    // If you have markers from a service
    this.markerService.getMarkers().subscribe((markers: MapMarker[]) => {
      const markerLayers = markers.map(m => L.marker([m.lat, m.lng])        .bindPopup(`${m.code} - ${m.name}`));
      this.layers = [...this.layers, ...markerLayers]; // Add markers reactively
    });
  }

  ionViewDidEnter() {
    setTimeout(() => {
      this.map!.invalidateSize();
    }, 0);
  }
}
