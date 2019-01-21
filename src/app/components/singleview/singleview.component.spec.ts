import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleviewComponent } from './singleview.component';

describe('SingleviewComponent', () => {
  let component: SingleviewComponent;
  let fixture: ComponentFixture<SingleviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
