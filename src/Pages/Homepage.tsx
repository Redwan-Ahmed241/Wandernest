"use client"

import { type FunctionComponent, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import styles from "../Styles/Homepage.module.css"
import Layout from "../App/Layout"

const API_URL = "https://wander-nest-ad3s.onrender.com/api/home/features/"
const MEDIA_BASE = "https://wander-nest-ad3s.onrender.com"

const HomePage: FunctionComponent = () => {
  const [destinations, setDestinations] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const navigate = useNavigate()

  useEffect(() => {
    const fetchDestinations = async () => {
      setLoading(true)
      setError("")
      try {
        const response = await fetch(API_URL)
        if (!response.ok) throw new Error("Failed to fetch destinations")
        const data = await response.json()
        setDestinations(Array.isArray(data) ? data : [])
      } catch (err: any) {
        setError(err.message || "Error fetching destinations")
      } finally {
        setLoading(false)
      }
    }

    fetchDestinations()
  }, [])

  const handleCardClick = () => {
    navigate("/destination-01")
  }

  return (
    <Layout>
      <main className={styles.homePage}>
        <div className={styles.depth6Frame02}>
          <div className={styles.heroContentWrapper}>
            <div className={styles.exploreBangladeshWith}>Explore Bangladesh with WanderNest</div>
            <div className={styles.depth7Frame0}>
              <div className={styles.discoverTheBeauty}>
                Discover the beauty and culture of Bangladesh with our tailored travel services.
              </div>
            </div>
          </div>
        </div>

        <div className={styles.Destinations}>
          <h2 className={styles.sectionTitle}>Featured Destinations</h2>
          {error && <div style={{ color: "red", marginBottom: 12 }}>{error}</div>}
          <div className={styles.destinationsGrid}>
            {/* Show only first 6 destinations - no "View All" button */}
            {destinations.slice(0, 6).map((place, index) => (
              <div
                key={place.id || index}
                className={styles.destinationCard}
                onClick={handleCardClick}
                style={{ cursor: "pointer" }}
              >
                <img
                  src={place.pic.startsWith("http") ? place.pic : MEDIA_BASE + place.pic}
                  alt={place.title}
                  className={styles.destinationImage}
                />
                <div className={styles.destinationContent}>
                  <div className={styles.destinationTitle}>{place.title}</div>
                  <div className={styles.destinationDescription}>{place.subtitle}</div>
                </div>
              </div>
            ))}
            {loading && <div style={{ gridColumn: "1/-1", textAlign: "center" }}>Loading destinations...</div>}
          </div>
        </div>

        <div className={styles.depth4Frame12}>
          <b className={styles.featuredDestinations}>Our Services</b>
        </div>

        <div className={styles.depth4Frame4}>
          <div className={styles.depth5Frame04}>
            <div className={styles.depth6Frame04}>
              <img className={styles.depth7Frame05} alt="Visa" src="/Figma_photoes/visa.svg" />
              <div className={styles.depth7Frame14}>
                <div className={styles.depth8Frame04}>
                  <b className={styles.visaAssistance}>Visa Assistance</b>
                </div>
                <div className={styles.depth7Frame1}>
                  <div className={styles.exploreLushTea}>Fast and reliable visa processing</div>
                </div>
              </div>
            </div>

            <div className={styles.depth6Frame04}>
              <img className={styles.depth7Frame05} alt="Travel Planner" src="/Figma_photoes/tp.svg" />
              <div className={styles.depth7Frame14}>
                <div className={styles.depth8Frame04}>
                  <b className={styles.visaAssistance}>Travel Planner</b>
                </div>
                <div className={styles.depth7Frame1}>
                  <div className={styles.exploreLushTea}>Customize your perfect trip</div>
                </div>
              </div>
            </div>

            <div className={styles.depth6Frame04}>
              <img className={styles.depth7Frame05} alt="Emergency Support" src="/Figma_photoes/em.svg" />
              <div className={styles.depth7Frame14}>
                <div className={styles.depth8Frame04}>
                  <b className={styles.visaAssistance}>Emergency Support</b>
                </div>
                <div className={styles.depth7Frame1}>
                  <div className={styles.exploreLushTea}>24/7 assistance during your travels</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  )
}

export default HomePage
