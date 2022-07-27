import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Coverage} from '../../models/coverage';
import {CoverageService} from "../../services/coverage.service";
import {Headline} from "../../models/headline";
import {EditorService} from "../../services/editor.service";
import {Editor} from "../../models/editor";

@Component({
  selector: 'app-print-all-coverage',
  templateUrl: './print-all-coverage.component.html',
  styleUrls: ['./print-all-coverage.component.scss'],
})
export class PrintAllCoverageComponent implements OnInit, OnChanges {

  @Input() idCategory;
  listeCoverage: Coverage[] = [];
  headlines: Headline[] = [];
  editors: Editor[] = [];
  idCat = '';


  constructor(private coverageService: CoverageService, private editorService: EditorService) {
  }

  ngOnChanges(changes: SimpleChanges): void {
        this.idCat = this.idCategory;
        this.ngOnInit();
    }

  ngOnInit() { this.idCat = this.idCategory;
    this.coverageService.getAllCoverage().then(
      (data) => {
        this.listeCoverage = data;
      }
    );

    this.editorService.getEditors().then(
      (data) => {
        this.editors = data;
      }
    );
  }

  filtreHeadlineWitchCoverage(idCoverage: string) {    console.log(idCoverage);
    const result: Headline[] = [];
    for(let i=0; i<this.headlines.length; i++) {
      if(this.getCoverageWitchEditor(this.headlines[i].idEditor) === idCoverage) {
        result.push(this.headlines[i]);
      }
    }
    return result;
  }

  getCoverageWitchEditor(idEditor: string): string {
    let result: string;
    for(let i=0; i<this.editors.length; i++) {
      if(idEditor === this.editors[i].id) {
        result = this.editors[i].idCoverage;
        return result;
      }
    }
  }

}
