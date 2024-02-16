<template>
  <div class="container-fluid pe-0 ps-0 pb-4 mb-4 bg-light">
    <Navbar />
    <div class="container">
      <RouterView />
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/elements/NavBar.vue'

export default {
  components: { Navbar }
}
</script>
