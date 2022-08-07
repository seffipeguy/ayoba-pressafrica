import { Component, OnInit } from '@angular/core';
import {Utilisateur} from '../models/utilisateur';
import {UtilisateurService} from '../services/utilisateur.service';
import {AlertService} from '../services/alert.service';
import {AlertController} from '@ionic/angular';
import {AuthentificationService} from '../services/authentification.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.page.html',
  styleUrls: ['./profil.page.scss'],
})
export class ProfilPage implements OnInit {

  isLoading = true;
  user: Utilisateur | any = null;

  constructor(private alertService: AlertService, private userService: UtilisateurService, private alertController: AlertController, private authService: AuthentificationService) {}

  ngOnInit(): void {
    this.authService.isAuthenticated().then(
      (result) => {
        if(result) {
          this.userService.getCurrentUtilisateur().then(
            (data) => {
              this.user = data;
              this.isLoading = false;
            }
          );
        } else { this.isLoading = false; }
      }
    );
  }

  lrgoogle() {
    this.isLoading = true;
    this.authService.googleAuth().then(
      () => {
        location.reload();
      },
      (error) => {
        this.isLoading = false;
        this.alertService.print(error);
      }
    );
  }

  async confirmDeconnexion() {
    const alert = await this.alertController.create({
      header: 'Confirmation',
      message: 'Do you really want to disconnect ?',
      buttons: [
        {
          text: 'CANCEL',
          role: 'cancel',
          cssClass: 'secondary'
        }, {
          text: 'OK',
          handler: () => {
            this.authService.signOut().then();
            localStorage.clear();
            location.reload();
          }
        }
      ]
    });

    await alert.present();
  }

}
