import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home'
  },
  {
    path: 'map',
    loadComponent: () => import('./map/map.page').then(m => m.MapPage)
  },
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then(m => m.HomePage)
  },
  {
    path: 'sandbox',
    loadComponent: () => import('./sandbox/sandbox.page').then(m => m.SandboxPage)
  },
  {
    path: 'redirect',
    pathMatch: 'full',
    redirectTo: 'home'
  },
  {
    path: 'airfields',
    loadComponent: () => import('./airfields/airfields.page').then(m => m.AirfieldsPage)
  },
  {
    path: 'airfields/:id',
    loadComponent: () => import('./airfield/airfield.page').then(m => m.AirfieldPage)
  },  {
    path: 'community',
    loadComponent: () => import('./community/community.page').then( m => m.CommunityPage)
  },




];
