import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MyContact } from '../models/myContact';
import { ContactService } from '../services/contact.service';
import { ParamMap } from '@angular/router';
import { map } from 'rxjs';

@Component({
  selector: 'app-view-contact',
  templateUrl: './view-contact.component.html',
  styleUrls: ['./view-contact.component.css']
})
export class ViewContactComponent implements OnInit {
  public contactId:string | null = null;
  public loading:boolean = false;
  public contact:MyContact = {} as MyContact;

  constructor(private activatedRoute:ActivatedRoute,
    private contService:ContactService) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((param)=>{
      this.contactId = param.get('contactId')
      console.log(this.contactId)
    });
    if(this.contactId){
      this.loading = true;
    this.contService.getContacts(this.contactId).subscribe((data:MyContact)=>{
      this.contact = data;
      this.loading = false;
      console.log(data)
    });
    }
  }
  public isNotEmpty(){
    return Object.keys(this.contact).length >0;
  }

}
