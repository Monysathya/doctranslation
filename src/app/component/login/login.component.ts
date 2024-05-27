import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  isLoading: boolean = false;
  loginForm: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
  ) {
    this.loginForm = this.fb.group({
      email: [
        '',
        [
          Validators.required,
          // Validators.email,
          // Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ],
      ],
      password: [
        '',
        [Validators.required],
      ],
    });
  }

  ngOnInit(): void {
    const token = localStorage.getItem('token');

    if (token) {
      this.router.navigate(['/']);
    }
  }

  onLogin() {
    this.isLoading = true;

    if (this.loginForm.invalid) {
      this.isLoading = false;
      return;
    }

    const { email, password } = this.loginForm.value;

    this.authService.login(email, password).subscribe((res) => {
      this.isLoading = false;
      
      if (res.status === 'ok') {
        localStorage.setItem('token', res.result.token);

        delete res.result.token;
        localStorage.setItem('user', res.result);

        this.router.navigate(['home']);
      }
    });
  }
}
