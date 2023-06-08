import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentListComponentComponent } from './agent-list-component.component';

describe('AgentListComponentComponent', () => {
  let component: AgentListComponentComponent;
  let fixture: ComponentFixture<AgentListComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgentListComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentListComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
