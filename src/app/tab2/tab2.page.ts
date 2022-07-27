import {Component, OnInit} from '@angular/core';
import {AlertController} from '@ionic/angular';
import {CategorieEditor} from '../models/categorieEditor';
import {CategorieEditorService} from '../services/categorie-editor.service';
import {UtilisateurService} from '../services/utilisateur.service';
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  isLoading = false;
  categorieSelect: CategorieEditor = null;
  categoriesEditors: CategorieEditor[] = [];
  isSearch = false;
  archives: any[] = [];
  loadedListArchive: any[];
  inputListCategorie = [];

  slideOpts = {
    initialSlide: 0,
    speed: 800 ,
    slidesPerView: 0,
    spaceBetween: 10,
    slidesOffsetBefore:10,
    slidesOffsetAfter:10
  };

  constructor(private translate: TranslateService, private userService: UtilisateurService, private alertController: AlertController, private categorieEditorService: CategorieEditorService) {}

  ngOnInit() {
    //appel.loadedListTransactions = appel.transactions; appel.isLoading = false;
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

    this.userService.getCurrentUtilisateur().then(
      (data) => {
        this.archives = data ? data.archives : [];
      }
    );
  }

  getValueTraduct(texte: string) {
    let result; let result2;
    const result1 = texte.split(this.translate.currentLang + '>');
    if(result1.length > 1) {  console.log(); result2 = result1[1].split('</'); }
    if(result1.length > 1 && result2.length > 0) { result = result2[0]; }
    return result ? result : texte;
  }

  /* Recherche transaction */
  initializeItemsAll(): void {
    this.archives = this.loadedListArchive;
  }

  filterListTransaction(evt) {
    this.initializeItemsAll();

    const searchTerm = evt.detail.target.value;

    if (!searchTerm) {
      this.loadedListArchive = this.archives;
      return;
    }

    this.archives = this.archives.filter(current => {
      if ((current) && searchTerm){
        if (current.indexOf(searchTerm.toLowerCase()) > -1) {
          return true;
        }
        return false;
      }
    });
  }
  /* Fin recherche */


  async presentAllCategorie() {
    const alert = await this.alertController.create({
      header: 'Select your favorite category',
      buttons: ['OK'],
      inputs: this.inputListCategorie
    });

    await alert.present();
  }

}
