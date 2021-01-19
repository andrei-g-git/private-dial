<template>
    <div class='bookmark-inner-wrapper'
        id="bookmark-inner-wrapper">
        <div class='icon-and-label' v-on:click='openWebsite(fullURL)'>
            <img id='fav-icon' v-bind:src='concatFaviconURL(getHostName())'>
            <div class='page-name'>{{ removeSubdomain(hostName) }}</div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        bookmarkModel: Object
    },
    data: function(){
        return{
            googleIcongrabberPrefix: 'https://s2.googleusercontent.com/s2/favicons?domain=',
            fullURL: '',
            hostName: ''
        }
    },
    methods: {
        openWebsite: function(){
            window.open(this.fullURL, '_blank');
        },
        getHostName: function(){
            return this.hostName;
        },
        concatFaviconURL: function(host){
            return this.googleIcongrabberPrefix + host;
        },
        extractHostName: function(url){
            let urlThing = new URL(url);
            return urlThing.hostname; 
        },
        removeSubdomain: function(host){
            return host.replace("www.", "");
        }
    },
    created(){
        this.fullURL = this.bookmarkModel.getEnteredURL();
        this.hostName = this.extractHostName(this.fullURL);
    },
    mounted(){
        var bookmarkElement = document.getElementById("bookmark-inner-wrapper");
        bookmarkElement.addEventListener('contextmenu', event => {
            event.preventDefault();
        });
    }
}
</script>

<style scoped>
    .bookmark-inner-wrapper :hover{
        background-color:rgb(220, 220, 220);
        display: inline-block;
    }
    .icon-and-label{
        display: inline; 
        padding-left: 5px;
    }
    #fav-icon{
        margin-right: 5px;
        vertical-align: middle;
    } 
    .page-name{
        display: inline-block;
        
        vertical-align: middle;
        text-overflow: ellipsis;
        overflow: hidden; 
        white-space: nowrap;

        width: 70%;
    }
</style>