// app/messages/page.tsx
"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { 
  Search,
  Filter,
  MoreHorizontal,
  Phone,
  Video,
  Info,
  Send,
  Eye,
  Play,
  Paperclip,
  Smile,
  Menu,
  ChevronLeft,
  ChevronRight,
  Home,
  Settings,
  BarChart3,
  Mail,
  Users,
  MessageCircle,
  Clock,
  Check,
  CheckCheck,
  Archive,
  Trash2,
  Image as ImageIcon,
  Plus,
  MessageSquare,
  Inbox,
  User,
  Download,
  Upload,
  Star,
  Crown,
  FileText,
  Mic,
  Square,
  MapPin,
  Calendar,
  Mail as MailIcon,
  Globe,
  X,
  MicOff,
  Volume2,
  Camera,
  CameraOff,
  Pin,
  Reply,
  Forward,
  Copy,
  Edit,
  DownloadCloud,
  Shield,
  Bell,
  BellOff
} from "lucide-react"
import { useState, useEffect, useRef, useCallback } from "react"
import Link from 'next/link'

// Types
interface Message {
  id: number
  content: string
  timestamp: string
  isUser: boolean
  status: 'sent' | 'delivered' | 'read'
  type: 'text' | 'image' | 'file' | 'audio'
  replyTo?: number
  isPinned?: boolean
}

interface Conversation {
  id: number
  name: string
  phone: string
  lastMessage: string
  timestamp: string
  unread: number
  isOnline: boolean
  lastSeen?: string
  labels: string[]
  isArchived: boolean
  isBlocked: boolean
  isAssigned: boolean
  isMuted?: boolean
  priority?: 'low' | 'medium' | 'high'
  profile?: {
    email?: string
    location?: string
    joinDate?: string
    notes?: string
    website?: string
  }
}

interface SortOption {
  key: string
  label: string
  icon: React.ComponentType<any>
}

export default function MessagesPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [activeFilter, setActiveFilter] = useState("all")
  const [selectedConversation, setSelectedConversation] = useState<number | null>(1)
  const [newMessage, setNewMessage] = useState("")
  const [sortBy, setSortBy] = useState("recent")
  const [showSortOptions, setShowSortOptions] = useState(false)
  const [isSearchFocused, setIsSearchFocused] = useState(false)
  const [showNewConversationModal, setShowNewConversationModal] = useState(false)
  const [newPhoneNumber, setNewPhoneNumber] = useState("")
  const [selectedTemplate, setSelectedTemplate] = useState("")
  const [showUploadMenu, setShowUploadMenu] = useState(false)
  const [showMoreMenu, setShowMoreMenu] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null)
  const [audioChunks, setAudioChunks] = useState<Blob[]>([])
  const [showProfileInfo, setShowProfileInfo] = useState(false)
  const [callStatus, setCallStatus] = useState<'idle' | 'calling' | 'in-progress' | 'ended'>('idle')
  const [callType, setCallType] = useState<'audio' | 'video'>('audio')
  const [callDuration, setCallDuration] = useState(0)
  const [isMuted, setIsMuted] = useState(false)
  const [isVideoOff, setIsVideoOff] = useState(false)
  const [isSpeakerOn, setIsSpeakerOn] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<number | null>(null)
  const [selectedMessage, setSelectedMessage] = useState<number | null>(null)
  const [replyToMessage, setReplyToMessage] = useState<Message | null>(null)
  const [showExportModal, setShowExportModal] = useState(false)
  const [exportFormat, setExportFormat] = useState<'pdf' | 'txt' | 'json'>('pdf')
  const [bulkActions, setBulkActions] = useState<number[]>([])
  const [showBulkMenu, setShowBulkMenu] = useState(false)

  const sortDropdownRef = useRef<HTMLDivElement>(null)
  const uploadMenuRef = useRef<HTMLDivElement>(null)
  const moreMenuRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const audioRecorderRef = useRef<HTMLAudioElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const conversationsListRef = useRef<HTMLDivElement>(null)
  const callTimerRef = useRef<NodeJS.Timeout | null>(null)
  const statusUpdateRef = useRef<{[key: number]: boolean}>({})

  // Sort options with icons
  const sortOptions: SortOption[] = [
    { key: "recent", label: "Date du dernier message", icon: Clock },
    { key: "unread", label: "Non lus", icon: MessageSquare },
    { key: "alphabetical", label: "Ordre alphabétique", icon: User },
    { key: "archived", label: "Archivés", icon: Inbox }
  ]

  // Message templates
  const messageTemplates = [
    "Bonjour ! Comment puis-je vous aider ?",
    "Merci de nous avoir contactés !",
    "Nous traitons votre demande...",
    "Avez-vous d'autres questions ?"
  ]

  // Données mockées des conversations avec profils
  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: 1,
      name: "Israe",
      phone: "212773055397",
      lastMessage: "kayni b...",
      timestamp: "10:24",
      unread: 2,
      isOnline: true,
      lastSeen: "2 min ago",
      labels: ["Client Fidèle"],
      isArchived: false,
      isBlocked: false,
      isAssigned: true,
      priority: 'high',
      profile: {
        email: "israe.client@example.com",
        location: "Casablanca, Maroc",
        joinDate: "15 Jan 2024",
        notes: "Client très satisfait, commande régulière",
        website: "www.israe-business.com"
      }
    },
    {
      id: 2,
      name: "Loi",
      phone: "212600151128",
      lastMessage: "media...",
      timestamp: "09:15",
      unread: 0,
      isOnline: false,
      lastSeen: "2h ago",
      labels: ["Prospect"],
      isArchived: false,
      isBlocked: false,
      isAssigned: true,
      priority: 'medium',
      profile: {
        email: "loi.prospect@example.com",
        location: "Rabat, Maroc",
        joinDate: "20 Fév 2024",
        notes: "Intéressé par nos services premium",
        website: "www.loi-entreprise.ma"
      }
    },
    {
      id: 3,
      name: "Soufflan",
      phone: "+212634455667",
      lastMessage: "chiclista 🟧 🟧 Ok",
      timestamp: "Hier",
      unread: 0,
      isOnline: true,
      labels: ["VIP"],
      isArchived: false,
      isBlocked: false,
      isAssigned: true,
      priority: 'high',
      profile: {
        email: "soufflan.vip@example.com",
        location: "Marrakech, Maroc",
        joinDate: "05 Mar 2024",
        notes: "Client VIP, traitement prioritaire requis",
        website: "www.soufflan-group.com"
      }
    },
    {
      id: 4,
      name: "Mason 9",
      phone: "212612345678",
      lastMessage: "Non assigné",
      timestamp: "11:30",
      unread: 1,
      isOnline: false,
      labels: [],
      isArchived: false,
      isBlocked: false,
      isAssigned: false,
      profile: {
        email: "mason9@example.com",
        location: "Tanger, Maroc",
        joinDate: "10 Mar 2024",
        notes: "Nouveau prospect à contacter"
      }
    },
    {
      id: 5,
      name: "Oxxes",
      phone: "212698765432",
      lastMessage: "About Hour ago",
      timestamp: "10:45",
      unread: 0,
      isOnline: false,
      labels: ["À Rappeler"],
      isArchived: true,
      isBlocked: false,
      isAssigned: false,
      profile: {
        email: "oxxes@example.com",
        location: "Fès, Maroc",
        joinDate: "28 Fév 2024",
        notes: "À rappeler dans 3 jours"
      }
    },
    {
      id: 6,
      name: "Client 6",
      phone: "212611223344",
      lastMessage: "Bonjour, je souhaite...",
      timestamp: "09:30",
      unread: 0,
      isOnline: true,
      labels: ["Nouveau"],
      isArchived: false,
      isBlocked: false,
      isAssigned: true,
      priority: 'medium'
    },
    {
      id: 7,
      name: "Client 7",
      phone: "212655443322",
      lastMessage: "Merci pour votre aide",
      timestamp: "Hier",
      unread: 3,
      isOnline: false,
      labels: ["Régulier"],
      isArchived: false,
      isBlocked: false,
      isAssigned: true,
      priority: 'low'
    },
    {
      id: 8,
      name: "Client 8",
      phone: "212677889900",
      lastMessage: "Pouvez-vous m'aider ?",
      timestamp: "11:15",
      unread: 1,
      isOnline: true,
      labels: ["Urgent"],
      isArchived: false,
      isBlocked: false,
      isAssigned: false,
      priority: 'high'
    }
  ])

  // Messages mockés
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      content: "Bonjour ! Comment puis-je vous aider ?",
      timestamp: "10:20",
      isUser: false,
      status: 'read',
      type: 'text'
    },
    {
      id: 2,
      content: "Je voudrais des informations sur vos services",
      timestamp: "10:22",
      isUser: true,
      status: 'read',
      type: 'text'
    },
    {
      id: 3,
      content: "Bien sûr ! Quel service vous intéresse ?",
      timestamp: "10:23",
      isUser: false,
      status: 'read',
      type: 'text'
    },
    {
      id: 4,
      content: "media-",
      timestamp: "10:24",
      isUser: true,
      status: 'delivered',
      type: 'image'
    },
    {
      id: 5,
      content: "kayni b...",
      timestamp: "10:24",
      isUser: true,
      status: 'sent',
      type: 'text'
    }
  ])

  // FIXED: Message status updates with proper dependencies
  useEffect(() => {
    const sentMessages = messages.filter(msg => 
      msg.isUser && msg.status === 'sent' && !statusUpdateRef.current[msg.id]
    )

    sentMessages.forEach(message => {
      statusUpdateRef.current[message.id] = true
      
      // Simulate delivered status after 1 second
      setTimeout(() => {
        setMessages(prev => prev.map(msg => 
          msg.id === message.id ? { ...msg, status: 'delivered' } : msg
        ))
      }, 1000)
      
      // Simulate read status after 3 seconds
      setTimeout(() => {
        setMessages(prev => prev.map(msg => 
          msg.id === message.id ? { ...msg, status: 'read' } : msg
        ))
      }, 3000)
    })
  }, [messages]) // Only run when messages change

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`
    }
  }, [newMessage])

  // Call timer effect
  useEffect(() => {
    if (callStatus === 'in-progress') {
      callTimerRef.current = setInterval(() => {
        setCallDuration(prev => prev + 1)
      }, 1000)
    } else {
      if (callTimerRef.current) {
        clearInterval(callTimerRef.current)
        callTimerRef.current = null
      }
    }

    return () => {
      if (callTimerRef.current) {
        clearInterval(callTimerRef.current)
      }
    }
  }, [callStatus])

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sortDropdownRef.current && !sortDropdownRef.current.contains(event.target as Node)) {
        setShowSortOptions(false)
      }
      if (uploadMenuRef.current && !uploadMenuRef.current.contains(event.target as Node)) {
        setShowUploadMenu(false)
      }
      if (moreMenuRef.current && !moreMenuRef.current.contains(event.target as Node)) {
        setShowMoreMenu(false)
      }
      // Close message context menu
      if (selectedMessage !== null) {
        setSelectedMessage(null)
      }
      // Close bulk menu
      if (showBulkMenu) {
        setShowBulkMenu(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [selectedMessage, showBulkMenu])

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed)
  }

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const newMsg: Message = {
        id: messages.length + 1,
        content: newMessage,
        timestamp: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
        isUser: true,
        status: 'sent',
        type: 'text',
        replyTo: replyToMessage?.id
      }
      setMessages([...messages, newMsg])
      setNewMessage("")
      setReplyToMessage(null) // Clear reply
      // Reset textarea height
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto'
      }
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Filter and sort conversations
  const filteredConversations = conversations
    .filter(conv => {
      const matchesSearch = conv.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           conv.phone.includes(searchTerm) ||
                           conv.lastMessage.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesFilter = activeFilter === "all" ||
                           (activeFilter === "unread" && conv.unread > 0) ||
                           (activeFilter === "archived" && conv.isArchived) ||
                           (activeFilter === "assigned" && conv.isAssigned) ||
                           (activeFilter === "unassigned" && !conv.isAssigned)
      return matchesSearch && matchesFilter
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "recent":
          return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
        case "unread":
          return b.unread - a.unread
        case "alphabetical":
          return a.name.localeCompare(b.name)
        case "archived":
          return (a.isArchived === b.isArchived) ? 0 : a.isArchived ? -1 : 1
        default:
          return 0
      }
    })

  const currentConversation = conversations.find(conv => conv.id === selectedConversation)

  // Call handlers
  const handleCall = (type: 'audio' | 'video') => {
    if (currentConversation) {
      setCallType(type)
      setCallStatus('calling')
      setCallDuration(0)
      setIsMuted(false)
      setIsVideoOff(false)
      setIsSpeakerOn(false)
      
      // Simulate call being answered after 3 seconds
      setTimeout(() => {
        setCallStatus('in-progress')
      }, 3000)
    }
  }

  const handleEndCall = () => {
    setCallStatus('ended')
    setTimeout(() => {
      setCallStatus('idle')
      setCallDuration(0)
    }, 2000)
  }

  const handleAcceptCall = () => {
    setCallStatus('in-progress')
  }

  const handleDeclineCall = () => {
    setCallStatus('ended')
    setTimeout(() => {
      setCallStatus('idle')
    }, 1000)
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
  }

  const toggleVideo = () => {
    setIsVideoOff(!isVideoOff)
  }

  const toggleSpeaker = () => {
    setIsSpeakerOn(!isSpeakerOn)
  }

  const formatCallDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  // Delete conversation handler
  const handleDeleteConversation = (conversationId: number) => {
    setConversations(conversations.filter(conv => conv.id !== conversationId))
    if (selectedConversation === conversationId) {
      setSelectedConversation(null)
    }
    setShowDeleteConfirm(null)
  }

  // Message actions
  const handleReplyToMessage = (message: Message) => {
    setReplyToMessage(message)
    setSelectedMessage(null)
  }

  const handlePinMessage = (messageId: number) => {
    setMessages(messages.map(msg => 
      msg.id === messageId ? { ...msg, isPinned: !msg.isPinned } : msg
    ))
    setSelectedMessage(null)
  }

  const handleCopyMessage = (content: string) => {
    navigator.clipboard.writeText(content)
    setSelectedMessage(null)
  }

  const handleForwardMessage = (message: Message) => {
    // Implementation for forwarding message
    console.log('Forward message:', message)
    setSelectedMessage(null)
  }

  // Export conversation
  const handleExportConversation = () => {
    const conversationData = {
      conversation: currentConversation,
      messages: messages,
      exportDate: new Date().toISOString()
    }

    let content: string
    let mimeType: string
    let fileExtension: string

    switch (exportFormat) {
      case 'txt':
        content = `Conversation avec ${currentConversation?.name}\n\n` +
                 messages.map(msg => 
                   `${msg.timestamp} - ${msg.isUser ? 'Vous' : currentConversation?.name}: ${msg.content}`
                 ).join('\n')
        mimeType = 'text/plain'
        fileExtension = 'txt'
        break
      case 'json':
        content = JSON.stringify(conversationData, null, 2)
        mimeType = 'application/json'
        fileExtension = 'json'
        break
      case 'pdf':
      default:
        // Simple PDF simulation - in real app, use a PDF library
        content = `Conversation avec ${currentConversation?.name}\n\n` +
                 messages.map(msg => 
                   `${msg.timestamp} - ${msg.isUser ? 'Vous' : currentConversation?.name}: ${msg.content}`
                 ).join('\n')
        mimeType = 'application/pdf'
        fileExtension = 'pdf'
    }

    const blob = new Blob([content], { type: mimeType })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `conversation-${currentConversation?.name}-${new Date().getTime()}.${fileExtension}`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    
    setShowExportModal(false)
  }

  // Bulk actions
  const toggleBulkSelect = (messageId: number) => {
    setBulkActions(prev => 
      prev.includes(messageId) 
        ? prev.filter(id => id !== messageId)
        : [...prev, messageId]
    )
  }

  const handleBulkDelete = () => {
    setMessages(messages.filter(msg => !bulkActions.includes(msg.id)))
    setBulkActions([])
    setShowBulkMenu(false)
  }

  const handleBulkExport = () => {
    const selectedMessages = messages.filter(msg => bulkActions.includes(msg.id))
    const content = JSON.stringify(selectedMessages, null, 2)
    const blob = new Blob([content], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `messages-selection-${new Date().getTime()}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    setBulkActions([])
    setShowBulkMenu(false)
  }

  // Button handlers
  const handleNewConversation = () => {
    setShowNewConversationModal(true)
  }

  const handleStartConversation = () => {
    if (newPhoneNumber.trim() && selectedTemplate) {
      const newConv: Conversation = {
        id: conversations.length + 1,
        name: "Nouveau contact",
        phone: newPhoneNumber,
        lastMessage: selectedTemplate,
        timestamp: "Maintenant",
        unread: 0,
        isOnline: false,
        labels: ["Nouveau"],
        isArchived: false,
        isBlocked: false,
        isAssigned: true,
        profile: {
          email: "",
          location: "",
          joinDate: new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' }),
          notes: "Nouveau contact créé via l'interface"
        }
      }
      setConversations([newConv, ...conversations])
      setSelectedConversation(newConv.id)
      setShowNewConversationModal(false)
      setNewPhoneNumber("")
      setSelectedTemplate("")
    }
  }

  const handleArchiveConversation = (conversationId: number, e: React.MouseEvent) => {
    e.stopPropagation()
    setConversations(conversations.map(conv => 
      conv.id === conversationId ? { ...conv, isArchived: !conv.isArchived } : conv
    ))
  }

  const handleBlockConversation = (conversationId: number) => {
    setConversations(conversations.map(conv => 
      conv.id === conversationId ? { ...conv, isBlocked: !conv.isBlocked } : conv
    ))
    setShowMoreMenu(false)
  }

  const handleAssignConversation = (conversationId: number) => {
    setConversations(conversations.map(conv => 
      conv.id === conversationId ? { ...conv, isAssigned: !conv.isAssigned } : conv
    ))
    setShowMoreMenu(false)
  }

  // Mute conversation
  const handleMuteConversation = (conversationId: number) => {
    setConversations(conversations.map(conv => 
      conv.id === conversationId ? { ...conv, isMuted: !conv.isMuted } : conv
    ))
    setShowMoreMenu(false)
  }

  const handleInfo = () => {
    setShowProfileInfo(true)
  }

  const handleUploadFile = (fileType: string) => {
    if (fileInputRef.current) {
      if (fileType === 'image') {
        fileInputRef.current.accept = 'image/*'
      } else if (fileType === 'document') {
        fileInputRef.current.accept = '.pdf,.doc,.docx,.txt'
      } else {
        fileInputRef.current.accept = '*/*'
      }
      
      fileInputRef.current.click()
      setShowUploadMenu(false)
    }
  }

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files && files.length > 0) {
      const newFiles = Array.from(files)
      
      newFiles.forEach(file => {
        const newMsg: Message = {
          id: messages.length + 1,
          content: `Fichier: ${file.name} (${(file.size / 1024).toFixed(1)} KB)`,
          timestamp: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
          isUser: true,
          status: 'sent',
          type: file.type.startsWith('image/') ? 'image' : 'file'
        }
        setMessages(prev => [...prev, newMsg])
      })

      event.target.value = ''
    }
  }

  const handleImageUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.accept = 'image/*'
      fileInputRef.current.click()
    }
  }

  const handleVoiceMessage = async () => {
    if (!isRecording) {
      // Start recording
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
        const recorder = new MediaRecorder(stream)
        const chunks: Blob[] = []
        
        recorder.ondataavailable = (e) => {
          chunks.push(e.data)
        }
        
        recorder.onstop = () => {
          const audioBlob = new Blob(chunks, { type: 'audio/wav' })
          // Send audio message
          const newMsg: Message = {
            id: messages.length + 1,
            content: "Message vocal",
            timestamp: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
            isUser: true,
            status: 'sent',
            type: 'audio'
          }
          setMessages(prev => [...prev, newMsg])
        }
        
        recorder.start()
        setMediaRecorder(recorder)
        setAudioChunks(chunks)
        setIsRecording(true)
      } catch (error) {
        console.error("Error accessing microphone:", error)
        alert("Impossible d'accéder au microphone")
      }
    } else {
      // Stop recording
      if (mediaRecorder) {
        mediaRecorder.stop()
        mediaRecorder.stream.getTracks().forEach(track => track.stop())
        setMediaRecorder(null)
        setIsRecording(false)
      }
    }
  }

  const getPriorityIcon = (priority?: string) => {
    switch (priority) {
      case 'high':
        return <Crown className="size-3 text-red-500" />
      case 'medium':
        return <Star className="size-3 text-yellow-500" />
      case 'low':
        return <Star className="size-3 text-blue-500" />
      default:
        return null
    }
  }

  const getPriorityColor = (priority?: string) => {
    switch (priority) {
      case 'high':
        return 'border-l-red-500'
      case 'medium':
        return 'border-l-yellow-500'
      case 'low':
        return 'border-l-blue-500'
      default:
        return 'border-l-gray-300'
    }
  }

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      {/* Input file caché */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileSelect}
        className="hidden"
        multiple
      />

      {/* Audio element for voice messages */}
      <audio ref={audioRecorderRef} className="hidden" />

      {/* Modal Nouvelle Conversation */}
      {showNewConversationModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-card rounded-lg p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-semibold mb-4">Démarrer une nouvelle conversation</h3>
            
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Numéro de téléphone</label>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="outline" className="text-xs">+212 - Maroc</Badge>
                  <span className="text-xs text-muted-foreground">Entrez le numéro de téléphone</span>
                </div>
                <Input
                  placeholder="Exemple: 212612345678"
                  value={newPhoneNumber}
                  onChange={(e) => setNewPhoneNumber(e.target.value)}
                  className="w-full"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Exemple: 212 + numéro local
                </p>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Modèle de message</label>
                <select
                  value={selectedTemplate}
                  onChange={(e) => setSelectedTemplate(e.target.value)}
                  className="w-full p-2 border border-border rounded-md bg-background"
                >
                  <option value="">Sélectionner un modèle</option>
                  {messageTemplates.map((template, index) => (
                    <option key={index} value={template}>
                      {template}
                    </option>
                  ))}
                </select>
              </div>

              <div className="bg-muted/50 p-3 rounded-md">
                <p className="text-xs text-muted-foreground">
                  Un message mobile est requis pour démarrer une nouvelle conversation. 
                  Cela permet d'assurer la conformité avec les politiques de messagerie de WhatsApp.
                </p>
              </div>

              <div className="flex gap-2 justify-end">
                <Button
                  variant="outline"
                  onClick={() => setShowNewConversationModal(false)}
                >
                  Annuler
                </Button>
                <Button
                  onClick={handleStartConversation}
                  disabled={!newPhoneNumber.trim() || !selectedTemplate}
                >
                  Démarrer la discussion
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de confirmation de suppression */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-card rounded-lg p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-semibold mb-4">Supprimer la conversation</h3>
            <p className="text-muted-foreground mb-6">
              Êtes-vous sûr de vouloir supprimer cette conversation ? Cette action est irréversible.
            </p>
            <div className="flex gap-2 justify-end">
              <Button
                variant="outline"
                onClick={() => setShowDeleteConfirm(null)}
              >
                Annuler
              </Button>
              <Button
                variant="destructive"
                onClick={() => handleDeleteConversation(showDeleteConfirm)}
              >
                Supprimer
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Export Modal */}
      {showExportModal && currentConversation && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-card rounded-lg p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-semibold mb-4">Exporter la conversation</h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Format d'export</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { value: 'pdf', label: 'PDF', icon: FileText },
                    { value: 'txt', label: 'Texte', icon: FileText },
                    { value: 'json', label: 'JSON', icon: DownloadCloud }
                  ].map((format) => (
                    <button
                      key={format.value}
                      onClick={() => setExportFormat(format.value as any)}
                      className={`p-3 border rounded-lg text-center transition-colors ${
                        exportFormat === format.value
                          ? 'border-primary bg-primary/10 text-primary'
                          : 'border-border hover:bg-accent'
                      }`}
                    >
                      <format.icon className="size-5 mx-auto mb-1" />
                      <span className="text-sm">{format.label}</span>
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex gap-2 justify-end">
                <Button
                  variant="outline"
                  onClick={() => setShowExportModal(false)}
                >
                  Annuler
                </Button>
                <Button onClick={handleExportConversation}>
                  <Download className="size-4 mr-2" />
                  Exporter
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal Informations du profil */}
      {showProfileInfo && currentConversation && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-lg w-full max-w-md max-h-[90vh] overflow-hidden flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border flex-shrink-0">
              <h3 className="text-lg font-semibold">Informations du profil</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowProfileInfo(false)}
                className="text-muted-foreground hover:text-foreground size-8 p-0"
              >
                ✕
              </Button>
            </div>
            
            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="space-y-6">
                {/* En-tête du profil */}
                <div className="flex items-center gap-4">
                  <div className="size-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-xl flex-shrink-0">
                    {currentConversation.name.charAt(0)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="font-semibold text-lg truncate">{currentConversation.name}</h4>
                    <p className="text-muted-foreground text-sm truncate">{currentConversation.phone}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <div className={`size-2 rounded-full flex-shrink-0 ${currentConversation.isOnline ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                      <span className="text-sm text-muted-foreground truncate">
                        {currentConversation.isOnline ? 'En ligne' : `Hors ligne - ${currentConversation.lastSeen}`}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Informations de contact */}
                <div className="space-y-4">
                  <div>
                    <h5 className="font-medium mb-3 text-muted-foreground text-sm">Informations de contact</h5>
                    <div className="space-y-3">
                      {currentConversation.profile?.email && (
                        <div className="flex items-start gap-3">
                          <MailIcon className="size-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-medium">Email</p>
                            <p className="text-sm text-muted-foreground break-words">{currentConversation.profile.email}</p>
                          </div>
                        </div>
                      )}
                      
                      {currentConversation.profile?.location && (
                        <div className="flex items-start gap-3">
                          <MapPin className="size-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-medium">Localisation</p>
                            <p className="text-sm text-muted-foreground break-words">{currentConversation.profile.location}</p>
                          </div>
                        </div>
                      )}

                      {currentConversation.profile?.joinDate && (
                        <div className="flex items-start gap-3">
                          <Calendar className="size-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-medium">Membre depuis</p>
                            <p className="text-sm text-muted-foreground break-words">{currentConversation.profile.joinDate}</p>
                          </div>
                        </div>
                      )}

                      {currentConversation.profile?.website && (
                        <div className="flex items-start gap-3">
                          <Globe className="size-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-medium">Site web</p>
                            <p className="text-sm text-muted-foreground break-words">{currentConversation.profile.website}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Notes */}
                  {currentConversation.profile?.notes && (
                    <div>
                      <h5 className="font-medium mb-2 text-muted-foreground text-sm">Notes</h5>
                      <p className="text-sm bg-muted/50 p-3 rounded-lg break-words">{currentConversation.profile.notes}</p>
                    </div>
                  )}

                  {/* Labels et statut */}
                  <div>
                    <h5 className="font-medium mb-2 text-muted-foreground text-sm">Statut</h5>
                    <div className="flex flex-wrap gap-2">
                      {currentConversation.labels.map((label, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {label}
                        </Badge>
                      ))}
                      {currentConversation.isBlocked && (
                        <Badge variant="outline" className="bg-red-500/20 text-red-600 text-xs">
                          Bloqué
                        </Badge>
                      )}
                      {!currentConversation.isAssigned && (
                        <Badge variant="outline" className="bg-orange-500/20 text-orange-600 text-xs">
                          Non assigné
                        </Badge>
                      )}
                      {currentConversation.isArchived && (
                        <Badge variant="outline" className="bg-blue-500/20 text-blue-600 text-xs">
                          Archivé
                        </Badge>
                      )}
                      {currentConversation.isMuted && (
                        <Badge variant="outline" className="bg-gray-500/20 text-gray-600 text-xs">
                          Silencieux
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer avec boutons */}
            <div className="flex gap-2 justify-end p-6 border-t border-border flex-shrink-0">
              <Button
                variant="outline"
                onClick={() => setShowProfileInfo(false)}
                className="flex-1 sm:flex-none"
              >
                Fermer
              </Button>
              <Button 
                onClick={() => handleCall('audio')}
                className="flex-1 sm:flex-none"
              >
                <Phone className="size-4 mr-2" />
                Appeler
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Call Interface */}
      {callStatus !== 'idle' && currentConversation && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4">
          <div className={`w-full max-w-2xl ${callType === 'video' ? 'aspect-video' : 'aspect-square'} relative rounded-2xl overflow-hidden bg-gradient-to-br from-gray-900 to-black`}>
            
            {/* Remote Video/User Info */}
            <div className="absolute inset-0 flex items-center justify-center">
              {callType === 'video' ? (
                <div className="w-full h-full bg-gradient-to-br from-blue-900/30 to-purple-900/30 flex items-center justify-center">
                  {!isVideoOff ? (
                    <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                      <div className="text-center">
                        <div className="size-32 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                          <span className="text-white text-4xl font-bold">{currentConversation.name.charAt(0)}</span>
                        </div>
                        <h2 className="text-2xl font-bold text-white mb-2">{currentConversation.name}</h2>
                        <p className="text-gray-300">{formatCallDuration(callDuration)}</p>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center">
                      <div className="size-24 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CameraOff className="size-10 text-gray-400" />
                      </div>
                      <p className="text-gray-400">Caméra désactivée</p>
                      <p className="text-gray-300 mt-2">{formatCallDuration(callDuration)}</p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center">
                  <div className="size-32 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-white text-4xl font-bold">{currentConversation.name.charAt(0)}</span>
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-2">{currentConversation.name}</h2>
                  <p className="text-gray-300 mb-1">{currentConversation.phone}</p>
                  <div className="text-gray-400">
                    {callStatus === 'calling' && 'Appel en cours...'}
                    {callStatus === 'in-progress' && formatCallDuration(callDuration)}
                    {callStatus === 'ended' && 'Appel terminé'}
                  </div>
                </div>
              )}
            </div>

            {/* Local Video Preview (for video calls) */}
            {callType === 'video' && callStatus === 'in-progress' && (
              <div className="absolute top-4 right-4 w-32 aspect-video bg-gray-800 rounded-lg overflow-hidden border-2 border-white/20">
                <div className="w-full h-full bg-gray-700 flex items-center justify-center">
                  <div className="text-center">
                    <div className="size-8 bg-gray-600 rounded-full flex items-center justify-center mx-auto mb-1">
                      <User className="size-4 text-gray-400" />
                    </div>
                    <p className="text-xs text-gray-400">Vous</p>
                  </div>
                </div>
              </div>
            )}

            {/* Call Controls */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center gap-4">
              {callStatus === 'calling' ? (
                <>
                  <Button
                    onClick={handleDeclineCall}
                    className="size-16 rounded-full bg-red-500 hover:bg-red-600 text-white"
                  >
                    <Phone className="size-6 rotate-135" />
                  </Button>
                  <Button
                    onClick={handleAcceptCall}
                    className="size-16 rounded-full bg-green-500 hover:bg-green-600 text-white"
                  >
                    <Phone className="size-6" />
                  </Button>
                </>
              ) : callStatus === 'in-progress' ? (
                <>
                  <Button
                    onClick={toggleMute}
                    className={`size-12 rounded-full ${
                      isMuted ? 'bg-red-500 hover:bg-red-600' : 'bg-white/20 hover:bg-white/30'
                    } text-white`}
                  >
                    {isMuted ? <MicOff className="size-5" /> : <Mic className="size-5" />}
                  </Button>
                  
                  {callType === 'video' && (
                    <Button
                      onClick={toggleVideo}
                      className={`size-12 rounded-full ${
                        isVideoOff ? 'bg-red-500 hover:bg-red-600' : 'bg-white/20 hover:bg-white/30'
                      } text-white`}
                    >
                      {isVideoOff ? <CameraOff className="size-5" /> : <Camera className="size-5" />}
                    </Button>
                  )}

                  <Button
                    onClick={toggleSpeaker}
                    className={`size-12 rounded-full ${
                      isSpeakerOn ? 'bg-blue-500 hover:bg-blue-600' : 'bg-white/20 hover:bg-white/30'
                    } text-white`}
                  >
                    <Volume2 className="size-5" />
                  </Button>

                  <Button
                    onClick={handleEndCall}
                    className="size-12 rounded-full bg-red-500 hover:bg-red-600 text-white"
                  >
                    <Phone className="size-5 rotate-135" />
                  </Button>
                </>
              ) : callStatus === 'ended' && (
                <Button
                  onClick={() => setCallStatus('idle')}
                  className="size-12 rounded-full bg-gray-600 hover:bg-gray-700 text-white"
                >
                  <X className="size-5" />
                </Button>
              )}
            </div>

            {/* Status Overlay */}
            {callStatus === 'ended' && (
              <div className="absolute inset-0 bg-black/80 flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="size-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Phone className="size-8 rotate-135" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Appel terminé</h3>
                  <p className="text-gray-300">Durée: {formatCallDuration(callDuration)}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Main Layout with Sidebars Side by Side */}
      <div className="flex flex-1 w-full">
        {/* Navigation Sidebar */}
        <div className={`bg-card border-r border-border transition-all duration-300 flex flex-col ${
          isCollapsed ? 'w-20' : 'w-64'
        }`}>
          <div className="p-4">
            <div className="flex items-center justify-between mb-6">
              {!isCollapsed && (
                <div className="flex items-center gap-3">
                  <div className="bg-gradient-to-r from-blue-500 to-purple-600 size-8 rounded-lg flex items-center justify-center">
                    <MessageCircle className="size-5 text-white" />
                  </div>
                  <div>
                    <span className="text-xl font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                      Messages
                    </span>
                  </div>
                </div>
              )}
              <div className="flex gap-1">
                <button 
                  onClick={toggleCollapse}
                  className="p-2 text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg transition-colors"
                  title={isCollapsed ? "Développer la sidebar" : "Réduire la sidebar"}
                >
                  {isCollapsed ? <ChevronRight className="size-6" /> : <ChevronLeft className="size-5" />}
                </button>
              </div>
            </div>

            {/* Navigation */}
            <nav className="space-y-2">
              {[
                { icon: Home, label: "Tableau de bord", active: false, href: "/dashboard" },
                { icon: Mail, label: "Messages", active: true, href: "/messages" },
                { icon: Users, label: "Clients", active: false, href: "#" },
                { icon: BarChart3, label: "Rapports", active: false, href: "#" },
                { icon: Settings, label: "Paramètres", active: false, href: "/settings" }
              ].map((item, index) => (
                <Link 
                  key={index}
                  href={item.href} 
                  className={`flex items-center rounded-lg transition-all duration-200 ${
                    item.active 
                      ? 'bg-primary/10 text-primary border border-primary/20' 
                      : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                  } ${isCollapsed ? 'justify-center p-4' : 'gap-3 px-3 py-2'}`}
                  title={isCollapsed ? item.label : ''}
                >
                  <item.icon className={`${isCollapsed ? 'size-8' : 'size-5'}`} />
                  {!isCollapsed && <span>{item.label}</span>}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        {/* Conversations Sidebar */}
        <div className={`bg-card border-r border-border transition-all duration-300 flex flex-col ${
          sidebarOpen ? 'w-80' : 'w-0 overflow-hidden'
        }`}>
          <div className="p-4 border-b border-border">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <h2 className="text-lg font-semibold">Conversations</h2>
              </div>
              <button 
                onClick={toggleSidebar}
                className="p-2 text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg transition-colors"
                title="Masquer les conversations"
              >
                <ChevronLeft className="size-5" />
              </button>
            </div>

            {/* Header avec recherche et boutons d'action */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleNewConversation}
                    className="flex items-center gap-2"
                  >
                    <Plus className="size-4" />
                    <span>Nouveau</span>
                  </Button>

                  <div className="relative" ref={sortDropdownRef}>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation()
                        setShowSortOptions(!showSortOptions)
                      }}
                      className="flex items-center gap-2"
                    >
                      <Filter className="size-4" />
                      <span>Trier</span>
                    </Button>

                    {showSortOptions && (
                      <div className="absolute top-full right-0 mt-2 w-64 bg-card border border-border rounded-lg shadow-lg z-50">
                        <div className="p-2">
                          <div className="text-xs font-semibold text-muted-foreground px-2 py-1 mb-1">
                            Options de tri
                          </div>
                          {sortOptions.map((option) => {
                            const Icon = option.icon
                            return (
                              <button
                                key={option.key}
                                onClick={() => {
                                  setSortBy(option.key)
                                  setShowSortOptions(false)
                                }}
                                className={`flex items-center gap-3 w-full px-3 py-2 text-sm rounded-md hover:bg-accent transition-colors ${
                                  sortBy === option.key ? 'bg-primary/10 text-primary' : ''
                                }`}
                              >
                                <Icon className="size-4" />
                                <div className="flex-1 text-left">
                                  <div>{option.label}</div>
                                  {option.key === "recent" && (
                                    <div className="text-xs text-muted-foreground">Plus récent d'abord</div>
                                  )}
                                </div>
                              </button>
                            )
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Barre de recherche */}
              <div className={`relative transition-all duration-200 ${
                isSearchFocused ? 'ring-2 ring-primary/20 rounded-lg' : ''
              }`}>
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground size-4" />
                <Input
                  placeholder="Rechercher des conversations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                  className="pl-10 pr-4 border-0 bg-background/50"
                />
              </div>

              {/* Filtres rapides */}
              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                {[
                  { key: "all", label: "Tous", count: conversations.length },
                  { key: "unread", label: "Non lus", count: conversations.filter(c => c.unread > 0).length },
                  { key: "archived", label: "Archivés", count: conversations.filter(c => c.isArchived).length },
                  { key: "assigned", label: "Assignés", count: conversations.filter(c => c.isAssigned).length },
                  { key: "unassigned", label: "Non assignés", count: conversations.filter(c => !c.isAssigned).length }
                ].map((filter) => (
                  <Button
                    key={filter.key}
                    variant={activeFilter === filter.key ? "default" : "outline"}
                    size="sm"
                    onClick={() => setActiveFilter(filter.key)}
                    className="whitespace-nowrap flex-shrink-0"
                  >
                    {filter.label}
                    {filter.count > 0 && (
                      <Badge 
                        variant="secondary" 
                        className={`ml-2 ${
                          activeFilter === filter.key 
                            ? 'bg-background text-foreground' 
                            : 'bg-muted-foreground/20'
                        }`}
                      >
                        {filter.count}
                      </Badge>
                    )}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Liste des conversations avec scroll */}
          <div 
            ref={conversationsListRef}
            className="flex-1 overflow-y-auto h-0 min-h-0"
          >
            <div className="space-y-1 p-2">
              {filteredConversations.length > 0 ? (
                filteredConversations.map((conversation) => (
                  <div
                    key={conversation.id}
                    className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all duration-200 border-l-4 ${
                      selectedConversation === conversation.id
                        ? 'bg-primary/10 border border-primary/20 shadow-sm'
                        : 'hover:bg-accent'
                    } ${getPriorityColor(conversation.priority)}`}
                    onClick={() => setSelectedConversation(conversation.id)}
                  >
                    <div className="relative flex-shrink-0">
                      <div className="size-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                        {conversation.name.charAt(0)}
                      </div>
                      {conversation.isOnline && (
                        <div className="absolute -bottom-1 -right-1 size-3 bg-green-500 rounded-full border-2 border-card"></div>
                      )}
                      {!conversation.isAssigned && (
                        <div className="absolute -top-1 -right-1 size-3 bg-orange-500 rounded-full border-2 border-card"></div>
                      )}
                      {conversation.isMuted && (
                        <div className="absolute -top-1 -left-1 size-3 bg-gray-500 rounded-full border-2 border-card"></div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2 min-w-0">
                          <span className="font-semibold truncate">{conversation.name}</span>
                          {getPriorityIcon(conversation.priority)}
                          {!conversation.isAssigned && (
                            <Badge variant="outline" className="text-xs bg-orange-500/20 text-orange-600 flex-shrink-0">
                              Non assigné
                            </Badge>
                          )}
                          {conversation.isMuted && (
                            <BellOff className="size-3 text-muted-foreground flex-shrink-0" />
                          )}
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <span className="text-xs text-muted-foreground whitespace-nowrap">{conversation.timestamp}</span>
                          {conversation.unread > 0 && (
                            <Badge className="bg-blue-500 text-white size-5 flex items-center justify-center p-0 text-xs min-w-5">
                              {conversation.unread}
                            </Badge>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-muted-foreground truncate flex-1">
                          {conversation.lastMessage}
                        </p>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation()
                            setShowDeleteConfirm(conversation.id)
                          }}
                          className="opacity-0 group-hover:opacity-100 size-6 p-0 hover:bg-destructive hover:text-destructive-foreground transition-all flex-shrink-0 ml-2"
                        >
                          <Trash2 className="size-3" />
                        </Button>
                      </div>
                      {conversation.labels.length > 0 && (
                        <div className="flex gap-1 mt-1 overflow-hidden">
                          {conversation.labels.slice(0, 2).map((label, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs truncate flex-shrink-0">
                              {label}
                            </Badge>
                          ))}
                          {conversation.labels.length > 2 && (
                            <Badge variant="outline" className="text-xs">
                              +{conversation.labels.length - 2}
                            </Badge>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <MessageCircle className="size-12 mx-auto mb-2 opacity-50" />
                  <p>Aucune conversation trouvée</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className={`flex-1 flex flex-col min-h-0 ${
          !sidebarOpen ? 'w-full' : ''
        }`}>
          {/* Header */}
          <div className="border-b border-border p-4 flex-shrink-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                {!sidebarOpen && (
                  <button 
                    onClick={toggleSidebar}
                    className="p-2 text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg transition-all duration-200 hover:scale-105"
                  >
                    <Menu className="size-6" />
                  </button>
                )}
                
                {currentConversation ? (
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="size-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                        {currentConversation.name.charAt(0)}
                      </div>
                      {currentConversation.isOnline && (
                        <div className="absolute -bottom-1 -right-1 size-3 bg-green-500 rounded-full border-2 border-background"></div>
                      )}
                      {currentConversation.isMuted && (
                        <div className="absolute -top-1 -left-1 size-3 bg-gray-500 rounded-full border-2 border-background"></div>
                      )}
                    </div>
                    <div>
                      <h2 className="font-semibold">{currentConversation.name}</h2>
                      <p className="text-sm text-muted-foreground">
                        {currentConversation.isOnline ? 'En ligne' : `Vu ${currentConversation.lastSeen}`}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div>
                    <h2 className="font-semibold">Messages</h2>
                    <p className="text-sm text-muted-foreground">Sélectionnez une conversation</p>
                  </div>
                )}
              </div>

              {currentConversation && (
                <div className="flex items-center gap-2">
                  {/* Bulk actions button */}
                  {bulkActions.length > 0 && (
                    <div className="relative">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setShowBulkMenu(!showBulkMenu)}
                        className="flex items-center gap-2"
                      >
                        <span>{bulkActions.length} sélectionné(s)</span>
                        <MoreHorizontal className="size-4" />
                      </Button>
                      {showBulkMenu && (
                        <div className="absolute top-full right-0 mt-1 w-48 bg-card border border-border rounded-lg shadow-lg z-50">
                          <div className="p-2">
                            <button
                              onClick={handleBulkDelete}
                              className="flex items-center gap-3 w-full px-3 py-2 text-sm rounded-md hover:bg-accent transition-colors text-red-600"
                            >
                              <Trash2 className="size-4" />
                              Supprimer la sélection
                            </button>
                            <button
                              onClick={handleBulkExport}
                              className="flex items-center gap-3 w-full px-3 py-2 text-sm rounded-md hover:bg-accent transition-colors"
                            >
                              <Download className="size-4" />
                              Exporter la sélection
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => handleCall('audio')}
                    disabled={callStatus !== 'idle'}
                  >
                    <Phone className="size-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => handleCall('video')}
                    disabled={callStatus !== 'idle'}
                  >
                    <Video className="size-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={handleInfo}>
                    <Info className="size-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => setShowExportModal(true)}
                    title="Exporter la conversation"
                  >
                    <Download className="size-4" />
                  </Button>
                  <div className="relative" ref={moreMenuRef}>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowMoreMenu(!showMoreMenu)}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      <MoreHorizontal className="size-4" />
                    </Button>
                    
                    {showMoreMenu && (
                      <div className="absolute top-full right-0 mt-1 w-48 bg-card border border-border rounded-lg shadow-lg z-50">
                        <div className="p-2">
                          <button
                            onClick={() => {
                              handleArchiveConversation(currentConversation.id, { stopPropagation: () => {} } as React.MouseEvent)
                              setShowMoreMenu(false)
                            }}
                            className="flex items-center gap-3 w-full px-3 py-2 text-sm rounded-md hover:bg-accent transition-colors"
                          >
                            <Archive className="size-4" />
                            {currentConversation.isArchived ? 'Désarchiver' : 'Archiver'}
                          </button>
                          <button
                            onClick={() => {
                              handleMuteConversation(currentConversation.id)
                              setShowMoreMenu(false)
                            }}
                            className="flex items-center gap-3 w-full px-3 py-2 text-sm rounded-md hover:bg-accent transition-colors"
                          >
                            {currentConversation.isMuted ? <Bell className="size-4" /> : <BellOff className="size-4" />}
                            {currentConversation.isMuted ? 'Activer les notifications' : 'Désactiver les notifications'}
                          </button>
                          <button
                            onClick={() => {
                              handleBlockConversation(currentConversation.id)
                              setShowMoreMenu(false)
                            }}
                            className="flex items-center gap-3 w-full px-3 py-2 text-sm rounded-md hover:bg-accent transition-colors"
                          >
                            <Shield className="size-4" />
                            {currentConversation.isBlocked ? 'Débloquer' : 'Bloquer'}
                          </button>
                          <button
                            onClick={() => {
                              handleAssignConversation(currentConversation.id)
                              setShowMoreMenu(false)
                            }}
                            className="flex items-center gap-3 w-full px-3 py-2 text-sm rounded-md hover:bg-accent transition-colors"
                          >
                            <User className="size-4" />
                            {currentConversation.isAssigned ? 'Désassigner' : 'Assigner'}
                          </button>
                          <button
                            onClick={() => {
                              setShowDeleteConfirm(currentConversation.id)
                              setShowMoreMenu(false)
                            }}
                            className="flex items-center gap-3 w-full px-3 py-2 text-sm rounded-md hover:bg-destructive hover:text-destructive-foreground transition-colors text-red-600"
                          >
                            <Trash2 className="size-4" />
                            Supprimer
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Messages Area */}
<div className="flex-1 overflow-y-auto p-4 bg-muted/30 min-h-0">
  {currentConversation ? (
    <div className="max-w-4xl mx-auto space-y-4">
      {/* Reply preview */}
      {replyToMessage && (
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3 mb-4">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 text-sm text-blue-700 dark:text-blue-300 mb-1">
                <Reply className="size-3" />
                <span>Réponse à {replyToMessage.isUser ? 'vous' : currentConversation.name}</span>
              </div>
              <p className="text-sm text-blue-900 dark:text-blue-100 truncate">
                {replyToMessage.content}
              </p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setReplyToMessage(null)}
              className="text-blue-600 hover:text-blue-800 size-6 p-0"
            >
              <X className="size-3" />
            </Button>
          </div>
        </div>
      )}

      {messages.map((message) => {
        const repliedMessage = message.replyTo ? messages.find(m => m.id === message.replyTo) : null
        
        return (
          <div
            key={message.id}
            className={`flex ${message.isUser ? 'justify-end' : 'justify-start'} group relative`}
            onContextMenu={(e) => {
              e.preventDefault()
              setSelectedMessage(message.id)
            }}
          >
            {/* FIXED: Better designed bulk selection checkbox */}
            <div className={`absolute top-2 transition-all duration-200 ${
              bulkActions.length > 0 ? 'opacity-100 scale-100' : 'opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100'
            } ${message.isUser ? 'right-2' : 'left-2'}`}>
              <div className={`relative flex items-center justify-center size-5 rounded-md border-2 transition-all duration-200 ${
                bulkActions.includes(message.id) 
                  ? 'bg-blue-500 border-blue-500 shadow-sm' 
                  : 'bg-background/95 border-border/80 backdrop-blur-sm hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-500/20'
              }`}>
                <input
                  type="checkbox"
                  checked={bulkActions.includes(message.id)}
                  onChange={() => toggleBulkSelect(message.id)}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />
                {bulkActions.includes(message.id) && (
                  <Check className="size-3.5 text-white font-bold" />
                )}
              </div>
            </div>

            {/* Message context menu */}
            {selectedMessage === message.id && (
              <div className={`absolute top-0 bg-card border border-border rounded-lg shadow-lg z-40 w-48 ${
                message.isUser ? 'right-0' : 'left-0'
              }`}>
                <div className="p-2">
                  <button
                    onClick={() => handleReplyToMessage(message)}
                    className="flex items-center gap-3 w-full px-3 py-2 text-sm rounded-md hover:bg-accent transition-colors"
                  >
                    <Reply className="size-4" />
                    Répondre
                  </button>
                  <button
                    onClick={() => handleCopyMessage(message.content)}
                    className="flex items-center gap-3 w-full px-3 py-2 text-sm rounded-md hover:bg-accent transition-colors"
                  >
                    <Copy className="size-4" />
                    Copier
                  </button>
                  <button
                    onClick={() => handleForwardMessage(message)}
                    className="flex items-center gap-3 w-full px-3 py-2 text-sm rounded-md hover:bg-accent transition-colors"
                  >
                    <Forward className="size-4" />
                    Transférer
                  </button>
                  <button
                    onClick={() => handlePinMessage(message.id)}
                    className="flex items-center gap-3 w-full px-3 py-2 text-sm rounded-md hover:bg-accent transition-colors"
                  >
                    <Pin className="size-4" />
                    {message.isPinned ? 'Désépingler' : 'Épingler'}
                  </button>
                  <button
                    onClick={() => toggleBulkSelect(message.id)}
                    className="flex items-center gap-3 w-full px-3 py-2 text-sm rounded-md hover:bg-accent transition-colors"
                  >
                    <Check className="size-4" />
                    Sélectionner
                  </button>
                </div>
              </div>
            )}

            <div
              className={`max-w-[85%] rounded-2xl p-3 transition-all duration-200 ${
                message.isUser
                  ? 'bg-primary text-primary-foreground rounded-br-sm'
                  : 'bg-card border border-border rounded-bl-sm'
              } ${message.isPinned ? 'ring-2 ring-yellow-400' : ''} ${
                bulkActions.includes(message.id) ? 'ring-2 ring-blue-500 bg-blue-50 dark:bg-blue-500/10 border-blue-200 dark:border-blue-500/30' : ''
              }`}
            >
              {/* Reply indicator */}
              {repliedMessage && (
                <div className={`mb-2 p-2 rounded-lg border-l-2 ${
                  message.isUser 
                    ? 'border-l-blue-300 bg-blue-500/20' 
                    : 'border-l-gray-300 bg-gray-500/20'
                }`}>
                  <div className="flex items-center gap-1 text-xs opacity-75 mb-1">
                    <Reply className="size-3" />
                    <span>{repliedMessage.isUser ? 'Vous' : currentConversation.name}</span>
                  </div>
                  <p className="text-xs truncate">{repliedMessage.content}</p>
                </div>
              )}

              {/* Pinned indicator */}
              {message.isPinned && (
                <div className="flex items-center gap-1 text-xs text-yellow-600 dark:text-yellow-400 mb-2">
                  <Pin className="size-3" />
                  <span>Message épinglé</span>
                </div>
              )}

              {/* Image Message */}
              {message.type === 'image' && (
                <div className="mb-1">
                  <div className="relative group">
                    <div className="bg-muted rounded-lg overflow-hidden border border-border">
                      <div className="aspect-square w-48 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 flex items-center justify-center">
                        <div className="text-center p-3">
                          <ImageIcon className="size-8 mx-auto mb-1 text-blue-500" />
                          <p className="text-xs font-medium text-foreground">Image</p>
                          <p className="text-[10px] text-muted-foreground mt-0.5">Cliquez pour voir</p>
                        </div>
                      </div>
                    </div>
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-200 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="bg-white/90 text-foreground hover:bg-white size-8 rounded-full p-0"
                      >
                        <Search className="size-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {/* File Message */}
              {message.type === 'file' && (
                <div className="mb-1">
                  <div className="bg-muted rounded-lg p-3 border border-border">
                    <div className="flex items-center gap-2">
                      <div className="bg-blue-500/20 p-1.5 rounded-lg">
                        <FileText className="size-4 text-blue-500" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-xs text-foreground">Document</p>
                        <p className="text-[10px] text-muted-foreground">PDF • 2.4 MB</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-blue-500 hover:text-blue-600 hover:bg-blue-500/10 size-6 p-0"
                      >
                        <Download className="size-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {/* Audio Message */}
              {message.type === 'audio' && (
                <div className="mb-1">
                  <div className="bg-muted rounded-lg p-3 border border-border">
                    <div className="flex items-center gap-2">
                      <div className="relative">
                        <div className="bg-green-500/20 p-1.5 rounded-lg">
                          <Mic className="size-4 text-green-500" />
                        </div>
                        {message.isUser && (
                          <div className="absolute -top-0.5 -right-0.5 size-2 bg-green-500 rounded-full border border-background"></div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-xs text-foreground">Audio</p>
                        <p className="text-[10px] text-muted-foreground">0:24</p>
                      </div>
                      <div className="flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-foreground hover:bg-accent size-6 p-0"
                        >
                          {/* Simple play triangle SVG */}
                          <svg className="size-3 ml-0.5" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M8 5v14l11-7z"/>
                          </svg>
                        </Button>
                        <div className="w-16 bg-accent rounded-full h-1">
                          <div className="bg-green-500 h-1 rounded-full w-1/3"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Text Message */}
              {message.type === 'text' && (
                <p className="text-sm whitespace-pre-wrap break-words">{message.content}</p>
              )}

              {/* Message timestamp and status */}
              <div className={`flex items-center gap-2 mt-2 text-xs ${
                message.isUser ? 'text-primary-foreground/70' : 'text-muted-foreground'
              }`}>
                <span>{message.timestamp}</span>
                {message.isUser && (
                  <>
                    {message.status === 'sent' && <Check className="size-3" />}
                    {message.status === 'delivered' && <CheckCheck className="size-3" />}
                    {message.status === 'read' && <CheckCheck className="size-3 text-blue-300" />}
                  </>
                )}
              </div>
            </div>
          </div>
        )
      })}
      <div ref={messagesEndRef} />
    </div>
  ) : (
    <div className="flex flex-col items-center justify-center h-full text-center">
      <MessageCircle className="size-24 text-muted-foreground/50 mb-4" />
      <h3 className="text-lg font-semibold mb-2">Aucune conversation sélectionnée</h3>
      <p className="text-muted-foreground mb-6">
        Sélectionnez une conversation existante ou démarrez-en une nouvelle
      </p>
      <Button onClick={handleNewConversation} className="flex items-center gap-2">
        <Plus className="size-4" />
        Nouvelle conversation
      </Button>
    </div>
  )}
</div>
          {/* Input Area */}
          {currentConversation && (
            <div className="border-t border-border bg-background flex-shrink-0">
              <div className="max-w-4xl mx-auto p-4">
                <div className="flex items-end gap-2">
                  {/* Left action buttons */}
                  <div className="flex gap-1 flex-shrink-0">
                    <div className="relative" ref={uploadMenuRef}>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowUploadMenu(!showUploadMenu)}
                        className="text-muted-foreground hover:text-foreground size-10 p-0"
                      >
                        <Paperclip className="size-5" />
                      </Button>
                      {showUploadMenu && (
                        <div className="absolute bottom-full left-0 mb-2 w-48 bg-card border border-border rounded-lg shadow-lg z-50">
                          <div className="p-2">
                            <button
                              onClick={() => handleUploadFile('image')}
                              className="flex items-center gap-3 w-full px-3 py-2 text-sm rounded-md hover:bg-accent transition-colors"
                            >
                              <ImageIcon className="size-4" />
                              Image
                            </button>
                            <button
                              onClick={() => handleUploadFile('document')}
                              className="flex items-center gap-3 w-full px-3 py-2 text-sm rounded-md hover:bg-accent transition-colors"
                            >
                              <FileText className="size-4" />
                              Document
                            </button>
                            <button
                              onClick={() => handleUploadFile('other')}
                              className="flex items-center gap-3 w-full px-3 py-2 text-sm rounded-md hover:bg-accent transition-colors"
                            >
                              <Upload className="size-4" />
                              Autre fichier
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleVoiceMessage}
                      className={`text-muted-foreground hover:text-foreground size-10 p-0 ${
                        isRecording ? 'text-red-500 animate-pulse' : ''
                      }`}
                    >
                      {isRecording ? <Square className="size-5" /> : <Mic className="size-5" />}
                    </Button>
                  </div>
                  
                  {/* Message input */}
                  <div className="flex-1 min-w-0">
                    <div className="relative bg-background border border-border rounded-lg focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary transition-all duration-200">
                      <textarea
                        ref={textareaRef}
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Tapez votre message..."
                        className="w-full min-h-[44px] max-h-[120px] py-3 pl-3 pr-10 resize-none bg-transparent focus:outline-none text-sm"
                        rows={1}
                        style={{
                          height: 'auto',
                          overflowY: 'auto'
                        }}
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        className="absolute right-2 bottom-2 text-muted-foreground hover:text-foreground size-8 p-0"
                      >
                        <Smile className="size-4" />
                      </Button>
                    </div>
                  </div>
                  
                  {/* Send button */}
                  <Button 
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim()}
                    className="flex items-center justify-center size-10 p-0 flex-shrink-0 bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                    size="sm"
                  >
                    <Send className="size-4" />
                  </Button>
                </div>
                
                {/* Character count and tips */}
                {newMessage.length > 0 && (
                  <div className="flex justify-between items-center mt-2 px-1">
                    <div className="text-xs text-muted-foreground">
                      {newMessage.length} caractères
                    </div>
                    <div className="text-xs text-muted-foreground">
                      ⏎ pour envoyer
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}