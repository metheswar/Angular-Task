import { Injectable } from '@angular/core';
import { Employee } from './employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private localStorageKey = 'employees'; 

  constructor() { }

  addEmployee(name: string, score: number, email: string): void {
    if(!name || !score || !email){
      return 
    }

    const newEmployee: Employee = { name, score, email };
    const storedEmployees = localStorage.getItem(this.localStorageKey);
    let employees: Employee[] = storedEmployees ? JSON.parse(storedEmployees) : [];
    employees.push(newEmployee);
    localStorage.setItem(this.localStorageKey, JSON.stringify(employees));
    alert('Employee added Successfully')
  }

  getEmployees(): Employee[] {
    const storedEmployees = localStorage.getItem(this.localStorageKey);
    return storedEmployees ? JSON.parse(storedEmployees) : [];
  }

  updateEmployees(employees: any[]): void {
    localStorage.setItem(this.localStorageKey, JSON.stringify(employees));
  }
}