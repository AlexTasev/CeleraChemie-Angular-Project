import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/@core/services/product.service';
import constants from '../../../@core/utils/constants';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-create-edit-product',
  templateUrl: './create-edit-product.component.html',
  styleUrls: ['../../../common-styles/form.scss'],
})
export class CreateEditProductComponent implements OnInit, OnDestroy {
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private toastrService: ToastrService,
    private productService: ProductService,
  ) {}

  form: FormGroup;
  product: Product;
  productId = '';
  imgSrc = constants.images.createProductImg;
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
    this.route.params.pipe(takeUntil(this._ngDestroy$)).subscribe((params) => {
      this.productId = params.id;

      if (this.productId) {
        this.getProduct();
      } else {
        this._initializeForm();
      }
    });
  }

  private _initializeForm() {
    this.form = this.fb.group({
      manufacturer: [this.product ? this.product.manufacturer : '', Validators.required],
      description: [this.product ? this.product.description : '', Validators.required],
      category: [this.product ? this.product.category : '', Validators.required],
      language: [this.product ? this.product.language : '', Validators.required],
      logoUrl: [this.product ? this.product.logoUrl : '', Validators.required],
      catalogueUrl: [this.product ? this.product.catalogueUrl : ''],
      brandWebSite: [this.product ? this.product.brandWebSite : ''],
    });
  }

  saveProduct() {
    this._validateForm();

    if (this.isFormValid && this.form.valid) {
      this.productService
        .createOrUpdateProduct(this.productId, this.form.value)
        .pipe(takeUntil(this._ngDestroy$))
        .subscribe(() => {
            this.toastrService.success('Product successfully updated');
            this.router.navigate(['/products']);
          }, (err) => this.toastrService.error(`${err.error.message}`, 'Unable to update product'),
        );
    }
  }

  getProduct() {
    this.productService
      .getProductById(this.productId)
      .pipe(takeUntil(this._ngDestroy$))
      .subscribe((data: Product) => {
          this.product = data;
          this._initializeForm();
        }, (err) => this.toastrService.error(`${err.error.message}`, 'Unable to get product info'),
      );
  }

  private _validateForm() {
    const { manufacturer, description, category, language, logoUrl, catalogueUrl, brandWebSite } = this.form.value;

    if (manufacturer.length < 2 || !constants.specialCharsShortRegex.test(manufacturer)) {
      this.isFormValid = false;
      this.invalidManufacturerMsg = `Manufacturer ${manufacturer} is not valid. Please provide correct manufacturer`;
      setTimeout(() => { this.isFormValid = true; this.invalidManufacturerMsg = ''; }, 3000);
    }

    if (description.length < 2 || !constants.specialCharsLongRegex.test(manufacturer)) {
      this.isFormValid = false;
      this.invalidDescriptionMsg = 'Description is not valid';
      setTimeout(() => { this.isFormValid = true; this.invalidDescriptionMsg = ''; }, 3000);
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

    if (logoUrl && !constants.urlRegex.test(logoUrl) && logoUrl.length <= 14) {
      this.isFormValid = false;
      this.invalidLogoMsg = 'Invalid Logo URL';
      setTimeout(() => { this.isFormValid = true; this.invalidLogoMsg = ''; }, 3000);
    }

    if (catalogueUrl && !constants.urlRegex.test(catalogueUrl)) {
      this.isFormValid = false;
      this.invalidCatalogueUrlMsg = 'Catalogue URL is not valid';
      setTimeout(() => { this.isFormValid = true; this.invalidCatalogueUrlMsg = ''; }, 3000);
    }

    if (brandWebSite && !constants.urlRegex.test(brandWebSite)) {
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
