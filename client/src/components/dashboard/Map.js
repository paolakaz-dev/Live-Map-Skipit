import * as React from 'react';
import { useState, useEffect } from 'react';

import ReactMapGL, { Marker , Popup, GeolocateControl}from 'react-map-gl';
import '../../index.css';

import PageHeader from '../layout/PageHeader';
import PageTitle from '../layout/PageTitle';
import Container from '../layout/Container';
import GoBack from '../layout/GoBack';

import {listLogEntries} from './API'
import {LogEntryForm} from './LogEntryForm'

const Map = () => {
    const [ logEntries, setLogEntries] = useState([]);
    const [showPopup, setshowPopup] = useState([]);
    const [addEntryLocation, setAddEntryLocation] = useState(null);
    const [viewport, setViewport] = useState({
        width: '100vw',
        height: '100vh',
        latitude: 40.748817,
        longitude: -73.985428,
        zoom: 10

  });


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
        
    })
};



  return (
    <div>
      <Container>
        <GoBack />

        <PageTitle name="Live Map" />
        <PageHeader  />
          <ReactMapGL className="gl-map"
            {...viewport}
            //mapStyle="" from mapbox - customize
            mapboxApiAccessToken={'pk.eyJ1IjoicGFvbGFrYXoiLCJhIjoiY2swYzVnbDdtMHlvdTNjcGlheW5sa2h0MyJ9.hNhdxhFZZH1-xq8tcyE51g'}
            onViewportChange={nextViewport => setViewport(nextViewport)}
              onDblClick={showAddMarkerPopup}
            >
                
                <GeolocateControl className="geo"
                positionOptions={{enableHighAccuracy: true}}
                trackUserLocation={true}
              />
            
              { logEntries.map(entry => (
                  <>
                      <Marker 
                      key={entry._id}
                      latitude={entry.latitude} 
                      longitude={entry.longitude} 
                      onClick = {() => setshowPopup()}
                      >
                          <div  
                          onClick = {() => setshowPopup({
                          // ...showPopup,
                          [entry._id]: true,
                      })}>
                          <svg className="marker" 
                              style={{
                                  width: `${6 * viewport.zoom}`,
                                  height: `${6 * viewport.zoom}`,
                              }}
                              viewBox="0 0 24 24" 
                              width="32" 
                              height="32" 
                              stroke="currentColor" 
                              stroke-width="2" 
                              fill="none" 
                              stroke-linecap="round" 
                              stroke-linejoin="round" 
                      >
                              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle>
                          </svg>
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
                              onClose={() => setshowPopup({
                                  ...showPopup,
                                  [entry._id] : false
                              })}
                              anchor="top" >
                              <div className="popup">
                                  <h3>{entry.title}</h3>
                                  <p>{entry.comment}</p>
                                  {entry.image && <img src={entry.image} alt={entry.title}/>}
                                  <small>Posted on: {new Date(entry.createdAt).toLocaleTimeString( [], { hour: '2-digit', minute: '2-digit' })}</small>

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
                              stroke-width="2" 
                              fill="none" 
                              stroke-linecap="round" 
                              stroke-linejoin="round" 
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
      </Container>
      </div>
  );
};

export default Map;
