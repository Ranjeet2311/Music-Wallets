<template>
  <button @click="$router.go(-1)" class="btn arrow me-2">
    <img src="../../assets/images/left-icon.svg" alt="" srcset="" />
  </button>
  <button @click="$router.go(1)" class="btn arrow me-2">
    <img src="../../assets/images/right-icon.svg" alt="" srcset="" />
  </button>
</template>

<script>
import getUser from '@/composables/getUser'

export default {
  setup() {
    const { user } = getUser()
    //     const goBack = () => {
    //       return router.go(-1)
    //     }
    return user
  }
}
</script>
