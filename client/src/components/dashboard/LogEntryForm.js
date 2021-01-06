import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import Select from 'react-select';



import {createLogEntry} from './API';

import {listCategories} from './API';

// const options = [
//     { value: '1', label: 'GO SEE' },
//     { value: '2', label: 'GO EAT' },
//     { value: '3', label: 'GO DRINK' },
//     { value: '4', label: 'GO JOIN' }, 
//     { value: '5', label: 'GO SHOP' }, 
//     { value: '6', label: 'GO DO' } 
//   ];

export const LogEntryForm = ({ location, onClose }) => {

    const renderCategory =  ({category}) => ({ label:category , value:category });

    const [loading, setLoading ] = useState(false);
    const [error, setError ] = useState('');

    const { register, handleSubmit } = useForm();

    const [categories, setCategories] = useState([]);

    // const [selectedOption, setSelectedOption] = useState(null);
    // const [value, setValue] = useState(null);
    const [selectedOption, setSelectedOption] = useState(null);

    const onChangeSelect = e => {
        setSelectedOption(e);
        console.log(`Option selected now:`, e);

      }

//     function onChangeSelect(value){
//         console.log(`Option selected now:`, value);
// };

    // const [onChangeSelect] = useState(() => {
    //     return (value) => {
        
    //     setValue(value);
    //     console.log(`Option selected now:`, value);

    //     };
    //   });
    // const [handleChange] = useState(() => {
    //     return () => {
        
    //       setSelectedOption(selectedOption);
    //       console.log(`Option selected:`, selectedOption);

    //     };
    //   });

      
    const getCategories = async () => {
        const categories = await listCategories();
        setCategories(categories);

    };
    useEffect(()=> {
        getCategories();
    }, []);


    const onSubmit = async (data) => {
        try {
            setLoading(true);
            data.latitude = location.latitude;
            data.longitude = location.longitude;
            await createLogEntry(data);
            onClose();
        } catch (error) {
            console.error(error);
            setError(error.message);
            setLoading(false);
        }
   
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="entry-form">
            { error ? <h3 className="error">{error}</h3> : null}
            <label htmlFor="title">Title</label>
            <input id="title" name="title" required ref={register}/>
            {/* <Select id="category" placeholder="Select a category" name="category" ref={register} options={categories.map(renderCategory)} /> */}
            <Select required={true}value={selectedOption} id="category" placeholder="Select a category" name="category" onChange={onChangeSelect} options = {categories.map(renderCategory)} ref={register} />
            {selectedOption && <div style={{ marginTop: 5 }}>
                <div><b>Selected Category: </b> {selectedOption.label}</div>
            </div>}
            <label htmlFor="comment">Comment</label>
            <input name="comment" rows={3} required ref={register}></input>
            <label htmlFor="image">Upload Image</label>
            <input id="image" name="image" ref={register}/>

            <div className="fav">
         
        </div>

            {/* <input type="file" name="img"></input> */}
            <label></label>
            <button disabled={loading}>{loading ? 'Loading' : 'Publish' }</button>

        </form>
    )
};

