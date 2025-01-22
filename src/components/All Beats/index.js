import { useNavigate } from 'react-router-dom';
import { freeBeats, premiumBeats } from '../../utils/data';
import './index.css';
import { beatContext } from '../../context/beatContext';
import { useContext } from 'react';

const AllBeats=()=>{
    const navigate=useNavigate();
    const {setActiveBeat}=useContext(beatContext);
   

    return(
        <div className="allBeats-container">
            {/* <h2 className=''>All Beats</h2> */}
            <h2 className=''>Free Beats</h2>
            <div className='beats-list'>
                {freeBeats.map((beat,idx)=>
                    <div className='beat-itemz' onClick={() =>{ setActiveBeat(beat);navigate('/free-beats')}} >
                        <img src={beat.image} className='beat-image' alt={beat.description} />
                        <p>{beat.description}</p>
                    </div>)
                }
            </div>
        
            <h2 className="">Premium Beats</h2>
            <div className='beats-list'>
                {premiumBeats.map((beat,idx)=>
                    <div className='beat-itemz' onClick={()=>{setActiveBeat(beat);navigate('/premium-beats') }}>
                        <img src={beat.image} className='beat-image' alt={beat.description} />
                        <p>{beat.description}</p>
                    </div>)
                }
            </div>
        
        </div>
    )
}

export default AllBeats;