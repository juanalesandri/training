import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('form') signupForm: NgForm;
  selectQuestion: string = 'pet';
  answer: string = '';
  genders: string[] = ['male', 'female'];
  user = {
    username: '',
    email: '',
    secretQuestion: '',
    answer: '',
    gender: ''
  }
  submitted: boolean = false;

  suggestUserName() {
    const suggestedName = 'Superuser';

    //PARA SOBRESCRIBIR TODO EL FORMULARIO
    // this.signupForm.setValue({
    //   userData: {
    //     username: suggestedName,
    //     email: ''
    //   },
    //   secret: 'pet',
    //   questionAnswer: '',
    //   gender: 'male'
    // })

    //PARA SOBREESCRIBIR SOLO LO QUE ESTABLESCO
    this.signupForm.form.patchValue({
      userData: {
        username: suggestedName
      }
    })
  }

  // submitForm(form: NgForm) {
  //   console.log(form);
  // }
  submitForm() {
    console.log(this.signupForm);
    this.submitted = !this.submitted;
    this.user.username = this.signupForm.value.userData.username;
    this.user.email = this.signupForm.value.userData.email;
    this.user.secretQuestion = this.signupForm.value.secret;
    this.user.answer = this.signupForm.value.questionAnswer;
    this.user.gender = this.signupForm.value.gender;

    this.signupForm.reset();
  }
}
