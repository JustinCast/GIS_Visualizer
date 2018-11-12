import { Component, OnInit } from '@angular/core';
import { DatabaseManagementService } from '../services/database-management.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Layer } from '../models/conn';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  layerGroup: FormGroup; 
  color: '#2883e9';
  constructor(private db: DatabaseManagementService, private _fb: FormBuilder) { 
    this.layerGroup = this._fb.group({
      'host': ['', Validators.required],
      'port': ['', Validators.required],
      'dbname': ['', Validators.required],
      'user': ['', Validators.required],
      'password': ['', Validators.required],
      'schema': ['', Validators.required],
      'tablename': ['', Validators.required]
    })
  }

  ngOnInit() {
    
  }

  addLayer() {
    
  }

  onSubmit() {
    console.log(this.color)
    let conn = new Layer();
    conn.host = this.layerGroup.get('host').value;
    conn.port = this.layerGroup.get('port').value;
    conn.dbname = this.layerGroup.get('dbname').value;
    conn.user = this.layerGroup.get('user').value;
    conn.password = this.layerGroup.get('password').value;
    conn.geotabla = this.layerGroup.get('tablename').value;
    conn.schema = this.layerGroup.get('schema').value;
    let body = {
      schema: "public",
      geotabla: "edificios"
    }
    this.db.updateShapes(conn, body);
  }

}
