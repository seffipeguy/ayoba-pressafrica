import { Injectable } from '@angular/core';
import {Utilisateur} from '../models/utilisateur';
import firebase from 'firebase';
import {UtilisateurService} from './utilisateur.service';
import {PaysService} from './pays.service';
import {ToolsService} from "./tools.service";

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {

  constructor(private toolsService: ToolsService, private userService: UtilisateurService, private paysService: PaysService) { }

  signInUser(email: string, password: string) {
    return new Promise<void>((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(email, password).then(
        () => {
          resolve();
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  getAnonymeId() {
    if(localStorage.getItem('guestId')) {
      return localStorage.getItem('guestId');
    } else {
      localStorage.setItem('guestId', 'guest_' + this.toolsService.generateId(17));
      return localStorage.getItem('guestId');
    }
  }

  async googleAuth() {
    return new Promise<void>((resolve, reject) => {
      firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(
        (data) => {
          localStorage.setItem('id', data.user.email);
          const tmpInfo: any = data.additionalUserInfo ? data.additionalUserInfo.profile : null;
          this.isRegister(tmpInfo.email).then(
            (rep) => {
              if (!rep) {
                const tmpUser = new Utilisateur(tmpInfo.name, '', tmpInfo.email, 1, '0000');
                tmpUser.photo = tmpInfo.picture;
                this.saveToDataBase(tmpUser).then(
                  () => {
                    resolve();
                  }, (error) => {
                    reject(error);
                  }
                );
              } else {
                resolve();
              }
            },
            (error) => {
              reject(error);
            }
          );
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  isRegister(email: string) {
    return new Promise<Utilisateur>((resolve, reject) => {
      firebase.firestore().collection('comptes').doc(email).get().then(
        (docRef) => {
          resolve(docRef.exists ? docRef.data() as any : null);
        },
        (error) => {
          console.log(error);
        }
      );
    });
  }

  async saveToDataBase(user: Utilisateur) {
    return new Promise<void>((resolve, reject) => {
      if(user.phone) { user.id = user.phone; } else { user.id = user.email; }
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

  async isAuthenticated() {
    return new Promise<boolean>((resolve, reject) => {
      if(localStorage.getItem('id')) {
        resolve(true);
      } else {
        if(localStorage.getItem('ayoba-tel')) {
          localStorage.setItem('id', localStorage.getItem('ayoba-tel'));
          this.isRegister(localStorage.getItem('ayoba-tel')).then(
            (rep) => {
              if (!rep) {
                const tmpUser = new Utilisateur(localStorage.getItem('ayoba-name'), localStorage.getItem('ayoba-tel'), '', 1, '0000');
                this.saveToDataBase(tmpUser).then(
                  () => {
                    resolve(true);
                  }, (error) => {
                    reject(error);
                  }
                );
              } else {
                resolve(true);
              }
            },
            (error) => {
              reject(error);
            }
          );
        } else {
          firebase.auth().onAuthStateChanged((user) => {
            if (user) {
              resolve(true);
            } else {
              resolve(false);
            }
          });
        }
      }
    });
  }

  async signOut() {
    return new Promise<void>((resolve, reject) => {
      firebase.auth().signOut().then(
        () => {
          resolve();
        },
        (error) => {
          reject(error);
        }
      );
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
}
