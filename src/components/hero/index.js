import { filters, freeBeats } from "../../utils/data";
import { FaSearch } from "react-icons/fa";
import Sidebar from "../sidebar";
import "./index.css";
import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { beatContext } from "../../context/beatContext";

const Hero = () => {
  const scrollContainerRef = useRef(null);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const navigate = useNavigate();
  const scrollSpeed = 3;
  const {setActiveBeat}=useContext(beatContext);

  const scrollLeft = () => {
    scrollContainerRef.current.scrollBy({ left: -150, behavior: 'smooth' });
    setIsAutoScrolling(false); 
  };

  const scrollRight = () => {
    scrollContainerRef.current.scrollBy({ left: 150, behavior: 'smooth' });
    setIsAutoScrolling(false); 
  };
  useEffect(() => {
    let scrollInterval;
    const maxScroll = scrollContainerRef.scrollWidth - scrollContainerRef.clientWidth;
    const currentScroll = scrollContainerRef.scrollLeft;
    if (currentScroll + scrollContainerRef.clientWidth >= maxScroll) {
      // Scroll back to the start when reaching the end
      console.log("got triggered infinite scroll");
      scrollContainerRef.scrollTo({ left: 0, behavior: `${ true ?'auto':'smooth'}` });
    } 
    else{
      scrollInterval = setInterval(() => {
        if (scrollContainerRef.current) {
          scrollContainerRef.current.scrollBy({ left: scrollSpeed, behavior: 'smooth' });
        }
      }, 50); // Adjust the interval time for smoothness
    }

    // Cleanup the interval when component unmounts
    return () => clearInterval(scrollInterval);
  }, [isAutoScrolling]);

  return (
    <div className="main-container">
      <Sidebar />
      <div className="hero-section">
        {/* Headline */}
        <h1 className="hero-headline">FRESH Packs Hot Off The Ranch</h1>

        {/* Carousel */}
        <div className="carousel-container">
          <div className="carousel-arrow" onClick={scrollLeft}>
            ←
          </div>
          <div className="carousel-content" ref={scrollContainerRef}>
            {freeBeats.map((beat, idx) => (
              <div className="beat-item" key={idx} onClick={() =>{ setActiveBeat(beat);navigate('/free-beats')}}>
                <img src={beat.image} className="beat-image" alt={beat.description} />
              </div>
            ))}
          </div>
          <div className="carousel-arrow" onClick={scrollRight}>
            →
          </div>
        </div>

        {/* CTA Button */}
        <button className="check-packs-button" onClick={() => navigate('/all-beats')}>
          Check Out All Packs
        </button>

        {/* Search */}
        <div className="hero-input-container">
          <label htmlFor="search-input" className="search-label">
            <FaSearch className="search-icon" />
          </label>
          <input className="search-input" placeholder="Quick guide to search" id="search-input" />
        </div>

        {/* Filters */}
        <div className="filters-container">
          {filters.map((filter, idx) => (
            <div className="filter-button" key={idx}>
              {filter}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;
