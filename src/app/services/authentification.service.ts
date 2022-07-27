import { Injectable } from '@angular/core';
import {Utilisateur} from '../models/utilisateur';
import firebase from 'firebase';
import {UtilisateurService} from "./utilisateur.service";
import {PaysService} from "./pays.service";

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {

  constructor(private userService: UtilisateurService, private paysService: PaysService) { }

  async isAuthenticated() {
    return new Promise<boolean>((resolve, reject) => {
      if(localStorage.getItem('id')) {
        this.userService.getCurrentUtilisateur().then(
          (doc1) => {
            this.paysService.getPaysWitchId(doc1.idCountry).then(
              (doc2) => {
                localStorage.setItem('language', doc2.language.toLowerCase());
              }
            );
          }
        );
        resolve(true);
      } else {
        resolve(false);
      }
    });
  }

  async isSignUp(phone: string) {
    return new Promise<boolean>((resolve, reject) => {
      firebase.firestore().collection('comptes').where('phone', '==', phone).onSnapshot(
      (doc) => {
        resolve(!doc.empty);
      });
    });
  }

  async signUpUser(user: Utilisateur) {
    return new Promise<void>((resolve, reject) => {
      firebase.firestore().collection('comptes').doc(user.id).set(Object.assign({}, user)).then(
        () => {
          resolve();
        },
        (error) => {
          reject(error);
        }
      );
    });
  }
}
