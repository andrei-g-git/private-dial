<template>
    <div class='icon-and-label' v-on:click='openWebsite(fullURL)'>
        <img id='fav-icon' v-bind:src='concatFaviconURL(getHostName())'>
        <div class='page-name'>{{ removeSubdomain(hostName) }}</div>
    </div>
</template>

<script>
export default {
    props: {
        fullURL: String
    },
    data: function(){
        return{
            googleIcongrabberPrefix: 'https://s2.googleusercontent.com/s2/favicons?domain=',
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
        this.hostName = this.extractHostName(this.fullURL);
    }
}
</script>

<style scoped>

</style>