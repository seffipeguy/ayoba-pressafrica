import {Component, OnInit} from '@angular/core';
import {Headline} from '../models/headline';
import {Utilisateur} from '../models/utilisateur';
import {StorageService} from '../services/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  paySelect = '';
  headlines: Headline[] = [];

  categorieSelect = '';

  currentUser: Utilisateur = null;
  currentSearch = '';

  constructor(private storageService: StorageService) {}

  ngOnInit() {
    this.categorieSelect = this.storageService.getItem('categorieSelect') ? this.storageService.getItem('categorieSelect') : '';
    this.storageService.watchStorage().subscribe((data) => {
      this.categorieSelect = this.storageService.getItem('categorieSelect');
    });

  }

}
