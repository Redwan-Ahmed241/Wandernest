import React, { useEffect, useState } from 'react';
import styles from '../Styles/ProfileSettings.module.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Authentication/auth-context';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface UserProfile {
  id: string;
  name?: string;
  email: string;
  passportNumber?: string;
  dateOfBirth?: string;
  profile_image?: string;
}

const API_URL = " https://wander-nest-ad3s.onrender.com/api/auth/edit-profile/"; // <-- Replace with your actual API endpoint

const ProfileSettings: React.FC = () => {
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState<Partial<UserProfile>>({});
  const [picFile, setPicFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dobPicker, setDobPicker] = useState<Date | null>(null);
  const navigate = useNavigate();

  // Fetch user profile from API
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setError(null);
        const token = localStorage.getItem("token");
        const response = await fetch(API_URL, {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${token}`,
          },
        });
        if (!response.ok) throw new Error("Failed to fetch profile");
        const data = await response.json();
        setProfile(data);
        setForm(data);
        if (data.dateOfBirth) setDobPicker(new Date(data.dateOfBirth));
      } catch (err: any) {
        setError(err.message || "Could not load profile.");
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handlePicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPicFile(e.target.files[0]);
    }
  };

  const handleDateChange = (date: Date | null) => {
    setDobPicker(date);
    setForm({ ...form, dateOfBirth: date ? date.toISOString().slice(0, 10) : "" });
  };

  // Save profile to API
  const handleSave = async () => {
    setSaving(true);
    setError(null);
    try {
      const token = localStorage.getItem("token");
      let profile_image_url = form.profile_image;

      // If a new picture is selected, upload it first (if your backend supports file upload)
      if (picFile) {
        // Example: upload to /api/user/profile/upload-image/
        const imgForm = new FormData();
        imgForm.append("image", picFile);
        const imgRes = await fetch(API_URL + "upload-image/", {
          method: "POST",
          headers: {
            "Authorization": `Token ${token}`,
          },
          body: imgForm,
        });
        if (!imgRes.ok) throw new Error("Failed to upload image");
        const imgData = await imgRes.json();
        profile_image_url = imgData.url; // Adjust according to your backend response
      }

      // Prepare profile update payload
      const payload = {
        ...form,
        profile_image: profile_image_url,
      };

      const response = await fetch(API_URL, {
        method: "PUT", // or PATCH if your backend prefers
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Token ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("Failed to update profile");
      const updated = await response.json();
      setProfile(updated);
      setForm(updated);
      setEditMode(false);
      setPicFile(null);
    } catch (err: any) {
      setError(err.message || "Could not save profile.");
    } finally {
      setSaving(false);
    }
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
            {editMode ? (
              <input
                name="email"
                type="email"
                value={form.email || ''}
                onChange={handleChange}
                className={styles.inputField}
              />
            ) : (
              <span className={styles.fieldValue}>{profile.email}</span>
            )}
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
              <DatePicker
                selected={dobPicker}
                onChange={handleDateChange}
                dateFormat="yyyy-MM-dd"
                maxDate={new Date()}
                showYearDropdown
                scrollableYearDropdown
                yearDropdownItemNumber={100}
                placeholderText="Select date"
                className={styles.inputField}
                name="dateOfBirth"
                id="dateOfBirth"
                autoComplete="off"
              />
            ) : (
              <span className={styles.fieldValue}>{profile.dateOfBirth || '-'}</span>
            )}
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