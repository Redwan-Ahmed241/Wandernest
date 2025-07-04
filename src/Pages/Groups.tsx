"use client"

import React, { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import styles from "../Styles/Group.module.css"
import Footer from "../Components/Footer"
import Navbar from "../Components/Navbar"
import { useAuth } from "../Authentication/auth-context"

// API Types
interface User {
  id: string
  name: string
  avatar?: string
  role?: "admin" | "member"
}

interface Post {
  id: string
  title: string
  content: string
  author: User
  created_at: string
  image?: string
  status: "pending" | "approved" | "rejected"
  group_id: string
}

interface Group {
  id: string
  name: string
  description: string
  banner_image: string
  privacy: "public" | "private"
  visibility: "visible" | "hidden"
  created_at: string
  admin_id: string
  member_count: number
  members: User[]
  images: string[]
}

interface GroupMembership {
  user_id: string
  group_id: string
  role: "admin" | "member"
  joined_at: string
}

// API Service
class GroupAPI {
  private static baseURL = process.env.REACT_APP_API_URL || "http://localhost:3001/api"

  private static async request(endpoint: string, options: RequestInit = {}) {
    const token = localStorage.getItem("authToken")
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
        ...options.headers,
      },
      ...options,
    })

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`)
    }

    return response.json()
  }

  static async getGroup(groupId: string): Promise<Group> {
    return this.request(`/groups/${groupId}`)
  }

  static async getGroupPosts(groupId: string, status?: string): Promise<Post[]> {
    const query = status ? `?status=${status}` : ""
    return this.request(`/groups/${groupId}/posts${query}`)
  }

  static async createPost(
    groupId: string,
    postData: {
      title: string
      content: string
      image?: File
    },
  ): Promise<Post> {
    const formData = new FormData()
    formData.append("title", postData.title)
    formData.append("content", postData.content)
    if (postData.image) {
      formData.append("image", postData.image)
    }

    const token = localStorage.getItem("authToken")
    const response = await fetch(`${this.baseURL}/groups/${groupId}/posts`, {
      method: "POST",
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
      body: formData,
    })

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`)
    }

    return response.json()
  }

  static async updatePostStatus(postId: string, status: "approved" | "rejected"): Promise<Post> {
    return this.request(`/posts/${postId}/status`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    })
  }

  static async joinGroup(groupId: string): Promise<GroupMembership> {
    return this.request(`/groups/${groupId}/join`, {
      method: "POST",
    })
  }

  static async leaveGroup(groupId: string): Promise<void> {
    return this.request(`/groups/${groupId}/leave`, {
      method: "DELETE",
    })
  }

  static async checkMembership(groupId: string): Promise<GroupMembership | null> {
    try {
      return await this.request(`/groups/${groupId}/membership`)
    } catch {
      return null
    }
  }

  static async getCurrentUser(): Promise<User> {
    return this.request(`/user/profile`)
  }
}

const TABS = [
  { label: "About", icon: "ℹ️" },
  { label: "Discussion", icon: "💬" },
  { label: "Featured", icon: "⭐" },
  { label: "Members", icon: "👥" },
]

// ProtectedRoute wrapper
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, loading } = useAuth()
  const navigate = useNavigate()

  React.useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate("/login", { replace: true })
    }
  }, [isAuthenticated, loading, navigate])

  if (loading || !isAuthenticated) {
    return <div style={{ padding: 40, textAlign: "center" }}>Loading...</div>
  }

  return <>{children}</>
}

const Groups: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { user: authUser } = useAuth()

  // State
  const [group, setGroup] = useState<Group | null>(null)
  const [posts, setPosts] = useState<Post[]>([])
  const [pendingPosts, setPendingPosts] = useState<Post[]>([])
  const [membership, setMembership] = useState<GroupMembership | null>(null)
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [activeTab, setActiveTab] = useState("Discussion")
  const [postInput, setPostInput] = useState("")
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [pendingMessage, setPendingMessage] = useState("")

  // Computed values
  const isJoined = !!membership
  const isAdmin = membership?.role === "admin"

  // Load user profile
  useEffect(() => {
    const loadUserProfile = async () => {
      try {
        const userProfile = await GroupAPI.getCurrentUser()
        setCurrentUser(userProfile)
      } catch (err) {
        console.error("Error loading user profile:", err)
        // Fallback to auth user data
        if (authUser) {
          setCurrentUser({
            id: authUser.id || authUser.email || "unknown",
            name: authUser.username || authUser.email || "User",
            avatar: "", // Default avatar
          })
        }
      }
    }

    if (authUser) {
      loadUserProfile()
    }
  }, [authUser])

  // Load group data
  useEffect(() => {
    const loadGroupData = async () => {
      if (!id) {
        navigate("/groups")
        return
      }

      try {
        setLoading(true)
        setError(null)

        const [groupData, membershipData] = await Promise.all([GroupAPI.getGroup(id), GroupAPI.checkMembership(id)])

        setGroup(groupData)
        setMembership(membershipData)

        // Load posts based on membership
        if (membershipData) {
          const [approvedPosts, pendingPostsData] = await Promise.all([
            GroupAPI.getGroupPosts(id, "approved"),
            membershipData.role === "admin" ? GroupAPI.getGroupPosts(id, "pending") : Promise.resolve([]),
          ])

          setPosts(approvedPosts)
          setPendingPosts(pendingPostsData)
        } else {
          // Non-members can only see approved posts
          const approvedPosts = await GroupAPI.getGroupPosts(id, "approved")
          setPosts(approvedPosts)
        }
      } catch (err) {
        console.error("Error loading group:", err)
        setError("Failed to load group data")
      } finally {
        setLoading(false)
      }
    }

    loadGroupData()
  }, [id, navigate])

  // Handle post submission
  const handlePost = async () => {
    if (!postInput.trim() || !id) return

    try {
      const postData = {
        title: postInput.slice(0, 50) || "Untitled",
        content: postInput,
        image: selectedImage || undefined,
      }

      await GroupAPI.createPost(id, postData)

      setPendingMessage("Your post is pending admin approval.")
      setPostInput("")
      setSelectedImage(null)

      // Refresh pending posts if admin
      if (isAdmin) {
        const updatedPendingPosts = await GroupAPI.getGroupPosts(id, "pending")
        setPendingPosts(updatedPendingPosts)
      }

      // Clear message after 3 seconds
      setTimeout(() => setPendingMessage(""), 3000)
    } catch (err) {
      console.error("Error creating post:", err)
      setError("Failed to create post")
    }
  }

  // Handle post approval/rejection
  const handleApprove = async (postId: string) => {
    try {
      await GroupAPI.updatePostStatus(postId, "approved")

      // Refresh both lists
      if (id) {
        const [approvedPosts, pendingPostsData] = await Promise.all([
          GroupAPI.getGroupPosts(id, "approved"),
          GroupAPI.getGroupPosts(id, "pending"),
        ])

        setPosts(approvedPosts)
        setPendingPosts(pendingPostsData)
      }
    } catch (err) {
      console.error("Error approving post:", err)
      setError("Failed to approve post")
    }
  }

  const handleReject = async (postId: string) => {
    try {
      await GroupAPI.updatePostStatus(postId, "rejected")

      // Refresh pending posts
      if (id) {
        const pendingPostsData = await GroupAPI.getGroupPosts(id, "pending")
        setPendingPosts(pendingPostsData)
      }
    } catch (err) {
      console.error("Error rejecting post:", err)
      setError("Failed to reject post")
    }
  }

  // Handle join/leave group
  const handleJoinGroup = async () => {
    if (!id) return

    try {
      const newMembership = await GroupAPI.joinGroup(id)
      setMembership(newMembership)

      // Refresh group data
      const updatedGroup = await GroupAPI.getGroup(id)
      setGroup(updatedGroup)
    } catch (err) {
      console.error("Error joining group:", err)
      setError("Failed to join group")
    }
  }

  const handleLeaveGroup = async () => {
    if (!id) return

    try {
      await GroupAPI.leaveGroup(id)
      setMembership(null)

      // Refresh group data
      const updatedGroup = await GroupAPI.getGroup(id)
      setGroup(updatedGroup)

      // Clear member-only data
      setPendingPosts([])
    } catch (err) {
      console.error("Error leaving group:", err)
      setError("Failed to leave group")
    }
  }

  // Handle image selection
  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedImage(file)
    }
  }

  // Format time
  const formatTime = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 1) return "just now"
    if (diffInHours < 24) return `${diffInHours}h ago`
    return date.toLocaleDateString()
  }

  if (loading) {
    return (
      <ProtectedRoute>
        <Navbar />
        <div style={{ padding: 40, textAlign: "center" }}>Loading group...</div>
        <Footer />
      </ProtectedRoute>
    )
  }

  if (error || !group) {
    return (
      <ProtectedRoute>
        <Navbar />
        <div style={{ padding: 40, textAlign: "center" }}>
          <div style={{ color: "red", marginBottom: 16 }}>{error || "Group not found"}</div>
          <button onClick={() => navigate("/groups")}>Back to Groups</button>
        </div>
        <Footer />
      </ProtectedRoute>
    )
  }

  return (
    <ProtectedRoute>
      <Navbar />
      <div className={styles.groupDetailWrapper}>
        {/* Banner and group name */}
        <div className={styles.groupBannerSection}>
          <img src={group.banner_image || "/placeholder.svg"} alt={group.name} className={styles.groupBanner} />
          <div className={styles.groupBannerName}>
            <img
              src="/Figma_photoes/wandernest.svg"
              alt="group icon"
              style={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                marginRight: 12,
                verticalAlign: "middle",
                background: "#fff",
                padding: 2,
              }}
            />
            {group.name}
          </div>
          {/* Join/Leave button */}
          {!isJoined ? (
            <button className={styles.groupJoinButton} onClick={handleJoinGroup}>
              Join Group
            </button>
          ) : (
            <button className={styles.groupLeaveButton} onClick={handleLeaveGroup}>
              Leave Group
            </button>
          )}
        </div>

        <div className={styles.groupMainContent}>
          {/* Left: Main content */}
          <div className={styles.groupMainLeft}>
            {/* Member avatars */}
            <div className={styles.groupAvatarsRow}>
              {group.members.slice(0, 10).map((member) => (
                <img
                  key={member.id}
                  src={member.avatar || "/placeholder.svg"}
                  alt={member.name}
                  className={styles.groupAvatar}
                  title={member.name}
                />
              ))}
              {group.member_count > 10 && <div className={styles.groupAvatarMore}>+{group.member_count - 10}</div>}
            </div>

            {/* Tabs */}
            <div className={styles.groupTabsRow}>
              {TABS.map((tab) => (
                <button
                  key={tab.label}
                  className={activeTab === tab.label ? styles.groupTabActive : styles.groupTab}
                  onClick={() => setActiveTab(tab.label)}
                >
                  <span style={{ marginRight: 6 }}>{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab content */}
            <div className={styles.groupTabContent}>
              {activeTab === "Discussion" && (
                <>
                  {/* Post input (joined users only) */}
                  {isJoined && currentUser && (
                    <div className={styles.groupPostInputRow}>
                      <img
                        src={currentUser.avatar || ""}
                        alt="user"
                        className={styles.groupAvatar}
                      />
                      <span style={{ fontSize: "1.2rem", marginRight: 6 }}>✏️</span>
                      <input
                        className={styles.groupPostInput}
                        placeholder="Share your thoughts..."
                        value={postInput}
                        onChange={(e) => setPostInput(e.target.value)}
                      />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageSelect}
                        style={{ display: "none" }}
                        id="image-upload"
                      />
                      <label htmlFor="image-upload" className={styles.groupImageButton}>
                        📷
                      </label>
                      <button className={styles.groupPostButton} disabled={!postInput.trim()} onClick={handlePost}>
                        Post
                      </button>
                    </div>
                  )}

                  {selectedImage && (
                    <div className={styles.selectedImagePreview}>
                      <img src={URL.createObjectURL(selectedImage) || "/placeholder.svg"} alt="Preview" />
                      <button onClick={() => setSelectedImage(null)}>Remove</button>
                    </div>
                  )}

                  {pendingMessage && <div style={{ color: "#b0b0b0", marginBottom: 12 }}>{pendingMessage}</div>}

                  {/* Admin: Pending posts */}
                  {isAdmin && pendingPosts.length > 0 && (
                    <div className={styles.groupPendingPostsSection}>
                      <div className={styles.groupSidebarTitle} style={{ marginBottom: 8 }}>
                        Pending Posts ({pendingPosts.length})
                      </div>
                      {pendingPosts.map((post) => (
                        <div key={post.id} className={styles.groupPostCard}>
                          <div className={styles.groupPostInfo}>
                            <div className={styles.groupPostTitle}>{post.title}</div>
                            <div className={styles.groupPostMeta}>
                              Posted by {post.author.name} - {formatTime(post.created_at)}
                            </div>
                            <div className={styles.groupPostContent}>{post.content}</div>
                            <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
                              <button className={styles.groupPostButton} onClick={() => handleApprove(post.id)}>
                                Approve
                              </button>
                              <button
                                className={styles.groupPostButton}
                                style={{ background: "#e57373" }}
                                onClick={() => handleReject(post.id)}
                              >
                                Reject
                              </button>
                            </div>
                          </div>
                          {post.image && (
                            <img
                              src={post.image || "/placeholder.svg"}
                              alt={post.title}
                              className={styles.groupPostImage}
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Approved posts list */}
                  <div className={styles.groupPostsList}>
                    {posts.length === 0 ? (
                      <div className={styles.groupEmptyState}>
                        No posts yet. {isJoined ? "Be the first to post!" : "Join the group to see discussions."}
                      </div>
                    ) : (
                      posts.map((post) => (
                        <div key={post.id} className={styles.groupPostCard}>
                          <div className={styles.groupPostInfo}>
                            <div className={styles.groupPostTitle}>{post.title}</div>
                            <div className={styles.groupPostMeta}>
                              Posted by {post.author.name} - {formatTime(post.created_at)}
                            </div>
                            <div className={styles.groupPostContent}>{post.content}</div>
                            <button className={styles.groupPostDetailsBtn}>View Details</button>
                          </div>
                          {post.image && (
                            <img
                              src={post.image || "/placeholder.svg"}
                              alt={post.title}
                              className={styles.groupPostImage}
                            />
                          )}
                        </div>
                      ))
                    )}
                  </div>
                </>
              )}

              {activeTab === "About" && (
                <div className={styles.groupAboutTab}>
                  <h3>About this group</h3>
                  <p>{group.description}</p>
                  <div className={styles.groupStats}>
                    <div>👥 {group.member_count} members</div>
                    <div>📅 Created {formatTime(group.created_at)}</div>
                    <div>🔒 {group.privacy === "private" ? "Private Group" : "Public Group"}</div>
                  </div>
                </div>
              )}

              {activeTab === "Featured" && (
                <div className={styles.groupAboutTab}>
                  <h3>Featured Posts</h3>
                  <p>No featured posts yet.</p>
                </div>
              )}

              {activeTab === "Members" && (
                <div className={styles.groupMembersTab}>
                  <h3>Members ({group.member_count})</h3>
                  {group.members.map((member) => (
                    <div key={member.id} className={styles.groupMemberRow}>
                      <img src={member.avatar || "/placeholder.svg"} alt={member.name} className={styles.groupAvatar} />
                      <span>{member.name}</span>
                      {member.role === "admin" && <span className={styles.adminBadge}>Admin</span>}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right: Sidebar */}
          <div className={styles.groupSidebar}>
            <div className={styles.groupSidebarSection}>
              <div className={styles.groupSidebarTitle}>About</div>
              <div className={styles.groupSidebarText}>{group.description}</div>

              <div className={styles.groupSidebarTitle}>
                Privacy <span style={{ marginLeft: 4 }}>🔒</span>
              </div>
              <div className={styles.groupSidebarText}>
                {group.privacy === "private" ? "Private: Members-only posts." : "Public: Anyone can see posts."}
              </div>

              <div className={styles.groupSidebarTitle}>
                Visibility <span style={{ marginLeft: 4 }}>👁️</span>
              </div>
              <div className={styles.groupSidebarText}>
                {group.visibility === "visible" ? "Visible: Anyone can find the group." : "Hidden: Invite-only group."}
              </div>
            </div>

            {group.images.length > 0 && (
              <div className={styles.groupSidebarImages}>
                <div className={styles.groupSidebarTitle}>Photos</div>
                {group.images.map((img, i) => (
                  <img key={i} src={img || "/placeholder.svg"} alt="group" className={styles.groupSidebarImg} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </ProtectedRoute>
  )
}

export default Groups
