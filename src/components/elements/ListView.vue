<template>
  <div class="card-group d-flex justify-content-center" v-for="playlist in docs" :key="playlist.id">
    <!-- just for the info 'playlist.id' is just the Id where its cycling through -->
    <router-link :to="{ name: 'PlaylistDetails', params: { id: playlist.id } }">
      <div class="card h-100" style="width: 18rem">
        <img class="card-img-top" :src="playlist.coverUrl" alt="Card image cap" />
        <div class="card-body">
          <h5 class="card-title text-decoration-none">{{ useTruncate(playlist.title, 22) }}</h5>
          <p class="card-text text-cente text-decoration-none">
            {{ useTruncate(playlist.desc, 22) }}
          </p>
        </div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">
            <i> created by {{ playlist.userName }} </i>
          </li>
          <li class="list-group-item">Songs: {{ playlist.songs.length }}</li>
        </ul>
        <div class="card-body d-grid col-12 mx-auto">
          <a href="#" class="btn btn-primary card-link">Check listed songs</a>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
import useTruncate from '@/composables/useTruncate'
export default {
  props: ['docs'],

  setup() {
    return { useTruncate }
  }
}
</script>
