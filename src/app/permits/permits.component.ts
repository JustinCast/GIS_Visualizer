import { Component, OnInit } from '@angular/core';
import { adminManagerService } from '../services/admin-manager.service';
import { Permission } from '../models/permission';

@Component({
  selector: 'app-permits',
  templateUrl: './permits.component.html',
  styleUrls: ['./permits.component.scss']
})



export class PermitsComponent implements OnInit {
  constructor(private _admin_manager: adminManagerService) { }

  ngOnInit() {
    this._admin_manager.getUsers();
    this._admin_manager.getAllTables();
  }

  grantPermission(tableName: string,user:string){
    var permission= new Permission(tableName,user);
    console.log(permission.table);
    this._admin_manager.postPermissionsTables(permission);
  
  }
}
