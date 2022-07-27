import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {HeadlineService} from '../../services/headline.service';
import {CoverageService} from '../../services/coverage.service';
import {Coverage} from '../../models/coverage';
import {EditorService} from "../../services/editor.service";
import {Editor} from "../../models/editor";
import {Headline} from '../../models/headline';
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-print-x-coverage',
  templateUrl: './print-x-coverage.component.html',
  styleUrls: ['./print-x-coverage.component.scss'],
})
export class PrintXCoverageComponent implements OnInit, OnChanges {

  @Input() idCategory;
  @Input() idCoverage;

  currentCoverage: Coverage;
  listeEditor: Editor[] = [];
  headlines: Headline[] = [];

  slideOptsNews = {
    initialSlide: 0,
    speed: 800 ,
    slidesPerView: 1.7,
    spaceBetween: 10,
    slidesOffsetBefore:10,
    slidesOffsetAfter:10
  };

  constructor(private translate: TranslateService, private headlineService: HeadlineService, private coverageService: CoverageService, private editorService: EditorService) { }

  ngOnInit() {
    this.coverageService.getCoverageWitchId(this.idCoverage).then(
      (data) => {
        this.currentCoverage = data;
      }
    );

    this.editorService.getEditorsWitchIdCoverage(this.idCoverage).then(
      (data1) => {
        this.listeEditor = data1;
        const pointe = this;
        data1.forEach(function(doc) {
          pointe.headlineService.getHeadlinesWitchIdEditor(doc.id).then(
            (data2) => {
              data2.forEach(function(doc2) {
                pointe.headlines.push(doc2);
              });
            }
          );
        });
      }
    );
  }

  ngOnChanges(changes: SimpleChanges) {
    const pointe = this;
    this.headlines = [];
    // eslint-disable-next-line prefer-arrow/prefer-arrow-functions
    this.headlines.forEach(function(doc) {
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

  getValueTraduct(texte: string) {
    let result; let result2;
    const result1 = texte.split(this.translate.currentLang + '>');
    if(result1.length > 1) {  console.log(); result2 = result1[1].split('</'); }
    if(result1.length > 1 && result2.length > 0) { result = result2[0]; }
    return result ? result : texte;
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
