import React from 'react';

/*
import {GoogleApiWrapper, Map, Marker} from "google-maps-react";
import  React_App_API_KEY_G from './config_keys'
const API_KEY =React_App_API_KEY_G
console.log(API_KEY);
*/

// Temp export class to make it work without calling Googlemaps react 
export class MapContainer extends React.Component {
    render() {
        return (
            <div className="container">
                <h1>Maps stuff.. </h1>
            </div>
        );
    };
}

export default MapContainer;

/*
export class MapContainer extends React.Component {
    state = {
        userLocation:{
            lat: 32, 
            lng: 32
        },
        loading:true
        };


    componentDidMount(props){
        navigator.geolocation.getCurrentPosition(
            position => {
                const {latitude, longitude} = position.coords;

                this.setState({
                    userLocation:{
                        lat: latitude,
                        lng: longitude
                    },
                    loading:false
                });

            console.log(this.state.userLocation);
            },
            ()=> {
                this.setState({ loading:false});
            }
        );
    
    }
    render(){
        const{loading, userLocation} =this.state;
        const {google}= this.props;

        if(loading){
            return null;
        }

        return(
            // <div className="mt-5 ml-5">
            <Map
            google={google}
            //can be pushed into css file
            style={{ width: "auto", height: "5%"}}
            initialCenter={userLocation}
            zoom={10}
          >
            <Marker name={"Your position"} position={this.state.userLocation} />
          </Map>
        //   </div>
        );
    }
    }

    
    export default GoogleApiWrapper({
        apiKey: API_KEY
        
    })(MapContainer);

*/