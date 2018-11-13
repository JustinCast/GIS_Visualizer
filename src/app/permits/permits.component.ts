import { Component, OnInit } from '@angular/core';
import { Permission } from '../models/permission';
import { Column } from '../models/column';

let someColumns: Column[]=[{columName:'color',select:'true'},{columName:'tipo',select:'false'}];
let someColumns2: Column[]=[{columName:'tamaño',select:'true'}];
const ELEMENT_DATA: Permission[] = [
  {tableName: 'users', columns:someColumns},
  {tableName: 'islas', columns:someColumns2},
];

@Component({
  selector: 'app-permits',
  templateUrl: './permits.component.html',
  styleUrls: ['./permits.component.scss']
})



export class PermitsComponent implements OnInit {

  displayedColumns: string[] = ['name', 'select'];
  dataSource = ELEMENT_DATA;

  users: string[]=['luis','Justin']
  constructor() { }

  ngOnInit() {
  }

}
