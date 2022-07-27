import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {HeadlineService} from '../../services/headline.service';
import {Headline} from '../../models/headline';
import {EditorService} from '../../services/editor.service';

@Component({
  selector: 'app-print-recent-headline',
  templateUrl: './print-recent-headline.component.html',
  styleUrls: ['./print-recent-headline.component.scss'],
})
export class PrintRecentHeadlineComponent implements OnInit, OnChanges {

  @Input() idCategory;

  slideOptsNews = {
    initialSlide: 0,
    speed: 800 ,
    slidesPerView: 1.7,
    spaceBetween: 10,
    slidesOffsetBefore:10,
    slidesOffsetAfter:10
  };

  headlines: Headline[] = [];
  listAllHeadline: Headline[] = [];

  constructor(private headlineService: HeadlineService, private editorService: EditorService) { }

  ngOnInit() {
    this.headlineService.getHeadlines().then(
      (data) => {
        const pointe = this;
        this.listAllHeadline = data;
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

  ngOnChanges(changes: SimpleChanges) {
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
