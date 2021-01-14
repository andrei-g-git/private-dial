import AddGroupButton from '@/components/AddGroupButton.vue'
import { shallowMount } from '@vue/test-utils'

let wrapper = null;

beforeEach(() => {
    wrapper = shallowMount(AddGroupButton);
});

afterEach(() => {
    wrapper.destroy();
});

describe('AddGroupButton', () => {
    it('sends the click event', async () => {

        await wrapper.find('.add-group').trigger('click');
        expect(wrapper.emitted().clickedAddGroup).toBeTruthy();
    });
});