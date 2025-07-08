import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductmanagementComponent } from './productmanagement.component';

describe('ProductmanagementComponent', () => {
  let component: ProductmanagementComponent;
  let fixture: ComponentFixture<ProductmanagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductmanagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductmanagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
