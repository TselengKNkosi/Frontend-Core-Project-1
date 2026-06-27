/** validate Functions */
//validateEmail - for email structure
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

//validateRequired - checks if a string input has content inside
function validateRequired(value) {
  return value !== null && value !== undefined && String(value).trim().length > 0;
}
 
//validateSalary - checks that the salary entered is a positive number (for validation in forms)
function validateSalary(salary) {
  const numSalary = parseFloat(salary);
  return !isNaN(numSalary) && numSalary > 0;
}
//validateDate - checks if date follows the format (yyyy-mm-dd)
function validateDate(dateString) {
  // Check format (YYYY-MM-DD)
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(dateString)) return false;
  
  // Check if it's a real date
  const date = new Date(dateString);
  return date instanceof Date && !isNaN(date);
}
 
//validateDateRange - ensures that start date is before or equal to end date (for time off related content)
function validateDateRange(startDate, endDate) {
  if (!validateDate(startDate) || !validateDate(endDate)) {
    return false;
  }
  
  const start = new Date(startDate);
  const end = new Date(endDate);
  return start <= end;
}
 
//function to validate Employee data before saving
function validateEmployee(employee) {
  const errors = [];
  
  // Check required fields
  if (!validateRequired(employee.firstName)) {
    errors.push('Field is empty. First name is required');
  }
  
  if (!validateRequired(employee.lastName)) {
    errors.push('Field is empty. Last name is required');
  }
    
  if (!validateRequired(employee.email)) {
    errors.push('Field is empty. Email is required');
  } else if (!validateEmail(employee.email)) {
    errors.push('Email format is invalid');
  }
    
  if (!validateRequired(employee.department)) {
    errors.push('Field is empty. Department is required');
  }
    
  if (!validateRequired(employee.salary)) {
    errors.push('Field is empty. Salary is required');
  } else if (!validateSalary(employee.salary)) {
    errors.push('Salary must be a positive number');
  }
  
  return {
    isValid: errors.length === 0,
    errors: errors
  };
}
 
/** function that validates time off request data
 * - Employee must be selected
 * - Type must be specified
 * - Dates must be valid
 * - Start date must be before or equal to end date
 */
function validateTimeOffRequest(request) {
  const errors = [];
    
  if (!validateRequired(request.employeeId)) {
    errors.push('Employee must be selected');
    }
    
  if (!validateRequired(request.type)) {
    errors.push('Request type must be specified');
  }
    
  if (!validateDate(request.startDate)) {
    errors.push('Start date must be valid');
    }
    
  if (!validateDate(request.endDate)) {
    errors.push('End date must be valid');
  }
    
  if (validateDate(request.startDate) && validateDate(request.endDate)) {
    if (!validateDateRange(request.startDate, request.endDate)) {
      errors.push('Start date must be before or equal to end date');
    }
  }
  
  return {
    isValid: errors.length === 0,
    errors: errors
  };
}
 
/** function to validate attendance record:
 * - Employee must be selected
 * - Status must be specified
 * - Hours worked must be between 0-12*/
function validateAttendance(attendance) {
  const errors = [];
    
  if (!validateRequired(attendance.employeeId)) {
    errors.push('Employee must be selected');
  }
    
  if (!validateRequired(attendance.status)) {
    errors.push('Status must be specified');
  }
    
  const hours = parseFloat(attendance.hoursWorked);
  
  if (isNaN(hours) || hours < 0 || hours > 12) {
    errors.push('Hours worked must be between 0 and 12');
  }
  
  return {
    isValid: errors.length === 0,
    errors: errors
  };
}

export { validateEmail, validateRequired, validateSalary, validateDate, validateDateRange, validateEmployee, validateTimeOffRequest, validateAttendance};