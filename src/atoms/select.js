import React from 'react'
import {observer} from 'mobx-react'
import {inputState} from './state'
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
        if(inputState.selectedValue[selectedNode].length > 0) {
            const found = inputState.selectedValue[selectedNode].find(function (item, index) {
                return item.key === keyValue
            })
            if(found) {
                switch(this.state.selectedDropdown) {
                    case 'option':
                        inputState.selectedValue[selectedNode][found.key].option = value
                        break;
                    case 'level':
                        inputState.selectedValue[selectedNode][found.key].level = parseInt(value)
                        break;
                    default:
                        inputState.selectedValue[selectedNode][found.key].name = value
                        break;
                }
                
            }
        }
    }

    handleChange = (event) => {
        this.setValue(event.nextValue)
        this.setState({value: event.nextValue});
      }
    render() {
        const index = this.props.index
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