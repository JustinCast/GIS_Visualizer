import { Component, OnInit } from '@angular/core';
import { adminManagerService } from '../services/admin-manager.service';

@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.scss']
})
export class StatisticComponent implements OnInit {

  constructor(private _admin_manager: adminManagerService) { }
  tableN:String;
  ngOnInit() {
    this._admin_manager.getAllTables();
    this._admin_manager.getUserTableSize("islas");
  //  this.loadTableSize();
  }

  getTableSize(tableName:string){
    this.tableN="  "+tableName;
    console.log(tableName);
    this._admin_manager.getTableSize(tableName);
  }

}
