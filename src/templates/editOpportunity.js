import React from 'react';
import {observer} from 'mobx-react'
import { opportunityState } from '../state'
import { StyledForm, StyledInput } from './styled'

class EditOpportunities extends React.Component {
    
    renderInputList = (backgrounds) => {
        
        const renderInput = () => {
            const param = {
                name: '',
                id: '',
            }
            console.log('aravind', opportunityState.backgroundList)
            opportunityState.backgroundList.push(param)
        }

        const inputList = (background, index) => {
            const removeInput = () => {
                const indexToRemove = index
                const filteredItems = opportunityState.backgroundList.filter(function(item, index) {
                    return index !== indexToRemove
                })
                opportunityState.backgroundList = filteredItems
            }
            return (
                <span>
                    <StyledInput value={background.name} type="text" />
                    {index === 0 && <div onClick={renderInput}>Plus</div>}
                    {index > 0 && <div onClick={removeInput}>Cancel</div>}
                </span>
            )
        }
        
        return (
            <React.Fragment>
                {backgrounds && backgrounds.length>0&&backgrounds.map(inputList)}
            </React.Fragment>
        )
    }
    render() {
        console.log('aravind', opportunityState)
        const data = opportunityState.opportunityDetails && opportunityState.opportunityDetails.Opportunity
        return (
            <div className={"general-info"}>
                <StyledForm>
                    <label>
                        Title:
                        <StyledInput value={data&&data.title?data.title:''} type="text" />
                    </label>
                    <label>
                        Description:
                        <StyledInput value={data&&data.description?data.description:''} type="text" />
                    </label>
                    <label id="back">
                        Backgrounds:
                        {this.renderInputList(opportunityState.backgroundList)}
                    </label>
                    <label>
                        Skills:
                        <StyledInput type="text" />
                    </label>
                    <label>
                        Selection Process:
                        <StyledInput 
                            value={data&&data.role_info&&data.role_info.selectionProcess
                                ?data.role_info.selectionProcess
                                :''} 
                            type="text"
                        />
                    </label>
                    <label>
                        Salary:
                        <StyledInput 
                            value={data&&data.specifics_info&&data.specifics_info.salary
                                ?data.specifics_info.salary
                                :''} 
                            type="text" 
                        />
                    </label>
                    <label>
                        City:
                        <StyledInput value={data&&data.role_info&&data.role_info.city
                            ?data.role_info.city
                            :''} 
                            type="text"
                        />
                    </label>
                    <input type="submit" value="Submit" />
                </StyledForm>
            </div>
        )
    }
}

const EditOpportunity = observer(EditOpportunities)

export default EditOpportunity
export { EditOpportunity }