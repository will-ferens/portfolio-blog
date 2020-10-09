import React from 'react'
import Media from 'react-media'
import '../styles/footer.css'
import { ICONS } from '../constants/constants'

const Footer = () => (
    <Media query="(max-width: 599px)">
    {matches =>
        matches ? (
            <footer>
                <ul className="links" style={{ justifyContent: `space-around`}} >
                    <li className="nav-item">
                        <a href="https://twitter.com/will_ferens" target="_blank" rel="noopener noreferrer">
                        <svg width="17" height="17" viewBox="0 0 1024 1024" >
                            <path d={ICONS.TWITTER}></path>
                        </svg>
                        </a>
                    </li>
                    <li className="nav-item">
                        <a href="https://github.com/will-ferens" target="_blank" rel="noopener noreferrer"><svg width="17" height="17" viewBox="0 0 1024 1024">
                        <path d={ICONS.GITHUB}></path>
                        </svg></a>
                    </li>
                    <li className="nav-item">
                        <a href="https://www.linkedin.com/in/will-ferens/" target="_blank" rel="noopener noreferrer">
                        <svg width="22" height="22" viewBox="0 0 1024 1024">
                            <path d={ICONS.LINKEDIN}></path>
                        </svg>
                        </a>
                    </li>
                    <li className="nav-item">
                        <a href="mailto:will.ferens@gmail.com">
                        <svg width="17" height="17" viewBox="0 0 1024 1024">
                            <path d={ICONS.EMAIL}></path>
                        </svg>
                        </a>
                    </li>
                </ul>
            </footer>
        ) : (
        <footer style={{
                display: `grid`,
                gridTemplateColumns: `25% auto 25%`,
                gridGap: `16px`
            }}
        >
            <div style={{ gridColumn: `2`, width: `90%`, justifySelf: `center`}}>
                <h1>Looking for a dev? <span>Reach out.</span></h1>
                <p>Whether you're looking for your next hire, have a question, or just want to connect - drop a line.</p>
                <a className="mailto" href="mailto:will.ferens@gmail.com">
                    will.ferens@gmail.com
                </a>
                <ul className="links" >
                    <li className="nav-item">
                        <a href="https://twitter.com/will_ferens" target="_blank" rel="noopener noreferrer">
                        <svg width="17" height="17" viewBox="0 0 1024 1024" >
                            <path d={ICONS.TWITTER}></path>
                        </svg>
                        </a>
                    </li>
                    <li className="nav-item">
                        <a href="https://github.com/will-ferens" target="_blank" rel="noopener noreferrer"><svg width="17" height="17" viewBox="0 0 1024 1024">
                        <path d={ICONS.GITHUB}></path>
                        </svg></a>
                    </li>
                    <li className="nav-item">
                        <a href="https://www.linkedin.com/in/will-ferens/" target="_blank" rel="noopener noreferrer">
                        <svg width="22" height="22" viewBox="0 0 1024 1024">
                            <path d={ICONS.LINKEDIN}></path>
                        </svg>
                        </a>
                    </li>
                    <li className="nav-item">
                        <a href="mailto:will.ferens@gmail.com">
                        <svg width="17" height="17" viewBox="0 0 1024 1024">
                            <path d={ICONS.EMAIL}></path>
                        </svg>
                        </a>
                    </li>
                </ul>
            </div>
        </footer>
        )}
    
    </Media>
)

export default Footer