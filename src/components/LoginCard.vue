<script setup>
import { ref } from 'vue';

const emit = defineEmits(['login']);

const email = ref('');
const password = ref('');

function onLoginSubmit() {
  emit('login', { email: email.value, password: password.value });
};
</script>

<template>
  <div class="login-wrapper d-flex align-items-center justify-content-center min-vh-100 bg-light">
    <div class="card login-card p-4 shadow-sm" style="max-width: 400px; width: 100%;">
      <div class="text-center mb-4">
        <h2 class="brand mb-2">ModernTech</h2>
        <p class="text-muted">HR Solutions Portal</p>
      </div>
      
      <form @submit.prevent="onLoginSubmit">
        <div class="mb-3">
          <label for="emailInput" class="form-label">Email Address</label>
          <input 
            id="emailInput"
            v-model="email" 
            type="email" 
            class="form-control" 
            placeholder="admin@moderntech.com"
            required
          />
        </div>
        
        <div class="mb-4">
          <label for="passwordInput" class="form-label">Password</label>
          <input 
            id="passwordInput"
            v-model="password" 
            type="password" 
            class="form-control" 
            placeholder="••••••••"
            required
          />
        </div>
        
        <button type="submit" class="btn btn-primary w-100 py-2">Sign In</button>
      </form>
      
      <div class="mt-4 p-2 bg-light border rounded text-center" style="font-size: 0.85rem;">
        <span class="text-secondary d-block font-monospace">Demo Email: admin@moderntech.com</span>
        <span class="text-secondary d-block font-monospace">Demo Password: password123</span>
      </div>
    </div>
  </div>
</template>