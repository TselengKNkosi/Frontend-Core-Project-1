//manages time off requests
import { employeeService } from './employeeService.js';
import { validateTimeOffRequest } from '../utils/validators.js';

export const timeOffService = {
  //Defining appropriate time off requests
  timeOffTypes: [
    {
      value: 'Vacation', 
      label: 'Vacation',
      maxDaysPerYear: 20 
    },
    { 
      value: 'Sick Leave',
      label: 'Sick Leave',
      maxDaysPerYear: 10 
    },
    { 
      value: 'Personal', 
      label: 'Personal',
      maxDaysPerYear: 5 
    },
    { 
      value: 'Bereavement',
      label: 'Bereavement',
      maxDaysPerYear: 3 
    }
  ],

  //request Statuses 
  requestStatuses: [
    'Pending', 'Approved', 'Rejected'
  ],

  //submitRequest function 
  submitRequest(formData, appState) {
    //Validate input
    const validation = validateTimeOffRequest(formData);
    
    if (!validation.isValid){
      return {
        success: false,
        message: 'Validation failed'
      };
    }
    
    //Verify that the employee exists
    const employee = employeeService.getEmployeeById(formData.employeeId, appState);
    
    if (!employee) {
      return {
        success: false,
        message: 'Employee not found'
      };
    }
    
    //Generate unique ID
    const highestId = Math.max(...appState.timeOffRequests.map(r => r.id), 0);
    const newId = highestId + 1;
    //request object
    const newRequest = {
      id: newId,
      employeeId: parseInt(formData.employeeId),
      type: formData.type,
      startDate: formData.startDate,
      endDate: formData.endDate,
      status: 'Pending',
      reason: formData.reason?.trim() || 'No reason provided',
      submittedDate: new Date().toISOString().split('T')[0]
    };
    
    appState.timeOffRequests.push(newRequest);
    
    //Return confirmation message
    return {
      success: true,
      message: `Time off request submitted for ${employee.firstName} ${employee.lastName}`,
      request: newRequest
    };
  },

  //Approve Time Off Request
  approveRequest(requestId, appState) {
    //Find request
    const request = appState.timeOffRequests.find(r => r.id === requestId);
    
    if (!request) {
      return {
        success: false,
        message: 'Request not found'
      };
    }
    
    //Check if request has already been processed - Request decisions are final
    if (request.status !== 'Pending') {
      return {
        success: false,
        message: `Cannot approve. Request is already ${request.status}`
      };
    }
    
    //If unprocessed change status
    request.status = 'Approved';
    request.approvedDate = new Date().toISOString().split('T')[0];
    
    //Return confirmation message
    const employee = employeeService.getEmployeeById(request.employeeId, appState);
    const employeeName = employee ? `${employee.firstName} ${employee.lastName}` : 'Unknown';
    return {
      success: true,
      message: `Time off request approved for ${employeeName}`
    };
  },

  //Reject time off request
  rejectRequest(requestId, appState) {
    //Find request
    const request = appState.timeOffRequests.find(r => r.id === requestId);
    
    if (!request) {
      return {
        success: false,
        message: 'Request not found'
      };
    }
    
    //check if request was already processed
    if (request.status !== 'Pending') {
      return {
        success: false,
        message: `Cannot reject. Request is already ${request.status}`
      };
    }
    //change status
    request.status = 'Rejected';
    request.rejectedDate = new Date().toISOString().split('T')[0];
    
    //return confirmation message
    const employee = employeeService.getEmployeeById(request.employeeId, appState);
    const employeeName = employee ? `${employee.firstName} ${employee.lastName}` : 'Unknown';
    return {
      success: true,
      message: `Time off request rejected for ${employeeName}`
    };
  },

  //getRequestsByEmployee function
  getRequestsByEmployee(employeeId, appState) {
    return appState.timeOffRequests.filter(req => req.employeeId === employeeId);
  },
  
  //getPendingRequests function
  getPendingRequests(appState) {
    return appState.timeOffRequests.filter(req => req.status === 'Pending');
  },

  //getApprovedRequests() function
  getApprovedRequests(appState) {
    return appState.timeOffRequests.filter(req => req.status === 'Approved');
  },
  
  //calculateDaysUsed() function
  calculateDaysUsed(employeeId, type, appState) {
    let totalDays = 0;
    const approvedRequests = appState.timeOffRequests.filter(req => req.employeeId === employeeId && req.type === type && req.status === 'Approved');
    approvedRequests.forEach(req => {
      const start = new Date(req.startDate);
      const end = new Date(req.endDate);
      const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;
      totalDays += days;
    });
    return totalDays;
  },
  
  //getLeaveBalance() function 
  getLeaveBalance(employeeId, appState) {
    const balance = {};
    this.timeOffTypes.forEach(type => {
      const used = this.calculateDaysUsed(employeeId, type.value, appState);
      balance[type.value.replace(/\s+/g, '')] = {
        allowed: type.maxDaysPerYear,
        used: used,
        remaining: type.maxDaysPerYear - used
      };
    });
    return balance;
  }
};