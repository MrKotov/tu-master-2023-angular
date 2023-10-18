import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let loginComp: LoginComponent;
  let loginFixture: ComponentFixture<LoginComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [LoginComponent],
    });

    loginFixture = TestBed.createComponent(LoginComponent);
    loginComp = loginFixture.componentInstance;
  });

  it('should be initialized', () => {
    expect(loginComp).toBeDefined();
  });
});
