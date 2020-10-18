import React from 'react'
import { ICONS } from '../../constants/svgAssets'

import * as Styled from './styles'

const Footer = () => (
    <Styled.Footer>
        <Styled.FooterItem>
            <h1>Looking for a dev? <span>Reach out.</span></h1>
            <p>Whether you're looking for your next hire, have a question, or just want to connect - drop a line.</p>
            <Styled.Mailto href="mailto:will.ferens@gmail.com">
                will.ferens@gmail.com
            </Styled.Mailto>
            <Styled.Social>
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
            </Styled.Social>
        </Styled.FooterItem>
    </Styled.Footer>
)

export default Footer