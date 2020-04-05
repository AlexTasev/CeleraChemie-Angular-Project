import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsAllComponent } from './products-all.component';

describe('ProductsAllComponent', () => {
  let component: ProductsAllComponent;
  let fixture: ComponentFixture<ProductsAllComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductsAllComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
