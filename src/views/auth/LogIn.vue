<template>
  <div class="login-wrap">
    <h2 v-if="!isPending">Login</h2>
    <form v-if="!isPending" @submit.prevent="handleLoginSubmit">
      <div class="form-group">
        <label for="exampleInputEmail1">Email address</label>
        <input
          type="email"
          class="form-control"
          aria-describedby="emailHelp"
          placeholder="Enter email"
          v-model="email"
        />
        <small id="emailHelp" class="form-text text-muted"
          >We'll never share your email with anyone else.</small
        >
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1">Password</label>
        <input type="password" class="form-control" placeholder="Password" v-model="password" />
      </div>
      <!-- <p>{{ password }}</p> -->
      <button v-if="!isPending" type="submit" class="btn btn-primary">Log-in</button>
    </form>
    <div class="d-flex justify-content-center" v-if="isPending">
      <img class="ms-auto me-auto" src="../../assets/images/spinner.gif" alt="" srcset="" />
    </div>
    <p class="error text-center" v-if="error">{{ error }} {{ error.value }}</p>
  </div>
</template>

<script>
import { ref } from 'vue'
import useLogin from '@/composables/useLogin'
import { useRouter } from 'vue-router'

export default {
  setup() {
    // refs
    const email = ref('')
    const password = ref('')
    const router = useRouter()

    const { error, login, isPending } = useLogin()

    const handleLoginSubmit = async () => {
      await login(email.value, password.value)
      console.log(`Login FOrm`, email.value, password.value)

      if (!error.value) {
        console.log('User Logged In')
        router.push({ name: 'MyPlaylistsVue' })
      }
    }

    return { email, password, handleLoginSubmit, error, isPending }
  }

  //
}
</script>
