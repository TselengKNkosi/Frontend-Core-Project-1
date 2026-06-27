//Facilitates the management of employee attendance records and tracking
import { employeeService } from './employeeService.js';
import { validateAttendance } from '../utils/validators.js';

export const attendanceService = {
  //Attendance Statuses
  statuses: [
    {
      value: 'Present',
      label: 'Present',
      colour: 'success'
    },
    {
      value: 'Late',
      label: 'Late',
      colour: 'warning'
    },
    {
      value: 'Absent',
      label: 'Absent',
      colour: 'danger'
    },
    {
      value: 'Leave',
      label: 'Leave',
      colour: 'info'
    }
  ],

  //Record Attendance
  recordAttendance(employeeId, date, status, hoursWorked, appState) {
    //Validate input
    const validation = validateAttendance({
      employeeId, status, hoursWorked
    });
      
    if (!validation.isValid) {
      return {
        success: false,
        message: 'Validation failed'
      };
    }
      
    //Verify that the employee exists
    const employee = employeeService.getEmployeeById(employeeId, appState);
      
    if (!employee) {
      return {
        success: false,
        message: 'Employee not found'
      };
    }
      
    //Check if record exists for this date
    const existingRecord = appState.attendance.find(a => a.employeeId === employeeId && a.date === date);
      
    //Create or update record
    if (existingRecord) {
      existingRecord.status = status;
      existingRecord.hoursWorked = parseFloat(hoursWorked);
    } else {
      //create new record
      const newId = Math.max(...appState.attendance.map(a => a.id), 0) + 1;
      appState.attendance.push({
        id: newId,
        employeeId: parseInt(employeeId),
        date: date,
        status: status,
        hoursWorked: parseFloat(hoursWorked)
      });
    }
      
    //Return confirmation message
    return {
      success: true,
      message: `Attendance recorded for ${employee.lastName}, ${employee.firstName}`
    };
  },

  //get attendance by employee
  getAttendanceByEmployee(employeeId, appState) {
    const records = appState.attendance.filter(a => a.employeeId === employeeId);
    
    //Sorting by newest first
    return records.sort((a, b) => new Date(b.date) - new Date(a.date));
  },

  //get attendance by the date 
  getAttendanceByDate(date, appState) {
    return appState.attendance.filter(a => a.date === date);
  },

  //getTodayAttendance helper function
  getTodayAttendance(appState) {
    const today = new Date().toISOString().split('T')[0];
    return this.getAttendanceByDate(today, appState);
  },

  //Get Employee Attendance Stats - good for employee performance reviews (a function of hr)
  getEmployeeAttendanceStats(employeeId, appState) {
    const records = this.getAttendanceByEmployee(employeeId, appState);
    
    if (records.length === 0) {
      return {
        totalRecords: 0,
        present: 0,
        late: 0,
        absent: 0,
        leave: 0,
        presentRate: '0%',
        avgHoursWorked: 0
      };
    }
    
    //Count statuses
    const statusCounts = {
      present: 0,
      late: 0,
      absent: 0,
      leave: 0
    };
    
    let totalHours = 0;
    
    records.forEach(record => {
      const statusKey = record.status.toLowerCase();
      
      if (statusCounts.hasOwnProperty(statusKey)) {
        statusCounts[statusKey]++;
      }
      totalHours += record.hoursWorked;
    });
    
    // Calculate rates for each instance
    const totalWorkDays = statusCounts.present + statusCounts.late + statusCounts.absent;

    const attendanceRate = totalWorkDays > 0 ? ((statusCounts.present + statusCounts.late) / totalWorkDays * 100).toFixed(1) : 0;

    const avgHours = (totalHours / records.length).toFixed(1);
    
    return {
      totalRecords: records.length,
      present: statusCounts.present,
      late: statusCounts.late,
      absent: statusCounts.absent,
      leave: statusCounts.leave,
      presentRate: attendanceRate + '%',
      avgHoursWorked: avgHours
    };
  }, 

  //getDepartmentAttendance - for dept management
  getDepartmentAttendance(department, date, appState) {
    //Get all employees in the dept
    const deptEmployees = employeeService.getEmployeesByDepartment(department, appState);
    
    if (deptEmployees.length === 0) {
      return {
        department: department,
        totalEmployees: 0,
        present: 0,
        absent: 0,
        late: 0,
        leave: 0,
        notRecorded: 0
      };
    }
    //Get attendance for current date
    const dayAttendance = this.getAttendanceByDate(date, appState);
    
    const statusCounts = {
      present: 0,
      absent: 0,
      late: 0,
      leave: 0,
      notRecorded: 0
    };
    
    deptEmployees.forEach(emp => {
      const record = dayAttendance.find(a => a.employeeId === emp.id);
      
      if (record) {
        const key = record.status.toLowerCase();
        statusCounts[key]++;
      } else {
        statusCounts.notRecorded++;
      }
    });
    
    return {
      department: department,
      totalEmployees: deptEmployees.length,
      present: statusCounts.present,
      absent: statusCounts.absent,
      late: statusCounts.late,
      leave: statusCounts.leave,
      notRecorded: statusCounts.notRecorded
    };
  },

  //get Absent and Present Count Today functions 
  getAbsentCountToday(appState) {
    const todayAttendance = this.getTodayAttendance(appState);
    return todayAttendance.filter(a => a.status === 'Absent').length;
  },

  getPresentCountToday(appState) {
    const todayAttendance = this.getTodayAttendance(appState);
    return todayAttendance.filter(a => a.status === 'Present' || a.status === 'Late').length;
  }
};