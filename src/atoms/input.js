import React from 'react'
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
            <Input type="text" name={this.props.name} value={this.state.value} onChange={this.handleChange} required={true} pattern="[A-Za-z]{3}" />
        )
    }
}

export default Inputs
export { Inputs }