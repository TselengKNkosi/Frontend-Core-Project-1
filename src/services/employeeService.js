//Employee Service object holds employee management functions 
import { validateEmployee } from '../utils/validators.js';

export const employeeService = {
  //getAllEmployees()
  getAllEmployees(appState) {
    return appState.employees;
  },

  //getEmployeeById()
  getEmployeeById(employeeId, appState) {
    return appState.employees.find(emp => emp.id === employeeId) || null;
  },

  //getEmployeesByDepartment()
  getEmployeesByDepartment(department, appState) {
    return appState.employees.filter(emp => emp.department === department);
  },

  //function to add new employee
  addEmployee(formData, appState) {
    //Validate Input
    const validation = validateEmployee(formData);
    
    if (!validation.isValid) {
      return {
        success: false,
        message: 'Validation failed'
      };
    }
    
    //Generate unique employee ID (highest current ID + 1)
    const highestId = Math.max(...appState.employees.map(e => e.id), 0);
    const newId = highestId + 1;

    //Create new employee object
    const newEmployee = {
      id: newId,
      firstName: formData.firstName.trim(),
      lastName: formData.lastName.trim(),
      email: formData.email.trim().toLowerCase(),
      department: formData.department,
      position: formData.position.trim(),
      salary: parseFloat(formData.salary),
      joinDate: formData.joinDate || new Date().toISOString().split('T')[0],
      status: 'Active',
      phone: formData.phone?.trim() || ''
    };

    //Add to appState - UI updates automatically
    appState.employees.push(newEmployee);

    //Return Success Message
    return {
      success: true,
      message: `Employee ${newEmployee.firstName} ${newEmployee.lastName} added successfully`,
      employee: newEmployee
    };
  },

  //function to update existing employee data
  updateEmployee(employeeId, formData, appState) {
    //Find Employee using unique id
    const employee = this.getEmployeeById(employeeId, appState);
    if (!employee) {
      return {
        success: false,
        message: 'Employee not found. Try again'
      };
    }

    //Validate new employee data
    const validation = validateEmployee(formData);
    if (!validation.isValid) {
      return {
        success: false,
        message: 'Validation failed'
      };
    }

    //Update properties for existing employee
    employee.firstName = formData.firstName.trim();
    employee.lastName = formData.lastName.trim();
    employee.email = formData.email.trim().toLowerCase();
    employee.department = formData.department;
    employee.position = formData.position.trim();
    employee.salary = parseFloat(formData.salary);
    employee.phone = formData.phone?.trim() || '';

    return {
      success: true,
      message: 'Employee Information Updated Successfully'
    };
  },

  //deleteEmployee() function 
  deleteEmployee(employeeId, appState) {
    //find employee - app function continuity 
    const employee = this.getEmployeeById(employeeId, appState);
    if (!employee) {
      return {
        success: false,
        message: 'Employee not found'
      };
    }
    const employeeName = `${employee.firstName} ${employee.lastName}`;

    //Remove from appState
    const originalLength = appState.employees.length;
    //create new array without the deleted employee
    appState.employees = appState.employees.filter(emp => emp.id !== employeeId);

    //Confirmation Message
    if (appState.employees.length < originalLength) {
      return {
        success: true,
        message: `Employee ${employeeName} deleted successfully`
      };
    } else {
      return {
        success: false,
        message: 'Failed to delete employee'
      };
    }
  },

  //getEmployeeCount() function 
  getEmployeeCount(appState) {
    return appState.employees.length;
  },

  //getEmployees by Status 
  getEmployeeByStatus(status, appState) {
    return appState.employees.filter(emp => emp.status === status);
  },

  //getTotalPayroll (All employees annual salary)
  getTotalPayroll(appState) {
    return appState.employees.reduce((total, emp) => total + emp.salary, 0);
  },

  //getAverageSalary (across the company)
  getAverageSalary(appState) {
    if (appState.employees.length === 0) return 0;

    const total = this.getTotalPayroll(appState);
    return total / appState.employees.length;
  },

  //getSalaryStats
  getSalaryStats(appState) {
    if (appState.employees.length === 0) {
      return { min: 0, max: 0, avg: 0, total: 0 };
    }
    
    const salaries = appState.employees.map(emp => emp.salary);
    return {
      min: Math.min(...salaries),
      max: Math.max(...salaries),
      avg: this.getAverageSalary(appState),
      total: this.getTotalPayroll(appState)
    };
  }
};