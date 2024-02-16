import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from '../employee.service';
import { Employee } from '../employee.model';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[] = [];
  filteredEmployees: Employee[] = [];
  selectedIndexes: number[] = [];
  searchQuery: string = '';
  max: number;
  min: number;
  avg: number;

  constructor(private employeeService: EmployeeService, private router: Router) { 
  }

  ngOnInit(): void {
    this.getStoredEmployees();
    this.calculate();
  }

  private getStoredEmployees(): void {
    this.employees = this.employeeService.getEmployees();
    this.filteredEmployees = [...this.employees]; 
  }

  onCheckboxChange(index: number): void {
    if (this.selectedIndexes.includes(index)) {
      this.selectedIndexes = this.selectedIndexes.filter(i => i !== index);
    } else {
      this.selectedIndexes.push(index);
    }
  }

  onDelete(): void {
    const updatedEmployees = this.employees.filter((_, index) => !this.selectedIndexes.includes(index));
    this.employeeService.updateEmployees(updatedEmployees);
    this.employees = updatedEmployees;
    this.selectedIndexes = [];
    this.filterEmployees();
  }

  filterEmployees(): void {
    this.filteredEmployees = this.employees.filter(employee =>
      employee.name.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  calculate(): void {
    const selectedEmployees = this.selectedIndexes.map(index => this.employees[index]);
    if (selectedEmployees.length > 0) {
      const scores = selectedEmployees.map(employee => employee.score);
      this.max = Math.max(...scores);
      this.min = Math.min(...scores);
      this.avg = Math.floor(scores.reduce((acc, curr) => acc + curr, 0) / scores.length);
    } else {
      this.max = 0;
      this.min = 0;
      this.avg = 0;
    }
  }

  onEdit(i: number): void {
    let employee: any = this.employees[i];
    localStorage.setItem('toEdit', JSON.stringify(employee));
    localStorage.setItem('editIndex', i.toString());
    this.router.navigate(['/edit']);
  }
}
