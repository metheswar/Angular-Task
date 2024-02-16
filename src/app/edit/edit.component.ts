import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Employee } from '../employee.model';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  @ViewChild('editForm') editForm: NgForm; 
  employees: Employee[] = [];
  editEmployee: Employee;
  name: string = '';
  score: number = 0;
  email: string = '';
  editIndex: any = -1;

  constructor(private employeeService: EmployeeService, private router: Router) { }

  ngOnInit(): void {

    this.employees = this.employeeService.getEmployees();
    this.editEmployee = JSON.parse(localStorage.getItem('toEdit')); 
    if (this.editEmployee) {
      this.name = this.editEmployee.name;
      this.score = this.editEmployee.score;
      this.email = this.editEmployee.email;
    }
    if(localStorage.getItem('editIndex')){
      this.editIndex = parseInt(localStorage.getItem('editIndex'))
    }
  }
  validateScore() {
    if (this.score > 100) {
      this.score = 100;
    }
  }
  onclick(name: string, score: string, email: string): void {
    if (this.editEmployee) {
      const updatedEmployee: Employee = {
        name: name,
        score: parseInt(score, 10),
        email: email
      };
      this.employees[this.editIndex] = updatedEmployee;
      this.employeeService.updateEmployees(this.employees);

      localStorage.removeItem('editIndex');
      localStorage.removeItem('toEdit');
      alert('Employee added successfully')
      this.router.navigate(['/list']);
    }
  }
}
