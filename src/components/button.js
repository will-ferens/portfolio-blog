import React from 'react'
import Link from 'gatsby-link'

const buttonStyle = {
    width: `210px`,
    height: `35px`,
    color: `#8785b3`,
    border: `1px solid #8785b3`
}

const Button = (props) => {
    if(!props.external){
        return (
            <Link to={props.to}>
                <button style={buttonStyle}>
                    {props.title}
                </button>
            </Link>
        )
    } else {
        return (
            <button 
                style={buttonStyle}>
                <a 
                    target="_blank" 
                    rel="noopener noreferrer"
                    href={props.external} 
                    style={{textDecoration: `none`, color: `#8785b3`}}>
                    {props.title}
                </a>
            </button>
        )
    }
    
}
    

export default Button