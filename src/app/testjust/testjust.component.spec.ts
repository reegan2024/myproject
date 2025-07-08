import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestjustComponent } from './testjust.component';

describe('TestjustComponent', () => {
  let component: TestjustComponent;
  let fixture: ComponentFixture<TestjustComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestjustComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestjustComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
