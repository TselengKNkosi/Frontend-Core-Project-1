# ModernTech HR Solutions - Web Application
 
## Project Overview
 
ModernTech HR Solutions is a comprehensive, **client-side only** HR management web application built with **Vue.js 3** and **Bootstrap 5**. This concept application demonstrates how to centralize and simplify core HR functions including employee data management, payroll calculations, time off requests, and attendance tracking.

## Application Screenshots

### Login Page  

### Dashboard

### Employee Data

## Core Project Features

#### 1. **Employee Data Management**
- Display all employee records in a responsive table  
- Add new employees with form validation  
- Edit existing employee information  
- Delete employees from the system  
- Real-time data updates  

#### 2. **Payroll System**
- Automated payroll calculations.  
- Dynamic payslip generation  
- Calculates: 
  - Gross Salary (Monthly Salary)  
  - Basic Tax Deductions (36% rate)  
  - Additional Deductions (8% Benefits)  
  - Net Pay (Pay after mandatory deductions)  
- Print-friendly formating

#### 3. **Time Off Management**
- Submit new time off requests with reason
- Support for: Vacation, Sick Leave, Personal, Bereavement
- HR staff can Approve/Reject requests
- Status tracking (Pending, Approved, Rejected)
- Date range validation

#### 4. **Attendance Tracking**
- Record daily attendance per employee
- Track status: Present, Late, Absent, Leave
- Record hours worked
- View attendance history
- Real-time attendance records

#### 5. **Dashboard**
- Key Performance Indicators (KPIs):
  - Total employees count
  - Annual payroll cost
  - Pending time off requests  
  - 'Present Today' Count

## Bonus Project Features 

#### 1. **Authentication System**
- Mock login with hardcoded credentials
- Session management
- User profile display
- Logout functionality
- Demo credentials: `admin@moderntech.com` / `password123`

#### 2. **Form Validation**
- Real-time validation for:
  - Required fields
  - Email format validation
  - Date validation
  - Salary format (numeric)
- User-friendly error messages
- Form state management

#### 3. **User Feedback & Error Handling**
- Success/error alerts for actions
- Validation error messages
- Confirmation dialogs for destructive actions
- User-friendly notifications

#### 4. **Data Handling**
- LocalStorage integration for data saving
- Fallback to dummy data if storage unavailable

## User Experience Features (UX/UI)

#### 1. **Navigation System**
- Tab-based navigation with visual indicators
- Clear labeling of sections (Dashboard, Employees, Payroll, Time Off, Attendance)
- Active tab highlighting

#### 2. **Responsive Design**
- **Desktop**: Full-featured layout with multi-column grids
- **Tablet**: Optimized for touch with adjusted spacing
- **Mobile**: Single-column layout, readable text, touch-friendly buttons

#### 3. **Professional Design System**
- **Colour Palette**: Olive Green, Muted Brown, and Off-White Tones
- **Typography**: Sora (headings), Poppins (body), Kode Mono (brand)
- **Components**: Reusable button, card, badge, and table stylings

## Known Limitations & Future Enhancements
 
### Current Limitations (By Design)

- **No Backend**: All data is client-side only (for proof-of-concept)
- **No Persistence on Server**: Data lost on page refresh (unless using LocalStorage)
- **No User Authentication Database**: Using hardcoded credentials only
- **No Real Email Notifications**: Time off approvals don't send emails
- **No Reporting**: Limited to basic dashboard metrics

### Future Enhancement Opportunities

1. **Backend Integration**  
2. **Advanced Reporting**  
3. **Real Authentication**  
4. **Email Notifications**  
5. **Employee Self-Service**  
6. **Leave Balances**  

