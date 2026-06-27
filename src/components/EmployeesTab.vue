<script setup>
import { reactive, ref } from 'vue';
import { employeeService } from '../services/employeeService.js';

const props = defineProps({
  appState: { type: Object, required: true }
});

const emit = defineEmits(['trigger-save']);

// Reactive state for managing form fields locally
const initialFormState = () => ({
  id: null,
  firstName: '',
  lastName: '',
  email: '',
  department: '',
  position: '',
  salary: '',
  status: 'Active'
});

const form = reactive(initialFormState());
const errors = ref([]);

function resetForm() {
  Object.assign(form, initialFormState());
  errors.value = [];
  props.appState.showEmployeeForm = false;
  props.appState.editingEmployee = null;
}

function openAddMode() {
  resetForm();
  props.appState.showEmployeeForm = true;
}

function openEditMode(employee) {
  errors.value = [];
  Object.assign(form, employee);
  props.appState.editingEmployee = employee.id;
  props.appState.showEmployeeForm = true;
}

function saveEmployee() {
  errors.value = [];
  
  // Basic structural validation fallback if modules are decoupling
  if (!form.firstName || !form.lastName || !form.email || !form.salary || !form.department || !form.position) {
    errors.value.push("Please fill in all core required inputs.");
    return;
  }

  let result;
  if (props.appState.editingEmployee) {
    result = employeeService.updateEmployee(form.id, { ...form }, props.appState);
  } else {
    result = employeeService.addEmployee({ ...form }, props.appState);
  }
  
  if (result.success) {
    resetForm();
    emit('trigger-save');
  } else {
    errors.value.push(result.message);
  }
}

function removeEmployee(id) {
  if (confirm("Are you certain you want to remove this employee record?")) {
    employeeService.deleteEmployee(id, props.appState);
    emit('trigger-save');
  }
}
</script>

<template>
  <div>
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h1 class="section-title mb-0">Employee Directory</h1>
      <button v-if="!appState.showEmployeeForm" @click="openAddMode" class="btn btn-primary">+ Add New Employee</button>
    </div>

    <div v-if="appState.showEmployeeForm" class="card mb-4 shadow-sm animate-fade-in">
      <div class="card-header bg-white font-weight-bold">
        {{ appState.editingEmployee ? '📝 Edit Employee Profile' : '👤 Register New Employee Profile' }}
      </div>
      <div class="card-body">
        <div v-if="errors.length" class="alert alert-danger">
          <ul class="mb-0">
            <li v-for="err in errors" :key="err">{{ err }}</li>
          </ul>
        </div>

        <form @submit.prevent="saveEmployee" class="row g-3">
          <div class="col-md-6">
            <label class="form-label">First Name</label>
            <input v-model="form.firstName" type="text" class="form-control" required />
          </div>
          <div class="col-md-6">
            <label class="form-label">Last Name</label>
            <input v-model="form.lastName" type="text" class="form-control" required />
          </div>
          <div class="col-md-6">
            <label class="form-label">Work Email Address</label>
            <input v-model="form.email" type="email" class="form-control" required />
          </div>
          <div class="col-md-6">
            <label class="form-label">Annual Salary (R)</label>
            <input v-model.number="form.salary" type="number" class="form-control" required />
          </div>
          <div class="col-md-4">
            <label class="form-label">Department Assignment</label>
            <select v-model="form.department" class="form-select" required>
              <option value="">Select Department</option>
              <option value="Engineering">Engineering</option>
              <option value="Products">Product Management</option>
              <option value="Product">Product</option>
              <option value="Design">UI/UX Design</option>
              <option value="HR">Human Resources</option>
              <option value="Finance">Finance & Payroll</option>
              <option value="Marketing">Marketing</option>
              <option value="Sales">Sales</option>
              <option value="Operations">Operations</option>
              <option value="Support">Support</option>
            </select>
          </div>
          <div class="col-md-4">
            <label class="form-label">Job Title Role</label>
            <input v-model="form.position" type="text" class="form-control" required />
          </div>
          <div class="col-md-4">
            <label class="form-label">Employment Status</label>
            <select v-model="form.status" class="form-select">
              <option value="Active">Active</option>
              <option value="On Leave">On Leave</option>
              <option value="Terminated">Terminated</option>
            </select>
          </div>
          <div class="col-12 d-flex gap-2 justify-content-end mt-4">
            <button type="button" @click="resetForm" class="btn btn-outline-secondary">Cancel</button>
            <button type="submit" class="btn btn-primary">Save Profile Data</button>
          </div>
        </form>
      </div>
    </div>

    <div class="card shadow-sm">
      <div class="table-responsive">
        <table class="table align-middle mb-0">
          <thead class="table-light">
            <tr>
              <th>ID</th>
              <th>Full Name</th>
              <th>Department</th>
              <th>Position Role</th>
              <th>Salary (Annual)</th>
              <th>Status</th>
              <th class="text-end">Management Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="emp in appState.employees" :key="emp.id">
              <td>#{{ emp.id }}</td>
              <td>
                <div class="fw-bold">{{ emp.firstName }} {{ emp.lastName }}</div>
                <small class="text-muted">{{ emp.email }}</small>
              </td>
              <td>{{ emp.department }}</td>
              <td>{{ emp.position }}</td>
              <td>R{{ emp.salary?.toLocaleString() }}</td>
              <td>
                <span :class="['badge', emp.status === 'Active' ? 'badge-success' : emp.status === 'On Leave' ? 'badge-warning text-dark' : 'badge-danger']">
                  {{ emp.status }}
                </span>
              </td>
              <td class="text-end">
                <button @click="openEditMode(emp)" class="btn btn-sm btn-outline-secondary me-2">Modify</button>
                <button @click="removeEmployee(emp.id)" class="btn btn-sm btn-outline-danger">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>