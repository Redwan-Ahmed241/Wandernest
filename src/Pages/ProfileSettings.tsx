import React, { useEffect, useState } from 'react';
import styles from '../Styles/ProfileSettings.module.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Authentication/auth-context';

interface UserProfile {
  id: string;
  name?: string;
  email: string;
  passportNumber?: string;
  dateOfBirth?: string;
  profile_image?: string;
  socialLinks: string[];
}

const MOCK_PROFILE: UserProfile = {
  id: '1',
  name: 'John Doe',
  email: 'john.doe@example.com',
  passportNumber: 'A1234567',
  dateOfBirth: '1990-01-01',
  profile_image: '',
  socialLinks: ['https://twitter.com/johndoe', '', ''],
};

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
    // Ignore auth and API, just use mock data
    setProfile(MOCK_PROFILE);
    setForm(MOCK_PROFILE);
  }, []);

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
    // Just update local state
    setProfile({ ...profile!, ...form, profile_image: picFile ? URL.createObjectURL(picFile) : profile?.profile_image });
    setEditMode(false);
    setSaving(false);
  };

  if (!profile) return (
    <div className={styles.profileSettingsWrapper}>
      <div className={styles.skeletonProfile}>
        <div className={styles.skeletonPic} />
        <div className={styles.skeletonFields}>
          <div className={styles.skeletonField} />
          <div className={styles.skeletonField} />
          <div className={styles.skeletonField} />
        </div>
      </div>
    </div>
  );

  return (
    <div className={styles.profileSettingsWrapper}>
      <h2 className={styles.title}>Profile Settings</h2>
      {error && <div className={styles.error}>{error}</div>}
      <div className={styles.profileCard}>
        <div className={styles.profilePicSection}>
          <div className={styles.profilePicWrapper}>
            <img
              src={picFile ? URL.createObjectURL(picFile) : profile.profile_image || '/Figma_photoes/wandernest.svg'}
              alt="Profile"
              className={styles.profilePic}
            />
            {editMode && (
              <label className={styles.profilePicOverlay} title="Change Photo">
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={handlePicChange} 
                  className={styles.fileInput}
                />
                <span className={styles.cameraIcon}>📷</span>
              </label>
            )}
          </div>
        </div>
        <div className={styles.profileInfoSection}>
          <div className={styles.fieldGroup}>
            <label className={styles.fieldLabel}>Name:</label>
            {editMode ? (
              <input 
                name="name" 
                value={form.name || ''} 
                onChange={handleChange}
                className={styles.inputField}
              />
            ) : (
              <span className={styles.fieldValue}>{profile.name}</span>
            )}
          </div>
          <div className={styles.fieldGroup}>
            <label className={styles.fieldLabel}>Email:</label>
            <span className={styles.fieldValue}>{profile.email}</span>
          </div>
          <div className={styles.fieldGroup}>
            <label className={styles.fieldLabel}>Passport Number:</label>
            {editMode ? (
              <input 
                name="passportNumber" 
                value={form.passportNumber || ''} 
                onChange={handleChange}
                className={styles.inputField}
              />
            ) : (
              <span className={styles.fieldValue}>{profile.passportNumber || '-'}</span>
            )}
          </div>
          <div className={styles.fieldGroup}>
            <label className={styles.fieldLabel}>Date of Birth:</label>
            {editMode ? (
              <input 
                name="dateOfBirth" 
                type="date" 
                value={form.dateOfBirth || ''} 
                onChange={handleChange}
                className={styles.inputField}
              />
            ) : (
              <span className={styles.fieldValue}>{profile.dateOfBirth || '-'}</span>
            )}
          </div>
          <div className={styles.fieldGroup}>
            <label className={styles.fieldLabel}>Social Media Links:</label>
            <div className={styles.socialLinks}>
              {[0, 1, 2].map(idx => (
                <input
                  key={idx}
                  name={`socialLinks${idx}`}
                  placeholder={`Social link ${idx + 1}`}
                  value={form.socialLinks && form.socialLinks[idx] ? form.socialLinks[idx] : ''}
                  onChange={e => handleChange(e, idx)}
                  disabled={!editMode}
                  className={styles.inputField}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className={styles.buttonGroup}>
        {editMode ? (
          <>
            <button 
              onClick={handleSave} 
              disabled={saving}
              className={`${styles.button} ${styles.saveButton}`}
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
            <button 
              onClick={() => setEditMode(false)} 
              disabled={saving}
              className={`${styles.button} ${styles.cancelButton}`}
            >
              Cancel
            </button>
          </>
        ) : (
          <button 
            onClick={() => setEditMode(true)}
            className={`${styles.button} ${styles.editButton}`}
          >
            Edit Profile
          </button>
        )}
      </div>
    </div>
  );
};

export default ProfileSettings; 