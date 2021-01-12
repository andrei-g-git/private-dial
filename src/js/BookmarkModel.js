export default class BookmarkModel {
    constructor(enteredURL){
        this.enteredURL = enteredURL;
    }

    getEnteredURL(){return this.enteredURL;}
    setEnteredURL(enteredURL){this.enteredURL = enteredURL}
}