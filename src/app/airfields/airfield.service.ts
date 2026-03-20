import { HttpClient } from "@angular/common/http";
import { Injectable, signal } from "@angular/core";
import { Observable, of } from "rxjs";
import { Review } from '../home/review.model';
import { PopularDestination } from "../home/popular-destination.model";
import { AirfieldCategoryEnum, AirfieldListModel, AirfieldTypeEnum, SurfaceEnum } from "./airfield-list.model";
import { AirfieldFilters } from "./airfields.page";
import { AirfieldDetails } from "./airfield-details.model";
import { MapMarker } from "../home/map-marker.model";
import { Point } from "leaflet";

@Injectable({ providedIn: 'root' })
export class AirfieldService {
  constructor(private http: HttpClient) { }

  private airfieldListSignal = signal<AirfieldListModel[]>([]);
  private airfieldSignal = signal<AirfieldDetails | null>(null);
  pointsOfInterest = signal<PointsOfInterest | null>(null);
  reviews = signal<Review[]>([]);
  airfieldList = this.airfieldListSignal.asReadonly();
  airfield = this.airfieldSignal.asReadonly();

  loadAirfields(filters: AirfieldFilters) {
    const data: AirfieldListModel[] = [
      {
        code: 'EHGG',
        name: 'Groningen Airfield Eelde',
        city: 'Eelde',
        country: 'Netherlands',
        type: AirfieldTypeEnum.Controlled,
        surface: SurfaceEnum.Paved,
        category: AirfieldCategoryEnum.Commercial
      },
      {
        code: 'EHTE',
        name: 'Teuge',
        city: 'Teuge',
        country: 'Germany',
        type: AirfieldTypeEnum.Uncontrolled,
        surface: SurfaceEnum.Paved,
        category: AirfieldCategoryEnum.Recreational
      }, {
        code: 'EHHO',
        name: 'Hoogeveen',
        city: 'Hoogeveen',
        country: 'Netherlands',
        type: AirfieldTypeEnum.Uncontrolled,
        surface: SurfaceEnum.Grass,
        category: AirfieldCategoryEnum.Recreational
      }
    ];

    // temporary client filtering (API will do this later)
    const filtered = data.filter(item => {

      if (filters.searchQuery &&
        !item.code.toLowerCase().includes(filters.searchQuery.toLowerCase()) &&
        !item.name.toLowerCase().includes(filters.searchQuery.toLowerCase())) {
        return false;
      }

      if (filters.surfaceType && item.surface !== filters.surfaceType) {
        return false;
      }

      if (filters.airfieldCategory && item.category !== filters.airfieldCategory) {
        return false;
      }

      if (filters.airfieldType && item.type !== filters.airfieldType) {
        return false;
      }

      return true;
    });


    this.airfieldListSignal.set(filtered);
  }

  loadAirfield(id: string) {
    // simulate API call
    //const found = this.mockAirfields.find(a => a.id === id) || null;
    let found: AirfieldDetails = {
      code: 'EHHO',
      lat: 52.7307,
      lng: 6.5150,
      name: 'Hoogeveen',
      type: AirfieldTypeEnum.Uncontrolled,
      surface: SurfaceEnum.Grass,
      category: AirfieldCategoryEnum.Recreational
    };

    this.airfieldSignal.set(found);
  }

  getPointsOfInterestForAirfield(code: string) {
    // mock data for now
    const mock: PointsOfInterest = {
      restaurants: [
        { name: 'Airfield café (weekends only)', lat: 52.7308, lng: 6.5165 },
        { name: 'Brasserie De Spotter', lat: 52.7308, lng: 6.5136 }
      ],
      hotels: [
        { name: 'Hotel De Vriezerbrug', lat: 52.7258, lng: 6.4869 },
        { name: 'Fletcher Hotel Hoogeveen', lat: 52.7259, lng: 6.4756 }
      ],
      attractions: [
        { name: 'Dierenpark Emmen', lat: 52.7831, lng: 6.8725 },
        { name: 'Drents Museum Assen', lat: 53.0020, lng: 6.5622 }
      ],
      transport: {
        taxi: true,
        carRental: false,
        publicTransport: 'Bus to Hoogeveen center (8km)',
      },
      activities: ['Nature walks', 'Local farm visits', 'Cycling routes'],
      nearbyTowns: ['Hoogeveen (8km)', 'Emmen (30km)', 'Meppel (20km)']
    };

    this.pointsOfInterest.set(mock);
  }

  getReviewsForAirfield(code: string) {
    const mock: Review[] = [{
      userFullName: 'Jan Jansen',
      date: new Date("2026-01-01"),
      description: 'Excellent tool for VFR planning! The airspaces are clearly marked and the map is well organized.',
      rating: 5,
      location: 'EHHO - Hoogeveen'
    },
    {
      userFullName: 'Lisa van der Berg',
      date: new Date("2025-10-01"),
      description: 'Exactly what I was looking for. All relevant information for VFR flights in one overview. Top!',
      rating: 4,
      location: 'EHHO - Hoogeveen'
    }];
    this.reviews.set(mock);
  }

  private markers: MapMarker[] = [
    { code: 'EHLE', name: 'Lelystad', lat: 52.455278, lng: 5.523056, type: 'medium' },
    { code: 'EHHO', name: 'Hoogeveen', lat: 52.725163766, lng: 6.509664628, type: 'medium' },
    { code: 'EDVM', name: 'Hildesheim', lat: 52.179833, lng: 9.945667, type: 'medium' },
    { code: 'EBZR', name: 'Zoersel', lat: 51.264722, lng: 4.753333, type: 'medium' }
  ];

  getAirfieldMapInfo(): Observable<MapMarker[]> {
    return of(this.markers);
  }
}

export interface PointsOfInterest {
  restaurants: PointOfInterest[],
  hotels: PointOfInterest[],
  attractions: PointOfInterest[],
  transport: TransportOptions
  activities: string[],
  nearbyTowns: string[]
}

export interface PointOfInterest {
  name: string;
  lat: number;
  lng: number;
}

export interface TransportOptions {
  taxi: boolean,
  carRental: boolean,
  publicTransport: string
}