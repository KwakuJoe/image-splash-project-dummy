<script setup>
const links = [
  {
    label: 'Create an account',
    icon: 'i-heroicons-home',
    to: '/auth'
  }, 
  {
    label: 'Already have an account? Login here',
    icon: 'i-heroicons-chart-bar',
    to: '/auth/login'
  }
]
</script>

<template>
  <UVerticalNavigation :links="links" />
</template>
