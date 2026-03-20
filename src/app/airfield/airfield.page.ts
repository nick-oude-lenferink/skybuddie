import { Component, effect, ElementRef, Input, OnInit, Signal, signal, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonMenuButton, IonSearchbar, IonButton, IonBackButton, IonGrid, IonRow, IonCol, IonModal, IonLabel, IonFooter, IonSelect, IonSelectOption, IonDatetime, IonDatetimeButton } from '@ionic/angular/standalone';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { AirfieldService, PointOfInterest, PointsOfInterest } from '../airfields/airfield.service';
import { map, Observable } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import L, { latLng } from 'leaflet';
import { MapMarker } from '../home/map-marker.model';
import { AirfieldDetails } from '../airfields/airfield-details.model';
import { RelativeDatePipe } from "../core/pipes/relative-date.pipe";
import { IonModalCustomEvent, OverlayEventDetail } from '@ionic/core';
import { Review } from '../home/review.model';

@Component({
  selector: 'app-airfield',
  templateUrl: './airfield.page.html',
  styleUrls: ['./airfield.page.scss'],
  standalone: true,
  imports: [IonDatetimeButton, IonDatetime, IonFooter, IonModal, IonCol, IonRow, IonGrid, IonBackButton, IonButtons, IonContent, IonMenuButton, IonToolbar, CommonModule, FormsModule, RouterModule, IonButton, RelativeDatePipe, IonHeader, IonTitle, IonLabel, IonSelect, IonSelectOption]
})
export class AirfieldPage {
  clearRating(ratingKey: string) {
    delete this.reviewInput.ratings[ratingKey];
  }
  @ViewChild(IonModal) modal!: IonModal;
  reviewInput!: ReviewInput;
  submitReview() {
    let newReview: Review = {
      date: new Date(this.reviewInput.date),
      userFullName: this.reviewInput.name,
      description: this.reviewInput.description,
      rating: this.reviewInput.ratings['food_drinks'] ?? 0,
      location: this.airfield()!.name
    };
    this.reviews().push(newReview);

    this.modal.dismiss();
  }
  cancel() {
    this.modal.dismiss(null, 'cancel');
  }
  showCreateReviewModal() {
    this.reviewInput = {
      airfield: `${this.airfield()?.name} (${this.airfield()?.code})`,
      ratings: {
      }
    } as ReviewInput;

    this.reviewInput.date = new Date().toISOString();
  }

  @ViewChild('mapContainer', { static: false }) mapContainer!: ElementRef<HTMLDivElement>;
  map?: L.Map;
  mapSignal = signal<L.Map | null>(null);
  mapReady = signal(false);
  markerLayer = L.layerGroup();
  markers: L.Marker[] = [];

  airfield = this.airfieldService.airfield;
  pointsOfInterest = this.airfieldService.pointsOfInterest;
  reviews = this.airfieldService.reviews;
  idSignal = toSignal(
    this.route.paramMap.pipe(map(params => params.get('id'))));

  essentialInfo: EssentialInfo[] = [
    {
      iconClasses: 'fa-solid fa-plane', title: 'Runway dimensions', description: '1080m (Grass)'
    },
    {
      iconClasses: 'fa-solid fa-compass', title: 'Runway orientation', description: '07/25'
    },
    {
      iconClasses: 'fa-solid fa-location-dot', title: 'Elevation', description: '39 ft / 12 m'
    },
    {
      iconClasses: 'fa-solid fa-location-dot', title: 'Frequency', description: '127.355 MHz (Hoogeveen Radio)'
    },
    {
      iconClasses: 'fa-solid fa-location-dot', title: 'Operating hours', description: 'Summer (Apr 1 - Sep 30): 09:30-19:00 LT, Winter (Oct 1 - Mar 31): 10:00-15 min after sunset'
    },
    {
      iconClasses: 'fa-solid fa-location-dot', title: 'Fuel availability', description: 'Avgas 100LL (€3.13/L), Mogas 100+ ethanol free (€2.28/L), Jet A-1 (€2.20/L)'
    },
    {
      iconClasses: 'fa-solid fa-location-dot', title: 'Landing fees', description: 'Overland landing €23, Terrain landing €13, Touch & Go €13'
    },
    {
      iconClasses: 'fa-solid fa-location-dot', title: 'Parking information', description: 'Outdoor/night parking €12'
    },
    { iconClasses: 'fa-solid fa-location-dot', title: 'AIP reference', description: 'https://eaip.lvnl.nl/%20%7C%20https://www.lvnl.nl/', isLink: true },
    {
      iconClasses: 'fa-solid fa-location-dot', title: 'Customs available', description: 'No'
    },
  ];

  constructor(
    private route: ActivatedRoute,
    private airfieldService: AirfieldService
  ) {
    effect(() => {
      const id = this.idSignal();
      if (id) {
        this.airfieldService.loadAirfield(id);
      }
    });

    effect(() => {
      const airfield = this.airfieldService.airfield();

      if (!airfield) return;

      this.airfieldService.getPointsOfInterestForAirfield(airfield.code);
      this.airfieldService.getReviewsForAirfield(airfield.code);
    });

    effect(() => {
      const airfield = this.airfieldService.airfield();
      const ready = this.mapReady();
      const pointsOfInterest = this.airfieldService.pointsOfInterest();
      const reviews = this.airfieldService.reviews();
      if (!airfield || !ready || !pointsOfInterest) return;

      this.updateMap(airfield, pointsOfInterest);
    });
  }

  ionViewDidEnter() {
    this.initializeMap();
  }

  initializeMap() {

    //    { code: 'EHHO', name: 'Hoogeveen', lat: 52.725163766, lng: 6.509664628, type: 'medium' },

    this.map = L.map(this.mapContainer.nativeElement).setView([52, 5], 6); // default NL view

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(this.map);

    // Force Leaflet to recalc size and load tiles
    setTimeout(() => {
      this.map!.invalidateSize();
    }, 0);

    this.mapSignal.set(this.map);
    this.mapReady.set(true); // 👈 important
    this.markerLayer.addTo(this.map);
  }

  updateMap(airfield: AirfieldDetails, pointsOfInterest: PointsOfInterest) {
    const lat = airfield.lat;   // make sure your model has this
    const lng = airfield.lng;

    if (!map || !lat || !lng) return;

    // center map
    this.map!.setView([lat, lng], 9.5);

    this.markers.forEach(m => m.remove());
    this.markers = [];

    const marker = L.marker([airfield.lat, airfield.lng], {
      icon: this.getPoiIcon('airfield')
    })
      .addTo(this.map!)
      .bindPopup(`Airfield - ${airfield.name}`);



    this.markers.push(marker);

    // --- POI markers ---
    pointsOfInterest.hotels.forEach(poi => {
      const marker = L.marker([poi.lat, poi.lng], {
        icon: this.getPoiIcon('hotel')
      })
        .addTo(this.map!)
        .bindPopup(`Hotel - ${poi.name}`);

      this.markers.push(marker);
    });

    pointsOfInterest.restaurants.forEach(poi => {
      const marker = L.marker([poi.lat, poi.lng], {
        icon: this.getPoiIcon('restaurant')
      })
        .addTo(this.map!)
        .bindPopup(`Restaurant - ${poi.name}`);

      this.markers.push(marker);
    });

    pointsOfInterest.attractions.forEach(poi => {
      const marker = L.marker([poi.lat, poi.lng], {
        icon: this.getPoiIcon('attraction')
      })
        .addTo(this.map!)
        .bindPopup(`Attraction - ${poi.name}`);

      this.markers.push(marker);
    });

    if (pointsOfInterest.transport?.taxi ||
      pointsOfInterest?.transport?.carRental ||
      pointsOfInterest?.transport?.publicTransport) {
      const coords = this.generateNearbyCoordinates(airfield.lat, airfield.lng, 0, 8, 0.02);
      const marker = L.marker([coords.lat, coords.lng], {
        icon: this.getPoiIcon('transport'),

      })
        .addTo(this.map!)
        .bindPopup(`Transport`);

      this.markers.push(marker);

    }
  }

  getPoiIcon(type: string): L.Icon {
    let iconUrl = ''
    switch (type) {
      case 'hotel':
        iconUrl = 'assets/icons/hotel.jpg'
        break;
      case 'restaurant':
        iconUrl = 'assets/icons/restaurant.png'
        break;
      case 'attraction':
        iconUrl = 'assets/icons/attraction.jpg'
        break;
      case 'transport':
        iconUrl = 'assets/icons/public-transport.jpg'
        break;
      case 'airfield':
        iconUrl = 'assets/icons/airfield.jpg'
    }

    return L.icon({
      className: 'marker',
      iconUrl,
    });
  }

  generateNearbyCoordinates(airfieldLat: number, airfieldLng: number, index: number, total: number, maxDistance: number = 0.05) {
    const angle = (index / total) * 2 * Math.PI;
    const distance = 0.02 + Math.random() * (maxDistance - 0.02);

    return {
      lat: airfieldLat + Math.cos(angle) * distance,
      lng: airfieldLng + Math.sin(angle) * distance,
    };
  };

  setRating(ratingKey: string, ratingValue: number) {
    this.reviewInput.ratings[ratingKey] = ratingValue;
  }

}

export interface EssentialInfo {
  iconClasses: string;
  title: string;
  description: string;
  isLink?: boolean;
}

export interface ReviewInput {
  airfield: string,
  name: string,
  date: string,
  ratings: RatingInput
  description: string
}

export interface RatingInput {
  [key: string]: number;
}