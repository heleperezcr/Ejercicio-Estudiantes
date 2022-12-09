import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { Student } from '../models/student';
import { StudentService } from '../services/student.service';

@Component({
  selector: 'app-new-student',
  templateUrl: './new-student.page.html',
  styleUrls: ['./new-student.page.scss'],
})
export class NewStudentPage implements OnInit {

  public student: Student;
  public myForm: FormGroup;
  public validationMessages: object;

  constructor(private router: Router, private toastController: ToastController, private studentService: StudentService, private fb: FormBuilder) { }

  ngOnInit() {
    this.myForm = this.fb.group({
      controlnumber: ["02400391", Validators.compose([Validators.minLength(8), Validators.required, Validators.pattern('^[0-9]+$')])],
      name: ["ISRAEL ARJONA", Validators.required],
      curp: ["AOVI840917HNTRZS09", Validators.compose([Validators.required, Validators.pattern('^[A-Z]{1}[AEIOU]{1}[A-Z]{2}[0-9]{2}(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1])[HM]{1}(AS|BC|BS|CC|CS|CH|CL|CM|DF|DG|GT|GR|HG|JC|MC|MN|MS|NT|NL|OC|PL|QT|QR|SP|SL|SR|TC|TS|TL|VZ|YN|ZS|NE)[B-DF-HJ-NP-TV-Z]{3}[0-9A-Z]{1}[0-9]{1}$')])],
      age: [38, Validators.compose([Validators.required, Validators.min(17)])],
      nip: [789, Validators.compose([Validators.required, Validators.min(10)])],
      email: ["iarjona@ittepic.edu.mx", Validators.compose([Validators.required, Validators.email])],
      career: ["ISC", Validators.required],
      photo: ["https://picsum.photos/200/300", Validators.compose([Validators.required])]
    });

    this.validationMessages = {
      'controlnumber': [
        { type: 'required', message: "captura el número de control" },
        { type: 'minlength', message: "El número de control es incorrecto" },
        { type: 'pattern', message: "El número de control es solo con numeros" }
      ],
      'name': [
        { type: 'required', message: "Captura el nombre" }
      ],
      'curp': [
        { type: 'required', message: "Ingrese la CURP" },
        { type: 'pattern', message: "CURP incorrecta" }
      ],
      'age': [
        { type: 'required', message: "Ingrese la edad" },
        { type: 'min', message: "Formato de edad incorrecta" }
      ],
      'nip': [
        { type: 'required', message: "Ingresa el NIP" },
        { type: 'min', message: "El NIP debe ser mayor a 9" }
      ],
      'email': [
        { type: 'required', message: "Ingresa el correo" },
        { type: 'email', message: "El formato del correo es incorrecto" }
      ],
      'career': [
        { type: 'required', message: "Seleccione la carrera" }
      ],
      'photo': [
        { type: 'required', message: "Ingrese una fotografia" }
      ]
    }
  }

  async presentToast(position: 'top' | 'middle' | 'bottom') {
    const toast = await this.toastController.create({
      message: 'Se guardo correctamente',
      duration: 1500,
      position,
      color: 'success'
    });
    await toast.present();
  }

  public newStudent() {
    this.student = {
      controlnumber: this.myForm.controls.controlnumber.value,
      name: this.myForm.controls.name.value,
      curp: this.myForm.controls.curp.value,
      age: this.myForm.controls.age.value,
      nip: this.myForm.controls.nip.value,
      email: this.myForm.controls.email.value,
      career: this.myForm.controls.career.value,
      photo: this.myForm.controls.photo.value,
    }

    this.studentService.newStudent(this.student);
    this.presentToast('top');
    console.log(this.student);
    this.router.navigate(['..']);
  }


}
