import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  MatButtonModule,
  MatIconModule,
  MatInputModule,
  MatDialogModule,
  MatRadioModule,
  MatSliderModule
} from "@angular/material";
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatDialogModule,
    MatRadioModule,
    MatSliderModule,
  ],
  exports: [
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatDialogModule,
    MatRadioModule,
    MatSliderModule
  ]
})
export class MaterialModule {}
