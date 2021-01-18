<template>
    <div id='main-component'>
        <div class='bookmark-group-wrapper'
            v-for='(group, index) in bookmarkGroups.getGroups()'
            v-bind:key='index'
            v-bind:id='index'>   
            <BookmarkGroup 
                v-bind:groupModel='group'
                @performSavableAction='savePrettyMuchEverything()'
                @clickedAddBookmark='openBookmarkModal($event)'
                @deletedBookmark="savePrettyMuchEverything()">
                <!-- @genericAddStuff='onClickAddBookmark()'> --> <!-- from bookmark modal (grandchild) -->
            </BookmarkGroup>
        </div> <!-- v-bind:showing='showNewGroupModal' -->
        <NewGroupModal  
            :saveName='saveGroupModal'
            :closeName='closeGroupModal'
            :allGroups='bookmarkGroups'
            @clickedSave='closeNewFolderModal() ;
                savePrettyMuchEverything()'
            @clickedClose='closeNewFolderModal()' 
            v-show='showNewGroupModal'> 
        </NewGroupModal>
                <!-- giving the bookmark modal below the correct bookmarks is going to be a problem because, before, it was getting it from the v-for loop above as a prop... -->
        <NewBookmarkModal
            v-show="showNewBookmarkModal"
            :bookmarkGroup="openedGroup"
            @clickedSaveBookmark="closeNewBookmarkModal() ;
                savePrettyMuchEverything()"

            :saveBookmarkName='saveBookmarkButtonName'
            :groupIndex='indexOfRequestingGroup'>
        </NewBookmarkModal> 
        <div class='add-group-button-wrapper'>
            <AddStuffButton 
                :imageName='groupButtonImgName'
                @genericAddStuff='onClickAddGroup()'>
            </AddStuffButton> 
        </div>
                    <!-- v-on:[addStuffButtonEvent]='onClickAddGroup()'> -->
            <!-- v-on='{ click: onClickAddGroup()}'> -->
            <!-- @clickedAddGroup='onClickAddGroup()'></AddStuffButton> -->

            <!-- :eventName='groupButtonEmitterName' --> <!-- :emitterObject='newGroupEmitterObject' --> 

    </div>
</template>

<script>

import BookmarkModel from '@/js/BookmarkModel.js';
import BookmarkGroupModel from '@/js/BookmarkGroupModel.js';
import AllBookmarkGroups from '@/js/AllBookmarkGroups.js';
//import Bookmark from '@/components/Bookmark.vue';
import BookmarkGroup from '@/components/BookmarkGroup.vue';
import NewGroupModal from '@/components/NewGroupModal.vue';
import AddStuffButton from '@/components/AddStuffButton.vue';
//import AddGroupEmitter from '@/js/AddGroupEmitter.js';
import SaverAndLoader from '@/js/SaverAndLoader.js';
import NewBookmarkModal from '@/components/NewBookmarkModal.vue'

export default {
    components: {
        //Bookmark,
        BookmarkGroup,
        NewGroupModal,
        AddStuffButton, //is this an instance?...
        NewBookmarkModal
    },
    data: function(){
        return {
            bookmarkGroups: new AllBookmarkGroups(),
            showNewGroupModal: false,
            addGroupButtonName: 'Add Group',
            saveGroupModal: 'Save',
            closeGroupModal: 'Close',
            //groupButtonEmitterName: 'clickedAddGroup',
            groupButtonImgName: /* '../assets/ */'new folder.png',
            newGroupEmitterObject: null,
            saverAndLoader: new SaverAndLoader(),
            showNewBookmarkModal: false,
            saveBookmarkButtonName: 'Save',
            indexOfRequestingGroup: 0,
            openedGroup: null
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
/*         onClickAddBookmark: function () {
            //alert('added new bookmark')
            this.showNewBookmarkModal = true;
        }, */
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
                    //loadedGroup.pushBookmark(bookmarkPlaceholder); --loadedGroup is just the jsonParsedObject, doesn't have functions
                    groupPlaceholder.pushBookmark(bookmarkPlaceholder);
                }

                allGroupsPlaceholder.pushGroup(groupPlaceholder);  
            }
            return allGroupsPlaceholder;
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
        //alert(loaded + "   " + loaded.getLength());                                                       

    }
}
</script>

<style scoped>

.bookmark-group-wrapper{
    display: inline-block;
    margin: 10px;
}
.add-group-button-wrapper{
        width: 5%;
        float: right;
}
</style>




