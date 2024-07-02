import { Component, OnInit, ViewChild } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardContent, IonCardTitle, IonCardSubtitle, IonCardHeader, IonList, IonButton, IonModal, IonButtons, IonItem, IonInput, IonFab, IonFabButton, IonIcon } from '@ionic/angular/standalone';
import { ILocations } from 'src/app/models/interface';
import { LocationsService } from 'src/app/services/locations.service';
import { HeaderPage } from 'src/app/shared/header/header.page';
import { OverlayEventDetail } from '@ionic/core/components';
import { addIcons } from 'ionicons';
import { add } from 'ionicons/icons';
import { LocationsFormsComponent } from 'src/app/shared/locations-forms/locations-forms.component';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  imports: [IonIcon, IonFabButton, IonFab, IonInput, IonItem, IonButtons, IonModal, IonButton, IonList, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonCard, IonHeader, IonToolbar, IonTitle, IonContent, HeaderPage, LocationsFormsComponent]
})
export class Tab2Page implements OnInit{

  locations: ILocations[] = [];
  title = "tab 2";

  @ViewChild(IonModal) modal!: IonModal;
  
  constructor(private locationService: LocationsService) {
    addIcons({
      add,
    });
  }

  ngOnInit(): void {
    console.log("OnInit");
  }

  ionViewWillEnter(){
    console.log("ionViewWillEnter");
    this.locationService.getLocations().subscribe((locations: ILocations[] )=>{
      this.locations = locations;
    })
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<ILocations>>;
    if (ev.detail.role === 'add') {
      this.locationService.addLocation(ev.detail.data!);
    }
  }

  addLocation(location: ILocations){
    this.modal.dismiss(location, 'add');
  }

}
