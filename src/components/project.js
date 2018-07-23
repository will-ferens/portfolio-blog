import React from 'react'
import Button from './button'
import Media from 'react-media'

const projectWrapper = {
    margin: `2rem auto`,
    justifySelf: `center`,
    gridTemplateColumns: `2fr 1fr`,
    display: `grid`,
}
const projectWrapperMobile = {
    margin: `2rem`,
    justifySelf: `center`,
    maxWidth: `300px`
}

const projectWrapperLeft = {
    margin: `2rem auto`,
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
    gridGap: `5px`,
    height: `70%`
}
const Project = (props) => {
    if(props.left != true){
        return (
            <div>
                <Media query="(max-width: 599px)">
                    {matches =>
                        matches ? (
                        <div 
                            style={projectWrapperMobile}
                            >
                            <div style={styleRight}>
                            <h1>{props.title}</h1>
                            <p>{props.description}</p>
                                <div style={buttonDiv} >
                                    <Button title="See the Project" external={props.button1} />
                                    <Button title="See the Code" external={props.button2}/>
                                    <Button title="See the Process" to={props.button3}/>
                                </div>
                            </div>
                            <div style={{
                                width: `370px`,
                                height: `170px`,
                                padding: `5px`
                            }}>
                                <img style={{margin: `auto 0`, maxWidth: `370px`, maxHeight: `170px`, width: `auto`, height: `auto`, objectFit: `cover`}} src={props.image} />
                            </div>
                        </div>
                    ) : 
                        (
                            <div 
                                style={projectWrapper}
                                >
                                <div style={{
                                    width: `550px`,
                                    height: `350px`,
                                    padding: `5px`
                                }}>
                                    <img style={{maxWidth: `550px`, maxHeight: `350px`, width: `auto`, height: `auto`, objectFit: `cover`}} src={props.image} />
                                </div>
                                <div style={styleRight}>
                                <h1>{props.title}</h1>
                                <p>{props.description}</p>
                                    <div style={buttonDiv} >
                                        <Button title="See the Project" external={props.button1} />
                                        <Button title="See the Code" external={props.button2}/>
                                        <Button title="See the Process" to={props.button3}/>
                                    </div>
                                </div>
                            </div>
                    )}
                </Media>
            </div>
        )
    } else {
        return (
            <div>
                <Media query="(max-width: 599px)">
                {matches => 
                    matches ? (
                    <div style={projectWrapperMobile}>
                        <div style={styleLeft}>
                            <h1>{props.title}</h1>
                            <p>{props.description}</p>
                            <div style={buttonDiv}>
                                <Button title="See the Project" external={props.button1} />
                                <Button title="See the Code" external={props.button2}/>
                                <Button title="See the Process" to={props.button3}/>
                            </div>
                        </div>

                        <div style={{
                            width: `370px`,
                            height: `170px`,
                            padding: `5px` 
                        }}>
                            <img style={{maxWidth: `370px`, maxHeight: `170px`, width: `auto`, height: `auto`, objectFit: `cover`}} src={props.image} />
                        </div>
                </div>
                ) : (
                    <div style={projectWrapperLeft}>
                    <div style={styleLeft}>
                    <h1>{props.title}</h1>
                    <p>{props.description}</p>
                        <div style={buttonDiv}>
                            <Button title="See the Project" external={props.button1} />
                            <Button title="See the Code" external={props.button2}/>
                            <Button title="See the Process" to={props.button3}/>
                        </div>
                    </div>

                    <div style={{
                        width: `550px`,
                        height: `350px`,
                        padding: `5px`,
                        display: `grid`, 
                        justifySelf: `end`, 
                    }}>
                        <img style={{maxWidth: `550px`, maxHeight: `350px`, width: `auto`, height: `auto`, objectFit: `cover`}} src={props.image} />
                    </div>
                </div>
                )}
                </Media>
            </div>
        )
    } 
}

export default Project

