import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OsebnaKnjiznicaComponent } from './osebna-knjiznica.component';

describe('OsebnaKnjiznicaComponent', () => {
  let component: OsebnaKnjiznicaComponent;
  let fixture: ComponentFixture<OsebnaKnjiznicaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OsebnaKnjiznicaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OsebnaKnjiznicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
