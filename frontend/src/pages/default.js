import React from 'react'
import "../styles/default.css"
import RGPD from '../components/RGPD';
import ReactPlayer from 'react-player'


const Default = () => {

    return (
        <div>
            <div className='div_global'>
                <div>
                    <p className='bienvenue_text'>
                        NEWME
                    </p>
                </div>
                <div>
                    <p>
                        <div>
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                        </div>
                    </p>
                </div>
                <div className='div_video'>
                    <ReactPlayer className="video"
                        url="https://www.youtube.com/watch?v=VFNMX8s2Q10"
                        playing={true}
                        onStart={true}
                        loop={true}
                        onReady={true}
                        width="100%"
                        height="562px"
                        volume={0.01}
                    />
                </div>
                <div>
                    <RGPD />
                </div>
            </div >
        </div>
    )
}

export default Default;