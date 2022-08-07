import { Component, OnInit } from '@angular/core';
import {PollService} from "../services/poll.service";

@Component({
  selector: 'app-polls',
  templateUrl: './polls.page.html',
  styleUrls: ['./polls.page.scss'],
})
export class PollsPage implements OnInit {

  isSearch = false;
  pools: any[] = [];
  loadedListPolls: any[];

  constructor(private pollSevice: PollService) { }

  ngOnInit() {
    /*
    this.pollSevice.addNewpoll(new Poll('Le Français Jean-Louis Gasset est le nouveau sélectionneur des Eléphants de Côte d\'Ivoire avec pour adjoint l\'Ivoirien Faé Emerse. Que pensez-vous de ce choix?')).then(
      () => {
        alert('Envoyer avec succes');
      }
    );
    */

    this.pollSevice.getPolls().then(
      (data) => {
        this.pools = data;
        this.loadedListPolls = this.pools;
      }
    );
  }

  /* Recherche transaction */
  initializeItemsAll(): void {
    this.pools = this.loadedListPolls;
  }

  filterListTransaction(evt) {
    this.initializeItemsAll();

    const searchTerm = evt.detail.target.value;

    if (!searchTerm) {
      this.loadedListPolls = this.pools;
      return;
    }

    this.pools = this.pools.filter(current => {
      if ((current.title) && searchTerm){
        if (current.title.toString().toLowerCase().indexOf(searchTerm.toLowerCase()) > -1) {
          return true;
        }
        return false;
      }

    });
  }
  /* Fin recherche */

}
