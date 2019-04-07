import React from 'react';
import 'isomorphic-fetch'
import { Link } from "react-router-dom"
import { observer } from 'mobx-react'
import { SelectDropdown } from '../atoms'
import { GET_OPPORTUNITY } from '../getOpportunity.graphql'
import { PlusIcon, FailureIcon } from '../atoms/Icons'
import { ApolloClient, ApolloLink, InMemoryCache } from 'apollo-boost'
import { isArray } from 'util';
import { textState } from '../atoms/state'
import { opportunityState } from '../state'
import { StyledForm, StyledInput, InputTitle, StyledSpan, InputListWrap, IconButton, StyledLabel } from './styled'
import { wording, backgroundOptions, preferredOptions, levelOptions, skillsOptions } from './fixture'
import { getDataFromTree } from 'react-apollo';

const IS_BROWSER = typeof window === 'object'
const inMemoryCacheConfig = {
    // dataIdFromObject: x => `${x.__typename}:${x.identifier}`,
  }
const inMemoryCache = new InMemoryCache(inMemoryCacheConfig)
const cache = IS_BROWSER ? inMemoryCache.restore(window.__APOLLO_STATE__) : inMemoryCache
const clientConfig = {
    link: ApolloLink,
    cache,
    ssrMode: true,
    connectToDevTools: IS_BROWSER
  }
const client = new ApolloClient(clientConfig)

const rules = {
    name: {
      title: ({ value }) => {
        const matchCase = value.match(/^([a-zA-Z\s]{3,100})$/)
        return matchCase && matchCase.length > 0 ? true : false
      },
      description: ({ value }) => {
        const matchCase = value.match(/^([a-zA-Z\s]{10,1000})$/)
        return matchCase && matchCase.length > 0 ? true : false
      },
      'selection process': ({ value }) => {
        const matchCase = value.match(/^([a-zA-Z\s]{3,100})$/)
        return matchCase && matchCase.length > 0 ? true : false
      },
      salary: ({ value }) => {
        const matchCase = value.match(/^([0-9]{3,10})$/)
        return matchCase && matchCase.length > 0 ? true : false
      },
      city: ({ value }) => {
        const matchCase = value.match(/^([a-zA-Z\s]{3,50})$/)
        return matchCase && matchCase.length > 0 ? true : false
      }
    },
  }
  export const messages = {
    name: {
        title: {
            missing: 'Please provide valid Title',
            invalid: 'Title should be min 3 & max 100 characters, No specail character/Numbers',
        },
        description: {
            missing: 'Please provide valid Description',
            invalid: 'Description should be min 10 & max 1000 characters, No specail character/Numbers',
        },
        'selection process': {
            missing: 'Please provide valid Selection process',
            invalid: 'Selection process should be min 3 & max 100 characters, No specail character/Numbers',
        },
        salary: {
            missing: 'Please provide valid Salary',
            invalid: 'Salary should be min 3 digit & max 100 digit, No specail character/Numbers',
        },
        city: {
            missing: 'Please provide valid City',
            invalid: 'City is invalid',
        },
    },
  }
class EditOpportunities extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            indexedValue: 0,
            error: null,
            isLoaded: false,
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
            options = backgroundOptions
        }   
        else {
            selectedNode = 'skills'
            options = skillsOptions
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
    updateOpportunity = ({ serialized }) => {
        alert(JSON.stringify(serialized, null, 2))
    }
    componentWillMount() {
        if(opportunityState.backgroundList.length > 0) {
            opportunityState.backgroundList.forEach(function(item, index) {
                const defaultParam = {
                    name: (item.name!=='' && item.name) || backgroundOptions[0].name,
                    key: index,
                    option: item.option || preferredOptions[0].name,
                    level: item.level || levelOptions[0].name,
                }
                textState.selectedValue['backgrounds'].push(defaultParam)
            })
        }
        if(opportunityState.skillsList.length > 0) {
            opportunityState.skillsList.forEach(function(item, index) {
                const defaultParam = {
                    name: (item.name!=='' && item.name) || skillsOptions[0].name,
                    key: index,
                    option: item.option || preferredOptions[0].name,
                    level: item.level || levelOptions[0].name,
                }
                textState.selectedValue['skills'].push(defaultParam)
            })
        }
    }
    async getDatum() {
        const getListResponse = await client.query({
            query: GET_OPPORTUNITY,
            fetchPolicy: 'no-cache',
          })
          console.log('getListResponse', getListResponse)
    }
    getData = async () => {
        await this.getDatum()
    }
    componentDidMount() {
        const data = opportunityState.opportunityDetails && opportunityState.opportunityDetails.Opportunity
        if(data) {
        fetch("http://gisapi-web-staging-1636833739.eu-west-1.elb.amazonaws.com/v2/lists/skills?access_token=dd0df21c8af5d929dff19f74506c4a8153d7acd34306b9761fd4a57cfa1d483c")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        skills: result
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
        fetch("http://gisapi-web-staging-1636833739.eu-west-1.elb.amazonaws.com/v2/lists/backgrounds?access_token=dd0df21c8af5d929dff19f74506c4a8153d7acd34306b9761fd4a57cfa1d483c")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        backgrounds: result
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
        }
    }
    render() {
        const { error, isLoaded, skills, backgrounds } = this.state; 
        this.getData()
        const data = opportunityState.opportunityDetails && opportunityState.opportunityDetails.Opportunity
        if(data) {
            if (error) {
                return <div>Error: {error.message}</div>;
            } 
            else if (!isLoaded) {
                return <div>Loading...</div>;
            } 
            else {
                console.log('skills', skills, backgrounds)
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
                    <StyledForm rules={rules} messages={messages} action={this.updateOpportunity}>
                        {editableList.map(this.renderForm)}
                        <button>Serialize</button>
                    </StyledForm>
                )
            }
        }
        return (
            <React.Fragment>
                <div>Something went wrong, Navigate to home page.</div>
                <Link to="/">HOME PAGE</Link>
            </React.Fragment>
        )
    }
}

const EditOpportunity = observer(EditOpportunities)

export default EditOpportunity
export { EditOpportunity }