<template>
  <div class="login-wrap">
    <h2 v-if="!isPending">Signup</h2>
    <form v-if="!isPending" @submit.prevent="signupHandle">
      <div class="form-group">
        <label for="exampleInputEmail1">Name</label>
        <input
          type="name"
          class="form-control"
          aria-describedby="nameHelp"
          placeholder="Enter name"
          v-model="name"
        />
      </div>
      <div class="form-group">
        <label for="exampleInputEmail1">Email address</label>
        <input
          type="email"
          class="form-control"
          aria-describedby="emailHelp"
          placeholder="Enter email"
          v-model="email"
        />
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1">Password</label>
        <input type="password" class="form-control" placeholder="Password" v-model="password" />
      </div>
      <small id="emailHelp" class="form-text text-muted"
        >We'll never share your email with anyone else.</small
      >
      <p>{{ password }}</p>
      <button v-if="!isPending" type="submit" class="btn btn-primary">Log-in</button>
    </form>
    <div class="d-flex justify-content-center" v-if="isPending">
      <img class="ms-auto me-auto" src="../../assets/images/spinner.gif" alt="" srcset="" />
    </div>
    <p class="error text-center" v-if="error">{{ error }}</p>
  </div>
</template>

<script>
import { ref } from 'vue'
import useSignup from '@/composables/useSignup'

export default {
  setup() {
    const email = ref('')
    const password = ref('')
    const name = ref('')

    const { error, signup, isPending } = useSignup()

    const signupHandle = async () => {
      console.log()
      await signup(email.value, password.value, name.value)

      if (!error.value) {
        console.log(`Signed up successfully`)
      }
    }

    return { email, password, name, signupHandle, error, isPending }
  }
}
</script>
