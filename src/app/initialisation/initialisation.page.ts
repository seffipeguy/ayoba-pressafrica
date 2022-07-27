import { Component, OnInit } from '@angular/core';
import {AuthentificationService} from '../services/authentification.service';
import {Utilisateur} from '../models/utilisateur';
import {UtilisateurService} from '../services/utilisateur.service';

@Component({
  selector: 'app-initialisation',
  templateUrl: './initialisation.page.html',
  styleUrls: ['./initialisation.page.scss'],
})
export class InitialisationPage implements OnInit {

  message = 'loading...';

  constructor(private authService: AuthentificationService, private  utilisateurService: UtilisateurService) { }

  ngOnInit() {
    if(localStorage.getItem('ayoba-tel') && localStorage.getItem('ayoba-name')) {
      this.authService.isSignUp(localStorage.getItem('ayoba-tel')).then(
        (docRef) => {
          if (!docRef) {
            const tmpUser: Utilisateur = new Utilisateur(localStorage.getItem('ayoba-name'), localStorage.getItem('ayoba-tel'), 'i am using ayoba', '1001');
            this.authService.signUpUser(tmpUser).then(
              (docRef1) => {
                localStorage.setItem('id', tmpUser.id);
                location.reload();
              }
            );
          } else {
            this.utilisateurService.getUtilisateurWitchPhoneNumber(localStorage.getItem('ayoba-tel')).then(
              (data) => {
                if (data) {
                  localStorage.setItem('id', data.id);
                  location.reload();
                } else {
                  this.message = 'Erreur connexion, #NoNumberFound';
                }
              }
            );
          }
        }
      );
    } else {
      this.message = 'Error loading ayoba data!';
    }
  }
}
