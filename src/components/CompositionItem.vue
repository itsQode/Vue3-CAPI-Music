<template>
  <div class="border border-gray-200 p-3 mb-4 rounded">
    <div v-show="!showForm">
      <h4 class="inline-block text-2xl font-bold">{{ song.modified_name }}</h4>
      <button
        class="ml-1 py-1 px-2 text-sm rounded text-white bg-red-600 float-right"
        @click="deleteSong">
        <i class="fa fa-times"></i>
      </button>
      <button
        class="ml-1 py-1 px-2 text-sm rounded text-white bg-blue-600 float-right"
        @click.prevent="showForm = !showForm">
        <i class="fa fa-pencil-alt"></i>
      </button>
    </div>
    <div v-show="showForm">
      <div
        v-if="show_alert"
        class="p-4 mb-4 rounded text-white text-center font-bold"
        :class="alert_variant">
        {{ alert_message }}
      </div>
      <vee-form :validation-schema="compositionSchema" :initial-values="song" @submit="update">
        <div class="mb-3">
          <!-- Song Title -->
          <label class="inline-block mb-2">Song Title</label>
          <vee-field name="modified_name" :bails="false" v-slot="{ field, errors }">
            <input
              v-bind="field"
              type="text"
              class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
              placeholder="Enter Song Title"
              @input="updateUnsavedFlag(true)" />
            <div dir="rtl" class="text-left text-red-600" v-for="error in errors" :key="error">
              {{ error }}
            </div>
          </vee-field>
        </div>
        <div class="mb-3">
          <!-- Genre -->
          <label class="inline-block mb-2">Genre</label>
          <vee-field name="genre" :bails="false" v-slot="{ field, errors }">
            <input
              v-bind="field"
              type="text"
              class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
              placeholder="Enter Genre"
              @input="updateUnsavedFlag(true)" />
            <div dir="rtl" class="text-left rtl text-red-600" v-for="error in errors" :key="error">
              {{ error }}
            </div>
          </vee-field>
        </div>
        <button
          type="submit"
          class="py-1.5 px-3 rounded text-white bg-green-600"
          :disabled="in_submition">
          Submit
        </button>
        <button
          type="button"
          class="py-1.5 px-3 rounded text-white bg-gray-600"
          :disabled="in_submition"
          @click.prevent="showForm = false">
          Go Back
        </button>
      </vee-form>
    </div>
  </div>
</template>

<script>
import { songsCollection, storage } from '@/includes/firebase'

export default {
  name: 'CompositionItem',
  props: {
    song: {
      type: Object,
      required: true
    },
    updateSong: {
      type: Function,
      required: true
    },
    delSong: {
      type: Function,
      required: true
    },
    index: {
      type: Number,
      required: true,
      validator(i) {
        return i >= 0
      }
    },
    updateUnsavedFlag: {
      type: Function
    }
  },
  data() {
    return {
      showForm: false,
      compositionSchema: {
        modified_name: 'required',
        genre: 'alpha_spaces'
      },
      in_submition: false,
      show_alert: false,
      alert_variant: 'bg-blue-400',
      alert_message: 'Please wait! Updating song info.'
    }
  },
  methods: {
    async update(values) {
      this.in_submition = true
      this.show_alert = true
      this.alert_variant = 'bg-blue-500'
      this.alert_message = 'Please wait! Updating song info.'

      try {
        await songsCollection.doc(this.song.docID).update(values)
        this.in_submition = false
        this.alert_variant = 'bg-red-500'
      } catch (err) {
        this.in_submition = false
        this.alert_variant = 'bg-red-500'
        this.alert_message = 'Something went wrong! Try again later!'
        return
      }

      this.in_submition = false
      this.alert_variant = 'bg-green-500'
      this.alert_message = 'Success!'
      this.updateSong(this.index, values)
    },
    async deleteSong() {
      const storageRef = storage.ref()
      const songRef = storageRef.child(`songs/${this.song.original_name}`)

      try {
        await songRef.delete()

        await songsCollection.doc(this.song.docID).delete()
      } catch (err) {
        return
      }

      this.delSong(this.index)
    }
  }
}
</script>
