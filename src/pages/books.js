import React from 'react'
import Media from 'react-media'

import '../styles/about.css'

export default function About() {

    return (
        <Media query="(max-width: 599px)">
        {matches =>
        matches ? ( 
            <div 
                className="about-wrapper"
                style={{
                    margin: `0 auto 8rem`,
                    maxWidth: `350px`,
                }}
            >
                
            </div>
        ) : (
            <div 
                className="about-wrapper" 
                style={{
                    display: `grid`,
                    gridTemplateColumns: `25% auto 25%`,
                    gridGap: `16px`}}
            >
                
            </div>
        )}
        </Media>
    )
}
    
const queryData = async () => {
    const spreadsheetId = '1xT523h2g1OxdF38q-4tNGy15O7PsxDnjeydJ4gTG1gI';
    const response = await fetch(`https://api.graphqlsheet.com/api/${spreadsheetId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'token': 'ff42088265fb330ba35e7f843d06c1a45c7ac404'
        },
    body: JSON.stringify({
        query: `
            {
                get (limit: 20) {
                    YOUR_API_FIELDS
                }
            }
        `
        })
    });
    const responseJSON = await response.json();
    console.log(responseJSON);
};

queryData();