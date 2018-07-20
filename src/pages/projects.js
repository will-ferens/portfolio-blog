import React from 'react'
import Button from '../components/button'

const Projects = () => (
    <div style={{
        display: `grid`,
        gridTemplateRows: `1fr 1fr 1fr`,
        gridGap: `32px`,
        maxWidth: 980,
        margin: `3rem auto`,
    }}>
        <div style={{
            margin: `3rem auto`,
            justifySelf: `center`,
            gridTemplateColumns: `2fr 1fr`,
            display: `grid`,
            
        }}>
            

                <div></div>
                <div style={{
                    borderRight: `1px solid #8785b3`, 
                    paddingRight: `1rem`, 
                    display: `grid`, 
                    justifyItems: `end`, 
                    textAlign: `right`}}>
                <h1>Shelf Life</h1>
                <p>A reading list app that lets you organize your books, find new ones to read, and gives you recommendations based on what you’ve liked! Built with React / Redux, Node.js, and MongoDB.</p>
                <div style={{
                    display: `grid`,
                    gridTemplateRows: `1fr 1fr 1fr`,
                    gridGap: `5px`
                }}>
                    <Button title="See the Project" to=""/>
                    <Button title="See the Code" to=""/>
                    <Button title="See the Process" to=""/>
                </div>
                </div>
                
        </div>
        <div style={{
            margin: `3rem auto`,
            justifySelf: `center`,
            gridTemplateColumns: `1fr 2fr`,
            display: `grid`
        }}>
                
                <div style={{borderLeft: `1px solid #8785b3`, paddingLeft: `1rem`}}>
                    <h1 style={{ }}>Haiku You</h1>
                    <p>Using a Twitter account’s content, Haiku You parses individual tweets into the iconic 5 - 7 - 5 syllable structure to create idiosyncratic techno poems. Built with React and Node.js.</p>
                    <div style={{
                        display: `grid`,
                        gridTemplateRows: `1fr 1fr 1fr`,
                        gridGap: `5px`
                    }}>
                        <Button title="See the Project" external="http://haiku-you.surge.sh/" />
                        <Button title="See the Code" to=""/>
                        <Button title="See the Process" to=""/>
                    </div>
                </div>

                <div >

                </div>

        </div>
        <div style={{
            margin: `3rem auto`,
            justifySelf: `center`,
            gridTemplateColumns: `2fr 1fr`,
            display: `grid`,
            justifyItems: `end`, 
            textAlign: `right`
        }}>
            
                <div>
                </div>

                <div style={{borderRight: `1px solid #8785b3`, paddingRight: `1rem`}}>
                    <h1 style={{ }}>Fridge Vision</h1>
                    <p>This native app gives users recipes based on the ingredients right in front of you - just take a picture of what you have, and let image recognition do the rest! Built with React Native, Node.js, and PostgreSQL.</p>
                    <div style={{
                        display: `grid`,
                        gridTemplateRows: `1fr 1fr 1fr`,
                        gridGap: `5px`
                    }}>
                        <Button title="See the Code" to=""/>
                        <Button title="See the Process" to=""/>
                    </div>
                </div>
                

        </div>
    </div>
)
    



export default Projects
exports.onCreatePage = async ({ page, boundActionCreators }) => {
    const { createPage } = boundActionCreators

    return new Promise((resolve, reject) => {
        if(page.path.match(/^\/projects/)) {
            page.layout = "projects"

            createPage(page)
        }

        resolve()
    })
}


