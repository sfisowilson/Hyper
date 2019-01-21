import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MustMatch } from '../../helpers/mustMatch.validator';
import { HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})

export class UserComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  data: any;
  response: any;
  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router) {

  }



  get f() { return this.registerForm.controls; }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      first: ['', [Validators.required]],
      last: ['', [Validators.required]],
      uid: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', [Validators.required, Validators.email]],
      pwd: ['', [Validators.required, Validators.minLength(6),
                Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$')]],
      confirmPassword: ['', Validators.required]
    }, {
      validator: MustMatch('pwd', 'confirmPassword')
    });
  }
  onSubmit(): void {
    this.submitted = true;
    console.log(this.registerForm.value);
    if (this.registerForm.invalid) {
      return;
    }
    this.data = this.registerForm.value;
    this.data.confirmPassword = undefined;
    console.log(this.data);
    this.http.post('http://localhost:5200/test', this.data).subscribe((res) => {
      this.response = res;
      if (this.response.status === 200) {
        console.log(this.response.status);
        this.router.navigate(['dashboard']);
      } else if (this.response.status === 500) {
        console.log(this.response.status);
      }
    });
  }

  googleStrategy(): void {
    alert('google');
  }
  otherStrategy(): void {
    alert('42');
  }


}
// 10.204.0.126:3000/signup/send

// req.check('email', 'Email is Required').exists({checkFalsy: true});
//     req.check('email', 'Email is Invalid').isEmail();
//     req.check('first', 'First Name is Required').exists({checkFalsy: true});
//     req.check('last', 'Last Name is Required').exists({checkFalsy: true});
//     req.check('uid', 'Username is Required').exists({checkFalsy: true});
//     req.check('pwd', 'Password is Required').exists({checkFalsy: true});