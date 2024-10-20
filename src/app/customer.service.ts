import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Customer } from './customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private httpClientObj:HttpClient) {}
  getAllCustomer():Observable<Customer[]>
  {
    
    return this.httpClientObj.get<Customer[]>('http://localhost:3000/customer')
  }

  addCustomer(obj:Customer)
  {

    return this.httpClientObj.post('http://localhost:3000/customer',obj)
  }

  removeCustomer(id:string)
  {
    return this.httpClientObj.delete('http://localhost:3000/customer/'+id)
  }

  getCustomer(id:string):Observable<Customer>
  {
    return this.httpClientObj.get<Customer>('http://localhost:3000/customer/'+id)
  }

  updateCustomer(obj:Customer,id:string)
  {
    return this.httpClientObj.put('http://localhost:3000/customer/'+id,obj)
  }
}
