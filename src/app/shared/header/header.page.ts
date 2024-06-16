import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonButtons, IonIcon } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { addIcons } from 'ionicons';
import { logOutOutline } from 'ionicons/icons';

addIcons({
  'log-out-outline': logOutOutline,
});

@Component({
  selector: 'app-header',
  templateUrl: './header.page.html',
  styleUrls: ['./header.page.scss'],
  standalone: true,
  imports: [IonIcon, IonButtons, IonButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class HeaderPage {

  @Input() tabTile?: string;

  constructor(private authService: AuthService, private router: Router) { }

  async logout(){
    //Doing by Async / Await
    await this.authService.logout();
    this.router.navigateByUrl('/login', { replaceUrl: true });

    // Doing by Promises
    // this.authService.logout().then(() => {
    //   this.router.navigateByUrl('/login', { replaceUrl: true });
    // })
  }
}
