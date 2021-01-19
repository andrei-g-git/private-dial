<template>
    <div>
        <div class='bookmark-group-container'>
            <div :id="'bookmark-group-' + getGroupIndex()"
                class="bookmark-group"
                style="background-color: white">
                <div class="bookmark-button-wrapper">
                    <AddStuffButton
                        :buttonWidth="percentWidth"
                        :imageName="bookmarkButtonImgName"
                        @genericAddStuff="onClickAddBookmark()">
                        <!-- v-on="$listeners"> --> <!-- middleman between grandchild to grandparent -->
                        <!-- @genericAddStuff="onClickAddBookmark()"> -->
                    </AddStuffButton>
                </div>
                <p class="group-name">{{ groupName }}</p> 
            </div>
            <div class="bookmark-wrapper"
                v-for="(bookmark, index) in bookmarks.getBookmarks()"
                :key="index"
                :id='"bookmark" + getBookmarkIndex(bookmark)'
                @click.right=' 
                                  recordBookmark(bookmark) ;
                                  notifyParent()'><!-- openBookmarkContext(bookmark) ; --> 
                                  
                                                  <!-- The model seems to retain the correct bookmarks after one's deletion but this loop renders an incorect list... -->
                                                        <!-- I'm guessing it has something to do with the index not changing correctly? -->

                                                        <!-- INDEXES ARE GLOBAL so indexes from different groups will overlap (but I doubt that was causing the problem) -->
                <Bookmark 
                    :bookmarkModel="bookmark"> 
                </Bookmark>
            </div>

        </div>
        <!-- <div id="bookmark-context-wrapper"> -->
<!--             <BookmarkContextMenu 
                v-show='showContext'
                @clickedDeleteBookmarkMenuItem='deleteBookmark(getRightClickedBookmark())'
                @clickedEditBookmark='editBookmark(getRightClickedBookmark())'>
            </BookmarkContextMenu> --> <!-- not unique, each group has this, shouldn't be here -->
        <!-- </div>  -->       
    </div>
</template>

<script>
import Bookmark from "@/components/Bookmark.vue";
import AddStuffButton from "@/components/AddStuffButton.vue";
//import NewBookmarkModal from "@/components/NewBookmarkModal.vue";
//import BookmarkContextMenu from "@/components/BookmarkContextMenu.vue";

export default {
  components: {
    Bookmark,
    AddStuffButton,
    //NewBookmarkModal,
    //BookmarkContextMenu
  },
  data: function () {
    return {
      bookmarks: null,
      groupName: "should change",
      headerBackgroundColor: "",
      bookmarkButtonImgName: "new folder.png",
      percentWidth: "30%",
      showNewBookmarkModal: false,
      saveBookmarkButtonName: 'Save',
      showContext: false,
      rightClickedBookmark: null
    };
  },
  props: {
    //groupName: String, //might not need to be a prop
    groupModel: Object //these vue components will also have to act as controllers becuase they are easier to test that way, can't separate view from controller
  },
  methods: {
    getGroupIndex: function () {
      return this.groupModel.getIndex();
    },
    onClickAddBookmark: function () {
      //alert('added new bookmark')
      //this.showNewBookmarkModal = true;
      this.$emit('clickedAddBookmark', this.groupModel.getIndex());
    },
/*     closeNewBookmarkModal: function () {
      this.showNewBookmarkModal = false;
    }, */
/*     deleteBookmark: function(bookmarkObject){
      this.bookmarks.getBookmarks().splice(this.getBookmarkIndex(bookmarkObject), 1);
      this.rightClickedBookmark = null; //should be here as well
      this.$emit('deletedBookmark');
      this.showContext = false;
    },
    // eslint-disable-next-line no-unused-vars
    editBookmark: function(bookmarkObject){
        this.showContext = false;
    }, */
/*     openBookmarkContext(bookmarkObject){ //this opens the normal event first because the event listener that prevents default is added only afterwards, I think
      var menu = document.querySelector('#bookmark-context-menu');
      var bookmarkItem = document.getElementById("bookmark" + this.getBookmarkIndex(bookmarkObject));
      bookmarkItem.addEventListener('contextmenu', event =>{ //should only be added once or destroyed after the event is fired
        event.preventDefault();
        //this.showContext = true;
        this.showContextMenu();

        menu.style.top = event.clientY;
        menu.style.left = event.clientX;
      });
    }, */
    getBookmarkIndex: function(bookmark){
      return this.bookmarks.getBookmarks().indexOf(bookmark);
    },
    recordBookmark: function(bookmark){
      this.rightClickedBookmark = bookmark;
    },
    getRightClickedBookmark: function(){
      return this.rightClickedBookmark;
    },
    showContextMenu: function(){
        this.showContext = true;  
    },
    notifyParent: function(){
      this.$emit('rightClickedBookmark', this.getBookmarkIndex(this.getRightClickedBookmark()));
    }
  },
  beforeMount() {
      this.groupName = this.groupModel.getName();
      this.bookmarks = this.groupModel; /* .getBookmarks(); */
  },
  mounted() {
      /* this.groupName = this.groupModel.getName();
          this.bookmarks = this.groupModel.getBookmarks(); */

      var index = this.groupModel.getIndex();
      this.headerBackgroundColor = this.groupModel.getColor();


      var bookmarkGroupElement = document.getElementById("bookmark-group-" + index); 
      bookmarkGroupElement.style["background-color"] = this.headerBackgroundColor;  //   #### COMMENT OUT WHEN TESTING ###
      
      
      //I THINK THAT IF I CHANGE THE STYLE DYNAMICALLY THEN THE COMPONENT I SHALLOWMOUNT
      //INTO THE TEST BECOMES INVALID AND THE ENTIRE THING STARTS FAILING WITH
      //'CANNOT READ PROPERTY {WHATEVER} OF NULL
      //maybe it should be in the created hook? -- won't set the color then


      //var menu = document.querySelector('#bookmark-context-menu');
      //var menu = document.getElementById("bookmark-context-wrapper");
      //menu.addEventListener('mouseleave'/* 'mouseout' */, () =>{
      //  this.showContext = false;
      //  this.rightClickedBookmark = null; //this might reset the clicked bookmark before a menu item is clicked
      //});

  }
}
</script>

<style scoped>
    .bookmark-group-container{
        width: 200px;
        border: solid 1px gray;
        display: block;
    }
    .bookmark-group {
        width: 100%;/* 200px; */
        border: solid 1px gray;

        display: inline-block;

        position: relative;

        /* display: flex;
                align-items: baseline; */
    }
    .bookmark-button-wrapper {
        position: absolute;
        left: 0;
        /* float: left; */
        top: 50%;

        width: 10%;
    }
    .group-name {
        text-align: center;
    }
</style>