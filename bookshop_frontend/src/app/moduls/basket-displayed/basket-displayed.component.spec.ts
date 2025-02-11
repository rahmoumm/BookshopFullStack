import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasketDisplayedComponent } from './basket-displayed.component';

describe('BasketDisplayedComponent', () => {
  let component: BasketDisplayedComponent;
  let fixture: ComponentFixture<BasketDisplayedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BasketDisplayedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BasketDisplayedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
