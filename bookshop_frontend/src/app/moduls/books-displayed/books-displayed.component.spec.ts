import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BooksDisplayedComponent } from './books-displayed.component';

describe('BooksDisplayedComponent', () => {
  let component: BooksDisplayedComponent;
  let fixture: ComponentFixture<BooksDisplayedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BooksDisplayedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BooksDisplayedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
