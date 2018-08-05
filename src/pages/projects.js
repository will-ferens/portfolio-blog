import React from 'react'
import Project from '../components/project'
import Media from 'react-media'
import shelf from './Shelf-life.png'
import haiku from './haiku.png'
import fridge from './fridgly.png'


const Projects = () => (
    <div >
        <Media query="(max-width: 599px)">
            {matches => 
                matches ? (
                    <div style={{
                        display: `grid`,
                        gridTemplateRows: `1fr 1fr 1fr`,
                        gridGap: `16px`,
                        maxWidth: 580,
                        margin: `3rem auto`,
                    }}>
                    <Project 
                        title="Shelf Life"
                        description="A reading list app that lets you organize your books, find new ones to read, and gives you recommendations based on what you’ve liked! Built with React / Redux, Node.js, and MongoDB."
                        image={shelf}
                        button1="/coming-soon"
                        button2="https://github.com/will-ferens/shelf-life"
                        button3="/"
                    />
                
                    <Project 
                        title="Haiku You"
                        description="Using a Twitter account’s content, Haiku You parses individual tweets into the iconic 5 - 7 - 5 syllable structure to create idiosyncratic techno poems. Built with React and Node.js."
                        image={haiku}
                        button1="http://haiku-you.surge.sh/"
                        button2="https://github.com/will-ferens/haiku-you"
                        button3="/"
                        left={true}
                        />

                    <Project 
                        title="Fridge Vision"
                        description="This native app gives users recipes based on the ingredients right in front of you - just take a picture of what you have, and let image recognition do the rest! Built with React Native, Node.js, and PostgreSQL."
                        image={fridge}
                        button1="https://github.com/will-ferens/fridge-vision"
                        button2="https://github.com/will-ferens/fridge-vision"
                        button3="/"
                        />
                    </div>
                ) : 
                (
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
                        image={shelf}
                        button1="/coming-soon"
                        button2="https://github.com/will-ferens/shelf-life"
                        button3="/"
                        />
                    
                    <Project 
                        title="Haiku You"
                        description="Using a Twitter account’s content, Haiku You parses individual tweets into the iconic 5 - 7 - 5 syllable structure to create idiosyncratic techno poems. Built with React and Node.js."
                        image={haiku}
                        button1="http://haiku-you.surge.sh/"
                        button2="https://github.com/will-ferens/haiku-you"
                        button3="/"
                        left={true}
                        />

                    <Project 
                        title="Fridge Vision"
                        description="This native app gives users recipes based on the ingredients right in front of you - just take a picture of what you have, and let image recognition do the rest! Built with React Native, Node.js, and PostgreSQL."
                        image={fridge}
                        button1="https://github.com/will-ferens/fridge-vision"
                        button2="https://github.com/will-ferens/fridge-vision"
                        button3="/"
                        />
                </div>
                )
            }
            
        </Media>
    </div>
)
    


export default Projects

// exports.onCreatePage = async ({ page, boundActionCreators }) => {
//     const { createPage } = boundActionCreators

//     return new Promise((resolve, reject) => {
//         if(page.path.match(/^\/projects/)) {
//             page.layout = "projects"

//             createPage(page)
//         }

//         resolve()
//     })
// }


