import { Component, OnInit } from '@angular/core';
import {Headline} from "../models/headline";
import {HeadlineService} from "../services/headline.service";
import {StorageService} from "../services/storage.service";

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.page.html',
  styleUrls: ['./calendar.page.scss'],
})
export class CalendarPage implements OnInit {

  etatSelection = false;
  currentDate = (new Date()).getFullYear() + '-' + (((new Date()).getMonth() + 1) < 10 ? '0' + ((new Date()).getMonth() + 1).toString() : (new Date()).getMonth() + 1)  + '-' + (new Date()).getDate();
  headlines: Headline[] = [];
  categorieSelect = '';

  constructor(private headlineService: HeadlineService, private storageService: StorageService) { }

  ngOnInit() {
    this.searchFromDate();

    this.categorieSelect = this.storageService.getItem('categorieSelect') ? this.storageService.getItem('categorieSelect') : '';
    this.storageService.watchStorage().subscribe((data) => {
      this.categorieSelect = this.storageService.getItem('categorieSelect');
    });
  }

  previewDate() {
    console.log(this.currentDate);
  }

  followDate() {
    console.log(this.currentDate);
  }

  searchFromDate() {
    this.headlineService.getHeadlinesWitchDate(this.currentDate).then(
      (data) => {
        this.headlines = data;
      }
    );
  }

}
