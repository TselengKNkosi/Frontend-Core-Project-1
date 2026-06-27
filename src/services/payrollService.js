//handles payroll calculations

export const payrollService = {
  //payroll configuration - for calculculation purposes this will be basic tax calculations and standard rates
  configuration: {
    incomeTaxRate: 0.36,
    deductionRate: 0.08,
    payPeriods: 12
  },
  
  //calculate Monthly Gross Salary
  calculateMonthlyGross(annualSalary) {
    //Check for invalid input
    if (!annualSalary || annualSalary <= 0) {
      return 0;
    }
    //monthly gross salary calculation
    return annualSalary / this.configuration.payPeriods;
  },

  //calculate income tax
  calculateIncomeTax(monthlyGross) {
    return monthlyGross * this.configuration.incomeTaxRate;
  },

  //calculate deductions
  calculateDeductions(monthlyGross) {
    return monthlyGross * this.configuration.deductionRate;
  },

  //calculate total deductions
  calculateTotalDeductions(monthlyGross) {
    const incomeTax = this.calculateIncomeTax(monthlyGross);
    const deductions = this.calculateDeductions(monthlyGross);
    return incomeTax + deductions;
  },

  //calculate take-home pay
  calculateNetPay(monthlyGross) {
    const totalDeductions = this.calculateTotalDeductions(monthlyGross);
    return monthlyGross - totalDeductions;
  },

  //generate payslip
  generatePayslip(employee) {
    //check if employee exists
    if (!employee || !employee.salary) {
      return null;
    }

    //calculations
    const monthlyGross = this.calculateMonthlyGross(employee.salary);
    const incomeTax = this.calculateIncomeTax(monthlyGross);
    const deductions = this.calculateDeductions(monthlyGross);
    const totalDeductions = incomeTax + deductions;
    const netPay = this.calculateNetPay(monthlyGross);
    
    // Get current month/year for pay period
    const now = new Date();
    const monthYear = new Intl.DateTimeFormat('en-UK', {
      year: 'numeric',
      month: 'long'
    }).format(now);
    
    // Create payslip object
    return {
      employeeId: employee.id,
      employeeName: `${employee.firstName} ${employee.lastName}`,
      position: employee.position,
      department: employee.department,
      period: monthYear,
      generatedDate: new Date().toLocaleDateString('en-UK', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      }),
      gross: monthlyGross.toFixed(2),
      tax: incomeTax.toFixed(2),
      deductions: deductions.toFixed(2),
      totalDeductions: totalDeductions.toFixed(2),
      net: netPay.toFixed(2),
      currency: 'ZAR',
      taxRate: (this.configuration.incomeTaxRate * 100) + '%',
      deductionRate: (this.configuration.deductionRate * 100) + '%'
    };
  },

  //Generate PaySlips For All Employees - for payroll processing
  generateAllPayslips(employees) {
    if (!employees || employees.length === 0) {
      return [];
    }
    //each employee becomes a payslip
    return employees.map(employee => this.generatePayslip(employee));
  },

  //calculateAnnualPayrollCost() function
  calculateAnnualPayrollCost(employees) {
    if (!employees || employees.length === 0) {
      return 0;
    }
    return employees.reduce((total, emp) => total + emp.salary, 0);
  },
  
  calculateAverageMonthlyPayroll(employees) {
    const annual = this.calculateAnnualPayrollCost(employees);
    return annual / 12;
  },
  
  getPayrollStats(employees) {
    if (!employees || employees.length === 0) {
      return {
        avgEmployeeSalary: 0,
        avgMonthlyPay: 0,
        totalAnnualPayroll: 0,
        totalMonthlyPayroll: 0,
        highestSalary: 0,
        lowestSalary: 0,
        employeeCount: 0
      };
    }
    
    const salaries = employees.map(emp => emp.salary);
    const totalAnnual = this.calculateAnnualPayrollCost(employees);
    const avgMonthly = this.calculateAverageMonthlyPayroll(employees);
    
    return {
      avgEmployeeSalary: (totalAnnual / employees.length).toFixed(2),
      avgMonthlyPay: avgMonthly.toFixed(2),
      totalAnnualPayroll: totalAnnual.toFixed(2),
      totalMonthlyPayroll: (avgMonthly * employees.length).toFixed(2),
      highestSalary: Math.max(...salaries).toFixed(2),
      lowestSalary: Math.min(...salaries).toFixed(2),
      employeeCount: employees.length
    };
  }
};