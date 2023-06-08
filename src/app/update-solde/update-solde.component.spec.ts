import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateSoldeComponent } from './update-solde.component';

describe('UpdateSoldeComponent', () => {
  let component: UpdateSoldeComponent;
  let fixture: ComponentFixture<UpdateSoldeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateSoldeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateSoldeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
