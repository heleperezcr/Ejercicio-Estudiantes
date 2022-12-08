import { Component } from '@angular/core';

import { Student } from "../models/student";
import { StudentService } from "../services/student.service";
import { AlertController } from "@ionic/angular";
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public students: Student[];

  constructor(private studentService: StudentService, private alertController: AlertController, private router: Router) {
    //this.students = this.studentService.getStudents();

    this.studentService.getStudents().subscribe(res => {
      this.students = res;
      console.log(this.students)
    })

  }

  public async updateStudent(id: string){
    this.router.navigate(['/update-student'],{
      queryParams: {
        id: id
      }
    });
  }

  public async removeStudent(id: string) {
    const alert = await this.alertController.create({
      header: 'Confirmación',
      subHeader: '¿Estás seguro que deseas eliminar?',
      message: 'Esto es una confirmación',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {

          }
        },
        {
          text: 'Aceptar',
          role: 'confirm',
          handler: () => {
            this.studentService.removeStudent(id);
          }
        }
      ]
    });

    await alert.present();
  }

  public getStudentByID(id: string) {
    this.router.navigate(['/view-student'], {
      queryParams: {
        id: id
      }
    })
    this.studentService.getStudentByID(id);
  }

  public getStudentByControlNumber(cn: string): void {
    //console.log(this.studentService.getStudentByControlNumber(cn));
    this.router.navigate(['/view-student'], {
      queryParams: { cn: cn },
    });
  }

  public goToNewStudent(): void {
    this.router.navigate(['/new-student']);
  }

}
