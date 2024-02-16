import { ref } from 'vue'
import { projectFirestore } from '../firebase/config.js'

const useCollections = (collection) => {
  const error = ref(null)
  const isPending = ref(false)

  const addDocument = async (doc) => {
    isPending.value = ref(true)

    try {
      const res = await projectFirestore.collection(collection).add(doc)
      isPending.value = ref(false)
      return res
    } catch (err) {
      console.log(err.message)
      error.value = `Could not send the message`
      isPending.value = ref(false)
    }
  }

  return { addDocument, error, isPending }
}

export default useCollections
