import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {HeadlineService} from '../../services/headline.service';
import {CoverageService} from '../../services/coverage.service';
import {Coverage} from '../../models/coverage';
import {EditorService} from "../../services/editor.service";
import {Editor} from "../../models/editor";
import {Headline} from '../../models/headline';
import {TranslateService} from "@ngx-translate/core";
import {StorageService} from "../../services/storage.service";

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

  constructor(private storageService: StorageService, private translate: TranslateService, private headlineService: HeadlineService, private coverageService: CoverageService, private editorService: EditorService) { }

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
          if ((pointe.idCategory === '' || doc.idCategory === pointe.idCategory) && (!pointe.storageService.getItem('paysSelect') || doc.idCountry.includes(pointe.storageService.getItem('paysSelect')))) {
            pointe.headlineService.getHeadlinesWitchIdEditor(doc.id).then(
              (data2) => {
                data2.forEach(function(doc2) {
                  pointe.headlines.push(doc2);
                });
              }
            );
          }
        });
      }
    );
  }

  ngOnChanges(changes: SimpleChanges) {
    this.ngOnInit();
  }

  getValueTraduct(texte: string) {
    let result; let result2;
    const result1 = texte.split(this.translate.currentLang + '>');
    if(result1.length > 1) {  console.log(); result2 = result1[1].split('</'); }
    if(result1.length > 1 && result2.length > 0) { result = result2[0]; }
    return result ? result : texte;
  }
}
