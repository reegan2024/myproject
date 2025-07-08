import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XmlconvertComponent } from './xmlconvert.component';

describe('XmlconvertComponent', () => {
  let component: XmlconvertComponent;
  let fixture: ComponentFixture<XmlconvertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ XmlconvertComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(XmlconvertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
