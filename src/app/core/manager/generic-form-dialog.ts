import { Component, inject, signal, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { form, FormField } from '@angular/forms/signals';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

export enum ActionMode {
  CREATE = 'create',
  EDIT = 'edit',
}
export type FormFieldConfig<T> = {
  key: keyof T;
  label: string;
  type: 'text' | 'number' | 'textarea';
  placeholder: string;
};
export type FormDialogData<T> = {
  model: T;
  mode: ActionMode;
  formSchema: any;
  fields: FormFieldConfig<T>[];
};

@Component({
  selector: 'app-generic-form-dialog',
  imports: [FormField, FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, MatDialogModule],

  templateUrl: './generic-form-dialog.html',
  styleUrls: ['./generic-form-dialog.css'],
})
export class GenericFormDialog<T> {

  readonly dialogRef = inject(MatDialogRef<GenericFormDialog<T>>);
  private _snackBar = inject(MatSnackBar);

  public modelSig!: ReturnType<typeof signal<T>>;
  public formInstance: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: FormDialogData<T>) {
    this.modelSig = signal<T>({ ...data.model });
    this.formInstance = form(this.modelSig, data.formSchema);
  }

  public onSubmit(): void {
    if (this.formInstance().valid()) {
      this.dialogRef.close({
        data: this.formInstance().value()
      });
    } else {
      this._snackBar.open(`Form is invalid!`, 'Close', {
        duration: 3000,
      });
    }
  }

  public closeForm(): void {
    this.dialogRef.close({ data: null });
  }
}
