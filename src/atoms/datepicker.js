import React from 'react'
import DatePicker from 'react-datepicker';

class Datepicker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          startDate: new Date(this.props.value)
        };
    }
    
    handleChange = (date) => {
    this.setState({
        startDate: date
    });
    }
    render() {
        return (
            <DatePicker selected={this.state.startDate} onChange={this.handleChange} />
        )
    }
}

export default Datepicker
export { Datepicker }