import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { MyContact } from '../models/myContact';
import { ContactService } from '../services/contact.service';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.css']
})
export class AddContactComponent implements OnInit {
  public loading:boolean = false;
  public contact:MyContact = {} as MyContact; 
  // @Input() mycontact:MyContact = new MyContact();
  

  constructor(private contService:ContactService, private router:Router) { }

  ngOnInit(): void {}
   
  onSubmit(contactForm: { value: any; }) {
    this.contService.CreateContacts(this.contact).subscribe((data:MyContact)=>{
      this.router.navigate(['/']).then(()=>{
        window.location.reload();
      });       
    })
  }
 
}
