import { Component, EventEmitter, Input, Output, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ILocations } from 'src/app/models/interface';
import { LocationsService } from 'src/app/services/locations.service';
import { IonButton, IonInput, IonCheckbox } from "@ionic/angular/standalone";

@Component({
  selector: 'app-locations-forms',
  standalone: true,
  imports: [IonButton, FormsModule, ReactiveFormsModule, IonInput, IonCheckbox],
  templateUrl: './locations-forms.component.html',
  styleUrl: './locations-forms.component.scss'
})
export class LocationsFormsComponent implements OnInit {

  locationService = inject(LocationsService);

  @Input() action!: string;
  @Input() location?: ILocations;
  // @Input() set location(l: ILocations){
  //   this.loc = l;
  //   console.log('Input:',this.loc);
  // };

  // get location(){
  //   return this.loc;
  // }

  @Output() outLocation = new EventEmitter<ILocations>();

  locationsForm!: FormGroup;

  loc!: ILocations;

  constructor(){
    this.createForm();
  }
  
  ngOnInit() {
    console.log('Input:',this.location);
    this.fillForm(this.location!);
  }

  fillForm(l: ILocations){
    // this.locationsForm.controls['name'].setValue(l.name);
    this.locationsForm.patchValue({
      name:l?.name??'',
      description:l?.description??'',
      lat:l?.lat??'',
      lon:l?.lon??'',
      visible:l?.visible??''
    });
  }

  createForm(){
    this.locationsForm = new FormGroup({
      name: new FormControl('',[Validators.required]),
      description: new FormControl(''),
      lat: new FormControl(''),
      lon: new FormControl(''),
      visible: new FormControl(''),
    });
  }

  outputLocation(){
    if(this.locationsForm.valid){
      const l: ILocations = {
        name: this.locationsForm.get('name')?.value,
        description: this.locationsForm.get('description')?.value,
        lat: this.locationsForm.get('lat')?.value,
        lon: this.locationsForm.get('lon')?.value,
        visible: false
      }
      this.outLocation.emit(l);
    }
    else {
      console.log('INVALID!')
    }
    
  }
}
