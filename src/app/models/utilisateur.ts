import {ToolsService} from '../services/tools.service';

export class Utilisateur {
  photo = '';
  date: string;
  id: string;
  idCountry: string;
  archives: string[];
  editorsLikes: string[];

  constructor(public userName: string, public phone: string, public status: string, public role: string) {
    const gid = new ToolsService();
    this.id = gid.generateId(23);
    this.date = new Date().toString();
    this.idCountry = '';
    this.archives = [];
    this.editorsLikes = [];
  }
}
