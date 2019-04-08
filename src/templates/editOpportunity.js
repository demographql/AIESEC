import React from 'react';
import { observer } from 'mobx-react'
import { SelectDropdown, GoogleSuggest, Datepicker } from '../atoms'
import { UPDATE_OPPORTUNITY } from '../queries/Opportunity.graphql'
import { PlusIcon, FailureIcon } from '../atoms/Icons'
import { rules, messages } from './Validation'
import { isArray } from 'util';
import { inputState } from '../atoms/state'
import { opportunityState } from '../state'
import client from '../apollo';
import { 
    StyledForm,
    StyledInput, 
    InputTitle, 
    StyledSpan, 
    InputListWrap, 
    IconButton, 
    StyledLabel,
    StyledLink,
    GooglePlaceWrap
} from './styled'
import { wording, preferredOptions, levelOptions } from './fixture'

class EditOpportunities extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            indexedValue: 0,
            skills: [],
            backgrounds: []
        };
    }
    renderForm = (dataToEdit) => {
        const { name, value } = dataToEdit
        const dataValue = (name === wording.backgroundsText)
            ? 'backgrounds'
            : 'skills'
        const getInputDom = () => {
            if(name === wording.cityText) {
                return <GooglePlaceWrap><GoogleSuggest value={value?value:''} /></GooglePlaceWrap>
            }
            else if(isArray(value)) {
                return <InputListWrap>{this.renderInputList(value, dataValue)}</InputListWrap>
            }
            else if(name === wording.earliestStartDate || name === wording.latestEndDate) {
                return <Datepicker value={value} />
            }
            else {
                return <StyledInput name={name} value={value?value:''} type="text" required />
            }
        }
        return (
            <StyledLabel domToShow={isArray(value)}>
                <InputTitle>{name}:</InputTitle>
                {getInputDom()}
            </StyledLabel>
        )
    }
    renderInputList = (data, dataValue) => {
        const isBackground = dataValue === 'backgrounds'
        let selectedNode = ''
        let options = []
        if(isBackground) {
            selectedNode = 'backgrounds'
            options = this.state.backgrounds
        }   
        else {
            selectedNode = 'skills'
            options = this.state.skills
        }

        const inputList = (background, index) => {
            const renderInput = () => {
                this.setState({indexedValue: this.state.indexedValue+1})
                const defaultParam = {
                    name: (background.name!=='' && background.name) || options[0].name,
                    key: this.state.indexedValue+1,
                    option: background.option || preferredOptions[0].name,
                    level: background.level || levelOptions[0].name
                }
                inputState.selectedValue[selectedNode].push(defaultParam)
            }
            return (
                <StyledSpan>
                    <SelectDropdown options={options} value={background.name} isBackground={isBackground} index={index} />
                    <SelectDropdown options={preferredOptions} value={background.option} isBackground={isBackground} index={index} selectedDropdown={`option`} />
                    <SelectDropdown options={levelOptions} value={background.level} isBackground={isBackground} index={index} selectedDropdown={`level`} />
                    {index === 0 && <IconButton onClick={renderInput}><PlusIcon /></IconButton>}
                    {/*index > 0 && <IconButton onClick={removeInput}><FailureIcon cancel={true} /></IconButton>*/}
                </StyledSpan>
            )
        }
        
        return (
            <React.Fragment>
                {data && data.length>0&&data.map(inputList)}
            </React.Fragment>
        )
    }
    renderBackgroundSkills = (value) => {
        const getData = (data) => {
            const options = value === 'backgrounds' ? this.state.backgrounds : this.state.skills
            const nodevalue = options.find(function (item) {
                return data.name === item.name
            })
            const { name, option, level } = data
            return {
                name,
                id: nodevalue.id,
                option,
                level
            }
        }
        return inputState.selectedValue[value].map(getData)
    }
    updateOpportunity = async(data: serialized) => {
        const { title, description, salary, city} = data.serialized
        const variables = {
            opportunity: {
                title,
                description,
                specifics_info: {
                    salary,
                },
                role_info: {
                    city,
                    selection_process: data.serialized['selection process']
                },
                backgrounds: this.renderBackgroundSkills('backgrounds'),
                skills: this.renderBackgroundSkills('skills'),
            }
        }

        const response = (await client.mutate({
            mutation: UPDATE_OPPORTUNITY,
            variables: {
              input: variables,
            },
        }))
        if(response && response.data && response.data.UpdateOpportunity && response.data.UpdateOpportunity.id) {
            alert('Updated Sucessfully')
        }
        else {
            alert('Something went wrong')
        }
        return response
    }
    componentWillMount() {
        if(opportunityState.backgroundList.length > 0) {
            opportunityState.backgroundList.forEach(function(item, index) {
                const defaultParam = {
                    name: (item.name!=='' && item.name) || this.state.backgrounds[0].name,
                    key: index,
                    option: item.option || preferredOptions[0].name,
                    level: parseInt(item.level || levelOptions[0].name)
                }
                inputState.selectedValue['backgrounds'].push(defaultParam)
            })
        }
        if(opportunityState.skillsList.length > 0) {
            opportunityState.skillsList.forEach(function(item, index) {
                const defaultParam = {
                    name: (item.name!=='' && item.name) || this.state.skills[0].name,
                    key: index,
                    option: item.option || preferredOptions[0].name,
                    level: parseInt(item.level || levelOptions[0].name)
                }
                inputState.selectedValue['skills'].push(defaultParam)
            })
        }
    }
    componentDidMount() {
        const { skills, backgrounds} = this.props.context
        this.setState({
            skills: skills,
            backgrounds: backgrounds
        })
    }
    render() {
        const data = opportunityState.opportunityDetails && opportunityState.opportunityDetails.Opportunity
        if(data) {
            const {
                titleText,
                descriptionText,
                backgroundsText,
                skillsText,
                selectionProcessText,
                salaryTextHeading,
                cityText,
                earliestStartDate,
                latestEndDate,
            } = wording
            const editableList = [
                {name:titleText, value:(data && data.title) || ''},
                {name:descriptionText, value:(data && data.description) || ''},
                {name:earliestStartDate, value:(data && data.earliestStartDate) || ''},
                {name:latestEndDate, value:(data && data.latestEndDate) || ''},
                {name:selectionProcessText, value:(data && data.role_info && data.role_info.selectionProcess) || ''},
                {name:salaryTextHeading, value:(data && data.specifics_info && data.specifics_info.salary) || ''},
                {name:cityText, value:(data && data.role_info && data.role_info.city) || ''},
                {name:backgroundsText, value:inputState.selectedValue['backgrounds']},
                {name:skillsText, value:inputState.selectedValue['skills']},
            ]
            
            return (
                <StyledForm rules={rules} messages={messages} action={this.updateOpportunity}>
                    {editableList.map(this.renderForm)}
                    <button className={`submit-button`}>Submit</button>
                    <StyledLink to="/">Home</StyledLink>
                </StyledForm>
            )
        }
    }
}

const EditOpportunity = observer(EditOpportunities)

export default EditOpportunity
export { EditOpportunity }