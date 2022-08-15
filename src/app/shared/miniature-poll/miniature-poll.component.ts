import {Component, Input, OnInit} from '@angular/core';
import {PollService} from '../../services/poll.service';
import {Poll} from '../../models/poll';
import {UtilisateurService} from '../../services/utilisateur.service';
import {Utilisateur} from '../../models/utilisateur';
import {Router} from '@angular/router';
import {AuthentificationService} from "../../services/authentification.service";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-miniature-poll',
  templateUrl: './miniature-poll.component.html',
  styleUrls: ['./miniature-poll.component.scss'],
})
export class MiniaturePollComponent implements OnInit {

  @Input() idPoll;
  currentPoll: Poll;
  oldReponse = -2;
  reponse = -1;
  currentUser: Utilisateur = null;
  currentGuest = '';

  constructor(private translate: TranslateService, private authService: AuthentificationService, private pollService: PollService, private userService: UtilisateurService, private router: Router) { }

  ngOnInit() {
    this.pollService.getPollWitchId(this.idPoll).then(
      (data) => {
        this.currentPoll = data;
        this.authService.isAuthenticated().then(
          (result) => {
            if(result) {
              this.userService.getCurrentUtilisateur().then(
                (data1) => {
                  this.currentUser = data1;
                  if(this.currentPoll.choice1.includes(data1.id)) {
                    this.oldReponse = 0;
                  } else if(this.currentPoll.choice2.includes(data1.id)) {
                    this.oldReponse = 1;
                  } else if(this.currentPoll.choice3.includes(data1.id)) {
                    this.oldReponse = 2;
                  } else if(this.currentPoll.choice4.includes(data1.id)) {
                    this.oldReponse = 3;
                  } else if(this.currentPoll.choice2.includes(data1.id)) {
                    this.oldReponse = 4;
                  } else {
                    this.oldReponse = -1;
                  }
                  this.reponse = this.oldReponse;
                }
              );
            } else {
              this.currentGuest = this.authService.getAnonymeId();
              if(this.currentPoll.choice1.includes(this.authService.getAnonymeId())) {
                this.oldReponse = 0;
              } else if(this.currentPoll.choice2.includes(this.authService.getAnonymeId())) {
                this.oldReponse = 1;
              } else if(this.currentPoll.choice3.includes(this.authService.getAnonymeId())) {
                this.oldReponse = 2;
              } else if(this.currentPoll.choice4.includes(this.authService.getAnonymeId())) {
                this.oldReponse = 3;
              } else if(this.currentPoll.choice2.includes(this.authService.getAnonymeId())) {
                this.oldReponse = 4;
              } else {
                this.oldReponse = -1;
              }
              this.reponse = this.oldReponse;
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

  updateResponse(i: number) {
    this.reponse = i;
  }

  saveResponse() {
    const tmpIdSave = this.currentUser ? this.currentUser.id : this.authService.getAnonymeId();
    this.cleanAllChoice();
    switch (this.reponse) {
      case 0:
        this.currentPoll.choice1.push(tmpIdSave);
        break;
      case 1:
        this.currentPoll.choice2.push(tmpIdSave);
        break;
      case 2:
        this.currentPoll.choice3.push(tmpIdSave);
        break;
      case 3:
        this.currentPoll.choice4.push(tmpIdSave);
        break;
      case 4:
        this.currentPoll.choice5.push(tmpIdSave);
        break;
    }
    this.pollService.updatePoll(this.currentPoll).then(
      () => {
        this.oldReponse = this.reponse;
        this.router.navigate(['poll/' + this.currentPoll.id]);
      }
    );
  }

  cleanAllChoice() {
    this.currentPoll.choice1.slice(this.currentPoll.choice1.indexOf(this.currentUser ? this.currentUser.id : this.currentGuest), 1);
    this.currentPoll.choice2.slice(this.currentPoll.choice2.indexOf(this.currentUser ? this.currentUser.id : this.currentGuest), 1);
    this.currentPoll.choice3.slice(this.currentPoll.choice3.indexOf(this.currentUser ? this.currentUser.id : this.currentGuest), 1);
    this.currentPoll.choice4.slice(this.currentPoll.choice4.indexOf(this.currentUser ? this.currentUser.id : this.currentGuest), 1);
    this.currentPoll.choice5.slice(this.currentPoll.choice5.indexOf(this.currentUser ? this.currentUser.id : this.currentGuest), 1);
  }

}
