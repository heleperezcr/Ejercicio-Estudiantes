import { Student } from './../models/student';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private students: Student[];

  constructor(private firestore: AngularFirestore) {
    this.students = [
      {
        controlnumber: "18401175",
        age: 38,
        career: "ISC",
        curp: "AOVI840917HNTRZS09",
        email: "iarjona@ittepic.edu.mx",
        name: "Israel Arjona Vizcaíno",
        nip: 717,
        photo: 'https://picsum.photos/600/?random=1'
      },
      {
        controlnumber: "11773652",
        age: 28,
        career: "IM",
        curp: "AOCI840917HNTRZS09",
        email: "heleperez@ittepic.edu.mx",
        name: "Juan luis lopez",
        nip: 818,
        photo: 'https://picsum.photos/600/?random=2'
      },
      {
        controlnumber: "99857746",
        age: 18,
        career: "IC",
        curp: "OOCI840917HNTRZS09",
        email: "hleopoldo@ittepic.edu.mx",
        name: "Hector leopoldo",
        nip: 919,
        photo: 'https://picsum.photos/600/?random=3'
      }
    ];
  }

  public getStudents(): Observable<Student[]> {
    return this.firestore.collection('students').snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Student;
          const id = a.payload.doc.id;
          return {id, ...data };
        });
      })
    )
  }

  public removeStudent(id:string) {
    this.firestore.collection('students').doc(id).delete();
  }

  public updateStudent(id:string, student: Student){
    this.firestore.collection('students').doc(id).update(student);
  }

  public getStudentByID(id: string){
    let result = this.firestore.collection('students').doc(id).valueChanges();
    return result;
  }

  public newStudent(student: Student){
    
    this.firestore.collection('students').add(student)
  }

  public getStudentByControlNumber(controlnumber: string): Student {
    let item: Student = this.students.find((student) => {
      return student.controlnumber === controlnumber;
    });
    return item;
  }

}
