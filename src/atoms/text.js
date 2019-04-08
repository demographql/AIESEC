import React from 'react'
import { inputState } from './state'
import {observer} from 'mobx-react'

class Texts extends React.Component {

    render() {
        const handleClick = () => {
            inputState.handleOnClick(this.props.text)
        }
        return (
            <div className={this.props.isActive ? "general-nav-item active": "general-nav-item"} onClick={handleClick}>
                {this.props.text}
            </div>
        )
    }
}
const Text = observer(Texts)

export default Text
export { Text }