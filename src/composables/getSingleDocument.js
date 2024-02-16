import { ref, watchEffect } from 'vue'
import { projectFirestore } from '../firebase/config.js'

const getSingleDocument = (collection, id) => {
  const singleDocument = ref(null)
  const error = ref(null)

  let documentRef = projectFirestore.collection(collection).doc(id)

  //     onSnapshot() helps in realtime listener to firebase database on doc, change, edited, deleted

  const unsubscribe = documentRef.onSnapshot(
    (doc) => {
      if (doc.data()) {
        singleDocument.value = { ...doc.data(), id: doc.id }
        error.value = null
      } else {
        error.value = `Document doesn't esist`
      }
    },

    //instead of doing try and catch, we did it this way because thats how snaps work
    (err) => {
      console.log(err.message)
      singleDocument.value = null
      error.value = `couldn't fetch document`
    }
  )

  watchEffect((onInvalidate) => {
    // unsubscribe from collections when watcher is stopped (-*comp unmounts)

    onInvalidate(() => {
      unsubscribe()
    })
  })

  return { singleDocument, error }
}

export default getSingleDocument
