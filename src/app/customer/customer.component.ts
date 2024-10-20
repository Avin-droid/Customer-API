import { Component,OnInit } from '@angular/core';
import { CustomerService } from '../customer.service';
import { Customer } from '../customer';
import { FormGroup,FormBuilder,FormControl,Validators } from '@angular/forms';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit{
  editflag:boolean=false
  custArr:Array<Customer>=[]
  frmReg=new FormGroup({
    customer_FirstName:new FormControl(),
    customer_MiddleName:new FormControl(),
    customer_LastName:new FormControl(),
    customer_Building:new FormControl(),
    customer_Street:new FormControl(),
    customer_city:new FormControl(),
    customer_state:new FormControl(),
    customer_country:new FormControl(),
    customer_email:new FormControl({value:'',disabled:false}),
    customer_ContactNumber_1:new FormControl(),
    customer_ContactNumber_2:new FormControl()
  })

  regObj:Customer=
  {
    id:'',
    customer_FirstName:'',
    customer_MiddleName:'',
    customer_LastName:'',
    customer_Building:'',
    customer_Street:'',
    customer_city:'',
    customer_state:'',
    customer_country:'',
    customer_email:'',
    customer_ContactNumber_1:0,
    customer_ContactNumber_2:0
  }


  constructor(private customerObjService:CustomerService , private fb:FormBuilder){}
  ngOnInit(): void {
    this.frmReg=this.fb.group({
      customer_FirstName:[this.regObj.customer_FirstName,[Validators.pattern('^[a-zA-Z]+'),Validators.required,Validators.maxLength(30)]],
      customer_MiddleName:[this.regObj.customer_MiddleName,[Validators.pattern('^[a-zA-Z]+'),Validators.required,Validators.maxLength(30)]],
      customer_LastName:[this.regObj.customer_LastName,[Validators.pattern('^[a-zA-Z]+'),Validators.required,Validators.maxLength(30)]],
      customer_Building:[this.regObj.customer_Building,[Validators.pattern('^[a-zA-Z0-9]+'),Validators.required]],
      customer_Street:[this.regObj.customer_Street,[Validators.pattern('^[a-zA-Z0-9 ]+'),Validators.required]],
      customer_city:[this.regObj.customer_city,[Validators.pattern('^[a-zA-Z]+'),Validators.required]],
      customer_state:[this.regObj.customer_state,[Validators.pattern('^[a-zA-Z]+'),Validators.required]],
      customer_country:[this.regObj.customer_country,[Validators.pattern('^[a-zA-Z]+'),Validators.required]],
      customer_email:[{value:this.regObj.customer_email,disabled:false},[Validators.pattern('^[a-zA-Z0-9@.com]+'),Validators.required]],
      customer_ContactNumber_1:[this.regObj.customer_ContactNumber_1,[Validators.pattern('^[0-9]+'),Validators.required,Validators.minLength(10),Validators.maxLength(10)]],
      customer_ContactNumber_2:[this.regObj.customer_ContactNumber_2,[Validators.pattern('^[0-9]+'),Validators.required,Validators.minLength(10),Validators.maxLength(10)]],
    })
    this.getAllrecordsfromService()
  }
  getAllrecordsfromService()
  {
    this.customerObjService.getAllCustomer().subscribe((rec)=>{
    this.custArr=rec
    })
  }
  archive()
  {
    let temp:Customer=
    {
      
      customer_FirstName:this.regObj.customer_FirstName,
      customer_MiddleName:this.regObj.customer_MiddleName,
      customer_LastName:this.regObj.customer_LastName,
      customer_Building:this.regObj.customer_Building,
      customer_Street:this.regObj.customer_Street,
      customer_city:this.regObj.customer_city,
      customer_state:this.regObj.customer_state,
      customer_country:this.regObj.customer_country,
      customer_email:this.regObj.customer_email,
      customer_ContactNumber_1:this.regObj.customer_ContactNumber_1,
      customer_ContactNumber_2:this.regObj.customer_ContactNumber_2
    }
    if(this.editflag)
    {
      this.customerObjService.updateCustomer(temp,this.regObj.id).subscribe((rec)=>{
      alert('Customer Record Updated Successfully...')
      this.getAllrecordsfromService()
      })
    }
    else
    {
      this.customerObjService.addCustomer(temp).subscribe((rec)=>{
        console.log(rec)
      alert('Customer Record added Successfully...')
      this.getAllrecordsfromService()
      })
    }

    this.regObj=
    {

      id:'',
      customer_FirstName:'',
      customer_MiddleName:'',
      customer_LastName:'',
      customer_Building:'',
      customer_Street:'',
      customer_city:'',
      customer_state:'',
      customer_country:'',
      customer_email:'',
      customer_ContactNumber_1:0,
      customer_ContactNumber_2:0,
    }
    this.editflag=false
  }

  deleteRecord(id:string)
  {
    this.customerObjService.removeCustomer(id).subscribe((rec)=>{
    alert('Customer Record Deleted Successfully...')
    this.getAllrecordsfromService()
    })
  }

  updateRecord(id:string)
  {
    this.editflag=true
    this.customerObjService.getCustomer(id).subscribe((rec)=>{
    this.regObj=rec
    })
  }

  disable()
  {
    if(this.editflag)
    this.frmReg.controls.customer_email.disable()      
  }

}
