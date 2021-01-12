export default class BookmarkModelGroup {

    name; color;

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

    getBookmarks(){return this.bookmarks;}

    pushBookmark(bookmark){
        this.bookmarks.push(bookmark);
    }

    spliceBookmarks(bookmark){
        this.bookmarks.splice(bookmark, 1);
    }
}