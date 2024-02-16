<template>
  <h2 class="pt-4 mb-4 text-center">All playlists</h2>
  <main class="pt-1">
    <h3 v-if="error" class="error text-center mt-4 pt-4">
      Couldn't fetch data <br />
      <img class="sm-spinner" src="../assets/images/spinner.gif" alt="" />
    </h3>
    <div v-else class="mt-4">
      <div class="doc row" v-if="docs">
        <div
          class="col-12 col-md-6 col-lg-4 col-xl-3 mb-4"
          v-for="playlist in docs"
          :key="playlist.id"
        >
          <list-view :docs="{ playlist }"></list-view>
        </div>
      </div>
      <div v-else class="docs d-flex justify-content-center">
        <img style="width: 200px" src="../assets/images/spinner.gif" alt="" />
      </div>
    </div>
  </main>
</template>

<script>
import getCollections from '@/composables/getCollections'
import ListView from '@/components/elements/ListView.vue'
import getUser from '@/composables/getUser'

export default {
  components: { ListView },

  setup() {
    const { docs, error } = getCollections('playlist')
    const { user } = getUser()

    console.log(`docs ::`, docs)
    console.log(`error  : `, error)
    console.log(`user  : `, user)

    return { error, docs, user }
  }
}
</script>
