import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {numberPattern} from "../../config/custom-validators";

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
  host: {'class': 'max-size flex-center direction-column'}
})
export class DialogComponent implements OnInit {
  public dialogForm: FormGroup = new FormGroup({
    dialogField: new FormControl(0, [
      Validators.required,
      Validators.pattern(numberPattern)
    ])
  });
  public multipleDescriptions: string[] = [];

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    private _toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    this.dialogForm.get('dialogField')?.setValue(data.startValue);
  }

  ngOnInit(): void {
     if(this.data.dialogType === 'info' || this.data.dialogType === 'receipt') {
       this.multipleDescriptions = this.data.description.split('\n');
     }
  }

  submit(): void {
    if(this.dialogForm.invalid && this.data.dialogType !== 'info') {
      this._toastr.error('El campo no puede estar vacío');
      return;
    }
    this.dialogRef.close(this.dialogForm.get('dialogField')?.value);
  }

  close(): void {
    this.dialogRef.close();
  }
}

export interface DialogData {
  dialogType: string;
  title: string;
  description: string;
  placeholder: string;
  startValue: number;
}
