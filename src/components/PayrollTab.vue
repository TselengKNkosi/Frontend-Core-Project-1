<script setup>
import { ref, computed } from 'vue';
import { payrollService } from '../services/payrollService.js';

const props = defineProps({
  appState: { type: Object, required: true }
});

const selectedEmployeeId = ref('');
const activePayslip = ref(null);

const selectedEmployeeObj = computed(() => {
  return props.appState.employees.find(e => e.id === parseInt(selectedEmployeeId.value));
});

function compilePayslip() {
  if (!selectedEmployeeObj.value) return;
  
  const emp = selectedEmployeeObj.value;
  const gross = payrollService.calculateMonthlyGross(emp.salary);
  const tax = payrollService.calculateIncomeTax(gross);
  const deductions = payrollService.calculateDeductions(gross);
  const net = payrollService.calculateNetPay(gross);

  activePayslip.value = {
    employee: emp,
    payPeriod: new Date().toLocaleString('default', { month: 'long', year: 'numeric' }),
    issueDate: new Date().toLocaleDateString(),
    grossPay: gross,
    taxWithholding: tax,
    otherDeductions: deductions,
    netTakeHome: net
  };
}

function triggerPrint() {
  window.print();
}

function clearPayslip() {
  activePayslip.value = null;
  selectedEmployeeId.value = '';
}
</script>

<template>
  <div>
    <h1 class="section-title mb-4">Payroll Engine Processing</h1>

    <div class="row">
      <div class="col-md-4 mb-4">
        <div class="card shadow-sm">
          <div class="card-header bg-white fw-bold">Generate Employee Payslip</div>
          <div class="card-body">
            <div class="mb-3">
              <label class="form-label">Target Employee Profile</label>
              <select v-model="selectedEmployeeId" class="form-select">
                <option value="" disabled>Select active employee...</option>
                <option v-for="emp in appState.employees" :key="emp.id" :value="emp.id">
                  {{ emp.firstName }} {{ emp.lastName }} (#{{ emp.id }})
                </option>
              </select>
            </div>
            <button 
              @click="compilePayslip" 
              class="btn btn-primary w-100" 
              :disabled="!selectedEmployeeId"
            >
              Run Calculations
            </button>
          </div>
        </div>
      </div>

      <div class="col-md-8 mb-4">
        <div v-if="activePayslip" class="card shadow payslip-container p-4 animate-fade-in">
          <div class="d-flex justify-content-between align-items-center mb-4 border-bottom pb-3">
            <div>
              <h3 class="brand text-primary m-0">ModernTech Ltd</h3>
              <small class="text-muted">Payroll Statement Invoice</small>
            </div>
            <div class="text-end">
              <h5 class="m-0 text-uppercase fw-bold text-secondary">Official Payslip</h5>
              <small class="text-muted">Period: {{ activePayslip.payPeriod }}</small>
            </div>
          </div>

          <div class="row mb-4 bg-light p-3 rounded mx-0">
            <div class="col-sm-6 mb-2">
              <div class="text-uppercase text-muted small">Employee Beneficiary:</div>
              <div class="fw-bold">{{ activePayslip.employee.firstName }} {{ activePayslip.employee.lastName }}</div>
              <div>ID Number Assignment: #{{ activePayslip.employee.id }}</div>
              <div>Dept: {{ activePayslip.employee.department }} | {{ activePayslip.employee.position }}</div>
            </div>
            <div class="col-sm-6 text-sm-end">
              <div class="text-uppercase text-muted small">Processing Framework:</div>
              <div>Date of Issue: {{ activePayslip.issueDate }}</div>
              <div>Currency Account: South African Rand(R)</div>
            </div>
          </div>

          <table class="table table-bordered mb-4">
            <thead class="table-light">
              <tr>
                <th>Earnings Classification Description</th>
                <th class="text-end" style="width: 200px;">Amount Allocation</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Basic Base Monthly Gross Earned Salary</td>
                <td class="text-end text-success fw-bold">R{{ activePayslip.grossPay.toFixed(2) }}</td>
              </tr>
              <tr class="table-light">
                <th colspan="2">Mandatory Deductions & Taxes</th>
              </tr>
              <tr>
                <td>Income tax (36%)</td>
                <td class="text-end text-danger">-R{{ activePayslip.taxWithholding.toFixed(2) }}</td>
              </tr>
              <tr>
                <td>Company Healthcare Medical Aid & Pension Deductions (8%)</td>
                <td class="text-end text-danger">-R{{ activePayslip.otherDeductions.toFixed(2) }}</td>
              </tr>
              <tr class="table-secondary fw-bold">
                <td>Net Total Pay</td>
                <td class="text-end text-primary fs-5">R{{ activePayslip.netTakeHome.toFixed(2) }}</td>
              </tr>
            </tbody>
          </table>

          <div class="d-flex justify-content-end gap-2 d-print-none">
            <button @click="clearPayslip" class="btn btn-outline-secondary">Clear View</button>
            <button @click="triggerPrint" class="btn btn-success">Print Statement</button>
          </div>
        </div>

        <div v-else class="card bg-light border-dashed text-center p-5 text-muted shadow-sm">
          Select a worker from the control sidebar to generate payslip.
        </div>
      </div>
    </div>
  </div>
</template>