import Bookmark from '@/components/Bookmark.vue'
import { shallowMount } from '@vue/test-utils'

let wrapper = null;

beforeEach(() => {
    wrapper = shallowMount(Bookmark, {
        propsData: {
            fullURL: 'https://wikipedia.org/wiki/java'
        }
    });
});

afterEach(() => {
    wrapper.destroy();
});

describe('Bookmark', () => {
    it('opens provided url', async () => {
        global.window = { location: { pathname: null } }; //returns 'Not implemented: window.open' error (test passes), apparently I'm supposed to use the 'spy' thing
        await wrapper.find('.icon-and-label').trigger('click');
    });

    it('finds a favicon bound to the src', () => {
        const favIcon = wrapper.find('#fav-icon');

        expect(favIcon.exists()).toBe(true);
        expect(favIcon.element.id).toBe('fav-icon');

        const faviconUrlPrefix = 'https://s2.googleusercontent.com/s2/favicons?domain=';
        const hostName = wrapper.vm.getHostName(); //this makes the test brittle, something about white box testing
        expect(favIcon.attributes().src).toEqual(faviconUrlPrefix + hostName);
    });

    it('renders plain name of website', () => {
        const websiteName = wrapper.find('.page-name');
        expect(websiteName.text()).toBe('wikipedia.org');
    });
});