import { Component, OnInit } from '@angular/core';
import {ModalController, NavParams, ToastController} from '@ionic/angular';
import {HeadlineService} from '../services/headline.service';
import {Headline} from '../models/headline';
import {EditorService} from '../services/editor.service';
import {Editor} from '../models/editor';
import {CommentService} from '../services/comment.service';
import {Comment} from '../models/comment';
import {UtilisateurService} from '../services/utilisateur.service';
import {Utilisateur} from '../models/utilisateur';
import {AlertService} from '../services/alert.service';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-apercu-news',
  templateUrl: './apercu-news.page.html',
  styleUrls: ['./apercu-news.page.scss'],
})
export class ApercuNewsPage implements OnInit {

  isLoading = false;
  currentHeadline: Headline;
  currentEditor: Editor = null;
  currentComment: Comment[] = [];
  currentUser: Utilisateur = null;
  isComment = false;
  writeComment = '';

  constructor(private translate: TranslateService, private alertService: AlertService, private toastController: ToastController, private userService: UtilisateurService, private commentService: CommentService, private editorService: EditorService, private navParams: NavParams, private modalCtrl: ModalController, private headlineService: HeadlineService) { }

  ngOnInit() {
    this.headlineService.getHeadlineWitchId(this.navParams.get('idHeadline')).then(
      (data) => {
        this.currentHeadline = data;

        this.editorService.getEditorWitchId(this.currentHeadline.idEditor).then(
          (data1) => {
            this.currentEditor = data1;
          }
        );

        this.commentService.getComments(this.currentHeadline.id).then(
          (data2) => {
            this.currentComment = data2;
          }
        );

        this.userService.getCurrentUtilisateur().then(
          (data3) => {
            this.currentUser = data3;

            if(this.navParams.get('scroollComment') === true) {
              this.scrollToElement('liste_comment');
            }
          }
        );
      }
    );
  }

  getValueTraduct(texte: string) {
    let result; let result2;
    const result1 = texte.split(this.translate.currentLang + '>');
    if(result1.length > 1) {  console.log(); result2 = result1[1].split('</' + this.translate.currentLang + '>'); }
    if(result1.length > 1 && result2.length > 0) { result = result2[0]; }
    return result ? result : texte;
  }

  shared() {
    navigator.share({
      title: this.currentHeadline.title,
      text: this.currentHeadline.content,
      url: 'https://ayoba-news-headlines.web.app/' ,
    });
  }

  scrollToElement(element: any): void { console.log(element);
    (document.getElementById(element) as HTMLElement).scrollIntoView({behavior: 'smooth', block: 'start', inline: 'nearest'});
  }

  sendComment(idParent: string) {
    if(this.writeComment) {
      const tmpComment = new Comment(this.currentHeadline.id, this.currentUser.id, idParent, this.writeComment);
      this.commentService.addNewComment(tmpComment).then(
        () => {
          this.currentComment.unshift(tmpComment);
          this.writeComment = '';
          this.isComment = false;
          this.scrollToElement('title_comment');
        }
      );
    }
  }

  like() {
    this.headlineService.likeHeadline(this.currentHeadline).then(
      () => {
        if(this.currentHeadline.likes.includes(this.currentUser.id))
          {this.currentHeadline.likes.splice(this.currentHeadline.likes.indexOf(this.currentUser.id), 1);}
        else
          {
            if(this.currentHeadline.disLikes.includes(this.currentUser.id)) {
              this.dislike();
            }
            this.currentHeadline.likes.push(this.currentUser.id);
          }
      }
    );
  }

  dislike() {
    this.headlineService.disLikeHeadline(this.currentHeadline).then(
      () => {
        if(this.currentHeadline.disLikes.includes(this.currentUser.id))
        {this.currentHeadline.disLikes.splice(this.currentHeadline.disLikes.indexOf(this.currentUser.id), 1);}
        else
        {
          if(this.currentHeadline.likes.includes(this.currentUser.id)) {
            this.like();
          }
          this.currentHeadline.disLikes.push(this.currentUser.id);
        }
      }
    );
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

  archiveCurrentHeadline() {
    const tmpCurrentUser = this.currentUser;
    if(tmpCurrentUser.archives.includes(this.currentHeadline.id)) {
      tmpCurrentUser.archives.splice(tmpCurrentUser.archives.indexOf(this.currentHeadline.id), 1);
    } else {
      tmpCurrentUser.archives.push(this.currentHeadline.id);
    }
    this.userService.updateCurrentUser(this.currentUser).then(
      () => {
        let txt1; let txt2;
        this.translate.get('5.5-2').subscribe((res: string) => { txt1 = res; });
        this.translate.get('5.5-3').subscribe((res: string) => { txt2 = res; });
        this.currentUser = tmpCurrentUser;
        this.alertService.print(tmpCurrentUser.archives.includes(this.currentHeadline.id) ? txt1 : txt2);
      }
    );
  }

  dismissModal() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalCtrl.dismiss({
      dismissed: true
    });
  }

}
