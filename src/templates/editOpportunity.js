import React from 'react';
import {observer} from 'mobx-react'
import {InputData, SelectDropdown} from '../atoms'
import { PlusIcon, FailureIcon } from '../atoms/Icons'
import { isArray } from 'util';
import { Field } from 'react-advanced-form'
import { textState } from '../atoms/state'
import { opportunityState } from '../state'
import { Input } from 'react-advanced-form-addons'
import { StyledForm, InputTitle, StyledSpan, InputListWrap, IconButton } from './styled'
import { wording, backgroundOptions, preferredOptions, levelOptions, skillsOptions } from './fixture'

class EditOpportunities extends React.Component {
    renderForm = (dataToEdit) => {
        const { name, value } = dataToEdit
        const dataValue = (name === wording.backgroundsText)
            ? 'backgrounds'
            : 'skills'
        console.log('aravind', dataValue)
        return (
            <React.Fragment>
                <InputTitle>{name}:</InputTitle>
                {!isArray(value) && <InputData name={name} value={value?value:''} type="text" required />}
                {isArray(value) && <InputListWrap>{this.renderInputList(value, dataValue)}</InputListWrap>}
            </React.Fragment>
        )
    }
    renderoptions = (option) => {
        return <option value={option.name}>{option.name}</option>
    }
    renderInputList = (data, dataValue) => {
        const isBackground = dataValue === 'backgrounds'
        let selectedNode = ''
        let options = []
        if(isBackground) {
            selectedNode = 'backgrounds'
            options = backgroundOptions
        }   
        else {
            selectedNode = 'skills'
            options = skillsOptions
        }
        const renderInput = () => {
            const defaultParam = {
                name: '',
                id: '',
                option: "preferred",
                level: 0,
            }
            isBackground
                ? opportunityState.backgroundList.push(defaultParam)
                : opportunityState.skillsList.push(defaultParam)
        }

        const inputList = (background, index) => {
            const removeInput = () => {
                const indexToRemove = index
                const list = isBackground
                    ? opportunityState.backgroundList
                    : opportunityState.skillsList
                const filteredItems = list.filter(function(item, index) {
                    return index !== indexToRemove
                })
                if(isBackground) {
                    opportunityState.backgroundList = filteredItems
                }
                else {
                    opportunityState.skillsList = filteredItems
                }
            }
            textState.selectedValue[selectedNode][index] = {
                key: index,
                name: background.name || options[0].name,
                option: background.option || preferredOptions[0].name,
                level: background.level || levelOptions[0].name
            }
            console.log('textState.selectedValue', textState.selectedValue)
            return (
                <StyledSpan>
                    <Field.Group name={`prerequisites`}>
                        <SelectDropdown options={options} value={background.name} isBackground={isBackground} index={index} />
                        <SelectDropdown options={preferredOptions} value={background.option} isBackground={isBackground} index={index} selectedDropdown={`option`} />
                        <SelectDropdown options={levelOptions} value={background.level} isBackground={isBackground} index={index} selectedDropdown={`level`} />
                    </Field.Group>
                    {index === 0 && <IconButton onClick={renderInput}><PlusIcon /></IconButton>}
                    {index > 0 && <IconButton onClick={removeInput}><FailureIcon cancel={true} /></IconButton>}
                </StyledSpan>
            )
        }
        
        return (
            <React.Fragment>
                {data && data.length>0&&data.map(inputList)}
            </React.Fragment>
        )
    }
    handleButtonClick = () => {
        console.log(this.form.serialize())
        this.form.serialize()
    }
    registerUser = ({ serialized }) => {
        alert(JSON.stringify(serialized, null, 2))

        /* Perform async request with the serialized data */
        return new Promise(resolve => resolve())
    }
    render() {
        const data = opportunityState.opportunityDetails && opportunityState.opportunityDetails.Opportunity
            const {
                titleText,
                descriptionText,
                backgroundsText,
                skillsText,
                selectionProcessText,
                salaryTextHeading,
                cityText
            } = wording
            const editableList = [
                {name:titleText, value:(data && data.title) || ''},
                {name:descriptionText, value:(data && data.description) || ''},
                {name:selectionProcessText, value:(data && data.role_info && data.role_info.selectionProcess) || ''},
                {name:salaryTextHeading, value:(data && data.specifics_info && data.specifics_info.salary) || ''},
                {name:cityText, value:(data && data.role_info && data.role_info.city) || ''},
                {name:backgroundsText, value:opportunityState.backgroundList},
                {name:skillsText, value:opportunityState.skillsList},
            ]
            
            return (
                <div>
                    <StyledForm id="example-form" ref={form => this.form = form} action={this.registerUser}>
                        <InputData required />
                        {editableList.map(this.renderForm)}
                        <button>Serialize</button>
                    </StyledForm>
                </div>
            )
    }
}

const EditOpportunity = observer(EditOpportunities)

export default EditOpportunity
export { EditOpportunity }