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
  MatExpansionModule,
  MatProgressBarModule
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
    MatExpansionModule,
    MatProgressBarModule
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
    MatExpansionModule,
    MatProgressBarModule
  ]
})
export class MaterialModule {}
