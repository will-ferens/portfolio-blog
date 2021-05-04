import React from 'react'
import Layout from '../components/layout'
import SEO from '../components/seo'

import * as Global from '../constants/globalStyles'
    
const About = () => (
    <Layout>
        <SEO title="About" />
        <Global.Container>
            <Global.ContainerItem>
                <h1>Briefly Noted</h1>
                <p>
                    My friends and family were shocked when I decided to learn to code four years ago. I went to college studying Literature, Spanish, and Philosophy - reliably squishy subjects that had me plotting character arcs, memorizing past participles, and delving into lofty concepts of the Good. 
                </p>
                <p>
                    'But Will,' they said, 'your degree is so far removed from the hard and fast rules of ones and zeros. Shouldn't you find a career that's more in line with your education?'
                </p>
                <p>
                    What they failed to realize is that I see development and software as an ideal outlet for my skill set. 
                </p>
                <p>
                    Writing a function is just like crafting a convincing sentence. Each word has to be evaluated for effectiveness - too many and your statement becomes muddled; too few and you'll never get your point across. And just like an essay, there are a magnitude of ways to craft a program. Structure matters. Every reference to another part of the whole must be purposeful and serve the reader or user.
                </p>
                <p>
                    Editing is refactoring. Your first draft and quick prototype will always need another critical look. Syntax might differ in English to Spanish, as from JavaScript to Java, but utilized correctly, you can create depth where you otherwise may not. Research, whether on the cutting edge of a new technology or in the dusty stacks of old academic journals, shares a thread. And, of course, there is always trial and error. While a red lettered terminal message may be more literal than an editor's pen, the process of investigation into what, why, and where things went wrong remain similar.
                </p>
                <p>
                    So I will always say to them that I use my degree everyday: writing, reading, and learning to build something new.
                </p>
            </Global.ContainerItem>
        </Global.Container>
    </Layout>
)

export default About
    