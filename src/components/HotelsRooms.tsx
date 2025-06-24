import React, { FunctionComponent, useCallback, useState } from 'react';
import { useNavigate } from "react-router-dom";
import styles from './HotelsRooms.module.css';
import Layout from './Layout';

const HotelsRooms: FunctionComponent = () => {
  const navigate = useNavigate();
  const [hotelQuery, setHotelQuery] = useState('');
  const [showPriceRange, setShowPriceRange] = useState(false);
  const [showStarRating, setShowStarRating] = useState(false);
  const [showAmenities, setShowAmenities] = useState(false);
  const [showLocation, setShowLocation] = useState(false);
  const [showRoomType, setShowRoomType] = useState(false);

  const onLogoClick = useCallback(() => {
    navigate("/");
  }, [navigate]);

  const onHotelClick = (hotelId: string) => {
    navigate(`/hotel/${hotelId}`);
  };

  const onAmenityClick = (amenityType: string) => {
    navigate(`/amenities/${amenityType}`);
  };

  const onViewAllClick = useCallback(() => {
    navigate("/hotels");
  }, [navigate]);

  const handleHotelSearch = () => {
    console.log('Searching for hotels:', hotelQuery);
    // Add your hotel search logic here (API call/filtering)
  };

  const toggleFilter = (filterType: string) => {
    switch (filterType) {
      case 'price':
        setShowPriceRange(!showPriceRange);
        setShowStarRating(false);
        setShowAmenities(false);
        setShowLocation(false);
        setShowRoomType(false);
        break;
      case 'rating':
        setShowStarRating(!showStarRating);
        setShowPriceRange(false);
        setShowAmenities(false);
        setShowLocation(false);
        setShowRoomType(false);
        break;
      case 'amenities':
        setShowAmenities(!showAmenities);
        setShowPriceRange(false);
        setShowStarRating(false);
        setShowLocation(false);
        setShowRoomType(false);
        break;
      case 'location':
        setShowLocation(!showLocation);
        setShowPriceRange(false);
        setShowStarRating(false);
        setShowAmenities(false);
        setShowRoomType(false);
        break;
      case 'roomType':
        setShowRoomType(!showRoomType);
        setShowPriceRange(false);
        setShowStarRating(false);
        setShowAmenities(false);
        setShowLocation(false);
        break;
      default:
        break;
    }
  };

  return (
    <Layout>
    <div className={styles.hotelsRooms}>
      {/* Navbar */}
      <div className={styles.depth0Frame0}>
        <div className={styles.depth1Frame0}>
          {/* <div className={styles.navbarWrapper}>
            <div className={styles.navbar}>
              <div className={styles.depth3Frame0} onClick={onLogoClick}>
                <img className={styles.depth4Frame0} alt="" src="/Figma_photoes/wandernest.svg" />
                <div className={styles.depth4Frame1}>
                  <b className={styles.wandernest}>WanderNest</b>
                </div>
              </div>
              <div className={styles.depth3Frame1}>
                <div className={styles.depth4Frame01}>
                 <div className={styles.depth4Frame1} onClick={() => navigate("/destinations")}>
  <div className={styles.destinations}>Destinations</div>
</div>
                  <div className={styles.depth4Frame1} onClick={() => navigate("/hotels-rooms")}>
                    <div className={styles.destinations}>Hotels</div>
                  </div>
                  <div className={styles.depth5Frame2} onClick={() => navigate("/flights")}>
                    <div className={styles.flights}>Flights</div>
                  </div>
                  <div className={styles.depth4Frame1} onClick={() => navigate("/packages")}>
                    <div className={styles.destinations}>Packages</div>
                  </div>
                </div>
                <div className={styles.depth4Frame11}>
                  <div className={styles.depth5Frame01} onClick={() => navigate("/signup")}>
                    <div className={styles.depth6Frame0}>
                      <b className={styles.signUp}>Sign up</b>
                    </div>
                  </div>
                  <div className={styles.depth5Frame11} onClick={() => navigate("/login")}>
                    <div className={styles.depth6Frame0}>
                      <b className={styles.signUp}>Log in</b>
                    </div>
                  </div>
                  <img className={styles.depth5Frame21} alt="" src="/Figma_photoes/world.svg" />
                </div>
              </div>
            </div>
          </div> */}

          {/* Main Content */}
          <div className={styles.depth2Frame1}>
            {/* Filters Sidebar */}
            <div className={styles.depth3Frame01}>
              <div className={styles.depth4Frame02}>
                {/* Updated Search Input */}
                <div className={styles.depth5Frame02}>
                  <div className={styles.searchContainer}>
                    <input
                      type="text"
                      value={hotelQuery}
                      onChange={(e) => setHotelQuery(e.target.value)}
                      placeholder="Search hotels, rooms..."
                      className={styles.searchInput}
                    />
                    <button className={styles.searchButton} onClick={handleHotelSearch}>
                      Search
                    </button>
                  </div>
                </div>
              </div>
              <div className={styles.depth4Frame12}>
                {/* Price Range Filter */}
                <div className={styles.depth5Frame03} onClick={() => toggleFilter('price')}>
                  <div className={styles.depth6Frame03}>
                    <div className={styles.destinations}>Price Range</div>
                  </div>
                  <img className={styles.depth6Frame1} alt="" src="/Figma_photoes/downarrow.png" />
                  {showPriceRange && (
                    <div className={styles.filterOptions}>
                      <div className={styles.filterOption}>$0 - $50</div>
                      <div className={styles.filterOption}>$50 - $100</div>
                      <div className={styles.filterOption}>$100 - $200</div>
                      <div className={styles.filterOption}>$200+</div>
                    </div>
                  )}
                </div>

                {/* Star Rating Filter */}
                <div className={styles.depth5Frame03} onClick={() => toggleFilter('rating')}>
                  <div className={styles.depth6Frame03}>
                    <div className={styles.destinations}>Star Rating</div>
                  </div>
                  <img className={styles.depth6Frame1} alt="" src="/Figma_photoes/downarrow.png" />
                  {showStarRating && (
                    <div className={styles.filterOptions}>
                      <div className={styles.filterOption}>
                        <img src="/Figma_photoes/star.svg" alt="5 stars" /> 5 stars
                      </div>
                      <div className={styles.filterOption}>
                        <img src="/Figma_photoes/star.svg" alt="4 stars" /> 4 stars
                      </div>
                      <div className={styles.filterOption}>
                        <img src="/Figma_photoes/star.svg" alt="3 stars" /> 3 stars
                      </div>
                      <div className={styles.filterOption}>
                        <img src="/Figma_photoes/star.svg" alt="2 stars" /> 2 stars
                      </div>
                      <div className={styles.filterOption}>
                        <img src="/Figma_photoes/star.svg" alt="1 star" /> 1 star
                      </div>
                    </div>
                  )}
                </div>

                {/* Amenities Filter */}
                <div className={styles.depth5Frame03} onClick={() => toggleFilter('amenities')}>
                  <div className={styles.depth6Frame03}>
                    <div className={styles.destinations}>Amenities</div>
                  </div>
                  <img className={styles.depth6Frame1} alt="" src="/Figma_photoes/downarrow.png" />
                  {showAmenities && (
                    <div className={styles.filterOptions}>
                      <div className={styles.filterOption}>WiFi</div>
                      <div className={styles.filterOption}>Pool</div>
                      <div className={styles.filterOption}>Gym</div>
                      <div className={styles.filterOption}>Spa</div>
                      <div className={styles.filterOption}>Restaurant</div>
                    </div>
                  )}
                </div>

                {/* Location Filter */}
                <div className={styles.depth5Frame03} onClick={() => toggleFilter('location')}>
                  <div className={styles.depth6Frame03}>
                    <div className={styles.destinations}>Location</div>
                  </div>
                  <img className={styles.depth6Frame1} alt="" src="/Figma_photoes/downarrow.png" />
                  {showLocation && (
                    <div className={styles.filterOptions}>
                      <div className={styles.filterOption}>City Center</div>
                      <div className={styles.filterOption}>Beachfront</div>
                      <div className={styles.filterOption}>Mountain View</div>
                      <div className={styles.filterOption}>Countryside</div>
                    </div>
                  )}
                </div>

                {/* Room Type Filter */}
                <div className={styles.depth5Frame03} onClick={() => toggleFilter('roomType')}>
                  <div className={styles.depth6Frame03}>
                    <div className={styles.destinations}>Room Type</div>
                  </div>
                  <img className={styles.depth6Frame1} alt="" src="/Figma_photoes/downarrow.png" />
                  {showRoomType && (
                    <div className={styles.filterOptions}>
                      <div className={styles.filterOption}>Single</div>
                      <div className={styles.filterOption}>Double</div>
                      <div className={styles.filterOption}>Suite</div>
                      <div className={styles.filterOption}>Family</div>
                    </div>
                  )}
                </div>
              </div>
              <div className={styles.depth4Frame2}>
                <div className={styles.depth5Frame04}>
                  <div className={styles.depth6Frame08}>
                    <img className={styles.depth7Frame01} alt="" src="/Figma_photoes/oside.svg" />
                    <div className={styles.depth7Frame11}>
                      <b className={styles.localRestaurants}>November 2025</b>
                    </div>
                  </div>
                  <div className={styles.depth6Frame15}>
                    <div className={styles.depth7Frame02}>
                      <div className={styles.depth8Frame0}>
                        <b className={styles.s}>S</b>
                      </div>
                      <div className={styles.depth8Frame0}>
                        <b className={styles.s}>M</b>
                      </div>
                      <div className={styles.depth8Frame0}>
                        <b className={styles.s}>T</b>
                      </div>
                      <div className={styles.depth8Frame0}>
                        <b className={styles.s}>W</b>
                      </div>
                      <div className={styles.depth8Frame0}>
                        <b className={styles.s}>T</b>
                      </div>
                      <div className={styles.depth8Frame0}>
                        <b className={styles.s}>F</b>
                      </div>
                      <div className={styles.depth8Frame0}>
                        <b className={styles.s}>S</b>
                      </div>
                    </div>
                    <div className={styles.depth7Frame12}>
                      <div className={styles.depth8Frame01}>
                        <div className={styles.depth9Frame0}>
                          <div className={styles.div}>1</div>
                        </div>
                      </div>
                      <div className={styles.depth8Frame01}>
                        <div className={styles.depth9Frame0}>
                          <div className={styles.div}>2</div>
                        </div>
                      </div>
                      <div className={styles.depth8Frame01}>
                        <div className={styles.depth9Frame0}>
                          <div className={styles.div}>3</div>
                        </div>
                      </div>
                      <div className={styles.depth8Frame01}>
                        <div className={styles.depth9Frame0}>
                          <div className={styles.div}>4</div>
                        </div>
                      </div>
                      <div className={styles.depth8Frame41}>
                        <div className={styles.depth9Frame04}>
                          <div className={styles.div}>5</div>
                        </div>
                      </div>
                      <div className={styles.depth8Frame51}>
                        <div className={styles.depth9Frame0}>
                          <div className={styles.div}>6</div>
                        </div>
                      </div>
                      <div className={styles.depth8Frame51}>
                        <div className={styles.depth9Frame0}>
                          <div className={styles.div}>7</div>
                        </div>
                      </div>
                    </div>
                    <div className={styles.depth7Frame12}>
                      <div className={styles.depth8Frame51}>
                        <div className={styles.depth9Frame0}>
                          <div className={styles.div}>8</div>
                        </div>
                      </div>
                      <div className={styles.depth8Frame51}>
                        <div className={styles.depth9Frame0}>
                          <div className={styles.div}>9</div>
                        </div>
                      </div>
                      <div className={styles.depth8Frame51}>
                        <div className={styles.depth9Frame0}>
                          <div className={styles.div}>10</div>
                        </div>
                      </div>
                      <div className={styles.depth8Frame51}>
                        <div className={styles.depth9Frame0}>
                          <div className={styles.div}>11</div>
                        </div>
                      </div>
                      <div className={styles.depth8Frame51}>
                        <div className={styles.depth9Frame0}>
                          <div className={styles.div}>12</div>
                        </div>
                      </div>
                      <div className={styles.depth8Frame51}>
                        <div className={styles.depth9Frame0}>
                          <div className={styles.div}>13</div>
                        </div>
                      </div>
                      <div className={styles.depth8Frame51}>
                        <div className={styles.depth9Frame0}>
                          <div className={styles.div}>14</div>
                        </div>
                      </div>
                    </div>
                    <div className={styles.depth7Frame12}>
                      <div className={styles.depth8Frame51}>
                        <div className={styles.depth9Frame0}>
                          <div className={styles.div}>15</div>
                        </div>
                      </div>
                      <div className={styles.depth8Frame51}>
                        <div className={styles.depth9Frame0}>
                          <div className={styles.div}>16</div>
                        </div>
                      </div>
                      <div className={styles.depth8Frame51}>
                        <div className={styles.depth9Frame0}>
                          <div className={styles.div}>17</div>
                        </div>
                      </div>
                      <div className={styles.depth8Frame51}>
                        <div className={styles.depth9Frame0}>
                          <div className={styles.div}>18</div>
                        </div>
                      </div>
                      <div className={styles.depth8Frame51}>
                        <div className={styles.depth9Frame0}>
                          <div className={styles.div}>19</div>
                        </div>
                      </div>
                      <div className={styles.depth8Frame51}>
                        <div className={styles.depth9Frame0}>
                          <div className={styles.div}>20</div>
                        </div>
                      </div>
                      <div className={styles.depth8Frame51}>
                        <div className={styles.depth9Frame0}>
                          <div className={styles.div}>21</div>
                        </div>
                      </div>
                    </div>
                    <div className={styles.depth7Frame12}>
                      <div className={styles.depth8Frame51}>
                        <div className={styles.depth9Frame0}>
                          <div className={styles.div}>22</div>
                        </div>
                      </div>
                      <div className={styles.depth8Frame51}>
                        <div className={styles.depth9Frame0}>
                          <div className={styles.div}>23</div>
                        </div>
                      </div>
                      <div className={styles.depth8Frame51}>
                        <div className={styles.depth9Frame0}>
                          <div className={styles.div}>24</div>
                        </div>
                      </div>
                      <div className={styles.depth8Frame51}>
                        <div className={styles.depth9Frame0}>
                          <div className={styles.div}>25</div>
                        </div>
                      </div>
                      <div className={styles.depth8Frame51}>
                        <div className={styles.depth9Frame0}>
                          <div className={styles.div}>26</div>
                        </div>
                      </div>
                      <div className={styles.depth8Frame51}>
                        <div className={styles.depth9Frame0}>
                          <div className={styles.div}>27</div>
                        </div>
                      </div>
                      <div className={styles.depth8Frame51}>
                        <div className={styles.depth9Frame0}>
                          <div className={styles.div}>28</div>
                        </div>
                      </div>
                    </div>
                    <div className={styles.depth7Frame12}>
                      <div className={styles.depth8Frame51}>
                        <div className={styles.depth9Frame0}>
                          <div className={styles.div}>29</div>
                        </div>
                      </div>
                      <div className={styles.depth8Frame51}>
                        <div className={styles.depth9Frame0}>
                          <div className={styles.div}>30</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={styles.depth5Frame04}>
                  <div className={styles.depth6Frame08}>
                    <div className={styles.depth7Frame03}>
                      <b className={styles.localRestaurants}>December 2025</b>
                    </div>
                    <img className={styles.depth7Frame01} alt="" src="/Figma_photoes/sidee.svg" />
                  </div>
                  <div className={styles.depth6Frame15}>
                    <div className={styles.depth7Frame02}>
                      <div className={styles.depth8Frame0}>
                        <b className={styles.s}>S</b>
                      </div>
                      <div className={styles.depth8Frame0}>
                        <b className={styles.s}>M</b>
                      </div>
                      <div className={styles.depth8Frame0}>
                        <b className={styles.s}>T</b>
                      </div>
                      <div className={styles.depth8Frame0}>
                        <b className={styles.s}>W</b>
                      </div>
                      <div className={styles.depth8Frame0}>
                        <b className={styles.s}>T</b>
                      </div>
                      <div className={styles.depth8Frame0}>
                        <b className={styles.s}>F</b>
                      </div>
                      <div className={styles.depth8Frame0}>
                        <b className={styles.s}>S</b>
                      </div>
                    </div>
                    <div className={styles.depth7Frame14}>
                      <div className={styles.depth8Frame51}>
                        <div className={styles.depth9Frame0}>
                          <div className={styles.div}>1</div>
                        </div>
                      </div>
                      <div className={styles.depth8Frame51}>
                        <div className={styles.depth9Frame0}>
                          <div className={styles.div}>2</div>
                        </div>
                      </div>
                      <div className={styles.depth8Frame51}>
                        <div className={styles.depth9Frame0}>
                          <div className={styles.div}>3</div>
                        </div>
                      </div>
                      <div className={styles.depth8Frame51}>
                        <div className={styles.depth9Frame0}>
                          <div className={styles.div}>4</div>
                        </div>
                      </div>
                      <div className={styles.depth8Frame51}>
                        <div className={styles.depth9Frame0}>
                          <div className={styles.div}>5</div>
                        </div>
                      </div>
                      <div className={styles.depth8Frame51}>
                        <div className={styles.depth9Frame0}>
                          <div className={styles.div}>6</div>
                        </div>
                      </div>
                      <div className={styles.depth8Frame66}>
                        <div className={styles.depth9Frame04}>
                          <div className={styles.div}>7</div>
                        </div>
                      </div>
                    </div>
                    <div className={styles.depth7Frame12}>
                      <div className={styles.depth8Frame01}>
                        <div className={styles.depth9Frame0}>
                          <div className={styles.div}>8</div>
                        </div>
                      </div>
                      <div className={styles.depth8Frame01}>
                        <div className={styles.depth9Frame0}>
                          <div className={styles.div}>9</div>
                        </div>
                      </div>
                      <div className={styles.depth8Frame01}>
                        <div className={styles.depth9Frame0}>
                          <div className={styles.div}>10</div>
                        </div>
                      </div>
                      <div className={styles.depth8Frame01}>
                        <div className={styles.depth9Frame0}>
                          <div className={styles.div}>11</div>
                        </div>
                      </div>
                      <div className={styles.depth8Frame01}>
                        <div className={styles.depth9Frame0}>
                          <div className={styles.div}>12</div>
                        </div>
                      </div>
                      <div className={styles.depth8Frame01}>
                        <div className={styles.depth9Frame0}>
                          <div className={styles.div}>13</div>
                        </div>
                      </div>
                      <div className={styles.depth8Frame01}>
                        <div className={styles.depth9Frame0}>
                          <div className={styles.div}>14</div>
                        </div>
                      </div>
                    </div>
                    <div className={styles.depth7Frame12}>
                      <div className={styles.depth8Frame01}>
                        <div className={styles.depth9Frame0}>
                          <div className={styles.div}>15</div>
                        </div>
                      </div>
                      <div className={styles.depth8Frame01}>
                        <div className={styles.depth9Frame0}>
                          <div className={styles.div}>16</div>
                        </div>
                      </div>
                      <div className={styles.depth8Frame01}>
                        <div className={styles.depth9Frame0}>
                          <div className={styles.div}>17</div>
                        </div>
                      </div>
                      <div className={styles.depth8Frame01}>
                        <div className={styles.depth9Frame0}>
                          <div className={styles.div}>18</div>
                        </div>
                      </div>
                      <div className={styles.depth8Frame01}>
                        <div className={styles.depth9Frame0}>
                          <div className={styles.div}>19</div>
                        </div>
                      </div>
                      <div className={styles.depth8Frame01}>
                        <div className={styles.depth9Frame0}>
                          <div className={styles.div}>20</div>
                        </div>
                      </div>
                      <div className={styles.depth8Frame01}>
                        <div className={styles.depth9Frame0}>
                          <div className={styles.div}>21</div>
                        </div>
                      </div>
                    </div>
                    <div className={styles.depth7Frame12}>
                      <div className={styles.depth8Frame01}>
                        <div className={styles.depth9Frame0}>
                          <div className={styles.div}>22</div>
                        </div>
                      </div>
                      <div className={styles.depth8Frame01}>
                        <div className={styles.depth9Frame0}>
                          <div className={styles.div}>23</div>
                        </div>
                      </div>
                      <div className={styles.depth8Frame01}>
                        <div className={styles.depth9Frame0}>
                          <div className={styles.div}>24</div>
                        </div>
                      </div>
                      <div className={styles.depth8Frame01}>
                        <div className={styles.depth9Frame0}>
                          <div className={styles.div}>25</div>
                        </div>
                      </div>
                      <div className={styles.depth8Frame01}>
                        <div className={styles.depth9Frame0}>
                          <div className={styles.div}>26</div>
                        </div>
                      </div>
                      <div className={styles.depth8Frame01}>
                        <div className={styles.depth9Frame0}>
                          <div className={styles.div}>27</div>
                        </div>
                      </div>
                      <div className={styles.depth8Frame01}>
                        <div className={styles.depth9Frame0}>
                          <div className={styles.div}>28</div>
                        </div>
                      </div>
                    </div>
                    <div className={styles.depth7Frame12}>
                      <div className={styles.depth8Frame01}>
                        <div className={styles.depth9Frame0}>
                          <div className={styles.div}>29</div>
                        </div>
                      </div>
                      <div className={styles.depth8Frame01}>
                        <div className={styles.depth9Frame0}>
                          <div className={styles.div}>30</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Hotel Listings */}
            <div className={styles.depth3Frame11}>
              <div className={styles.depth4Frame03}>
                <div className={styles.depth5Frame05}>
                  <div className={styles.depth5Frame2}>
                    <div className={styles.exploreHotelsAnd}>Explore Hotels and Rooms</div>
                  </div>
                  <div className={styles.depth6Frame17}>
                    <div className={styles.findThePerfect}>Find the perfect stay for your travel needs.</div>
                  </div>
                </div>
                <div className={styles.depth5Frame14} onClick={onViewAllClick}>
                  <div className={styles.depth6Frame0}>
                    <b className={styles.signUp}>View All</b>
                  </div>
                </div>
              </div>
              <div className={styles.depth4Frame13}>
                <div className={styles.depth5Frame06}>
                  <div className={styles.depth6Frame012} onClick={() => onHotelClick("six-seasons")}>
                    <img className={styles.depth7Frame05} alt="" src="/Figma_photoes/six-seasons-hotel.jpg" />
                    <div className={styles.depth1Frame0}>
                      <div className={styles.depth1Frame0}>
                        <div className={styles.luxuryHotel}>Luxury Hotel</div>
                      </div>
                      <div className={styles.depth8Frame112}>
                        <div className={styles.starLuxuryExperience}>5-star luxury experience</div>
                      </div>
                    </div>
                  </div>
                  <div className={styles.depth6Frame012} onClick={() => onHotelClick("budget-inn")}>
                    <img className={styles.depth7Frame05} alt="" src="/Figma_photoes/inn.jpg" />
                    <div className={styles.depth1Frame0}>
                      <div className={styles.depth1Frame0}>
                        <div className={styles.luxuryHotel}>Budget Inn</div>
                      </div>
                      <div className={styles.depth8Frame112}>
                        <div className={styles.starLuxuryExperience}>Affordable and cozy</div>
                      </div>
                    </div>
                  </div>
                  <div className={styles.depth6Frame012} onClick={() => onHotelClick("beachside-resort")}>
                    <img className={styles.depth7Frame05} alt="" src="/Figma_photoes/swimming-pool.jpg" />
                    <div className={styles.depth1Frame0}>
                      <div className={styles.depth1Frame0}>
                        <div className={styles.luxuryHotel}>Beachside Resort</div>
                      </div>
                      <div className={styles.depth8Frame112}>
                        <div className={styles.starLuxuryExperience}>Relax by the sea</div>
                      </div>
                    </div>
                  </div>
                  <div className={styles.depth6Frame012} onClick={() => onHotelClick("mountain-retreat")}>
                    <img className={styles.depth7Frame05} alt="" src="/Figma_photoes/hillside-resort.jpg" />
                    <div className={styles.depth1Frame0}>
                      <div className={styles.depth1Frame0}>
                        <div className={styles.luxuryHotel}>Mountain Retreat</div>
                      </div>
                      <div className={styles.depth8Frame112}>
                        <div className={styles.starLuxuryExperience}>Breathtaking mountain views</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={styles.depth5Frame06}>
                  <div className={styles.depth6Frame012} onClick={() => onHotelClick("city-center")}>
                    <img className={styles.depth7Frame05} alt="" src="/Figma_photoes/city_center_hotel.png" />
                    <div className={styles.depth1Frame0}>
                      <div className={styles.depth1Frame0}>
                        <div className={styles.luxuryHotel}>City Center Hotel</div>
                      </div>
                      <div className={styles.depth8Frame112}>
                        <div className={styles.starLuxuryExperience}>Stay in the heart of the city</div>
                      </div>
                    </div>
                  </div>
                  <div className={styles.depth6Frame012} onClick={() => onHotelClick("countryside-lodge")}>
                    <img className={styles.depth7Frame05} alt="" src="/Figma_photoes/lodge.png" />
                    <div className={styles.depth1Frame0}>
                      <div className={styles.depth1Frame0}>
                        <div className={styles.luxuryHotel}>Countryside Lodge</div>
                      </div>
                      <div className={styles.depth8Frame112}>
                        <div className={styles.starLuxuryExperience}>Peaceful countryside escape</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.depth4Frame21}>
                <b className={styles.localAmenitiesAnd}>Local Amenities and Guides</b>
              </div>
              <div className={styles.depth4Frame3}>
                <div className={styles.depth5Frame06}>
                  <div className={styles.depth6Frame014} onClick={() => onAmenityClick("restaurants")}>
                    <img className={styles.depth7Frame011} alt="" src="/Figma_photoes/loc_res.svg" />
                    <div className={styles.depth7Frame111}>
                      <div className={styles.depth8Frame018}>
                        <b className={styles.localRestaurants}>Local Restaurants</b>
                      </div>
                      <div className={styles.depth8Frame112}>
                        <div className={styles.starLuxuryExperience}>Discover popular dining spots</div>
                      </div>
                    </div>
                  </div>
                  <div className={styles.depth6Frame110} onClick={() => onAmenityClick("attractions")}>
                    <img className={styles.depth7Frame011} alt="" src="/Figma_photoes/attraction.svg" />
                    <div className={styles.depth7Frame111}>
                      <div className={styles.depth8Frame018}>
                        <b className={styles.localRestaurants}>Tourist Attractions</b>
                      </div>
                      <div className={styles.depth8Frame112}>
                        <div className={styles.starLuxuryExperience}>Explore nearby places of interest</div>
                      </div>
                    </div>
                  </div>
                  <div className={styles.depth6Frame110} onClick={() => onAmenityClick("transport")}>
                    <img className={styles.depth7Frame011} alt="" src="/Figma_photoes/transport.svg" />
                    <div className={styles.depth7Frame111}>
                      <div className={styles.depth8Frame018}>
                        <b className={styles.localRestaurants}>Public Transport</b>
                      </div>
                      <div className={styles.depth8Frame112}>
                        <div className={styles.starLuxuryExperience}>Find transport options</div>
                      </div>
                    </div>
                  </div>
                  <div className={styles.depth6Frame110} onClick={() => onAmenityClick("shopping")}>
                    <img className={styles.depth7Frame011} alt="" src="/Figma_photoes/shop.svg" />
                    <div className={styles.depth7Frame111}>
                      <div className={styles.depth8Frame018}>
                        <b className={styles.localRestaurants}>Shopping Centers</b>
                      </div>
                      <div className={styles.depth8Frame112}>
                        <div className={styles.starLuxuryExperience}>Shop at the best locations</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.depth4Frame21}>
                <b className={styles.localAmenitiesAnd}>Forum and Reviews</b>
              </div>
              <div className={styles.depth4Frame5}>
                <div className={styles.depth5Frame08}>
                  <div className={styles.depth6Frame015}>
                    <div className={styles.depth7Frame115}>
                      <div className={styles.depth1Frame0}>
                        <div className={styles.luxuryHotel}>Ratul</div>
                      </div>
                      <div className={styles.depth8Frame112}>
                        <div className={styles.starLuxuryExperience}>Nov 1, 2025</div>
                      </div>
                    </div>
                  </div>
                  <div className={styles.depth6Frame111}>
                    <img className={styles.depth6Frame1} alt="" src="/Figma_photoes/star.svg" />
                    <img className={styles.depth6Frame1} alt="" src="/Figma_photoes/star.svg" />
                    <img className={styles.depth6Frame1} alt="" src="/Figma_photoes/star.svg" />
                    <img className={styles.depth6Frame1} alt="" src="/Figma_photoes/star.svg" />
                    <img className={styles.depth6Frame1} alt="" src="/Figma_photoes/star.svg" />
                  </div>
                  <div className={styles.depth1Frame0}>
                    <div className={styles.findThePerfect}>Amazing stay with great amenities.</div>
                  </div>
                  <div className={styles.depth6Frame32}>
                    <div className={styles.depth7Frame016}>
                      <img className={styles.depth6Frame1} alt="" src="/Figma_photoes/like.svg" />
                      <div className={styles.depth6Frame03}>
                        <div className={styles.findThePerfect}>12</div>
                      </div>
                    </div>
                    <img className={styles.depth7Frame117} alt="" src="/Figma_photoes/dislike.svg" />
                  </div>
                </div>
                <div className={styles.depth5Frame08}>
                  <div className={styles.depth6Frame015}>
                    <div className={styles.depth7Frame115}>
                      <div className={styles.depth1Frame0}>
                        <div className={styles.luxuryHotel}>Kashem</div>
                      </div>
                      <div className={styles.depth8Frame112}>
                        <div className={styles.starLuxuryExperience}>Oct 28, 2025</div>
                      </div>
                    </div>
                  </div>
                  <div className={styles.depth6Frame111}>
                    <img className={styles.depth6Frame1} alt="" src="/Figma_photoes/star.svg" />
                    <img className={styles.depth6Frame1} alt="" src="/Figma_photoes/star.svg" />
                    <img className={styles.depth6Frame1} alt="" src="/Figma_photoes/star.svg" />
                    <img className={styles.depth6Frame1} alt="" src="/Figma_photoes/star.svg" />
                    <img className={styles.depth6Frame1} alt="" src="/Figma_photoes/star.svg" />
                  </div>
                  <div className={styles.depth1Frame0}>
                    <div className={styles.findThePerfect}>Affordable and convenient location.</div>
                  </div>
                  <div className={styles.depth6Frame32}>
                    <div className={styles.depth7Frame016}>
                      <img className={styles.depth6Frame1} alt="" src="/Figma_photoes/like.svg" />
                      <div className={styles.depth6Frame03}>
                        <div className={styles.findThePerfect}>8</div>
                      </div>
                    </div>
                    <div className={styles.depth7Frame016}>
                      <img className={styles.depth6Frame1} alt="" src="/Figma_photoes/dislike.svg" />
                      <div className={styles.findThePerfect}>2</div>
                    </div>
                  </div>
                </div>
                <div className={styles.depth5Frame08}>
                  <div className={styles.depth6Frame015}>
                    <div className={styles.depth7Frame115}>
                      <div className={styles.depth1Frame0}>
                        <div className={styles.luxuryHotel}>Anonna</div>
                      </div>
                      <div className={styles.depth8Frame112}>
                        <div className={styles.starLuxuryExperience}>Oct 25, 2025</div>
                      </div>
                    </div>
                  </div>
                  <div className={styles.depth6Frame111}>
                    <img className={styles.depth6Frame1} alt="" src="/Figma_photoes/star.svg" />
                    <img className={styles.depth6Frame1} alt="" src="/Figma_photoes/star.svg" />
                    <img className={styles.depth6Frame1} alt="" src="/Figma_photoes/star.svg" />
                    <img className={styles.depth6Frame1} alt="" src="/Figma_photoes/star.svg" />
                    <img className={styles.depth6Frame1} alt="" src="/Figma_photoes/star.svg" />
                  </div>
                  <div className={styles.depth1Frame0}>
                    <div className={styles.findThePerfect}>Decent experience but room for improvement.</div>
                  </div>
                  <div className={styles.depth6Frame32}>
                    <div className={styles.depth7Frame016}>
                      <img className={styles.depth6Frame1} alt="" src="/Figma_photoes/like.svg" />
                      <div className={styles.depth6Frame03}>
                        <div className={styles.findThePerfect}>5</div>
                      </div>
                    </div>
                    <div className={styles.depth7Frame016}>
                      <img className={styles.depth6Frame1} alt="" src="/Figma_photoes/dislike.svg" />
                      <div className={styles.depth6Frame03}>
                        <div className={styles.findThePerfect}>3</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.depth3Frame2}>
              <div className={styles.depth4Frame04} />
            </div>
          </div>
        </div>

        {/* Footer */}
        {/* <div className={styles.depth2Frame3}>
          <div className={styles.depth3Frame02}>
            <div className={styles.depth4Frame05}>
              <div className={styles.depth5Frame09}>
                <div className={styles.depth6Frame018} onClick={() => navigate("/about")}>
                  <div className={styles.findThePerfect}>About Us</div>
                </div>
                <div className={styles.depth6Frame114} onClick={() => navigate("/contact")}>
                  <div className={styles.findThePerfect}>Contact</div>
                </div>
                <div className={styles.depth6Frame018} onClick={() => navigate("/terms")}>
                  <div className={styles.findThePerfect}>Terms of Service</div>
                </div>
                <div className={styles.depth6Frame018} onClick={() => navigate("/privacy")}>
                  <div className={styles.findThePerfect}>Privacy Policy</div>
                </div>
              </div>
              <div className={styles.depth5Frame17}>
                <img className={styles.depth6Frame019} alt="" src="/Figma_photoes/facebook.svg" />
                <img className={styles.depth6Frame019} alt="" src="/Figma_photoes/twitter.svg" />
                <img className={styles.depth6Frame019} alt="" src="/Figma_photoes/insta.svg" />
              </div>
              <div className={styles.depth5Frame24}>
                <div className={styles.findThePerfect}>@2025 WanderNest, All rights reserved.</div>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </div>
    </Layout>
  );
};

export default HotelsRooms;