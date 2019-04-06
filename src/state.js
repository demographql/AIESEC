import { observable, decorate } from 'mobx'

class State {
    opportunityDetails = {}
    backgroundList = [
        {
            id:'',
            name:''
        }
    ]
    skillsList = [
        {
            id:'',
            name:''
        }
    ]
}

decorate(State,{
    opportunityDetails: observable,
    backgroundList: observable,
    skillsList:  observable
})

const opportunityState = new State()

export default State
export { State, opportunityState }