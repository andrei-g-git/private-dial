<template>
    <div contextmenu="bookmark-contextmenu"
        id="bookmark-context-menu">
        <menu type="context" 
            id="bookmark-context">
            <div class="menu-item"> <!-- this doesn't add the class to all menuitems, it just creates a monolithic wrapper -->
                <menuitem @click="onClickDelete()"> {{ deleteItemName }} </menuitem> <!-- The model seems to retain the correct bookmarks after one's deletion but this loop renders an incorect list... -->
                <menuitem @click="onClickEdit()"> {{ editItemName }} </menuitem> <!-- seems like the first item has a hidden height of a few hundred 
                                                                                    pixels which causes the contextmenu to display a large empty section before the items -->
            </div>
        </menu>
    </div>
</template>

<script>
export default {
    props:{
        deleteItemName: {
            type: String,
            default: "Item A"
        },
        editItemName: {
            type: String,
            default: "Item B"
        }
    },
    methods: {
        onClickDelete: function(){
            this.$emit('clickedDeleteBookmarkMenuItem');
        },
        onClickEdit(){
            this.$emit('clickedEditBookmark');
        }               
    }
}
</script>

<style scoped>
    #bookmark-context-menu{
        width: 150px;
        border: solid 1px gray;
        z-index: 9999;
        box-shadow: 0px 0px 15px;

        position: relative;
    }
    #bookmark-context{
        width: 100%;
        padding: 5px 10px 5px 10px;
    }
    .menu-item menuitem{
        display: block;
        margin-bottom: 5px;
    } 
    .menu-item menuitem:hover{
        background-color: rgb(200, 200, 200);
    }   
</style>