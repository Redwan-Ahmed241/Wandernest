import { FunctionComponent, useState } from 'react';
import styles from './MyTrips.module.css';
import Layout from '../Components/Layout';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';

const MyTrips: FunctionComponent = () => {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [activeView, setActiveView] = useState('overview');

  const tripData = {
    title: "Your trip to Bangladesh",
    dates: "Dec 10 - Dec 17, 2024",
    duration: "7 days",
    location: "Dhaka, Cox's Bazar, Chittagong",
    activities: 12,
    checkIn: "3:00 PM",
    weather: "25°C, Sunny",
    currency: "BDT (৳)",
    status: "upcoming"
  };

  const itinerary = [
    {
      id: 1,
      type: 'arrival',
      title: 'Arrive at Hazrat Shahjalal International Airport',
      time: 'Dec 10, 8:00 AM',
      icon: '✈️',
      description: 'International arrival'
    },
    {
      id: 2,
      type: 'hotel',
      title: 'Check-in to Pan Pacific Sonargaon Dhaka',
      time: 'Dec 10, 10:00 AM',
      icon: '🏨',
      description: 'Luxury hotel in city center'
    },
    {
      id: 3,
      type: 'dining',
      title: 'Dinner at Dhaka Regency Hotel',
      time: 'Dec 10, 7:00 PM',
      icon: '🍽️',
      description: 'Traditional Bengali cuisine'
    },
    {
      id: 4,
      type: 'sightseeing',
      title: 'Visit Lalbagh Fort',
      time: 'Dec 11, 9:00 AM',
      icon: '🏛️',
      description: 'Historic Mughal fort'
    },
    {
      id: 5,
      type: 'dining',
      title: 'Lunch at Star Kabab & Restaurant',
      time: 'Dec 11, 12:00 PM',
      icon: '🍽️',
      description: 'Local street food experience'
    },
    {
      id: 6,
      type: 'sightseeing',
      title: 'Explore Ahsan Manzil',
      time: 'Dec 11, 3:00 PM',
      icon: '🏛️',
      description: 'Pink Palace of Dhaka'
    },
    {
      id: 7,
      type: 'excursion',
      title: 'Day trip to Cox\'s Bazar',
      time: 'Dec 12, 9:00 AM',
      icon: '🏖️',
      description: 'World\'s longest natural beach'
    },
    {
      id: 8,
      type: 'shopping',
      title: 'Shopping at Aarong',
      time: 'Dec 12, 7:00 PM',
      icon: '🛍️',
      description: 'Traditional crafts and clothing'
    }
  ];

  return (
    <Layout>
      <div style={{ display: 'flex', alignItems: 'flex-start' }}>
        <Sidebar />
        <div style={{ flex: 1 }}>
    		<div className={styles.myTrips}>
            <div className={styles.container}>
              {/* Header Section */}
              <div className={styles.header}>
                <div className={styles.breadcrumb}>
                  <span className={styles.breadcrumbItem}>Trips</span>
                  <span className={styles.breadcrumbSeparator}>/</span>
                  <span className={styles.breadcrumbActive}>My Trips</span>
              							</div>
                <h1 className={styles.pageTitle}>My Trips</h1>
            						</div>

              {/* Trip Status Tabs */}
              <div className={styles.tabContainer}>
                <button 
                  className={`${styles.tab} ${activeTab === 'upcoming' ? styles.activeTab : ''}`}
                  onClick={() => setActiveTab('upcoming')}
                >
                  Upcoming
                </button>
                <button 
                  className={`${styles.tab} ${activeTab === 'past' ? styles.activeTab : ''}`}
                  onClick={() => setActiveTab('past')}
                >
                  Past
                </button>
                <button 
                  className={`${styles.tab} ${activeTab === 'cancelled' ? styles.activeTab : ''}`}
                  onClick={() => setActiveTab('cancelled')}
                >
                  Cancelled
                </button>
                								</div>

              {/* Trip Card */}
              <div className={styles.tripCard}>
                <div className={styles.tripHeader}>
                  <div className={styles.tripInfo}>
                    <h2 className={styles.tripTitle}>{tripData.title}</h2>
                    <p className={styles.tripDates}>{tripData.dates}</p>
                								</div>
                  <div className={styles.tripStatus}>
                    <span className={`${styles.statusBadge} ${styles[tripData.status]}`}>
                      {tripData.status.charAt(0).toUpperCase() + tripData.status.slice(1)}
                    </span>
                								</div>
              							</div>

                {/* View Toggle */}
                <div className={styles.viewToggle}>
                  <button 
                    className={`${styles.viewButton} ${activeView === 'overview' ? styles.activeView : ''}`}
                    onClick={() => setActiveView('overview')}
                  >
                    Overview
                  </button>
                  <button 
                    className={`${styles.viewButton} ${activeView === 'itinerary' ? styles.activeView : ''}`}
                    onClick={() => setActiveView('itinerary')}
                  >
                    Itinerary
                  </button>
            						</div>

                {/* Content Area */}
                <div className={styles.contentArea}>
                  {activeView === 'overview' ? (
                    <div className={styles.overview}>
                      <div className={styles.overviewGrid}>
                        <div className={styles.overviewCard}>
                          <div className={styles.overviewIcon}>📅</div>
                          <div className={styles.overviewContent}>
                            <h3>Duration</h3>
                            <p>{tripData.duration}</p>
                    										</div>
                  									</div>
                        <div className={styles.overviewCard}>
                          <div className={styles.overviewIcon}>📍</div>
                          <div className={styles.overviewContent}>
                            <h3>Location</h3>
                            <p>{tripData.location}</p>
                    										</div>
                  									</div>
                        <div className={styles.overviewCard}>
                          <div className={styles.overviewIcon}>🎯</div>
                          <div className={styles.overviewContent}>
                            <h3>Activities</h3>
                            <p>{tripData.activities} planned</p>
                    										</div>
                  									</div>
                        <div className={styles.overviewCard}>
                          <div className={styles.overviewIcon}>🏨</div>
                          <div className={styles.overviewContent}>
                            <h3>Check-in</h3>
                            <p>{tripData.checkIn}</p>
                    										</div>
                  									</div>
                        <div className={styles.overviewCard}>
                          <div className={styles.overviewIcon}>🌤️</div>
                          <div className={styles.overviewContent}>
                            <h3>Weather</h3>
                            <p>{tripData.weather}</p>
                    										</div>
                  									</div>
                        <div className={styles.overviewCard}>
                          <div className={styles.overviewIcon}>💰</div>
                          <div className={styles.overviewContent}>
                            <h3>Currency</h3>
                            <p>{tripData.currency}</p>
                  									</div>
                								</div>
              							</div>
            						</div>
                  ) : (
                    <div className={styles.itinerary}>
                      <div className={styles.timeline}>
                        {itinerary.map((item, index) => (
                          <div key={item.id} className={styles.timelineItem}>
                            <div className={styles.timelineIcon}>
                              <span className={styles.icon}>{item.icon}</span>
                              {index < itinerary.length - 1 && <div className={styles.timelineLine} />}
                								</div>
                            <div className={styles.timelineContent}>
                              <div className={styles.activityCard}>
                                <div className={styles.activityHeader}>
                                  <h3 className={styles.activityTitle}>{item.title}</h3>
                                  <span className={styles.activityTime}>{item.time}</span>
                								</div>
                                <p className={styles.activityDescription}>{item.description}</p>
                  									</div>
                								</div>
              							</div>
                        ))}
                    										</div>
                  									</div>
                  )}
                      											</div>
                    										</div>
                  									</div>
                								</div>
              							</div>
            						</div>
    </Layout>
  );
      			};
      			
      			export default MyTrips;