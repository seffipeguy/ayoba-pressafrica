import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Poll} from '../models/poll';
import {PollService} from '../services/poll.service';

@Component({
  selector: 'app-preview-poll',
  templateUrl: './preview-poll.page.html',
  styleUrls: ['./preview-poll.page.scss'],
})
export class PreviewPollPage implements OnInit {

  currentPoll: Poll = null;

  constructor(private activatedRoute: ActivatedRoute, private pollService: PollService) { }

  ngOnInit() {
    this.pollService.getPollWitchId(this.activatedRoute.snapshot.paramMap.get('id')).then(
      (data) => {
        this.currentPoll = data;
      }
    );
  }

  isPair(nombre: number): boolean {
    return nombre % 2 === 0;
  }

  getValeurEntiere(nombre: number) {
    return Math.trunc(nombre);
  }

  getNombreWitchChoice(choice: number) {
    switch (choice) {
      case 1:
        return this.currentPoll.choice1;
        break;
      case 2:
        return this.currentPoll.choice2;
        break;
      case 3:
        return this.currentPoll.choice3;
        break;
      case 4:
        return this.currentPoll.choice4;
        break;
      case 5:
        return this.currentPoll.choice5;
        break;
    }
  }

}
