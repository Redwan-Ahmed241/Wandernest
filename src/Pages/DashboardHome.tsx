import React, { useState, useRef, useEffect } from 'react';
import Sidebar from './Sidebar';
import styles from './DashboardHome.module.css';
import Layout from '../Components/Layout';

// User data interface
interface UserData {
  fullName: string;
  age: number;
  country: string;
  email: string;
  phone: string;
  profileImage: string;
}

// Mock user data
const initialUserData: UserData = {
  fullName: 'Iftakhar Majumder',
  age: 28,
  country: 'Bangladesh',
  email: 'iftakhar@example.com',
  phone: '+880 1712-345678',
  profileImage: '/Figma_photoes/ifty.jpg'
};

// ImageUploader Component
const ImageUploader: React.FC<{
  currentImage: string;
  onImageChange: (imageUrl: string) => void;
}> = ({ currentImage, onImageChange }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please select a valid image file.');
        return;
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size should be less than 5MB.');
        return;
      }

      setIsUploading(true);
      const reader = new FileReader();
      
      reader.onload = (e) => {
        const result = e.target?.result as string;
        onImageChange(result);
        setIsUploading(false);
      };
      
      reader.onerror = () => {
        alert('Error reading the image file. Please try again.');
        setIsUploading(false);
      };
      
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className={styles.imageUploader}>
      <div className={styles.profileImageContainer}>
        <img 
          src={currentImage} 
          alt="Profile" 
          className={styles.profileImage}
        />
        <button 
          className={`${styles.editImageButton} ${isUploading ? styles.uploading : ''}`}
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading}
        >
          {isUploading ? '...' : '📷'}
        </button>
      </div>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className={styles.hiddenInput}
      />
    </div>
  );
};

// EditableField Component
const EditableField: React.FC<{
  label: string;
  value: string | number;
  onSave: (value: string | number) => void;
  type?: 'text' | 'number' | 'email' | 'tel';
}> = ({ label, value, onSave, type = 'text' }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value);

  // Update editValue when value prop changes
  useEffect(() => {
    setEditValue(value);
  }, [value]);

  const handleSave = () => {
    onSave(editValue);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditValue(value);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  return (
    <div className={styles.editableField}>
      <label className={styles.fieldLabel}>{label}</label>
      {isEditing ? (
        <div className={styles.editMode}>
          <input
            type={type}
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onKeyDown={handleKeyDown}
            className={styles.editInput}
            autoFocus
          />
          <div className={styles.editButtons}>
            <button 
              onClick={handleSave}
              className={styles.saveButton}
            >
              ✓
            </button>
            <button 
              onClick={handleCancel}
              className={styles.cancelButton}
            >
              ✕
            </button>
          </div>
        </div>
      ) : (
        <div className={styles.displayMode}>
          <span className={styles.fieldValue}>{value}</span>
          <button 
            onClick={() => setIsEditing(true)}
            className={styles.editButton}
          >
            ✏️
          </button>
        </div>
      )}
    </div>
  );
};

// UserInfoCard Component
const UserInfoCard: React.FC<{
  userData: UserData;
  onUserDataChange: (newData: Partial<UserData>) => void;
}> = ({ userData, onUserDataChange }) => {
  return (
    <div className={styles.userInfoCard}>
      <h2 className={styles.cardTitle}>Profile Information</h2>
      <div className={styles.cardContent}>
        <ImageUploader
          currentImage={userData.profileImage}
          onImageChange={(imageUrl) => onUserDataChange({ profileImage: imageUrl })}
        />
        <div className={styles.fieldsGrid}>
          <EditableField
            label="Full Name"
            value={userData.fullName}
            onSave={(value) => onUserDataChange({ fullName: value as string })}
          />
          <EditableField
            label="Age"
            value={userData.age}
            onSave={(value) => onUserDataChange({ age: Number(value) })}
            type="number"
          />
          <EditableField
            label="Country"
            value={userData.country}
            onSave={(value) => onUserDataChange({ country: value as string })}
          />
          <EditableField
            label="Email"
            value={userData.email}
            onSave={(value) => onUserDataChange({ email: value as string })}
            type="email"
          />
          <EditableField
            label="Phone Number"
            value={userData.phone}
            onSave={(value) => onUserDataChange({ phone: value as string })}
            type="tel"
          />
        </div>
      </div>
    </div>
  );
};

// Dashboard Stats Component
const DashboardStats: React.FC = () => {
  return (
    <div className={styles.statsGrid}>
      <div className={styles.statCard}>
        <div className={styles.statIcon}>✈️</div>
        <div className={styles.statContent}>
          <h3 className={styles.statNumber}>12</h3>
          <p className={styles.statLabel}>Trips Taken</p>
        </div>
      </div>
      <div className={styles.statCard}>
        <div className={styles.statIcon}>🏨</div>
        <div className={styles.statContent}>
          <h3 className={styles.statNumber}>8</h3>
          <p className={styles.statLabel}>Hotels Booked</p>
        </div>
      </div>
      <div className={styles.statCard}>
        <div className={styles.statIcon}>🚗</div>
        <div className={styles.statContent}>
          <h3 className={styles.statNumber}>15</h3>
          <p className={styles.statLabel}>Cars Rented</p>
        </div>
      </div>
      <div className={styles.statCard}>
        <div className={styles.statIcon}>⭐</div>
        <div className={styles.statContent}>
          <h3 className={styles.statNumber}>4.8</h3>
          <p className={styles.statLabel}>Average Rating</p>
        </div>
      </div>
    </div>
  );
};

// Main Dashboard Component
const DashboardHome: React.FC = () => {
  const [userData, setUserData] = useState<UserData>(initialUserData);

  const handleUserDataChange = (newData: Partial<UserData>) => {
    setUserData(prev => ({ ...prev, ...newData }));
  };

  return (
    <Layout>
      <div className={styles.dashboardContainer}>
        <Sidebar />
        <main className={styles.mainContent}>
          <div className={styles.dashboardHeader}>
            <h1 className={styles.dashboardTitle}>Dashboard</h1>
            <p className={styles.dashboardSubtitle}>Welcome back! Here's your travel overview.</p>
          </div>
          
          <div className={styles.dashboardContent}>
            <DashboardStats />
            <UserInfoCard 
              userData={userData} 
              onUserDataChange={handleUserDataChange}
            />
          </div>
        </main>
      </div>
    </Layout>
  );
};

export default DashboardHome;
