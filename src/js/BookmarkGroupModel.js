export default class BookmarkModelGroup {
    constructor(index){
        this.index = index;
        this.bookmarks = new Array();

        this.name = "";
        this.color = "";
        this.default = false;    
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

    getLength(){
        return this.bookmarks.length;
    }
    spliceBookmarks(bookmark){
        this.bookmarks.splice(bookmark, 1);
    }
}