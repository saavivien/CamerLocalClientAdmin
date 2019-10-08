import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from '../../../services/auth.service';

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  private authForm: FormGroup;
  private email: string;
  private password: string;

  constructor(private authServ: AuthenticationService) {
  }

  ngOnInit() {
    this.authForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required,
      Validators.pattern(/^([a-zA-Z]+)(?=\D*\d*)[A-Za-z\d\s!$%@#£€*?&-éçèùê]{2,}$/)]),
    });
  }
  authentication() {
    this.email = this.authForm.get('email').value;
    console.log('logging with email :', this.email);
    this.password = this.authForm.get('password').value;
    console.log('logging with password :', this.password);
    this.authServ.authenticate(this.email, this.password).subscribe(data => {
      if (data) {
        console.log('successful authentication', data.token);
      } else
        console.log('authentication failed');
    })
  }
}
