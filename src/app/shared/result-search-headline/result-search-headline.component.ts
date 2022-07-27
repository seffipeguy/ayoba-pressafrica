import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {HeadlineService} from '../../services/headline.service';
import {Headline} from '../../models/headline';
import {EditorService} from '../../services/editor.service';

@Component({
  selector: 'app-result-search-headline',
  templateUrl: './result-search-headline.component.html',
  styleUrls: ['./result-search-headline.component.scss'],
})
export class ResultSearchHeadlineComponent implements OnInit, OnChanges {

  @Input() texte = '';
  @Input() idCategory = '';
  listAllHeadline: Headline[] = [];
  headlines: Headline[] = [];

  constructor(private headlineService: HeadlineService, private editorService: EditorService) { }

  ngOnInit() { this.headlines = [];
    /*const pointe = this;
    this.headlines = [];
    // eslint-disable-next-line prefer-arrow/prefer-arrow-functions
    this.listAllHeadline.forEach(function(doc) {
      if(pointe.idCategory !== '') {
        pointe.filtreHeadline(doc.idEditor).then(
          (result) => {
            if(result) {
              pointe.headlines.push(doc);
            }
          }
        );
      } else {
        pointe.headlines.push(doc);
      }
    });*/
  }

  ngOnChanges() {
    if(this.texte !== '') {
      this.headlineService.getHeadlinesWitchText(this.texte).then(
        (data) => {
          this.listAllHeadline = data;

          const pointe = this;
          this.headlines = [];
          // eslint-disable-next-line prefer-arrow/prefer-arrow-functions
          this.listAllHeadline.forEach(function(doc) {
            if(pointe.idCategory !== '') {
              pointe.filtreHeadline(doc.idEditor).then(
                (result) => {
                  if(result) {
                    pointe.headlines.push(doc);
                  }
                }
              );
            } else {
              pointe.headlines.push(doc);
            }
          });
        }
      );
    }
  }

  async filtreHeadline(idEditor: string) {
    return new Promise<boolean>((resolve, reject) => {
      this.editorService.getEditorWitchId(idEditor).then(
        (data) => {
          if (data.idCategory === this.idCategory) {
            resolve(true);
          } else {
            resolve(false);
          }
        }
      );
    });
  }
}
