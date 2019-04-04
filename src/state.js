import { observable, decorate } from 'mobx'

class State {
    opportunityDetails = {}
    backgroundList = [
        {
            id:'',
            name:''
        }
    ]
}

decorate(State,{
    opportunityDetails: observable,
    backgroundList: observable
})

const opportunityState = new State()

export default State
export { State, opportunityState }