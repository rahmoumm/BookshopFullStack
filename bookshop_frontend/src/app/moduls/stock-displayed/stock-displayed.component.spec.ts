import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockDisplayedComponent } from './stock-displayed.component';

describe('StockDisplayedComponent', () => {
  let component: StockDisplayedComponent;
  let fixture: ComponentFixture<StockDisplayedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StockDisplayedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StockDisplayedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
