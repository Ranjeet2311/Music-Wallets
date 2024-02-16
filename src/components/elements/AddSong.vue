<template>
  <div class="login-wrap mb-1 pe-4 ps-4">
    <form
      v-if="show"
      @submit.prevent="handleSubmit"
      class="d-flex justify-content-between flex-column"
    >
      <div class="mb-3">
        <label for="title" class="form-label">Title</label>
        <input
          type="text"
          class="form-control"
          id="title"
          aria-describedby="title"
          v-model="title"
        />
      </div>
      <div class="mb-3">
        <label for="artist" class="form-label">Artist</label>
        <input
          type="text"
          class="form-control"
          id="artist"
          aria-describedby="emailHelp"
          v-model="artist"
        />
      </div>
      <div class="mb-3">
        <label for="artist" class="form-label">Youtube video id</label>
        <input
          type="text"
          class="form-control"
          id="artist"
          aria-describedby="emailHelp"
          v-model="source"
        />
        <label @click="showLabelHandle" for="artist" class="form-label"
          >What's youtube video id? <b>Click here</b>
        </label>
        <div class="img-wrap">
          <img
            v-if="showLabel"
            style="width: 100%"
            src="../../assets/images/youtube_id.png"
            alt=""
          />
        </div>
      </div>
      <button type="submit" class="btn btn-primary">
        Add <img class="filter-icon ms-2" src="../../assets/icons/plus-circle-dotted.svg" alt="" />
      </button>
    </form>
    <div class="d-flex justify-content-between flex-column">
      <button v-if="!show" class="btn btn-primary mt-1 mb-1" @click="addButton">Add Songs</button>
      <button v-if="show" class="btn btn-primary mt-2 mb-2" @click="addButton">
        <img class="filter-icon" src="../../assets/icons/x-lg.svg" alt="" />
      </button>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import useSingleDocument from '@/composables/useSingleDocument'

export default {
  props: ['playlist'],

  setup(props) {
    const title = ref('')
    const artist = ref('')
    const source = ref('')
    const show = ref(false)
    const showLabel = ref(false)

    const { updateDocument } = useSingleDocument('playlist', props.playlist.id)

    const addButton = () => {
      show.value = !show.value
    }

    const handleSubmit = async () => {
      console.log(`clicked 123`)
      const newSong = {
        title: title.value,
        artist: artist.value,
        source: source.value,
        id: Math.floor(Math.random() * 10000000)
      }

      if (title.value != 0 && artist.value != 0 && source.value != 0) {
        await updateDocument({ songs: [...props.playlist.songs, newSong] })

        // console.log(songs.title)
      } else {
        confirm('Pleasse fill all the fields')
        console.log({ newSong })
      }
      title.value = ''
      artist.value = ''
      source.value = ''
    }

    const showLabelHandle = () => {
      showLabel.value = !showLabel.value
    }

    return { title, artist, source, show, showLabel, addButton, handleSubmit, showLabelHandle }
  }
}
</script>
