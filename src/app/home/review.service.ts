import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { Review } from './review.model';

@Injectable({ providedIn: 'root' })
export class ReviewService {
  constructor(private http: HttpClient) { }

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
        description: 'Great airport with long runway and the Aviodrome museum on-site. Perfect for all types of GA aircraft.',
        rating: 3,
        location: 'EHLE - Lelystad'
      }
    ]);
  }
}