import { Component, OnInit } from '@angular/core';
import {Pays} from '../../models/pays';
import {AuthentificationService} from '../../services/authentification.service';
import {UtilisateurService} from '../../services/utilisateur.service';
import {PaysService} from '../../services/pays.service';
import {Utilisateur} from '../../models/utilisateur';
import {StorageService} from '../../services/storage.service';
import {TranslateService} from '@ngx-translate/core';
import {AlertController} from '@ionic/angular';
import {AlertService} from '../../services/alert.service';

@Component({
  selector: 'app-choose-country',
  templateUrl: './choose-country.component.html',
  styleUrls: ['./choose-country.component.scss'],
})
export class ChooseCountryComponent implements OnInit {

  inputPays = [];
  currentUser: Utilisateur;
  idPaySelect: any;
  paySelect: any;

  constructor(private alertService: AlertService, private alertController: AlertController, private translate: TranslateService, private storageService: StorageService, private authService: AuthentificationService, private userService: UtilisateurService, private paysService: PaysService) { }

  ngOnInit() {
    this.idPaySelect = this.storageService.getItem('paysSelect') ? this.storageService.getItem('paysSelect') : '';
    if(this.idPaySelect !== '') { this.initializeObjetPays(this.idPaySelect); }
    this.storageService.watchStorage().subscribe((data) => {
      if(this.idPaySelect !== this.storageService.getItem('paysSelect')) {
        location.reload();
      }
    });

    this.paysService.getPays().then(
      (data8) => {
        for(let i=0; i<data8.length; i++) {
          this.inputPays.push(
            {
              label: data8[i].name,
              type: 'radio',
              value: data8[i],
              checked: this.idPaySelect === data8[i].id
            }
          );
        }
      }
    );
  }

  async presentAllCountry() {
    let txt1; let txt2;
    this.translate.get('1.1-6').subscribe((res: string) => {
      txt1 = res;
    });
    this.translate.get('1.1-10').subscribe((res: string) => {
      txt2 = res;
    });

    const alert = await this.alertController.create({
      header: txt1,
      buttons: [
        {
          text: 'OK',
          role: 'confirm',
          handler: (paysChoice: Pays) => { console.log('entre porte 1');
            if(this.idPaySelect !== paysChoice.id) { console.log('entre porte 2');

              localStorage.setItem('language', paysChoice.language.toLocaleLowerCase());
              this.translate.use(paysChoice.language.toLocaleLowerCase());

              this.authService.isAuthenticated().then(
                (result) => {
                  if(result) {
                    this.userService.getCurrentUtilisateur().then(
                      (data25) => {
                        this.userService.updateCurrentUser(data25).then(
                          () => {
                            this.alertService.print(txt2);
                            this.storageService.setItem('paysSelect', paysChoice.id);
                            this.paySelect = paysChoice;
                            this.idPaySelect = paysChoice.id;
                          }
                        );
                      }
                    );
                  } else {
                    this.storageService.setItem('paysSelect', paysChoice.id);
                    this.paySelect = paysChoice;
                    this.idPaySelect = paysChoice.id;
                  }
                }
              );
            }
          }
        }
      ],
      inputs: this.inputPays
    });

    await alert.present();
  }

  initializeObjetPays(idPays: string) {
    this.paysService.getPaysWitchId(idPays).then(
      (data) => {
        this.paySelect = data;
      }
    );
  }

}
