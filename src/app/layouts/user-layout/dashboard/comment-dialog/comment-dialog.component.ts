import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatChipInputEvent, MatAutocompleteSelectedEvent, MatAutocomplete } from '@angular/material';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { COMMA, ENTER } from '@angular/cdk/keycodes';

export interface Tag {
  name: string;
  color: string;
  _id: string;
}

@Component({
  selector: 'app-comment-dialog',
  templateUrl: './comment-dialog.component.html',
  styleUrls: ['./comment-dialog.component.scss']
})
export class CommentDialogComponent implements OnInit {

  form: FormGroup;
  description:string;

  tagsFormControl = new FormControl();
  filteredTags: Observable<Tag[]>;
  selectedTags: Tag[] = [];
  allTags: Tag[] = [];
  record_id;
  commentTextArea:FormControl;
  addOnBlur = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  @ViewChild('tagInput') tagInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;
  
  constructor(
      private fb: FormBuilder,
      private dialogRef: MatDialogRef<CommentDialogComponent>,
      @Inject(MAT_DIALOG_DATA) data) {
      
        this.allTags = data.tags;
        this.record_id = data.record_id;

        this.filteredTags = this.tagsFormControl.valueChanges.pipe(
          startWith(null),
          map((tag: Tag | null) => tag ? this._filter(tag) : this.allTags.slice()));
  }

  ngOnInit() {

      this.commentTextArea = new FormControl('',[]);
      this.form = new FormGroup({
        commentTextArea: this.commentTextArea
      },[Validators.required])
  }

  save() {
    this.dialogRef.close({tags:this.selectedTags.map((tag)=> tag._id), content:this.form.value.commentTextArea,record_id:this.record_id});
  }

  close() {
      this.dialogRef.close();
  }

  add(event: MatChipInputEvent): void {
    // Add fruit only when MatAutocomplete is not open
    // To make sure this does not conflict with OptionSelected Event
    console.log("add",event);
    if (!this.matAutocomplete.isOpen) {
      const input = event.input;
      const value = event.value;

      // Add our fruit
      if ((value || '').trim()) {
        this.selectedTags.push(undefined);
      }

      // Reset the input value
      if (input) {
        input.value = '';
      }

      this.tagsFormControl.setValue(null);
    }
  }

  remove(tag: Tag): void {
    console.log("remove",tag);
    const index = this.selectedTags.map((selectedTag)=> selectedTag._id).indexOf(tag._id);

    if (index >= 0) {
      this.selectedTags.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.selectedTags.push(event.option.value);
    this.tagInput.nativeElement.value = '';
    this.tagsFormControl.setValue(null);
  }

  private _filter(value): Tag[] {
    let filterValue;
    if((typeof value === 'object'))
      filterValue = value.name.toLowerCase();
    else
      filterValue = value.toLowerCase();


    return this.allTags.filter(tag => tag.name.toLowerCase().indexOf(filterValue) === 0);
  }
}
