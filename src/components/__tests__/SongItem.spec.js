const { shallowMount, RouterLinkStub } = require('@vue/test-utils')
import { describe, test, expect } from 'vitest'

import SongItem from '@/components/SongItem.vue'

describe('Song Item', () => {
  test('render song.display_name', () => {
    const song = {
      display_name: 'test'
    }

    const wrapper = shallowMount(SongItem, {
      props: {
        song
      },
      global: {
        components: {
          'router-link': RouterLinkStub
        }
      }
    })

    expect(wrapper.text()).toContain(song.display_name)
  })
})
