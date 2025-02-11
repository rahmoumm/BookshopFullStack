import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserNotLoggedInComponent } from './user-not-logged-in.component';

describe('UserNotLoggedInComponent', () => {
  let component: UserNotLoggedInComponent;
  let fixture: ComponentFixture<UserNotLoggedInComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserNotLoggedInComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserNotLoggedInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
