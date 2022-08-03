import { Component, OnInit } from '@angular/core';
import {Headline} from "../models/headline";
import {HeadlineService} from "../services/headline.service";

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.page.html',
  styleUrls: ['./calendar.page.scss'],
})
export class CalendarPage implements OnInit {

  etatSelection = false;
  currentDate = (new Date()).getFullYear() + '-' + (((new Date()).getMonth() + 1) < 10 ? '0' + ((new Date()).getMonth() + 1).toString() : (new Date()).getMonth() + 1)  + '-' + (new Date()).getDate();
  headlines: Headline[] = [];

  constructor(private headlineService: HeadlineService) { }

  ngOnInit() {
    this.searchFromDate();
  }

  searchFromDate() {
    this.headlineService.getHeadlinesWitchDate(this.currentDate).then(
      (data) => {
        this.headlines = data;
      }
    );
  }

}
