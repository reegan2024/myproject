import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExternalhtmlComponent } from './externalhtml.component';

describe('ExternalhtmlComponent', () => {
  let component: ExternalhtmlComponent;
  let fixture: ComponentFixture<ExternalhtmlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExternalhtmlComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExternalhtmlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
