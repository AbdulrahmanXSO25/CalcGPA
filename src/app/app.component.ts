import { Component, OnInit} from '@angular/core';
import { GpaLetter } from './models/gpaLetter';
import { Subject } from './models/subject';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  grades: GpaLetter[] = [
    {letter: 'A+', degree: 4},
    {letter: 'A', degree: 3.7},
    {letter: 'B+', degree: 3.3},
    {letter: 'B', degree: 3},
    {letter: 'C+', degree: 2.7},
    {letter: 'C', degree: 2.4},
    {letter: 'D+', degree: 2.2},
    {letter: 'D', degree: 2},
    {letter: 'F', degree: 0},
  ];

  subjects: Subject[] = [];

  totalGPA:number = 0;

  virtualSubject: Subject = {name: '' };

  addMode = false;

  constructor() {

  }

  ngOnInit(): void {
    const storedSubjects = localStorage.getItem('subjects');
    if (storedSubjects) this.subjects = JSON.parse(storedSubjects);
  }

  saveGrades() {
    localStorage.setItem('grades', JSON.stringify(this.grades));
  }

  enableAdd() {
    this.addMode = true;
  }

  addSubject() {
    this.subjects.push(this.virtualSubject);
    localStorage.setItem('subjects', JSON.stringify(this.subjects));
    console.log(this.subjects);
    this.virtualSubject = {name: ''};
    this.addMode = false;
  }

  calc() {
    localStorage.setItem('subjects', JSON.stringify(this.subjects));
    this.totalGPA = 0;
    this.subjects.forEach(s => {
      this.totalGPA += s.mark;
    });
    this.totalGPA = this.totalGPA / this.subjects.length;
  }

  deleteSubject(subject:Subject) {
    let i = 0;
    for (i; i < this.subjects.length; i++) {
      if(this.subjects[i] == subject) break;
    }
    this.subjects.splice(i,1);
    localStorage.setItem('subjects', JSON.stringify(this.subjects));
  }

}


// add slider instead of button
