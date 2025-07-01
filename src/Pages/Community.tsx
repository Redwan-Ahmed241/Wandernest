"use client"

import type React from "react"
import { useState, useEffect, useCallback } from "react"
import { useNavigate } from "react-router-dom"
import Layout from "../App/Layout"
import Sidebar from "./Sidebar"
import { useAuth } from "../Authentication/auth-context"
import styles from "../Styles/Community.module.css"
import { communityAPI, type BlogPost, type TravelGroup, type CommunitySearchResults } from "../App/api"

// Additional types for reviews/discussions
interface Review {
  id: string
  user: {
    name: string
    avatar: string
  }
  date: string
  rating: number
  content: string
  likes: number
  comments: number
}

// Mock reviews data (you can replace with real API later)
const mockReviews: Review[] = [
  {
    id: "1",
    user: {
      name: "Sophia",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    date: "2023-01-14",
    rating: 5,
    content: "The CHT were breathtaking! Highly recommend visiting in winter.",
    likes: 12,
    comments: 3,
  },
  {
    id: "2",
    user: {
      name: "Liam",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    date: "2023-02-22",
    rating: 5,
    content: "Loved the food in Khulna! The Chijhaal was unforgettable.",
    likes: 8,
    comments: 1,
  },
  {
    id: "3",
    user: {
      name: "Aiko",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    date: "2023-03-18",
    rating: 5,
    content: "Netrokona's Birishiri lakes is a must-visit for adventure lovers.",
    likes: 15,
    comments: 2,
  },
]

// Debounce hook
function useDebounce(value: string, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value)
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay)
    return () => clearTimeout(handler)
  }, [value, delay])
  return debouncedValue
}

const Community: React.FC = () => {
  const navigate = useNavigate()
  const { isAuthenticated, loading: authLoading, user } = useAuth()

  // State management
  const [blogs, setBlogs] = useState<BlogPost[]>([])
  const [allGroups, setAllGroups] = useState<TravelGroup[]>([])
  const [userGroups, setUserGroups] = useState<TravelGroup[]>([])
  const [reviews, setReviews] = useState<Review[]>(mockReviews)
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<CommunitySearchResults | null>(null)
  const [joinedGroups, setJoinedGroups] = useState<Set<string>>(new Set())

  // Loading states
  const [isLoadingBlogs, setIsLoadingBlogs] = useState(true)
  const [isLoadingGroups, setIsLoadingGroups] = useState(true)
  const [isLoadingUserGroups, setIsLoadingUserGroups] = useState(true)
  const [isSearching, setIsSearching] = useState(false)

  // Error states
  const [blogsError, setBlogsError] = useState<string | null>(null)
  const [groupsError, setGroupsError] = useState<string | null>(null)
  const [searchError, setSearchError] = useState<string | null>(null)

  const debouncedSearch = useDebounce(searchQuery, 300)

  // Fetch initial data
  useEffect(() => {
    if (!authLoading && isAuthenticated) {
      fetchBlogs()
      fetchGroups()
      fetchUserGroups()
    }
  }, [authLoading, isAuthenticated])

  // Search effect
  useEffect(() => {
    if (!debouncedSearch.trim()) {
      setSearchResults(null)
      setSearchError(null)
      return
    }

    const performSearch = async () => {
      try {
        setIsSearching(true)
        setSearchError(null)
        const results = await communityAPI.searchCommunity(debouncedSearch)
        setSearchResults(results)
      } catch (error) {
        console.error("Search error:", error)
        setSearchError("Failed to search community content")
      } finally {
        setIsSearching(false)
      }
    }

    performSearch()
  }, [debouncedSearch])

  const fetchBlogs = async () => {
    try {
      setIsLoadingBlogs(true)
      setBlogsError(null)
      const data = await communityAPI.getBlogs(1, 12)
      setBlogs(data.results || data)
    } catch (error) {
      console.error("Error fetching blogs:", error)
      setBlogsError("Failed to load travel blogs")
    } finally {
      setIsLoadingBlogs(false)
    }
  }

  const fetchGroups = async () => {
    try {
      setIsLoadingGroups(true)
      setGroupsError(null)
      const data = await communityAPI.getGroups(1, 20)
      setAllGroups(data.results || data)
    } catch (error) {
      console.error("Error fetching groups:", error)
      setGroupsError("Failed to load travel groups")
    } finally {
      setIsLoadingGroups(false)
    }
  }

  const fetchUserGroups = async () => {
    try {
      setIsLoadingUserGroups(true)
      const data = await communityAPI.getUserGroups()
      setUserGroups(data.results || data)
      // Update joined groups set
      const joinedIds = new Set((data.results || data).map((group: TravelGroup) => group.id))
      setJoinedGroups(joinedIds)
    } catch (error) {
      console.error("Error fetching user groups:", error)
    } finally {
      setIsLoadingUserGroups(false)
    }
  }

  const handleBlogClick = useCallback(
    (blogId: string) => {
      navigate(`/community/blog/${blogId}`)
    },
    [navigate],
  )

  const handleGroupJoin = useCallback(
    async (groupId: string) => {
      try {
        await communityAPI.joinGroup(groupId)

        // Update local state
        const joinedGroup = allGroups.find((g) => g.id === groupId)
        if (joinedGroup) {
          setUserGroups((prev) => [...prev, { ...joinedGroup, is_member: true }])
          setAllGroups((prev) =>
            prev.map((group) =>
              group.id === groupId ? { ...group, member_count: group.member_count + 1, is_member: true } : group,
            ),
          )
          setJoinedGroups((prev) => new Set([...prev, groupId]))
        }

        // Show success message
        alert(`Successfully joined ${joinedGroup?.name}!`)
      } catch (error) {
        console.error("Error joining group:", error)
        alert("Failed to join group. Please try again.")
      }
    },
    [allGroups],
  )

  const handleGroupView = useCallback(
    (groupId: string) => {
      navigate(`/community/group/${groupId}`)
    },
    [navigate],
  )

  const handleLikeReview = useCallback((reviewId: string) => {
    setReviews((prev) =>
      prev.map((review) => (review.id === reviewId ? { ...review, likes: review.likes + 1 } : review)),
    )
  }, [])

  const handleSearchKeyPress = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      // Search is handled automatically by debounced effect
    }
  }, [])

  // Show loading while auth is loading
  if (authLoading) {
    return (
      <Layout>
        <div style={{ display: "flex" }}>
          <Sidebar />
          <div style={{ flex: 1, padding: "40px", textAlign: "center" }}>
            <div>Loading...</div>
          </div>
        </div>
      </Layout>
    )
  }

  // Redirect if not authenticated
  if (!isAuthenticated) {
    navigate("/login")
    return null
  }

  // Loading state
  if (isLoadingBlogs && isLoadingGroups) {
    return (
      <Layout>
        <div style={{ display: "flex" }}>
          <Sidebar />
          <div className={styles.community}>
            <div className={styles.communityWrapper}>
              <div className={styles.loadingSpinner}>Loading community data...</div>
            </div>
          </div>
        </div>
      </Layout>
    )
  }

  // Determine which content to show
  const displayBlogs = searchResults ? searchResults.blogs : blogs
  const displayGroups = searchResults ? searchResults.groups : allGroups
  const suggestedGroups = displayGroups.filter((group) => !group.is_member)

  return (
    <Layout>
      <div style={{ display: "flex" }}>
        <Sidebar />
        <div className={styles.community}>
          <div className={styles.communityWrapper}>
            <div className={styles.community1}>
              <div className={styles.depth0Frame0}>
                <div className={styles.depth1Frame0}>
                  <div className={styles.depth2Frame1}>
                    <div className={styles.depth3Frame02}>
                      {/* Hero Section with Modern Styling */}
                      <div className={styles.heroSection}>
                        <div className={styles.depth4Frame02}>
                          <div className={styles.depth5Frame03}>
                            <div className={styles.depth6Frame02}>
                              <div className={styles.communityTitle}>
                                <span role="img" aria-label="community" style={{ fontSize: 36, marginRight: 10 }}>
                                  🌍
                                </span>
                                Community
                              </div>
                            </div>
                            <div className={styles.depth6Frame11}>
                              <div className={styles.communitySubtitle}>
                                Connect, share, and explore the world together.
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Enhanced Search Section */}
                        <div className={styles.searchBarWrapper}>
                          <input
                            className={styles.searchBarResponsive}
                            type="text"
                            placeholder="Search travel blogs, groups, or discussions..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyPress={handleSearchKeyPress}
                          />
                          {isSearching && <div className={styles.searchSpinner}>🔍</div>}
                        </div>
                        {searchError && <div className={styles.errorMessage}>{searchError}</div>}
                      </div>

                      {/* Latest Travel Blogs */}
                      <div className={styles.section}>
                        <h2 className={styles.sectionTitle}>
                          <span role="img" aria-label="blog">
                            📝
                          </span>{" "}
                          Latest Travel Blogs
                        </h2>
                        {isLoadingBlogs ? (
                          <div className={styles.loadingSpinner}>Loading travel blogs...</div>
                        ) : blogsError ? (
                          <div className={styles.errorMessage}>
                            {blogsError}
                            <button onClick={fetchBlogs} className={styles.retryButton}>
                              Try Again
                            </button>
                          </div>
                        ) : displayBlogs.length === 0 ? (
                          <div className={styles.emptyState}>
                            <p>No travel blogs found.</p>
                          </div>
                        ) : (
                          <div className={styles.blogsGrid}>
                            {displayBlogs.slice(0, 6).map((blog) => (
                              <div key={blog.id} className={styles.blogCard} onClick={() => handleBlogClick(blog.id)}>
                                <img
                                  src={blog.image || "/placeholder.svg?height=99&width=176"}
                                  alt={blog.title}
                                  className={styles.blogImage}
                                />
                                <div className={styles.blogInfo}>
                                  <div style={{ display: "flex", alignItems: "center", marginBottom: 4 }}>
                                    <img
                                      src={blog.author.profile_image || "/placeholder.svg?height=28&width=28"}
                                      alt="author"
                                      style={{
                                        width: 28,
                                        height: 28,
                                        borderRadius: "50%",
                                        marginRight: 8,
                                        border: "2px solid #abb79b",
                                      }}
                                    />
                                    <div className={styles.blogTitle}>{blog.title}</div>
                                  </div>
                                  <div className={styles.blogMeta}>
                                    By {blog.author.first_name} {blog.author.last_name} |{" "}
                                    {new Date(blog.created_at).toLocaleDateString()}
                                  </div>
                                  {blog.excerpt && <div className={styles.blogExcerpt}>{blog.excerpt}</div>}
                                  <div className={styles.blogStats}>
                                    <span>❤️ {blog.likes_count}</span>
                                    <span>💬 {blog.comments_count}</span>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Join Travel Groups */}
                      <div className={styles.section}>
                        <h2 className={styles.sectionTitle}>
                          <span role="img" aria-label="group">
                            👥
                          </span>{" "}
                          Join Travel Groups
                        </h2>
                        {isLoadingGroups ? (
                          <div className={styles.loadingSpinner}>Loading travel groups...</div>
                        ) : groupsError ? (
                          <div className={styles.errorMessage}>
                            {groupsError}
                            <button onClick={fetchGroups} className={styles.retryButton}>
                              Try Again
                            </button>
                          </div>
                        ) : suggestedGroups.length === 0 ? (
                          <div className={styles.emptyState}>
                            <p>No group suggestions at the moment.</p>
                          </div>
                        ) : (
                          <div className={styles.groupsGrid}>
                            {suggestedGroups.slice(0, 8).map((group) => (
                              <div key={group.id} className={styles.groupCard}>
                                <img
                                  src={group.image || "/placeholder.svg?height=176&width=200"}
                                  alt={group.name}
                                  className={styles.groupImage}
                                />
                                <div className={styles.groupInfo}>
                                  <div className={styles.groupName}>{group.name}</div>
                                  <div className={styles.groupDesc}>{group.description}</div>
                                  <div className={styles.groupMembers}>
                                    {group.member_count.toLocaleString()} members
                                  </div>
                                  <button
                                    className={`${styles.joinButton} ${styles.responsiveButton}`}
                                    onClick={() => handleGroupJoin(group.id)}
                                    disabled={joinedGroups.has(group.id)}
                                  >
                                    {joinedGroups.has(group.id) ? "Joined" : "Join"}
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Your Groups */}
                      {userGroups.length > 0 && (
                        <div className={styles.section}>
                          <h2 className={styles.sectionTitle}>
                            <span role="img" aria-label="your-groups">
                              🏠
                            </span>{" "}
                            Your Groups
                          </h2>
                          <div className={styles.groupsGrid}>
                            {userGroups.slice(0, 4).map((group) => (
                              <div key={group.id} className={styles.groupCard}>
                                <img
                                  src={group.image || "/placeholder.svg?height=176&width=200"}
                                  alt={group.name}
                                  className={styles.groupImage}
                                />
                                <div className={styles.groupInfo}>
                                  <div className={styles.groupName}>{group.name}</div>
                                  <div className={styles.groupDesc}>{group.description}</div>
                                  <div className={styles.groupMembers}>
                                    {group.member_count.toLocaleString()} members
                                  </div>
                                  <button
                                    className={`${styles.joinButton} ${styles.responsiveButton}`}
                                    onClick={() => handleGroupView(group.id)}
                                  >
                                    View
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Discussions & Reviews */}
                      <div className={styles.section}>
                        <h2 className={styles.sectionTitle}>
                          <span role="img" aria-label="discussions">
                            💬
                          </span>{" "}
                          Discussions & Reviews
                        </h2>
                        <div className={styles.reviewsContainer}>
                          {reviews.map((review) => (
                            <div key={review.id} className={styles.reviewCard}>
                              <div className={styles.reviewHeader}>
                                <img
                                  src={review.user.avatar || "/placeholder.svg?height=40&width=40"}
                                  alt={review.user.name}
                                  className={styles.reviewAvatar}
                                />
                                <div className={styles.reviewUserInfo}>
                                  <div className={styles.reviewUserName}>{review.user.name}</div>
                                  <div className={styles.reviewDate}>{new Date(review.date).toLocaleDateString()}</div>
                                </div>
                              </div>
                              <div className={styles.reviewRating}>
                                {Array.from({ length: 5 }).map((_, i) => (
                                  <span key={i} className={i < review.rating ? styles.starFilled : styles.starEmpty}>
                                    ⭐
                                  </span>
                                ))}
                              </div>
                              <div className={styles.reviewContent}>{review.content}</div>
                              <div className={styles.reviewActions}>
                                <button className={styles.reviewAction} onClick={() => handleLikeReview(review.id)}>
                                  ❤️ {review.likes}
                                </button>
                                {review.comments > 0 && (
                                  <button className={styles.reviewAction}>💬 {review.comments}</button>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Search Results Summary */}
                      {searchResults && (
                        <div className={styles.section}>
                          <div className={styles.searchSummary}>
                            Found {searchResults.total_results} results for "{searchQuery}"
                          </div>
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
    </Layout>
  )
}

export default Community
