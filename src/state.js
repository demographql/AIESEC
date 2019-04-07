import { observable, decorate } from 'mobx'

class State {
    opportunityDetails = {}
    backgroundList = []
    skillsList = []
}

decorate(State,{
    opportunityDetails: observable,
    backgroundList: observable,
    skillsList:  observable
})

const opportunityState = new State()

export default State
export { State, opportunityState }