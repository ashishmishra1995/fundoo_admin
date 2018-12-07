import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminQNaComponent } from './admin-q-na.component';

describe('AdminQNaComponent', () => {
  let component: AdminQNaComponent;
  let fixture: ComponentFixture<AdminQNaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminQNaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminQNaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
