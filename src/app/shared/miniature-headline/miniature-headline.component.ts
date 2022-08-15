import {Component, Input, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {HeadlineService} from '../../services/headline.service';
import {Headline} from '../../models/headline';
import {Editor} from '../../models/editor';
import {EditorService} from '../../services/editor.service';
import {CommentService} from '../../services/comment.service';
import {Comment} from '../../models/comment';
import {Utilisateur} from '../../models/utilisateur';
import {UtilisateurService} from '../../services/utilisateur.service';
import {AlertService} from '../../services/alert.service';
import {TranslateService} from "@ngx-translate/core";
import {StorageService} from "../../services/storage.service";
import {AuthentificationService} from "../../services/authentification.service";

@Component({
  selector: 'app-miniature-headline',
  templateUrl: './miniature-headline.component.html',
  styleUrls: ['./miniature-headline.component.scss'],
})
export class MiniatureHeadlineComponent implements OnInit {

  @Input() idHeadline;
  @Input() skin = 'block';

  currentHedline: Headline = null;
  currentEditor: Editor = null;
  currentComment: Comment[] = [];
  currentUser: Utilisateur = null;

  constructor(private authService: AuthentificationService, private storageService: StorageService, private translate: TranslateService, private alertService: AlertService, private userService: UtilisateurService, private commentService: CommentService, private modalController: ModalController, private headlineService: HeadlineService, private editorService: EditorService) { }

  ngOnInit() {

    this.headlineService.getHeadlineWitchId(this.idHeadline).then(
      (data) => {
        this.currentHedline = data;

        this.editorService.getEditorWitchId(this.currentHedline.idEditor).then(
          (data1) => {
            this.currentEditor = data1;
          }
        );

        this.commentService.getComments(this.currentHedline.id).then(
          (data2) => {
            this.currentComment = data2;
          }
        );

        this.authService.isAuthenticated().then(
          (donnee) => {
            if(donnee) {
              this.userService.getCurrentUtilisateur().then(
                (data3) => {
                  this.currentUser = data3;
                }
              );
            }
          }
        );
      }
    );
  }

  getValueTraduct(texte: string) {
    let result; let result2;
    const result1 = texte.split((this.translate.currentLang ? this.translate.currentLang : 'en') + '>');
    if(result1.length > 1) { result2 = result1[1].split('</'); }
    if(result1.length > 1 && result2.length > 0) { result = result2[0]; }
    return result ? result : texte;
  }

  likeCurrentEditor() {
    const tmpCurrentUser = this.currentUser;
    if(tmpCurrentUser.editorsLikes.includes(this.currentEditor.id)) {
      tmpCurrentUser.editorsLikes.splice(tmpCurrentUser.editorsLikes.indexOf(this.currentEditor.id), 1);
    } else {
      tmpCurrentUser.editorsLikes.push(this.currentEditor.id);
    }
    this.userService.updateCurrentUser(this.currentUser).then(
      () => {
        this.currentUser = tmpCurrentUser;
      }
    );
  }

  likeCurrentHeadline() {
    this.headlineService.likeHeadline(this.currentHedline).then(
      () => {
        if(this.currentHedline.likes.includes(this.currentUser.id)) {
          this.currentHedline.likes.splice(this.currentHedline.likes.indexOf(this.currentUser.id), 1);
        } else
        {
          if(this.currentHedline.disLikes.includes(this.currentUser.id)) {
            this.disLikeCurrentHeadline();
          }
          this.currentHedline.likes.push(this.currentUser.id);
        }
      }
    );
  }

  disLikeCurrentHeadline() {
    this.headlineService.disLikeHeadline(this.currentHedline).then(
      () => {
        if(this.currentHedline.disLikes.includes(this.currentUser.id))
        {this.currentHedline.disLikes.splice(this.currentHedline.disLikes.indexOf(this.currentUser.id), 1);}
        else
        {
          if(this.currentHedline.likes.includes(this.currentUser.id)) {
            this.likeCurrentHeadline();
          }
          this.currentHedline.disLikes.push(this.currentUser.id);
        }
      }
    );
  }

  archiveCurrentHeadline() {
    const tmpCurrentUser = this.currentUser;
    if(tmpCurrentUser.archives.includes(this.currentHedline.id)) {
      tmpCurrentUser.archives.splice(tmpCurrentUser.archives.indexOf(this.currentHedline.id), 1);
    } else {
      tmpCurrentUser.archives.push(this.currentHedline.id);
    }
    this.userService.updateCurrentUser(this.currentUser).then(
      () => {
        this.currentUser = tmpCurrentUser;
        this.alertService.print(tmpCurrentUser.archives.includes(this.currentHedline.id) ? 'The article has been successfully added to the archive' : 'The article has been successfully removed from the archive');
      }
    );
  }
}
