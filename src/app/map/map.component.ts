import { Component, OnInit } from "@angular/core";
import { DatabaseManagementService } from "../services/database-management.service";

@Component({
  selector: "app-map",
  templateUrl: "./map.component.html",
  styleUrls: ["./map.component.scss"]
})
export class MapComponent implements OnInit {

  constructor(private db: DatabaseManagementService) {
  }

  ngOnInit() {
  }
}
