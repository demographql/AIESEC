import React from 'react';
import { observer } from 'mobx-react'
import { SelectDropdown } from '../atoms'
import { Mutation } from 'react-apollo';
import { UPDATE_OPPORTUNITY } from '../queries/Opportunity.graphql'
import { PlusIcon, FailureIcon } from '../atoms/Icons'
import { rules, messages } from './Validation'
import { isArray } from 'util';
import { textState } from '../atoms/state'
import { opportunityState } from '../state'
import { StyledForm, StyledInput, InputTitle, StyledSpan, InputListWrap, IconButton, StyledLabel } from './styled'
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
        console.log('aravind2', dataToEdit)
        const { name, value } = dataToEdit
        const dataValue = (name === wording.backgroundsText)
            ? 'backgrounds'
            : 'skills'
        return (
            <StyledLabel domToShow={isArray(value)}>
                <InputTitle>{name}:</InputTitle>
                {!isArray(value) && <StyledInput name={name} value={value?value:''} type="text" required />}
                {isArray(value) && <InputListWrap>{this.renderInputList(value, dataValue)}</InputListWrap>}
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
            console.log('aravind1', background)
            const renderInput = () => {
                this.setState({indexedValue: this.state.indexedValue+1})
                const defaultParam = {
                    name: (background.name!=='' && background.name) || options[0].name,
                    key: this.state.indexedValue+1,
                    option: background.option || preferredOptions[0].name,
                    level: background.level || levelOptions[0].name,
                    id: background.id || options[0].id
                }
                textState.selectedValue[selectedNode].push(defaultParam)
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
    updateOpportunity = (data: serialized) => {
        const { title, description, salary, city} = data.serialized
        const variables = {
            input: {
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
                    backgrounds: textState.selectedValue['backgrounds'],
                    skills: textState.selectedValue['skills']
                }
            }
        }
        
        alert(JSON.stringify(variables))
        console.log('testtesttest', variables)
        return variables
    }
    componentWillMount() {
        if(opportunityState.backgroundList.length > 0) {
            opportunityState.backgroundList.forEach(function(item, index) {
                const defaultParam = {
                    name: (item.name!=='' && item.name) || this.state.backgrounds[0].name,
                    key: index,
                    option: item.option || preferredOptions[0].name,
                    level: item.level || levelOptions[0].name,
                    id: item.id || this.state.backgrounds[0].name,
                }
                textState.selectedValue['backgrounds'].push(defaultParam)
            })
        }
        if(opportunityState.skillsList.length > 0) {
            opportunityState.skillsList.forEach(function(item, index) {
                const defaultParam = {
                    name: (item.name!=='' && item.name) || this.state.skills[0].name,
                    key: index,
                    option: item.option || preferredOptions[0].name,
                    level: item.level || levelOptions[0].name,
                    id: item.id || this.state.skills[0].name,
                }
                textState.selectedValue['skills'].push(defaultParam)
            })
        }
    }
    componentDidMount() {
        console.log('this.props',this.props.context)
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
                cityText
            } = wording
            const editableList = [
                {name:titleText, value:(data && data.title) || ''},
                {name:descriptionText, value:(data && data.description) || ''},
                {name:selectionProcessText, value:(data && data.role_info && data.role_info.selectionProcess) || ''},
                {name:salaryTextHeading, value:(data && data.specifics_info && data.specifics_info.salary) || ''},
                {name:cityText, value:(data && data.role_info && data.role_info.city) || ''},
                {name:backgroundsText, value:textState.selectedValue['backgrounds']},
                {name:skillsText, value:textState.selectedValue['skills']},
            ]
            
            return (
                <Mutation mutation={UPDATE_OPPORTUNITY}>
                    {update => (
                        <StyledForm rules={rules} messages={messages} action={update({ variables: this.updateOpportunity })}>
                            {editableList.map(this.renderForm)}
                            <Mutation mutation={UPDATE_OPPORTUNITY} variables={{ description, url }}>
                                {postMutation => <button onClick={this.updateOpportunity}>Submit</button>}
                            </Mutation>
                            <button>Serialize</button>
                        </StyledForm>
                    )}
                </Mutation>
            )
        }
    }
}

const EditOpportunity = observer(EditOpportunities)

export default EditOpportunity
export { EditOpportunity }