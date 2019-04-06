import React from 'react'
import {observer} from 'mobx-react'
import { Input } from 'react-advanced-form-addons'

class Inputs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: this.props.value};
    }
    handleChange = (event) => {
        this.setState({value: event.nextValue});
      }
    render() {
        return (
            <Input name={this.props.name} value={this.state.value} type="text" onChange={this.handleChange} />
        )
    }
}
const InputData = observer(Inputs)

export default InputData
export { InputData }