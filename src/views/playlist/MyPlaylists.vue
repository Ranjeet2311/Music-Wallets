<template>
  <h3 v-if="error" class="error text-center mt-4 pt-4">
    Couldn't fetch data <br />
    <img class="sm-spinner" src="../../assets/images/spinner.gif" alt="" />
  </h3>
  <div v-else>
    <h2 class="text-center mb-4 pt-4">My playlists</h2>
    <div v-if="data" class="row d-flex justify-content-center align-items-start">
      <div
        class="col-12 col-md-6 col-lg-4 col-xl-3 mb-4 me-lg-4"
        v-for="(item, index) in data"
        :key="index"
      >
        <list-view :docs="{ item }"></list-view>
      </div>
    </div>
    <div v-else class="docs d-flex justify-content-center">
      <img style="width: 200px" src="../../assets/images/spinner.gif" alt="" />
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import getUser from '@/composables/getUser'
import getCollections from '@/composables/getCollections'
import ListView from '@/components/elements/ListView.vue'

export default {
  components: { ListView },

  setup() {
    const { user } = getUser()
    const { docs, error } = getCollections('playlist')

    const data = computed(() => {
      return docs.value && docs.value.filter((item) => item.UserId == user.value.uid)
    })

    return { user, docs, error, data }
  }
}
</script>
