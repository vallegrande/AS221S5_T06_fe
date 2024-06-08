import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComputerGaleryComponent } from './computer-galery.component';

describe('ComputerGaleryComponent', () => {
  let component: ComputerGaleryComponent;
  let fixture: ComponentFixture<ComputerGaleryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ComputerGaleryComponent]
    });
    fixture = TestBed.createComponent(ComputerGaleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
