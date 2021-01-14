export default class AddGroupEmitter{
    constructor(vueInstance){
        this.vueInstance = vueInstance;
    }

    emitEvent(){
        this.vueInstance.$emit('clickedAddGroup');
    }
}