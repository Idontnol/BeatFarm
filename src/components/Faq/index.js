import { useState } from 'react';
import { faqData } from '../../utils/data';
import { FiPlus,FiMinus } from "react-icons/fi";
import './index.css';

const Faq=()=>{
    const [activeIndex,setActiveIndex]=useState(null);

    const toggleAnswer=(index)=>{
        setActiveIndex(activeIndex===index?null:index)
    }
    
    return(
        <div className='faq-outer-container' id="faq"> 
        <div className='faq-container'>
            <h1 className='faq-title'>Frequently Asked Questions</h1>
            <div className='faq-section'>
                {faqData.map((faq,idx)=>(
                    <div className='faq-item'>
                        <div className='faq-question-outer'
                         onClick={() => toggleAnswer(idx)}>
                            <h3
                            className="faq-question" 
                           
                            > {faq.question} </h3>
                            {activeIndex === idx ? <FiMinus />: <FiPlus/>}
                           
                        </div>
                        
                        {activeIndex === idx && (
                            <p className="faq-answer">{faq.answer}</p>
                        )}
                    </div>
                ))}
            </div>
        </div>
        </div>
    )
}

export default Faq;
