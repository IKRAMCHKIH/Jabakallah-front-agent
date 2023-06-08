import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LivraisonFormComponent } from './livraison-form.component';

describe('LivraisonFormComponent', () => {
  let component: LivraisonFormComponent;
  let fixture: ComponentFixture<LivraisonFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LivraisonFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LivraisonFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
