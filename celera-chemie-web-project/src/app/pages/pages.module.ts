import { NgModule } from '@angular/core';

import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { HomePageComponent } from '../pages/home-page/home-page.component';
import { AboutComponent } from './about/about.component';
import { ContactsComponent } from './contacts/contacts.component';
import { CommonModule } from '@angular/common';
import { CertificatesComponent } from './certificates/certificates.component';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../@core/services/auth.service';
import { UserProfileComponent } from './user/user-profile/user-profile.component';
import { UserService } from '../@core/services/user.service';
import { AllUsersComponent } from './user/all-users/all-users.component';
import { CreateEditProductComponent } from './product/create-edit-product/create-edit-product.component';
import { ProductService } from '../@core/services/product.service';
import { ProductsAllComponent } from './product/products-all/products-all.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    HomePageComponent,
    AboutComponent,
    ContactsComponent,
    CertificatesComponent,
    RegisterComponent,
    LoginComponent,
    UserProfileComponent,
    AllUsersComponent,
    CreateEditProductComponent,
    ProductsAllComponent,
  ],
  imports: [
    HttpClientModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [AuthService, UserService, ProductService],
})
export class PagesModule {}
