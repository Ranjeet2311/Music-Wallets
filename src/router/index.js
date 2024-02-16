import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LogIn from '@/views/auth/LogIn.vue'
import SignUp from '@/views/auth/SignUp.vue'
import CreatePlaylist from '@/views/playlist/CreatePlaylist.vue'
import PlaylistDetails from '@/views/playlist/PlaylistDetails.vue'
import { projectAuth } from '@/firebase/config'
import MyPlaylistsVue from '@/views/playlist/MyPlaylists.vue'

const requireAuth = (to, from, next) => {
  let user = projectAuth.currentUser

  if (!user) {
    next({ name: 'Login' })
  } else {
    next()
  }
}

const requireNoAuth = (to, from, next) => {
  let user = projectAuth.currentUser
  console.log(`don't show login page to logged in members :`, user)

  if (user) {
    next('/user-playlists')
  } else {
    console.log(` next();`)
    next()
  }
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      beforeEnter: requireAuth
    },
    {
      path: '/login',
      name: 'Login',
      component: LogIn,
      beforeEnter: requireNoAuth
    },
    {
      path: '/signup',
      name: 'SignUp',
      component: SignUp
    },
    {
      path: '/playlist/create',
      name: 'CreatePlaylist',
      component: CreatePlaylist,
      beforeEnter: requireAuth
    },
    {
      path: '/playlist/:id',
      name: 'PlaylistDetails',
      component: PlaylistDetails,
      beforeEnter: requireAuth,
      props: true
    },
    {
      path: '/user-playlists',
      name: 'MyPlaylistsVue',
      component: MyPlaylistsVue,
      beforeEnter: requireAuth
    }
  ]
})

export default router
