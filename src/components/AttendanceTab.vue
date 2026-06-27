<script setup>
import { reactive, computed } from 'vue';
import { attendanceService } from '../services/attendanceService.js';
import { employeeService } from '../services/employeeService.js';

const props = defineProps({
  appState: { type: Object, required: true }
});

const emit = defineEmits(['trigger-save']);

const form = reactive({
  date: new Date().toISOString().split('T')[0],
  employeeId: '',
  status: 'Present',
  hoursWorked: 8
});

function getEmployeeName(id) {
  const emp = employeeService.getEmployeeById(id, props.appState);
  return emp ? `${emp.firstName} ${emp.lastName}` : 'Unknown Worker';
}

function saveAttendance() {
  if (!form.employeeId || !form.date) {
    alert("Please assign a valid employee context frame registry.");
    return;
  }

  const result = attendanceService.recordAttendance(
    parseInt(form.employeeId),
    form.date,
    form.status,
    parseFloat(form.hoursWorked),
    props.appState
  );

  alert(result.message);
  if (result.success) {
    form.employeeId = '';
    emit('trigger-save');
  }
}

function getStatusBadgeClass(status) {
  const match = attendanceService.statuses.find(s => s.value === status);
  
  return match ? `badge-${match.colour}` : 'bg-secondary';
}
</script>

<template>
  <div>
    <h1 class="section-title mb-4">Daily Attendance</h1>

    <div class="row">
      <div class="col-md-4 mb-4">
        <div class="card shadow-sm">
          <div class="card-header bg-white fw-bold">Record Daily Attendance</div>
          <div class="card-body">
            <form @submit.prevent="saveAttendance" class="row g-3">
              <div class="col-12">
                <label class="form-label">Log Operating Date</label>
                <input v-model="form.date" type="date" class="form-control" required />
              </div>
              <div class="col-12">
                <label class="form-label">Employee Target Context</label>
                <select v-model="form.employeeId" class="form-select" required>
                  <option value="" disabled>Select target personnel profile...</option>
                  <option v-for="emp in appState.employees" :key="emp.id" :value="emp.id">
                    {{ emp.firstName }} {{ emp.lastName }}
                  </option>
                </select>
              </div>
              <div class="col-12">
                <label class="form-label">Shift Status Classification</label>
                <select v-model="form.status" class="form-select">
                  <option v-for="st in attendanceService.statuses" :key="st.value" :value="st.value">
                    {{ st.label }}
                  </option>
                </select>
              </div>
              <div class="col-12">
                <label class="form-label">Hours Logged Active Work (0-12)</label>
                <input v-model.number="form.hoursWorked" type="number" min="0" max="12" step="0.5" class="form-control" required />
              </div>
              <div class="col-12 mt-3">
                <button type="submit" class="btn btn-primary w-100">Commit Attendance Entry</button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div class="col-md-8 mb-4">
        <div class="card shadow-sm h-100">
          <div class="card-header bg-white fw-bold">Historical Attendance Logs</div>
          <div class="table-responsive">
            <table class="table table-hover align-middle mb-0">
              <thead class="table-light">
                <tr>
                  <th>Operating Date</th>
                  <th>Worker Name</th>
                  <th>Status Classification</th>
                  <th class="text-end">Hours Accounted</th>
                </tr>
              </thead>
              <tbody>
                <tr v-if="appState.attendance.length === 0">
                  <td colspan="4" class="text-center p-4 text-muted">No historical shift logs found within current application system.</td>
                </tr>
                <tr v-for="record in appState.attendance" :key="record.id">
                  <td class="font-monospace fw-bold" style="font-size:0.9rem;">{{ record.date }}</td>
                  <td>{{ getEmployeeName(record.employeeId) }}</td>
                  <td>
                    <span :class="['badge', getStatusBadgeClass(record.status)]">
                      {{ record.status }}
                    </span>
                  </td>
                  <td class="text-end font-monospace fw-bold">{{ record.hoursWorked }} hrs</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>