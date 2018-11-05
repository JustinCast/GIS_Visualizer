import { Component, OnInit } from "@angular/core";
import { WorkSpace } from "../models/workspace";
import { DatabaseManagementService } from "../services/database-management.service";
import { Conn } from "../models/conn";
import { FormGroup, FormBuilder } from "@angular/forms";

@Component({
  selector: "app-map",
  templateUrl: "./map.component.html",
  styleUrls: ["./map.component.scss"]
})
export class MapComponent implements OnInit {
  ws = new WorkSpace();
  widthSVG = 0;
  heightSVG = 0;
  layerGroup: FormGroup;
  constructor(private db: DatabaseManagementService) {
  }

  ngOnInit() {
  }
}
