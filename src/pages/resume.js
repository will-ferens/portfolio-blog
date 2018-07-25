import React from 'react'
import Media from 'react-media'
import resume from './resume.png'

const Resume = () => (
    <Media query="(max-width: 599px)">
                    {matches =>
                        matches ? (
                            <div style={{
                                display: `flex`,
                                flexDirection: `column`
                            }}>
                                <img style={{ maxWidth: 300, height: `auto`, width: `auto`,display: `flex`, alignSelf: `center`, marginBottom: 50}} src={resume}/>
                                <div style={{
                                    display: `flex`,
                                    justifyContent: `center`
                                }}>
                                    <a style={{textDecoration: `none`, color: `#8785b3`, alignSelf: `center`, margin: `10px 10px 10px 10px`}} href="https://drive.google.com/file/d/1xL-ZoyGSC1gc7rfMOx1bwUb1yI-cDz_F/view?usp=sharing">View</a>
                                    <a style={{textDecoration: `none`, color: `#8785b3`, alignSelf: `center`, margin: `10px 10px 10px 10px`,}} href="https://drive.google.com/uc?export=download&id=1xL-ZoyGSC1gc7rfMOx1bwUb1yI-cDz_F">Download</a>
                                </div>
                            </div>
                        ) : (
                            <div style={{
                                display: `flex`,
                                flexDirection: `column`
                            }}>
                                <img style={{ maxWidth: 600, height: `auto`, width: `auto`,display: `flex`, alignSelf: `center`, marginBottom: 50}} src={resume}/>
                                <div style={{
                                    display: `flex`,
                                    justifyContent: `center`
                                }}>
                                    <a style={{textDecoration: `none`, color: `#8785b3`, alignSelf: `center`, margin: `10px 10px 10px 10px`}} href="https://drive.google.com/file/d/1xL-ZoyGSC1gc7rfMOx1bwUb1yI-cDz_F/view?usp=sharing">View</a>
                                    <a style={{textDecoration: `none`, color: `#8785b3`, alignSelf: `center`, margin: `10px 10px 10px 10px`,}} href="https://drive.google.com/uc?export=download&id=1xL-ZoyGSC1gc7rfMOx1bwUb1yI-cDz_F">Download</a>
                                </div>
                            </div>
                        )}
    </Media>

)

export default Resume