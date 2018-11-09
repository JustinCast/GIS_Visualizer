import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-permits',
  templateUrl: './permits.component.html',
  styleUrls: ['./permits.component.scss']
})
export class PermitsComponent implements OnInit {

  users: string[]=['luis','Justin']
  constructor() { }

  ngOnInit() {
  }

}
