import { FunctionComponent, useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../Styles/Packages.module.css';
import Layout from '../App/Layout';

const FILTER_OPTIONS = {
  Destination: ['All', 'Sundarbans', "Cox's Bazar", 'Srimangal', 'Rangamati', 'Bandarban'],
  Budget: ['All', '< 4000৳', '4000–6000৳', '6000+৳'],
};

type FilterKey = keyof typeof FILTER_OPTIONS;

interface Package {
  id: number;
  title: string;
  pic: string;
  price: string;
}

const Packages: FunctionComponent = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [openFilter, setOpenFilter] = useState<FilterKey | null>(null);
  const [selectedFilters, setSelectedFilters] = useState<{ [key in FilterKey]?: string }>({});
  const filterDropdownRef = useRef<HTMLDivElement>(null);
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch packages from API
  useEffect(() => {
    const fetchPackages = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await fetch('https://wander-nest-ad3s.onrender.com/api/packages/all/');
        const data = await response.json();
        setPackages(Array.isArray(data) ? data : []);
      } catch (err) {
        setError('Failed to fetch packages');
        setPackages([]);
      } finally {
        setLoading(false);
      }
    };
    fetchPackages();
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        filterDropdownRef.current &&
        !filterDropdownRef.current.contains(event.target as Node)
      ) {
        setOpenFilter(null);
      }
    }
    if (openFilter) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [openFilter]);

  const handleFilterClick = (filter: FilterKey) => {
    setOpenFilter(openFilter === filter ? null : filter);
  };

  const handleOptionSelect = (filter: FilterKey, option: string) => {
    if (option === 'All') {
      // Remove the filter for this category
      const { [filter]: _, ...rest } = selectedFilters;
      setSelectedFilters(rest);
    } else {
      setSelectedFilters({ ...selectedFilters, [filter]: option });
    }
    setOpenFilter(null);
  };

  // Filter packages by search and selected filters
  const filteredPackages = packages.filter(pkg => {
    const matchesSearch = pkg.title.toLowerCase().includes(search.toLowerCase());
    const matchesFilters = Object.entries(selectedFilters).every(([filter, value]) => {
      if (filter === 'Destination') {
        return pkg.title === value || value === 'All';
      }
      if (filter === 'Budget') {
        const price = Number(pkg.price);
        if (value === '< 4000৳') return price < 4000;
        if (value === '4000–6000৳') return price >= 4000 && price <= 6000;
        if (value === '6000+৳') return price > 6000;
        return true;
      }
      return true;
    });
    return matchesSearch && matchesFilters;
  });

  return (
    <Layout>
      <div className={styles.packages}>
        {/* Header Section: Flexbox for label and button */}
        <div className={styles.groupParent}>
          <div className={styles.tourPackages2}>Tour Packages</div>
          <button className={styles.createCustomPackage} onClick={() => navigate('/create-package')}>
            Create custom package
          </button>
        </div>
        {/* Search Bar: Centered below header */}
        <div className={styles.searchBarContainer}>
          <img
            src="/Figma_photoes/search.svg"
            alt="search"
            className={styles.searchIconInside}
          />
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Search destinations"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        {/* Filters and packages remain unchanged */}
        <div className={styles.tourPackagesWrapper}>
          <div className={styles.tourPackages}>
            <div className={styles.tourPackages1}>
              <div className={styles.depth0Frame0}>
                <div className={styles.depth1Frame0}>
                  <div className={styles.depth2Frame1}>
                    <div className={styles.depth3Frame01}>
                      <div className={styles.depth4Frame2} ref={filterDropdownRef}>
                        {Object.keys(FILTER_OPTIONS).map(filter => (
                          <div key={filter} className={styles.depth5Frame03}>
                            <div
                              className={
                                styles.depth6Frame03 +
                                (selectedFilters[filter as FilterKey] && selectedFilters[filter as FilterKey] !== 'All' ? ' ' + styles.selected : '')
                              }
                              onClick={() => handleFilterClick(filter as FilterKey)}
                              style={{ cursor: 'pointer', position: 'relative' }}
                            >
                              <div className={styles.destinations}>
                                {selectedFilters[filter as FilterKey] && selectedFilters[filter as FilterKey] !== 'All'
                                  ? selectedFilters[filter as FilterKey]
                                  : filter}
                              </div>
                              <img className={styles.depth6Frame1} alt="" src="/Figma_photoes/darrow.svg" />
                              {openFilter === (filter as FilterKey) && (
                                <div className={styles.filterDropdown}>
                                  {(FILTER_OPTIONS[filter as FilterKey] as string[]).map((option: string) => (
                                    <div
                                      key={option}
                                      className={
                                        styles.filterDropdownOption +
                                        (selectedFilters[filter as FilterKey] === option || (!selectedFilters[filter as FilterKey] && option === 'All') ? ' ' + styles.selected : '')
                                      }
                                      onClick={() => handleOptionSelect(filter as FilterKey, option)}
                                    >
                                      {option}
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className={styles.depth4Frame3}>
                        <div className={styles.depth5Frame04}>
                          {loading && (
                            <div style={{ textAlign: 'center', padding: '2rem', color: '#666' }}>
                              Loading packages...
                            </div>
                          )}
                          {error && (
                            <div style={{ textAlign: 'center', padding: '2rem', color: 'red' }}>
                              {error}
                            </div>
                          )}
                          {!loading && !error && filteredPackages.map(pkg => (
                            <div
                              className={styles.depth6Frame07}
                              key={pkg.id}
                              onClick={() => navigate(`/packages/${encodeURIComponent(pkg.title)}`)}
                              style={{ cursor: 'pointer' }}
                            >
                              <img className={styles.depth7Frame01} alt="" src={pkg.pic} />
                              <div className={styles.depth7Frame11}>
                                <div className={styles.depth7Frame11}>
                                  <div className={styles.sundarbansWildlifeExpedition}>{pkg.title}</div>
                                </div>
                                <div className={styles.depth8Frame1}>
                                  <div className={styles.exploreTheWorlds}>Experience the beauty of {pkg.title}</div>
                                </div>
                                <div className={styles.cardPrice}>৳{Number(pkg.price).toLocaleString()}</div>
                                <button
                                  className={styles.createCustomPackage}
                                  onClick={e => { e.stopPropagation(); alert(`Booking for ${pkg.title}`); }}
                                  type="button"
                                >
                                  Book Now
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                        {!loading && !error && filteredPackages.length === 0 && (
                          <div style={{ textAlign: 'center', padding: '2rem', color: '#666' }}>
                            No packages found matching your criteria.
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Packages;
