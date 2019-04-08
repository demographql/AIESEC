import React, {Component} from "react"
import ReactGoogleMapLoader from "react-google-maps-loader"
import ReactGooglePlacesSuggest from "react-google-places-suggest"
 
const MY_API_KEY = "AIzaSyDwsdjfskhdbfjsdjbfksiTgnoriOAoUOgsUqOs10J0" // fake
 
class GoogleSuggest extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            search: "",
            value: this.props.value
        };
    }
 
    handleInputChange = e => {
        this.setState({search: e.target.value, value: e.target.value})
    }
 
    handleSelectSuggest = (geocodedPrediction, originalPrediction) => {
        console.log(geocodedPrediction, originalPrediction) // eslint-disable-line
        this.setState({search: "", value: geocodedPrediction.formatted_address})
    }
    
    handleNoResult = () => {
        console.log('No results for ', this.state.search)
    }
 
    render() {
        const {search, value} = this.state
        return (
            <ReactGoogleMapLoader
                params={{
                    key: MY_API_KEY,
                    libraries: "places,geocode",
                }}
                render={googleMaps =>
                    googleMaps && (
                        <ReactGooglePlacesSuggest
                            googleMaps={googleMaps}
                            autocompletionRequest={{
                                input: search,
                                // Optional options
                                // https://developers.google.com/maps/documentation/javascript/reference?hl=fr#AutocompletionRequest
                            }}
                            // Optional props
                            onNoResult={this.handleNoResult}
                            onSelectSuggest={this.handleSelectSuggest}
                            textNoResults="My custom no results text" // null or "" if you want to disable the no results item
                            customRender={prediction => (
                                <div className="customWrapper">
                                    {prediction
                                        ? prediction.description
                                        : "My custom no results text"}
                                </div>
                            )}
                        >
                            <input
                                className="input-box"
                                type="text"
                                value={value}
                                placeholder="Search a location"
                                onChange={this.handleInputChange}
                            />
                        </ReactGooglePlacesSuggest>
                    )
                }
            />
        )
    }
}

export default GoogleSuggest
export { GoogleSuggest }