export default {
    props: {
        imageName: String,
        buttonWidth: String
    },
    methods: {
        concatImage: function(value){
            return require('../assets/' + value);
        },
        concatWidth: function(value){
            return require(value + '%')
        }
    }
}