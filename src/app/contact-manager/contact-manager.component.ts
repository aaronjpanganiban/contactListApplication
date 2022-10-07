import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MyContact } from '../models/myContact';
import { ContactService } from '../services/contact.service';

@Component({
  selector: 'app-contact-manager',
  templateUrl: './contact-manager.component.html',
  styleUrls: ['./contact-manager.component.css']
})
export class ContactManagerComponent implements OnInit {
  public loading:boolean = false;
  public contacts:MyContact[] = [];

  constructor(private contService:ContactService) { }

  ngOnInit(): void {
    this.getAllContactData(); 
  }

  getAllContactData(){
    this.loading = true;
    this.contService.getAllContacts().subscribe((data:MyContact[])=>{
      this.contacts = data;
      this.loading = false;
    })
  }
  deleteContact(contactId:string | undefined){
    if(contactId){
      this.contService.deleteContacts(contactId).subscribe((data:{})=>{
        this.getAllContactData();        
      });
    }
  }

  buttonTitle:string = "Hide";
 visible:boolean = false;
 showhideUtility(){
   this.visible = this.visible?false:true;
   this.buttonTitle = this.visible?"Hide":"Show";
 }
}
