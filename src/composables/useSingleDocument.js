import { ref } from 'vue'
import { projectFirestore } from '../firebase/config.js'

const useDocument = (collection, id) => {
  const error = ref(null)
  const isPending = ref(false)

  const documentRefrence = projectFirestore.collection(collection).doc(id)

  const deleteDocument = async () => {
    isPending.value = true
    error.value = null

    try {
      const res = await documentRefrence.delete()
      isPending.value = false
      return res
    } catch (err) {
      console.log()
      console.log(err.message)
      error.value = `couldn't delete the playlist`
      isPending.value = false
    }
  }

  const updateDocument = async (update) => {
    isPending.value = true
    error.value = null

    try {
      const res = await documentRefrence.update(update)
      isPending.value = false
      return res
    } catch (err) {
      console.log()
      console.log(err.message)
      error.value = `couldn't update the playlist`
      isPending.value = false
    }
  }

  return { error, isPending, deleteDocument, updateDocument }
}

export default useDocument
