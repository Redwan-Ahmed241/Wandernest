"use client"

import type React from "react"

import { useState, useEffect, useCallback } from "react"
import styles from "./Community.module.css"

// Types
interface BlogPost {
  id: string
  title: string
  author: string
  date: string
  image: string
  excerpt?: string
}

interface TravelGroup {
  id: string
  name: string
  description: string
  image: string
  memberCount: number
}

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

// Mock Data (Replace with your actual API calls)
const mockBlogs: BlogPost[] = [
  {
    id: "1",
    title: "Exploring the Hills",
    author: "Nazim",
    date: "2023-01-15",
    image: "/placeholder.svg?height=99&width=176",
  },
  {
    id: "2",
    title: "A thrilling Journey in Ratargul swamp forest",
    author: "Yuki",
    date: "2023-02-10",
    image: "/placeholder.svg?height=99&width=176",
  },
  {
    id: "3",
    title: "Adventures in Sundarban",
    author: "Omar",
    date: "2023-03-05",
    image: "/placeholder.svg?height=99&width=176",
  },
  {
    id: "4",
    title: "Hidden Gems of Netrokona",
    author: "Maria",
    date: "2023-04-20",
    image: "/placeholder.svg?height=99&width=176",
  },
  {
    id: "5",
    title: "Island Hopping at St.Martin",
    author: "Lea",
    date: "2023-05-12",
    image: "/placeholder.svg?height=99&width=176",
  },
  {
    id: "6",
    title: "A Road Trip to Panchagarh",
    author: "Chris",
    date: "2023-06-08",
    image: "/placeholder.svg?height=99&width=176",
  },
]

const mockGroups: TravelGroup[] = [
  {
    id: "1",
    name: "Adventure Seekers",
    description: "Explore thrilling adventures.",
    image: "/placeholder.svg?height=176&width=200",
    memberCount: 1250,
  },
  {
    id: "2",
    name: "Cultural Enthusiasts",
    description: "Discover cultural treasures.",
    image: "/placeholder.svg?height=176&width=200",
    memberCount: 890,
  },
  {
    id: "3",
    name: "Food Lovers",
    description: "Savor local delicious cuisines.",
    image: "/placeholder.svg?height=176&width=200",
    memberCount: 2100,
  },
  {
    id: "4",
    name: "Nature Explorers",
    description: "Connect with nature lovers.",
    image: "/placeholder.svg?height=176&width=200",
    memberCount: 1680,
  },
  {
    id: "5",
    name: "Travel Photography",
    description: "Share photography tips.",
    image: "/placeholder.svg?height=176&width=200",
    memberCount: 950,
  },
]

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

// API Simulation Functions
const simulateApiCall = (data: any, delay = 500) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(data), delay)
  })
}

const fetchBlogs = () => simulateApiCall(mockBlogs, 300)
const fetchGroups = () => simulateApiCall(mockGroups, 400)
const fetchReviews = () => simulateApiCall(mockReviews, 200)

const joinGroup = (groupId: string) => {
  return simulateApiCall({ success: true, message: `Joined group ${groupId}` }, 500)
}

const searchContent = (query: string) => {
  const results = {
    blogs: mockBlogs.filter(
      (blog) =>
        blog.title.toLowerCase().includes(query.toLowerCase()) ||
        blog.author.toLowerCase().includes(query.toLowerCase()),
    ),
    groups: mockGroups.filter(
      (group) =>
        group.name.toLowerCase().includes(query.toLowerCase()) ||
        group.description.toLowerCase().includes(query.toLowerCase()),
    ),
    reviews: mockReviews.filter(
      (review) =>
        review.content.toLowerCase().includes(query.toLowerCase()) ||
        review.user.name.toLowerCase().includes(query.toLowerCase()),
    ),
  }
  return simulateApiCall(results, 300)
}

// Main Component
const Community = () => {
  const [blogs, setBlogs] = useState<BlogPost[]>([])
  const [groups, setGroups] = useState<TravelGroup[]>([])
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<any>(null)
  const [joinedGroups, setJoinedGroups] = useState<Set<string>>(new Set())

  // Fetch initial data
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true)
        const [blogsData, groupsData, reviewsData] = await Promise.all([fetchBlogs(), fetchGroups(), fetchReviews()])

        setBlogs(blogsData as BlogPost[])
        setGroups(groupsData as TravelGroup[])
        setReviews(reviewsData as Review[])
      } catch (err) {
        setError("Failed to load community data")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  // Handle blog click
  const onBlogClick = useCallback(
    (blogId: string) => {
      console.log("Navigate to blog:", blogId)
      // Add your navigation logic here
      // Example: router.push(`/blogs/${blogId}`)
      alert(`Opening blog: ${blogs.find((b) => b.id === blogId)?.title}`)
    },
    [blogs],
  )

  // Handle group join
  const onGroupJoin = useCallback(
    async (groupId: string) => {
      try {
        const result = await joinGroup(groupId)
        console.log("Join result:", result)

        // Update local state
        setJoinedGroups((prev) => new Set([...prev, groupId]))

        // Show success message
        const groupName = groups.find((g) => g.id === groupId)?.name
        alert(`Successfully joined ${groupName}!`)

        // Update member count locally (optional)
        setGroups((prev) =>
          prev.map((group) => (group.id === groupId ? { ...group, memberCount: group.memberCount + 1 } : group)),
        )
      } catch (error) {
        console.error("Failed to join group:", error)
        alert("Failed to join group. Please try again.")
      }
    },
    [groups],
  )

  // Handle search
  const handleSearch = useCallback(async () => {
    if (!searchQuery.trim()) {
      setSearchResults(null)
      return
    }

    try {
      const results = await searchContent(searchQuery)
      setSearchResults(results)
      console.log("Search results:", results)

      // You can display search results in a modal or separate section
      alert(
        `Found ${(results as any).blogs.length} blogs, ${(results as any).groups.length} groups, ${(results as any).reviews.length} discussions`,
      )
    } catch (error) {
      console.error("Search failed:", error)
      alert("Search failed. Please try again.")
    }
  }, [searchQuery])

  const handleSearchKeyPress = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter") {
        handleSearch()
      }
    },
    [handleSearch],
  )

  // Handle like/unlike review
  const handleLikeReview = useCallback((reviewId: string) => {
    setReviews((prev) =>
      prev.map((review) => (review.id === reviewId ? { ...review, likes: review.likes + 1 } : review)),
    )
  }, [])

  // Loading state
  if (loading) {
    return (
      <div className={styles.community}>
        <div className={styles.communityWrapper}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
              fontSize: "18px",
              color: "#1c170d",
            }}
          >
            Loading community data...
          </div>
        </div>
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className={styles.community}>
        <div className={styles.communityWrapper}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
              flexDirection: "column",
              color: "#1c170d",
            }}
          >
            <div style={{ color: "red", marginBottom: "16px", fontSize: "18px" }}>Error loading community data</div>
            <div style={{ fontSize: "14px" }}>{error}</div>
            <button
              onClick={() => window.location.reload()}
              style={{
                marginTop: "16px",
                padding: "8px 16px",
                backgroundColor: "#abb79b",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.community}>
      <div className={styles.communityWrapper}>
        <div className={styles.community1}>
          <div className={styles.depth0Frame0}>
            {/* Header */}
            <div className={styles.depth2Frame0}>
              <div className={styles.depth3Frame0}>
                <div className={styles.depth3Frame01}>
                  <div className={styles.depth4Frame1}>
                    <div className={styles.wandernest}>WanderNest</div>
                  </div>
                </div>
                <div className={styles.depth4Frame11}>
                  <div className={styles.depth5Frame0}>
                    <div className={styles.home}>Home</div>
                  </div>
                  <div className={styles.depth5Frame0}>
                    <div className={styles.home}>Community</div>
                  </div>
                  <div className={styles.depth5Frame0}>
                    <div className={styles.home}>Destinations</div>
                  </div>
                  <div className={styles.depth5Frame0}>
                    <div className={styles.home}>About</div>
                  </div>
                </div>
              </div>
              <div className={styles.depth3Frame1}>
                <div className={styles.depth4Frame01}>
                  <div className={styles.depth5Frame01}>
                    <img className={styles.depth6Frame0} alt="" src="/search-icon.svg" />
                    <div className={styles.depth6Frame1}>
                      <div className={styles.search}>Search</div>
                    </div>
                  </div>
                </div>
                <div className={styles.depth4Frame12}>
                  <div className={styles.depth5Frame02}>
                    <div className={styles.depth6Frame01}>
                      <div className={styles.signUp}>Sign Up</div>
                    </div>
                  </div>
                  <div className={styles.depth5Frame11}></div>
                </div>
              </div>
            </div>

            <div className={styles.depth1Frame0}>
              <div className={styles.depth2Frame1}>
                <div className={styles.depth3Frame02}>
                  {/* Hero Section */}
                  <div className={styles.depth4Frame02}>
                    <div className={styles.depth5Frame03}>
                      <div className={styles.depth6Frame02}>
                        <div className={styles.community2}>Community</div>
                      </div>
                      <div className={styles.depth6Frame11}>
                        <div className={styles.connectShareAnd}>Connect, share, and explore the world together.</div>
                      </div>
                    </div>
                  </div>

                  {/* Search Section */}
                  <div className={styles.depth4Frame13}>
                    <div className={styles.depth5Frame04}>
                      <div className={styles.depth5Frame01}>
                        <img className={styles.depth6Frame0} alt="" src="/search-icon.svg" />
                        <div className={styles.depth6Frame1}>
                          <input
                            className={styles.searchTravelBlogs}
                            placeholder="Search travel blogs, groups, or discussions..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyPress={handleSearchKeyPress}
                            style={{
                              border: "none",
                              background: "transparent",
                              outline: "none",
                              width: "100%",
                              fontSize: "16px",
                              color: "#a1824a",
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Latest Travel Blogs */}
                  <div className={styles.depth4Frame2}>
                    <b className={styles.latestTravelBlogs}>Latest Travel Blogs</b>
                  </div>

                  <div className={styles.depth4Frame3}>
                    <div className={styles.depth5Frame05}>
                      {blogs.slice(0, 5).map((blog) => (
                        <div
                          key={blog.id}
                          className={styles.depth6Frame04}
                          onClick={() => onBlogClick(blog.id)}
                          style={{ cursor: "pointer" }}
                        >
                          <img
                            className={styles.depth7Frame01}
                            alt={blog.title}
                            src={blog.image || "/placeholder.svg"}
                          />
                          <div className={styles.depth1Frame0}>
                            <div className={styles.depth1Frame0}>
                              <div className={styles.exploringTheHills}>{blog.title}</div>
                            </div>
                            <div className={styles.depth8Frame1}>
                              <div className={styles.byNazim}>
                                By {blog.author} | {new Date(blog.date).toLocaleDateString()}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    {blogs.length > 5 && (
                      <div className={styles.depth5Frame12}>
                        <div
                          className={styles.depth6Frame04}
                          onClick={() => onBlogClick(blogs[5].id)}
                          style={{ cursor: "pointer" }}
                        >
                          <img
                            className={styles.depth7Frame01}
                            alt={blogs[5].title}
                            src={blogs[5].image || "/placeholder.svg"}
                          />
                          <div className={styles.depth1Frame0}>
                            <div className={styles.depth1Frame0}>
                              <div className={styles.exploringTheHills}>{blogs[5].title}</div>
                            </div>
                            <div className={styles.depth8Frame1}>
                              <div className={styles.byNazim}>
                                By {blogs[5].author} | {new Date(blogs[5].date).toLocaleDateString()}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Join Travel Groups */}
                  <div className={styles.depth4Frame2}>
                    <b className={styles.latestTravelBlogs}>Join Travel Groups</b>
                  </div>

                  <div className={styles.depth4Frame5}>
                    <div className={styles.depth5Frame06}>
                      {groups.map((group) => (
                        <div key={group.id} className={styles.depth6Frame06}>
                          <img
                            className={styles.depth7Frame07}
                            alt={group.name}
                            src={group.image || "/placeholder.svg"}
                          />
                          <div className={styles.depth7Frame17}>
                            <div className={styles.depth1Frame0}>
                              <div className={styles.depth1Frame0}>
                                <div className={styles.exploringTheHills}>{group.name}</div>
                              </div>
                              <div className={styles.depth8Frame1}>
                                <div className={styles.byNazim}>{group.description}</div>
                              </div>
                              <div className={styles.depth8Frame1}>
                                <div className={styles.byNazim}>{group.memberCount} members</div>
                              </div>
                            </div>
                            <div className={styles.depth8Frame16}>
                              <div
                                className={styles.depth6Frame01}
                                onClick={() => onGroupJoin(group.id)}
                                style={{
                                  cursor: "pointer",
                                  backgroundColor: joinedGroups.has(group.id) ? "#abb79b" : "#f5f0e5",
                                }}
                              >
                                <b className={styles.signUp}>{joinedGroups.has(group.id) ? "Joined" : "Join"}</b>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Discussions & Reviews */}
                  <div className={styles.depth4Frame2}>
                    <b className={styles.latestTravelBlogs}>Discussions & Reviews</b>
                  </div>

                  <div className={styles.depth4Frame7}>
                    {reviews.map((review) => (
                      <div key={review.id} className={styles.depth5Frame07}>
                        <div className={styles.depth6Frame07}>
                          <img
                            className={styles.depth7Frame012}
                            alt={review.user.name}
                            src={review.user.avatar || "/placeholder.svg"}
                          />
                          <div className={styles.depth7Frame112}>
                            <div className={styles.depth1Frame0}>
                              <div className={styles.exploringTheHills}>{review.user.name}</div>
                            </div>
                            <div className={styles.depth8Frame1}>
                              <div className={styles.byNazim}>{new Date(review.date).toLocaleDateString()}</div>
                            </div>
                          </div>
                        </div>
                        <div className={styles.depth6Frame14}>
                          {Array.from({ length: 5 }).map((_, i) => (
                            <img
                              key={i}
                              className={styles.depth7Frame013}
                              alt=""
                              src={i < review.rating ? "/star-filled.svg" : "/star-empty.svg"}
                            />
                          ))}
                        </div>
                        <div className={styles.depth1Frame0}>
                          <div className={styles.connectShareAnd}>{review.content}</div>
                        </div>
                        <div className={styles.depth6Frame32}>
                          <div
                            className={styles.depth7Frame014}
                            onClick={() => handleLikeReview(review.id)}
                            style={{ cursor: "pointer" }}
                          >
                            <img className={styles.depth7Frame013} alt="" src="/heart-icon.svg" />
                            <div className={styles.depth8Frame112}>
                              <div className={styles.connectShareAnd}>{review.likes}</div>
                            </div>
                          </div>
                          {review.comments > 0 && (
                            <div className={styles.depth7Frame014}>
                              <img className={styles.depth7Frame013} alt="" src="/comment-icon.svg" />
                              <div className={styles.depth8Frame112}>
                                <div className={styles.connectShareAnd}>{review.comments}</div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Community
