import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { FooterComponent } from '../components/common/footer/footer.component';
import { LanguageComponent } from '../components/common/language/language.component';
import { HeaderComponent } from '../components/common/header/header.component';
import { RouterModule } from '@angular/router';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}

@NgModule({
  declarations: [FooterComponent, LanguageComponent, HeaderComponent],
  imports: [
    HttpClientModule,
    RouterModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  exports: [FooterComponent, LanguageComponent, HeaderComponent],
  providers: [],
})
export class ComponentsModule {}
