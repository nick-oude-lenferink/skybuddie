import { HttpClient } from "@angular/common/http";
import { Injectable, signal } from "@angular/core";
import { Observable, of } from "rxjs";
import { Review } from './review.model';
import { PopularDestination } from "./popular-destination.model";

@Injectable({ providedIn: 'root' })
export class ReviewService {
  reviews = signal<Review[]>([]);

  constructor(private http: HttpClient) { }

  getCommunityReviews() {
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

  getPopularDestinations(): Observable<PopularDestination[]> {
    return of([
      {
        code: 'EHGG',
        name: 'Groningen Airfield Eelde',
        averageRating: 5,
        numReviews: 2,
        location: 'Eelde'
      },
      {
        code: 'EHTE',
        name: 'Teuge',
        averageRating: 5,
        numReviews: 2,
        location: 'Teuge'
      }, {
        code: 'EHHO',
        name: 'Hoogeveen',
        averageRating: 5,
        numReviews: 1,
        location: 'Hoogeveen'
      }
    ]);
  }

  getReviews(): Observable<Review[]> {
    return of([
      {
        userFullName: 'Jan Jansen',
        date: new Date("2026-01-01"),
        description: 'Excellent tool for VFR planning! The airspaces are clearly marked and the map is well organized.',
        rating: 5,
        location: 'EHTE - Teuge'
      },
      {
        userFullName: 'Lisa van der Berg',
        date: new Date("2025-10-01"),
        description: 'Exactly what I was looking for. All relevant information for VFR flights in one overview. Top!',
        rating: 4,
        location: 'EHTE - Teuge'
      },
      {
        userFullName: 'Marco Pietersen',
        date: new Date("2025-07-01"),
        description: 'Great airfield with long runway and the Aviodrome museum on-site. Perfect for all types of GA aircraft.',
        rating: 3,
        location: 'EHLE - Lelystad'
      }
    ]);
  }
}