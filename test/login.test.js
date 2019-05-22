import { mount } from '@vue/test-utils'
import Login from '../src/client/src/views/Login.vue'

describe('Login', () => {

    it('requires email', () => {
        const wrapper = mount(Login);
        expect(wrapper.contains('v-text-field')).toBe(true);
    })
})