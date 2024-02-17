import React, { useState, useEffect } from 'react';
import PropertyCard from '../PropertyCard';
import './PropertyListing.scss';

const PropertyListing = () => {
    const [properties, setProperties] = useState([]);

    useEffect(() => {
        // this can be refactored into a custom hook
        // retrieve data from api
        fetch('http://localhost:3000/api/properties')
            .then((response) => {
                console.log(response, 'response');
                // error handling if no response from api
                if (!response.ok) {
                    throw new Error('Error getting response');
                }
                return response.json();
            })
            .then((data) => {
                setProperties(data);
            })
            // overall error handling if the request fails
            .catch((error) => console.log('Error getting properties', error));
    }, []);

    return (
        <ul className="PropertyListing">
            {/* this can be refactored into a pagination component (custom hook + component) */}
            {properties.slice(0, 5).map((property, index) => {
                return (
                    <li key={index}>
                        <PropertyCard {...property} />
                    </li>
                );
            })}
        </ul>
    );
};

export default PropertyListing;
