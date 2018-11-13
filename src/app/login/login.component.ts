import { Component, OnInit } from '@angular/core';
import {coerceNumberProperty} from '@angular/cdk/coercion';
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
  showTicks = true;
  autoTicks = true;
  thumbLabel = true;
  value = 0;
  constructor(private db: DatabaseManagementService, private _fb: FormBuilder) { 
    this.layerGroup = this._fb.group({
      'host': ['', Validators.required],
      'port': ['', Validators.required],
      'dbname': ['', Validators.required],
      'user': ['', Validators.required],
      'password': ['', Validators.required],
      'schema': ['', Validators.required],
      'tablename': ['', Validators.required],
      'tablename': ['', Validators.required],
    })
  }

  ngOnInit() {
    
  }

  addLayer() {
    
  }
  get tickInterval(): number | 'auto' {
    return this.showTicks ? (this.autoTicks ? 'auto' : this._tickInterval) : 0;
  }
  set tickInterval(value) {
    this._tickInterval = coerceNumberProperty(value);
  }
  private _tickInterval = 1;

  onSubmit() {
    console.log(this.color);
    let conn = new Layer();
    conn.host = this.layerGroup.get('host').value;
    conn.port = this.layerGroup.get('port').value;
    conn.dbname = this.layerGroup.get('dbname').value;
    conn.user = this.layerGroup.get('user').value;
    conn.password = this.layerGroup.get('password').value;
    conn.geotabla = this.layerGroup.get('tablename').value;
    conn.schema = this.layerGroup.get('schema').value;
    let body = {
      schema: 'public',
      geotabla: conn.geotabla
    }
    console.log(body);
    let layer = new Layer();
    layer.color= this.color;
    layer.transparencia = this.value;
    layer.figuras= new Object();
    this.db.updateShapes(layer, body);
  }

}
