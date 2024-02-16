<template>
  <div class="login-wrap">
    <form @submit.prevent="submitHandle">
      <h1 class="text-center">Create Playlist</h1>
      <div class="mb-4 pt-2">
        <label for="exampleFormControlInput1" class="form-label">Playlist title</label>
        <input type="text" class="form-control" placeholder="playlist name" v-model="title" />
        <!-- <p>{{ title }}</p> -->
      </div>
      <div class="mb-4">
        <label for="exampleFormControlTextarea1" class="form-label">Playlist description</label>
        <textarea class="form-control" rows="3" v-model="description"></textarea>
        <!-- <p>{{ desc }}</p> -->
      </div>
      <div class="mb-4">
        <label for="formFileSm" class="form-label">Upload playlist image</label>
        <input
          @change="uploadFileHandle"
          class="form-control form-control-sm"
          id="formFileSm"
          type="file"
        />
        <p class="error text-center mt-4" font-small>{{ fileError }}</p>
      </div>
      <div class="d-grid mt-4">
        <button v-if="isPendingBtn" class="btn btn-primary" disabled>
          <img style="width: 30px" src="../../assets/images/spinner.gif" alt="" /> Saving...
        </button>
        <button v-else class="btn btn-primary" type="submit">Create</button>
      </div>
    </form>
    <!-- <p class="error text-center mt-4">Test</p> -->
  </div>
</template>

<script>
import { ref } from 'vue'
import useStorage from '@/composables/useStorage'
import getUser from '@/composables/getUser'
import useCollections from '@/composables/useCollections'
import { timestamp } from '@/firebase/config'
import { useRouter } from 'vue-router'

export default {
  setup() {
    const title = ref('')
    const description = ref('')
    const file = ref(null)
    const fileError = ref(null)
    const isPendingBtn = ref(false)
    const router = useRouter()

    const { url, filePath, uploadImage } = useStorage()
    const { addDocument, error } = useCollections('playlist')
    const { user } = getUser()

    // allowed file types

    const fileTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/svg+xml']

    const uploadFileHandle = (e) => {
      const selectedFile = e.target.files[0]
      console.log(`uploadFileHandle :`, selectedFile)

      if (selectedFile && fileTypes.includes(selectedFile.type)) {
        file.value = selectedFile
        fileError.value = null
      } else {
        file.value = null
        fileError.value = 'Please select image of type png, jpeg or svg'
      }
    }

    const submitHandle = async () => {
      if (file.value) {
        isPendingBtn.value = true

        await uploadImage(file.value)
        console.log(`image uploaded`, url.value)

        // we returned res in useCollections and below we're using them

        const res = await addDocument({
          title: title.value,
          desc: description.value,
          UserId: user.value.uid,
          userName: user.value.displayName,
          coverUrl: url.value,
          filePath: filePath.value,
          songs: [],
          createdAt: timestamp()
        })

        title.value = ''
        description.value = ''
        fileError.value = null

        isPendingBtn.value = false

        if (!error.value) {
          console.log(`Playlist added successfully`)
          // console.log(`addDocument : `, res)
          router.push({ name: 'PlaylistDetails', params: { id: res.id } })
        }
      }
      console.log(`submitHandle clicked`)
      console.log(`title :`, title.value)
      console.log(`desc :`, description.value)
    }

    return { title, description, submitHandle, uploadFileHandle, fileError, isPendingBtn }
  }
}
</script>
