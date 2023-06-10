<template>
  <main>
    <!-- Main Content -->
    <section class="container mx-auto mt-6">
      <div class="md:grid md:grid-cols-3 md:gap-4">
        <!-- Col: Upload Music -->
        <div class="col-span-1">
          <app-upload ref="upload" :addSong="addSong" />
        </div>
        <!-- Col: Music Lists -->
        <div class="col-span-2">
          <div class="bg-white rounded border border-gray-200 relative flex flex-col">
            <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
              <span class="card-title">My Songs</span>
              <i class="fa fa-compact-disc float-right text-green-400 text-2xl"></i>
            </div>
            <div class="p-6">
              <!-- Composition Items -->
              <composition-item
                v-for="(song, index) in songs"
                :key="song.docID"
                :song="song"
                :index="index"
                :updateSong="updateSong"
                :delSong="deleteSong"
                :updateUnsavedFlag="updateUnsavedFlag" />
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>
<script>
import AppUpload from '../components/AppUpload.vue'
import CompositionItem from '../components/CompositionItem.vue'
import { auth, songsCollection } from '@/includes/firebase'

export default {
  name: 'ManageView',
  components: { AppUpload, CompositionItem },
  data() {
    return {
      songs: [],
      unsavedFlag: false
    }
  },
  methods: {
    updateSong(i, values) {
      this.songs[i].modified_name = values.modified_name
      this.songs[i].genre = values.genre
    },
    deleteSong(i) {
      this.songs.splice(i, 1)
    },
    addSong(document) {
      const song = {
        ...document.data(),
        docID: document.id
      }

      this.songs.push(song)
    },
    updateUnsavedFlag(value) {
      this.unsavedFlag = value
    }
  },
  async created() {
    const userSongsSnapShot = await songsCollection.where('uid', '==', auth.currentUser.uid).get()

    userSongsSnapShot.forEach(this.addSong)
  },
  beforeRouteLeave(to, from, next) {
    this.$refs.upload.uploads.forEach((upload) => {
      upload.task.cancel()
    })
    if (!this.unsavedFlag) {
      next()
    } else {
      // esling-disable-next-line no-aler,no-restricted-globals
      const answer = confirm('You have unsaved changes,Are you sure you want leave the page ?')
      next(answer)
    }
  }
}
</script>
