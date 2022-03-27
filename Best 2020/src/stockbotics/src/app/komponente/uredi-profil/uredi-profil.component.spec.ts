import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UrediProfilComponent } from './uredi-profil.component';

describe('UrediProfilComponent', () => {
  let component: UrediProfilComponent;
  let fixture: ComponentFixture<UrediProfilComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UrediProfilComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UrediProfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
