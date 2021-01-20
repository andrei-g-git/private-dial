import NewGoroupModal from '@/components/NewGroupModal.vue'
import { shallowMount } from '@vue/test-utils'

let wrapper = null;

beforeEach(() => {

});

afterEach(() => {
    wrapper.destroy();
});

describe( 'NewGroupModal',() => {

    it('adds a new group with correct name and color', async () =>{
        wrapper = shallowMount(NewGoroupModal, {
            propsData: {
                allGroups: new AllBookmarkGroupsMOCK()
            }
        });
        expect(wrapper.vm.allGroups.getLength()).toBe(0);

        var input = wrapper.find('.name-field');
        expect(input.text()).toBe('');
        await input.setValue('science');
        expect(input.element.value).toBe('science'); //I think this is basically a tautology
        var button = wrapper.find('.save-button');

        input = wrapper.find('#color-field');
        await input.setValue('#b96a97');
        await button.trigger('click');

        expect(wrapper.vm.allGroups.getLength()).toBe(1);                                                            
    });
});

class BookmarkGroupModelMOCK{
    constructor(index){
        this.index = index;
        this.bookmarks = new Array();
    }
    pushBookmark(bookmark){
        this.bookmarks.push(bookmark);
    }
    getName(){
        return 'placeholder';
    }
    getBookmarks(){return this.bookmarks;}
}

class AllBookmarkGroupsMOCK {
    constructor(){
        this.groups = new Array();
    }

    pushGroup(group){
        this.groups.push(group);
    }
    getLength(){
        return this.groups.length;
    }
    getNameAt(index){
        return this.groups[index].getName();
    }
}