import { mount } from '@vue/test-utils'
// HACK: For some reason tests run in the test folder, so '~' and '@' don't work.
import NuxtLogo from '../components/NuxtLogo.vue'

describe('NuxtLogo', () => {
  test('is a Vue instance', () => {
    const wrapper = mount(NuxtLogo)
    expect(wrapper.vm).toBeTruthy()
  })
})
