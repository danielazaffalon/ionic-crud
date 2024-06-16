import { Injectable } from '@angular/core';
import { ILocations } from '../models/interface';
import { Firestore, collection, collectionData, doc, docData, addDoc, deleteDoc, updateDoc, where, query } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Auth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class LocationsService {

  constructor(private firestore: Firestore, private auth: Auth) { }

  getLocations(): Observable<ILocations[]> {
    const locationssRef = collection(this.firestore, 'locations');
    const q = query(locationssRef, where('user', '==', this.auth.currentUser!.uid))
    return collectionData(q, { idField: 'id'}) as Observable<ILocations[]>;
  }
  getLocationByIndex(id: string): Observable<ILocations> {
    const locationDocRef = doc(this.firestore, `locations/${id}`);
    return docData(locationDocRef, { idField: 'id' }) as Observable<ILocations>;
  }

  addLocation(location: ILocations) {
    location.user = this.auth.currentUser?.uid!;
    const locationsRef = collection(this.firestore, 'locations');
    return addDoc(locationsRef, location);
  }

  deleteLocation(id: string) {
    const locationDocRef = doc(this.firestore, `locations/${id}`);
    return deleteDoc(locationDocRef);
  }

  updateLocation(location: ILocations) {
    const locationDocRef = doc(this.firestore, `locations/${location.id}`);
    return updateDoc(locationDocRef, { ...location });
  }

}