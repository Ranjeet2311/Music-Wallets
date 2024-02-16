import { ref, watchEffect } from 'vue';
import { projectFirestore } from '../firebase/config.js';

const getCollections = (collections) => {
  const docs = ref(null);
  const error = ref(null);

  let collectionRef = projectFirestore
    .collection(collections)
    .orderBy('createdAt');

  //     onSnapshot() helps in realtime listener to firebase database on doc, change, edited, deleted

  const unsubscribe = collectionRef.onSnapshot(
    (snap) => {
      let res = [];
      // snap.doc is the way to access the available docs
      snap.docs.forEach((doc) => {
        // need to create real time timestamp we're adding doc.data().createdAt
        doc.data().createdAt && res.push({ ...doc.data(), id: doc.id });
      });

      docs.value = res;
      error.value = null;
    },

    //     instead of doing try and catch, we did it this way because thats how snaps work
    (err) => {
      console.log(err.message);
      docs.value = null;
      error.value = `couldn't fetch data`;
    }
  );

  watchEffect((onInvalidate) => {
    // unsubscribe from collections when watcher is stopped (-*comp unmounts)

    onInvalidate(() => {
      unsubscribe();
    });
  });

  return { docs, error };
};

export default getCollections;
