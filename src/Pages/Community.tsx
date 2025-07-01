"use client"

import type React from "react"
import { useState, useEffect, useCallback } from "react"
import { useNavigate } from "react-router-dom"
import Layout from "../App/Layout"
import Sidebar from "./Sidebar"
import { useAuth } from "../Authentication/auth-context"
import styles from "../Styles/Community.module.css"
import { communityAPI, type BlogPost, type TravelGroup, type CommunitySearchResults } from "../App/api"

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
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<CommunitySearchResults | null>(null)

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
      const data = await communityAPI.getBlogs(1, 12) // Get first 12 blogs
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
      const data = await communityAPI.getGroups(1, 20) // Get first 20 groups
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
    } catch (error) {
      console.error("Error fetching user groups:", error)
      // Don't show error for user groups as it's not critical
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
        }

        // Show success message (you can replace with a toast notification)
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

  // Determine which content to show
  const displayBlogs = searchResults ? searchResults.blogs : blogs
  const displayGroups = searchResults ? searchResults.groups : allGroups
  const suggestedGroups = displayGroups.filter((group) => !group.is_member)

  return (
    <Layout>
      <div style={{ display: "flex" }}>
        <Sidebar />
        <div style={{ flex: 1 }}>
          <div className={styles.communityModernWrapper}>
            <div className={styles.communityModernContentWide}>
              {/* Hero Section */}
              <section className={styles.heroSection}>
                <h1 className={styles.communityTitle}>
                  <span role="img" aria-label="community" style={{ fontSize: 36, marginRight: 10 }}>
                    🌍
                  </span>
                  Community
                </h1>
                <p className={styles.communitySubtitle}>Connect, share, and explore the world together.</p>
                <div className={styles.searchBarWrapper}>
                  <input
                    className={styles.searchBarResponsive}
                    type="text"
                    placeholder="Search travel blogs, groups, or discussions..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  {isSearching && <div className={styles.searchSpinner}>🔍</div>}
                </div>
                {searchError && <div className={styles.errorMessage}>{searchError}</div>}
              </section>

              {/* Your Groups */}
              <section className={styles.section}>
                <h2 className={styles.sectionTitle}>
                  <span role="img" aria-label="group">
                    👥
                  </span>{" "}
                  Your Groups
                </h2>
                {isLoadingUserGroups ? (
                  <div className={styles.loadingSpinner}>Loading your groups...</div>
                ) : userGroups.length === 0 ? (
                  <div className={styles.emptyState}>
                    <p>You haven't joined any groups yet.</p>
                    <button
                      className={styles.ctaButton}
                      onClick={() =>
                        document.getElementById("suggested-groups")?.scrollIntoView({ behavior: "smooth" })
                      }
                    >
                      Explore Groups
                    </button>
                  </div>
                ) : (
                  <div className={styles.groupsGrid}>
                    {userGroups.map((group) => (
                      <div key={group.id} className={styles.groupCard}>
                        <img
                          src={group.image || "/placeholder.svg?height=176&width=200"}
                          alt={group.name}
                          className={styles.groupImage}
                        />
                        <div className={styles.groupInfo}>
                          <div className={styles.groupName}>{group.name}</div>
                          <div className={styles.groupDesc}>{group.description}</div>
                          <div className={styles.groupMembers}>{group.member_count.toLocaleString()} members</div>
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
                )}
              </section>

              {/* Suggested Groups */}
              <section className={styles.section} id="suggested-groups">
                <h2 className={styles.sectionTitle}>
                  <span role="img" aria-label="suggested">
                    🌟
                  </span>{" "}
                  Suggested Groups
                </h2>
                {isLoadingGroups ? (
                  <div className={styles.loadingSpinner}>Loading suggested groups...</div>
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
                          <div className={styles.groupMembers}>{group.member_count.toLocaleString()} members</div>
                          <button
                            className={`${styles.joinButton} ${styles.responsiveButton}`}
                            onClick={() => handleGroupJoin(group.id)}
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
                    {displayBlogs.map((blog) => (
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
              </section>

              {/* Search Results Summary */}
              {searchResults && (
                <section className={styles.section}>
                  <div className={styles.searchSummary}>
                    Found {searchResults.total_results} results for "{searchQuery}"
                  </div>
                </section>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Community
