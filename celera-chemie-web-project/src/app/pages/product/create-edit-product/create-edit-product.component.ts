import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/@core/services/product.service';
import constants from '../../../@core/utils/constants';

@Component({
  selector: 'app-create-edit-product',
  templateUrl: './create-edit-product.component.html',
  styleUrls: ['../../../common-styles/form.scss'],
})
export class CreateEditProductComponent implements OnInit, OnDestroy {
  constructor(private fb: FormBuilder, private router: Router, private toastrService: ToastrService, private productService: ProductService) {}

  form: FormGroup;
  isEditMode = false;
  private _ngDestroy$ = new Subject<void>();

  // Validations
  isFormValid = true;
  invalidManufacturerMsg = '';
  invalidDescriptionMsg = '';
  invalidCategoryMsg = '';
  invalidLanguageMsg = '';
  invalidLogoMsg = '';
  invalidCatalogueUrlMsg = '';
  invalidWebSiteMsg = '';

  ngOnInit(): void {
    this._initializeForm();
  }

  private _initializeForm() {
    if (this.isEditMode) {
      return;
    } else {
      this.form = this.fb.group({
        manufacturer: ['', Validators.required],
        description: ['', Validators.required],
        category: ['', Validators.required],
        language: ['', Validators.required],
        logoUrl: ['', Validators.required],
        catalogueUrl: [''],
        brandWebSite: [''],
      });
    }
  }

  saveProduct() {
    this._validateForm();

    if (this.isEditMode) {
      return;
    } else {
      if (this.isFormValid && this.form.valid) {
        this.productService
          .createProduct(this.form.value)
          .pipe(takeUntil(this._ngDestroy$))
          .subscribe(() => {
              this.toastrService.success('Product successfully created');
              this.router.navigate(['/']);
            }, () => this.toastrService.error('Unable to create product'),
          );
      }
    }
  }

  private _validateForm() {
    const { manufacturer, description, category, language, logoUrl, catalogueUrl, brandWebSite } = this.form.value;

    if (manufacturer.length < 2 || !constants.specialCharsShortRegex.test(manufacturer)) {
      this.isFormValid = false;
      this.invalidManufacturerMsg = `Manufacturer ${manufacturer} is not valid. Please provide correct manufacturer`;
      setTimeout(() => { this.isFormValid = true; this.invalidManufacturerMsg = ''; }, 3000);
    }

    if (description.length < 2) {
      this.isFormValid = false;
      this.invalidDescriptionMsg = 'Description is not valid';
      setTimeout(() => {  this.isFormValid = true;  this.invalidDescriptionMsg = ''; }, 3000);
    }

    if (category === '') {
      this.isFormValid = false;
      this.invalidCategoryMsg = 'Category is required.';
      setTimeout(() => { this.isFormValid = true; this.invalidCategoryMsg = ''; }, 3000);
    }

    if (language === '') {
      this.isFormValid = false;
      this.invalidLanguageMsg = 'Language is required.'; 
      setTimeout(() => { this.isFormValid = true; this.invalidLanguageMsg = ''; }, 3000);
    }

    if (logoUrl && !logoUrl.startsWith('http') && logoUrl.length <= 14) {
      this.isFormValid = false;
      this.invalidLogoMsg = 'Invalid Logo URL'; 
      setTimeout(() => { this.isFormValid = true; this.invalidLogoMsg = ''; }, 3000);
    }

    if (catalogueUrl && !catalogueUrl.startsWith('http')) {
      this.isFormValid = false;
      this.invalidCatalogueUrlMsg = 'Catalogue URL is not valid';
      setTimeout(() => { this.isFormValid = true; this.invalidCatalogueUrlMsg = ''; }, 3000);
    }

    if (brandWebSite && !brandWebSite.startsWith('http')) {
      this.isFormValid = false;
      this.invalidWebSiteMsg = 'Company web site URL is not valid';
      setTimeout(() => { this.isFormValid = true; this.invalidWebSiteMsg = ''; }, 3000);
    }
  }

  ngOnDestroy() {
    clearTimeout();
    this._ngDestroy$.next();
    this._ngDestroy$.complete();
  }
}
