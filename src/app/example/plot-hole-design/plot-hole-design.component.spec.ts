import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlotHoleDesignComponent } from './plot-hole-design.component';

describe('PlotHoleDesignComponent', () => {
  let component: PlotHoleDesignComponent;
  let fixture: ComponentFixture<PlotHoleDesignComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlotHoleDesignComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlotHoleDesignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
