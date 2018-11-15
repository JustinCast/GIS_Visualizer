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
  MatProgressBarModule,
  MatDatepickerModule,
  MatNativeDateModule
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
    MatProgressBarModule,
    MatDatepickerModule,
    MatNativeDateModule
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
    MatProgressBarModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [
    MatNativeDateModule
  ]
})
export class MaterialModule {}
