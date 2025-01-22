import React, { useContext, useEffect, useRef, useState } from 'react';
import { currentUrl, freeBeats } from '../../utils/data';
import WaveSurfer from 'wavesurfer.js';
import { MdContentCopy } from "react-icons/md";
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
// import Meyda from 'meyda';
import './index.css';
import { beatContext } from '../../context/beatContext';

const FreeBeat = () => {
    // State to hold BPM
    const [bpms, setBpms] = useState([]);
    // Ref for WaveSurfer instances
    const waveSurferRefs = useRef([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [shareUrl, setShareUrl] = useState('');
    const {activeBeat}=useContext(beatContext);
    const [copySuccess, setCopySuccess] = useState(false);

    const [playingIndex, setPlayingIndex] = useState(null);
    const [isActiveBeatPlaying, setIsActiveBeatPlaying] = useState(false);

    // Ref for the activeBeat's audio player
    const activeAudioRef = useRef(null);


    // Function to create waveform
    const createWaveSurfer = (index, audioUrl) => {
        if (!waveSurferRefs.current[index]) {
            // If it doesn't exist, create a new WaveSurfer instance
            waveSurferRefs.current[index] = WaveSurfer.create({
                container: `#waveform-${index}`,
                waveColor: '#F5E6D3',
                progressColor: '#00A4E4',
                height: 50,
            });
    
            // Load the audio URL into the newly created WaveSurfer instance
            waveSurferRefs.current[index].load(audioUrl);
        } 
    };
    const handleActiveBeatPlayPause = () => {
        if (isActiveBeatPlaying) {
            activeAudioRef.current.audio.current.pause();
            setIsActiveBeatPlaying(false);
        } else {
            if (playingIndex !== null) {
                waveSurferRefs.current[playingIndex].pause(); // To Pause any playing list beat
                setPlayingIndex(null); // Reset playing index
            }
            activeAudioRef.current.audio.current.play();
            setIsActiveBeatPlaying(true);
        }
    };

    // Function to calculate BPM from the audio
    const calculateBPM = async (audioUrl) => {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const response = await fetch(audioUrl);
        const arrayBuffer = await response.arrayBuffer();
        const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

        // Use Meyda to analyze the audio buffer
        const bufferLength = 2048;
        const buffer = new Float32Array(bufferLength);
        const input = audioBuffer.getChannelData(0);
        // const sampleRate = audioBuffer.sampleRate;

        let beats = 0;
        let lastEnergy = 0;
        const threshold = 0.05;

        for (let i = 0; i < input.length; i += bufferLength) {
            buffer.set(input.subarray(i, i + bufferLength));

            // Calculate energy
            const energy = buffer.reduce((acc, sample) => acc + sample ** 2, 0) / bufferLength;

            // Check for beats
            if (energy > threshold && lastEnergy <= threshold) {
                beats++;
            }

            lastEnergy = energy;
        }

        // Calculate BPM
        const durationInMinutes = audioBuffer.duration / 60;
        const bpm = (beats / durationInMinutes) * 60;

        return Math.round(bpm);
    };

    useEffect(() => {
        try{
              // eslint-disable-next-line no-unused-vars
        const bpmPromises = freeBeats.map((beat, idx) => {
            createWaveSurfer(idx, beat.audioUrl);
            return calculateBPM(beat.audioUrl).then(bpm => {
                setBpms(prev => {
                    const newBpms = [...prev];
                    newBpms[idx] = bpm;
                    return newBpms;
                });
            });
        });

        // Cleanup on unmount
        // return () => {
        //     waveSurferRefs.current.forEach(ws => {
        //         if (ws && typeof ws.destroy === 'function') {
        //             ws.destroy();
        //         }
        //     });
        // };
        }
        catch(e){
            console.error(e);
        }

    }, []);
    
    const handlePlayPause = (index) => {
        if (playingIndex === index) {
            waveSurferRefs.current[index].pause();
            setPlayingIndex(null);
         }
        else {
            if (playingIndex !== null) {
                waveSurferRefs.current[playingIndex].pause(); // Pause the currently playing beat
            }
            if (isActiveBeatPlaying) {
                activeAudioRef.current.audio.current.pause(); // Pause active beat
                setIsActiveBeatPlaying(false); // Stop active beat playing
            }
            waveSurferRefs.current[index].play();
            setPlayingIndex(index);
        }
    };
    const openShareModal = (beatUrl) => {
        setShareUrl(beatUrl); // Set the shareable URL (can be dynamic)
        setIsModalOpen(true); // Open the modal
    };

    // Function to handle copying URL to clipboard
    const copyToClipboard = () => {
        navigator.clipboard.writeText(currentUrl+shareUrl)
            .then(() =>{ setCopySuccess(true); // Show the confirmation message
            setTimeout(() => setCopySuccess(false), 5000);} )
            .catch(err => console.error("Error copying URL: ", err));
    };


    return (
        <div className='beatsmain-container' style={{ backgroundColor: '#F5E6D3' }}>
           <h1 style={{ display: 'inline-flex', color: "#4A3728" }}>Free Beats</h1>
            {/* Active Beat Section */}
            {activeBeat && (
                <div className="active-beat-container" style={{ display: 'flex', alignItems: 'center', marginBottom: '40px', backgroundColor: '#FFFFFF', borderRadius: '10px', padding: '20px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
                    <img src={activeBeat.image} alt={activeBeat.description} style={{ width: '200px', height: '200px', borderRadius: '10px', marginRight: '20px' }} />
                    <div className="active-beat-details">
                        <h2 style={{ color: '#4A3728' }}>{activeBeat.description}</h2>
                        <AudioPlayer
                         ref={activeAudioRef}
                            src={activeBeat.audioUrl}
                            onPlay={handleActiveBeatPlayPause}
                            onPause={() => setIsActiveBeatPlaying(false)}
                            customAdditionalControls={[]} // Hides extra controls like loop, mute, etc.
                            customVolumeControls={[]} // Hides volume control for simplicity
                            layout="horizontal-reverse"
                            style={{width:'140%'}}
                            autoPlay={true}
                        />
                    </div>
                </div>
            )}
            <div className='beatlist-outer-container'>
                <div className="beatlist-container">
                    <div className="beatlist-header ">
                        <div>Play</div>
                        <div>Track Name</div>
                        <div>Waveform</div>
                        <div>Key</div>
                        <div>BPM</div>
                        <div>Actions</div>
                    </div>
                    {freeBeats.map((beat, idx) => (
                        <div className="beatlist-row" key={idx}>
                            <div className="beat-play">
                                <button className="play-btn" onClick={() => handlePlayPause(idx)}>
                                        {playingIndex === idx ? '❚❚' : '▶'}
                                </button>
                            </div>
                            <div className="beat-track">{beat.description}</div>
                            <div className="beat-waveform">
                                <div id={`waveform-${idx}`} className="waveform-placeholder"></div>
                            </div>
                            <div className="beat-key">{beat.key}</div>
                            <div className="beat-bpm">{bpms[idx] || 'Calculating...'}</div>
                            <div className="beat-actions">
                            <button className="action-btn share-btn" onClick={() => openShareModal(beat.audioUrl)}>Share</button>
                                <button className="action-btn cart-btn">Add to Cart</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {/* <div className="beatlist-container-mobi">
                <div className="beatlist-header ">
                    <div>Play</div>
                    <div>Waveform</div>
                    <div>Actions</div>
                </div>
                {freeBeats.map((beat, idx) => (
                    <div className="beatlist-row" key={idx}>
                        <div className="beat-play">
                            <button className="play-btn" onClick={() => handlePlayPause(idx)}>
                                    {playingIndex === idx ? '❚❚' : '▶'}
                            </button>
                        </div>
                       
                        <div className="beat-waveform">
                            <div id={`waveform-${idx}`} className="waveform-placeholder"></div>
                            <p>{beat.description}</p>
                        </div>
                        <div className="beat-actions">
                            <button className="action-btn share-btn" onClick={() => openShareModal(beat.audioUrl)}>Share</button>
                            <button className="action-btn cart-btn">Add to Cart</button>
                        </div>
                    </div>
                ))}
            </div> */}
            {/* Modal for Sharing */}
            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2 >Share this beat</h2>
                        <div className="share-content">
                            {/* <p className='beat-logo'>Beat Farm</p> */}
                            <div className="url-container">
                                <p>{shareUrl}</p>
                                <button className="copy-btn" onClick={copyToClipboard}>
                                    <MdContentCopy />
                                </button>
                            </div>
                            
                        </div>
                        {copySuccess && <p className="copy-success-message">URL copied to clipboard!</p>}
                        <button className="close-btn" onClick={() => setIsModalOpen(false)}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FreeBeat;
