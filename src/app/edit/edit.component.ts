import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Employee } from '../employee.model';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  editForm: FormGroup;
  employees: Employee[] = [];
  editEmployee: Employee;
  editIndex: number = -1;

  constructor(
    private formBuilder: FormBuilder,
    private employeeService: EmployeeService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.editForm = this.formBuilder.group({
      name: ['', Validators.required],
      score: [0, [Validators.required, Validators.min(0), Validators.max(100)]],
      email: ['', [Validators.required, Validators.email]]
    });
    this.employees = this.employeeService.getEmployees();
    this.editEmployee = JSON.parse(localStorage.getItem('toEdit'));
    if (this.editEmployee) {
      this.editForm.patchValue({
        name: this.editEmployee.name,
        score: this.editEmployee.score,
        email: this.editEmployee.email
      });
    }
    if (localStorage.getItem('editIndex')) {
      this.editIndex = parseInt(localStorage.getItem('editIndex'), 10);
    }
  }

  onSubmit(): void {
    if (this.editForm.valid) {
      const { name, score, email } = this.editForm.value;
      const updatedEmployee: Employee = {
        name: name,
        score: parseInt(score, 10),
        email: email
      };
      if (this.editEmployee) {
        this.employees[this.editIndex] = updatedEmployee;
        this.employeeService.updateEmployees(this.employees);

        localStorage.removeItem('editIndex');
        localStorage.removeItem('toEdit');
        alert('Employee updated successfully');
        this.router.navigate(['/list']);
      }
    }
  }
}
