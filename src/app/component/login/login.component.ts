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
      username: [
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

    // todo: remove navigate to home here and replace with call api login
    this.router.navigate(['home']);

    // todo: replace this code with navigation home above
    // const { username, password } = this.loginForm.value;

    // this.authService.login(username, password).subscribe((res) => {
    //   this.isLoading = false;

    //   if (res.token) {
    //     localStorage.setItem('token', res.token);
    //     this.router.navigate(['home']);
    //   }
    // });
  }
}
