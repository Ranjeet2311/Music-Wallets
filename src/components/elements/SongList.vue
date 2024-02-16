<template>
  <div
    class="col-12 col-lg-6 card mt-2 pe-0 ps-0 me-md-2"
    style="width: 22rem"
    v-for="singleSong in songsList"
    :key="singleSong.id"
  >
    <iframe
      height="315"
      :src="'https://www.youtube.com/embed/' + singleSong.source + '?si=khQiHJ8Th0-mxAFI'"
      title="YouTube video player"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowfullscreen
    ></iframe>
    <div class="card-body">
      <div class="d-flex">
        <div class="col-10">
          <h6>{{ singleSong.title }}</h6>
        </div>
        <div class="col-2" v-if="owner()">
          <img
            style="height: 30px"
            @click="$emit('deleteSong', singleSong.id)"
            src="../../assets/icons/trash3-fill.svg"
            alt=""
          />
        </div>
      </div>
      <div class="col-12">
        <p class="card-text">
          {{ singleSong.artist }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['songsList', 'owner'],

  setup() {
    const deleteSongHandler = () => {
      console.log(1233)
    }

    return { deleteSongHandler }
  }
}
</script>
