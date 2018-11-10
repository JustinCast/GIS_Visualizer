import { Component, OnInit } from "@angular/core";
import { DatabaseManagementService } from "../services/database-management.service";
import { Layer } from "../models/conn";

@Component({
  selector: "app-map",
  templateUrl: "./map.component.html",
  styleUrls: ["./map.component.scss"]
})
export class MapComponent implements OnInit {

  constructor(private db: DatabaseManagementService) {
  }

  ngOnInit() {
    this.db.updateShapes(new Layer());
  }
}
