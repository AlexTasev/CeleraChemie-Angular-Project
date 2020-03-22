import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.scss']
})
export class LanguageComponent implements OnInit {

  constructor(
    private translate: TranslateService
  ) { }

  ngOnInit(): void {
  }

  changeLanguage(selectedLang) {
    console.log(selectedLang);
  }

}
