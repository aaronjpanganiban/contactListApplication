import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import { MyContact } from '../models/myContact';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  
  public baseUrl:string;

  constructor(private http:HttpClient) {
    this.baseUrl = 'http://localhost:4000';
  }
 //Get All Contacts Data
  public getAllContacts() :Observable<MyContact[]>{
    let dataUrl:string = `${this.baseUrl}/contacts`;
    return this.http.get<MyContact[]>(dataUrl)
  }
  //get Single Contacts
  public getContacts(contactId:string|null):Observable<MyContact>{
    let dataUrl:string= `${this.baseUrl}/contacts/${contactId}`;
    return this.http.get<MyContact>(dataUrl);    
  }

  //Create Contacts
  public CreateContacts(contact:string|null|object):Observable<MyContact>{
    let dataUrl:string = `${this.baseUrl}/contacts`;
    return this.http.post<MyContact>(dataUrl, contact)
  }

  //Update Contacts
  public updateContacts(contact:MyContact, contactId:any):Observable<MyContact>{
    let dataUrl:string = `${this.baseUrl}/contacts/${contactId}`;
    return this.http.put<MyContact>(dataUrl,contact)
  }

  //Delete Contacts
  public deleteContacts(contactId:string):Observable<MyContact>{
    let dataUrl:string = `${this.baseUrl}/contacts/${contactId}`;
    return this.http.delete<MyContact>(dataUrl)
  }

  

  
}


