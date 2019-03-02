import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolManagementComponent } from './tool-management.component';

describe('ToolManagementComponent', () => {
  let component: ToolManagementComponent;
  let fixture: ComponentFixture<ToolManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToolManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
