import { Component, OnInit } from '@angular/core';
import { Student } from '../models/student';
import { StudentService } from '../services/student.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-student',
  templateUrl: './view-student.page.html',
  styleUrls: ['./view-student.page.scss'],
})
export class ViewStudentPage implements OnInit {

  public student: Student;

  constructor(private studentService: StudentService, private activatedRoute: ActivatedRoute) {
    this.student = {
      controlnumber: '',
      name: '',
      curp: '',
      age: 0,
      nip: 0,
      email: '',
      career: '',
      photo: '',
      id: ''
    }
  }

  ngOnInit() {
    // let cn;
    this.activatedRoute.queryParams.subscribe((params) => {
      this.studentService.getStudentByID(params.id).subscribe(item => {
        //console.log(item);
        this.student = item as Student;
      });

    });
    // console.log(cn);
  }

}
