<script setup>
import { reactive, onMounted, onUnmounted } from 'vue'

import { initialiseAppState, demoCredentials } from './data/initialState.js'
import { employeeService } from './services/employeeService.js'
import { payrollService } from './services/payrollService.js'
import { timeOffService } from './services/timeOffService.js'
import { attendanceService } from './services/attendanceService.js'

import LoginCard from './components/LoginCard.vue'
import DashboardTab from './components/DashboardTab.vue'
import EmployeesTab from './components/EmployeesTab.vue'
import PayrollTab from './components/PayrollTab.vue'
import TimeOffTab from './components/TimeOffTab.vue'
import AttendanceTab from './components/AttendanceTab.vue'

const appState = reactive(initialiseAppState())

function loadSavedData() {
  try {
    const saved = localStorage.getItem('hrAppState')
    if (saved) {
      const parsedData = JSON.parse(saved)
      Object.assign(appState, parsedData)
      console.log('Data loaded from localStorage')
    }
  } catch (error) {
    console.log('Could not load saved data:', error)
  }
}

function saveData() {
  try {
    const dataToSave = {
      employees: appState.employees,
      timeOffRequests: appState.timeOffRequests,
      attendance: appState.attendance
    }
    localStorage.setItem('hrAppState', JSON.stringify(dataToSave))
  } catch (error) {
    console.log('Could not save data to localStorage:', error)
  }
}

function handleLogin(credentials) {
  if (!credentials.email || !credentials.password) {
    alert('Please fill in all fields')
    return
  }

  if (
    credentials.email === demoCredentials.email &&
    credentials.password === demoCredentials.password
  ) {
    appState.isLoggedIn = true
    appState.currentUser = {
      name: 'Administrator',
      email: credentials.email,
      role: 'Admin',
      initials: 'A'
    }
    loadSavedData()
  } else {
    alert('Invalid email or password. Try Again')
  }
}

function handleLogout() {
  appState.isLoggedIn = false
  appState.currentUser = null
  appState.currentTab = 'dashboard'
  appState.editingEmployee = null
  appState.showEmployeeForm = false
  appState.selectedEmployee = null
}

let autoSaveInterval = null

onMounted(() => {
  autoSaveInterval = setInterval(() => {
    if (appState.isLoggedIn) {
      saveData()
    }
  }, 60000)
})

onUnmounted(() => {
  if (autoSaveInterval) clearInterval(autoSaveInterval)
})
</script>

<template>
  <div v-if="!appState.isLoggedIn">
    <LoginCard @login="handleLogin" />
  </div>

  <div v-else>
    <nav class="navbar">
      <div class="container-fluid">
        <span class="navbar-brand brand">ModernTech</span>
        <div class="user-info">
          <span>{{ appState.currentUser.name }}</span>
          <div class="user-avatar">{{ appState.currentUser.initials }}</div>
          <button @click="handleLogout" class="btn btn-outline-primary btn-sm">
            Logout
          </button>
        </div>
      </div>
    </nav>

    <div class="tabs-banner">
      <div class="container-fluid">
        <ul class="nav nav-tabs" role="tablist">
          <li class="nav-item">
            <button
              @click="appState.currentTab = 'dashboard'"
              :class="['nav-link', { active: appState.currentTab === 'dashboard' }]"
              type="button"
            >
              📊 Dashboard
            </button>
          </li>
          <li class="nav-item">
            <button
              @click="appState.currentTab = 'employees'"
              :class="['nav-link', { active: appState.currentTab === 'employees' }]"
              type="button"
            >
              👥 Employees
            </button>
          </li>
          <li class="nav-item">
            <button
              @click="appState.currentTab = 'payroll'"
              :class="['nav-link', { active: appState.currentTab === 'payroll' }]"
              type="button"
            >
              💰 Payroll
            </button>
          </li>
          <li class="nav-item">
            <button
              @click="appState.currentTab = 'timeoff'"
              :class="['nav-link', { active: appState.currentTab === 'timeoff' }]"
              type="button"
            >
              📅 Time Off
            </button>
          </li>
          <li class="nav-item">
            <button
              @click="appState.currentTab = 'attendance'"
              :class="['nav-link', { active: appState.currentTab === 'attendance' }]"
              type="button"
            >
              ✓ Attendance
            </button>
          </li>
        </ul>
      </div>
    </div>

    <main class="main-content">
      <div class="container-fluid">
        <DashboardTab
          v-if="appState.currentTab === 'dashboard'"
          :appState="appState"
        />
        <EmployeesTab
          v-if="appState.currentTab === 'employees'"
          :appState="appState"
          @trigger-save="saveData"
        />
        <PayrollTab
          v-if="appState.currentTab === 'payroll'"
          :appState="appState"
        />
        <TimeOffTab
          v-if="appState.currentTab === 'timeoff'"
          :appState="appState"
          @trigger-save="saveData"
        />
        <AttendanceTab
          v-if="appState.currentTab === 'attendance'"
          :appState="appState"
          @trigger-save="saveData"
        />
      </div>
    </main>
  </div>
</template>