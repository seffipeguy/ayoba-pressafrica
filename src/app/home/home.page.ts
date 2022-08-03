import {Component, OnInit} from '@angular/core';
import {AlertController, ModalController} from '@ionic/angular';
import {Headline} from '../models/headline';
import {CategorieEditorService} from '../services/categorie-editor.service';
import {PaysService} from '../services/pays.service';
import {HeadlineService} from '../services/headline.service';
import {EditorService} from '../services/editor.service';
import {Pays} from '../models/pays';
import {UtilisateurService} from '../services/utilisateur.service';
import {Utilisateur} from '../models/utilisateur';
import {TranslateService} from '@ngx-translate/core';
import {AlertService} from '../services/alert.service';
import {AuthentificationService} from '../services/authentification.service';
import {StorageService} from '../services/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {


  paySelect = '';
  isSearch = false;
  headlines: Headline[] = [];

  categorieSelect = '';

  currentUser: Utilisateur = null;
  currentSearch = '';

  constructor(private storageService: StorageService, private translate: TranslateService, private alertController: AlertController, private authService: AuthentificationService, private alertService: AlertService, private userService: UtilisateurService, private categorieEditeur: CategorieEditorService, private editorService: EditorService, private headlineService: HeadlineService, private paysService: PaysService, private categorieEditorService: CategorieEditorService, private modalController: ModalController) {}

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
    this.categorieSelect = this.storageService.getItem('categorieSelect') ? this.storageService.getItem('categorieSelect') : '';
    this.paySelect = this.storageService.getItem('paysSelect') ? this.storageService.getItem('paysSelect') : '';
    this.storageService.watchStorage().subscribe((data) => {
      this.categorieSelect = this.storageService.getItem('categorieSelect');
      if(this.paySelect !== this.storageService.getItem('paysSelect')) { console.log('massaaa');
        location.reload();
      } else { console.log('diiiidonnnn'); }
    });

  }


}
