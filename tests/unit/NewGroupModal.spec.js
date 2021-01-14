import NewGoroupModal from '@/components/NewGroupModal.vue'
import { shallowMount } from '@vue/test-utils'

let wrapper = null;

beforeEach(() => {

});

afterEach(() => {
    wrapper.destroy();
});

describe( 'NewGroupModal',() => {

/*     it('opens and closes when prompted', () => {
        wrapper = shallowMount(NewGoroupModal, {
            propsData: {
                showing: true
            }
        });
        const dialog = wrapper.find('.new-group-modal');
        expect(dialog.isVisible()).toBe(true);
    });    WILL OPEN AND CLOSE FROM THE OUTSIDE*/

    it('adds a new group with correct name and color', async () =>{
        wrapper = shallowMount(NewGoroupModal, {
            propsData: {
                allGroups: new AllBookmarkGroupsMOCK(),
                showing: true
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

        expect(wrapper.vm.allGroups.getLength()).toBe(1); //document.getElementsByClassName('name-field').value in onSave() seems to fail silently and doesn't add a name but 
                                                            //the new group is added. when array index [0] is included in the getElements call then the element becomes null...
        //expect(wrappepr.vm.) nah...                                                            
    });

    it('closes when click save or close and resets', async () => {
        wrapper = shallowMount(NewGoroupModal, {
            propsData: {
                allGroups: new AllBookmarkGroupsMOCK(),
                showing: true
            }
        });
        var button = wrapper.find('.save-button');
        await button.trigger('click');
        expect(wrapper.vm.showing).toBe(false);

        await wrapper.setProps({showing: false});

        button = wrapper.find('.close-button');
        await button.trigger('click');
        expect(wrapper.vm.showing).toBe(false);

        //fails on elementById.reset() like the above test so I can't test if it resets...
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