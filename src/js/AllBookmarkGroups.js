export default class AllBookmarkGroups {
    constructor(){
        this.groups = new Array();
    }

    pushGroup(group){
        this.groups.push(group);
    }

    pushBookmarkAtGroupIndex(bookmark, index){
        this.groups[index].pushBookmark(bookmark);
    }

    spliceGroups(group){
        this.groups.splice(group, 1);
    }

    getLength(){
        return this.groups.length;
    }

    getGroupAt(index){
        return this.groups[index];
    }

    getGroups(){
        return this.groups;
    }

    getNameAt(index){
        return this.groups[index].getName();
    }
}