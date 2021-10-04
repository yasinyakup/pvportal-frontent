import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  fieldRequired: string = "Zorunlu alan"
   constructor(private auth: AuthService) { }
 
   ngOnInit() {
     this.createForm();
   }
   createForm(){
       let emailregex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
     this.registerForm = new FormGroup(
       {'username': new FormControl(null,[Validators.required]),
       'firstname':new FormControl(null,[]),
       'lastname':new FormControl(null,[]),
       'empcode': new FormControl(null,[Validators.required]),
       'email': new FormControl(null,[Validators.required, Validators.pattern(emailregex)]),
       'password': new FormControl(null, [Validators.required, this.checkPassword]),
      }
     )
   
 
   }
     emailErrors() {
     return this.registerForm.get('email').hasError('required') ? 'Zorunlu alan' :
       this.registerForm.get('email').hasError('pattern') ? 'Geçerli mail adresi giriniz' :''
   }
 checkPassword(control) {
     let enteredPassword = control.value
     let passwordCheck = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})/;
     return (!passwordCheck.test(enteredPassword) && enteredPassword) ? { 'requirements': true } : null;
   }
   getErrorPassword() {
     return this.registerForm.get('password').hasError('required') ? 'Zorunlu alan (En az 8 karakterden, büyük, küçük ve sayı içeren şifre oluşturunuz)' :
       this.registerForm.get('password').hasError('requirements') ? 'En az 8 karakterden, büyük, küçük ve sayı içeren şifre oluşturunuz' : '';
   }
   checkValidation(input: string){
     const validation = this.registerForm.get(input).invalid && (this.registerForm.get(input).dirty || this.registerForm.get(input).touched)
     return validation;
   }
    onSubmit(formData: FormGroup, formDirective: FormGroupDirective): void {
     const firstname=formData.value.firstname;
     const lastname = formData.value.lastname;
     const email = formData.value.email;
     const password = formData.value.password;
     const username = formData.value.username;
     const empcode = formData.value.empcode;
     this.auth.register(username, email, firstname, lastname, password, empcode).subscribe({
      next(data) {
        console.log('Current : ', data);
      },
      error(msg) {
        console.log('Error: ', msg);
      }
    });
      formDirective.resetForm();

    // console.log(formData.value);
 }

}
