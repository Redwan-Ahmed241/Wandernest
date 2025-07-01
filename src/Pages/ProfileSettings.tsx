import React, { useEffect, useState } from 'react';
import styles from '../Styles/ProfileSettings.module.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Authentication/auth-context';
import { userAPI } from '../App/api';

interface UserProfile {
  id: string;
  name?: string;
  email: string;
  passportNumber?: string;
  dateOfBirth?: string;
  profile_image?: string;
  socialLinks: string[];
}

const ProfileSettings: React.FC = () => {
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState<Partial<UserProfile>>({});
  const [picFile, setPicFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate('/login');
    }
    if (!authLoading && isAuthenticated) {
      const fetchProfile = async () => {
        try {
          const data = await userAPI.getProfile();
          setProfile(data);
          setForm(data);
        } catch (err: any) {
          setError(err.message);
        }
      };
      fetchProfile();
    }
  }, [isAuthenticated, authLoading, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, idx?: number) => {
    const { name, value } = e.target;
    if (name.startsWith('socialLinks')) {
      const links = form.socialLinks ? [...form.socialLinks] : ['', '', ''];
      if (typeof idx === 'number') links[idx] = value;
      setForm({ ...form, socialLinks: links });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handlePicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPicFile(e.target.files[0]);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setError(null);
    try {
      let profileImageUrl = form.profile_image;
      if (picFile) {
        // Upload profile pic to API
        const data = await userAPI.uploadProfileImage(picFile);
        profileImageUrl = data.profile_image || data.url;
      }
      // Update profile
      const updated = await userAPI.updateProfile({ ...form, profile_image: profileImageUrl });
      setProfile(updated);
      setEditMode(false);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (authLoading || !profile) return (
    <div className={styles.profileSettingsWrapper}>
      <div className={styles.profileCard}>
        <div className={styles.profilePicSection}>
          <div className={styles.skeletonPic} />
        </div>
        <div className={styles.profileInfoSection}>
          <div className={styles.skeletonField} style={{ width: '60%' }} />
          <div className={styles.skeletonField} style={{ width: '80%' }} />
        </div>
      </div>
    </div>
  );

  return (
    <div className={styles.profileSettingsWrapper}>
      <h2>Profile Settings</h2>
      {error && <div className={styles.error}>{error}</div>}
      <div className={styles.profileCard}>
        <div className={styles.profilePicSection}>
          <img
            src={picFile ? URL.createObjectURL(picFile) : profile.profile_image || '/Figma_photoes/wandernest.svg'}
            alt="Profile"
            className={styles.profilePic}
          />
          {editMode && (
            <input type="file" accept="image/*" onChange={handlePicChange} />
          )}
        </div>
        <div className={styles.profileInfoSection}>
          <div className={styles.fieldRow}>
            <label>Name:</label>
            {editMode ? (
              <input name="name" value={form.name || ''} onChange={handleChange} />
            ) : (
              <span>{profile.name || user?.first_name + ' ' + user?.last_name}</span>
            )}
          </div>
          <div className={styles.fieldRow}>
            <label>Email:</label>
            <span>{profile.email || user?.email}</span>
          </div>
          {profile.passportNumber !== undefined && (
            <div className={styles.fieldRow}>
              <label>Passport Number:</label>
              {editMode ? (
                <input name="passportNumber" value={form.passportNumber || ''} onChange={handleChange} />
              ) : (
                <span>{profile.passportNumber || '-'}</span>
              )}
            </div>
          )}
          {profile.dateOfBirth !== undefined && (
            <div className={styles.fieldRow}>
              <label>Date of Birth:</label>
              {editMode ? (
                <input name="dateOfBirth" type="date" value={form.dateOfBirth || ''} onChange={handleChange} />
              ) : (
                <span>{profile.dateOfBirth || '-'}</span>
              )}
            </div>
          )}
          {profile.socialLinks !== undefined && Array.isArray(profile.socialLinks) && (
            <div className={styles.fieldRow}>
              <label>Social Media Links:</label>
              <div className={styles.socialLinksRow}>
                {[0, 1, 2].map(idx => (
                  <input
                    key={idx}
                    name={`socialLinks${idx}`}
                    placeholder={`Link ${idx + 1}`}
                    value={form.socialLinks && form.socialLinks[idx] ? form.socialLinks[idx] : ''}
                    onChange={e => handleChange(e, idx)}
                    disabled={!editMode}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <div className={styles.buttonRow}>
        {editMode ? (
          <>
            <button onClick={handleSave} disabled={saving}>{saving ? 'Saving...' : 'Save Changes'}</button>
            <button onClick={() => setEditMode(false)} disabled={saving}>Cancel</button>
          </>
        ) : (
          <button onClick={() => setEditMode(true)}>Edit Profile</button>
        )}
      </div>
    </div>
  );
};

export default ProfileSettings; 