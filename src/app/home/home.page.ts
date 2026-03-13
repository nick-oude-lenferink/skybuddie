import { AfterViewInit, Component, effect, ElementRef, OnInit, Signal, signal, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonMenuButton, IonButtons, IonSearchbar, IonIcon, IonGrid, IonRow, IonCol, IonList, IonRouterLink } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { star, starOutline } from 'ionicons/icons';
import L, { tileLayer, latLng, marker, icon } from 'leaflet';
import { toSignal } from '@angular/core/rxjs-interop';
import { MarkerService } from './marker.service';
import { MapMarker } from './map-marker.model';
import { Review } from './review.model';
import { ReviewService } from './review.service';
import { DateTime } from 'luxon';
import { RelativeDatePipe } from '../core/pipes/relative-date.pipe';
import { RouterModule } from '@angular/router';
import { PopularDestination, Highlight } from './popular-destination.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonCol, IonRow, IonGrid, IonSearchbar, IonButtons,
    IonContent, IonHeader, IonToolbar, CommonModule,
    FormsModule, IonMenuButton, RelativeDatePipe, IonRouterLink, RouterModule]
})
export class HomePage implements OnInit {
  @ViewChild('mapContainer', { static: false }) mapContainer!: ElementRef<HTMLDivElement>;
  map?: L.Map;
  mapSignal = signal<L.Map | null>(null);
  markerLayer = L.layerGroup();

  markers = toSignal(
    this.markerService.getMarkers(),
    { initialValue: [] }
  );

  reviewsSignal: Signal<Review[]>;
  destinationsSignal: Signal<PopularDestination[]>;

  reviews: Review[] = [];
  destinations: PopularDestination[] = [];
  highlight: Highlight = {
    code: 'EHGG',
    name: 'Groningen Airport Eelde',
    description: 'Perfect for a vibrant city trip to Groningen',
    icon: '🏙️',
    imageName: 'Groningen.png',
    tag: 'City Experience',
    location: 'Eelde, Netherlands'
  };

  activities: string[] = ['Nature walks', 'Cycling tours', 'Garden visits'];

  constructor(private markerService: MarkerService, private reviewService: ReviewService) {
    this.reviewsSignal = toSignal(this.reviewService.getReviews(), { initialValue: [] });
    effect(() => {
      this.reviews = this.reviewsSignal();
    });

    this.destinationsSignal = toSignal(this.reviewService.getPopularDestinations(), { initialValue: [] });
    effect(() => {
      this.destinations = this.destinationsSignal();
    });

    addIcons({ starOutline, star });
    effect(() => {
      const map = this.mapSignal();
      const markers = this.markers();
      if (!map) {
        return;
      }

      this.updateMarkers(markers);
    });
  }

  ionViewDidEnter() {
    this.initializeMap();
  }

  initializeMap() {
    this.map = L.map(this.mapContainer.nativeElement, {
      center: latLng(52.34788021254157, 5.618010883431486),
      zoom: 6.5
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19
    }).addTo(this.map);

    // Force Leaflet to recalc size and load tiles
    // setTimeout(() => {
    //   this.map!.invalidateSize();
    // }, 0);

    this.mapSignal.set(this.map);
    this.markerLayer.addTo(this.map);
    this.buildLegend(this.map);
  }

  private buildLegend(map: L.Map) {
    const legend = new L.Control({ position: 'bottomright' });

    legend.onAdd = () => {
      const div = L.DomUtil.create('div', 'info legend');

      div.innerHTML = `
        <div class="header">Legend</div>
        <div class="item"><img src="assets/marker-icon.png" height="20px"></img> Airports</div>
      `;

      return div;
    };

    legend.addTo(map);
  }

  private updateMarkers(markers: MapMarker[]) {
    this.markerLayer.clearLayers();

    markers.forEach(m => {
      L.marker([m.lat, m.lng], {
        icon: icon({
          iconSize: [25, 41],
          iconAnchor: [13, 41],
          iconUrl: 'assets/marker-icon.png',
          shadowUrl: 'assets/marker-shadow.png'
        })
      })
        .bindPopup(`${m.code} - ${m.name}`)
        .addTo(this.markerLayer);
    });
  }

  ngOnInit() {
  }
}