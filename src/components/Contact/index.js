import './index.css';

const Contact=()=>{
    
    return(
        <div className='contact-container' id="contact">
            <div className='contact-left'>
                <h1>Contact Us</h1>
                <p>Welcome to Beat Farm, your premier online marketplace for discovering and purchasing high-quality instrumental tracks. Our platform connects talented music producers with artists, content creators, and music lovers who seek fresh, innovative beats. At Beat Farm, we blend a modern, tech-savvy approach with an earthy, organic vibe, creating a unique experience for both producers and buyers. Whether you’re looking to elevate your next project or share your beats with the world, we’re here to help you cultivate your musical journey.</p>
            </div>
            <form className='contact-right'>
                <div className='form-group'>
                    <div className=''>
                        <label>First Name</label>
                        <input type="" placeholder="" required />
                    </div>
                    <div className=''>
                        <label>Last Name</label>
                        <input type="" placeholder="" />
                    </div>
                </div>
                
                <label>Email</label>
                <input type="email" placeholder="" required />
                <label>Message</label>
                <textarea ></textarea>
                <button className='contact-sendbtn'>Send</button>
            </form>
        </div>
    )
}

export default Contact;