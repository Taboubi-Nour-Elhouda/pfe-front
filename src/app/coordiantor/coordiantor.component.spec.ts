import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoordiantorComponent } from './coordiantor.component';

describe('CoordiantorComponent', () => {
  let component: CoordiantorComponent;
  let fixture: ComponentFixture<CoordiantorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoordiantorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoordiantorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
