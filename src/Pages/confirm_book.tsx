import React, { useEffect, useRef, useState, RefObject } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from '../Styles/ConfirmBook.module.css';
import Layout from '../App/Layout';

const optionOrder = ['transport', 'hotel', 'vehicle', 'guide'] as const;
type OptionKey = typeof optionOrder[number];

const ConfirmBook: React.FC = () => {
  const location = useLocation();
  const pkg = location.state?.pkg;
  const [packageDetails, setPackageDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Editable fields
  const [startDate, setStartDate] = useState('');
  const [travelers, setTravelers] = useState(1);
  const [totalPrice, setTotalPrice] = useState('');
  const [endDate, setEndDate] = useState('');

  // Skip states for options
  const [skipTransport, setSkipTransport] = useState(true);
  const [skipHotel, setSkipHotel] = useState(true);
  const [skipVehicle, setSkipVehicle] = useState(true);
  const [skipGuide, setSkipGuide] = useState(true);

  // Focus state for option rows
  const [activeOption, setActiveOption] = useState<OptionKey>('transport');
  const optionRefs: Record<OptionKey, RefObject<HTMLDivElement>> = {
    transport: useRef<HTMLDivElement>(null),
    hotel: useRef<HTMLDivElement>(null),
    vehicle: useRef<HTMLDivElement>(null),
    guide: useRef<HTMLDivElement>(null),
  };

  // Placeholder states for options (to be replaced with API data)
  const [transport, setTransport] = useState<string>('Not selected');
  const [hotel, setHotel] = useState<string>('Not selected');
  const [vehicle, setVehicle] = useState<string>('Not selected');
  const [guide, setGuide] = useState<string>('Not selected');

  const [warning, setWarning] = useState('');

  const navigate = useNavigate();

  const [startDateFocused, setStartDateFocused] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const dateInputRef = React.useRef<HTMLInputElement>(null);

  // Helper to get correct field regardless of casing
  const getField = (obj: any, key: string) => obj?.[key] || obj?.[key.toLowerCase()] || obj?.[key.charAt(0).toUpperCase() + key.slice(1)] || '';

  // Helper to format date as DD-MM-YYYY
  const formatDisplayDate = (dateStr: string) => {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return '';
    const dd = String(d.getDate()).padStart(2, '0');
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const yyyy = d.getFullYear();
    return `${dd}-${mm}-${yyyy}`;
  };

  // Helper to convert yyyy-mm-dd to dd-mm-yyyy
  const toDisplayDate = (dateStr: string) => {
    if (!dateStr) return '';
    const [yyyy, mm, dd] = dateStr.split('-');
    if (!yyyy || !mm || !dd) return '';
    return `${dd}-${mm}-${yyyy}`;
  };

  // Helper to convert dd-mm-yyyy to yyyy-mm-dd
  const toInputDateValue = (dateStr: string) => {
    if (!dateStr) return '';
    const [dd, mm, yyyy] = dateStr.split('-');
    if (!dd || !mm || !yyyy) return '';
    return `${yyyy}-${mm}-${dd}`;
  };

  // Helper to get tomorrow's date in yyyy-mm-dd format
  const getTomorrow = () => {
    const t = new Date();
    t.setDate(t.getDate() + 1);
    const yyyy = t.getFullYear();
    const mm = String(t.getMonth() + 1).padStart(2, '0');
    const dd = String(t.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  };

  useEffect(() => {
    const fetchDetails = async () => {
      if (pkg?.id) {
        try {
          setLoading(true);
          const response = await fetch('https://wander-nest-ad3s.onrender.com/api/packages/all/');
          const data = await response.json();
          const found = Array.isArray(data) ? data.find((p: any) => p.id === pkg.id) : null;
          if (found) {
            setPackageDetails(found);
            setStartDate('');
            setTravelers(1);
            setTotalPrice(found.price || found.budget || '');
            setTransport('Not selected');
            setHotel('Not selected');
            setVehicle('Not selected');
            setGuide('Not selected');
            setSkipTransport(true);
            setSkipHotel(true);
            setSkipVehicle(true);
            setSkipGuide(true);
            setActiveOption('transport');
          } else {
            setError('Package not found.');
          }
        } catch (err) {
          setError('Failed to fetch package details.');
        } finally {
          setLoading(false);
        }
      } else {
        setError('No package selected.');
        setLoading(false);
      }
    };
    fetchDetails();
  }, [pkg]);

  useEffect(() => {
    if (packageDetails) {
      const basePrice = parseFloat(packageDetails.price || packageDetails.budget || '0');
      setTotalPrice((basePrice * travelers).toFixed(2));
    }
  }, [travelers, packageDetails]);

  // Recalculate end date if packageDetails or startDate changes
  useEffect(() => {
    if (packageDetails && startDate) {
      const days = parseInt(getField(packageDetails, 'Days'), 10);
      if (!isNaN(days)) {
        const start = new Date(startDate);
        const end = new Date(start);
        end.setDate(start.getDate() + days);
        const yyyy = end.getFullYear();
        const mm = String(end.getMonth() + 1).padStart(2, '0');
        const dd = String(end.getDate()).padStart(2, '0');
        setEndDate(`${yyyy}-${mm}-${dd}`);
      } else {
        setEndDate('');
      }
    } else {
      setEndDate('');
    }
  }, [packageDetails, startDate]);

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStartDate(e.target.value);
  };

  const handleTravelersChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Math.max(1, parseInt(e.target.value) || 1);
    setTravelers(val);
  };

  // Focus next division after skip
  const focusNextOption = (current: OptionKey) => {
    const idx = optionOrder.indexOf(current);
    if (idx !== -1 && idx < optionOrder.length - 1) {
      const next = optionOrder[idx + 1];
      setActiveOption(next);
      setTimeout(() => {
        optionRefs[next].current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
    }
  };

  // Toggle skip/unskip handlers
  const handleSkipToggle = (option: OptionKey) => {
    switch (option) {
      case 'transport':
        setSkipTransport((prev) => {
          if (!prev) setActiveOption('transport');
          else focusNextOption('transport');
          return !prev;
        });
        break;
      case 'hotel':
        setSkipHotel((prev) => {
          if (!prev) setActiveOption('hotel');
          else focusNextOption('hotel');
          return !prev;
        });
        break;
      case 'vehicle':
        setSkipVehicle((prev) => {
          if (!prev) setActiveOption('vehicle');
          else focusNextOption('vehicle');
          return !prev;
        });
        break;
      case 'guide':
        setSkipGuide((prev) => {
          if (!prev) setActiveOption('guide');
          return !prev;
        });
        break;
      default:
        break;
    }
  };

  const handleConfirmBooking = () => {
    // Validation: required fields
    if (!packageDetails.from_location || !packageDetails.title || !startDate || !packageDetails.end_date || !travelers) {
      setWarning('Please fill in all traveler details.');
      return;
    }
    // Validation: at least one customize option included
    if (skipTransport && skipHotel && skipVehicle && skipGuide) {
      setWarning('Please include at least one package customization option.');
      return;
    }
    setWarning('');
    // Proceed with booking logic here
    // ...
  };

  if (loading) {
    return <Layout><div style={{ padding: '2rem', textAlign: 'center' }}>Loading package details...</div></Layout>;
  }
  if (error) {
    return <Layout><div style={{ padding: '2rem', textAlign: 'center', color: 'red' }}>{error}</div></Layout>;
  }
  if (!packageDetails) {
    return <Layout><div style={{ padding: '2rem', textAlign: 'center' }}>No package data found.</div></Layout>;
  }

  return (
    <Layout>
      <div className={styles.confirmBookContainer}>
        <h1 className={styles.pageTitle}>Confirm Your Booking</h1>
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Traveler Details</h2>
          <div className={styles.formFieldsContainer}>
            <div className={styles.formRow}>
              <div className={styles.inputGroup}>
                <label className={styles.inputLabel}>From</label>
                <input className={styles.inputField} type="text" value={getField(packageDetails, 'Source')} readOnly />
              </div>
              <div className={styles.inputGroup}>
                <label className={styles.inputLabel}>To</label>
                <input className={styles.inputField} type="text" value={getField(packageDetails, 'Destination')} readOnly />
              </div>
            </div>
            <div className={styles.formRow}>
              <div className={styles.inputGroup}>
                <label className={styles.inputLabel}>Start Date</label>
                <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                  <input
                    className={styles.inputField}
                    type="text"
                    value={formatDisplayDate(startDate)}
                    readOnly
                    onClick={() => dateInputRef.current && dateInputRef.current.showPicker && dateInputRef.current.showPicker()}
                    placeholder="dd-mm-yyyy"
                    style={{ cursor: 'pointer' }}
                  />
                  <span
                    className={styles.calendarIcon}
                    onClick={() => dateInputRef.current && dateInputRef.current.showPicker && dateInputRef.current.showPicker()}
                    role="button"
                    tabIndex={0}
                  >
                    📅
                  </span>
                  <input
                    ref={dateInputRef}
                    type="date"
                    style={{ position: 'absolute', left: 0, top: 0, opacity: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
                    value={startDate}
                    min={getTomorrow()}
                    onChange={e => setStartDate(e.target.value)}
                    tabIndex={-1}
                  />
                </div>
              </div>
              <div className={styles.inputGroup}>
                <label className={styles.inputLabel}>End Date</label>
                <input className={styles.inputField} type="text" value={formatDisplayDate(endDate)} readOnly />
              </div>
            </div>
            <div className={styles.formRow}>
              <div className={styles.inputGroup}>
                <label className={styles.inputLabel}>Number of Travelers</label>
                <input className={styles.inputField} type="number" min={1} value={travelers} onChange={handleTravelersChange} />
              </div>
              <div className={styles.inputGroup}>
                <label className={styles.inputLabel}>Budget (BDT)</label>
                <input className={styles.inputField} type="text" value={totalPrice} readOnly />
              </div>
            </div>
          </div>
        </div>
        <hr className={styles.divider} />
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Customize Your Package</h2>
          <div className={styles.optionsSection}>
            {/* Transport */}
            <div ref={optionRefs.transport} className={`${styles.optionRow} ${activeOption === 'transport' ? 'active' : ''}`.trim()}>
              <span className={styles.optionLabel}>Select Transport</span>
              <button
                type="button"
                className={styles.skipToggleBtn}
                onClick={() => handleSkipToggle('transport')}
              >
                {skipTransport ? 'Include' : 'Skip'}
              </button>
              {!skipTransport && <div className={styles.optionCard}>Transport options go here</div>}
            </div>
            {/* Hotel */}
            <div ref={optionRefs.hotel} className={`${styles.optionRow} ${activeOption === 'hotel' ? 'active' : ''}`.trim()}>
              <span className={styles.optionLabel}>Select Hotels</span>
              <button
                type="button"
                className={styles.skipToggleBtn}
                onClick={() => handleSkipToggle('hotel')}
              >
                {skipHotel ? 'Include' : 'Skip'}
              </button>
              {!skipHotel && <div className={styles.optionCard}>Hotel options go here</div>}
            </div>
            {/* Vehicle */}
            <div ref={optionRefs.vehicle} className={`${styles.optionRow} ${activeOption === 'vehicle' ? 'active' : ''}`.trim()}>
              <span className={styles.optionLabel}>Select Vehicle</span>
              <button
                type="button"
                className={styles.skipToggleBtn}
                onClick={() => handleSkipToggle('vehicle')}
              >
                {skipVehicle ? 'Include' : 'Skip'}
              </button>
              {!skipVehicle && <div className={styles.optionCard}>Vehicle options go here</div>}
            </div>
            {/* Guide */}
            <div ref={optionRefs.guide} className={`${styles.optionRow} ${activeOption === 'guide' ? 'active' : ''}`.trim()}>
              <span className={styles.optionLabel}>Hire a Guide</span>
              <button
                type="button"
                className={styles.skipToggleBtn}
                onClick={() => handleSkipToggle('guide')}
              >
                {skipGuide ? 'Include' : 'Skip'}
              </button>
              {!skipGuide && <div className={styles.optionCard}>Guide options go here</div>}
            </div>
          </div>
        </div>
        <div className={styles.buttonRow}>
          {warning && (
            <div style={{ color: '#b94a48', background: '#fbeeea', borderRadius: 8, padding: '12px 18px', marginBottom: 12, fontWeight: 600, fontSize: '1.05rem', textAlign: 'center' }}>
              {warning}
            </div>
          )}
          <button className={styles.confirmButton} onClick={handleConfirmBooking}>Confirm Booking</button>
          <button
            type="button"
            className={styles.cancelButton}
            onClick={() => navigate('/packages')}
          >
            <span className={styles.cancelIcon}>←</span> Cancel Booking
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default ConfirmBook;
