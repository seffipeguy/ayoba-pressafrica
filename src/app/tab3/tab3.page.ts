import {Component, OnInit} from '@angular/core';
import {UtilisateurService} from '../services/utilisateur.service';
import {Utilisateur} from '../models/utilisateur';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

  user: Utilisateur | any = null;

  constructor(private userService: UtilisateurService) {}

  ngOnInit(): void {
    this.userService.getCurrentUtilisateur().then(
      (data) => {
        this.user = data;
      }
    );
  }

}
