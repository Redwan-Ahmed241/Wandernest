import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from "../Authentication/auth-context";

const API_URL = 'https://wander-nest-ad3s.onrender.com/api/hotels/';

const HotelBook: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, loading: authLoading } = useAuth();
  const passedHotel = location.state?.hotel;
  const hotelId = passedHotel?.id;
  
  const [hotel, setHotel] = useState<any>(passedHotel || null);
  const [loading, setLoading] = useState(!passedHotel);
  const [error, setError] = useState('');
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    checkin: '',
    guests: 1,
  });

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate("/login", { replace: true });
    }
  }, [authLoading, isAuthenticated, navigate]);

  useEffect(() => {
    if (hotel) return;
    if (!hotelId) {
      setError('No hotel selected.');
      setLoading(false);
      return;
    }
    fetch(`${API_URL}${hotelId}`)
      .then(res => {
        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
        return res.json();
      })
      .then(data => {
        if (data && data.id) {
          setHotel(data);
        } else {
          throw new Error('Invalid hotel data');
        }
      })
      .catch(err => {
        setError(err.message || 'Failed to fetch hotel info.');
      })
      .finally(() => setLoading(false));
  }, [hotelId, hotel]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessingPayment(true);
    setError('');

   try {
  // Calculate total amount
  const totalAmount = (hotel?.price || 0) * form.guests;

  // Get auth token (assuming it's stored in localStorage)
  const token = localStorage.getItem('authToken'); // Or use context/store

  if (!token) {
    setError("You must be logged in to make a payment.");
    return;
  }

  // Prepare payment data
  const paymentData = {
    amount: totalAmount,
    customer_name: form.name,
    customer_email: form.email,
    customer_phone: form.phone,
    service_type: 'hotel',
    service_name: hotel?.name || 'Hotel Booking',
    service_details: `Hotel booking for ${form.guests} guests`,
    service_data: {
      hotel_id: hotelId,
      hotel_name: hotel?.name,
      checkin_date: form.checkin,
      guests: form.guests,
      location: hotel?.location
    }
  };

  // Call Django SSLCommerz endpoint
  const response = await fetch('https://wander-nest-ad3s.onrender.com/api/sslcommerz/init-payment/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Token ${token}`  // or Bearer if JWT
    },
    body: JSON.stringify(paymentData)
  });

  const data = await response.json();

  if (data.status === 'SUCCESS' && data.GatewayPageURL) {
    // Redirect to SSLCommerz payment gateway
    window.location.href = data.GatewayPageURL;
  } else {
    setError('Payment initialization failed. Please try again.');
  }
} catch (error) {
  console.error('Payment error:', error);
  setError('Payment failed. Please try again.');
} finally {
  setIsProcessingPayment(false);
}
  };

  // Robust getRooms function
  const getRooms = () => {
    if (!hotel) return [];
    if (hotel.rooms) return hotel.rooms;
    if (hotel.roomTypes) {
      return hotel.roomTypes.map((type: string) => ({
        type,
        price: hotel.price,
        image: hotel.image_url,
      }));
    }
    return [{
      type: hotel.type || 'Standard',
      price: hotel.price,
      image: hotel.image_url,
    }];
  };

  const rooms = getRooms();
  const totalAmount = (hotel?.price || 0) * form.guests;

  if (loading) return <div style={{ padding: 40 }}>Loading...</div>;

  return (
    <div style={{ maxWidth: 500, margin: '40px auto', background: '#fff', borderRadius: 12, boxShadow: '0 2px 16px #eee', padding: 32 }}>
      {error && <div style={{ color: 'red', marginBottom: 16, padding: 12, background: '#fee', borderRadius: 6 }}>{error}</div>}
      
      <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: 8 }}>{hotel?.name || 'Hotel Name'}</h2>
      <img src={hotel?.image_url || 'https://via.placeholder.com/400x200?text=Hotel+Image'} alt={hotel?.name || 'Hotel'} style={{ width: '100%', borderRadius: 8, marginBottom: 16, background: '#f8f8f8', objectFit: 'cover', minHeight: 120 }} />
      <p style={{ color: '#666', marginBottom: 8 }}>{hotel?.description || 'No description available.'}</p>
      <div style={{ color: '#23a36c', fontWeight: 700, fontSize: 20, marginBottom: 8 }}>৳{hotel?.price || 'N/A'} per night</div>
      <div style={{ color: '#888', fontSize: 15, marginBottom: 4 }}>Location: {hotel?.location || 'N/A'}</div>
      <div style={{ color: '#888', fontSize: 15, marginBottom: 4 }}>Star: {hotel?.star || 'N/A'}</div>

      {rooms.length > 0 && (
        <div style={{ marginBottom: 24 }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: 10 }}>Room Type</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {rooms.map((room: any, idx: number) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'center', background: '#f8f9fa', borderRadius: 8, padding: 12, boxShadow: '0 1px 4px #eee' }}>
                <img src={room.image || 'https://via.placeholder.com/120x80?text=Room'} alt={room.type} style={{ width: 100, height: 70, objectFit: 'cover', borderRadius: 6, marginRight: 16, background: '#eaeaea' }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: 16 }}>{room.type || 'N/A'}</div>
                  <div style={{ color: '#23a36c', fontWeight: 700, fontSize: 16 }}>৳{room.price || 'N/A'}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <form onSubmit={handlePayment} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <input name="name" value={form.name} onChange={handleChange} placeholder="Your Name" required style={{ padding: 10, borderRadius: 6, border: '1px solid #ccc' }} />
        <input name="email" value={form.email} onChange={handleChange} placeholder="Email" type="email" required style={{ padding: 10, borderRadius: 6, border: '1px solid #ccc' }} />
        <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone" required style={{ padding: 10, borderRadius: 6, border: '1px solid #ccc' }} />
        <input name="checkin" value={form.checkin} onChange={handleChange} placeholder="Check-in Date" type="date" required min={new Date().toISOString().split('T')[0]} style={{ padding: 10, borderRadius: 6, border: '1px solid #ccc' }} />
        <input name="guests" value={form.guests} onChange={handleChange} placeholder="Guests" type="number" min={1} required style={{ padding: 10, borderRadius: 6, border: '1px solid #ccc' }} />
        
        {/* Total Amount Display */}
        <div style={{ background: '#f8f9fa', padding: 12, borderRadius: 6, border: '1px solid #dee2e6' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontWeight: 600 }}>Total Amount:</span>
            <span style={{ color: '#23a36c', fontWeight: 700, fontSize: 18 }}>৳{totalAmount}</span>
          </div>
          <div style={{ fontSize: 14, color: '#666', marginTop: 4 }}>
            ৳{hotel?.price || 0} × {form.guests} guests
          </div>
        </div>

        <button 
          type="submit" 
          disabled={isProcessingPayment}
          style={{ 
            background: isProcessingPayment ? '#6c757d' : '#23a36c', 
            color: '#fff', 
            border: 'none', 
            borderRadius: 8, 
            padding: 12, 
            fontWeight: 700, 
            fontSize: 18, 
            marginTop: 10, 
            cursor: isProcessingPayment ? 'not-allowed' : 'pointer',
            opacity: isProcessingPayment ? 0.7 : 1
          }}
        >
          {isProcessingPayment ? 'Processing Payment...' : `Pay ৳${totalAmount} & Book Hotel`}
        </button>
      </form>
    </div>
  );
};

export default HotelBook;