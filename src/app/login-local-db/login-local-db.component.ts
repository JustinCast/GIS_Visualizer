import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-local-db',
  templateUrl: './login-local-db.component.html',
  styleUrls: ['./login-local-db.component.scss']
})
export class LoginLocalDBComponent implements OnInit {
  localGroup: FormGroup;
  constructor(private _fb: FormBuilder) { 
    this.localGroup = this._fb.group({
      'username': ['', Validators.required],
      'password': ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  onSubmit() {
    
  }
}
