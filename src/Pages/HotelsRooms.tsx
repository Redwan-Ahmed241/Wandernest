import React, { FunctionComponent, useCallback, useState } from 'react';
import { useNavigate } from "react-router-dom";
import styles from '../Styles/HotelsRooms.module.css';
import Layout from '../App/Layout';

const FILTERS = [
  {
    label: 'Price Range',
    key: 'price',
    options: ['$0 - $50', '$50 - $100', '$100 - $200', '$200+']
  },
  {
    label: 'Star Rating',
    key: 'rating',
    options: ['5 stars', '4 stars', '3 stars', '2 stars', '1 star']
  },
  {
    label: 'Amenities',
    key: 'amenities',
    options: ['WiFi', 'Pool', 'Gym', 'Spa', 'Restaurant']
  },
  {
    label: 'Location',
    key: 'location',
    options: ['City Center', 'Beachfront', 'Mountain View', 'Countryside']
  },
  {
    label: 'Room Type',
    key: 'roomType',
    options: ['Single', 'Double', 'Suite', 'Family']
  }
];

const HOTELS = [
  {
    id: 'six-seasons',
    name: 'Luxury Hotel',
    description: '5-star luxury experience',
    location: 'City Center',
    image: '/Figma_photoes/six-seasons-hotel.jpg',
  },
  {
    id: 'budget-inn',
    name: 'Budget Inn',
    description: 'Affordable and cozy',
    location: 'City Center',
    image: '/Figma_photoes/inn.jpg',
  },
  {
    id: 'beachside-resort',
    name: 'Beachside Resort',
    description: 'Relax by the sea',
    location: 'Beachfront',
    image: '/Figma_photoes/swimming-pool.jpg',
  },
  {
    id: 'mountain-retreat',
    name: 'Mountain Retreat',
    description: 'Breathtaking mountain views',
    location: 'Mountain View',
    image: '/Figma_photoes/hillside-resort.jpg',
  },
  {
    id: 'city-center',
    name: 'City Center Hotel',
    description: 'Stay in the heart of the city',
    location: 'City Center',
    image: '/Figma_photoes/city_center_hotel.png',
  },
  {
    id: 'countryside-lodge',
    name: 'Countryside Lodge',
    description: 'Peaceful countryside escape',
    location: 'Countryside',
    image: '/Figma_photoes/c_lodge.jpeg',
  }
];

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
  const [openFilter, setOpenFilter] = useState<string | null>(null);
  const [selectedOptions, setSelectedOptions] = useState<{ [key: string]: string }>({});
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

  const filteredHotels = HOTELS.filter(hotel => {
    const query = hotelQuery.toLowerCase();
    return (
      hotel.name.toLowerCase().includes(query) ||
      hotel.description.toLowerCase().includes(query) ||
      hotel.location.toLowerCase().includes(query)
    );
  });

  return (
    <Layout>
    <div className={styles.hotelsRooms}>
      {/* Navbar */}
      <div className={styles.depth0Frame0}>
        <div className={styles.depth1Frame0}>
         

          {/* Main Content */}
          <div className={styles.depth2Frame1}>
            {/* Filters Sidebar */}
            <div className={styles.depth3Frame01}>
              <div className={styles.depth4Frame02}>
                {/* Updated Search Input */}
                <div className={styles.depth5Frame02}>
                  <div className={styles.searchBarContainer}>
                    <img
                      src="/Figma_photoes/search.svg"
                      alt="search"
                      className={styles.searchIconInside}
                    />
                    <input
                      type="text"
                      value={hotelQuery}
                      onChange={e => setHotelQuery(e.target.value)}
                      placeholder="Search hotels, rooms..."
                      className={styles.searchInput}
                    />
                  </div>
                </div>
              </div>
              <div className={styles.depth4Frame12}>
                {/* Modern Filters Row */}
                <div className={styles.filtersRow}>
                  {FILTERS.map(filter => (
                    <div key={filter.key} className="relative">
                      <button
                        className={`${styles.filterButton} ${openFilter === filter.key ? styles.selected : ''}`}
                        onClick={() => setOpenFilter(openFilter === filter.key ? null : filter.key)}
                        type="button"
                      >
                        {selectedOptions[filter.key] || filter.label}
                        <img 
                          src="/Figma_photoes/darrow.svg" 
                          alt="▼" 
                          className={styles.filterDropdownArrow}
                        />
                      </button>
                      {openFilter === filter.key && (
                        <div className={styles.filterDropdown}>
                          {filter.options.map(option => (
                            <div
                              key={option}
                              className={`${styles.filterDropdownOption} ${selectedOptions[filter.key] === option ? styles.selected : ''}`}
                              onClick={() => {
                                setSelectedOptions({ ...selectedOptions, [filter.key]: option });
                                setOpenFilter(null);
                              }}
                            >
                              {option}
                  </div>
                          ))}
                    </div>
                  )}
                    </div>
                  ))}
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
                  {filteredHotels.map(hotel => (
                    <div
                      className={styles.depth6Frame012}
                      key={hotel.id}
                      onClick={() => onHotelClick(hotel.id)}
                    >
                      <img className={styles.depth7Frame05} alt="" src={hotel.image} />
                      <div className={styles.depth1Frame0}>
                    <div className={styles.depth1Frame0}>
                          <div className={styles.luxuryHotel}>{hotel.name}</div>
                      </div>
                      <div className={styles.depth8Frame112}>
                          <div className={styles.starLuxuryExperience}>{hotel.description}</div>
                      </div>
                      </div>
                    </div>
                  ))}
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