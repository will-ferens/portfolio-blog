import React from 'react'
import Project from '../components/project'



const Projects = () => (
    <div style={{
        display: `grid`,
        gridTemplateRows: `1fr 1fr 1fr`,
        gridGap: `32px`,
        maxWidth: 980,
        margin: `3rem auto`,
    }}>
        <Project 
            title="Shelf Life"
            description="A reading list app that lets you organize your books, find new ones to read, and gives you recommendations based on what you’ve liked! Built with React / Redux, Node.js, and MongoDB."
            button1="/"
            button2="/"
            button3="/"
            />
        
        <Project 
            title="Haiku You"
            description="Using a Twitter account’s content, Haiku You parses individual tweets into the iconic 5 - 7 - 5 syllable structure to create idiosyncratic techno poems. Built with React and Node.js."
            button1="/"
            button2="/"
            button3="/"
            left={true}
            />

        <Project 
            title="Fridge Vision"
            description="This native app gives users recipes based on the ingredients right in front of you - just take a picture of what you have, and let image recognition do the rest! Built with React Native, Node.js, and PostgreSQL."
            button1="/"
            button2="/"
            button3="/"
            />
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


