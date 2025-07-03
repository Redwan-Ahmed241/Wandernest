import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const API_URL = 'https://wander-nest-ad3s.onrender.com/api/hotels/';

const HotelBook: React.FC = () => {
  const location = useLocation();
  const passedHotel = location.state?.hotel;
  const hotelId = passedHotel?.id;
  const [hotel, setHotel] = useState<any>(passedHotel || null);
  const [loading, setLoading] = useState(!passedHotel);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    checkin: '',
    checkout: '',
    guests: 1,
  });
  const [submitted, setSubmitted] = useState(false);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // Replace the following with your actual booking API endpoint
    fetch('https://wander-nest-ad3s.onrender.com/api/bookings/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...form, hotelId }),
    })
      .then(res => {
        if (!res.ok) throw new Error('Booking failed');
        return res.json();
      })
      .then(data => {
        // Optionally handle success (show message, redirect, etc.)
        console.log('Booking successful:', data);
      })
      .catch(err => {
        setError(err.message || 'Booking failed.');
      });
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

  if (loading) return <div style={{ padding: 40 }}>Loading...</div>;

  return (
    <div style={{ maxWidth: 500, margin: '40px auto', background: '#fff', borderRadius: 12, boxShadow: '0 2px 16px #eee', padding: 32 }}>
      {error && <div style={{ color: 'red', marginBottom: 16 }}>{error}</div>}
      <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: 8 }}>{hotel?.name || 'Hotel Name'}</h2>
      <img src={hotel?.image_url || 'https://via.placeholder.com/400x200?text=Hotel+Image'} alt={hotel?.name || 'Hotel'} style={{ width: '100%', borderRadius: 8, marginBottom: 16, background: '#f8f8f8', objectFit: 'cover', minHeight: 120 }} />
      <p style={{ color: '#666', marginBottom: 8 }}>{hotel?.description || 'No description available.'}</p>
      <div style={{ color: '#23a36c', fontWeight: 700, fontSize: 20, marginBottom: 8 }}>৳{hotel?.price || 'N/A'}</div>
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
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <input name="name" value={form.name} onChange={handleChange} placeholder="Your Name" required style={{ padding: 10, borderRadius: 6, border: '1px solid #ccc' }} />
        <input name="email" value={form.email} onChange={handleChange} placeholder="Email" type="email" required style={{ padding: 10, borderRadius: 6, border: '1px solid #ccc' }} />
        <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone" required style={{ padding: 10, borderRadius: 6, border: '1px solid #ccc' }} />
        <input name="checkin" value={form.checkin} onChange={handleChange} placeholder="Check-in Date" type="date" required style={{ padding: 10, borderRadius: 6, border: '1px solid #ccc' }} />
        <input name="checkout" value={form.checkout} onChange={handleChange} placeholder="Check-out Date" type="date" required style={{ padding: 10, borderRadius: 6, border: '1px solid #ccc' }} />
        <input name="guests" value={form.guests} onChange={handleChange} placeholder="Guests" type="number" min={1} required style={{ padding: 10, borderRadius: 6, border: '1px solid #ccc' }} />
        <button type="submit" style={{ background: '#23a36c', color: '#fff', border: 'none', borderRadius: 8, padding: 12, fontWeight: 700, fontSize: 18, marginTop: 10, cursor: 'pointer' }}>Book Hotel</button>
      </form>
      {submitted && <div style={{ color: '#23a36c', marginTop: 16 }}>Booking submitted! (Check console for data)</div>}
    </div>
  );
};

export default HotelBook;