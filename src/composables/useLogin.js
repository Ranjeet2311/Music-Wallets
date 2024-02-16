import { ref } from 'vue'
import { projectAuth } from '../firebase/config.js'

const error = ref(null)
const isPending = ref(false)

const login = async (email, password) => {
  error.value = null
  isPending.value = true
  // console.log(`script email, password`, email, password)
  console.log(`isLoading from function : `, isPending.value)

  try {
    const res = await projectAuth.signInWithEmailAndPassword(email, password)
    console.log(`error value js file 111`)
    error.value = null
    // console.log(`error value js file`, res)
    isPending.value = false
    console.log(`isLoading from try : `, isPending.value)

    return res
  } catch (err) {
    // console.log(`error value js file`, error.value)
    error.value = 'Incorrect login credentials'
    isPending.value = false
    console.log(`isLoading from catch : `, isPending.value)
  }
}

const useLogin = () => {
  return { error, login, isPending }
}

export default useLogin
