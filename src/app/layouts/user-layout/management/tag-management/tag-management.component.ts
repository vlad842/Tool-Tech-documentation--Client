import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { TagsService } from '../../services/tags.service';

@Component({
  selector: 'app-tag-management',
  templateUrl: './tag-management.component.html',
  styleUrls: ['./tag-management.component.scss']
})
export class TagManagementComponent implements OnInit {

  displayedColumns: string[] = ['tag','actions'];
  dataSource = new MatTableDataSource([]);
  all_tags_data = [];
  
  addTagForm :  FormGroup;
  tagNameControle: FormControl;
  tagColor="#000000";
  submitTagError: {exist:boolean,message:string};
  chambers = [];

  constructor(private router:Router, private tagsService:TagsService) { }

  ngOnInit() {
    this.setAddTagForm();
    this.setAllTagsTable();
  }

  private setAllTagsTable(){
    this.tagsService.getTags().subscribe((all_tags)=>{
      console.log(all_tags);
      this.all_tags_data = all_tags;
      this.dataSource = new MatTableDataSource(this.all_tags_data);
    });
  }

  private setAddTagForm(){
    this.submitTagError={exist:false,message:""};
    this.tagNameControle = new FormControl('',[]);
    this.addTagForm = new FormGroup(
      {tagNameControle: this.tagNameControle},
      [Validators.required]
      );

  }

  onSubmitTag(){

    console.log(this.tagColor);
    console.log(this.tagNameControle.value);


    if(this.addTagForm.valid)
    {
      this.tagsService.addNewTag(this.tagNameControle.value,this.tagColor)
      .pipe(first())
      .subscribe(
        data => {
          this.onSuccessfulTagAdd(data);
        },
        error => {
          this.onUnsuccessfulTagAdd(error);
        });;
    }
  }

  private onSuccessfulTagAdd(data){
    this.addTagForm.reset();
    alert("Tag added successfuly");
    this.setAllTagsTable();
  }

  private onUnsuccessfulTagAdd(error){
    this.submitTagError.exist=true;
    this.submitTagError.message=error.error;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onButtonTagDeleteClick(tag_id:string){
    console.log(tag_id);
    this.tagsService.deleteTag(tag_id).subscribe(data =>{
      alert("Tag deleted successfully");
      this.setAllTagsTable();
    },
    error =>{
      alert("cannot delete this Tag");
    });
  }
}
