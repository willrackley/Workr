import React from 'react';
import {GoogleApiWrapper, Map, Marker} from "google-maps-react";
require('dotenv').config();
export class MapContainer extends React.Component {
    state = {
        userLocation:{
            lat: 32, 
            lng: 32
        },
        loading:true
        };


    componentDidMount(){
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
            <div className="mt-5 ml-5">
            <Map
            google={google}
            //can be pushed into css file
            style={{ width: "auto", height: "5%"}}
            initialCenter={userLocation}
            zoom={10}
          >
            <Marker name={"Your position"} position={this.state.userLocation} />
          </Map>
          </div>
        );
    }
    }


    export default GoogleApiWrapper({
        apiKey:process.env.apikey
    })(MapContainer);
