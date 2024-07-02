import { enableProdMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';
import { provideHttpClient } from '@angular/common/http';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
    // provideHttpClient(),
    provideFirebaseApp(() => initializeApp({"projectId":"testcifo-d32cf","appId":"1:760909605197:web:1243fb94dba0fc72e9ef04","storageBucket":"testcifo-d32cf.appspot.com","apiKey":"AIzaSyCe0fDz2w9k6t_VNdCkdqRS_Hh_1Hohfxo","authDomain":"testcifo-d32cf.firebaseapp.com","messagingSenderId":"760909605197","measurementId":"G-1TV04V6DM7"})), 
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore())
  ],
});
