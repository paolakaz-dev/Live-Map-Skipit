import * as React from 'react';
import { useState, useEffect, useRef, useCallback } from 'react';
import 'react-map-gl-geocoder/dist/mapbox-gl-geocoder.css';


import ReactMapGL, { Marker , Popup, GeolocateControl, NavigationControl}from 'react-map-gl';
import Geocoder from 'react-map-gl-geocoder';


import '../../index.css';

import PageHeader from '../layout/PageHeader';
import PageTitle from '../layout/PageTitle';
import Container from '../layout/Container';
import FavButton from '../layout/FavoritePage';



import {listLogEntries} from './API';
import {LogEntryForm} from './LogEntryForm';
import {Burger} from '../layout/Burger';


// icons
import  goSee  from '../icons/goSee.svg';
import  goDo  from '../icons/goDo.svg';
import  goDrink  from '../icons/goDrink.svg';
import  goEat  from '../icons/goEat.svg';
import  goJoin  from '../icons/goJoin.svg';
import  goShop  from '../icons/goShop.svg';

const Map = () => {
    const [ logEntries, setLogEntries] = useState([]);
    const [showPopup, setshowPopup] = useState([]);
    const [addEntryLocation, setAddEntryLocation] = useState();


    const [viewport, setViewport] = useState({
        width: '100vw',
        height: '100vh',
        latitude: 55.676098,
        longitude: 12.568337,
        zoom: 12,

  });
  
const geocoderContainerRef = useRef();
const mapRef = useRef();
const handleViewportChange = useCallback(
    (newViewport) => setViewport(newViewport),[]
); 

const getEntries = async () => {
    const logEntries = await listLogEntries();
    setLogEntries(logEntries);
};


useEffect(()=> {
    getEntries();
}, []);

const showAddMarkerPopup = (event) => {
    const [longitude, latitude ] = event.lngLat;
    setAddEntryLocation({
        latitude,
        longitude,
        
    });


};


  return (
    <div 
        
    >
      <Container
>

        <PageTitle name="Live Map" />
        <Burger />
        <PageHeader  />
        <div ref={geocoderContainerRef}>
          <ReactMapGL className="gl-map"
            ref={mapRef}
            {...viewport}
            //mapStyle="" from mapbox - customize
            mapboxApiAccessToken={'pk.eyJ1IjoicGFvbGFrYXoiLCJhIjoiY2swYzVnbDdtMHlvdTNjcGlheW5sa2h0MyJ9.hNhdxhFZZH1-xq8tcyE51g'}
            //onViewportChange={nextViewport => setViewport(nextViewport)}
            onViewportChange={handleViewportChange}
            onDblClick={showAddMarkerPopup}
            >
          


            <div style={{position: 'absolute', right: 0}}>
            <NavigationControl className="navi"/>

            </div>
            <div>
                <GeolocateControl className="geo"
                        positionOptions={{enableHighAccuracy: true}}
                        trackUserLocation={true}
                    />
            </div>
            <div className="search" style={{position: 'absolute', top: 0}}>

                <Geocoder
                    mapRef={mapRef}
                    containerRef={geocoderContainerRef}
                    onViewportChange={handleViewportChange}
                    mapboxApiAccessToken={'pk.eyJ1IjoicGFvbGFrYXoiLCJhIjoiY2swYzVnbDdtMHlvdTNjcGlheW5sa2h0MyJ9.hNhdxhFZZH1-xq8tcyE51g'}
                    position="top-left"

                />

                
            </div>
                <div>
              
                </div>

            
              { logEntries.map(entry => (
                  <>
                      <Marker 
                      key={entry._id}
                      latitude={entry.latitude} 
                      longitude={entry.longitude}
                      offsetLeft={-20}
                      offsetTop={-10}
                      onClick = {() => setshowPopup()}
                      >
                          <div  
                          onClick = {() => setshowPopup({
                          // ...showPopup,
                          [entry._id]: true,
                      })}>
                        {(() => {

                            if ( entry.category === "GO SEE") { return (<img src={goSee} alt="goSee"
                                 style={{
                                    width: `${6 * viewport.zoom}`,
                                    height: `${6 * viewport.zoom}`,
                                }}
                                width="60" 
                                height="60"
                                viewBox="0 0 24 24" 
  
                                >
                            </img>)} else if (entry.category === "GO DO") { return(<img src={goDo} alt="goDo"
                                 style={{
                                    width: `${6 * viewport.zoom}`,
                                    height: `${6 * viewport.zoom}`,
                                }}
                                width="60" 
                                height="60" 
                                viewBox="0 0 24 24" 
 
                                >
                            </img> )} else if ( entry.category==="GO DRINK") {return (<img src={goDrink} alt="goDrink"
                                 style={{
                                    width: `${6 * viewport.zoom}`,
                                    height: `${6 * viewport.zoom}`,
                                }}
                                width="60" 
                                height="60"
                                viewBox="0 0 24 24" 
 
                                >
                            </img>)} else if (entry.category==="GO EAT") {return( <img src={goEat} alt="goEat"
                                 style={{
                                    width: `${6 * viewport.zoom}`,
                                    height: `${6 * viewport.zoom}`,
                                }}
                                width="60" 
                                height="60"
                                viewBox="0 0 24 24" 
 
                                >
                            </img>)} else if (entry.category==="GO JOIN") {return (<img src={goJoin} alt="goJoin"
                                 style={{
                                    width: `${6 * viewport.zoom}`,
                                    height: `${6 * viewport.zoom}`,
                                }}
                                width="60" 
                                height="60"
                                viewBox="0 0 24 24" 
  
                                >
                            </img>)} else if (entry.category==="GO SHOP") {return (<img src={goShop} alt="goShop"
                                 style={{
                                    width: `${6 * viewport.zoom}`,
                                    height: `${6 * viewport.zoom}`,
                                }}
                                width="60" 
                                height="60"
                                viewBox="0 0 24 24" 

                                >
                            </img> )} else {return ( null)}
                            }
                        )()}
                          </div>

                       
                          
                      </Marker>
                      { 
                          showPopup[entry._id] ? (
                              <Popup
                              latitude={entry.latitude} 
                              longitude={entry.longitude} 
                              closeButton={true}
                              closeOnClick={false}
                              dynamicPosition={true}
                              offsetLeft={10}
                            offsetTop={50}
                              onClose={() => setshowPopup({
                                  ...showPopup,
                                  [entry._id] : false
                              })}
                              anchor="top" >
                              <div className="popup">
                                    <p>Category: <b>{entry.category}</b></p>
                                  <h4>{entry.title}</h4>
                                  <p>{entry.comment}</p>
                                  {entry.image && <img src={entry.image} alt={entry.title}/>}
                                  <small>Posted: {new Date(entry.createdAt).toLocaleTimeString( [], { hour: '2-digit', minute: '2-digit' })}</small>
                                    <br />
                                    <br />
                                    <FavButton />
                                    <br />

                                



                              </div>
                            </Popup>
                          ) : null
                      }
                      </>   
                  ))
              } 

     

            {
                addEntryLocation ? (
                    <>
                      <Marker 
                      latitude={addEntryLocation.latitude} 
                      longitude={addEntryLocation.longitude} 
                      >
                          <div>
                           <svg className="marker" 
                              style={{
                                  width: `${6 * viewport.zoom}`,
                                  height: `${6 * viewport.zoom}`,
                              }}
                              viewBox="0 0 24 24" 
                              width="32" 
                              height="32" 
                              stroke="red" 
                              strokeWidth="2" 
                              fill="none" 
                              strokeLinecap="round" 
                              strokeLinejoin="round" 
                      >
                              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle>
                          </svg>
                          </div>
                      </Marker>
                    <Popup
                          latitude={addEntryLocation.latitude} 
                          longitude={addEntryLocation.longitude} 
                          closeButton={true}
                          closeOnClick={false}
                          dynamicPosition={true}
                          onClose={() => setAddEntryLocation(null)}
                          anchor="top" >
                          <div className="popup-add">
                              <LogEntryForm onClose={()=> {
                                  setAddEntryLocation(null);
                                  getEntries();
                              }}location={addEntryLocation} />
                          </div>
                      </Popup>
                    </>
                ) : null
            }
          </ReactMapGL>
          </div>
      </Container>
      </div>
  );
};

export default Map;
