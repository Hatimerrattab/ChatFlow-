"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from "recharts"
import { 
  Users, 
  MessageCircle, 
  Eye, 
  EyeOff, 
  TrendingUp, 
  Home,
  Settings,
  BarChart3,
  Mail,
  User,
  Bell,
  Search,
  ChevronDown,
  RefreshCw,
  Calendar,
  Moon,
  Sun,
  Menu,
  ChevronLeft,
  ChevronRight,
  X,
  CheckCircle,
  AlertCircle,
  Info
} from "lucide-react"
import { useEffect, useState } from "react"
import Link from 'next/link'

// Types
interface ConversationData {
  date: string;
  count: number;
}

interface DashboardStats {
  totalConversations: number;
  openConversations: number;
  closedConversations: number;
  hiddenConversations: number;
  uniqueCustomers: number;
  averageDuration: number;
  totalMessages: number;
  responseRate: number;
  satisfactionRate: number;
  resolutionRate: number;
}

interface PeakHour {
  hour: string;
  value: number;
}

interface Notification {
  id: string;
  type: 'info' | 'warning' | 'success' | 'error';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  action?: {
    label: string;
    onClick: () => void;
  };
}

// Mock API functions
const mockAPI = {
  getDashboardStats: async (): Promise<DashboardStats> => {
    await new Promise(resolve => setTimeout(resolve, 800));
    return {
      totalConversations: Math.floor(Math.random() * 100) + 300,
      openConversations: Math.floor(Math.random() * 50) + 100,
      closedConversations: Math.floor(Math.random() * 20),
      hiddenConversations: Math.floor(Math.random() * 50) + 100,
      uniqueCustomers: Math.floor(Math.random() * 100) + 300,
      averageDuration: Math.random() * 200 + 200,
      totalMessages: Math.floor(Math.random() * 500) + 1200,
      responseRate: Math.floor(Math.random() * 20) + 80,
      satisfactionRate: Math.floor(Math.random() * 15) + 85,
      resolutionRate: Math.floor(Math.random() * 25) + 75
    };
  },

  getConversationData: async (): Promise<ConversationData[]> => {
    await new Promise(resolve => setTimeout(resolve, 600));
    const dates = ["Sep 17", "Sep 20", "Sep 21", "Oct 9", "Oct 10", "Oct 17"];
    return dates.map(date => ({
      date,
      count: Math.floor(Math.random() * 60) + 10
    }));
  },

  getPeakHours: async (): Promise<PeakHour[]> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return ["15", "14", "13", "10", "11", "16"].map(hour => ({
      hour,
      value: Math.floor(Math.random() * 100) + 100
    }));
  },

  getMessageTrend: async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    return days.map(day => ({
      day,
      messages: Math.floor(Math.random() * 100) + 100
    }));
  },

  getNotifications: async (): Promise<Notification[]> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const notificationTypes: Notification['type'][] = ['info', 'warning', 'success', 'error'];
    const notificationTemplates = [
      {
        title: "New Message Received",
        message: "You have a new message from customer #${id}",
        type: 'info' as Notification['type']
      },
      {
        title: "High Response Time",
        message: "Average response time is above 5 minutes",
        type: 'warning' as Notification['type']
      },
      {
        title: "Conversation Resolved",
        message: "Conversation #${id} has been successfully resolved",
        type: 'success' as Notification['type']
      },
      {
        title: "System Alert",
        message: "Unusual activity detected in the messaging system",
        type: 'error' as Notification['type']
      },
      {
        title: "Performance Update",
        message: "Satisfaction rate increased by ${percent}% this week",
        type: 'success' as Notification['type']
      }
    ];

    const count = Math.floor(Math.random() * 3) + 1; // 1-3 new notifications
    const newNotifications: Notification[] = [];

    for (let i = 0; i < count; i++) {
      const template = notificationTemplates[Math.floor(Math.random() * notificationTemplates.length)];
      const message = template.message
        .replace('${id}', Math.floor(Math.random() * 1000).toString())
        .replace('${percent}', (Math.floor(Math.random() * 20) + 5).toString());

      newNotifications.push({
        id: `notif-${Date.now()}-${i}`,
        type: template.type,
        title: template.title,
        message,
        timestamp: new Date(),
        read: false
      });
    }

    return newNotifications;
  }
};

const COLORS = ["#10b981", "#3b82f6", "#f59e0b"];

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [conversationData, setConversationData] = useState<ConversationData[]>([]);
  const [peakHours, setPeakHours] = useState<PeakHour[]>([]);
  const [messageTrend, setMessageTrend] = useState<any[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());
  const [timeRange, setTimeRange] = useState<string>("week");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  // Fetch all data
  const fetchData = async () => {
    setLoading(true);
    try {
      const [
        statsData,
        conversationData,
        peakHoursData,
        messageTrendData,
        newNotifications
      ] = await Promise.all([
        mockAPI.getDashboardStats(),
        mockAPI.getConversationData(),
        mockAPI.getPeakHours(),
        mockAPI.getMessageTrend(),
        mockAPI.getNotifications()
      ]);

      setStats(statsData);
      setConversationData(conversationData);
      setPeakHours(peakHoursData);
      setMessageTrend(messageTrendData);
      
      // Add new notifications to existing ones
      setNotifications(prev => [...newNotifications, ...prev]);
      setLastUpdate(new Date());
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Auto-refresh data every 30 seconds
  useEffect(() => {
    fetchData();

    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  // Calculate trends
  const calculateTrend = (current: number, previous: number) => {
    if (previous === 0) return 100;
    return ((current - previous) / previous) * 100;
  };

  // Toggle sidebar function
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const toggleNotifications = () => {
    setNotificationsOpen(!notificationsOpen);
    // Mark all as read when opening notifications
    if (!notificationsOpen) {
      setNotifications(prev => prev.map(notif => ({ ...notif, read: true })));
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="size-4 text-green-500" />;
      case 'warning':
        return <AlertCircle className="size-4 text-yellow-500" />;
      case 'error':
        return <AlertCircle className="size-4 text-red-500" />;
      case 'info':
      default:
        return <Info className="size-4 text-blue-500" />;
    }
  };

  const getNotificationColor = (type: Notification['type']) => {
    switch (type) {
      case 'success':
        return 'border-l-green-500';
      case 'warning':
        return 'border-l-yellow-500';
      case 'error':
        return 'border-l-red-500';
      case 'info':
      default:
        return 'border-l-blue-500';
    }
  };

  const unreadCount = notifications.filter(notif => !notif.read).length;

  if (loading && !stats) {
    return (
      <div className="flex min-h-screen bg-background text-foreground">
        {/* Sidebar Skeleton */}
        {sidebarOpen && (
          <div className={`bg-card border-r border-border transition-all duration-300 ${
            isCollapsed ? 'w-20' : 'w-64'
          }`}>
            <div className="p-4">
              <div className="flex items-center justify-between mb-8">
                {!isCollapsed && (
                  <div className="flex items-center gap-3">
                    <div className="bg-gradient-to-r from-blue-500 to-purple-600 size-8 rounded-lg flex items-center justify-center">
                      <BarChart3 className="size-5 text-white" />
                    </div>
                    <span className="text-xl font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                      Dashboard
                    </span>
                  </div>
                )}
                <button 
                  onClick={toggleCollapse}
                  className="p-2 text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg transition-colors"
                  title={isCollapsed ? "Développer la sidebar" : "Réduire la sidebar"}
                >
                  {isCollapsed ? <ChevronRight className="size-6" /> : <ChevronLeft className="size-5" />}
                </button>
              </div>
            </div>
          </div>
        )}
  
        {/* Main Content Skeleton */}
        <div className={`flex-1 p-6 ${sidebarOpen ? '' : 'w-full'}`}>
          <div className="animate-pulse space-y-6">
            {/* Header Skeleton */}
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                {!sidebarOpen && (
                  <div className="bg-muted h-8 w-8 rounded"></div>
                )}
                <div>
                  <div className="bg-muted h-8 w-48 rounded mb-2"></div>
                  <div className="bg-muted h-4 w-32 rounded"></div>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="bg-muted h-10 w-48 rounded"></div>
                <div className="bg-muted h-10 w-10 rounded"></div>
                <div className="bg-muted h-10 w-32 rounded"></div>
              </div>
            </div>
  
            {/* Stats Cards Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <Card key={i} className="bg-card border-border">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <div className="bg-muted h-4 w-24 rounded"></div>
                    <div className="bg-muted size-4 rounded"></div>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-muted h-8 w-16 rounded mb-2"></div>
                    <div className="bg-muted h-3 w-20 rounded"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
  
            {/* Charts Skeleton */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2 bg-card border-border">
                <CardHeader>
                  <div className="bg-muted h-6 w-48 rounded"></div>
                </CardHeader>
                <CardContent>
                  <div className="bg-muted h-64 rounded"></div>
                </CardContent>
              </Card>
              <Card className="bg-card border-border">
                <CardHeader>
                  <div className="bg-muted h-6 w-32 rounded"></div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[...Array(3)].map((_, i) => (
                    <div key={i}>
                      <div className="flex justify-between mb-2">
                        <div className="bg-muted h-4 w-24 rounded"></div>
                        <div className="bg-muted h-4 w-8 rounded"></div>
                      </div>
                      <div className="bg-muted h-2 rounded"></div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="flex min-h-screen bg-background text-foreground">
      {/* Sidebar */}
      {sidebarOpen && (
        <div className={`bg-card border-r border-border transition-all duration-300 ${
          isCollapsed ? 'w-20' : 'w-64'
        }`}>
          <div className="p-4">
            {/* Logo and Controls */}
            <div className="flex items-center justify-between mb-8">
              {!isCollapsed && (
                <div className="flex items-center gap-3">
                  <div className="bg-gradient-to-r from-blue-500 to-purple-600 size-8 rounded-lg flex items-center justify-center">
                    <BarChart3 className="size-5 text-white" />
                  </div>
                  <span className="text-xl font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                    Dashboard
                  </span>
                </div>
              )}
              <button 
                onClick={toggleCollapse}
                className="p-2 text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg transition-colors"
                title={isCollapsed ? "Développer la sidebar" : "Réduire la sidebar"}
              >
                {isCollapsed ? <ChevronRight className="size-6" /> : <ChevronLeft className="size-5" />}
              </button>
            </div>

            {/* Navigation with larger icons */}
            <nav className="space-y-3">
              {[
                { icon: Home, label: "Tableau de bord", active: true, href: "/dashboard" },
                { icon: Mail, label: "Messages", active: false, href: "/messages" },
                { icon: Users, label: "Clients", active: false, href: "#"},
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
      )}
  
      {/* Main Content */}
      <div className={`flex-1 p-6 space-y-6 transition-all duration-300 ${
        sidebarOpen ? (isCollapsed ? 'ml-0' : '') : 'w-full'
      }`}>
        {/* Header */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            {/* Modern Menu Button */}
            {!sidebarOpen && (
              <button 
                onClick={toggleSidebar}
                className="p-2 text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg transition-all duration-200 hover:scale-105"
              >
                <Menu className="size-6" />
              </button>
            )}
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                Dashboard
              </h1>
              <p className="text-muted-foreground">
                {loading ? "Updating..." : `Last update: ${lastUpdate.toLocaleTimeString()}`}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            {/* Theme Toggle Button */}
            <button 
              onClick={() => document.documentElement.classList.toggle('dark')}
              className="p-2 text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg transition-colors"
              title="Toggle theme"
            >
              <Sun className="size-5 block dark:hidden" />
              <Moon className="size-5 hidden dark:block" />
            </button>
  
            {/* Time Range Selector */}
            <div className="flex items-center gap-2 bg-card border border-border rounded-lg px-3 py-2">
              <Calendar className="size-4 text-muted-foreground" />
              <select 
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="bg-transparent text-sm focus:outline-none"
              >
                <option value="today">Today</option>
                <option value="week">This week</option>
                <option value="month">This month</option>
                <option value="year">This year</option>
              </select>
            </div>
  
            {/* Refresh Button */}
            <button 
              onClick={fetchData}
              disabled={loading}
              className="p-2 text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`size-5 ${loading ? 'animate-spin' : ''}`} />
            </button>
            
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground size-4" />
              <input 
                type="text" 
                placeholder="Search..." 
                className="bg-card border border-border rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-primary transition-colors"
              />
            </div>
            
            {/* Notifications */}
            <div className="relative">
              <button 
                onClick={toggleNotifications}
                className="relative p-2 text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg transition-colors"
              >
                <Bell className="size-5" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 size-4 bg-red-500 rounded-full border-2 border-background text-[10px] font-medium flex items-center justify-center text-white">
                    {unreadCount > 9 ? '9+' : unreadCount}
                  </span>
                )}
              </button>

              {/* Notifications Dropdown */}
              {notificationsOpen && (
                <div className="absolute right-0 top-12 w-80 bg-card border border-border rounded-lg shadow-lg z-50">
                  <div className="p-4 border-b border-border">
                    <div className="flex justify-between items-center">
                      <h3 className="font-semibold text-foreground">Notifications</h3>
                      <div className="flex gap-2">
                        {notifications.length > 0 && (
                          <button 
                            onClick={clearAllNotifications}
                            className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                          >
                            Clear all
                          </button>
                        )}
                        <button 
                          onClick={toggleNotifications}
                          className="p-1 hover:bg-accent rounded transition-colors"
                        >
                          <X className="size-4" />
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="max-h-96 overflow-y-auto">
                    {notifications.length === 0 ? (
                      <div className="p-4 text-center text-muted-foreground">
                        <Bell className="size-8 mx-auto mb-2 opacity-50" />
                        <p>No notifications</p>
                      </div>
                    ) : (
                      notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className={`p-4 border-b border-border hover:bg-accent/50 transition-colors ${
                            !notification.read ? 'bg-blue-50 dark:bg-blue-950/20' : ''
                          } ${getNotificationColor(notification.type)} border-l-4`}
                        >
                          <div className="flex justify-between items-start mb-2">
                            <div className="flex items-center gap-2">
                              {getNotificationIcon(notification.type)}
                              <span className="font-medium text-sm text-foreground">
                                {notification.title}
                              </span>
                            </div>
                            <button
                              onClick={() => deleteNotification(notification.id)}
                              className="p-1 hover:bg-accent rounded transition-colors opacity-0 group-hover:opacity-100"
                            >
                              <X className="size-3" />
                            </button>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">
                            {notification.message}
                          </p>
                          <div className="flex justify-between items-center">
                            <span className="text-xs text-muted-foreground">
                              {notification.timestamp.toLocaleTimeString()}
                            </span>
                            {!notification.read && (
                              <button
                                onClick={() => markAsRead(notification.id)}
                                className="text-xs text-blue-500 hover:text-blue-600 transition-colors"
                              >
                                Mark as read
                              </button>
                            )}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>
            
            {/* User Menu */}
            <div className="flex items-center gap-2 bg-card border border-border rounded-lg px-3 py-2">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 size-8 rounded-full flex items-center justify-center">
                <User className="size-4 text-white" />
              </div>
              <span className="text-sm">Admin</span>
              <ChevronDown className="size-4 text-muted-foreground" />
            </div>
          </div>
        </div>

        {/* Rest of the content remains the same */}
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-br from-card to-card/80 border-border hover:border-blue-500/50 transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Conversations</CardTitle>
              <Users className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">
                {loading ? "..." : stats?.totalConversations.toLocaleString()}
              </div>
              <div className="flex items-center text-xs text-green-500 mt-1">
                <TrendingUp className="h-3 w-3 mr-1" />
                +{calculateTrend(stats?.totalConversations || 0, 280).toFixed(1)}% this week
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-card to-card/80 border-border hover:border-green-500/50 transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Open Conversations</CardTitle>
              <MessageCircle className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">
                {loading ? "..." : stats?.openConversations}
              </div>
              <div className="text-xs text-muted-foreground mt-1">Real-time</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-card to-card/80 border-border hover:border-gray-500/50 transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Closed Conversations</CardTitle>
              <EyeOff className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">
                {loading ? "..." : stats?.closedConversations}
              </div>
              <div className="text-xs text-muted-foreground mt-1">This week</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-card to-card/80 border-border hover:border-orange-500/50 transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Hidden Conversations</CardTitle>
              <Eye className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">
                {loading ? "..." : stats?.hiddenConversations}
              </div>
              <div className="text-xs text-muted-foreground mt-1">Total</div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Daily Conversations */}
          <Card className="lg:col-span-2 bg-gradient-to-br from-card to-card/80 border-border">
            <CardHeader>
              <CardTitle className="text-foreground">Daily Conversations</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="h-64 flex items-center justify-center">
                  <RefreshCw className="size-8 animate-spin text-muted-foreground" />
                </div>
              ) : (
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={conversationData}>
                    <XAxis 
                      dataKey="date" 
                      stroke="#666" 
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis 
                      stroke="#666" 
                      axisLine={false}
                      tickLine={false}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: "hsl(var(--card))", 
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                        color: "hsl(var(--foreground))"
                      }} 
                    />
                    <Bar 
                      dataKey="count" 
                      fill="#3b82f6" 
                      radius={[4, 4, 0, 0]}
                      className="hover:opacity-80 transition-opacity"
                    />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>

          {/* Performance Metrics */}
          <Card className="bg-gradient-to-br from-card to-card/80 border-border">
            <CardHeader>
              <CardTitle className="text-foreground">Performance</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {loading ? (
                <div className="space-y-4">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="space-y-2">
                      <div className="flex justify-between">
                        <div className="bg-muted h-4 w-24 rounded"></div>
                        <div className="bg-muted h-4 w-8 rounded"></div>
                      </div>
                      <div className="bg-muted h-2 rounded"></div>
                    </div>
                  ))}
                </div>
              ) : (
                <>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Response Rate</span>
                      <span className="font-semibold text-foreground">{stats?.responseRate}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className="h-2 rounded-full transition-all duration-500"
                        style={{ 
                          width: `${stats?.responseRate}%`,
                          backgroundColor: COLORS[0]
                        }}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Satisfaction</span>
                      <span className="font-semibold text-foreground">{stats?.satisfactionRate}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className="h-2 rounded-full transition-all duration-500"
                        style={{ 
                          width: `${stats?.satisfactionRate}%`,
                          backgroundColor: COLORS[1]
                        }}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Resolution</span>
                      <span className="font-semibold text-foreground">{stats?.resolutionRate}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className="h-2 rounded-full transition-all duration-500"
                        style={{ 
                          width: `${stats?.resolutionRate}%`,
                          backgroundColor: COLORS[2]
                        }}
                      />
                    </div>
                  </div>
                  <div className="pt-4 border-t border-border space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Unique Customers</span>
                      <span className="font-semibold text-foreground">{stats?.uniqueCustomers}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Average Duration</span>
                      <span className="font-semibold text-foreground">{stats?.averageDuration.toFixed(2)} min</span>
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Bottom Charts Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Messages Trend */}
          <Card className="bg-gradient-to-br from-card to-card/80 border-border">
            <CardHeader>
              <CardTitle className="text-foreground">Messages Trend</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="h-64 flex items-center justify-center">
                  <RefreshCw className="size-8 animate-spin text-muted-foreground" />
                </div>
              ) : (
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={messageTrend}>
                    <XAxis 
                      dataKey="day" 
                      stroke="#666"
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis 
                      stroke="#666"
                      axisLine={false}
                      tickLine={false}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: "hsl(var(--card))", 
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                        color: "hsl(var(--foreground))"
                      }} 
                    />
                    <Line 
                      type="monotone" 
                      dataKey="messages" 
                      stroke="#10b981" 
                      strokeWidth={3}
                      dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
                      activeDot={{ r: 6, fill: '#10b981' }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>

          {/* Peak Hours */}
          <Card className="bg-gradient-to-br from-card to-card/80 border-border">
            <CardHeader>
              <CardTitle className="text-foreground">Peak Hours</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="h-64 flex items-center justify-center">
                  <RefreshCw className="size-8 animate-spin text-muted-foreground" />
                </div>
              ) : (
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={peakHours}>
                    <XAxis 
                      dataKey="hour" 
                      stroke="#666"
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis 
                      stroke="#666"
                      axisLine={false}
                      tickLine={false}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: "hsl(var(--card))", 
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                        color: "hsl(var(--foreground))"
                      }} 
                    />
                    <Bar 
                      dataKey="value" 
                      fill="#f59e0b" 
                      radius={[4, 4, 0, 0]}
                      className="hover:opacity-80 transition-opacity"
                    />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Messages Overview */}
        <Card className="bg-gradient-to-br from-card to-card/80 border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <MessageCircle className="h-5 w-5 text-blue-500" />
              Messages Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center">
              {loading ? (
                <div className="h-64 flex items-center justify-center">
                  <RefreshCw className="size-8 animate-spin text-muted-foreground" />
                </div>
              ) : (
                <div className="relative">
                  <ResponsiveContainer width={200} height={200}>
                    <PieChart>
                      <Pie
                        data={[{ name: "Messages", value: stats?.totalMessages || 0 }]}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        dataKey="value"
                      >
                        <Cell fill="#10b981" />
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="absolute inset-0 flex items-center justify-center flex-col">
                    <p className="text-2xl font-bold text-foreground">
                      {stats?.totalMessages.toLocaleString()}
                    </p>
                    <p className="text-muted-foreground text-sm">Messages</p>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}