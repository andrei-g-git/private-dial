import BookmarkGroup from '@/components/BookmarkGroup.vue'
import { shallowMount } from '@vue/test-utils'

let wrapper = null;

beforeEach(() => {
    wrapper = shallowMount(BookmarkGroup, {
        propsData: {
            groupModel: new BookmarkGroupModelMOCK(0)
        }
    });
});

afterEach(() => {
    wrapper.destroy();
});

describe('BookmarkGroup', () => {
    it('has a valid name', () => {
        var group = wrapper.find('.bookmark-group');
        expect(group.text()).toBe('some name');
    });

    it('renders all bookmarks inside the group', async () => {

        await wrapper.vm.groupModel.pushBookmark(new BookmarkModelMOCK('https://wikipedia.org/wiki/blah'));
        await wrapper.vm.groupModel.pushBookmark(new BookmarkModelMOCK('https://youtube.com/watch/balls'));
        await wrapper.vm.groupModel.pushBookmark(new BookmarkModelMOCK('https://jestjs.io/docs/en/tutorial-react#snapshot-testing-with-mocks-enzyme-and-react-16'));
        await wrapper.vm.groupModel.pushBookmark(new BookmarkModelMOCK('https://stackoverflow.com/questions/45195025/what-is-the-difference-between-tobe-and-toequal-in-jest'));


        const bookmarkElements = wrapper.findAll('.bookmark-wrapper');
        expect(bookmarkElements.length).toBe(4);
    });

    it('rednders the bk color stored in the model', async () => {
        wrapper.destroy();
        var model = new BookmarkGroupModelMOCK(0);
        model.setColor('red');
        wrappepr = shallowMount(BookmarkGroup, {
            propsData: {
                groupModel: model
            }
        });
        var testGroup = await wrapper.find('#bookmark-group-0');
        var bgColor = testGroup.attributes().style.color;
        expect(bgColor).toBe('red');
    });
});





class BookmarkModelMOCK{
    constructor(enteredURL){
        this.enteredURL = enteredURL;
    }
}
class BookmarkGroupModelMOCK{ //apparently when you mess these up and you call a function or property that doesn't exist the whole wrapper parent fails to mount and it's null
    name; color; default = false;

    constructor(index){
        this.index = index;
        this.bookmarks = new Array();
    }

    getIndex(){return this.index;}
    setIndex(index){this.index = index;}

    getName(){return this.name;}
    setName(name){this.name = name;}

    getColor(){return this.color;}
    setColor(color){this.color = color;}

    isDefault(){return this.default;}
    setDefault(bool){this.default = bool;}

    getBookmarks(){return this.bookmarks;}

    pushBookmark(bookmark){
        this.bookmarks.push(bookmark);
    }

    spliceBookmarks(bookmark){
        this.bookmarks.splice(bookmark, 1);
    }
}






