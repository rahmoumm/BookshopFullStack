import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddingBookToStockFormComponent } from './adding-book-to-stock-form.component';

describe('AddingBookToStockFormComponent', () => {
  let component: AddingBookToStockFormComponent;
  let fixture: ComponentFixture<AddingBookToStockFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddingBookToStockFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddingBookToStockFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
