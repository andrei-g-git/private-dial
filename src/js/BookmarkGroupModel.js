export default class BookmarkModelGroup {

    name;

    constructor(index){
        this.index = index;
        this.bookmarks = new Array();
    }

    getIndex(){return this.index;}
    setIndex(index){this.index = index;}

    getName(){return this.name;}
    setName(name){this.name = name;}

    getBookmarks(){return this.bookmarks;}

    pushBookmark(bookmark){
        this.bookmarks.push(bookmark);
    }

    spliceBookmarks(bookmark){
        this.bookmarks.splice(bookmark, 1);
    }
}