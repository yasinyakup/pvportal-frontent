import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  public loginInvalid = false;
  private formSubmitAttempt = false;
  private returnUrl: string;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private tokenService: TokenService
  ) {
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/login';

    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }


  async ngOnInit(): Promise<void> {
    if (await this.authService.checkAuthenticated()) {
      await this.router.navigate([this.returnUrl]);
    }
  }

  navigateToPage(page: String) {
    this.router.navigate([page]);
  }

  async onSubmit(): Promise<void> {
    this.loginInvalid = false;
    this.formSubmitAttempt = false;
    let router = this.router
    if (this.loginForm.valid) {
      try {
        const username = this.loginForm.get('username')?.value;
        const password = this.loginForm.get('password')?.value;
        await this.authService.login(username, password).subscribe({
          next(data) {
            console.log('Current : ', data);
            localStorage.setItem('token', data.token);
            console.log(data.status);
            router.navigate(['/main']);
          },
          error(msg) {
            console.log('Error: ', msg);
          }
        });
      } catch (err) {
        this.loginInvalid = true;
      }
    } else {
      this.formSubmitAttempt = true;
    }
  }

}
