<script setup>
import { reactive } from 'vue';
import { timeOffService } from '../services/timeOffService.js';
import { employeeService } from '../services/employeeService.js';

const props = defineProps({
  appState: { type: Object, required: true }
});

const emit = defineEmits(['trigger-save']);

const form = reactive({
  employeeId: '',
  type: 'Vacation',
  startDate: '',
  endDate: '',
  reason: ''
});

function getEmployeeName(id) {
  const emp = employeeService.getEmployeeById(id, props.appState);
  return emp ? `${emp.firstName} ${emp.lastName}` : 'Unknown Worker';
}

function submitLeave() {
  if (!form.employeeId || !form.startDate || !form.endDate) {
    alert("Please completely designate employee context framework metrics.");
    return;
  }

  const result = timeOffService.submitRequest({
    employeeId: parseInt(form.employeeId),
    type: form.type,
    startDate: form.startDate,
    endDate: form.endDate,
    reason: form.reason
  }, props.appState);

  alert(result.message);
  
  if (result.success) {
    form.employeeId = '';
    form.reason = '';
    emit('trigger-save');
  }
}

function processRequest(id, statusAction) {
  if (statusAction === 'Approved') {
    timeOffService.approveRequest(id, props.appState);
  } else {
    timeOffService.rejectRequest(id, props.appState);
  }
  emit('trigger-save');
}
</script>

<template>
  <div>
    <h1 class="section-title mb-4">Time Off Management</h1>

    <div class="row">
      <div class="col-md-4 mb-4">
        <div class="card shadow-sm">
          <div class="card-header bg-white fw-bold">Log New Leave Request</div>
          <div class="card-body">
            <form @submit.prevent="submitLeave" class="row g-3">
              <div class="col-12">
                <label class="form-label">Employee Profile</label>
                <select v-model="form.employeeId" class="form-select" required>
                  <option value="" disabled>Select request log profile...</option>
                  <option v-for="emp in appState.employees" :key="emp.id" :value="emp.id">
                    {{ emp.firstName }} {{ emp.lastName }}
                  </option>
                </select>
              </div>
              <div class="col-12">
                <label class="form-label">Leave Classification Type</label>
                <select v-model="form.type" class="form-select">
                  <option v-for="type in timeOffService.timeOffTypes" :key="type.value" :value="type.value">
                    {{ type.label }} (Max: {{ type.maxDaysPerYear }} days)
                  </option>
                </select>
              </div>
              <div class="col-6">
                <label class="form-label">Start Horizon</label>
                <input v-model="form.startDate" type="date" class="form-control" required />
              </div>
              <div class="col-6">
                <label class="form-label">End Horizon</label>
                <input v-model="form.endDate" type="date" class="form-control" required />
              </div>
              <div class="col-12">
                <label class="form-label">Reason for Request</label>
                <textarea v-model="form.reason" rows="2" class="form-control" placeholder="Optional context notes..."></textarea>
              </div>
              <div class="col-12 mt-3">
                <button type="submit" class="btn btn-primary w-100">Submit Application Request</button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div class="col-md-8 mb-4">
        <div class="card shadow-sm h-100">
          <div class="card-header bg-white fw-bold">Active Leave Applications Registry Logging</div>
          <div class="table-responsive">
            <table class="table table-hover align-middle mb-0">
              <thead class="table-light">
                <tr>
                  <th>Applicant Employee</th>
                  <th>Leave Type</th>
                  <th>Duration</th>
                  <th>Workflow State Status</th>
                  <th class="text-end">Verification Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-if="appState.timeOffRequests.length === 0">
                  <td colspan="5" class="text-center p-4 text-muted">No historical requests recorded.</td>
                </tr>
                <tr v-for="req in appState.timeOffRequests" :key="req.id">
                  <td>
                    <div class="fw-bold">{{ getEmployeeName(req.employeeId) }}</div>
                    <small class="text-muted font-monospace">{{ req.reason || 'No reason stated.' }}</small>
                  </td>
                  <td>{{ req.type }}</td>
                  <td>
                    <div style="font-size:0.9rem;">{{ req.startDate }} to {{ req.endDate }}</div>
                  </td>
                  <td>
                    <span :class="['badge', req.status === 'Approved' ? 'badge-success' : req.status === 'Pending' ? 'badge-warning text-dark' : 'badge-danger']">
                      {{ req.status }}
                    </span>
                  </td>
                  <td class="text-end">
                    <div v-if="req.status === 'Pending'" class="d-flex gap-1 justify-content-end">
                      <button @click="processRequest(req.id, 'Approved')" class="btn btn-sm btn-outline-success">Approve</button>
                      <button @click="processRequest(req.id, 'Rejected')" class="btn btn-sm btn-outline-danger">Reject</button>
                    </div>
                    <span v-else class="text-muted small italic">Processed</span>
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