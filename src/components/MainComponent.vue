<template>
    <div id='main-component'>
        <div class='bookmark-group-wrapper'
            v-for='(group, index) in bookmarkGroups.getGroups()'
            v-bind:key='index'
            v-bind:id='index'>   
            <BookmarkGroup 
                v-bind:groupModel='group'>
            
            </BookmarkGroup>
        </div>
        <NewGroupModal v-bind:showing='showNewGroupModal' 
            :saveName='saveGroupModal'
            :closeName='closeGroupModal'
            :allGroups='bookmarkGroups'
            @clickedSave='closeNewFolderModal()'
            @clickedClose='closeNewFolderModal()' 
            v-show='showNewGroupModal'> <!-- clickedClose doesn't work forr some reason ... maybe it can't call the same method-->
        </NewGroupModal>
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

import BookmarkModel from '@/js/BookmarkModel.js'
import BookmarkGroupModel from '@/js/BookmarkGroupModel.js'
import AllBookmarkGroups from '@/js/AllBookmarkGroups.js'
//import Bookmark from '@/components/Bookmark.vue'
import BookmarkGroup from '@/components/BookmarkGroup.vue'
import NewGroupModal from '@/components/NewGroupModal.vue'
import AddStuffButton from '@/components/AddStuffButton.vue'
//import AddGroupEmitter from '@/js/AddGroupEmitter.js'

export default {
    components: {
        //Bookmark,
        BookmarkGroup,
        NewGroupModal,
        AddStuffButton //is this an instance?...
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
            newGroupEmitterObject: null
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
            alert('clicked new group')
        },
        closeNewFolderModal: function(){
            this.showNewGroupModal = false;
        }
    },
    created() {
        var defaultGroup = new BookmarkGroupModel(0);
        defaultGroup.setName('Default');
        defaultGroup.setColor('lightgray');
        defaultGroup.setDefault(true);
        this.bookmarkGroups.pushGroup(defaultGroup);

        //this.newGroupEmitterObject = new AddGroupEmitter(AddStuffButton);


/*         this.addGroup('misc');
        this.addGroup('utilities');
        this.addGroup('pupular'); */
    }


    /* fixed forms not resetting; also tried to replace add group button with universal one but I can't emit variable names... */
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




