import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
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
  @Input() isupdate:boolean = false;
  @Input() contact = {} as MyContact;
  @Output() contactChange =new EventEmitter<MyContact>();
  @Output() contactAdd =new EventEmitter<MyContact>();
  

  @Input() contactForm = this.fb.group({
  id:  [''],
  name:  ['',[Validators.required,Validators.minLength(3)]],
  email: ['',[Validators.required,Validators.email,Validators.minLength(10)]],
  mobile: ['',[Validators.required,Validators.minLength(11)]],
  company: [''],
  title: [''],
  photo: ['']
  })
 

  constructor(private contService:ContactService, private fb: FormBuilder) { }

  ngOnInit(): void {}

  ngOnChanges(): void {
    if(this.isupdate === true){
      this.contactForm.patchValue({
        id:this.contact.id,
        name:this.contact.name,
        email:this.contact.email,
        mobile:this.contact.mobile,
        company:this.contact.company,
        title:this.contact.title,
        photo:this.contact.photo
      })
    }
  }

  resetForm() {
    this.isupdate = false;
    this.contactForm.reset();
  }

  test() {
    console.log(this.contactForm)
    console.log(this.contact)
    this.contactForm.patchValue({
      id:this.contact.id,
      name:this.contact.name,
      email:this.contact.email,
      mobile:this.contact.mobile,
      company:this.contact.company,
      title:this.contact.title,
      photo:this.contact.photo
    })
  }

  update() { 
    let contact: MyContact = {
      id: this.contactForm.value.id,
    name: this.contactForm.value.name,
    email: this.contactForm.value.email,
    photo: this.contactForm.value.photo,
    mobile: this.contactForm.value.mobile,
    company: this.contactForm.value.company,
    title: this.contactForm.value.title
    }
    this.contService.updateContacts(contact, this.contact.id).subscribe((data:MyContact)=>{   
    })
    this.contactChange.emit(contact);
  }

  addContact() {
  console.log(this.contactForm.value)
  this.contService.CreateContacts(this.contactForm.value).subscribe((data:MyContact)=>{     
      }) 
      this.contactAdd.emit(this.contact) 
}

}
