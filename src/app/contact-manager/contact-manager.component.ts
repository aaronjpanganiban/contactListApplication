import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ControlContainer, FormGroupDirective } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MyContact } from '../models/myContact';
import { ContactService } from '../services/contact.service';

@Component({
  selector: 'app-contact-manager',
  templateUrl: './contact-manager.component.html',
  styleUrls: ['./contact-manager.component.css'],
  viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }]
})
export class ContactManagerComponent implements OnInit {
  public loading:boolean = false;
  public contacts:MyContact[] = [
    // {id: "1", name: 'Rahuld Dravid', email: '', mobile: '32131', photo: '', company: '', title: ''},
    // {id: "2", name: 'Sachin Tendulkar', email: '', mobile: '123123', photo: '', company: '', title: ''},
    // {id: "3", name: 'Saurrav Ganguly', email: '', mobile: '12312', photo: '', company: '', title: ''},
    // {id: "4", name: 'Mahendra Singh Dhoni', email: '', mobile: '312312', photo: '', company: '', title: ''},
    // {id: "5", name: 'Virat Kohli', email: '', mobile: '123123', photo: '', company: '', title: ''}
  ];
  public isItUpdate:boolean = false;
  public contactId:string | null = null;
  public contact : MyContact = {} as MyContact;
  public baseUrl:string;
  // selectedContact:MyContact = new MyContact();
  selectedContact:any = new MyContact();
  chosenContact:MyContact = new MyContact();

  constructor(private contService:ContactService, private router:Router, private activatedRoute:ActivatedRoute, private http:HttpClient) { 
    this.baseUrl = 'http://localhost:4000';
  }

  ngOnInit(): void {
    this.getAllContactData();  
  }

  test() {
    console.log(this.contacts.map((obj)=>obj.id))
    console.log(this.contact)
    console.log(this.contacts)
  }
  
  // onSubmit() {
  //   if(this.contactId){
  //     this.contService.updateContacts(this.contact, this.contactId).subscribe((data:MyContact)=>{
  //       this.router.navigate(['/']).then(()=>{
  //         window.location.reload();
  //       });     
  //     })
  //   }
  // }

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

//  showDetails(contactId:string | undefined) {
//   this.visible = true;
//   this.isItUpdate = true;
//   if(contactId){
//   let currentContact = this.contacts.map((p)=>p.id === contactId)
//   console.log(currentContact);
//   }
// }
 showDetails(contact:MyContact) {
  this.visible = true;
  this.isItUpdate = true;
  console.log(contact);
  this.selectedContact=Object.assign({},contact)
  console.log(this.selectedContact);
  // this.selectedContact=this.contact;
  //   console.log(this.selectedContact)
}



update(contact: MyContact) {  
this.contacts = this.contacts.map(cont => {
  if(contact.id === cont.id) {
    return contact;
  }
  return cont;
})


// this.activatedRoute.paramMap.subscribe((param)=>{
//   this.contactId = param.get('contactId')
// });
// if(this.contactId){
// this.contService.updateContacts(this.contact, this.contactId).subscribe((data:MyContact)=>{
//   this.router.navigate(['/']).then(()=>{
//     window.location.reload();
//   });     
// })}

  // this.contacts.push(contact);
  // console.log(contact)
  // var cont=this.contacts.find(e => e.id==contact.id)
  // Object.assign({},cont,contact)
  
  // alert("Customer Saved")

}

addContact(contact: MyContact) {  

}
// addContact(contact: MyContact) {  
//   this.contacts = this.contacts.map(cont => {
//     if(contact.id === cont.id) {
//       return contact;
//     }
//     return cont;
//   })
// }

}
