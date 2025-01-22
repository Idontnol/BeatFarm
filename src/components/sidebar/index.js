import { useNavigate } from 'react-router-dom';
import './index.css';
import { useContext } from 'react';
import { beatContext } from '../../context/beatContext';

const Sidebar=()=>{
    const navigate=useNavigate();
    const {setActiveBeat}=useContext(beatContext);

    return(
        <div className="sidebar-container">
            <h1 className="">Sign Up for Our Newsletter</h1>
            <input className='newsletter-email' placeholder="Enter your email here"  />

            <button className="newsletter-subscribe">Subscribe</button>
            <h1 className='featured-header'>Featured Playlists</h1>
            <ul className="playlists">
                <li className="" onClick={()=>{setActiveBeat(null);navigate('/free-beats')}}>Chill Beats</li>
                <li className="" onClick={()=>{setActiveBeat(null);navigate('/free-beats')}}>Workout Jams</li>
                <li className="" onClick={()=>{setActiveBeat(null);navigate('/free-beats')}}>Focus Tracks</li>
            </ul>
        </div>
    )
}

export default Sidebar;