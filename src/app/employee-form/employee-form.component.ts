// employee-form.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeService } from '../employee.service';
import { Employee } from '../employee.model';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent implements OnInit {
  employeeForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.employeeForm = this.fb.group({
      name: ['', Validators.required],
      score: ['', [Validators.required, Validators.min(0), Validators.max(100)]],
      email: ['', [Validators.required, Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)]]
    });
  }

  onSubmit(): void {
    const { name, score, email } = this.employeeForm.value;

    this.employeeService.addEmployee(name, score, email); 
    this.router.navigate(['/list']); 
  }

  resetForm(): void {
    this.employeeForm.reset();
  }

  shouldShowNameError(): boolean {
    const control = this.employeeForm.get('name');
    return control.invalid && (control.dirty || control.touched);
  }

  shouldShowScoreError(): boolean {
    const control = this.employeeForm.get('score');
    return control.invalid && (control.dirty || control.touched);
  }

  shouldShowEmailRequiredError(): boolean {
    const control = this.employeeForm.get('email');
    return control.hasError('required') && (control.dirty || control.touched);
  }

  shouldShowEmailPatternError(): boolean {
    const control = this.employeeForm.get('email');
    return control.hasError('pattern') && (control.dirty || control.touched);
  }
}
