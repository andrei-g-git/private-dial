<template>
    <div id='main-component'>
        <div id="all-groups-container">
            <div class='bookmark-group-wrapper'
                v-for='(group, index) in bookmarkGroups.getGroups()'
                v-bind:key='index'
                v-bind:id='index'>   
                <BookmarkGroup 
                    v-bind:groupModel='group'
                    @performSavableAction='savePrettyMuchEverything()'
                    @clickedAddBookmark='openBookmarkModal($event)'
                    
                    @rightClickedBookmark="openBookmarkContextMenu($event) ; 
                        recordBookmark($event) ;
                        recordGroupOfClickedBookmark(group)">
                </BookmarkGroup>
            </div> 
        </div>
        <div id="right-main-area">
            <div class='add-group-button-wrapper'>
                <AddStuffButton 
                    :imageName='groupButtonImgName'
                    @genericAddStuff='onClickAddGroup()'>
                </AddStuffButton> 
            </div>
        </div>
        <NewGroupModal  
            :saveName='saveGroupModal'
            :closeName='closeGroupModal'
            :allGroups='bookmarkGroups'
            @clickedSave='closeNewFolderModal() ;
                savePrettyMuchEverything()'
            @clickedClose='closeNewFolderModal()' 
            v-show='showNewGroupModal'> 
        </NewGroupModal>
        <NewBookmarkModal
            v-show="showNewBookmarkModal"
            :bookmarkGroup="openedGroup"
            @clickedSaveBookmark="closeNewBookmarkModal() ;
                savePrettyMuchEverything()"

            :saveBookmarkName='saveBookmarkButtonName'
            :groupIndex='indexOfRequestingGroup'>
        </NewBookmarkModal> 

        <BookmarkContextMenu 
            v-show='showContext'
            @clickedDeleteBookmarkMenuItem='deleteBookmark(getRightClickedBookmark())'
            @clickedEditBookmark='editBookmark(getRightClickedBookmark())'>
        </BookmarkContextMenu>
    </div>
</template>

<script>

import BookmarkModel from '@/js/BookmarkModel.js';
import BookmarkGroupModel from '@/js/BookmarkGroupModel.js';
import AllBookmarkGroups from '@/js/AllBookmarkGroups.js';
import BookmarkGroup from '@/components/BookmarkGroup.vue';
import NewGroupModal from '@/components/NewGroupModal.vue';
import AddStuffButton from '@/components/AddStuffButton.vue';
import SaverAndLoader from '@/js/SaverAndLoader.js';
import NewBookmarkModal from '@/components/NewBookmarkModal.vue';
import BookmarkContextMenu from '@/components/BookmarkContextMenu.vue';

export default {
    components: {
        BookmarkGroup,
        NewGroupModal,
        AddStuffButton, //is this an instance?...
        NewBookmarkModal,
        BookmarkContextMenu
    },
    data: function(){
        return {
            bookmarkGroups: new AllBookmarkGroups(),
            showNewGroupModal: false,
            addGroupButtonName: 'Add Group',
            saveGroupModal: 'Save',
            closeGroupModal: 'Close',
            groupButtonImgName: 'new folder.png',
            newGroupEmitterObject: null,
            saverAndLoader: new SaverAndLoader(),
            showNewBookmarkModal: false,
            saveBookmarkButtonName: 'Save',
            indexOfRequestingGroup: 0,
            openedGroup: null,
            showContext: false,
            rightClickedBookmark: null,
            groupOfRightClickedBookmark: null
        }
    },
    methods: {
        addBookmark: function(url, index){
            var bookmark = new BookmarkModel(url);
            this.bookmarkGroups.pushBookmarkAtGroupIndex(bookmark, index);
        },
        addGroup: function(name){
            var groupsLength = this.bookmarkGroups.getLength();
            var newGroup = new BookmarkGroupModel(groupsLength);
            newGroup.setName(name);
            this.bookmarkGroups.pushGroup(newGroup);
        },
        onClickAddGroup: function(){
            this.showNewGroupModal = true;
        },
        closeNewFolderModal: function(){
            this.showNewGroupModal = false;
        },
        closeNewBookmarkModal: function () {
            this.showNewBookmarkModal = false;
        },
        openBookmarkModal(groupIndex){
            this.showNewBookmarkModal = true;
            this.indexOfRequestingGroup = groupIndex;
            this.openedGroup = this.bookmarkGroups.getGroupAt(groupIndex);
            console.log(this.openedGroup.getIndex());
        },
        savePrettyMuchEverything: function(){
            this.saverAndLoader.saveObject('bookmarkGroups', this.bookmarkGroups);
        },
        loadPrettyMuchEverything: function(){ //this is bullshit I should't have to do this I went to harvard
            var allGroupsPlaceholder = new AllBookmarkGroups();
            var loadedGroupsData = this.saverAndLoader.loadObject('bookmarkGroups');
            for(var i = 0; i < loadedGroupsData.groups.length; i++){
                var loadedGroup = loadedGroupsData.groups[i];
                var groupPlaceholder = new BookmarkGroupModel(i);
                groupPlaceholder.setName(loadedGroup.name);
                groupPlaceholder.setColor(loadedGroup.color);
                groupPlaceholder.setDefault(loadedGroup.default);

                for(var j = 0; j < loadedGroup.bookmarks.length; j++){
                    var loadedBookmark = loadedGroup.bookmarks[j];
                    var url = loadedBookmark.enteredURL;
                    var bookmarkPlaceholder = new BookmarkModel(url);
                    groupPlaceholder.pushBookmark(bookmarkPlaceholder);
                }

                allGroupsPlaceholder.pushGroup(groupPlaceholder);  
            }
            return allGroupsPlaceholder;
        },
        // eslint-disable-next-line no-unused-vars 
        openBookmarkContextMenu(bookmarkIndex){ //this opens the normal event first because the event listener that prevents default is added only afterwards, I think
            var menu = document.querySelector('#bookmark-context-menu');

            this.showContext = true;

            menu.style.top = event.clientY + "px";
            menu.style.left = event.clientX + "px"; // so because I set the element's position probably before it can call preventDefault in it's own listener the 
                                                    // default context menu opens first 
        },
        recordBookmark: function(bookmark){
            this.rightClickedBookmark = bookmark;
        },
        recordGroupOfClickedBookmark: function(passedGroup){
            this.groupOfRightClickedBookmark = passedGroup;
        },
        getRightClickedBookmark: function(){
            return this.rightClickedBookmark;
        },
        deleteBookmark: function(bookmarkObject){
            this.groupOfRightClickedBookmark.getBookmarks().splice(this.getBookmarkIndex(bookmarkObject), 1); //######################################
            this.rightClickedBookmark = null; //should be here as well
            this.showContext = false;
            this.savePrettyMuchEverything();
        },
        // eslint-disable-next-line no-unused-vars
        editBookmark: function(bookmarkObject){
            this.showContext = false;
        },   
        getBookmarkIndex: function(bookmark){
            return this.groupOfRightClickedBookmark.getBookmarks().indexOf(bookmark); //############################################
        },     
    },
    created() {
        var defaultGroup = new BookmarkGroupModel(0);
        defaultGroup.setName('Default');
        defaultGroup.setColor('lightgray');
        defaultGroup.setDefault(true);
        this.bookmarkGroups.pushGroup(defaultGroup);

        var loaded = this.loadPrettyMuchEverything();
        if(loaded.getLength()){ //i m already doing this in the object, should remove the redundancy
            this.bookmarkGroups = loaded; // I also have to trigger the save function in the 
        }                                   // bookmark modal as well and use that thing where it emits the event to the grandparent
    },
    mounted(){
        var menu = document.querySelector('#bookmark-context-menu');
        menu.addEventListener('mouseleave'/* 'mouseout' */, () =>{
            this.showContext = false;
            //this.rightClickedBookmark = null; //this might reset the clicked bookmark before a menu item is clicked
        });
    }
}
</script>

<style scoped>

#main-component{
    height: 100vh;
}
#right-main-area{
    float: right;
    right: 0;
    position: absolute;
    padding: 5px;
    width: 60px;
    height: 100%;
    background-color: white;
    box-shadow: 0px 0px 5px;
}
#all-groups-container{
    /* overflow-x: scroll; */
    overflow: hidden; /* browser already has horizontal scroll bar */
    white-space: nowrap;
    /* width: 95%; */
    height: 98%;

    float: left;
}
.bookmark-group-wrapper{
    display: inline-block;
    vertical-align: top;
    margin: 10px;
}
.add-group-button-wrapper{
    /* width: 5%; */
    width: 50px;
    float: right;
}
</style>




