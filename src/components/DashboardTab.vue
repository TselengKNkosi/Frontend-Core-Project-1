<script setup>
import { computed } from 'vue';
import { payrollService } from '../services/payrollService.js';
import { attendanceService } from '../services/attendanceService.js';
import { employeeService } from '../services/employeeService.js';

const props = defineProps({
  appState: {
    type: Object,
    required: true
  }
});

//Employee Counter 
const totalEmployees = computed(() => props.appState.employees.length);

const totalSalaryCostFormatted = computed(() => {
  const amount = payrollService.calculateAnnualPayrollCost(props.appState.employees);
  return 'R' + (amount / 1000000).toFixed(2) + 'M';
});

const pendingRequests = computed(() => {
  return props.appState.timeOffRequests.filter(req => req.status === 'Pending').length;
});

const todayAttendance = computed(() => {
  return attendanceService.getPresentCountToday(props.appState);
});

function getEmployeeName(employeeId) {
  const emp = employeeService.getEmployeeById(employeeId, props.appState);
  return emp ? `${emp.firstName} ${emp.lastName}` : 'Unknown';
  };
</script>

<template>
  <div>
    <h1 class="section-title">Dashboard</h1>
    
    <div class="kpi-grid">
      <div class="kpi-card">
        <div class="kpi-value">{{ totalEmployees }}</div>
        <div class="kpi-label">Total Employees</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-value">{{ totalSalaryCostFormatted }}</div>
        <div class="kpi-label">Annual Payroll</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-value">{{ pendingRequests }}</div>
        <div class="kpi-label">Pending Time Off Requests</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-value">{{ todayAttendance }}</div>
        <div class="kpi-label">Present Today</div>
      </div>
    </div>

    <div class="row mt-4">
      <div class="col-md-6 mb-3">
        <div class="card">
          <div class="card-header">Recent Time Off Requests</div>
          <div class="card-body">
            <div v-if="appState.timeOffRequests.length === 0" class="text-muted">No time off requests</div>
            <table v-else class="table">
              <thead>
                <tr>
                  <th>Employee</th>
                  <th>Type</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="req in appState.timeOffRequests.slice(0, 5)" :key="req.id">
                  <td>{{ getEmployeeName(req.employeeId) }}</td>
                  <td>{{ req.type }}</td>
                  <td>
                    <span :class="['badge', req.status === 'Approved' ? 'badge-success' : req.status === 'Pending' ? 'badge-warning text-dark' : 'badge-danger']">
                      {{ req.status }}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div class="col-md-6 mb-3">
        <div class="card">
          <div class="card-header">Recent Attendance</div>
          <div class="card-body">
            <div v-if="appState.attendance.length === 0" class="text-muted">No attendance records</div>
            <table v-else class="table">
              <thead>
                <tr>
                  <th>Employee</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="att in appState.attendance.slice(0, 5)" :key="att.id">
                  <td>{{ getEmployeeName(att.employeeId) }}</td>
                  <td>{{ new Date(att.date).toLocaleDateString() }}</td>
                  <td>
                    <span :class="['badge', att.status === 'Present' ? 'badge-success' : att.status === 'Late' ? 'badge-warning text-dark' : 'badge-danger']">
                      {{ att.status }}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>