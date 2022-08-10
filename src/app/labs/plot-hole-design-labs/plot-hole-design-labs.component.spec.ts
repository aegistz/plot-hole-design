import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlotHoleDesignLabsComponent } from './plot-hole-design-labs.component';

describe('PlotHoleDesignLabsComponent', () => {
  let component: PlotHoleDesignLabsComponent;
  let fixture: ComponentFixture<PlotHoleDesignLabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlotHoleDesignLabsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlotHoleDesignLabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
