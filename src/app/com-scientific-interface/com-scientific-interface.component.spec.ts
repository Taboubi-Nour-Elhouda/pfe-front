import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComScientificInterfaceComponent } from './com-scientific-interface.component';

describe('ComScientificInterfaceComponent', () => {
  let component: ComScientificInterfaceComponent;
  let fixture: ComponentFixture<ComScientificInterfaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComScientificInterfaceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComScientificInterfaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
