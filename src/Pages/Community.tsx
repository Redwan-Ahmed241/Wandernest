import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from 'react-router-dom';
import Layout from '../App/Layout';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import { useAuth } from '../Authentication/auth-context';
import styles from "../Styles/Community.module.css";

// Types
interface BlogPost {
  id: string;
  title: string;
  author: string;
  date: string;
  image: string;
  excerpt?: string;
}

interface TravelGroup {
  id: string;
  name: string;
  description: string;
  image: string;
  memberCount: number;
}

// Example images for groups and blogs
const groupIcons = [
  '/Figma_photoes/wandernest.svg',
  '/Figma_photoes/ifty.jpg',
  '/Figma_photoes/cox.jpg',
  '/Figma_photoes/NE.jpeg',
  '/Figma_photoes/bandarban.jpg',
];
const blogAvatars = [
  '/Figma_photoes/ifty_bro_2-modified_reduced.png',
  '/Figma_photoes/ifty.jpg',
  '/Figma_photoes/ab tahi_bro-modified-reduced.png',
  '/Figma_photoes/onu.png',
  '/Figma_photoes/NE.jpeg',
  '/Figma_photoes/nadir.jpg',
];

// Mock Data (Replace with your actual API calls)
const mockBlogs: BlogPost[] = [
  { id: "1", title: "Exploring the Hills", author: "Nazim", date: "2023-01-15", image: "/Figma_photoes/bandorban.jpg" },
  { id: "2", title: "A thrilling Journey in Ratargul swamp forest", author: "Yuki", date: "2023-02-10", image: "/Figma_photoes/blog2.jpg" },
  { id: "3", title: "Adventures in Sundarban", author: "Omar", date: "2023-03-05", image: "/Figma_photoes/blog3.jpg" },
  { id: "4", title: "Hidden Gems of Netrokona", author: "Maria", date: "2023-04-20", image: "/Figma_photoes/blog4.jpg" },
  { id: "5", title: "Island Hopping at St.Martin", author: "Lea", date: "2023-05-12", image: "/placeholder.svg?height=99&width=176" },
  { id: "6", title: "A Road Trip to Panchagarh", author: "Chris", date: "2023-06-08", image: "/placeholder.svg?height=99&width=176" },
];

const allGroups: TravelGroup[] = [
  { id: "1", name: "Adventure Seekers", description: "Explore thrilling adventures.", image: "/placeholder.svg?height=176&width=200", memberCount: 1250 },
  { id: "2", name: "Cultural Enthusiasts", description: "Discover cultural treasures.", image: "/placeholder.svg?height=176&width=200", memberCount: 890 },
  { id: "3", name: "Food Lovers", description: "Savor local delicious cuisines.", image: "/Figma_photoes/loo.png", memberCount: 2100 },
  { id: "4", name: "Nature Explorers", description: "Connect with nature lovers.", image: "/placeholder.svg?height=176&width=200", memberCount: 1680 },
  { id: "5", name: "Travel Photography", description: "Share photography tips.", image: "/placeholder.svg?height=176&width=200", memberCount: 950 },
];

// API Simulation Functions
const simulateApiCall = (data: any, delay = 500) => new Promise(resolve => setTimeout(() => resolve(data), delay));
const fetchBlogs = () => simulateApiCall(mockBlogs, 300);
const fetchGroups = () => simulateApiCall(allGroups, 400);
const joinGroup = (groupId: string) => simulateApiCall({ success: true, message: `Joined group ${groupId}` }, 500);
const searchContent = (query: string) => {
  const results = {
    blogs: mockBlogs.filter(blog => blog.title.toLowerCase().includes(query.toLowerCase()) || blog.author.toLowerCase().includes(query.toLowerCase())),
    groups: allGroups.filter(group => group.name.toLowerCase().includes(query.toLowerCase()) || group.description.toLowerCase().includes(query.toLowerCase())),
  };
  return simulateApiCall(results, 300);
};

// Debounce hook
function useDebounce(value: string, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debouncedValue;
}

// ProtectedRoute wrapper
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate('/login', { replace: true });
    }
  }, [isAuthenticated, loading, navigate]);
  if (loading || !isAuthenticated) {
    return <div style={{ padding: 40, textAlign: 'center' }}>Loading...</div>;
  }
  return <>{children}</>;
};

const Community: React.FC = () => {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [groups, setGroups] = useState<TravelGroup[]>([]);
  const [joinedGroups, setJoinedGroups] = useState<Set<string>>(new Set(["1", "3"])); // Mock: user joined group 1 and 3
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any>(null);
  const navigate = useNavigate();

  const debouncedSearch = useDebounce(searchQuery, 300);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [blogsData, groupsData] = await Promise.all([fetchBlogs(), fetchGroups()]);
        setBlogs(blogsData as BlogPost[]);
        setGroups(groupsData as TravelGroup[]);
      } catch (err) {
        setError("Failed to load community data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const onBlogClick = useCallback((blogId: string) => {
    // Replace with navigation logic
    alert(`Opening blog: ${blogs.find((b) => b.id === blogId)?.title}`);
  }, [blogs]);

  const onGroupJoin = useCallback(async (groupId: string) => {
    try {
      await joinGroup(groupId);
      const groupName = groups.find((g) => g.id === groupId)?.name;
      alert(`Successfully joined ${groupName}!`);
      setGroups(prev => prev.map(group => group.id === groupId ? { ...group, memberCount: group.memberCount + 1 } : group));
      setJoinedGroups(prev => {
        const updated = new Set(prev);
        updated.add(groupId);
        return updated;
      });
    } catch (error) {
      alert("Failed to join group. Please try again.");
    }
  }, [groups]);

  // Automatic search effect
  useEffect(() => {
    if (!debouncedSearch.trim()) {
      setSearchResults(null);
      return;
    }
    let cancelled = false;
    searchContent(debouncedSearch).then(results => {
      if (!cancelled) setSearchResults(results);
    });
    return () => { cancelled = true; };
  }, [debouncedSearch]);

  if (loading) {
    return <div style={{ padding: 40, textAlign: 'center' }}>Loading community data...</div>;
  }
  if (error) {
    return <div style={{ padding: 40, textAlign: 'center', color: 'red' }}>{error}</div>;
  }

  // Determine which blogs and groups to show
  const displayBlogs = searchResults ? searchResults.blogs : blogs;
  const displayGroups = searchResults ? searchResults.groups : groups;
  const joined = displayGroups.filter((g: TravelGroup) => joinedGroups.has(g.id));
  const suggestions = displayGroups.filter((g: TravelGroup) => !joinedGroups.has(g.id));

  return (
    <ProtectedRoute>
      <Navbar />
      <div className={styles.communityModernWrapper}>
        <div className={styles.communityModernContentWide}>
          {/* Hero Section */}
          <section className={styles.heroSection}>
            <h1 className={styles.communityTitle}>
              <span role="img" aria-label="community" style={{fontSize:36, marginRight:10}}>🌍</span>
              Community
            </h1>
            <p className={styles.communitySubtitle}>Connect, share, and explore the world together.</p>
            <div className={styles.searchBarWrapper}>
              <input
                className={styles.searchBarResponsive}
                type="text"
                placeholder="Search travel blogs, groups, or discussions..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
            </div>
          </section>

          {/* Joined Groups */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}><span role="img" aria-label="group">👥</span> Your Groups</h2>
            {joined.length === 0 ? (
              <div style={{ color: '#888', marginBottom: 16 }}>You haven't joined any groups yet.</div>
            ) : (
              <div className={styles.groupsGrid}>
                {joined.map((group: TravelGroup, i: number) => (
                  <div key={group.id} className={styles.groupCard}>
                    <img src={group.image} alt={group.name} className={styles.groupImage} />
                    <div className={styles.groupInfo}>
                      <div className={styles.groupName}>{group.name}</div>
                      <div className={styles.groupDesc}>{group.description}</div>
                      <div className={styles.groupMembers}>{group.memberCount} members</div>
                      <button
                        className={`${styles.joinButton} ${styles.responsiveButton}`}
                        onClick={() => navigate(`/groups/${group.id}`)}
                      >
                        View
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Suggested Groups */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}><span role="img" aria-label="suggested">🌟</span> Suggested Groups</h2>
            {suggestions.length === 0 ? (
              <div style={{ color: '#888', marginBottom: 16 }}>No suggestions at the moment.</div>
            ) : (
              <div className={styles.groupsGrid}>
                {suggestions.map((group: TravelGroup, i: number) => (
                  <div key={group.id} className={styles.groupCard}>
                    <img src={group.image} alt={group.name} className={styles.groupImage} />
                    <div className={styles.groupInfo}>
                      <div className={styles.groupName}>{group.name}</div>
                      <div className={styles.groupDesc}>{group.description}</div>
                      <div className={styles.groupMembers}>{group.memberCount} members</div>
                      <button
                        className={`${styles.joinButton} ${styles.responsiveButton}`}
                        onClick={() => onGroupJoin(group.id)}
                      >
                        Join
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Latest Travel Blogs */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}><span role="img" aria-label="blog">📝</span> Latest Travel Blogs</h2>
            <div className={styles.blogsGrid}>
              {displayBlogs.map((blog: BlogPost, i: number) => (
                <div key={blog.id} className={styles.blogCard} onClick={() => onBlogClick(blog.id)}>
                  <img src={blog.image} alt={blog.title} className={styles.blogImage} />
                  <div className={styles.blogInfo}>
                    <div style={{display:'flex', alignItems:'center', marginBottom:4}}>
                      <img src={blogAvatars[i % blogAvatars.length]} alt="author" style={{width:28, height:28, borderRadius:'50%', marginRight:8, border:'2px solid #abb79b'}} />
                      <div className={styles.blogTitle}>{blog.title}</div>
                    </div>
                    <div className={styles.blogMeta}>By {blog.author} | {blog.date}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </ProtectedRoute>
  );
};

export default Community;
