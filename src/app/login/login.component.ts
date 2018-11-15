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
      'host': ['p3bd2.cwvcjn59heq2.us-east-2.rds.amazonaws.com', Validators.required],
      'port': [5432, Validators.required],
      'dbname': ['p3bd2', Validators.required],
      'user': ['usr_p3bd2', Validators.required],
      'password': ['usr_p3bd2', Validators.required],
      'schema': ['public', Validators.required],
      'tablename': ['', Validators.required]
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
    let layer = new Layer();
    layer.host = this.layerGroup.get('host').value;
    layer.port = this.layerGroup.get('port').value;
    layer.dbname = this.layerGroup.get('dbname').value;
    layer.user = this.layerGroup.get('user').value;
    layer.password = this.layerGroup.get('password').value;
    layer.geotabla = this.layerGroup.get('tablename').value;
    layer.schema = this.layerGroup.get('schema').value;

    layer.color= this.color;
    layer.transparencia = this.value/10;
    layer.figuras= new Object();
    this.db.loading = true;
    console.log(this.layerGroup.value);
    this.db.updateShapes(layer);
  }

}
