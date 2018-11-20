import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Layer } from '../models/layer';

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
    let layer = new Layer();
    layer.host = "p3bd2.cwvcjn59heq2.us-east-2.rds.amazonaws.com";
    layer.port = 5432;
    layer.dbname = "p3bd2";
    layer.user = "usr_p3bd2";
    layer.password = "usr_p3bd2";
  }
}
