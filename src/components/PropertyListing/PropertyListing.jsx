import React, { useState, useEffect } from 'react';
import PropertyCard from '../PropertyCard';
import './PropertyListing.scss';

const PropertyListing = () => {
    const [properties, setProperties] = useState([]);

    useEffect(() => {
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
        console.log(properties);
    }, []);

    return (
        <ul className="PropertyListing">
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
