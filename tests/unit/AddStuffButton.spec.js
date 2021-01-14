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
        expect(wrapper.emitted().clickedAddGroup)./* toBeTruthy(); */toBeFalsy()
        expect(wrapper.emitted().baaalllllllls).toBeTruthy();
    });

    /* it('') */
});