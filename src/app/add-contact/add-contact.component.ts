import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MyContact } from '../models/myContact';
import { ContactService } from '../services/contact.service';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.css']
})
export class AddContactComponent implements OnInit {
  public loading:boolean = false;
  public contactId:string | null = null;
  // public isupdate:boolean = false;
  // public contact:MyContact = {} as MyContact; 
  @Input() isupdate:boolean = false;
  @Input() contact:MyContact = {} as MyContact;
  @Output() contactChange =new EventEmitter<MyContact>();
  @Output() contactAdd =new EventEmitter<MyContact>();
  // @Output() newItemEvent = new EventEmitter<string>();
  public editMode:boolean = false;
  

  @Input() contactForm = this.fb.group({
  name:  ['',[Validators.required,Validators.minLength(3)]],
  email: ['',[Validators.required,Validators.email,Validators.minLength(10)]],
  mobile: ['',[Validators.required,Validators.minLength(11)]],
  company: [''],
  title: [''],
  photo: ['']
  })

  
  
  // status = new FormControl('')
  // name = new FormControl('', [Validators.required,Validators.minLength(3)])
  // email = new FormControl('', [Validators.required,Validators.email,Validators.minLength(10)])
  // mobile = new FormControl('', [Validators.required,Validators.minLength(11)])
  // company = new FormControl()
  // title = new FormControl()
  // photo = new FormControl()

  // contactForm = new FormGroup({
  // name: new FormControl('', [Validators.required,Validators.minLength(3)]),
  // email: new FormControl('', [Validators.required,Validators.email,Validators.minLength(10)]),
  // mobile: new FormControl('', [Validators.required,Validators.minLength(11)]),
  // company: new FormControl(),
  // title: new FormControl(),
  // photo: new FormControl()
  // })
  
  

  constructor(private contService:ContactService, private router:Router, private activatedRoute:ActivatedRoute, private fb: FormBuilder) { }

  ngOnInit(): void {

    

  }
  test() {
    console.log(this.contactForm)
    console.log(this.contact)
  }

  // onSubmit(contactForm: { value: any; }) {
  //   if(!this.editMode)
  //   this.contService.CreateContacts(this.contact).subscribe((data:MyContact)=>{
  //     this.router.navigate(['/']).then(()=>{
  //       window.location.reload();
  //       console.log(this.contact);
  //     });       
  //   })
  //   else
  //   if(this.contactId){
  //     this.contService.updateContacts(this.contact, this.contactId).subscribe((data:MyContact)=>{
  //       this.router.navigate(['/']).then(()=>{
  //         window.location.reload();
  //         console.log(this.contact);
  //       });     
  //     })
  //   }
  // }

  // addNewItem(value: string) {
  //   this.newItemEvent.emit(value);
  // }


  // update(value:MyContact){
  //   this.contactChange.emit(value);
  //   // console.log(this.editMode);
  // }
  
  update() { 
    let contact: MyContact = {
      id: this.contact.id,
    name: this.contact.name,
    email: this.contact.email,
    photo: this.contact.photo,
    mobile: this.contact.mobile,
    company: this.contact.company,
    title: this.contact.title
    }
    this.contService.updateContacts(contact, this.contact.id).subscribe((data:MyContact)=>{
      window.location.reload();       
    })
    this.contactChange.emit(contact);
  }
  // update() { 
  //   let contact: MyContact = {
  //     id: this.contact.id,
  //   name: this.contact.name,
  //   email: this.contact.email,
  //   photo: this.contact.photo,
  //   mobile: this.contact.mobile,
  //   company: this.contact.company,
  //   title: this.contact.title
  //   }
  //   this.contService.updateContacts(contact, this.contact.id).subscribe((data:MyContact)=>{
  //     window.location.reload();       
  //   })
  //   this.contactChange.emit(contact);
  // }

  addContact() {
  console.log(this.contactForm.value)
  this.contService.CreateContacts(this.contactForm.value).subscribe((data:MyContact)=>{
        window.location.reload();       
      })  
}


//   addContact() {
//     let contact: MyContact = {
//       id: this.contact.id,
//     name: this.contact.name,
//     email: this.contact.email,
//     photo: this.contact.photo,
//     mobile: this.contact.mobile,
//     company: this.contact.company,
//     title: this.contact.title
//     }
//   this.contService.CreateContacts(contact).subscribe((data:MyContact)=>{
//     window.location.reload();       
//   })

// }
//   addContact() {
//   this.contService.CreateContacts(this.contact).subscribe((data:MyContact)=>{
//     this.router.navigate(['/']).then(()=>{
//       window.location.reload();
//       console.log(this.contact);
//     });       
//   })
// }
  
  // onUpdate(contactForm: { value: any; }) {
  //   if(this.contactId){
  //     this.contService.updateContacts(this.contact, this.contactId).subscribe((data:MyContact)=>{
  //       this.router.navigate(['/']).then(()=>{
  //         window.location.reload();
  //       });     
  //     })
  //   }
  // }


    
  // update(){
  //   this.activatedRoute.paramMap.subscribe((param)=>{
  //     this.contactId = param.get('contactId')
  //   });
  //   this.contService.updateContacts(this.contact, this.contactId).subscribe((data:MyContact)=>{
  //     this.router.navigate(['/']).then(()=>{
  //       window.location.reload();
  //     });     
  //   })
  // }
  
 
}
