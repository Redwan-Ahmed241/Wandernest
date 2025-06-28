import { FunctionComponent, useState } from 'react';
import styles from '../Styles/CreatePackage.module.css';
import Layout from '../App/Layout';

const CreatePackage: FunctionComponent = () => {
  const today = new Date();
  // State for input fields
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [travelDate, setTravelDate] = useState('');
  const [showCalendar, setShowCalendar] = useState(false);

  // State for selections and skips
  const [selectedTransport, setSelectedTransport] = useState<string | null>(null);
  const [skipTransport, setSkipTransport] = useState(false);
  const [selectedHotel, setSelectedHotel] = useState<string | null>(null);
  const [skipHotel, setSkipHotel] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<string | null>(null);
  const [skipVehicle, setSkipVehicle] = useState(false);
  const [selectedGuide, setSelectedGuide] = useState<string | null>(null);
  const [skipGuide, setSkipGuide] = useState(false);

  // State for calendar navigation
  const [calendarMonth, setCalendarMonth] = useState(today.getMonth());
  const [calendarYear, setCalendarYear] = useState(today.getFullYear());

  // Simple calendar for date picking
  const daysInMonth = new Date(calendarYear, calendarMonth + 1, 0).getDate();
  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  // Handlers
  const handleTransportSelect = (name: string) => {
    if (!skipTransport) {
      setSelectedTransport(selectedTransport === name ? null : name);
    }
  };
  const handleHotelSelect = (name: string) => {
    if (!skipHotel) {
      setSelectedHotel(selectedHotel === name ? null : name);
    }
  };
  const handleVehicleSelect = (name: string) => {
    if (!skipVehicle) {
      setSelectedVehicle(selectedVehicle === name ? null : name);
    }
  };
  const handleGuideSelect = (name: string) => {
    if (!skipGuide) {
      setSelectedGuide(selectedGuide === name ? null : name);
    }
  };

  // Skip handlers
  const handleSkipTransport = () => {
    setSkipTransport(!skipTransport);
    if (!skipTransport) setSelectedTransport(null);
  };
  const handleSkipHotel = () => {
    setSkipHotel(!skipHotel);
    if (!skipHotel) setSelectedHotel(null);
  };
  const handleSkipVehicle = () => {
    setSkipVehicle(!skipVehicle);
    if (!skipVehicle) setSelectedVehicle(null);
  };
  const handleSkipGuide = () => {
    setSkipGuide(!skipGuide);
    if (!skipGuide) setSelectedGuide(null);
  };

  // Calendar handlers
  const handleDateSelect = (day: number) => {
    setTravelDate(`${calendarYear}-${(calendarMonth + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`);
    setShowCalendar(false);
  };
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

  // Reset calendar to current month/year when opening
  const handleCalendarOpen = () => {
    setCalendarMonth(today.getMonth());
    setCalendarYear(today.getFullYear());
    setShowCalendar(!showCalendar);
  };

  return (
    <Layout>
      <div className={styles.createPackage}>
        <div className={styles.headerSection}>
          <div className={styles.createYourCustom}>Create Your Custom Package</div>
          <div className={styles.formFieldsContainer}>
            <div className={styles.formRow}>
              <div className={styles.inputGroup}>
                <label className={styles.inputLabel}>From</label>
                <input
                  className={styles.inputField}
                  type="text"
                  placeholder="Enter departure location"
                  value={from}
                  onChange={e => setFrom(e.target.value)}
                />
              </div>
              <div className={styles.inputGroup}>
                <label className={styles.inputLabel}>To</label>
                <input
                  className={styles.inputField}
                  type="text"
                  placeholder="Enter destination"
                  value={to}
                  onChange={e => setTo(e.target.value)}
                />
              </div>
            </div>
            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>Travel Dates</label>
              <input
                className={styles.inputField}
                type="text"
                placeholder="Select dates"
                value={travelDate}
                readOnly
                onClick={handleCalendarOpen}
                style={{ cursor: 'pointer', background: '#fff' }}
              />
              {showCalendar && (
                <div className={styles.calendarPopup}>
                  <div className={styles.calendarHeader}>
                    <button onClick={handlePrevMonth} style={{ marginRight: 8, background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.2em' }}>{'<'}</button>
                    {new Date(calendarYear, calendarMonth).toLocaleString('default', { month: 'long' })} {calendarYear}
                    <button onClick={handleNextMonth} style={{ marginLeft: 8, background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.2em' }}>{'>'}</button>
                  </div>
                  <div className={styles.calendarGrid}>
                    {daysArray.map(day => (
                      <div
                        key={day}
                        className={styles.calendarDay}
                        onClick={() => handleDateSelect(day)}
                      >
                        {day}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Section: Transport */}
        <div className={styles.sectionContainer}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionTitle}>Select Transport</span>
            <button className={styles.skipButton} onClick={handleSkipTransport}>
              {skipTransport ? 'Unskip' : 'Skip'}
            </button>
          </div>
          <div className={styles.cardsGrid + (skipTransport ? ' ' + styles.sectionDisabled : '')}>
            <div
              className={styles.card + ' ' + (selectedTransport === 'Airline A' ? styles.selectedCard : '')}
              onClick={() => handleTransportSelect('Airline A')}
            >
              <img className={styles.cardImage} alt="" src="/Figma_photoes/airB.jpg" />
              <div className={styles.cardContent}>
                <div className={styles.airlineA}>Airline A</div>
                <div className={styles.affordableAndReliable}>Affordable and reliable</div>
                {selectedTransport === 'Airline A' && <span className={styles.selectedMark}>✔</span>}
              </div>
            </div>
            <div
              className={styles.card + ' ' + (selectedTransport === 'Train' ? styles.selectedCard : '')}
              onClick={() => handleTransportSelect('Train')}
            >
              <img className={styles.cardImage} alt="" src="/Figma_photoes/train.png" />
              <div className={styles.cardContent}>
                <div className={styles.airlineA}>Train</div>
                <div className={styles.affordableAndReliable}>Local experience</div>
                {selectedTransport === 'Train' && <span className={styles.selectedMark}>✔</span>}
              </div>
            </div>
            <div
              className={styles.card + ' ' + (selectedTransport === 'Bus' ? styles.selectedCard : '')}
              onClick={() => handleTransportSelect('Bus')}
            >
              <img className={styles.cardImage} alt="" src="/Figma_photoes/bus.png" />
              <div className={styles.cardContent}>
                <div className={styles.airlineA}>Bus</div>
                <div className={styles.affordableAndReliable}>Premium experience</div>
                {selectedTransport === 'Bus' && <span className={styles.selectedMark}>✔</span>}
              </div>
            </div>
          </div>
        </div>

        {/* Section: Hotels */}
        <div className={styles.sectionContainer}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionTitle}>Select Hotels</span>
            <button className={styles.skipButton} onClick={handleSkipHotel}>
              {skipHotel ? 'Unskip' : 'Skip'}
            </button>
          </div>
          <div className={styles.cardsGrid + (skipHotel ? ' ' + styles.sectionDisabled : '')}>
            <div
              className={styles.card + ' ' + (selectedHotel === 'Urban Retreat Club' ? styles.selectedCard : '')}
              onClick={() => handleHotelSelect('Urban Retreat Club')}
            >
              <img className={styles.cardImage} alt="" src="/Figma_photoes/hotelA.jpg" />
              <div className={styles.cardContent}>
                <div className={styles.urbanRetreatClub}>Urban Retreat Club</div>
                <div className={styles.modernRoomsIn}>Modern rooms in the city</div>
                {selectedHotel === 'Urban Retreat Club' && <span className={styles.selectedMark}>✔</span>}
              </div>
            </div>
            <div
              className={styles.card + ' ' + (selectedHotel === 'Sea Shore Hotel' ? styles.selectedCard : '')}
              onClick={() => handleHotelSelect('Sea Shore Hotel')}
            >
              <img className={styles.cardImage} alt="" src="/Figma_photoes/swimming-pool.jpg" />
              <div className={styles.cardContent}>
                <div className={styles.airlineA}>Sea Shore Hotel</div>
                <div className={styles.affordableAndReliable}>Premium experience</div>
                {selectedHotel === 'Sea Shore Hotel' && <span className={styles.selectedMark}>✔</span>}
              </div>
            </div>
            <div
              className={styles.card + ' ' + (selectedHotel === 'Luxury Stay Inn' ? styles.selectedCard : '')}
              onClick={() => handleHotelSelect('Luxury Stay Inn')}
            >
              <img className={styles.cardImage} alt="" src="/Figma_photoes/six-seasons-hotel.jpg" />
              <div className={styles.cardContent}>
                <div className={styles.urbanRetreatClub}>Luxury Stay Inn</div>
                <div className={styles.modernRoomsIn}>Relaxing and elegant</div>
                {selectedHotel === 'Luxury Stay Inn' && <span className={styles.selectedMark}>✔</span>}
              </div>
            </div>
          </div>
        </div>

        {/* Section: Vehicle */}
        <div className={styles.sectionContainer}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionTitle}>Select Vehicle</span>
            <button className={styles.skipButton} onClick={handleSkipVehicle}>
              {skipVehicle ? 'Unskip' : 'Skip'}
            </button>
          </div>
          <div className={styles.cardsGrid + (skipVehicle ? ' ' + styles.sectionDisabled : '')}>
            <div
              className={styles.card + ' ' + (selectedVehicle === 'Landline A' ? styles.selectedCard : '')}
              onClick={() => handleVehicleSelect('Landline A')}
            >
              <img className={styles.cardImage} alt="" src="/Figma_photoes/landA.jpeg" />
              <div className={styles.cardContent}>
                <div className={styles.airlineA}>Landline A</div>
                <div className={styles.affordableAndReliable}>Affordable and reliable</div>
                {selectedVehicle === 'Landline A' && <span className={styles.selectedMark}>✔</span>}
              </div>
            </div>
            <div
              className={styles.card + ' ' + (selectedVehicle === 'Boat' ? styles.selectedCard : '')}
              onClick={() => handleVehicleSelect('Boat')}
            >
              <img className={styles.cardImage} alt="" src="/Figma_photoes/burigangha.jpg" />
              <div className={styles.cardContent}>
                <div className={styles.airlineA}>Boat</div>
                <div className={styles.affordableAndReliable}>Premium experience</div>
                {selectedVehicle === 'Boat' && <span className={styles.selectedMark}>✔</span>}
              </div>
            </div>
            <div
              className={styles.card + ' ' + (selectedVehicle === 'Landline B' ? styles.selectedCard : '')}
              onClick={() => handleVehicleSelect('Landline B')}
            >
              <img className={styles.cardImage} alt="" src="/Figma_photoes/landB.jpg" />
              <div className={styles.cardContent}>
                <div className={styles.airlineA}>Landline B</div>
                <div className={styles.affordableAndReliable}>Premium experience</div>
                {selectedVehicle === 'Landline B' && <span className={styles.selectedMark}>✔</span>}
              </div>
            </div>
          </div>
        </div>

        {/* Section: Guide */}
        <div className={styles.sectionContainer}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionTitle}>Hire a Guide</span>
            <button className={styles.skipButton} onClick={handleSkipGuide}>
              {skipGuide ? 'Unskip' : 'Skip'}
            </button>
          </div>
          <div className={styles.cardsGrid + (skipGuide ? ' ' + styles.sectionDisabled : '')}>
            <div
              className={styles.card + ' ' + (selectedGuide === 'Shah Alam' ? styles.selectedCard : '')}
              onClick={() => handleGuideSelect('Shah Alam')}
            >
              <img className={styles.cardImage} alt="" src="/Figma_photoes/shah_alam.jpg" />
              <div className={styles.cardContent}>
                <div className={styles.urbanRetreatClub}>Shah Alam</div>
                <div className={styles.modernRoomsIn}>Experienced in local tours</div>
                {selectedGuide === 'Shah Alam' && <span className={styles.selectedMark}>✔</span>}
              </div>
            </div>
            <div
              className={styles.card + ' ' + (selectedGuide === 'Nadir Hussein' ? styles.selectedCard : '')}
              onClick={() => handleGuideSelect('Nadir Hussein')}
            >
              <img className={styles.cardImage} alt="" src="/Figma_photoes/nadir.jpg" />
              <div className={styles.cardContent}>
                <div className={styles.urbanRetreatClub}>Nadir Hussein</div>
                <div className={styles.modernRoomsIn}>Specializes in cultural trips</div>
                {selectedGuide === 'Nadir Hussein' && <span className={styles.selectedMark}>✔</span>}
              </div>
            </div>
            <div
              className={styles.card + ' ' + (selectedGuide === 'Onu Tareq' ? styles.selectedCard : '')}
              onClick={() => handleGuideSelect('Onu Tareq')}
            >
              <img className={styles.cardImage} alt="" src="/Figma_photoes/onu_tareq.png" />
              <div className={styles.cardContent}>
                <div className={styles.airlineA}>Onu Tareq</div>
                <div className={styles.affordableAndReliable}>Experienced in Historical Sites</div>
                {selectedGuide === 'Onu Tareq' && <span className={styles.selectedMark}>✔</span>}
              </div>
            </div>
          </div>
        </div>

        {/* Confirm section at the bottom */}
        <div className={styles.confirmSection}>
          <div className={styles.reviewText}>
            Review your package details below and proceed to confirm your booking.
          </div>
          <button className={styles.confirmPackage}>
            Confirm Package
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default CreatePackage;
