import React from "react";
import { GoogleApiWrapper, Map, Marker, InfoWindow } from "google-maps-react";
import axios from "axios";
import React_App_API_KEY_G from "./config_keys";
import zipcodes from "zipcodes";
const API_KEY = React_App_API_KEY_G;

// const latitude=0;
// const longitude=0;
export class MapContainer extends React.Component {
  state = {
    lat: 0,
    lng: 0,
    county: "",
    zip: 0,
    state: "",
    loading: true,
    showingInfoWindow: false,
    activeMarker: {}, //Shows the active marker upon click
    selectedPlace: {}
  };

  componentDidMount(props) {
    navigator.geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;

        this.setState({
          lat: latitude,
          lng: longitude,

          loading: false
        });
        const updatedLatitude = this.state.lat;
        const updatedLongitude = this.state.lng;

        console.log("State: ", this.state.lat);
        console.log("State: ", this.state.lng);

        console.log(updatedLatitude);
        console.log(updatedLongitude);
        this.handleChange(updatedLatitude, updatedLongitude);

        //  console.log(latitude);
        //  console.log(longitude);
      },
      () => {
        this.setState({ loading: false });
      }
    );
    this.handleChange = (updatedLatitude, updatedLongitude) => {
      const API_URL =
        "https://us1.locationiq.com/v1/reverse.php?key=69b410ea8cf9cb&lat=" +
        updatedLatitude +
        "&lon=" +
        updatedLongitude +
        "&format=json";
      axios.get(API_URL).then(
        response => {
          console.log(API_URL);
          const data = response;
          const county = data.data.address.county;
          const zip = data.data.address.postcode;
          const state = data.data.address.state;

          this.setState({
            county: county,
            zip: zip,
            state: state
          });

          console.log(data);
          console.log(this.state.county);
          console.log(this.state.zip);
          console.log(this.state.state);
          this.raduisLookUp();
        }
      );
    };
  }
  raduisLookUp = () => {
    // const miles = zipcodes.toMiles(zipcodes.toKilometers(dist));
    const rad = zipcodes.radius(this.state.zip, 50);
    console.log(rad);
  };

  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  onClose = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };

  render() {
    const { loading, lat, lng } = this.state;
    const { google } = this.props;

    if (loading) {
      return null;
    }

    return (
      // <div className="mt-5 ml-5">
      <Map
        google={google}
        //can be pushed into css file
        style={{ width: "auto", height: "5%" }}
        initialCenter={{
          lat: this.state.lat,
          lng: this.state.lng
        }}
        zoom={10}
      >
        <Marker
          onClick={this.onMarkerClick}
          name={{
            county: this.state.county,
            state: this.state.state
          }}
          position={{ lat: this.state.lat, lng: this.state.lng }}
        />
        {/* Does not work */}
        {/* <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          onClose={this.onClose}
        >
          <div>
            <h4>{this.state.selectedPlace.name}</h4>
          </div>
        </InfoWindow> */}
      </Map>
      //   </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: API_KEY
})(MapContainer);
