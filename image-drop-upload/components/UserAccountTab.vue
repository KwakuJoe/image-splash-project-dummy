<script setup>
const links = [{
  label: 'Edit Profile',
  icon: 'i-heroicons-user',
  to:'/profile/[username]/account/edit-user-account'
}, {
  label: 'Change Password',
  icon: 'i-heroicons-lock-closed',
  to: '/profile/[username]/account/password-change'
}, {
  label: 'Close Account',
  icon: 'i-heroicons-x-circle',
  to: '/profile/[username]/account/delete-account'
}
]
</script>

<template>
  <UVerticalNavigation :links="links" />
</template>
