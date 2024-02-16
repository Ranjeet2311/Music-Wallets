import { ref } from 'vue'
import { projectAuth } from '../firebase/config.js'

const user = ref(projectAuth.currentUser)

// onAuthStateChanged method fires at everytime user status changes routeLocationKey, login, logout, signup etc
projectAuth.onAuthStateChanged((_user) => {
  user.value = _user
  console.log(`user state changed`, _user)
})

const getUser = () => {
  console.log(`user : : ==`, user)
  return { user }
}

export default getUser
