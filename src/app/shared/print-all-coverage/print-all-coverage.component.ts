import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Coverage} from '../../models/coverage';
import {CoverageService} from '../../services/coverage.service';
import {EditorService} from '../../services/editor.service';

@Component({
  selector: 'app-print-all-coverage',
  templateUrl: './print-all-coverage.component.html',
  styleUrls: ['./print-all-coverage.component.scss'],
})
export class PrintAllCoverageComponent implements OnInit, OnChanges {

  @Input() idCategory;
  listeCoverage: Coverage[] = [];
  listeAllCoverage: Coverage[] = [];
  idCat = '';

  constructor(private coverageService: CoverageService, private editorService: EditorService) {
  }

  ngOnChanges(changes: SimpleChanges): void {
        this.ngOnInit();
    }

  ngOnInit() {
    this.idCat = this.idCategory;
    this.coverageService.getAllCoverage().then(
      (data) => {
        this.listeCoverage = data;
      }
    );
  }
}
