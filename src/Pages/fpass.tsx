import React, { useState } from 'react';
import styles from '../Styles/fpass.module.css';
// import { supabase } from '../supabaseClient'; // Uncomment and configure if supabase client is set up

const FPass: React.FC = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // Placeholder for Supabase password reset
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    // --- SUPABASE LOGIC HERE ---
    // Uncomment and configure the following if supabase client is set up
    /*
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: 'https://your-app-url.com/reset-password',
    });
    if (error) {
      setMessage('No account found with that email or error sending email.');
    } else {
      setMessage('A password reset link has been sent to your email.');
    }
    */

    // TEMPORARY: Simulate async check
    setTimeout(() => {
      if (email === 'admin@wandernest.com') {
        setMessage('A password reset link has been sent to your email.');
      } else {
        setMessage('No account found with that email.');
      }
      setLoading(false);
    }, 1500);
  };

  return (
    <div style={{ maxWidth: 500, margin: '0 auto', marginTop: 10, padding: 32, background: '#fff', borderRadius: 12, boxShadow: '0 2px 16px #eee', fontFamily: 'inherit', textAlign: 'left' }}>
      <h2 style={{ fontSize: '2.2rem', fontWeight: 700, marginBottom: 12, color: '#19202A', letterSpacing: '-1px' }}>Forgot your password?</h2>
      <p style={{ fontSize: '1.25rem', color: '#222', marginBottom: 24, lineHeight: 1.3 }}>Enter your email address and we'll send you a link to reset your password.</p>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
          className={styles.input}
          style={{ width: '100%', padding: 12, marginBottom: 24, borderRadius: 5, border: '1px solid #ccc', fontSize: '1.1rem' }}
        />
        <button type="submit" disabled={loading} className={styles.darkButton} style={{ width: '100%', padding: 16, borderRadius: 8, fontSize: '1.5rem', fontWeight: 400, marginBottom: 8 }}>
          {loading ? 'Checking...' : 'Send reset link'}
        </button>
      </form>
      {message && <div style={{ marginTop: 16, color: message.includes('sent') ? 'green' : 'red', fontSize: '1.1rem' }}>{message}</div>}
    </div>
  );
};

export default FPass;
