import React from 'react'
import {observer} from 'mobx-react'
import {textState} from './state'
import { Select } from 'react-advanced-form-addons';

class SelectDropDown extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: this.props.value,
            selectedDropdown: this.props.selectedDropdown
        };
    }
    renderoptions = (option) => {
        return <option value={option.name}>{option.name}</option>
    }

    setValue = (value) => {
        const keyValue = this.props.index
        const selectedNode = this.props.isBackground ? 'backgrounds' : 'skills'
        if(textState.selectedValue[selectedNode].length > 0) {
            const found = textState.selectedValue[selectedNode].find(function (item, index) {
                return item.key === keyValue
            })
            console.log('qwerty', textState.selectedValue[selectedNode])
            if(found) {
                switch(this.state.selectedDropdown) {
                    case 'option':
                        textState.selectedValue[selectedNode][found.key].option = value
                        break;
                    case 'level':
                        textState.selectedValue[selectedNode][found.key].level = value
                        break;
                    default:
                        textState.selectedValue[selectedNode][found.key].name = value
                        break;
                }
                
            }
        }
    }

    handleChange = (event) => {
        console.log('aravindtest1', textState.selectedValue['backgrounds'])
        this.setValue(event.nextValue)
        this.setState({value: event.nextValue});
      }
    render() {
        const index = this.props.index
        //textState.selectedValue['backgrounds'][index].key = index
        return (
            <Select value={this.state.value} onChange={this.handleChange}>
                {this.props.options.map(this.renderoptions)}
            </Select>
        )
    }
}
const SelectDropdown = observer(SelectDropDown)

export default SelectDropdown
export { SelectDropdown }