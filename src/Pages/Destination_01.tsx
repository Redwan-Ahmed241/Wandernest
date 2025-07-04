import React, { FunctionComponent, useState } from 'react';
import styles from '../Styles/Destination01.module.css';
import Layout from '../App/Layout';
import { useNavigate } from 'react-router-dom';

const Destination01: FunctionComponent = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Destination data
  const destinationData = {
    name: "Cox's Bazar",
    subtitle: "The world's longest natural sea beach",
    description: "Explore the beautiful town and enjoy the sun, sand, and sea! Discover pristine beaches, stunning waterfalls, and rich cultural heritage.",
    location: "Chittagong Division, Bangladesh",
    coordinates: "21.4272° N, 92.0058° E",
    bestTime: "November to March",
    currency: "BDT (৳)",
    language: "Bengali, English",
    image: "/Figma_photoes/coxsbazar.jpg",
    heroImage: "/Figma_photoes/cox-s-bazaar-syed-zakir-hossain-1584366863439.jpg"
  };

  // Weather data
  const weatherData = {
    current: {
      temperature: 29,
      condition: "Sunny",
      humidity: "75%",
      windSpeed: "12 km/h"
    },
    forecast: [
      { day: "Fri", temp: 29, condition: "☀️" },
      { day: "Sat", temp: 28, condition: "⛅" },
      { day: "Sun", temp: 30, condition: "☀️" },
      { day: "Mon", temp: 27, condition: "🌧️" },
      { day: "Tue", temp: 29, condition: "⛅" },
      { day: "Wed", temp: 31, condition: "☀️" },
      { day: "Thu", temp: 30, condition: "☀️" }
    ]
  };

  // Attractions data
  const attractions = [
    {
      id: 1,
      name: "Cox's Bazar Beach",
      description: "Most popular beach in Bangladesh",
      image: "/Figma_photoes/cox.jpg",
      rating: 4.8,
      reviews: 2500,
      category: "Beach"
    },
    {
      id: 2,
      name: "Inani Beach",
      description: "Secluded beach with golden sands",
      image: "/Figma_photoes/sunset-view-inani-beach-cox-s-bazar-biggest-sea-beach-world-sunset-view-inani-beach-cox-s-bazar-chittagong-258490820.jpg",
      rating: 4.6,
      reviews: 1200,
      category: "Beach"
    },
    {
      id: 3,
      name: "Himchari Waterfall",
      description: "Spectacular waterfall amidst lush forests",
      image: "/Figma_photoes/Jogini-Waterfall.jpg",
      rating: 4.7,
      reviews: 800,
      category: "Nature"
    },
    {
      id: 4,
      name: "Ramu Buddhist Temple",
      description: "Ancient Buddhist temple with intricate carvings",
      image: "/Figma_photoes/ramu-buddhist-temple-place-bandarban-district-chittagong-bangladesh-most-beautiful-place-bagladesh-coxbazar-ramu-262464142.jpg",
      rating: 4.5,
      reviews: 600,
      category: "Cultural"
    },
    {
      id: 5,
      name: "Adinath Temple",
      description: "Hindu temple with stunning architecture",
      image: "/Figma_photoes/lalbagh.jpg",
      rating: 4.4,
      reviews: 450,
      category: "Cultural"
    }
  ];

  // Experiences data
  const experiences = [
    {
      id: 1,
      name: "Private Tour of Cox's Bazar",
      description: "Discover the best of Cox's Bazar on a private tour",
      image: "/Figma_photoes/tourist-is-traveling.jpg",
      duration: "8 hours",
      price: "৳2,500",
      rating: 4.9,
      reviews: 180
    },
    {
      id: 2,
      name: "Full-Day Sightseeing Tour",
      description: "Explore Cox's Bazar's top attractions on a full-day sightseeing tour",
      image: "/Figma_photoes/places-to-visit-in-sundarbans.jpg",
      duration: "10 hours",
      price: "৳3,200",
      rating: 4.7,
      reviews: 220
    },
    {
      id: 3,
      name: "Private Day Trip to Himchari and Inani",
      description: "Visit Himchari and Inani beaches on a private day trip",
      image: "/Figma_photoes/cycling.jpg",
      duration: "6 hours",
      price: "৳1,800",
      rating: 4.8,
      reviews: 150
    }
  ];

  // Payment handler for experiences
  const handleExperiencePayment = async (experience: any) => {
    setError(null);
    setIsProcessing(true);
    try {
      // Parse price (remove currency symbol if present)
      const amount = typeof experience.price === 'string'
        ? parseFloat(experience.price.replace(/[^\d.]/g, '')) || 0
        : Number(experience.price) || 0;
      // Prepare payment data
      const paymentData = {
        service_type: 'experience',
        service_name: experience.name,
        service_details: experience.description,
        amount,
        customer_name: 'Guest', // Or prompt for user info if needed
        customer_email: 'guest@example.com',
        customer_phone: '0000000000',
        service_data: JSON.stringify({
          experience_id: experience.id,
          experience_name: experience.name,
          duration: experience.duration,
        })
      };
      const response = await fetch('https://wander-nest-ad3s.onrender.com/initiate-payment/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentData),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.detail || data.message || `Payment failed with status ${response.status}`);
      }
      if (data.status === 'SUCCESS' && data.GatewayPageURL) {
        window.location.href = data.GatewayPageURL;
      } else {
        setError(data.detail || 'Payment initialization failed. Please try again.');
      }
    } catch (err: any) {
      setError(err.message || 'Payment failed. Please try again.');
      console.error('Payment error:', err);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Layout>
      <div className={styles.destinationPage}>
        {/* Hero Section */}
        <div className={styles.heroSection}>
          <div className={styles.heroImage}>
            <img src={destinationData.heroImage} alt={destinationData.name} />
            <div className={styles.heroOverlay}>
              <div className={styles.heroContent}>
                <h1 className={styles.heroTitle}>{destinationData.name}</h1>
                <p className={styles.heroSubtitle}>{destinationData.subtitle}</p>
                <p className={styles.heroDescription}>{destinationData.description}</p>
                <div className={styles.heroStats}>
                  <div className={styles.stat}>
                    <span className={styles.statIcon}>📍</span>
                    <span className={styles.statText}>{destinationData.location}</span>
                  </div>
                  <div className={styles.stat}>
                    <span className={styles.statIcon}>🌤️</span>
                    <span className={styles.statText}>{weatherData.current.temperature}°C</span>
                  </div>
                  <div className={styles.stat}>
                    <span className={styles.statIcon}>💰</span>
                    <span className={styles.statText}>{destinationData.currency}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className={styles.tabContainer}>
          <button 
            className={`${styles.tab} ${activeTab === 'overview' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button 
            className={`${styles.tab} ${activeTab === 'attractions' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('attractions')}
          >
            Attractions
          </button>
          <button 
            className={`${styles.tab} ${activeTab === 'experiences' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('experiences')}
          >
            Experiences
          </button>
          <button 
            className={`${styles.tab} ${activeTab === 'weather' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('weather')}
          >
            Weather
          </button>
        </div>

        {/* Content Area */}
        <div className={styles.contentArea}>
          {activeTab === 'overview' && (
            <div className={styles.overviewSection}>
              <div className={styles.overviewGrid}>
                <div className={styles.overviewCard}>
                  <div className={styles.cardIcon}>📍</div>
                  <h3>Location</h3>
                  <p>{destinationData.location}</p>
                  <small>{destinationData.coordinates}</small>
                </div>
                <div className={styles.overviewCard}>
                  <div className={styles.cardIcon}>🌤️</div>
                  <h3>Best Time to Visit</h3>
                  <p>{destinationData.bestTime}</p>
                  <small>Peak season</small>
                </div>
                <div className={styles.overviewCard}>
                  <div className={styles.cardIcon}>💰</div>
                  <h3>Currency</h3>
                  <p>{destinationData.currency}</p>
                  <small>Local currency</small>
                </div>
                <div className={styles.overviewCard}>
                  <div className={styles.cardIcon}>🗣️</div>
                  <h3>Language</h3>
                  <p>{destinationData.language}</p>
                  <small>Primary languages</small>
                </div>
              </div>
              
              <div className={styles.weatherPreview}>
                <h2>Current Weather</h2>
                <div className={styles.currentWeather}>
                  <div className={styles.weatherMain}>
                    <span className={styles.temperature}>{weatherData.current.temperature}°C</span>
                    <span className={styles.condition}>{weatherData.current.condition}</span>
                  </div>
                  <div className={styles.weatherDetails}>
                    <div className={styles.weatherDetail}>
                      <span>Humidity</span>
                      <span>{weatherData.current.humidity}</span>
                    </div>
                    <div className={styles.weatherDetail}>
                      <span>Wind</span>
                      <span>{weatherData.current.windSpeed}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'attractions' && (
            <div className={styles.attractionsSection}>
              <h2>Top Attractions in {destinationData.name}</h2>
              <div className={styles.attractionsGrid}>
                {attractions.map((attraction) => (
                  <div key={attraction.id} className={styles.attractionCard}>
                    <div className={styles.attractionImage}>
                      <img src={attraction.image} alt={attraction.name} />
                      <div className={styles.attractionCategory}>{attraction.category}</div>
                    </div>
                    <div className={styles.attractionContent}>
                      <h3>{attraction.name}</h3>
                      <p>{attraction.description}</p>
                      <div className={styles.attractionRating}>
                        <span className={styles.stars}>{"★".repeat(Math.floor(attraction.rating))}</span>
                        <span className={styles.ratingText}>{attraction.rating} ({attraction.reviews} reviews)</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'experiences' && (
            <div className={styles.experiencesSection}>
              <h2>Experience {destinationData.name}</h2>
              <div className={styles.experiencesGrid}>
                {experiences.map((experience) => (
                  <div key={experience.id} className={styles.experienceCard}>
                    <div className={styles.experienceImage}>
                      <img src={experience.image} alt={experience.name} />
                      <div className={styles.experiencePrice}>{experience.price}</div>
                    </div>
                    <div className={styles.experienceContent}>
                      <h3>{experience.name}</h3>
                      <p>{experience.description}</p>
                      <div className={styles.experienceDetails}>
                        <span className={styles.duration}>⏱️ {experience.duration}</span>
                        <div className={styles.experienceRating}>
                          <span className={styles.stars}>{"★".repeat(Math.floor(experience.rating))}</span>
                          <span className={styles.ratingText}>{experience.rating} ({experience.reviews} reviews)</span>
                        </div>
                      </div>
                      <button
                        className={styles.bookButton}
                        onClick={() => handleExperiencePayment(experience)}
                        disabled={isProcessing}
                      >
                        {isProcessing ? 'Processing...' : 'Book Now'}
                      </button>
                      {error && <div className={styles.errorMessage}>{error}</div>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'weather' && (
            <div className={styles.weatherSection}>
              <h2>Weather in {destinationData.name}</h2>
              <div className={styles.weatherContainer}>
                <div className={styles.currentWeatherCard}>
                  <h3>Current Weather</h3>
                  <div className={styles.currentWeatherDisplay}>
                    <div className={styles.temperatureDisplay}>
                      <span className={styles.temperatureLarge}>{weatherData.current.temperature}°C</span>
                      <span className={styles.conditionLarge}>{weatherData.current.condition}</span>
                    </div>
                    <div className={styles.weatherInfo}>
                      <div className={styles.weatherInfoItem}>
                        <span>Humidity</span>
                        <span>{weatherData.current.humidity}</span>
                      </div>
                      <div className={styles.weatherInfoItem}>
                        <span>Wind Speed</span>
                        <span>{weatherData.current.windSpeed}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className={styles.forecastCard}>
                  <h3>7-Day Forecast</h3>
                  <div className={styles.forecastGrid}>
                    {weatherData.forecast.map((day, index) => (
                      <div key={index} className={styles.forecastDay}>
                        <span className={styles.forecastDayName}>{day.day}</span>
                        <span className={styles.forecastIcon}>{day.condition}</span>
                        <span className={styles.forecastTemp}>{day.temp}°</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Destination01;
                                    