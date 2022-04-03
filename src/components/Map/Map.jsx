import React from "react";
import GoogleMapReact from 'google-map-react';
//import { GoogleMap, LoadScript } from '@react-google-maps/api'
import { Paper, Typography, useMediaQuery } from '@material-ui/core';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import { Rating } from '@material-ui/lab';

import useStyles from './styles'
const Map = ({ setCoordinates, setBounds, coordinates, places, setChildClick }) => {
    const classes = useStyles();
    const isDesktop = useMediaQuery('(min-width: 600px)');


    return (
        <div className={classes.mapContainer}>
            <GoogleMapReact
                //process.env.REACT_APP_GOOGLE_MAP_API_KEY
                //AIzaSyBXSJCGaBiabf4iqvEv_nZLcMwhEWix6ak
                bootstrapURLKeys={{
                    key: 'AIzaSyBXSJCGaBiabf4iqvEv_nZLcMwhEWix6ak'
                }}
                defaultCenter={coordinates}
                center={coordinates}
                defaultZoom={14}
                margin={[50, 50, 50, 50]}
                //position = window.google.maps.ControlPosition.TOP_LEFT
                options={''}
                onChange={(e) => {
                    console.log("event", e);
                    //== null ? { lat: 13.000138413828694, lng: 80.15427731306153 } : e.marginBounds.sw
                    setBounds({ sw: e.marginBounds.sw, ne: e.marginBounds.ne })
                    setCoordinates({ lat: e.center.lat, lng: e.center.lng });
                }}
                onChildClick={(child) => setChildClick(child)}
            >
                {places?.map((place, i) => (
                    <div
                        className={classes.markerContainer}
                        lat={Number(place.latitude)}
                        lng={Number(place.longitude)}
                        key={i}
                    >
                        {
                            !isDesktop ? (
                                <LocationOnOutlinedIcon color="primary" />
                            ) : (
                                //elevation gives a box shadow
                                <Paper elevation={3} className={classes.paper}>
                                    <Typography className={classes.typography} variant='subtitle2' gutterBottom>
                                        {place.name}
                                    </Typography>
                                    <img
                                        src={place.photo ? place.photo.images.large.url : 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'}
                                        alt={place.name}
                                    />
                                    <Rating size='small' value={Number(place.rating)} readOnly />
                                </Paper>
                            )
                        }
                    </div>
                ))}
            </GoogleMapReact>
        </div>
    );
}

export default Map;