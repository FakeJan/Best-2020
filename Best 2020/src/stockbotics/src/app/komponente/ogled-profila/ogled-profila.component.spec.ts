import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OgledProfilaComponent } from './ogled-profila.component';

describe('OgledProfilaComponent', () => {
  let component: OgledProfilaComponent;
  let fixture: ComponentFixture<OgledProfilaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OgledProfilaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OgledProfilaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
