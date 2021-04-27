import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from './login.service';

@Component({
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });
  ngOnInit() {
    if (this.loginService.isUserAuthenticated()) {
      this.router.navigate(['/profile']);
    }
  }
  constructor(private loginService: LoginService, private router: Router) {}
  onSubmit() {
    if (
      this.loginForm.valid &&
      this.loginService.IsValid(
        this.loginForm.get('username')?.value,
        this.loginForm.get('password')?.value
      )
    ) {
      this.loginService.loginUser();
      this.router.navigate(['/profile']);
    }
  }
  onClear() {
    this.loginForm.reset();
  }
}
