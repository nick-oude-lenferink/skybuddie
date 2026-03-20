import { Component, effect, OnInit, signal, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonToolbar, IonMenuButton, IonButtons, IonGrid, IonRow, IonCol, IonSearchbar, IonModal, IonHeader, IonTitle, IonButton, IonLabel, IonFooter } from '@ionic/angular/standalone';
import { AirfieldCategoryEnum, AirfieldListModel, AirfieldTypeEnum, SurfaceEnum } from './airfield-list.model';
import { AirfieldService } from './airfield.service';
import { RouterModule } from '@angular/router';
import { IonSearchbarCustomEvent, OverlayEventDetail, SearchbarInputEventDetail } from '@ionic/core/components';

@Component({
  selector: 'app-airfields',
  templateUrl: './airfields.page.html',
  styleUrls: ['./airfields.page.scss'],
  standalone: true,
  imports: [IonFooter, IonButton, IonTitle, IonHeader, IonModal, IonSearchbar, IonCol, IonRow, IonGrid, IonButtons,
    IonContent, IonToolbar, CommonModule,
    FormsModule, IonMenuButton, RouterModule, IonLabel]
})
export class AirfieldsPage implements OnInit {
  changeSearchQuery($event: IonSearchbarCustomEvent<SearchbarInputEventDetail>) {
    console.log('Changed queryd');
    
    const searchQuery = $event.target.value!;
    this.activeFilters.update(f => ({
      ...f,
      searchQuery
    }));
  }
  clearFilters() {
    this.tempFilters = {} as AirfieldFilters;
    this.confirm();
  }
  showFilterModal() {
    //this.tempFilters = Object.assign({}, this.activeFilters);
    this.tempFilters = { ...this.activeFilters() };
  }

  @ViewChild(IonModal) modal!: IonModal;

  airfields = this.airfieldService.airfieldList;
  surfaceTypes = Object.values(SurfaceEnum);// as SurfaceEnum[];// enumToOptions(SurfaceEnum);
  airfieldTypes = Object.values(AirfieldTypeEnum); // enumToOptions(AirfieldTypeEnum);
  airfieldCategories = Object.values(AirfieldCategoryEnum);// enumToOptions(AirfieldCategoryEnum);
  // activeFilters: AirfieldFilters = {} as AirfieldFilters;
  tempFilters: AirfieldFilters = {} as AirfieldFilters;
  numActiveFilters: number = 0;

  activeFilters = signal<AirfieldFilters>({
    searchQuery: '',
    airfieldStart: null,
    surfaceType: null,
    airfieldType: null,
    airfieldCategory: null
  });

  constructor(private airfieldService: AirfieldService) {
    effect(() => {
      console.log('Filters changed');

      const filters = this.activeFilters();
      let i = 0;
      filters.surfaceType && i++;
      filters.airfieldCategory && i++;
      filters.airfieldType && i++;
      this.numActiveFilters = i;
      this.airfieldService.loadAirfields(filters);
    });
  }

  ngOnInit() {
  }

  message = 'This modal example uses triggers to automatically open a modal when the button is clicked.';
  name!: string;

  cancel() {
    console.log(this.activeFilters);
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    this.activeFilters.set(this.tempFilters);
    this.modal.dismiss(this.name, 'confirm');
  }

  setCategory(_t90: AirfieldCategoryEnum) {
    this.tempFilters.airfieldCategory = this.tempFilters.airfieldCategory != _t90 ? _t90 : null;
  }
  setType(_t84: AirfieldTypeEnum) {
    this.tempFilters.airfieldType = this.tempFilters.airfieldType != _t84 ? _t84 : null;
  }
  setSurfaceType(_t78: SurfaceEnum) {
    this.tempFilters.surfaceType = this.tempFilters.surfaceType != _t78 ? _t78 : null;
  }

  searchAirfields() {

  }
}

export interface AirfieldFilters {
  searchQuery: string | null;
  airfieldStart: string | null;
  surfaceType: SurfaceEnum | null;
  airfieldType: AirfieldTypeEnum | null;
  airfieldCategory: AirfieldCategoryEnum | null;
}