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
  isLoading = true;

  slideOptsNews = {
    initialSlide: 0,
    speed: 800 ,
    slidesPerView: 1.7,
    spaceBetween: 10,
    slidesOffsetBefore:10,
    slidesOffsetAfter:10
  };
  cmp = 0;

  constructor(private storageService: StorageService, private translate: TranslateService, private headlineService: HeadlineService, private coverageService: CoverageService, private editorService: EditorService) { }

  ngOnInit() {
    this.coverageService.getCoverageWitchId(this.idCoverage).then(
      (data) => {
        this.currentCoverage = data;
        if(this.cmp === 0) {
          this.cmp++;
          this.editorService.getEditorsWitchIdCoverage(this.idCoverage).then(
            (data1) => {
              this.listeEditor = [];
              this.listeEditor = data1;

              const tmpHeadline: Headline[] = [];
              for(let a=0; a<this.listeEditor.length; a++) {
                if ((this.idCategory === '' || this.listeEditor[a].idCategory === this.idCategory) && (!this.storageService.getItem('paysSelect') || this.listeEditor[a].idCountry.includes(this.storageService.getItem('paysSelect')))) {
                  this.headlineService.getHeadlinesWitchIdEditor(this.listeEditor[a].id, 1).then(
                    (data2) => {
                      for(let b=0; b<data2.length; b++) {
                        tmpHeadline.push(data2[b]);
                      }
                    }
                  );
                }
              }
              this.headlines = this.trieTableau(tmpHeadline);
              this.isLoading = false;
            }
          );
        }
      }
    );
  }

  trieTableau(tableau: Headline[]) {
    return tableau.sort((a, b) => this.convertStringDateToNumber(a.dateParution) - this.convertStringDateToNumber(b.dateParution)).reverse();
  }

  convertStringDateToNumber(date: string) {
    return Number(date.replace(/-/g, ''));
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
