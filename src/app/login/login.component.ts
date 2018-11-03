import { Component, OnInit } from '@angular/core';
import { DatabaseManagementService } from '../services/database-management.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private db: DatabaseManagementService) { }

  ngOnInit() {
  }

  addLayer() {
    
  }

}
