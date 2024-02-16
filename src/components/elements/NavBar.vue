<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-dark d-flex justify-content-between nav">
    <img
      class="logo"
      @click="$router.push({ name: 'home' })"
      style="max-width: 60px"
      src="../../assets/images/music-logo.svg"
      alt=""
      srcset=""
    />
    <div class="link-wrap">
      <div class="dropstart" v-if="user">
        <button
          class="btn btn-primary dropdown-toggle"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          Actions
        </button>
        <ul class="dropdown-menu">
          <li class="dropdown-item active">
            <i> Hi {{ user.displayName }} </i>
          </li>
          <li>
            <router-link class="dropdown-item mt-2" :to="{ name: 'MyPlaylistsVue' }">
              My Playlists
            </router-link>
          </li>
          <li>
            <router-link class="dropdown-item mt-2" :to="{ name: 'home' }"
              >All playlists
            </router-link>
          </li>
          <li>
            <router-link class="dropdown-item mt-2" :to="{ name: 'CreatePlaylist' }"
              >Create Playlist
            </router-link>
          </li>
          <li>
            <button @click="logoutHandle" class="dropdown-item mt-2">Logout</button>
          </li>
        </ul>
      </div>
      <!-- <div v-if="user">

      </div> -->

      <div v-if="!user">
        <router-link :to="{ name: 'Login' }" class="btn btn-primary me-2">Log-In</router-link>
        <router-link :to="{ name: 'SignUp' }" class="btn btn-primary">Sign-Up</router-link>
      </div>
    </div>
  </nav>
</template>

<script>
import useLogout from '@/composables/useLogout'
import { useRouter } from 'vue-router'
import getUser from '@/composables/getUser'
// import GoBack from './GoBack.vue'

export default {
  // components: { GoBack },

  setup() {
    const { error, logout, isPending } = useLogout()
    const { user } = getUser()
    const router = useRouter()

    const logoutHandle = async () => {
      await logout()
      console.log(`Logout done`)

      if (!error.value) {
        console.log(`successfully logged out`)
        // this.$router.replace({ name: 'Login' })
        router.push({ name: 'Login' })
      }
    }

    return { logoutHandle, error, isPending, user }
  }
}
</script>
