import { observable, decorate, action } from 'mobx'

class State {

    isActive = false

    currentlySelected = ''

    handleOnClick = (data) => {
        if(!this.currentlySelected !== data) {
            this.currentlySelected = data
        }
    }
}

decorate(State,{
    isActive: observable ,
    currentlySelected: observable,
    handleOnClick: action,
})

const textState = new State()

export default State
export { State, textState }