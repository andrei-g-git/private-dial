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

        <AddStuffButton 
            :buttonImageSrc='groupButtonSrc'
            :eventName='groupButtonEmitterName'
            @clickedAddGroup='onClickAddGroup()'></AddStuffButton>

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

export default {
    components: {
        //Bookmark,
        BookmarkGroup,
        NewGroupModal,
        AddStuffButton
    },
    data: function(){
        return {
            bookmarkGroups: new AllBookmarkGroups(),
            showNewGroupModal: false,
            addGroupButtonName: 'Add Group',
            saveGroupModal: 'Save',
            closeGroupModal: 'Close',
            groupButtonEmitterName: 'clickedAddGroup',
            groupButtonSrc: '../assets/new folder.png'
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
        }
    },
    created() {
        var defaultGroup = new BookmarkGroupModel(0);
        defaultGroup.setName('Default');
        defaultGroup.setColor('lightgray');
        defaultGroup.setDefault(true);
        this.bookmarkGroups.pushGroup(defaultGroup);

/*         this.addGroup('misc');
        this.addGroup('utilities');
        this.addGroup('pupular'); */
    }


    /* fixed forms not resetting */
}
</script>

<style scoped>

.bookmark-group-wrapper{
    display: inline-block;
    margin: 10px;
}
</style>




