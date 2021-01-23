export default {
    props: {
        groupIndex: Number
    },
    methods: {
        onSave: function(){
            var name = document.getElementById('name-field-' + this.fieldAffix).value;
            var color = document.getElementById('color-field-' + this.fieldAffix).value;
            if((name.length > 0) || (color.length > 0)){   
                var group = this.allGroups.getGroupAt(groupIndex);
                group.setName(name);
                group.setColor(color);
                this.$emit('clickedSave');
                this.resetForms();                
            }
        }
    },
    mounted(){
        var name = this.allGroups.getNameAt(this.groupIndex);
        var color = this.allGroups.getColorAt(this.groupIndex);

        document.getElementById('name-field-' + this.fieldAffix).value = name;
        document.getElementById('color-field-' + this.fieldAffix).value = color;
    }
}