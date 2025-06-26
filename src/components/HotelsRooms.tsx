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
  // Calendar state
  const today = new Date();
  const [calendarMonth, setCalendarMonth] = useState(today.getMonth());
  const [calendarYear, setCalendarYear] = useState(today.getFullYear());
  const daysInMonth = new Date(calendarYear, calendarMonth + 1, 0).getDate();
  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const weekDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  const firstDayOfWeek = new Date(calendarYear, calendarMonth, 1).getDay();
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const handlePrevMonth = () => {
    if (calendarMonth === 0) {
      setCalendarMonth(11);
      setCalendarYear(calendarYear - 1);
    } else {
      setCalendarMonth(calendarMonth - 1);
    }
  };
  const handleNextMonth = () => {
    if (calendarMonth === 11) {
      setCalendarMonth(0);
      setCalendarYear(calendarYear + 1);
    } else {
      setCalendarMonth(calendarMonth + 1);
    }
  };

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
                    <div className={styles.calendarContainer}>
                      <div className={styles.calendarHeaderRow}>
                        <button onClick={handlePrevMonth} className={styles.calendarNavBtn}>{'<'}</button>
                        <span className={styles.calendarMonthLabel}>
                          {new Date(calendarYear, calendarMonth).toLocaleString('default', { month: 'long', year: 'numeric' })}
                        </span>
                        <button onClick={handleNextMonth} className={styles.calendarNavBtn}>{'>'}</button>
                      </div>
                      <div className={styles.calendarWeekdays}>
                        {weekDays.map((d, i) => (
                          <span key={i} className={styles.calendarWeekday}>{d}</span>
                        ))}
                      </div>
                      <div className={styles.calendarGrid}>
                        {Array.from({ length: firstDayOfWeek }).map((_, i) => (
                          <span key={'empty-' + i} className={styles.calendarDayEmpty}></span>
                        ))}
                        {daysArray.map(day => (
                          <span
                            key={day}
                            className={
                              styles.calendarDay +
                              (selectedDay === day && selectedMonth === calendarMonth && selectedYear === calendarYear ? ' ' + styles.selectedCalendarDay : '')
                            }
                            onClick={() => {
                              setSelectedDay(day);
                              setSelectedMonth(calendarMonth);
                              setSelectedYear(calendarYear);
                            }}
                            style={{ cursor: 'pointer' }}
                          >
                            {day}
                          </span>
                        ))}
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
                    <img className={styles.depth7Frame05} alt="" src="/Figma_photoes/c_lodge.jpeg" />
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
                  <div className={styles.depth6Frame014} onClick={() => navigate('/restaurant')}>
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
      </div>
    </div>
    </Layout>
  );
};

export default HotelsRooms;