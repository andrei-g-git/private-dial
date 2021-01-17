<template>
    <div contextmenu="bookmark-contextmenu"
        id="bookmark-context-menu">
        <menu type="context" 
            id="bookmark-context">
            <div class="menu-item"> <!-- this doesn't add the class to all menuitems, it just creates a monolithic wrapper -->
                <menuitem @click="onClickDelete()"> Delete -hardcoded- </menuitem> <!-- The model seems to retain the correct 
                                                                bookmarks after one's deletion but this loop renders an incorect list... -->
                <menuitem @click="onClickEdit()"> Edit -hardcoded- </menuitem>
            </div>
        </menu>
    </div>
</template>

<script>
export default {
    methods: {
        onClickDelete: function(){
            this.$emit('clickedDeleteBookmarkMenuItem');
        }               
    }
}
</script>

<style scoped>
    #bookmark-context-menu{
        width: 150px;
        border: solid 1px gray;
        z-index: 99;
        box-shadow: 0px 0px 15px;
    }
    #bookmark-context{
        width: 100%;
        padding: 5px 10px 5px 10px;
    }
    .menu-item{
        display: block;
    } 
    .menuitem{
        margin-bottom: 5px; /* doesn't work here or in the menu-item class */
    }
    .menu-item :hover{
        background-color: rgb(200, 200, 200);
        /* color: green; */
    }   
</style>