import AddStuffButton from '@/components/AddStuffButton.vue'
import { shallowMount } from '@vue/test-utils'

let wrapper = null;

beforeEach(() => {
    wrapper = shallowMount(AddStuffButton, {
        propsData: 'clackityClick'
    });
});

afterEach(() => {
    wrapper.destroy();
});

describe('AddStuffButton', () => {
    it('sends the right click event', async () => {

        await wrapper.find('.add-stuff-buttton').trigger('click');
        expect(wrapper.emitted().clickedAddGroup).toBeFalsy()
        expect(wrapper.emitted().should_be_false).toBeTruthy();
    });
});