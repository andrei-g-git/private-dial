import NewBookmarkModal from '@/components/NewBookmarkModal.vue';
import { shallowMount } from '@vue/test-utils';

let wrapper = null;

beforeEach(() => {
    wrapper = shallowMount(NewBookmarkModal, {
        propsData: {
            bookmarkGroup: new BookmarkGroupModelMOCK(0)
        }
    });
});

afterEach(() => {
    wrapper.destroy();
});

describe('NewBookmarkModal', () => {
    it('adds a new bookmark', async () => {
        var input = wrapper.find('#url-field');
        await input.setValue('https://www.wikipedia.org/wiki/midgets');
        var button = wrapper.find('.save-bookmark-button');
        await button.trigger('click');
        expect(wrapper.vm.bookmarkGroup.getLength()).toBe(1);
    });

    it('resets the forms after saving or closing', async () => {
        var input = wrapper.find('#url-field');
        await input.setValue('www should be deleted dot org');
        var button = wrapper.find('.save-bookmark-button');
        await button.trigger('click');
        
        expect(input.element.value).toBe('random string'); //should be '' obviously
    });
});



class BookmarkGroupModelMOCK{
    constructor(index){
        this.index = index;
        this.bookmarks = new Array();
    }
    getBookmarks(){return this.bookmarks;}

    pushBookmark(bookmark){
        this.bookmarks.push(bookmark);
    }
    getLength(){
        return this.bookmarks.length;
    }
}

class BookmarkModel {
    constructor(enteredURL){
        this.enteredURL = enteredURL;
    }

    getEnteredURL(){return this.enteredURL;}
    setEnteredURL(enteredURL){this.enteredURL = enteredURL}
}