class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
        this.conf = config;
        this.currentState  =  config.initial;
        this.undoHis = [];
        this.redoHis =[];
        this.states=[];

        for (var stat in config.states){
            this.states.push(stat) ;    
        }
    }

    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
        return this.currentState;
    }
        
    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
 
    if (state in this.conf.states){
        this.undoHis.push(this.currentState);
        this.currentState = state;
        this.redoHis =[];
        
    }
    else{
        throw new Error();
    }
}

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
        
    if (event in this.conf.states[this.currentState].transitions){
        this.undoHis.push(this.currentState);
        this.currentState =  this.conf.states[this.currentState].transitions[event];
        this.redoHis = [];

    }
    else{
        throw new Error();
    }

    }
   
    /**
     * Resets FSM state to initial.
     */
    reset() {
        this.currentState  =  this.conf.initial;
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
        var result =[];
        if (event == null){
            return this.states;
        }

        for (var stat in this.conf.states){ 
            for (var trans in this.conf.states[stat].transitions){
               if (trans == event){
                   result.push(stat);
               }
               
            }   
        }
        console.log(result);
        return result;   
}

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
        if (this.undoHis.length == 0){
            return false;
        }
        if(this.redoHis[this.redoHis.length - 1] !== this.currentState){
        this.redoHis.push(this.currentState);
        this.currentState = this.undoHis.pop();
        return true;
    }
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
        if (this.redoHis.length == 0){
            return false;
        }
        else{
        this.undoHis.push(this.currentState);
        this.currentState = this.redoHis.pop();
        return true;
        }
    }

    /**
     * Clears transition history
     */
    clearHistory() {
        this.undoHis =[];
        this.redoHis =[];
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
