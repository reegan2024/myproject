import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BfoodsComponent } from './bfoods.component';

describe('BfoodsComponent', () => {
  let component: BfoodsComponent;
  let fixture: ComponentFixture<BfoodsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BfoodsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BfoodsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
