import React from 'react'
import Media from 'react-media'
import '../styles/footer.css'
import { ICONS } from '../constants/constants'

const Footer = () => (
    <Media query="(max-width: 599px)">
    {matches =>
        matches ? (
            <footer>
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
    </footer>
        ) : (
        <footer>
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
    </footer>
        )}
    
    </Media>
)

export default Footer