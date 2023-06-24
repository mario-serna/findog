import { Component, EventEmitter, Inject, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { NgFor, NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';

export interface DialogData {
  animal: string;
  name: string;
}
@Component({
  selector: 'nid-report-dialog',
  templateUrl: './report-dialog.component.html',
  styleUrls: ['./report-dialog.component.scss'],
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    NgIf,
    MatDialogModule,
    MatSelectModule
  ],
})

export class ReportDialogComponent implements OnChanges {
  @Input() open = false;
  @Output() openChange = new EventEmitter<boolean>();
  animal = '';
  name = '';

  constructor(public dialog: MatDialog) { }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      data: { name: this.name, animal: this.animal },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.openChange.emit(false);
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes)
    if (changes['open'].currentValue) {
      this.openDialog();
    }
  }
}

interface Sizes {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html',
  standalone: true,
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatSelectModule,
    NgFor,
    NgIf],
})
export class DialogOverviewExampleDialog {
  sizes: Sizes[] = [
    { value: 'small', viewValue: 'Pequeño' },
    { value: 'medium', viewValue: 'Mediano' },
    { value: 'big', viewValue: 'Grande' },
  ];

  image = '';

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}