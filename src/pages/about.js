import React from 'react'
import self from './self.jpg'

export default () => (
    <div style={{
        margin: `0 auto `,
        maxWidth: `600px`,

    }}>
        <div>
            <img style={{maxWidth: `150px`, maxHeight: `250px`, height: `auto`, width: `auto`, border: `1px solid #8785b3`, float: `right`, margin: `10px`}} src={self} />
            <h1>About Will</h1>
            <p>I’m a Web Developer with a focus in Javascript and a passion for design. After graduating with a B.A in English, I’ve found a perfect fit for my love of making new things, editing, and critical thought in code! </p>
            <p>I’ve worked with people from all over the world. Whether it’s translating and editing at a publishing house in Spain, managing day to day operations at a small non-profit in Pittsburgh, leading tours all over the country, or giving lessons on the mountain here in Colorado, my professional life has been all about communicating with diverse clients and teams. Connecting with different cultures has given me a wealth of experience I carry regardless of where I am. It helps me problem solve, be unafraid to try new things, and identify with others easily.</p>
            <p>If I’m not designing a website or building an application, I’ll be nose deep in a book (I read one or two a week!), writing stories, getting lost in the woods, or skiing as fast as I can.</p>
        </div>
        <div>

        </div>
    </div>
)