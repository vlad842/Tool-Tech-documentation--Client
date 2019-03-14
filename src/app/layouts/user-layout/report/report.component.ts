import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ToolsService } from '../services/tools.service';
import { RecordesService } from '../services/records.service';
import { first, startWith, map } from 'rxjs/operators';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatChipInputEvent, MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { Observable } from 'rxjs';
import { TagsService } from '../services/tags.service';

export interface Tag {
  name: string;
  color: string;
  _id: string;
}


@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {
  reportForm :  FormGroup;
  reportTextArea:FormControl;
  selectedStatus:string = "In progress";
  tools = [];
  chambers = [];
  selectedTool;
  selectedChamber;

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  tagsFormControl = new FormControl();
  filteredTags: Observable<Tag[]>;
  selectedTags: Tag[] = [];
  allTags: Tag[] = [];

  @ViewChild('tagInput') tagInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  onSelectedStatusChanged(status){
    this.selectedStatus = status;
  }
  
  
  constructor(private recordesService:RecordesService,
              private toolsService:ToolsService,
              private tagsService:TagsService) {
                
               }

  ngOnInit() {

    this.reportTextArea = new FormControl('',[]);
    this.reportForm = new FormGroup({
      reportTextArea: this.reportTextArea
    },[Validators.required])


    this.toolsService.getAllTools()
    .pipe(first())
    .subscribe(
      data => {
        this.tools=data;
        if(this.tools.length)
        {
          this.selectedTool = this.tools[0].serialNumber;
          this.chambers = this.tools[0].chambers;
          this.selectedChamber =this.chambers[0].serialNumber;
        }
      },
      error => {
      });

      this.tagsService.getTags()
      .pipe(first())
      .subscribe(
        data => {
          console.log(data);
          this.allTags = data;

          this.filteredTags = this.tagsFormControl.valueChanges.pipe(
            startWith(null),
            map((tag: Tag | null) => tag ? this._filter(tag) : this.allTags.slice()));
        },
        error => {
        });
  }

  toolChanged(event)
  {
    let tool = this.tools.find((elem) => elem.serialNumber === event.value);
    this.chambers = tool.chambers;
    this.selectedChamber = this.chambers[0].serialNumber;

  }

  onSubmitReport(){
    const tool_id = (this.tools.find((elem) => elem.serialNumber === this.selectedTool))._id;
    const tags = this.selectedTags.map((tag)=> tag._id);
    this.recordesService.addRecord(tool_id,this.selectedChamber,this.reportTextArea.value,tags,this.selectedStatus)
    .pipe(first())
      .subscribe(
        data => {
          alert("Report added successfuly");
          this.reportForm.reset();

        },
        error => {
          //TODO: ui support for the error.
          console.log("ERROR",error);
        });
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
    console.log("selected",event.option.value);
    this.selectedTags.push(event.option.value);
    this.tagInput.nativeElement.value = '';
    this.tagsFormControl.setValue(null);
  }

  private _filter(value): Tag[] {
    console.log("_filter",value);
    let filterValue;
    if((typeof value === 'object'))
      filterValue = value.name.toLowerCase();
    else
      filterValue = value.toLowerCase();


    return this.allTags.filter(tag => tag.name.toLowerCase().indexOf(filterValue) === 0);
  }
}
