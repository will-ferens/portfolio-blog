import React from 'react'


const Projects = () => (
    <div style={{
        gridTemplate: `2 2 1`,
        display: `grid`
    }}>
        <p>poop</p>
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


