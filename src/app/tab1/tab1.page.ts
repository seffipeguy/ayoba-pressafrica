import {Component, OnInit} from '@angular/core';
import {AlertController, ModalController} from '@ionic/angular';
import {Headline} from '../models/headline';
import {CategorieEditor} from '../models/categorieEditor';
import {CategorieEditorService} from '../services/categorie-editor.service';
import {PaysService} from '../services/pays.service';
import {HeadlineService} from '../services/headline.service';
import {EditorService} from '../services/editor.service';
import {Pays} from '../models/pays';
import {UtilisateurService} from '../services/utilisateur.service';
import {Utilisateur} from '../models/utilisateur';
import {TranslateService} from '@ngx-translate/core';
import {AlertService} from '../services/alert.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  categorieSelect: CategorieEditor = null;
  paySelect: Pays = null;
  isSearch = false;
  headlines: Headline[] = [];
  categoriesEditors: CategorieEditor[] = [];
  inputListCategorie = [];
  inputPays = [];
  currentUser: Utilisateur = null;
  currentSearch = '';

  slideOpts = {
    initialSlide: 0,
    speed: 800 ,
    slidesPerView: 0,
    spaceBetween: 10,
    slidesOffsetBefore:10,
    slidesOffsetAfter:10
  };

  constructor(private alertService: AlertService, private translate: TranslateService, private userService: UtilisateurService, private categorieEditeur: CategorieEditorService, private editorService: EditorService, private headlineService: HeadlineService, private paysService: PaysService, private categorieEditorService: CategorieEditorService, private modalController: ModalController, private alertController: AlertController) {}

  ngOnInit() {

    //localStorage.clear();
    //localStorage.setItem('id', '690689765');
    /*
    this.categorieEditeur.addCategorie(new CategorieEditor('economie')).then(
      () => {
        alert('Ajouter avec succes');
      }
    );
     */
    /*
    this.headlineService.addNewHeadline(new Headline('037cc7608d5c4f51e5c993', 'N° 7853', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ', '14 juillet 2022')).then(
      () => {
        alert('Ajouter avec succes');
      }
    );
    */
    /*this.editorService.addNewEditor(new Editor('Sans détour', 'Journal 123', '1','1','1')).then(
      () => {
        alert('Ajouter avec succes');
      });*/

    this.userService.getCurrentUtilisateur().then(
      (data) => {
        this.currentUser = data;

        if(this.currentUser.idCountry) {
          this.paysService.getPaysWitchId(this.currentUser.idCountry).then(
            (data5) => {
              this.paySelect = data5;
              this.paysService.getPays().then(
                (data8) => {
                  for(let i=0; i<data8.length; i++) {
                    this.inputPays.push(
                      {
                        label: data8[i].name,
                        type: 'radio',
                        value: data8[i],
                        checked: this.paySelect.id === data8[i].id
                      }
                    );
                  }
                }
              );
            }
          );
        } else {
          this.paysService.getPays().then(
            (data8) => {
              for(let i=0; i<data8.length; i++) {
                this.inputPays.push(
                  {
                    label: data8[i].name,
                    type: 'radio',
                    value: data8[i]
                  }
                );
              }
            }
          );
        }
      }
    );

    this.categorieEditorService.getCategorie().then(
      (data) => {
        this.categoriesEditors = data;

        let txt1;
        this.translate.get('1.1-7').subscribe((res: string) => { txt1 = res; });
        this.inputListCategorie.push(
          {
            label: txt1,
            type: 'radio',
            value: null,
            checked: !this.categorieSelect
          }
        );

        for(let i=0; i<this.categoriesEditors.length; i++) {
          this.inputListCategorie.push(
            {
              label: this.getValueTraduct(this.categoriesEditors[i].name),
              type: 'radio',
              value: this.categoriesEditors[i],
              checked: this.categorieSelect && (this.categorieSelect.id === this.categoriesEditors[i].id)
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
          handler: (paysChoice: Pays) => {
            if(!this.paySelect || this.paySelect.id !== paysChoice.id) {
              this.paySelect = paysChoice;
              this.currentUser.idCountry = this.paySelect.id;

              localStorage.setItem('language', this.paySelect.language.toLocaleLowerCase());
              this.translate.use(this.paySelect.language.toLocaleLowerCase());

              this.userService.updateCurrentUser(this.currentUser).then(
                () => {
                  this.currentUser.idCountry = this.paySelect.id;
                  this.alertService.print(txt2);
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

  getValueTraduct(texte: string) {
    let result; let result2;
    const result1 = texte.split(this.translate.currentLang + '>');
    if(result1.length > 1) {  console.log(); result2 = result1[1].split('</'); }
    if(result1.length > 1 && result2.length > 0) { result = result2[0]; }
    return result ? result : texte;
  }

  async presentAllCategorie() {
    let txt1;
    this.translate.get('1.1-7').subscribe((res: string) => {
      txt1 = res;
    });

    const alert = await this.alertController.create({
      header: txt1,
      buttons: [
        {
          text: 'OK',
          role: 'confirm',
          handler: (categorieChoice: CategorieEditor) => {
            this.categorieSelect = categorieChoice;
          }
        }
      ],
      inputs: this.inputListCategorie,
      animated: true
    });

    await alert.present();
  }
}
