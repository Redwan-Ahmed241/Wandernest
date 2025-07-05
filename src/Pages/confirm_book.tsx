"use client"

import React, { useEffect, useRef, useState } from "react"
import { useLocation, useNavigate } from 'react-router-dom';
import styles from '../Styles/ConfirmBook.module.css';
import Layout from '../App/Layout';
import { getHotels, Hotel } from '../App/api-services';

const optionOrder = ["transport", "hotel", "guide"] as const
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
  const [skipHotel, setSkipHotel] = useState(false);
  const [skipGuide, setSkipGuide] = useState(true);

  // Focus state for option rows
  const [activeOption, setActiveOption] = useState<OptionKey>('transport');
  const optionRefs: Record<OptionKey, React.RefObject<HTMLDivElement>> = {
    transport: React.useRef<HTMLDivElement>(null),
    hotel: React.useRef<HTMLDivElement>(null),
    guide: React.useRef<HTMLDivElement>(null),
  };

  // Placeholder states for options (to be replaced with API data)
  const [transport, setTransport] = useState<string>('Not selected');
  const [hotel, setHotel] = useState<string>('Not selected');
  const [guide, setGuide] = useState<string>('Not selected');

  const [warning, setWarning] = useState('');

  const navigate = useNavigate();

  const [startDateFocused, setStartDateFocused] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const dateInputRef = React.useRef<HTMLInputElement>(null);

  // Add hotel selection state
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [hotelsLoading, setHotelsLoading] = useState(false);
  const [hotelsError, setHotelsError] = useState('');
  const [selectedHotelId, setSelectedHotelId] = useState<string | null>(null);

  // Add transport and guide selection state
  const [transportOptions, setTransportOptions] = useState<any[]>([]);
  const [transportLoading, setTransportLoading] = useState(false);
  const [transportError, setTransportError] = useState('');
  const [selectedTransportId, setSelectedTransportId] = useState<string | null>(null);

  const [guideOptions, setGuideOptions] = useState<any[]>([]);
  const [guideLoading, setGuideLoading] = useState(false);
  const [guideError, setGuideError] = useState('');
  const [selectedGuideId, setSelectedGuideId] = useState<string | null>(null);

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

  // Add this at the top of the component
  const hotelScrollRef = React.useRef<HTMLDivElement>(null);

  // Add this helper at the top of the component (after imports)
  const extractMainLocation = (str: string): string => {
    if (!str) return '';
    // Remove any text in parentheses
    let cleanStr = str.replace(/\(.*?\)/g, '').trim();
    // Extract the last part after comma (if exists)
    const parts = cleanStr.split(',');
    const mainPart = parts[parts.length - 1].trim();
    // Remove any special characters and make lowercase
    return mainPart
      .replace(/[^\w\s]|_/g, '')
      .replace(/\s+/g, ' ')
      .toLowerCase();
  };

  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [paymentError, setPaymentError] = useState("");

  // Add state for customer info
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");

  useEffect(() => {
    const fetchDetails = async () => {
      console.log('Package data received:', pkg); // Debug log
      
      if (pkg?.id) {
        try {
          setLoading(true);
          setError('');
          
          console.log('Fetching package with ID:', pkg.id); // Debug log
          
          const response = await fetch('https://wander-nest-ad3s.onrender.com/api/packages/all/');
          
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          
          const data = await response.json();
          console.log('API response:', data); // Debug log
          
          // Handle paginated response structure
          const packagesData = data.results || (Array.isArray(data) ? data : []);
          console.log('Packages data:', packagesData); // Debug log
          
          const found = packagesData.find((p: any) => p.id === pkg.id);
          console.log('Found package:', found); // Debug log
          
          if (found) {
            setPackageDetails(found);
            setStartDate('');
            setTravelers(1);
            setTotalPrice(found.price || found.budget || '');
            setTransport('Not selected');
            setHotel('Not selected');
            setGuide('Not selected');
            setSkipTransport(true);
            setSkipHotel(false);
            setSkipGuide(true);
            setActiveOption('transport');
          } else {
            setError(`Package with ID ${pkg.id} not found in the API response.`);
          }
        } catch (err) {
          console.error('Error fetching package details:', err); // Debug log
          setError(`Failed to fetch package details: ${err instanceof Error ? err.message : 'Unknown error'}`);
        } finally {
          setLoading(false);
        }
      } else {
        console.log('No package ID found in:', pkg); // Debug log
        setError('No package selected or package data is incomplete.');
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
      const days = parseInt(getField(packageDetails, 'days'), 10);
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

  // Fetch all options when needed
  const fetchAllOptions = async () => {
    const token = localStorage.getItem("token");
    const headers = {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Token ${token}` }),
    };

    try {
      // Fetch all options in parallel
      const [transportRes, hotelsRes, guidesRes] = await Promise.all([
        fetch("https://wander-nest-ad3s.onrender.com/api/packages/transport-options/", { headers }),
        fetch("https://wander-nest-ad3s.onrender.com/api/packages/create/hotel-options/", { headers }),
        fetch("https://wander-nest-ad3s.onrender.com/api/packages/guide-options/", { headers }),
      ]);

      const transportData = await transportRes.json();
      const hotelsData = await hotelsRes.json();
      const guidesData = await guidesRes.json();

      setTransportOptions(transportData.results || transportData);
      console.log('Transport options:', transportData.results || transportData);
      setHotels(hotelsData.results || hotelsData);
      console.log('Hotel options:', hotelsData.results || hotelsData);
      setGuideOptions(guidesData.results || guidesData);
      console.log('Guide options:', guidesData.results || guidesData);
    } catch (error) {
      console.error("Error fetching options:", error);
      setHotelsError('Failed to fetch options.');
    }
  };

  // Fetch hotels when hotel selection is not skipped
  useEffect(() => {
    if (!skipHotel) {
      setHotelsLoading(true);
      setHotelsError('');
      fetchAllOptions().finally(() => {
        setHotelsLoading(false);
      });
    } else {
      setHotels([]);
    }
  }, [skipHotel]);

  // Fetch transport when transport selection is not skipped
  useEffect(() => {
    if (!skipTransport) {
      setTransportLoading(true);
      setTransportError('');
      fetchAllOptions().finally(() => {
        setTransportLoading(false);
      });
    } else {
      setTransportOptions([]);
    }
  }, [skipTransport]);

  // Fetch guides when guide selection is not skipped
  useEffect(() => {
    if (!skipGuide) {
      setGuideLoading(true);
      setGuideError('');
      fetchAllOptions().finally(() => {
        setGuideLoading(false);
      });
    } else {
      setGuideOptions([]);
    }
  }, [skipGuide]);

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

  const handleConfirmBooking = async () => {
    // Validation: required fields
    if (!packageDetails.source || !packageDetails.title || !startDate || !endDate || !travelers) {
      setWarning('Please fill in all traveler details.');
      return;
    }
    if (!customerName.trim()) {
      setWarning('Name is required.');
      return;
    }
    if (!customerEmail.trim()) {
      setWarning('Email is required.');
      return;
    }
    if (!customerPhone.trim()) {
      setWarning('Phone is required.');
      return;
    }
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(customerEmail)) {
      setWarning('Please enter a valid email.');
      return;
    }
    if (customerPhone.length < 10) {
      setWarning('Please enter a valid phone number.');
      return;
    }
    setWarning('');
    setPaymentError("");
    setIsProcessingPayment(true);
    try {
      // Prepare payment data for package booking
      const paymentData = {
        service_type: "package",
        service_name: packageDetails.title || "Package Booking",
        service_details: `Package booking for ${travelers} travelers from ${packageDetails.source} to ${packageDetails.destination}`,
        amount: Number(totalPrice),
        customer_name: customerName,
        customer_email: customerEmail,
        customer_phone: customerPhone,
        service_data: {
          package_id: packageDetails.id,
          package_title: packageDetails.title,
          from: packageDetails.source,
          to: packageDetails.destination,
          start_date: startDate,
          end_date: endDate,
          travelers: travelers,
        },
      };
      console.log('Sending payment data:', paymentData);
      const token = localStorage.getItem("token");
      const response = await fetch("https://wander-nest-ad3s.onrender.com/initiate-payment/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Authorization": `Token ${token}`,
        },
        body: JSON.stringify(paymentData),
      });
      const responseText = await response.text();
      let data;
      try {
        data = JSON.parse(responseText);
      } catch (parseError) {
        throw new Error("Invalid response format from server");
      }
      if (!response.ok) {
        const errorMessage =
          data?.detail ||
          data?.message ||
          data?.error ||
          data?.errors?.[0] ||
          `Server error: ${response.status} ${response.statusText}`;
        throw new Error(errorMessage);
      }
      if (data.status === "SUCCESS" && data.GatewayPageURL) {
        window.location.href = data.GatewayPageURL;
      } else if (data.GatewayPageURL) {
        window.location.href = data.GatewayPageURL;
      } else {
        throw new Error(data.detail || data.message || "Payment gateway URL not received. Please try again.");
      }
    } catch (err) {
      let errorMessage = "Payment failed. Please try again.";
      if (err instanceof Error) errorMessage = err.message;
      setPaymentError(errorMessage);
    } finally {
      setIsProcessingPayment(false);
    }
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
                <input className={styles.inputField} type="text" value={getField(packageDetails, 'source')} readOnly />
              </div>
              <div className={styles.inputGroup}>
                <label className={styles.inputLabel}>To</label>
                <input className={styles.inputField} type="text" value={getField(packageDetails, 'destination')} readOnly />
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
            <div className={styles.formRow}>
              <div className={styles.inputGroup}>
                <label className={styles.inputLabel}>Full Name *</label>
                <input
                  className={styles.inputField}
                  type="text"
                  value={customerName}
                  onChange={e => setCustomerName(e.target.value)}
                  required
                />
              </div>
              <div className={styles.inputGroup}>
                <label className={styles.inputLabel}>Email *</label>
                <input
                  className={styles.inputField}
                  type="email"
                  value={customerEmail}
                  onChange={e => setCustomerEmail(e.target.value)}
                  required
                />
              </div>
              <div className={styles.inputGroup}>
                <label className={styles.inputLabel}>Phone *</label>
                <input
                  className={styles.inputField}
                  type="tel"
                  value={customerPhone}
                  onChange={e => setCustomerPhone(e.target.value)}
                  required
                />
              </div>
            </div>
          </div>
        </div>
        <hr className={styles.divider} />
        <div className={styles.buttonRow}>
          {warning && (
            <div style={{ color: '#b94a48', background: '#fbeeea', borderRadius: 8, padding: '12px 18px', marginBottom: 12, fontWeight: 600, fontSize: '1.05rem', textAlign: 'center' }}>
              {warning}
            </div>
          )}
          {paymentError && (
            <div style={{ color: 'red', background: '#fbeeea', borderRadius: 8, padding: '12px 18px', marginBottom: 12, fontWeight: 600, fontSize: '1.05rem', textAlign: 'center' }}>
              {paymentError}
            </div>
          )}
          <button className={styles.confirmButton} onClick={handleConfirmBooking} disabled={isProcessingPayment}>
            {isProcessingPayment ? 'Processing Payment...' : 'Confirm Booking'}
          </button>
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
