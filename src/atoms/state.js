import { observable, decorate, action } from 'mobx'

class State {

    isActive = false

    currentlySelected = ''

    selectedValue = {
        backgrounds: [],
        skills: []
    }
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
    selectedValue: observable
})

const textState = new State()

export default State
export { State, textState }