function initialiseAppState() {
  return {
    isLoggedIn: false,
    currentUser: null,
    currentTab: 'dashboard',

    employees: [
      {
        id: 1,
        firstName: 'Sarah',
        lastName: 'Johnson',
        email: 'sarah.johnson@moderntech.com',
        department: 'Engineering',
        position: 'Senior Developer',
        salary: 900000,
        joinDate: '2020-03-15',
        status: 'Active',
        phone: '+27 (61) 876-1234'
      },
      {
        id: 2,
        firstName: 'Michael',
        lastName: 'Gumede',
        email: 'michael.gumede@moderntech.com',
        department: 'Products',
        position: 'Product Manager',
        salary: 690000,
        joinDate: '2019-07-22',
        status: 'Active',
        phone: '+27 (80) 667-8992'
      },
      {
        id: 3,
        firstName: 'Emma',
        lastName: 'Williams',
        email: 'emma.williams@moderntech.com',
        department: 'HR',
        position: 'HR Manager',
        salary: 520000,
        joinDate: '2020-01-10',
        status: 'Active',
        phone: '+27 (61) 876-1234'
      },
      {
        id: 4,
        firstName: 'James',
        lastName: 'Lekotlo',
        email: 'james.lekotlo@moderntech.com',
        department: 'Finance',
        position: 'Financial Analyst',
        salary: 540000,
        joinDate: '2020-05-17',
        status: 'Active',
        phone: '+27 (80) 667-8992'
      },
      {
        id: 5,
        firstName: 'Lisa',
        lastName: 'Cunningham',
        email: 'lisa.cunningham@moderntech.com',
        department: 'Engineering',
        position: 'DevOps Engineer',
        salary: 850000,
        joinDate: '2019-11-20',
        status: 'Active',
        phone: '+27 (61) 876-1234'
      },
      {
        id: 6,
        firstName: 'David',
        lastName: 'Makana',
        email: 'david.makana@moderntech.com',
        department: 'Design',
        position: 'UI/UX Designer',
        salary: 620000,
        joinDate: '2021-06-30',
        status: 'Active',
        phone: '+27 (72) 555-5555'
      },
      {
        id: 7,
        firstName: 'Rachel',
        lastName: 'Thompson',
        email: 'rachel.thompson@moderntech.com',
        department: 'Marketing',
        position: 'Marketing Manager',
        salary: 650000,
        joinDate: '2020-09-12',
        status: 'Active',
        phone: '+27 (73) 666-6666'
      },
      {
        id: 8,
        firstName: 'Christopher',
        lastName: 'Lee',
        email: 'christopher.lee@moderntech.com',
        department: 'Engineering',
        position: 'Junior Developer',
        salary: 480000,
        joinDate: '2022-02-08',
        status: 'Active',
        phone: '+27 (74) 777-7777'
      },
      {
        id: 9,
        firstName: 'Jessica',
        lastName: 'Martinez',
        email: 'jessica.martinez@moderntech.com',
        department: 'Sales',
        position: 'Sales Representative',
        salary: 420000,
        joinDate: '2021-04-19',
        status: 'Active',
        phone: '+27 (75) 888-8888'
      },
      {
        id: 10,
        firstName: 'Robert',
        lastName: 'Anderson',
        email: 'robert.anderson@moderntech.com',
        department: 'Operations',
        position: 'Operations Lead',
        salary: 700000,
        joinDate: '2019-08-05',
        status: 'Active',
        phone: '+27 (76) 999-9999'
      },
      {
        id: 11,
        firstName: 'Angela',
        lastName: 'Brown',
        email: 'angela.brown@moderntech.com',
        department: 'Finance',
        position: 'Accountant',
        salary: 550000,
        joinDate: '2020-10-15',
        status: 'Active',
        phone: '+27 (77) 111-1111'
      },
      {
        id: 12,
        firstName: 'Kevin',
        lastName: 'White',
        email: 'kevin.white@moderntech.com',
        department: 'Engineering',
        position: 'QA Engineer',
        salary: 580000,
        joinDate: '2021-12-01',
        status: 'Active',
        phone: '+27 (78) 222-2222'
      },
      {
        id: 13,
        firstName: 'Monica',
        lastName: 'Garcia',
        email: 'monica.garcia@moderntech.com',
        department: 'Product',
        position: 'Product Designer',
        salary: 720000,
        joinDate: '2020-02-10',
        status: 'Active',
        phone: '+27 (79) 333-3333'
      },
      {
        id: 14,
        firstName: 'Thomas',
        lastName: 'Davis',
        email: 'thomas.davis@moderntech.com',
        department: 'Support',
        position: 'Support Engineer',
        salary: 450000,
        joinDate: '2022-08-22',
        status: 'Active',
        phone: '+27 (80) 444-4444'
      },
      {
        id: 15,
        firstName: 'Victoria',
        lastName: 'Taylor',
        email: 'victoria.taylor@moderntech.com',
        department: 'Engineering',
        position: 'Tech Lead',
        salary: 950000,
        joinDate: '2018-01-15',
        status: 'Active',
        phone: '+27 (81) 555-5555'
      }
    ],

    timeOffRequests: [
      {
        id: 1,
        employeeId: 1,
        type: 'Vacation',
        startDate: '2024-07-15',
        endDate: '2024-07-22',
        status: 'Approved',
        reason: 'Summer vacation'
      },
      {
        id: 2,
        employeeId: 2,
        type: 'Sick Leave',
        startDate: '2024-06-20',
        endDate: '2024-06-20',
        status: 'Approved',
        reason: 'Medical appointment'
      },
      {
        id: 3,
        employeeId: 3,
        type: 'Personal',
        startDate: '2024-07-01',
        endDate: '2024-07-01',
        status: 'Pending',
        reason: 'Family matter'
      },
      {
        id: 4,
        employeeId: 4,
        type: 'Vacation',
        startDate: '2024-08-05',
        endDate: '2024-08-12',
        status: 'Pending',
        reason: 'Planned vacation'
      },
      {
        id: 5,
        employeeId: 5,
        type: 'Sick Leave',
        startDate: '2024-06-25',
        endDate: '2024-06-25',
        status: 'Approved',
        reason: 'Illness'
      }
    ],

    attendance: [
      { 
        id: 1, 
        employeeId: 1, 
        date: '2024-06-24',
        status: 'Present',
        hoursWorked: 8 
      },
      { 
        id: 2, 
        employeeId: 2, 
        date: '2024-06-24',
        status: 'Present',
        hoursWorked: 8 
      },
      { 
        id: 3, 
        employeeId: 3, 
        date: '2024-06-24',
        status: 'Late',
        hoursWorked: 7.5
       },
       { 
        id: 4, 
        employeeId: 1, 
        date: '2024-06-23',
        status: 'Present',
        hoursWorked: 8 
      },
      { 
        id: 5, 
        employeeId: 2, 
        date: '2024-06-23', 
        status: 'Absent', 
        hoursWorked: 0 
      },
      { 
        id: 6, 
        employeeId: 4, 
        date: '2024-06-24', 
        status: 'Present', 
        hoursWorked: 8 
      },
      { 
        id: 7, 
        employeeId: 5, 
        date: '2024-06-24', 
        status: 'Present',
        hoursWorked: 8 
      },
      { 
        id: 8, 
        employeeId: 6, 
        date: '2024-06-24',
        status: 'Present',
        hoursWorked: 8 
      }
    ],

    editingEmployee: null,
    showEmployeeForm: false,
    selectedEmployee: null,
    formErrors: [],
    successMessage: '',
    errorMessage: ''
  }
}

const demoCredentials = {
  email: 'admin@moderntech.com',
  password: 'password123'
}

export { initialiseAppState, demoCredentials }