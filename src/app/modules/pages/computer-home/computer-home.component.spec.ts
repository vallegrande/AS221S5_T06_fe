import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComputerHomeComponent } from './computer-home.component';

describe('ComputerHomeComponent', () => {
  let component: ComputerHomeComponent;
  let fixture: ComponentFixture<ComputerHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ComputerHomeComponent]
    });
    fixture = TestBed.createComponent(ComputerHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
