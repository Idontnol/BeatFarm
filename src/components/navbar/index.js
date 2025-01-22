import { useNavigate } from 'react-router-dom';
import './index.css';
import {useState} from 'react';
import { MdMenu } from "react-icons/md";
import { IoCloseSharp } from "react-icons/io5";
 
 const Navbar=(props)=>{
    const {setShowSignUpModal}=props;
    const navigate=useNavigate();

    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
      setIsOpen(!isOpen);
    };
    const [currentTab,setCurrentTab]=useState("");
    
    return(
        <>
        <header className="navbar">
            <div className="navbar-logo" onClick={()=>{navigate("/")}}>
                <h1 >Beat Farm</h1>
            </div>
         
                <ul className='tabs'>
                    <li><div 
                    className={currentTab==='1'? 'tab-active' : ''} onClick={()=>{setCurrentTab('1');navigate('/all-beats')}}>All Beats</div></li>
                    <li><div href="/free-beats"
                    className={currentTab==='2'? 'tab-active' : ''} onClick={()=>{setCurrentTab('2');navigate('/free-beats')}}>Free Beats</div></li>
                    <li><div href="/premium-beats"
                    className={currentTab==='3'? 'tab-active' : ''} onClick={()=>{setCurrentTab('3');navigate('/premium-beats')}}>Premium Beats</div></li>
                    <li><a href="#license-info"
                    className={currentTab==='4'? 'tab-active' : ''} onClick={()=>{setCurrentTab('4')}}>License Info</a></li>
                    <li><a href="#faq"
                    className={currentTab==='5'? 'tab-active' : ''} onClick={()=>{setCurrentTab('5')}}>FAQ</a></li>
                    <li><a href="#contact"
                    className={currentTab==='6'? 'tab-active' : ''} onClick={()=>{setCurrentTab('6')}}>Contact</a></li>
                </ul>

                
               
              
            <div className="navbar-cta">
                <button className="cta-button" onClick={()=>{setShowSignUpModal(t=>!t)}}>Sign Up / Log In</button>
            </div>

            <div className='navbar-cta-mob-right'>
                <div className="navbar-cta-mobile">
                    <button className="cta-button" onClick={()=>{setShowSignUpModal(t=>!t)}}>Sign Up / Log In</button>
                </div>

                <div className="menu-toggle hamburger" onClick={toggleMenu}>
                {isOpen ? <IoCloseSharp />:<MdMenu />}
                </div>
            </div>
            
        </header>
        {isOpen && (
                    <div className="mobile-menu">
                        <ul className='tabs-mobile'>
                            <li><div 
                            className={currentTab==='1'? '' : ''} onClick={()=>{setCurrentTab('1');navigate('/all-beats');toggleMenu();}}>All Beats</div></li>
                            <li><div 
                            className={currentTab==='2'? '' : ''} onClick={()=>{setCurrentTab('2');navigate('/free-beats');toggleMenu();}}>Free Beats</div></li>
                            <li><div 
                            className={currentTab==='3'? '' : ''} onClick={()=>{setCurrentTab('3');navigate('/premium-beats');toggleMenu();}}>Premium Beats</div></li>
                            <li><a 
                            href="#license-info" className={currentTab==='4'? '' : ''} onClick={()=>{setCurrentTab('4');toggleMenu();}}>License Info</a></li>
                            <li><a 
                            href="#faq" className={currentTab==='5'? '' : ''} onClick={()=>{setCurrentTab('5');toggleMenu();}}>FAQ</a></li>
                            <li><a 
                            href="#contact" className={currentTab==='6'? '' : ''} onClick={()=>{setCurrentTab('6');toggleMenu();}}>Contact</a></li>
                        </ul>
                    </div>
                )}
        </>
    )
}

export default Navbar;