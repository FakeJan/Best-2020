import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LestvicaComponent } from './lestvica.component';

describe('LestvicaComponent', () => {
  let component: LestvicaComponent;
  let fixture: ComponentFixture<LestvicaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LestvicaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LestvicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
