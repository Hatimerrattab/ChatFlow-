"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { 
  Settings,
  Users,
  MessageCircle,
  Bot,
  Camera,
  Globe,
  FileText,
  Save,
  RefreshCw,
  Home,
  Mail,
  User,
  Menu,
  BarChart3,
  ChevronLeft,
  ChevronRight,
  Tag,
  Key,
  MessageSquare,
  Trash2,
  ChevronUp,
  ChevronDown,
  Power,
  CheckCircle,
  Circle,
} from "lucide-react"
import { useState } from "react"
import Link from 'next/link'

type SettingsSection = 'profile' | 'team' | 'quick-replies' | 'contact-labels' | 'auto-assignment' | 'conversation-labels' | 'conversation-settings' | 'whatsapp-widget' | 'api-keys'

export default function SettingsPage() {
  // États principaux
  const [activeSection, setActiveSection] = useState<SettingsSection>('profile')
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [isCollapsed, setIsCollapsed] = useState(false)

  // Données de configuration
  const [settingsData, setSettingsData] = useState({
    profile: {
      name: "Mon Entreprise",
      address: "address",
      email: "email",
      category: "Commerce de détail",
      description: "Votre partenaire de confiance pour des produits de qualité",
      website: "https://monentreprise.com"
    },
    team: {
      teamName: "Équipe Commerciale",
      members: 5,
      adminEmail: "admin@monentreprise.com",
      permissions: "Complet"
    },
    quickReplies: {
      greeting: "Bonjour ! Comment puis-je vous aider ?",
      availability: "Nos horaires d'ouverture sont du lundi au vendredi de 9h à 18h.",
      thanks: "Merci de nous avoir contactés !"
    }
  })

  // États pour les étiquettes de contact
  const [labelsState, setLabelsState] = useState({
    contactLabels: [
      { id: 1, name: "Client Fidèle", color: "bg-blue-500", count: 23 },
      { id: 2, name: "Prospect", color: "bg-green-500", count: 45 },
      { id: 3, name: "En Attente", color: "bg-yellow-500", count: 18 },
      { id: 4, name: "VIP", color: "bg-purple-500", count: 8 },
      { id: 5, name: "À Rappeler", color: "bg-red-500", count: 12 },
      { id: 6, name: "Client Inactif", color: "bg-gray-500", count: 50 }
    ],
    searchTerm: "",
    filter: "all",
    isCreating: false,
    newLabel: { name: "", color: "bg-blue-500" }
  })

  // États pour l'assignation automatique
  const [assignmentState, setAssignmentState] = useState({
    rules: [
      { 
        id: 1, 
        name: "Par disponibilité", 
        enabled: true, 
        type: "availability",
        description: "Assigner aux agents disponibles",
        priority: 1
      },
      { 
        id: 2, 
        name: "Round Robin", 
        enabled: true, 
        type: "round_robin",
        description: "Répartir équitablement entre les agents",
        priority: 2
      },
      { 
        id: 3, 
        name: "Par compétence", 
        enabled: false, 
        type: "skills",
        description: "Basé sur les compétences de l'agent",
        priority: 3
      },
      { 
        id: 4, 
        name: "Par langue", 
        enabled: true, 
        type: "language",
        description: "Assigner selon la langue du client",
        priority: 4
      }
    ],
    workingHours: {
      enabled: true,
      startTime: "09:00",
      endTime: "18:00",
      timezone: "Europe/Paris"
    },
    overflowSettings: {
      maxQueueSize: 10,
      overflowAction: "redirect",
      redirectTo: "support@entreprise.com"
    },
    isAddingRule: false,
    newRule: {
      name: "",
      type: "availability",
      description: "",
      priority: 5
    }
  })

  // États pour les étiquettes de conversation
  const [conversationLabels, setConversationLabels] = useState([
    { 
      id: 1, 
      name: "En attente", 
      color: "bg-yellow-500", 
      count: 12,
      description: "Conversations en attente de réponse",
      autoApply: false
    },
    { 
      id: 2, 
      name: "Urgent", 
      color: "bg-red-500", 
      count: 5,
      description: "Demandes nécessitant une réponse immédiate",
      autoApply: false
    },
    { 
      id: 3, 
      name: "Résolu", 
      color: "bg-green-500", 
      count: 45,
      description: "Conversations terminées avec succès",
      autoApply: true
    },
    { 
      id: 4, 
      name: "Suivi requis", 
      color: "bg-blue-500", 
      count: 8,
      description: "Nécessite un suivi supplémentaire",
      autoApply: false
    }
  ])

  const [widgetConfig, setWidgetConfig] = useState({
    enabled: true,
    phoneNumber: "+33 1 23 45 67 89",
    defaultMessage: "Bonjour ! Comment pouvons-nous vous aider ?",
    position: "bottom-right",
    accentColor: "whatsapp-green",
    showOutsideHours: false,
    delayEnabled: true,
    delaySeconds: 10,
    generatedCode: ""
  });

  const [conversationSettings, setConversationSettings] = useState({
    welcomeMessages: true,
    offlineReplies: true,
    conversationTransfer: true,
    hidePhoneNumbers: true,
    autoArchive: false,
    notificationEmail: "admin@monentreprise.com",
    reportFrequency: "daily"
  });

  // Ajoutez ces états avec les autres états principaux dans SettingsPage
const [apiKeys, setApiKeys] = useState([
  {
    id: 1,
    name: "Clé de production",
    key: "sk_prod_••••••••••••••••••••••••",
    created: "2024-01-15",
    lastUsed: "2024-11-20",
    permissions: ["read", "write"],
    status: "active" as const,
    usage: 1250
  },
  {
    id: 2,
    name: "Clé de développement",
    key: "sk_dev_•••••••••••••••••••••••••",
    created: "2024-01-10",
    lastUsed: "2024-11-18",
    permissions: ["read"],
    status: "active" as const,
    usage: 342
  },
  {
    id: 3,
    name: "Ancienne clé",
    key: "sk_old_•••••••••••••••••••••••••",
    created: "2024-01-01",
    lastUsed: "2024-10-15",
    permissions: ["read", "write"],
    status: "inactive" as const,
    usage: 0
  }
]);

const [showApiKeyForm, setShowApiKeyForm] = useState(false);
const [newApiKey, setNewApiKey] = useState({
  name: "",
  permissions: ["read"] as string[],
  expiresIn: "30"
});
const [generatedApiKey, setGeneratedApiKey] = useState<string | null>(null);
const [showApiKey, setShowApiKey] = useState<number | null>(null);

// Fonctions pour gérer les clés API (ajoutez-les avec les autres handlers)
const generateApiKey = () => {
  if (!newApiKey.name.trim()) {
    alert("Veuillez donner un nom à votre clé API");
    return;
  }

  const randomKey = `sk_${Math.random().toString(36).substring(2, 15)}_${Math.random().toString(36).substring(2, 15)}`;
  
  const newKey = {
    id: Date.now(),
    name: newApiKey.name,
    key: randomKey,
    created: new Date().toISOString().split('T')[0],
    lastUsed: "Jamais",
    permissions: newApiKey.permissions,
    status: "active" as const,
    usage: 0
  };

  setApiKeys(prev => [newKey, ...prev]);
  setGeneratedApiKey(randomKey);
  setShowApiKeyForm(false);
  setNewApiKey({ name: "", permissions: ["read"], expiresIn: "30" });
};

const revokeApiKey = (id: number) => {
  if (confirm("Êtes-vous sûr de vouloir révoquer cette clé API ? Cette action est irréversible.")) {
    setApiKeys(prev => prev.map(key => 
      key.id === id ? { ...key, status: "inactive" } : key
    ));
  }
};

const regenerateApiKey = (id: number) => {
  if (confirm("Êtes-vous sûr de vouloir régénérer cette clé API ? L'ancienne clé ne fonctionnera plus.")) {
    const newKey = `sk_${Math.random().toString(36).substring(2, 15)}_${Math.random().toString(36).substring(2, 15)}`;
    
    setApiKeys(prev => prev.map(apiKey => 
      apiKey.id === id 
        ? { 
            ...apiKey, 
            key: newKey, 
            lastUsed: "Jamais",
            usage: 0
          } 
        : apiKey
    ));
    
    setGeneratedApiKey(newKey);
  }
};

const deleteApiKey = (id: number) => {
  if (confirm("Êtes-vous sûr de vouloir supprimer définitivement cette clé API ?")) {
    setApiKeys(prev => prev.filter(key => key.id !== id));
  }
};

const copyToClipboard = (key: string) => {
  navigator.clipboard.writeText(key);
  alert("Clé API copiée dans le presse-papier !");
};

const toggleApiKeyVisibility = (id: number) => {
  setShowApiKey(prev => prev === id ? null : id);
};

const toggleApiKeyPermission = (permission: string) => {
  setNewApiKey(prev => ({
    ...prev,
    permissions: prev.permissions.includes(permission)
      ? prev.permissions.filter(p => p !== permission)
      : [...prev.permissions, permission]
  }));
};

  // Destructuration pour un accès facile
  const { profile, team, quickReplies } = settingsData
  const { contactLabels, searchTerm, filter, isCreating, newLabel } = labelsState
  const { rules, workingHours, overflowSettings, isAddingRule, newRule } = assignmentState

  // Handlers pour settingsData
  const handleSettingsChange = (section: keyof typeof settingsData, field: string, value: any) => {
    setSettingsData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }))
  }

  // Handlers pour labelsState
  const handleLabelsState = (field: string, value: any) => {
    setLabelsState(prev => ({ ...prev, [field]: value }))
  }

  const handleCreateLabel = () => {
    if (newLabel.name.trim()) {
      const newLabelObj = {
        id: Date.now(),
        name: newLabel.name,
        color: newLabel.color,
        count: 0
      }
      setLabelsState(prev => ({
        ...prev,
        contactLabels: [...prev.contactLabels, newLabelObj],
        newLabel: { name: "", color: "bg-blue-500" },
        isCreating: false
      }))
    }
  }

  const handleDeleteLabel = (id: number) => {
    setLabelsState(prev => ({
      ...prev,
      contactLabels: prev.contactLabels.filter(label => label.id !== id)
    }))
  }

  // Handlers pour assignmentState
  const handleAssignmentState = (field: string, value: any) => {
    setAssignmentState(prev => ({ ...prev, [field]: value }))
  }

  const handleToggleRule = (id: number) => {
    setAssignmentState(prev => ({
      ...prev,
      rules: prev.rules.map(rule =>
        rule.id === id ? { ...rule, enabled: !rule.enabled } : rule
      )
    }))
  }

  const handleSettingChange = (field: string, value: any) => {
    setConversationSettings(prev => ({ ...prev, [field]: value }));
  };

  const handleDeleteRule = (id: number) => {
    setAssignmentState(prev => ({
      ...prev,
      rules: prev.rules.filter(rule => rule.id !== id)
    }))
  }

  const handleUpdatePriority = (id: number, newPriority: number) => {
    setAssignmentState(prev => ({
      ...prev,
      rules: prev.rules.map(rule =>
        rule.id === id ? { ...rule, priority: newPriority } : rule
      ).sort((a, b) => a.priority - b.priority)
    }))
  }

  const handleAddRule = () => {
    if (newRule.name.trim()) {
      const rule = {
        id: Date.now(),
        name: newRule.name,
        enabled: true,
        type: newRule.type,
        description: newRule.description,
        priority: newRule.priority
      }
      const updatedRules = [...rules, rule].sort((a, b) => a.priority - b.priority)
      setAssignmentState(prev => ({
        ...prev,
        rules: updatedRules,
        newRule: { name: "", type: "availability", description: "", priority: updatedRules.length + 1 },
        isAddingRule: false
      }))
    }
  }

const [profileImage, setProfileImage] = useState<File | null>(null);
const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleWorkingHoursChange = (field: string, value: any) => {
    setAssignmentState(prev => ({
      ...prev,
      workingHours: { ...prev.workingHours, [field]: value }
    }))
  }

  const handleOverflowChange = (field: string, value: any) => {
    setAssignmentState(prev => ({
      ...prev,
      overflowSettings: { ...prev.overflowSettings, [field]: value }
    }))
  }

  // Handlers pour les étiquettes de conversation
  const [convLabelState, setConvLabelState] = useState({
    searchTerm: "",
    filter: "all",
    isCreating: false,
    editingLabel: null as number | null,
    newLabel: { 
      name: "", 
      color: "bg-blue-500", 
      description: "",
      autoApply: false 
    }
  })

  const handleCreateConvLabel = () => {
    if (convLabelState.newLabel.name.trim()) {
      const newLabelObj = {
        id: Date.now(),
        name: convLabelState.newLabel.name,
        color: convLabelState.newLabel.color,
        count: 0,
        description: convLabelState.newLabel.description,
        autoApply: convLabelState.newLabel.autoApply
      }
      setConversationLabels([...conversationLabels, newLabelObj])
      setConvLabelState(prev => ({
        ...prev,
        newLabel: { name: "", color: "bg-blue-500", description: "", autoApply: false },
        isCreating: false
      }))
    }
  }

  const handleDeleteConvLabel = (id: number) => {
    setConversationLabels(conversationLabels.filter(label => label.id !== id))
  }

  const handleToggleAutoApply = (id: number) => {
    setConversationLabels(conversationLabels.map(label =>
      label.id === id ? { ...label, autoApply: !label.autoApply } : label
    ))
  }

  // Calculs dérivés
  const totalLabels = contactLabels.length
  const totalContacts = contactLabels.reduce((sum, label) => sum + label.count, 0)
  const activeRules = rules.filter(rule => rule.enabled)
  const inactiveRules = rules.filter(rule => !rule.enabled)

  const filteredLabels = contactLabels.filter(label => {
    const matchesSearch = label.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filter === "all" || 
      (filter === "recent" && label.id >= 4) ||
      (filter === "most-used" && label.count > 20)
    return matchesSearch && matchesFilter
  })

  const filteredConvLabels = conversationLabels.filter(label => {
    const matchesSearch = label.name.toLowerCase().includes(convLabelState.searchTerm.toLowerCase()) ||
                         label.description.toLowerCase().includes(convLabelState.searchTerm.toLowerCase())
    const matchesFilter = convLabelState.filter === "all" || 
                         (convLabelState.filter === "auto" && label.autoApply) ||
                         (convLabelState.filter === "manual" && !label.autoApply)
    return matchesSearch && matchesFilter
  })

  const totalConvLabels = conversationLabels.length
  const totalConversations = conversationLabels.reduce((sum, label) => sum + label.count, 0)
  const autoApplyCount = conversationLabels.filter(label => label.autoApply).length

  // Options partagées
  const colorOptions = [
    "bg-blue-500", "bg-green-500", "bg-yellow-500", 
    "bg-red-500", "bg-purple-500", "bg-pink-500",
    "bg-indigo-500", "bg-teal-500", "bg-orange-500", "bg-gray-500"
  ]

  const colorOptionsWithNames = [
    { value: "bg-red-500", name: "Rouge" },
    { value: "bg-orange-500", name: "Orange" },
    { value: "bg-yellow-500", name: "Jaune" },
    { value: "bg-green-500", name: "Vert" },
    { value: "bg-blue-500", name: "Bleu" },
    { value: "bg-purple-500", name: "Violet" },
    { value: "bg-pink-500", name: "Rose" },
    { value: "bg-gray-500", name: "Gris" }
  ]

  const handleSave = () => {
    console.log("Sauvegarde des paramètres:", { 
      settingsData, 
      labelsState, 
      assignmentState, 
      conversationLabels 
    })
  }

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed)
  }

  const renderProfileSection = () => {
  
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
        const file = e.target.files[0];
        setProfileImage(file);
        
        // Créer une preview de l'image
        const reader = new FileReader();
        reader.onload = (e) => {
          setImagePreview(e.target?.result as string);
        };
        reader.readAsDataURL(file);
        
        console.log("Fichier sélectionné:", file);
      }
    };
  
    const handleRemoveImage = () => {
      setProfileImage(null);
      setImagePreview(null);
    };
  
    return (
      <>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="size-5" />
            Profil
          </CardTitle>
          <CardDescription>
            Mettez à jour les informations de votre compte WhatsApp Business
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="relative group">
              <div className="relative size-20 bg-muted rounded-lg flex items-center justify-center cursor-pointer hover:bg-muted/80 transition-colors overflow-hidden">
                {imagePreview ? (
                  <img 
                    src={imagePreview} 
                    alt="Preview profil" 
                    className="size-full object-cover"
                  />
                ) : (
                  <Camera className="size-8 text-muted-foreground" />
                )}
                <input
                  type="file"
                  accept="image/*"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  onChange={handleImageChange}
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Camera className="size-6 text-white" />
                </div>
              </div>
              {imagePreview && (
                <Button
                  variant="destructive"
                  size="sm"
                  className="absolute -top-2 -right-2 size-6 p-0 rounded-full"
                  onClick={handleRemoveImage}
                >
                  <Trash2 className="size-3" />
                </Button>
              )}
            </div>
            <div>
              <p className="text-sm text-muted-foreground">
                Cliquez pour mettre à jour votre photo de profil
              </p>
              <p className="text-xs text-muted-foreground">
                Recommandé : 100x100 px
              </p>
              {profileImage && (
                <p className="text-xs text-green-600 mt-1">
                  Image sélectionnée: {profileImage.name}
                </p>
              )}
            </div>
          </div>
  
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="flex items-center gap-2">
                <User className="size-4" />
                Nom de l'Entreprise
              </Label>
              <div className="flex gap-2 items-center">
                <Input
                  id="name"
                  value={profile.name}
                  onChange={(e) => handleSettingsChange('profile', 'name', e.target.value)}
                  placeholder="Entrez le nom de votre entreprise"
                  className="flex-1"
                />
              </div>
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Max 120 caractères</span>
                <span>{profile.name.length}/120</span>
              </div>
            </div>
  
            <div className="space-y-2">
              <Label htmlFor="category" className="flex items-center gap-2">
                <Tag className="size-4" />
                Catégorie d'Entreprise
              </Label>
              <select
                id="category"
                value={profile.category}
                onChange={(e) => handleSettingsChange('profile', 'category', e.target.value)}
                className="w-full bg-card border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary transition-colors"
              >
                <option value="Commerce de détail">Commerce de détail</option>
                <option value="Services">Services</option>
                <option value="Restaurant">Restaurant</option>
                <option value="Santé">Santé</option>
                <option value="Éducation">Éducation</option>
                <option value="Technologie">Technologie</option>
                <option value="Immobilier">Immobilier</option>
                <option value="Automobile">Automobile</option>
              </select>
            </div>
          </div>
  
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="address" className="flex items-center gap-2">
                <Globe className="size-4" />
                Adresse
              </Label>
              <Input
                id="address"
                value={profile.address}
                onChange={(e) => handleSettingsChange('profile', 'address', e.target.value)}
                placeholder="Entrez l'adresse de votre entreprise"
              />
            </div>
  
            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2">
                <Mail className="size-4" />
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={profile.email}
                onChange={(e) => handleSettingsChange('profile', 'email', e.target.value)}
                placeholder="Entrez l'email de votre entreprise"
              />
            </div>
          </div>
  
          <div className="space-y-2">
            <Label htmlFor="description" className="flex items-center gap-2">
              <FileText className="size-4" />
              Description
            </Label>
            <Textarea
              id="description"
              value={profile.description}
              onChange={(e) => handleSettingsChange('profile', 'description', e.target.value)}
              placeholder="Décrivez votre entreprise, vos services, votre mission..."
              rows={4}
              className="resize-none"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Maximum 1024 caractères</span>
              <span>{profile.description.length}/1024</span>
            </div>
          </div>
  
          <div className="space-y-2">
            <Label htmlFor="website" className="flex items-center gap-2">
              <Globe className="size-4" />
              Site Web
            </Label>
            <div className="flex items-center gap-2">
              <Input
                id="website"
                value={profile.website}
                onChange={(e) => handleSettingsChange('profile', 'website', e.target.value)}
                placeholder="https://votreentreprise.com"
              />
            </div>
            {profile.website && !profile.website.startsWith('http') && (
              <p className="text-xs text-yellow-600">
                Astuce: Ajoutez "https://" au début de votre URL
              </p>
            )}
          </div>
  
          {/* Statistiques du profil */}
<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
  <div className="text-center p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">95%</div>
    <div className="text-sm text-blue-600 dark:text-blue-400">Profil complété</div>
  </div>
  <div className="text-center p-4 bg-green-500/10 rounded-lg border border-green-500/20">
    <div className="text-2xl font-bold text-green-600 dark:text-green-400">1.2K</div>
    <div className="text-sm text-green-600 dark:text-green-400">Vues du profil</div>
  </div>
  <div className="text-center p-4 bg-purple-500/10 rounded-lg border border-purple-500/20">
    <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">87%</div>
    <div className="text-sm text-purple-600 dark:text-purple-400">Taux de réponse</div>
  </div>
  <div className="text-center p-4 bg-orange-500/10 rounded-lg border border-orange-500/20">
    <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">4.8</div>
    <div className="text-sm text-orange-600 dark:text-orange-400">Note moyenne</div>
  </div>
</div>
        </CardContent>
      </>
    );
  }

  const renderTeamSection = () => (
    <>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="size-5" />
          Gestion de l'équipe
        </CardTitle>
        <CardDescription>
          Gérez les membres de votre équipe et leurs permissions
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="teamName">Nom de l'Équipe</Label>
          <Input
            id="teamName"
            value={team.teamName}
            onChange={(e) => handleSettingsChange('team', 'teamName', e.target.value)}
            placeholder="Entrez le nom de votre équipe"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="members">Nombre de Membres</Label>
          <Input
            id="members"
            type="number"
            value={team.members}
            onChange={(e) => handleSettingsChange('team', 'members', parseInt(e.target.value))}
            placeholder="Nombre de membres dans l'équipe"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="adminEmail">Email Admin</Label>
          <Input
            id="adminEmail"
            type="email"
            value={team.adminEmail}
            onChange={(e) => handleSettingsChange('team', 'adminEmail', e.target.value)}
            placeholder="Email de l'administrateur"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="permissions">Niveau de Permissions</Label>
          <select
            id="permissions"
            value={team.permissions}
            onChange={(e) => handleSettingsChange('team', 'permissions', e.target.value)}
            className="w-full bg-card border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary transition-colors"
          >
            <option value="Complet">Complet</option>
            <option value="Modération">Modération</option>
            <option value="Lecture seule">Lecture seule</option>
          </select>
        </div>

        <div className="bg-muted rounded-lg p-4">
          <h4 className="font-semibold mb-2">Membres de l'équipe</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between items-center">
              <span>Jean Dupont</span>
              <span className="text-muted-foreground">Admin</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Marie Martin</span>
              <span className="text-muted-foreground">Modérateur</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Pierre Lambert</span>
              <span className="text-muted-foreground">Utilisateur</span>
            </div>
          </div>
        </div>
      </CardContent>
    </>
  )

  const renderQuickRepliesSection = () => (
    <>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageCircle className="size-5" />
          Réponses rapides
        </CardTitle>
        <CardDescription>
          Configurez vos réponses rapides pour un service client efficace
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4 p-4 bg-muted rounded-lg">
          <div className="flex items-center justify-between">
            <Label htmlFor="greeting" className="text-base font-semibold">
              Message de Bienvenue
            </Label>
            <span className="text-xs text-muted-foreground bg-background px-2 py-1 rounded">
              {quickReplies.greeting.length}/500
            </span>
          </div>
          <Textarea
            id="greeting"
            value={quickReplies.greeting}
            onChange={(e) => handleSettingsChange('quickReplies', 'greeting', e.target.value)}
            placeholder="Bonjour ! Bienvenue chez [Nom Entreprise]. Comment pouvons-nous vous aider aujourd'hui ?"
            rows={4}
            className="resize-none bg-background border border-input"
            maxLength={500}
          />
          <p className="text-xs text-muted-foreground">
            Ce message sera envoyé automatiquement lorsqu'un nouveau contact vous écrit pour la première fois.
          </p>
        </div>

        <div className="space-y-4 p-4 bg-muted rounded-lg">
          <div className="flex items-center justify-between">
            <Label htmlFor="availability" className="text-base font-semibold">
              Message d'Indisponibilité
            </Label>
            <span className="text-xs text-muted-foreground bg-background px-2 py-1 rounded">
              {quickReplies.availability.length}/500
            </span>
          </div>
          <Textarea
            id="availability"
            value={quickReplies.availability}
            onChange={(e) => handleSettingsChange('quickReplies', 'availability', e.target.value)}
            placeholder="Merci de votre message. Notre équipe est actuellement indisponible. Nous vous répondrons dès notre retour pendant les heures d'ouverture."
            rows={4}
            className="resize-none bg-background"
            maxLength={500}
          />
          <p className="text-xs text-muted-foreground">
            Message envoyé en dehors des heures d'ouverture ou lorsque l'équipe n'est pas disponible.
          </p>
        </div>

        <div className="space-y-4 p-4 bg-muted rounded-lg">
          <div className="flex items-center justify-between">
            <Label htmlFor="thanks" className="text-base font-semibold">
              Message de Remerciement
            </Label>
            <span className="text-xs text-muted-foreground bg-background px-2 py-1 rounded">
              {quickReplies.thanks.length}/500
            </span>
          </div>
          <Textarea
            id="thanks"
            value={quickReplies.thanks}
            onChange={(e) => handleSettingsChange('quickReplies', 'thanks', e.target.value)}
            placeholder="Merci beaucoup pour votre confiance ! N'hésitez pas à nous recontacter si vous avez d'autres questions. Bonne journée !"
            rows={4}
            className="resize-none bg-background"
            maxLength={500}
          />
          <p className="text-xs text-muted-foreground">
            Message de clôture envoyé à la fin d'une conversation pour remercier le client.
          </p>
        </div>

        <div className="border-t pt-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Réponses Rapides Personnalisées</h3>
            <Button variant="outline" size="sm">
              <MessageCircle className="size-4 mr-2" />
              Ajouter une réponse
            </Button>
          </div>
          
          <div className="grid gap-3">
            <div className="flex justify-between items-center p-3 bg-muted rounded-lg hover:bg-muted/80 transition-colors cursor-pointer">
              <div>
                <div className="font-medium">Renseignement sur les prix</div>
                <div className="text-sm text-muted-foreground">Pour toute demande de tarifs...</div>
              </div>
              <Button variant="ghost" size="sm">
                <Settings className="size-4" />
              </Button>
            </div>

            <div className="flex justify-between items-center p-3 bg-muted rounded-lg hover:bg-muted/80 transition-colors cursor-pointer">
              <div>
                <div className="font-medium">Informations de livraison</div>
                <div className="text-sm text-muted-foreground">Nos délais et frais de livraison...</div>
              </div>
              <Button variant="ghost" size="sm">
                <Settings className="size-4" />
              </Button>
            </div>

            <div className="flex justify-between items-center p-3 bg-muted rounded-lg hover:bg-muted/80 transition-colors cursor-pointer">
              <div>
                <div className="font-medium">Support technique</div>
                <div className="text-sm text-muted-foreground">Pour toute assistance technique...</div>
              </div>
              <Button variant="ghost" size="sm">
                <Settings className="size-4" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </>
  )

  const renderContactLabelsSection = () => (
    <>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Tag className="size-5" />
          Étiquettes de contact
        </CardTitle>
        <CardDescription>
          Gérez les étiquettes pour organiser et catégoriser vos contacts
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{totalLabels}</div>
              <div className="text-sm text-muted-foreground">Étiquettes actives</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{totalContacts}</div>
              <div className="text-sm text-muted-foreground">Contacts étiquetés</div>
            </div>
          </div>
          <Button 
            className="flex items-center gap-2"
            onClick={() => handleLabelsState('isCreating', true)}
          >
            <Tag className="size-4" />
            Créer une étiquette
          </Button>
        </div>

        {isCreating && (
          <div className="p-4 bg-muted rounded-lg space-y-3">
            <div className="flex gap-3">
              <Input
                placeholder="Nom de l'étiquette"
                value={newLabel.name}
                onChange={(e) => handleLabelsState('newLabel', {...newLabel, name: e.target.value})}
                className="flex-1"
              />
              <select 
                value={newLabel.color}
                onChange={(e) => handleLabelsState('newLabel', {...newLabel, color: e.target.value})}
                className="bg-card border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary transition-colors"
              >
                {colorOptions.map(color => (
                  <option key={color} value={color}>Couleur</option>
                ))}
              </select>
            </div>
            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={() => handleLabelsState('isCreating', false)}>
                Annuler
              </Button>
              <Button onClick={handleCreateLabel}>
                Créer
              </Button>
            </div>
          </div>
        )}

        <div className="flex gap-4">
          <div className="flex-1">
            <Input
              placeholder="Rechercher une étiquette..."
              value={searchTerm}
              onChange={(e) => handleLabelsState('searchTerm', e.target.value)}
              className="w-full"
            />
          </div>
          <select 
            value={filter}
            onChange={(e) => handleLabelsState('filter', e.target.value)}
            className="bg-card border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary transition-colors"
          >
            <option value="all">Toutes les étiquettes</option>
            <option value="recent">Récemment créées</option>
            <option value="most-used">Plus utilisées</option>
          </select>
        </div>

        <div className="grid gap-3">
          {filteredLabels.map((label) => (
            <div key={label.id} className="flex justify-between items-center p-4 bg-background border border-border rounded-lg hover:bg-accent transition-colors">
              <div className="flex items-center gap-3">
                <div className={`size-3 rounded-full ${label.color}`}></div>
                <div>
                  <div className="font-medium">{label.name}</div>
                  <div className="text-sm text-muted-foreground">{label.count} contacts</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" title="Voir les contacts">
                  <Users className="size-4" />
                </Button>
                <Button variant="ghost" size="sm" title="Modifier">
                  <Settings className="size-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => handleDeleteLabel(label.id)}
                  title="Supprimer"
                >
                  <Trash2 className="size-4" />
                </Button>
              </div>
            </div>
          ))}
          
          {filteredLabels.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              Aucune étiquette trouvée
            </div>
          )}
        </div>

        <div className="flex justify-between items-center pt-4 border-t border-border">
          <div className="text-sm text-muted-foreground">
            {filteredLabels.length} étiquette{filteredLabels.length !== 1 ? 's' : ''} affichée{filteredLabels.length !== 1 ? 's' : ''}
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              Exporter les étiquettes
            </Button>
            <Button variant="outline" size="sm">
              Gérer les couleurs
            </Button>
          </div>
        </div>
      </CardContent>
    </>
  )

  const renderAutoAssignmentSection = () => (
    <>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bot className="size-5" />
          Assignation automatique
        </CardTitle>
        <CardDescription>
          Configurez les règles d'assignation automatique des conversations
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
      <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
  <div>
    <h3 className="font-semibold">Assignation automatique</h3>
    <p className="text-sm text-muted-foreground">
      {activeRules.length} règle{activeRules.length !== 1 ? 's' : ''} active{activeRules.length !== 1 ? 's' : ''} sur {rules.length}
    </p>
  </div>
  
  <div className="flex items-center gap-2">
    <div className={`size-3 rounded-full ${activeRules.length > 0 ? 'bg-green-500' : 'bg-gray-400'}`}></div>
    <span className="text-sm font-medium">
      {activeRules.length > 0 ? 'Activé' : 'Désactivé'}
    </span>
  </div>
</div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Règles d'assignation</h3>
            <Button 
              onClick={() => handleAssignmentState('isAddingRule', true)}
              variant="outline"
              size="sm"
            >
              <Bot className="size-4 mr-2" />
              Ajouter une règle
            </Button>
          </div>

          {isAddingRule && (
            <div className="p-4 bg-muted rounded-lg space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Nom de la règle</Label>
                  <Input
                    value={newRule.name}
                    onChange={(e) => handleAssignmentState('newRule', {...newRule, name: e.target.value})}
                    placeholder="Ex: Par région"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Type</Label>
                  <select
                    value={newRule.type}
                    onChange={(e) => handleAssignmentState('newRule', {...newRule, type: e.target.value})}
                    className="w-full bg-card border border-border rounded-lg px-3 py-2 text-sm"
                  >
                    <option value="availability">Disponibilité</option>
                    <option value="round_robin">Round Robin</option>
                    <option value="skills">Compétences</option>
                    <option value="language">Langue</option>
                    <option value="region">Région</option>
                  </select>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Input
                  value={newRule.description}
                  onChange={(e) => handleAssignmentState('newRule', {...newRule, description: e.target.value})}
                  placeholder="Description de la règle..."
                />
              </div>
              <div className="flex gap-2 justify-end">
                <Button variant="outline" onClick={() => handleAssignmentState('isAddingRule', false)}>
                  Annuler
                </Button>
                <Button onClick={handleAddRule}>
                  Ajouter la règle
                </Button>
              </div>
            </div>
          )}

          <div className="space-y-3">
            {activeRules.map((rule) => (
              <div key={rule.id} className="flex items-center justify-between p-4 bg-background border border-border rounded-lg">
                <div className="flex items-center gap-4 flex-1">
                  <div className="flex items-center gap-3 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-mono bg-primary/10 text-primary px-2 py-1 rounded">
                        {rule.priority}
                      </span>
                      <div className={`size-3 rounded-full ${rule.enabled ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                    </div>
                    <div>
                      <div className="font-medium">{rule.name}</div>
                      <div className="text-sm text-muted-foreground">{rule.description}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleUpdatePriority(rule.id, rule.priority - 1)}
                      disabled={rule.priority === 1}
                    >
                      <ChevronUp className="size-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleUpdatePriority(rule.id, rule.priority + 1)}
                      disabled={rule.priority === activeRules.length}
                    >
                      <ChevronDown className="size-4" />
                    </Button>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleToggleRule(rule.id)}
                    title="Désactiver"
                  >
                    <Settings className="size-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteRule(rule.id)}
                    title="Supprimer"
                  >
                    <Trash2 className="size-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {inactiveRules.length > 0 && (
            <div className="space-y-3">
              <h4 className="font-medium text-muted-foreground">Règles inactives</h4>
              {inactiveRules.map((rule) => (
                <div key={rule.id} className="flex items-center justify-between p-4 bg-muted border border-border rounded-lg opacity-60">
                  <div className="flex items-center gap-3">
                    <div className={`size-3 rounded-full ${rule.enabled ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                    <div>
                      <div className="font-medium">{rule.name}</div>
                      <div className="text-sm text-muted-foreground">{rule.description}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleToggleRule(rule.id)}
                      title="Activer"
                    >
                      <Power className="size-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteRule(rule.id)}
                      title="Supprimer"
                    >
                      <Trash2 className="size-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-4 p-4 bg-muted rounded-lg">
            <h3 className="font-semibold">Heures de travail</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label htmlFor="workingHours">Activer les heures de travail</Label>
                <input
                  type="checkbox"
                  id="workingHours"
                  checked={workingHours.enabled}
                  onChange={(e) => handleWorkingHoursChange('enabled', e.target.checked)}
                  className="rounded border-border bg-background text-primary focus:ring-primary"

                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-2">
                  <Label>Heure de début</Label>
                  <Input
                    type="time"
                    value={workingHours.startTime}
                    onChange={(e) => handleWorkingHoursChange('startTime', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Heure de fin</Label>
                  <Input
                    type="time"
                    value={workingHours.endTime}
                    onChange={(e) => handleWorkingHoursChange('endTime', e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Fuseau horaire</Label>
                <select
                  value={workingHours.timezone}
                  onChange={(e) => handleWorkingHoursChange('timezone', e.target.value)}
                  className="w-full bg-card border border-border rounded-lg px-3 py-2 text-sm"
                >
                  <option value="Europe/Paris">Europe/Paris</option>
                  <option value="Europe/London">Europe/London</option>
                  <option value="America/New_York">America/New_York</option>
                </select>
              </div>
            </div>
          </div>

          <div className="space-y-4 p-4 bg-muted rounded-lg">
            <h3 className="font-semibold">Gestion de la file d'attente</h3>
            <div className="space-y-3">
              <div className="space-y-2">
                <Label>Taille maximale de la file</Label>
                <Input
                  type="number"
                  value={overflowSettings.maxQueueSize}
                  onChange={(e) => handleOverflowChange('maxQueueSize', parseInt(e.target.value))}
                  min="1"
                  max="50"
                />
              </div>
              <div className="space-y-2">
                <Label>Action en cas de débordement</Label>
                <select
                  value={overflowSettings.overflowAction}
                  onChange={(e) => handleOverflowChange('overflowAction', e.target.value)}
                  className="w-full bg-card border border-border rounded-lg px-3 py-2 text-sm"
                >
                  <option value="redirect">Rediriger vers l'email</option>
                  <option value="close">Fermer la conversation</option>
                  <option value="wait">Maintenir en attente</option>
                </select>
              </div>
              {overflowSettings.overflowAction === "redirect" && (
                <div className="space-y-2">
                  <Label>Email de redirection</Label>
                  <Input
                    type="email"
                    value={overflowSettings.redirectTo}
                    onChange={(e) => handleOverflowChange('redirectTo', e.target.value)}
                    placeholder="support@entreprise.com"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </>
  )

  const renderConversationLabelsSection = () => (
    <>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Tag className="size-5" />
          Étiquettes de conversation
        </CardTitle>
        <CardDescription>
          Gérez les étiquettes pour organiser et suivre vos conversations
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{totalConvLabels}</div>
              <div className="text-sm text-muted-foreground">Étiquettes</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{totalConversations}</div>
              <div className="text-sm text-muted-foreground">Conversations étiquetées</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{autoApplyCount}</div>
              <div className="text-sm text-muted-foreground">Auto-appliquées</div>
            </div>
          </div>
          <Button 
            className="flex items-center gap-2"
            onClick={() => setConvLabelState(prev => ({...prev, isCreating: true}))}
          >
            <Tag className="size-4" />
            Créer une étiquette
          </Button>
        </div>

        {convLabelState.isCreating && (
          <div className="p-4 bg-muted rounded-lg space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Nom de l'étiquette</Label>
                <Input
                  value={convLabelState.newLabel.name}
                  onChange={(e) => setConvLabelState(prev => ({
                    ...prev, 
                    newLabel: {...prev.newLabel, name: e.target.value}
                  }))}
                  placeholder="Ex: Technique, Commercial..."
                />
              </div>
              <div className="space-y-2">
                <Label>Couleur</Label>
                <select
                  value={convLabelState.newLabel.color}
                  onChange={(e) => setConvLabelState(prev => ({
                    ...prev, 
                    newLabel: {...prev.newLabel, color: e.target.value}
                  }))}
                  className="w-full bg-card border border-border rounded-lg px-3 py-2 text-sm"
                >
                  {colorOptionsWithNames.map(color => (
                    <option key={color.value} value={color.value}>{color.name}</option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label>Description</Label>
              <Input
                value={convLabelState.newLabel.description}
                onChange={(e) => setConvLabelState(prev => ({
                  ...prev, 
                  newLabel: {...prev.newLabel, description: e.target.value}
                }))}
                placeholder="Description de l'usage de cette étiquette..."
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="autoApply"
                  checked={convLabelState.newLabel.autoApply}
                  onChange={(e) => setConvLabelState(prev => ({
                    ...prev, 
                    newLabel: {...prev.newLabel, autoApply: e.target.checked}
                  }))}
                  className="rounded border-border"
                />
                <Label htmlFor="autoApply" className="cursor-pointer">
                  Appliquer automatiquement
                </Label>
              </div>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  onClick={() => setConvLabelState(prev => ({
                    ...prev,
                    isCreating: false,
                    newLabel: { name: "", color: "bg-blue-500", description: "", autoApply: false }
                  }))}
                >
                  Annuler
                </Button>
                <Button onClick={handleCreateConvLabel}>
                  Créer
                </Button>
              </div>
            </div>
          </div>
        )}

        <div className="flex gap-4">
          <div className="flex-1">
            <Input
              placeholder="Rechercher une étiquette..."
              value={convLabelState.searchTerm}
              onChange={(e) => setConvLabelState(prev => ({...prev, searchTerm: e.target.value}))}
              className="w-full"
            />
          </div>
          <select 
            value={convLabelState.filter}
            onChange={(e) => setConvLabelState(prev => ({...prev, filter: e.target.value}))}
            className="bg-card border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary transition-colors"
          >
            <option value="all">Toutes les étiquettes</option>
            <option value="auto">Auto-appliquées</option>
            <option value="manual">Manuelles</option>
          </select>
        </div>

        <div className="grid gap-3">
          {filteredConvLabels.map((label) => (
            <div key={label.id} className="flex justify-between items-center p-4 bg-background border border-border rounded-lg hover:bg-accent transition-colors">
              <div className="flex items-center gap-4 flex-1">
                <div className={`size-3 rounded-full ${label.color}`}></div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{label.name}</span>
                    {label.autoApply && (
                      <span className="px-2 py-1 bg-blue-500/20 text-blue-600 dark:text-blue-400 text-xs rounded-full">
                        Auto
                      </span>
                    )}
                  </div>
                  <div className="text-sm text-muted-foreground">{label.description}</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {label.count} conversation{label.count !== 1 ? 's' : ''}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => handleToggleAutoApply(label.id)}
                  title={label.autoApply ? "Désactiver l'auto-application" : "Activer l'auto-application"}
                >
                  {label.autoApply ? <CheckCircle className="size-4 text-green-600" /> : <Circle className="size-4" />}
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => handleDeleteConvLabel(label.id)}
                  title="Supprimer"
                >
                  <Trash2 className="size-4" />
                </Button>
              </div>
            </div>
          ))}
          
          {filteredConvLabels.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              {convLabelState.searchTerm ? "Aucune étiquette ne correspond à votre recherche" : "Aucune étiquette créée"}
            </div>
          )}
        </div>

        <div className="border-t pt-4">
          <h4 className="font-medium mb-3">Légende des couleurs</h4>
          <div className="flex flex-wrap gap-4">
            {colorOptionsWithNames.map((color) => (
              <div key={color.value} className="flex items-center gap-2">
                <div className={`size-3 rounded-full ${color.value}`}></div>
                <span className="text-sm text-muted-foreground">{color.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-between items-center pt-4 border-t border-border">
          <div className="text-sm text-muted-foreground">
            {filteredConvLabels.length} étiquette{filteredConvLabels.length !== 1 ? 's' : ''} affichée{filteredConvLabels.length !== 1 ? 's' : ''}
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              Exporter les étiquettes
            </Button>
            <Button variant="outline" size="sm">
              Paramètres d'auto-application
            </Button>
          </div>
        </div>
      </CardContent>
    </>
  )

  const renderConversationSettingsSection = () => {
    return (
      <>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="size-5" />
            Paramètres de conversation
          </CardTitle>
          <CardDescription>
            Personnalisez le comportement de vos conversations
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold">Messages de bienvenue automatiques</h3>
                <p className="text-sm text-muted-foreground">
                  Envoyer un message de bienvenue aux nouveaux contacts
                </p>
              </div>
              <input
                type="checkbox"
                checked={conversationSettings.welcomeMessages}
                onChange={(e) => handleSettingChange('welcomeMessages', e.target.checked)}
                className="rounded border-border"
              />
            </div>
  
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold">Réponses hors ligne</h3>
                <p className="text-sm text-muted-foreground">
                  Répondre automatiquement en dehors des heures d'ouverture
                </p>
              </div>
              <input
                type="checkbox"
                checked={conversationSettings.offlineReplies}
                onChange={(e) => handleSettingChange('offlineReplies', e.target.checked)}
                className="rounded border-border"
              />
            </div>
  
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold">Transfert de conversations</h3>
                <p className="text-sm text-muted-foreground">
                  Permettre le transfert entre agents
                </p>
              </div>
              <input
                type="checkbox"
                checked={conversationSettings.conversationTransfer}
                onChange={(e) => handleSettingChange('conversationTransfer', e.target.checked)}
                className="rounded border-border"
              />
            </div>
          </div>
  
          <div className="border-t pt-6">
            <h3 className="font-semibold mb-4">Paramètres de confidentialité</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Masquer le numéro de téléphone</h4>
                  <p className="text-sm text-muted-foreground">
                    Protéger la confidentialité des agents
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={conversationSettings.hidePhoneNumbers}
                  onChange={(e) => handleSettingChange('hidePhoneNumbers', e.target.checked)}
                  className="rounded border-border"
                />
              </div>
  
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Archivage automatique</h4>
                  <p className="text-sm text-muted-foreground">
                    Archiver les conversations après 30 jours
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={conversationSettings.autoArchive}
                  onChange={(e) => handleSettingChange('autoArchive', e.target.checked)}
                  className="rounded border-border"
                />
              </div>
            </div>
          </div>
  
          <div className="border-t pt-6">
            <h3 className="font-semibold mb-4">Paramètres de notification</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Notifications par email</Label>
                <Input
                  type="email"
                  placeholder="email@entreprise.com"
                  value={conversationSettings.notificationEmail}
                  onChange={(e) => handleSettingChange('notificationEmail', e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label>Fréquence des rapports</Label>
                <select 
                  value={conversationSettings.reportFrequency}
                  onChange={(e) => handleSettingChange('reportFrequency', e.target.value)}
                  className="w-full bg-card border border-border rounded-lg px-3 py-2 text-sm"
                >
                  <option value="daily">Quotidien</option>
                  <option value="weekly">Hebdomadaire</option>
                  <option value="monthly">Mensuel</option>
                </select>
              </div>
            </div>
          </div>
        </CardContent>
      </>
    );
  }

const renderWhatsappWidgetSection = () => {

    const handleWidgetChange = (field: string, value: any) => {
      setWidgetConfig(prev => ({ ...prev, [field]: value }));
    };
  
    const generateEmbedCode = () => {
      const code = `
  <!-- WhatsApp Widget -->
  <script>
  window.whatsappWidget = {
    phone: "${widgetConfig.phoneNumber}",
    message: "${widgetConfig.defaultMessage}",
    position: "${widgetConfig.position}",
    accentColor: "${widgetConfig.accentColor}",
    showOutsideHours: ${widgetConfig.showOutsideHours},
    delay: ${widgetConfig.delayEnabled ? widgetConfig.delaySeconds : 0}
  };
  </script>
  <script src="/whatsapp-widget.js"></script>
      `.trim();
      
      handleWidgetChange('generatedCode', code);
    };
  
    const copyToClipboard = () => {
      navigator.clipboard.writeText(widgetConfig.generatedCode);
    };
  
    return (
      <>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageCircle className="size-5" />
            Widget WhatsApp
          </CardTitle>
          <CardDescription>
            Configurez le widget WhatsApp pour votre site web
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold">Statut du Widget</h3>
                <p className="text-sm text-muted-foreground">
                  Activer/désactiver le widget sur votre site
                </p>
              </div>
              <input
                type="checkbox"
                checked={widgetConfig.enabled}
                onChange={(e) => handleWidgetChange('enabled', e.target.checked)}
                className="rounded border-border"
              />
            </div>
  
            <div className="space-y-2">
              <Label>Numéro WhatsApp</Label>
              <Input
                value={widgetConfig.phoneNumber}
                onChange={(e) => handleWidgetChange('phoneNumber', e.target.value)}
                placeholder="Entrez votre numéro WhatsApp"
              />
            </div>
  
            <div className="space-y-2">
              <Label>Message par défaut</Label>
              <Textarea
                value={widgetConfig.defaultMessage}
                onChange={(e) => handleWidgetChange('defaultMessage', e.target.value)}
                placeholder="Message pré-rempli lorsque le visiteur clique"
                rows={3}
              />
            </div>
          </div>
  
          <div className="border-t pt-6">
            <h3 className="font-semibold mb-4">Apparence du Widget</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Position</Label>
                <select 
                  value={widgetConfig.position}
                  onChange={(e) => handleWidgetChange('position', e.target.value)}
                  className="w-full bg-card border border-border rounded-lg px-3 py-2 text-sm"
                >
                  <option value="bottom-right">En bas à droite</option>
                  <option value="bottom-left">En bas à gauche</option>
                  <option value="top-right">En haut à droite</option>
                  <option value="top-left">En haut à gauche</option>
                </select>
              </div>
  
              <div className="space-y-2">
                <Label>Couleur d'accent</Label>
                <select 
                  value={widgetConfig.accentColor}
                  onChange={(e) => handleWidgetChange('accentColor', e.target.value)}
                  className="w-full bg-card border border-border rounded-lg px-3 py-2 text-sm"
                >
                  <option value="whatsapp-green">Vert WhatsApp</option>
                  <option value="blue">Bleu</option>
                  <option value="purple">Violet</option>
                  <option value="red">Rouge</option>
                </select>
              </div>
            </div>
          </div>
  
          <div className="border-t pt-6">
            <h3 className="font-semibold mb-4">Personnalisation avancée</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Afficher hors heures ouvrables</h4>
                  <p className="text-sm text-muted-foreground">
                    Montrer le widget même en dehors des heures d'ouverture
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={widgetConfig.showOutsideHours}
                  onChange={(e) => handleWidgetChange('showOutsideHours', e.target.checked)}
                  className="rounded border-border"
                />
              </div>
  
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Retard d'affichage</h4>
                  <p className="text-sm text-muted-foreground">
                    Afficher le widget après un délai
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={widgetConfig.delayEnabled}
                  onChange={(e) => handleWidgetChange('delayEnabled', e.target.checked)}
                  className="rounded border-border"
                />
              </div>
  
              {widgetConfig.delayEnabled && (
                <div className="space-y-2">
                  <Label>Délai d'affichage (secondes)</Label>
                  <Input
                    type="number"
                    value={widgetConfig.delaySeconds}
                    onChange={(e) => handleWidgetChange('delaySeconds', parseInt(e.target.value))}
                    min="0"
                    max="60"
                  />
                </div>
              )}
            </div>
          </div>
  
          <div className="border-t pt-6">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="font-semibold">Code d'intégration</h3>
                <p className="text-sm text-muted-foreground">
                  Copiez ce code dans votre site web
                </p>
              </div>
              <Button 
                onClick={generateEmbedCode}
                className="flex items-center gap-2"
              >
                <MessageCircle className="size-4" />
                Générer le code
              </Button>
            </div>
  
            {widgetConfig.generatedCode && (
              <div className="space-y-2">
                <Label>Code généré :</Label>
                <div className="relative">
                <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto border border-border">
                    {widgetConfig.generatedCode}
                  </pre>
                  <Button
                    onClick={copyToClipboard}
                    variant="outline"
                    size="sm"
                    className="absolute top-2 right-2"
                  >
                    Copier
                  </Button>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </>
    );
  }

const renderApiKeysSection = () => {
  const activeKeys = apiKeys.filter(key => key.status === "active");
  const inactiveKeys = apiKeys.filter(key => key.status === "inactive");
  const totalUsage = apiKeys.reduce((sum, key) => sum + key.usage, 0);

  return (
    <>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Key className="size-5" />
          Clés API
        </CardTitle>
        <CardDescription>
          Gérez vos clés API pour l'intégration avec d'autres services
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-blue-500/10 rounded-lg p-4 text-center border border-blue-500/20">
            <div className="text-2xl font-bold text-blue-600">{activeKeys.length}</div>
            <div className="text-sm text-blue-600">Clés actives</div>
          </div>
          <div className="bg-green-500/10 rounded-lg p-4 text-center border border-green-500/20">
            <div className="text-2xl font-bold text-green-600">{totalUsage}</div>
            <div className="text-sm text-green-600">Requêtes ce mois</div>
          </div>
          <div className="bg-orange-500/10 rounded-lg p-4 text-center border border-orange-500/20">
            <div className="text-2xl font-bold text-orange-600">{inactiveKeys.length}</div>
            <div className="text-sm text-orange-600">Clés révoquées</div>
          </div>
        </div>

        {/* Bannière d'information */}
        <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <Key className="size-5 text-yellow-600 mt-0.5" />
            <div>
              <h4 className="font-semibold text-yellow-600">Sécurité des clés API</h4>
              <p className="text-sm text-yellow-600/80 mt-1">
                Vos clés API sont confidentielles. Ne les partagez jamais publiquement et régénérez-les 
                régulièrement pour maintenir la sécurité de votre compte.
              </p>
            </div>
          </div>
        </div>

        {/* Bouton pour créer une nouvelle clé */}
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Clés API</h3>
          <Button 
            onClick={() => setShowApiKeyForm(true)}
            className="flex items-center gap-2"
          >
            <Key className="size-4" />
            Générer une nouvelle clé
          </Button>
        </div>

        {/* Formulaire de création */}
        {showApiKeyForm && (
          <Card className="bg-muted border-border">
            <CardContent className="p-6 space-y-4">
              <h4 className="font-semibold">Créer une nouvelle clé API</h4>
              
              <div className="space-y-3">
                <div className="space-y-2">
                  <Label htmlFor="keyName">Nom de la clé</Label>
                  <Input
                    id="keyName"
                    placeholder="Ex: Application Mobile, Site Web..."
                    value={newApiKey.name}
                    onChange={(e) => setNewApiKey(prev => ({ ...prev, name: e.target.value }))}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Permissions</Label>
                  <div className="space-y-2">
                    {[
                      { value: "read", label: "Lecture", description: "Lire les messages et données" },
                      { value: "write", label: "Écriture", description: "Envoyer des messages" },
                      { value: "contacts", label: "Contacts", description: "Gérer les contacts" },
                      { value: "analytics", label: "Analytique", description: "Accéder aux statistiques" }
                    ].map(permission => (
                      <div key={permission.value} className="flex items-center gap-3 p-3 bg-background rounded-lg border border-border">
                        <input
                          type="checkbox"
                          checked={newApiKey.permissions.includes(permission.value)}
                          onChange={() => toggleApiKeyPermission(permission.value)}
                          className="rounded border-border bg-background text-primary focus:ring-primary focus:ring-2"
                        />
                        <div>
                          <div className="font-medium">{permission.label}</div>
                          <div className="text-sm text-muted-foreground">{permission.description}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="expiresIn">Expire dans (jours)</Label>
                  <select
                    id="expiresIn"
                    value={newApiKey.expiresIn}
                    onChange={(e) => setNewApiKey(prev => ({ ...prev, expiresIn: e.target.value }))}
                    className="w-full bg-background border border-input rounded-lg px-3 py-2 text-sm"
                  >
                    <option value="7">7 jours</option>
                    <option value="30">30 jours</option>
                    <option value="90">90 jours</option>
                    <option value="365">1 an</option>
                    <option value="never">Jamais</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-2 justify-end pt-4">
                <Button 
                  variant="outline" 
                  onClick={() => setShowApiKeyForm(false)}
                >
                  Annuler
                </Button>
                <Button onClick={generateApiKey}>
                  Générer la clé
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Clé générée (affichage unique) */}
        {generatedApiKey && (
          <Card className="bg-green-500/10 border-green-500/20">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <CheckCircle className="size-5 text-green-600" />
                <h4 className="font-semibold text-green-600">Clé API générée avec succès !</h4>
              </div>
              <div className="space-y-3">
                <Label>Votre nouvelle clé API :</Label>
                <div className="flex gap-2">
                  <Input
                    value={generatedApiKey}
                    readOnly
                    className="font-mono text-sm bg-background"
                  />
                  <Button 
                    variant="outline"
                    onClick={() => copyToClipboard(generatedApiKey)}
                  >
                    Copier
                  </Button>
                </div>
                <p className="text-sm text-green-600/80">
                  ⚠️ Cette clé ne sera affichée qu'une seule fois. Sauvegardez-la dans un endroit sûr.
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Liste des clés API actives */}
        {activeKeys.length > 0 && (
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Clés actives</h4>
            <div className="space-y-3">
              {activeKeys.map(apiKey => (
                <Card key={apiKey.id} className="bg-muted border-border">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div className="space-y-2 flex-1">
                        <div className="flex items-center gap-2">
                          <h5 className="font-semibold">{apiKey.name}</h5>
                          <span className="px-2 py-1 bg-green-500/20 text-green-600 text-xs rounded-full">
                            Active
                          </span>
                        </div>
                        
                        <div className="flex gap-2 items-center">
                          <code className="text-sm bg-background px-2 py-1 rounded border border-border font-mono">
                            {showApiKey === apiKey.id ? apiKey.key : apiKey.key.replace(/./g, '•')}
                          </code>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleApiKeyVisibility(apiKey.id)}
                          >
                            {showApiKey === apiKey.id ? 'Masquer' : 'Afficher'}
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyToClipboard(apiKey.key)}
                          >
                            Copier
                          </Button>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-muted-foreground">
                          <div>
                            <div className="font-medium">Créée le</div>
                            <div>{apiKey.created}</div>
                          </div>
                          <div>
                            <div className="font-medium">Dernière utilisation</div>
                            <div>{apiKey.lastUsed}</div>
                          </div>
                          <div>
                            <div className="font-medium">Requêtes ce mois</div>
                            <div>{apiKey.usage}</div>
                          </div>
                          <div>
                            <div className="font-medium">Permissions</div>
                            <div>{apiKey.permissions.join(', ')}</div>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-1 ml-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => regenerateApiKey(apiKey.id)}
                          title="Régénérer"
                        >
                          <RefreshCw className="size-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => revokeApiKey(apiKey.id)}
                          title="Révoquer"
                        >
                          <Power className="size-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteApiKey(apiKey.id)}
                          title="Supprimer"
                        >
                          <Trash2 className="size-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Liste des clés API inactives */}
        {inactiveKeys.length > 0 && (
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Clés révoquées</h4>
            <div className="space-y-3">
              {inactiveKeys.map(apiKey => (
                <Card key={apiKey.id} className="bg-muted border-border opacity-60">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div className="space-y-2 flex-1">
                        <div className="flex items-center gap-2">
                          <h5 className="font-semibold">{apiKey.name}</h5>
                          <span className="px-2 py-1 bg-gray-500/20 text-gray-600 text-xs rounded-full">
                            Révoquée
                          </span>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Clé révoquée • Dernière utilisation : {apiKey.lastUsed}
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteApiKey(apiKey.id)}
                      >
                        <Trash2 className="size-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Message si aucune clé */}
        {apiKeys.length === 0 && (
          <div className="text-center py-8">
            <Key className="size-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Aucune clé API</h3>
            <p className="text-muted-foreground mb-4">
              Commencez par générer votre première clé API pour connecter vos applications.
            </p>
            <Button onClick={() => setShowApiKeyForm(true)}>
              Générer une clé API
            </Button>
          </div>
        )}

        {/* Journal d'activité */}
        <div className="border-t pt-6">
          <h4 className="font-semibold text-lg mb-4">Journal d'activité récent</h4>
          <div className="space-y-2">
            {[
              { action: "Clé générée", key: "Clé de production", time: "Il y a 2 heures", status: "success" },
              { action: "Requête API", key: "Clé de développement", time: "Il y a 5 heures", status: "success" },
              { action: "Clé révoquée", key: "Ancienne clé", time: "Il y a 2 jours", status: "warning" }
            ].map((log, index) => (
              <div key={index} className="flex justify-between items-center p-3 bg-muted rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`size-2 rounded-full ${
                    log.status === 'success' ? 'bg-green-500' : 
                    log.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                  }`}></div>
                  <div>
                    <div className="font-medium">{log.action}</div>
                    <div className="text-sm text-muted-foreground">{log.key}</div>
                  </div>
                </div>
                <div className="text-sm text-muted-foreground">{log.time}</div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </>
  );
};


  const renderActiveSection = () => {
    switch (activeSection) {
      case 'profile':
        return renderProfileSection()
      case 'team':
        return renderTeamSection()
      case 'quick-replies':
        return renderQuickRepliesSection()
      case 'contact-labels':
        return renderContactLabelsSection()
      case 'auto-assignment':
        return renderAutoAssignmentSection()
      case 'conversation-labels':
        return renderConversationLabelsSection()
      case 'conversation-settings':
        return renderConversationSettingsSection()
      case 'whatsapp-widget':
        return renderWhatsappWidgetSection()
      case 'api-keys':
        return renderApiKeysSection()
      default:
        return renderProfileSection()
    }
  }

  return (
    <div className="flex min-h-screen bg-background text-foreground">
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
      Paramètres
      </span>
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

<nav className="space-y-3">
  {[
    { icon: Home, label: "Tableau de bord", active: true, href: "/dashboard" },
    { icon: Mail, label: "Messages", active: false, href: "#" },
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
      )}

      <div className={`flex-1 p-6 space-y-6 transition-all duration-300 ${
        sidebarOpen ? (isCollapsed ? 'ml-0' : '') : 'w-full'
      }`}>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
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
                Paramètres WhatsApp Business
              </h1>
              <p className="text-muted-foreground">
                Gérez votre compte WhatsApp Business et votre équipe.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-card border border-border rounded-lg px-3 py-2 cursor-pointer hover:bg-accent transition-colors">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 size-8 rounded-full flex items-center justify-center">
                <User className="size-4 text-white" />
              </div>
              <span className="text-sm font-medium">Admin</span>
              <ChevronDown className="size-4 text-muted-foreground" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1 space-y-2">
            <Card className="bg-card border-border">
              <CardContent className="p-4">
                <nav className="space-y-1">
                  <button 
                    onClick={() => setActiveSection('profile')}
                    className={`flex items-center gap-3 px-3 py-2 w-full text-left rounded-lg transition-colors ${
                      activeSection === 'profile' 
                        ? 'bg-primary/10 text-primary border border-primary/20' 
                        : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                    }`}
                  >
                    <User className="size-4" />
                    Profil
                  </button>
                  <button 
                    onClick={() => setActiveSection('team')}
                    className={`flex items-center gap-3 px-3 py-2 w-full text-left rounded-lg transition-colors ${
                      activeSection === 'team' 
                        ? 'bg-primary/10 text-primary border border-primary/20' 
                        : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                    }`}
                  >
                    <Users className="size-4" />
                    Gestion de l'équipe
                  </button>
                  <button 
                    onClick={() => setActiveSection('quick-replies')}
                    className={`flex items-center gap-3 px-3 py-2 w-full text-left rounded-lg transition-colors ${
                      activeSection === 'quick-replies' 
                        ? 'bg-primary/10 text-primary border border-primary/20' 
                        : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                    }`}
                  >
                    <MessageCircle className="size-4" />
                    Réponses rapides
                  </button>
                  <button 
                    onClick={() => setActiveSection('contact-labels')}
                    className={`flex items-center gap-3 px-3 py-2 w-full text-left rounded-lg transition-colors ${
                      activeSection === 'contact-labels' 
                        ? 'bg-primary/10 text-primary border border-primary/20' 
                        : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                    }`}
                  >
                    <Tag className="size-4" />
                    Étiquettes de contact
                  </button>
                  <button 
                    onClick={() => setActiveSection('auto-assignment')}
                    className={`flex items-center gap-3 px-3 py-2 w-full text-left rounded-lg transition-colors ${
                      activeSection === 'auto-assignment' 
                        ? 'bg-primary/10 text-primary border border-primary/20' 
                        : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                    }`}
                  >
                    <Bot className="size-4" />
                    Assignation automatique
                  </button>
                  <button 
                    onClick={() => setActiveSection('conversation-labels')}
                    className={`flex items-center gap-3 px-3 py-2 w-full text-left rounded-lg transition-colors ${
                      activeSection === 'conversation-labels' 
                        ? 'bg-primary/10 text-primary border border-primary/20' 
                        : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                    }`}
                  >
                    <Tag className="size-4" />
                    Étiquettes de conversation
                  </button>
                  <button 
                    onClick={() => setActiveSection('conversation-settings')}
                    className={`flex items-center gap-3 px-3 py-2 w-full text-left rounded-lg transition-colors ${
                      activeSection === 'conversation-settings' 
                        ? 'bg-primary/10 text-primary border border-primary/20' 
                        : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                    }`}
                  >
                    <MessageSquare className="size-4" />
                    Paramètres de conversation
                  </button>
                  <button 
                    onClick={() => setActiveSection('whatsapp-widget')}
                    className={`flex items-center gap-3 px-3 py-2 w-full text-left rounded-lg transition-colors ${
                      activeSection === 'whatsapp-widget' 
                        ? 'bg-primary/10 text-primary border border-primary/20' 
                        : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                    }`}
                  >
                    <MessageCircle className="size-4" />
                    Widget WhatsApp
                  </button>
                  <button 
                    onClick={() => setActiveSection('api-keys')}
                    className={`flex items-center gap-3 px-3 py-2 w-full text-left rounded-lg transition-colors ${
                      activeSection === 'api-keys' 
                        ? 'bg-primary/10 text-primary border border-primary/20' 
                        : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                    }`}
                  >
                    <Key className="size-4" />
                    Clés API
                  </button>
                </nav>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-3 space-y-6">
            <Card className="bg-card border-border">
              {renderActiveSection()}
              <CardContent className="border-t border-border pt-6">
                <div className="flex justify-end">
                  <Button onClick={handleSave} className="flex items-center gap-2 bg-primary hover:bg-primary/90">
                    <Save className="size-4" />
                    Sauvegarder les Modifications
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}