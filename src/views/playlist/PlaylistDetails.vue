<template>
  <div v-if="playlist" class="row justify-content-center pt-4">
    <div class="col-12 col-lg-2">
      <div class="card">
        <img :src="playlist.coverUrl" class="card-img-top" alt="..." />
        <div class="card-body d-flex flex-column">
          <h5 class="card-title">{{ playlist.title }}</h5>
          <p class="card-text">{{ playlist.desc }}</p>
          <i> ..created by {{ playlist.userName }} </i>
          <button v-if="ownership()" @click="deletePlaylist" class="btn btn-primary mt-4">
            Delete Playlist
          </button>
        </div>
      </div>
    </div>
    <div class="col-12 col-lg-10">
      <h2 class="mb-4">Songs List</h2>
      <add-song v-if="ownership()" :playlist="playlist"></add-song>
      <p v-if="!playlist.songs.length">No song to display</p>
      <div class="row justify-content-center justify-content-md-start mt-4">
        <song-list
          @deleteSong="deleteHandler"
          :owner="ownership"
          :songsList="playlist.songs"
        ></song-list>
      </div>
    </div>
  </div>

  <div v-if="playlist" class="row row-cols-1 row-cols-md-2 g-4 single-playlist-details mt-4">
    <div class="col-12 col-lg-3">
      <!-- <p class="error">{{ error }}</p> -->
    </div>
    <div class="col-12 col-lg-9 song-list">
      <!-- <h3 v-if="playlist.songs.length" class="card-title text-uppercase">
        {{ playlist.songs }}
      </h3> -->
      <!-- <p v-if="!playlist.songs.length">No song to display</p> -->
      <div class="row">
        <!-- <div
          class="col-12 d-flex justify-content-center align-items-center flex-column flex-xl-row"
        >
        </div> -->
      </div>
    </div>
  </div>
  <div v-else class="d-flex justify-content-center">
    <img style="width: 200px" src="../../assets/images/spinner.gif" alt="" />
  </div>
</template>

<script>
// import ref from 'vue'
import getSingleDocument from '@/composables/getSingleDocument'
import getUser from '@/composables/getUser'
import useSingleDocument from '@/composables/useSingleDocument'
import useStorage from '@/composables/useStorage'
import { useRouter } from 'vue-router'
import AddSong from '@/components/elements/AddSong.vue'
import SongList from '@/components/elements/SongList.vue'

export default {
  props: ['id'],
  components: { AddSong, SongList },

  setup(props) {
    const { singleDocument: playlist, error } = getSingleDocument('playlist', props.id)
    const { user } = getUser()
    const { deleteDocument, updateDocument } = useSingleDocument('playlist', props.id)
    const { deleteImage } = useStorage()
    const router = useRouter()

    const ownership = () => {
      return playlist.value && user.value && user.value.uid == playlist.value.UserId
    }

    const deletePlaylist = async () => {
      confirm(`This is an irreversible action, and It will delete the playlist`)
      await deleteDocument()
      await deleteImage(playlist.value.filePath)
      router.push({ name: 'home' })

      console.log(`Playlist Deleted`)
    }

    const deleteHandler = async (id) => {
      confirm(`This is an irreversible action, and It will delete the playlist`)
      if (playlist.value && user.value && user.value.uid == playlist.value.UserId) {
        const upadtedSongs = playlist.value.songs.filter((song) => song.id != id)
        await updateDocument({ songs: upadtedSongs })
      }
    }

    return { playlist, error, user, ownership, deletePlaylist, deleteHandler }
  }
}
</script>
