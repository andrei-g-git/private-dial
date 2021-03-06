<template>
    <div id='main-component'>
        <div id="all-groups-container">
            <div class='bookmark-group-wrapper'
                v-for='(group, index) in bookmarkGroups.getGroups()'
                :key='index'
                :id='index'>   
                <BookmarkGroup 
                    :groupModel='group'
                    @performSavableAction='savePrettyMuchEverything()'
                    @clickedEditGroup='openEditGroupModal($event)'
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
        <NewGroupModal :allGroups='bookmarkGroups'

            @clickedSave='closeNewFolderModal() ;
                savePrettyMuchEverything()'
            @clickedClose='closeNewFolderModal()' 
            v-show='showNewGroupModal'> <!--             :saveName='saveGroupModal'
            :closeName='closeGroupModal' -->            
        </NewGroupModal>

        <NewBookmarkModal
            v-show="showNewBookmarkModal"
            :bookmarkGroup="openedGroup"
            @clickedSaveBookmark="closeNewBookmarkModal() ;
                savePrettyMuchEverything()"

            :saveBookmarkName='saveBookmarkButtonName'
            :groupIndex='indexOfRequestingGroup'>
        </NewBookmarkModal> 

        <EditGroupModal
            v-show="showEditGroupModal"

            :allGroups="bookmarkGroups"
            @clickedSave='closeNewFolderModal() ;
                savePrettyMuchEverything()'
            @clickedClose='closeNewFolderModal()'> <!-- meh... -->

            <!--             :saveName="saveGroupModal"
            :closeName="closeGroupModal" -->

        </EditGroupModal>            

        <BookmarkContextMenu 
            v-show='showContext'
            @clickedDeleteBookmarkMenuItem='deleteBookmark(getRightClickedBookmark())'
            @clickedEditBookmark='editBookmark(getRightClickedBookmark())'>
            <template v-slot:menu-item-1> Delete </template>
            <template v-slot:menu-item-2> Edit </template>
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
import EditGroupModal from '@/components/EditGroupModal.vue';

export default {
    components: {
        BookmarkGroup,
        NewGroupModal,
        AddStuffButton, 
        NewBookmarkModal,
        BookmarkContextMenu,
        EditGroupModal
    },
    data: function(){
        return {
            bookmarkGroups: new AllBookmarkGroups(),
            showNewGroupModal: false,
            addGroupButtonName: 'Add Group',
/*             saveGroupModal: 'Save',
            closeGroupModal: 'Close', */
            groupButtonImgName: 'new folder.png',
            newGroupEmitterObject: null,
            saverAndLoader: new SaverAndLoader(),
            showNewBookmarkModal: false,
            showEditGroupModal: false,
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
            this.showEditGroupModal = false; //meeeehhhhhhhhhh
        },
        closeNewBookmarkModal: function () {
            this.showNewBookmarkModal = false;
        },
        openBookmarkModal: function(groupIndex){
            this.showNewBookmarkModal = true;
            this.indexOfRequestingGroup = groupIndex;
            this.openedGroup = this.bookmarkGroups.getGroupAt(groupIndex);
            console.log(this.openedGroup.getIndex());
        },
        openEditGroupModal: function(groupIndex){
            this.showEditGroupModal = true;
            this.indexOfRequestingGroup = groupIndex; //careful here
        },
        savePrettyMuchEverything: function(){
            this.saverAndLoader.saveObject('bookmarkGroups', this.bookmarkGroups);
        },
        loadPrettyMuchEverything: function(){
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
        openBookmarkContextMenu(bookmarkIndex){
            var menu = document.querySelector('#bookmark-context-menu');

            this.showContext = true;

            menu.style.top = event.clientY + "px";
            menu.style.left = event.clientX + "px";
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
            this.groupOfRightClickedBookmark.getBookmarks().splice(this.getBookmarkIndex(bookmarkObject), 1); 
            this.rightClickedBookmark = null; 
            this.showContext = false;
            this.savePrettyMuchEverything();
        },
        // eslint-disable-next-line no-unused-vars
        editBookmark: function(bookmarkObject){
            this.showContext = false;
        },   
        getBookmarkIndex: function(bookmark){
            return this.groupOfRightClickedBookmark.getBookmarks().indexOf(bookmark);
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
            this.bookmarkGroups = loaded; 
        }                          
    },
    mounted(){
        var menu = document.querySelector('#bookmark-context-menu');
        menu.addEventListener('mouseleave'/* 'mouseout' */, () =>{
            this.showContext = false;
        });
    }
}
</script>

<style scoped>

/* #main-component{
    height: 100vh;   this causes the contextmenu to gain a big empty space on top of the menu items, which seemingly disappear 
} */
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
    overflow: hidden; 
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
    width: 50px;
    float: right;
}
</style>




