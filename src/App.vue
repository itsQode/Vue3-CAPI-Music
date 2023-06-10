<template>
  <app-header />

  <router-view v-slot="{ Component }">
    <transition name="fade" mode="out-in">
      <component :is="Component" />
    </transition>
  </router-view>

  <app-player />

  <app-auth />
</template>
<script>
import { mapWritableState } from 'pinia'

import useUserStore from '@/stores/user'
import AppAuth from './components/AppAuth.vue'
import AppHeader from './components/AppHeader.vue'
import AppPlayer from './components/AppPlayer.vue'
import { auth } from './includes/firebase'

export default {
  name: 'App',
  components: {
    AppHeader,
    AppAuth,
    AppPlayer
  },
  computed: {
    ...mapWritableState(useUserStore, ['userLoggedIn'])
  },
  created() {
    if (auth.currentUser) {
      this.userLoggedIn = true
    }
  }
}
</script>

<style>
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-active {
  transition: all 0.3s linear;
}
.fade-leave-to {
  transition: all 0.3s linear;
}
</style>
