import React from 'react';
import logo from './assets/logo.png';
import {Button, DatePicker, Input, Progress} from 'antd';
import dayjs from 'dayjs';
import './assets/homepage.css';

import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);

class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            authorizationToken: '',
            week: '',
            email: '',
            generatedPlaylist: ''
        };
    }

    authorizeWithSpotify = () => {
        this.setState({authorizationToken: 'RANDOM'});
    }

    setWeek = (weekObj) => {
        this.setState({week: weekObj})
    }

    setEmail = (email) => {
        this.setState({email: email})
    }

    generatePlaylist = () => {
        this.setState({generatedPlaylist: '3LznaAI7XVhPyzp8eopWfv'})
    }

    setPercentage = () => {
        let percentage = 0;
        if (this.state.authorizationToken) percentage += 25;
        if (this.state.week) percentage += 25;
        if (this.state.email) percentage += 25;
        if (this.state.generatedPlaylist) percentage += 25;
        return percentage;
    }

    render() {
        const percentage = this.setPercentage();
        return (
            <div className="homepage-form-container">
                <div className='homepage-form'>
                    <img src={logo} className='homepage-logo' alt='logo-home'/>
                    <div className='homepage-form-section'>
                        <div className='homepage-step-label'>Step 1</div>
                        <div className='homepage-form-sublabel'>You need to authenticate with Spotify for SF Bangers to create playlists on your behalf</div>
                        <Button onClick={() => this.authorizeWithSpotify()}>Authorize with Spotify</Button>
                    </div>
                    <div className='homepage-form-section'>
                        <div className='homepage-step-label'>Step 2</div>
                        <div className='homepage-form-sublabel'>Select the week that you want to create the playlist for</div>
                        <DatePicker minDate={dayjs(new Date().toISOString().split('T')[0], 'YYYY-MM-DD')} picker='week' onChange={(weekObj) => this.setWeek(weekObj)}/>
                    </div>
                    <div className='homepage-form-section'>
                        <div className='homepage-step-label'>Step 3</div>
                        <div className='homepage-form-sublabel'>Please subscribe to automatic playlists per week via email</div>
                        <Input placeholder='Enter your email address' onChange={(e) => this.setEmail(e.target.value)}/>
                    </div>
                    <div className='homepage-form-section'>
                        <div className='homepage-step-label'>Step 4</div>
                        <div className='homepage-form-sublabel'>Click the button below to generate the playlist</div>
                        <Button onClick={() => this.generatePlaylist()}>Generate Playlist</Button>
                    </div>
                    <div className='homepage-form-section'>
                        <div className='homepage-step-label'>Step 5</div>
                        <div className='homepage-form-sublabel'>View the playlist below or the in SF Bangers playlist folder in your Spotify library</div>
                        {percentage !== 100 ?
                            <Progress percent={percentage} status="active" /> :
                            <iframe
                                className='generated-playlist-frame'
                                data-testid="embed-iframe"
                                src="https://open.spotify.com/embed/playlist/3LznaAI7XVhPyzp8eopWfv"
                                allowFullScreen=""
                                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                                loading="lazy"
                            />

                        }
                    </div>
                </div>
            </div>
        );
    }

}

export default HomePage;