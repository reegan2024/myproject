import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnfoodsComponent } from './anfoods.component';

describe('AnfoodsComponent', () => {
  let component: AnfoodsComponent;
  let fixture: ComponentFixture<AnfoodsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnfoodsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnfoodsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
