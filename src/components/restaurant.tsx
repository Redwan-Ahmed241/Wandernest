import React, { FunctionComponent, useCallback, useState } from 'react';
import { useNavigate } from "react-router-dom";
import styles from './restaurant.module.css';
import Layout from './Layout';

const FILTERS = [
  { label: 'Popular', value: 'popular' },
  { label: 'Highest Rated', value: 'highest' },
  { label: 'Newest', value: 'newest' },
  { label: 'Budget-friendly', value: 'budget' },
  { label: 'Fast Delivery', value: 'fast' },
  { label: 'Halal', value: 'halal' },
];

const Restaurant:FunctionComponent = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('popular');
  // Optionally, add filter state if you want dropdowns like Packages
  // const [openFilter, setOpenFilter] = useState<string | null>(null);
  // const [selectedFilters, setSelectedFilters] = useState<{ [key: string]: string }>({});

  // Dummy restaurant data for filtering (replace with your real data)
  const restaurants = [
    {
      name: 'NORTH END coffee',
      location: 'Shahajadpur, Dhaka',
      image: '/Figma_photoes/NE.jpeg',
      rating: '4.8★ (1,200+ reviews)',
      cuisine: 'Bengali cuisine',
      tags: ['popular', 'highest', 'halal'],
    },
    {
      name: 'Mezzan Haile Aaiun',
      location: 'Chittagong',
      image: '/Figma_photoes/local_cuisine.jpeg',
      rating: '4.7★ (950+ reviews)',
      cuisine: 'Traditional Bangladeshi dishes',
      tags: ['popular', 'budget', 'halal'],
    },
    {
      name: 'Panshi Restaurant',
      location: 'Sylhet',
      image: '/Figma_photoes/tandoori-chicken.jpg',
      rating: '4.6★ (800+ reviews)',
      cuisine: 'Sylheti specialties',
      tags: ['popular', 'newest', 'halal'],
    },
    {
      name: 'Sultans Dine',
      location: 'Gulshan 2',
      image: '/Figma_photoes/s-dine.png',
      rating: '4.9★ (1,500+ reviews)',
      cuisine: 'Biryani and kebabs',
      tags: ['highest', 'fast', 'halal'],
    },
    {
      name: 'Kamrul Hotel',
      location: 'Khulna',
      image: '/Figma_photoes/hqdefault.jpg',
      rating: '4.5★ (700+ reviews)',
      cuisine: 'Orginal Chuijhaal flavors',
      tags: ['budget', 'halal'],
    },
    {
      name: 'Kacchi Vai',
      location: 'Narayanganj',
      image: '/Figma_photoes/kacchi.jpeg',
      rating: '4.7★ (600+ reviews)',
      cuisine: 'Delicious Kacchi',
      tags: ['budget', 'fast', 'halal'],
    },
  ];

  // Filter restaurants by search and selected filter
  const filteredRestaurants = restaurants.filter(r =>
    (selectedFilter === 'popular' || r.tags.includes(selectedFilter)) &&
    (
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.location.toLowerCase().includes(search.toLowerCase()) ||
      r.cuisine.toLowerCase().includes(search.toLowerCase())
    )
  );

  const onDepth4FrameClick = useCallback(() => {
    // Add your code here
  }, []);
  
  return (
    <Layout>
      <div className={styles.restaurant}>
        <div className={styles.restaurants}>
          <div className={styles.depth0Frame0}>
            <div className={styles.depth1Frame0}>
              {/* Header/Title Row */}
              <div className={styles.groupParent}>
                <div className={styles.tourPackages2}>Top-Rated Eateries Across Bangladesh</div>
              </div>
              {/* Filter Buttons (now above search bar) */}
              <div className={styles.filterButtonsContainer}>
                {FILTERS.map(f => (
                  <button
                    key={f.value}
                    className={styles.filterButton + (selectedFilter === f.value ? ' ' + styles.selected : '')}
                    onClick={() => setSelectedFilter(f.value)}
                    type="button"
                  >
                    {f.label}
                  </button>
                ))}
              </div>
              {/* Search Bar */}
              <div className={styles.searchBarContainer}>
                <img
                  src="/Figma_photoes/search.svg"
                  alt="search"
                  className={styles.searchIconInside}
                />
                <input
                  type="text"
                  className={styles.searchInput}
                  placeholder="Search restaurants or cuisines"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
              </div>
              {/* Restaurant Cards Grid */}
              <div className={styles.depth5Frame04}>
                {filteredRestaurants.map(r => (
                  <div className={styles.depth6Frame09} key={r.name}>
                    <img className={styles.depth7Frame01} alt="" src={r.image} />
                    <div className={styles.depth1Frame0}>
                      <div className={styles.northEndCoffeeContainer}>
                        <p className={styles.northEndCoffee}>{r.name}</p>
                        <p className={styles.northEndCoffee}>({r.location})</p>
                      </div>
                      <div className={styles.depth8Frame1}>
                        <div className={styles.reviewsBengali}>{r.rating} · {r.cuisine}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Restaurant;
