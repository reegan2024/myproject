import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JavascriptAddingComponent } from './javascript-adding.component';

describe('JavascriptAddingComponent', () => {
  let component: JavascriptAddingComponent;
  let fixture: ComponentFixture<JavascriptAddingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JavascriptAddingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JavascriptAddingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
