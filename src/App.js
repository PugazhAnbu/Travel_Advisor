import React, { useState, useEffect } from "react";
import { CssBaseline, Grid } from '@material-ui/core'


import Header from "./components/Header/Header";
import List from "./components/List/List";
import Map from "./components/Map/Map";
import { getPlacesData } from "./api";
const App = () => {
    const [Places, setPlaces] = useState([]);
    const [filteredPlaces, setfilteredPlaces] = useState([]);
    const [childClick, setChildClick] = useState(null);

    const [coordinates, setCoordinates] = useState({});
    const [bounds, setBounds] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [type, setType] = useState('restaurants')
    const [rating, setRating] = useState('')

    useEffect(() => {
        //coords: {latitude, longitude} 
        navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
            //console.log(e);
            setCoordinates({ lat: latitude, lng: longitude });
        })
    }, []);

    useEffect(() => {
        const filteredPlaces = Places?.filter((place) => place.rating > rating)

        setfilteredPlaces(filteredPlaces);
    }, [rating, Places])
    useEffect(() => {
        //console.log(coordinates, bounds)
        setIsLoading(true)
        //this getPlaceData has a async fun and return promise so use .then method
        getPlacesData(type, bounds.sw, bounds.ne)
            .then((data) => {
                //console.log(data);
                setPlaces(data)
                setfilteredPlaces([])
                setRating('')
                setIsLoading(false);
            })
    }, [type, bounds])
    return (
        <>
            <CssBaseline />
            <Header
                setCoordinates={setCoordinates}
            />
            <Grid container spacing={3} style={{ width: '100%' }}>
                <Grid item xs={12} md={4}>
                    <List
                        places={filteredPlaces?.length ? filteredPlaces : Places}
                        childClick={childClick}
                        isLoading={isLoading}
                        type={type}
                        setType={setType}
                        rating={rating}
                        setRating={setRating}
                    />
                </Grid>

                <Grid item xs={12} md={8}>
                    <Map
                        setCoordinates={setCoordinates}
                        setBounds={setBounds}
                        coordinates={coordinates}
                        places={filteredPlaces?.length ? filteredPlaces : Places}
                        setChildClick={setChildClick}
                    />
                </Grid>
            </Grid>

        </>
    );
}

export default App;