import { FunctionComponent, useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Packages.module.css';
import Layout from '../App/Layout';

const FILTER_OPTIONS = {
  Destination: ['All', 'Sundarbans', "Cox's Bazar", 'Sylhet', 'Dhaka', 'Bandarban', "St. Martin's Island"],
  Duration: ['All', '1-3 days', '4-7 days', '8+ days'],
  Budget: ['All', '<$200', '$200-$300', '$300+'],
  Activity: ['All', 'Wildlife', 'Beach', 'Trekking', 'Culture', 'Adventure'],
};

type FilterKey = keyof typeof FILTER_OPTIONS;

const PACKAGES = [
  {
    name: 'Sundarbans Wildlife Expedition',
    image: '/Figma_photoes/sundarban.jpg',
    description: "Explore the world's largest mangrove forest, home to the Royal Bengal Tiger.",
    price: '$250/person',
    destination: 'Sundarbans',
  },
  {
    name: "Cox's Bazar Beach Retreat",
    image: '/Figma_photoes/coxsbazar.jpg',
    description: "Relax on the world's longest natural sea beach with golden sands.",
    price: '$150/person',
    destination: "Cox's Bazar",
  },
  {
    name: 'Sylhet Tea Garden & Hill Trek',
    image: '/Figma_photoes/srimangal.png',
    description: 'Discover lush tea gardens, rolling hills, and indigenous tribal cultures.',
    price: '$300/person',
    destination: 'Sylhet',
  },
  {
    name: 'Dhaka Historical & Cultural Tour',
    image: '/Figma_photoes/dh-hs.jpg',
    description: "Immerse yourself in the rich history and vibrant culture of Bangladesh's capital.",
    price: '$200/person',
    destination: 'Dhaka',
  },
  {
    name: 'Chittagong Hill Tracts Adventure',
    image: '/Figma_photoes/bandorban.jpg',
    description: 'Embark on an adventurous journey through breathtaking landscapes and remote villages.',
    price: '$350/person',
    destination: 'Bandarban',
  },
  {
    name: "St. Martin's Island Escape",
    image: '/Figma_photoes/Saint-Martin.jpg',
    description: "Unwind on the only coral island of Bangladesh, surrounded by crystal-clear waters.",
    price: '$180/person',
    destination: "St. Martin's Island",
  },
];

const Packages: FunctionComponent = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [openFilter, setOpenFilter] = useState<FilterKey | null>(null);
  const [selectedFilters, setSelectedFilters] = useState<{ [key in FilterKey]?: string }>({});
  const filterDropdownRef = useRef<HTMLDivElement>(null);

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
  const filteredPackages = PACKAGES.filter(pkg => {
    const matchesSearch = pkg.name.toLowerCase().includes(search.toLowerCase()) ||
      pkg.destination.toLowerCase().includes(search.toLowerCase());
    const matchesFilters = Object.entries(selectedFilters).every(([filter, value]) => {
      if (filter === 'Destination') return pkg.destination === value;
      // Add more filter logic as needed
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
                              className={styles.depth6Frame03}
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
                          {filteredPackages.map(pkg => (
                            <div
                              className={styles.depth6Frame07}
                              key={pkg.name}
                              onClick={() => navigate(`/packages/${encodeURIComponent(pkg.name)}`)}
                              style={{ cursor: 'pointer' }}
                            >
                              <img className={styles.depth7Frame01} alt="" src={pkg.image} />
                              <div className={styles.depth7Frame11}>
                                <div className={styles.depth7Frame11}>
                                  <div className={styles.sundarbansWildlifeExpedition}>{pkg.name}</div>
                                </div>
                                <div className={styles.depth8Frame1}>
                                  <div className={styles.exploreTheWorlds}>{pkg.description}</div>
                                </div>
                                <div className={styles.cardPrice}>{pkg.price}</div>
                                <button
                                  className={styles.bookButton}
                                  onClick={e => { e.stopPropagation(); alert(`Booking for ${pkg.name}`); }}
                                  type="button"
                                >
                                  Book Now
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                        {/* St. Martin's Island Escape is already included above */}
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
