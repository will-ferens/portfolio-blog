import React from 'react'
import { ICONS } from '../../constants/svgAssets'

const Ratings = (props) => {
    let rating = props.rating
    let fullRating = Math.floor(rating / 1)
    let remainder = (parseFloat(rating - fullRating).toFixed(2) * 100)
    let ratingArray = [ ];
    

    for(let i = 0; i < fullRating; i++) {
        let obj = {percentage: '99%', fill: 'url(#99%)' }
        ratingArray.push(obj)
    }

    if(remainder > 0) {
        let obj = {percentage: '50%', fill: 'url(#50%)' }
        ratingArray.push(obj)
    }
    

    const Star = (props) => <svg viewBox="0 -10 511 511" height={16} width={16}>
        <defs>
            <linearGradient id={props.star.percentage} x1={props.star.percentage} y1="0%" x2="100%" y2="0%">
                <stop offset="1%" stopColor="#3C3880" stop-opacity="1"/>
                <stop offset="0%" stopColor="#fff" stop-opacity="1" />
            </linearGradient>
        </defs>
        <path d={ICONS.STAR} fill={props.star.fill}></path>
    </svg>

    return (
        <div>
            {ratingArray.map(star => <Star star={star}  />)}
        </div>
    )

    
}

export default Ratings