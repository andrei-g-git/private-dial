export default {
    props: {
        allGroups: Object, 
        saveName: String,
        closeName: String,
    },
    methods: {
        onClose: function(){
            this.resetForms();
            this.$emit('clickedClose');
        },
        resetForms: function(){
            document.getElementById('name-field-' + this.fieldAffix).value = '';
            document.getElementById('color-field-' + this.fieldAffix).value = '';
        }
    }
}