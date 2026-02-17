
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { IonApp, IonSplitPane, IonMenu, IonContent, IonList, IonListHeader, IonNote, IonMenuToggle, IonItem, IonIcon, IonLabel, IonRouterOutlet, IonRouterLink } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { mailOutline, mailSharp, paperPlaneOutline, paperPlaneSharp, heartOutline, heartSharp, archiveOutline, archiveSharp, trashOutline, trashSharp, warningOutline, warningSharp, bookmarkOutline, bookmarkSharp } from 'ionicons/icons';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  imports: [RouterLink, RouterLinkActive, IonApp, IonSplitPane, IonMenu, IonContent, IonList, IonListHeader, IonNote, IonMenuToggle, IonItem, IonIcon, IonLabel, IonRouterLink, IonRouterOutlet],
})
export class AppComponent {
  public appPages = [
    { title: 'Home', url: '/home', icon: 'fa-regular fa-house' },
    { title: 'Profile', url: '/redirect', icon: 'fa-regular fa-user' },
    { title: 'Favorites', url: '/redirect', icon: 'fa-regular fa-heart' },
    { title: 'Community', url: '/redirect', icon: 'fa-solid fa-user-group' },
    { title: 'Airfields', url: '/redirect', icon: 'fa-solid fa-plane' },
    { title: 'Food & Drinks', url: '/redirect', icon: 'fa-solid fa-utensils' },
    { title: 'Transport', url: '/redirect', icon: 'fa-solid fa-car-side' },
    { title: 'Activities', url: '/redirect', icon: 'fa-regular fa-compass' },
    { title: 'FAQ', url: '/redirect', icon: 'fa-regular fa-circle-question' },
    { title: 'Map', url: '/map', icon: 'fa-regular fa-user' },
    { title: 'Sandbox', url: '/sandbox', icon: 'fa-regular fa-user' },
  ];
  constructor() {
    addIcons({ mailOutline, mailSharp, paperPlaneOutline, paperPlaneSharp, heartOutline, heartSharp, archiveOutline, archiveSharp, trashOutline, trashSharp, warningOutline, warningSharp, bookmarkOutline, bookmarkSharp });
  }
}
