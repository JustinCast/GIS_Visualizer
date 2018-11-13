import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  MatButtonModule,
  MatIconModule,
  MatInputModule,
  MatDialogModule,
  MatRadioModule,
  MatSliderModule,
  MatTabsModule,
  MatSelectModule,
  MatCheckboxModule,
  MatListModule,
  MatExpansionModule
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
    MatTabsModule,
    MatSelectModule,
    MatCheckboxModule,
    MatListModule,
    MatExpansionModule
  ],
  exports: [
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatDialogModule,
    MatRadioModule,
    MatSliderModule,
    MatTabsModule,
    MatSelectModule,
    MatCheckboxModule,
    MatListModule,
    MatExpansionModule
  ]
})
export class MaterialModule {}
