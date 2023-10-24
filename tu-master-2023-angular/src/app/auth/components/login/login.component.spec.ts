import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent, emailValidatorFn } from './login.component';
import { Validators } from '@angular/forms';
import { EmailValidator } from 'src/app/core/validators/email.validator';

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

  it('should init form', () => {
    expect(loginComp.loginForm).toBeDefined();
  });

  it('should have email field', () => {
    expect(Object.keys(loginComp.loginForm.controls)).toContain('email');
  });

  it('should have validators on email field', () => {
    expect(
      loginComp.loginForm.controls['email'].hasValidator(Validators.required)
    ).toBeTruthy();

    expect(
      loginComp.loginForm.controls['email'].hasValidator(emailValidatorFn)
    ).toBeTruthy();
  });

  it('should have password field', () => {
    expect(Object.keys(loginComp.loginForm.controls)).toContain('password');
  });

  it('should loading', () => {
    loginComp.submitForm();
    expect(loginComp.isLoading()).toBeTruthy();
  })
});
