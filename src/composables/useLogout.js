import { ref } from 'vue'
import { projectAuth } from '../firebase/config.js'

const error = ref(null)
const isPending = ref(false)

const logout = async () => {
  error.value = null
  isPending.value = true

  try {
    await projectAuth.signOut()
    isPending.value = false
  } catch (err) {
    console.log(`logout clicked :`, err.message)
    error.value = err.message
    isPending.value = false
  }
}

const useLogout = () => {
  return { error, logout, isPending }
}

export default useLogout
