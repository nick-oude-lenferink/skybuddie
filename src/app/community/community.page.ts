import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonSearchbar, IonButtons, IonMenuButton, IonGrid, IonRow, IonCol } from '@ionic/angular/standalone';
import { ReviewService } from '../home/review.service';
import { RelativeDatePipe } from "../core/pipes/relative-date.pipe";

@Component({
  selector: 'app-community',
  templateUrl: './community.page.html',
  styleUrls: ['./community.page.scss'],
  standalone: true,
  imports: [IonCol, IonRow, IonButtons, IonSearchbar, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonMenuButton, IonGrid, RelativeDatePipe]
})
export class CommunityPage implements OnInit {
  reviews = this.reviewService.reviews;

  constructor(private reviewService: ReviewService) { }

  ngOnInit() {
    this.reviewService.getCommunityReviews();
  }

}
