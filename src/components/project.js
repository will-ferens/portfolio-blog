import React from 'react'
import Button from './button'

const projectWrapper = {
    margin: `3rem auto`,
    justifySelf: `center`,
    gridTemplateColumns: `2fr 1fr`,
    display: `grid`,
}
const projectWrapperLeft = {
    margin: `3rem auto`,
    justifySelf: `center`,
    gridTemplateColumns: `1fr 2fr`,
    display: `grid`,
}
const styleRight = {
    borderRight: `1px solid #8785b3`, 
    paddingRight: `1rem`, 
    display: `grid`, 
    justifyItems: `end`, 
    textAlign: `right`
}

const styleLeft = {
    borderLeft: `1px solid #8785b3`, 
    paddingLeft: `1rem`,
    display: `grid`
}
const buttonDiv = {
    display: `grid`,
    gridTemplateRows: `1fr 1fr 1fr`,
    gridGap: `5px`
}
const Project = (props) => {
    if(props.left != true){
        return (
            <div 
                style={projectWrapper}
                >
                <div style={{
                    width: `700px`,
                    height: `500px`,
                    backgroundColor: `#eee`
                }}>
                    {props.image}
                </div>
                <div style={styleRight} css={{
                    '@media(min-width: 600px': {
                        display: `none`
                    }
                }}>
                <h1>{props.title}</h1>
                <p>{props.description}</p>
                    <div style={buttonDiv} >
                        <Button title="See the Project" external={props.button1} />
                        <Button title="See the Code" to={props.button2}/>
                        <Button title="See the Process" to={props.button3}/>
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div style={projectWrapperLeft}>
                <div style={styleLeft}>
                <h1>{props.title}</h1>
                <p>{props.description}</p>
                    <div style={buttonDiv}>
                        <Button title="See the Project" external={props.button1} />
                        <Button title="See the Code" to={props.button2}/>
                        <Button title="See the Process" to={props.button3}/>
                    </div>
                </div>

                <div style={{}}>
                    {props.image}
                </div>
            </div>
        )
    } 
}

export default Project

