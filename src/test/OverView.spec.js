import { mount } from '@vue/test-utils'
// HACK: For some reason tests run in the test folder, so '~' and '@' don't work.
import OverView from '../components/OverView.vue'

describe('OverView', () => {
  test('is a Vue instance', () => {
    const wrapper = mount(OverView)
    expect(wrapper.vm).toBeTruthy()
  })
})
