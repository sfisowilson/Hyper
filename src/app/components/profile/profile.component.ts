import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  changeInfo: FormGroup;
  submitted = false;
  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router) { }

get f() { return this.changeInfo.controls; }

  ngOnInit() {
    this.changeInfo = this.formBuilder.group({
      first: [''],
      last: [''],
      uid: ['', [Validators.minLength(6)]],
      email: ['', [Validators.email]],
      pwd: ['', [Validators.minLength(6),
                Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$')]]
    });
  }


onSubmit(): void {
  console.log(this.submitted);
  this.submitted = true;
  if (this.changeInfo.invalid) {
    return;
  }
  alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.changeInfo.value));
}

}
