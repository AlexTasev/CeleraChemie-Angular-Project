import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePageComponent } from './pages/home-page/home-page.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactsComponent } from './pages/contacts/contacts.component';
import { CertificatesComponent } from './pages/certificates/certificates.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { UserProfileComponent } from './pages/user/user-profile/user-profile.component';
import { AuthGuard } from './@core/auth/auth.guard';
import { AllUsersComponent } from './pages/user/all-users/all-users.component';
import { CreateEditProductComponent } from './pages/product/create-edit-product/create-edit-product.component';
import { ProductsAllComponent } from './pages/product/products-all/products-all.component';

const routes: Routes = [
  { path: 'about', component: AboutComponent },
  { path: 'contacts', component: ContactsComponent },
  { path: 'certificates', component: CertificatesComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'user/profile', component: UserProfileComponent },
  { path: 'users/all', component: AllUsersComponent },
  { path: 'users/all', component: AllUsersComponent },
  { path: 'product/create', component: CreateEditProductComponent },
  { path: 'product/edit/:id', component: CreateEditProductComponent },
  { path: 'products', component: ProductsAllComponent },
  { path: '', component: HomePageComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
