import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Slider } from '@/components/ui/slider';

type UserRole = 'student' | 'company' | null;
type TaskStatus = 'public' | 'private';

interface Task {
  id: string;
  title: string;
  company: string;
  companyId: string;
  companyLogo: string;
  description: string;
  points: number;
  difficulty: 'easy' | 'medium' | 'hard';
  status: TaskStatus;
  participants: number;
}

interface Solution {
  id: string;
  studentName: string;
  studentId: string;
  studentAvatar: string;
  taskId: string;
  taskTitle: string;
  description: string;
  submittedAt: string;
  score: number | null;
  maxScore: number;
  files: string[];
}

interface NewsPost {
  id: string;
  communityId: string;
  communityName: string;
  communityLogo: string;
  type: 'announcement' | 'task' | 'achievement' | 'material';
  title: string;
  content: string;
  postedAt: string;
  likes: number;
  comments: number;
}

interface LearningMaterial {
  id: string;
  title: string;
  description: string;
  type: 'video' | 'image' | 'document';
  thumbnail: string;
  uploadedAt: string;
  duration?: string;
  fileSize?: string;
  views: number;
}

interface ChatRoom {
  id: string;
  name: string;
  description: string;
  type: 'community' | 'study-group';
  avatar: string;
  members: number;
  createdBy: string;
  creatorRole: 'student' | 'company';
  lastMessage?: string;
  lastMessageTime?: string;
  unreadCount?: number;
}

interface ChatMessage {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  text: string;
  time: string;
  isOwn: boolean;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  progress: number;
  maxProgress: number;
  earned: boolean;
}

interface Community {
  id: string;
  name: string;
  logo: string;
  description: string;
  members: number;
  activeTasks: number;
  industry: string;
  founded: string;
  hasChat: boolean;
}

interface RatingUser {
  id: string;
  name: string;
  avatar: string;
  points: number;
  tasksCompleted: number;
  rank: number;
}

interface UserProject {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  image?: string;
  link?: string;
  completedAt: string;
}

const Index = () => {
  const [userRole, setUserRole] = useState<UserRole>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showAuthDialog, setShowAuthDialog] = useState(true);
  const [currentView, setCurrentView] = useState<'feed' | 'profile' | 'communities' | 'chats' | 'community' | 'task'>('feed');
  const [selectedCommunity, setSelectedCommunity] = useState<Community | null>(null);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [selectedChat, setSelectedChat] = useState<ChatRoom | null>(null);
  const [selectedSolution, setSelectedSolution] = useState<Solution | null>(null);
  const [showScoreDialog, setShowScoreDialog] = useState(false);
  const [showCreateChatDialog, setShowCreateChatDialog] = useState(false);
  const [scoreValue, setScoreValue] = useState<number[]>([0]);

  const handleRoleSelect = (role: UserRole) => {
    setUserRole(role);
    setIsAuthenticated(true);
    setShowAuthDialog(false);
  };

  const openCommunityPage = (community: Community) => {
    setSelectedCommunity(community);
    setCurrentView('community');
  };

  const openTaskView = (task: Task) => {
    setSelectedTask(task);
    setCurrentView('task');
  };

  const openScoreDialog = (solution: Solution) => {
    setSelectedSolution(solution);
    setScoreValue([solution.score || 0]);
    setShowScoreDialog(true);
  };

  const saveScore = () => {
    setShowScoreDialog(false);
  };

  const openChat = (chat: ChatRoom) => {
    setSelectedChat(chat);
  };

  const tasks: Task[] = [
    {
      id: '1',
      title: 'Разработка мобильного приложения для логистики',
      company: 'ТехноЛогистик',
      companyId: '1',
      companyLogo: '🚚',
      description: 'Создайте прототип мобильного приложения для отслеживания грузов в реальном времени',
      points: 500,
      difficulty: 'hard',
      status: 'public',
      participants: 24
    },
    {
      id: '2',
      title: 'Анализ данных продаж',
      company: 'РетейлПро',
      companyId: '2',
      companyLogo: '📊',
      description: 'Проанализируйте данные продаж за последний квартал и предложите рекомендации',
      points: 300,
      difficulty: 'medium',
      status: 'private',
      participants: 12
    },
    {
      id: '3',
      title: 'Дизайн корпоративного сайта',
      company: 'Креатив Студия',
      companyId: '3',
      companyLogo: '🎨',
      description: 'Разработайте современный дизайн главной страницы корпоративного сайта',
      points: 400,
      difficulty: 'medium',
      status: 'public',
      participants: 31
    }
  ];

  const solutions: Solution[] = [
    {
      id: '1',
      studentName: 'Анна Петрова',
      studentId: '1',
      studentAvatar: '',
      taskId: '1',
      taskTitle: 'Разработка мобильного приложения для логистики',
      description: 'Разработал прототип в Figma с основными экранами: отслеживание груза, уведомления, история заказов. Добавил интерактивную карту и пуш-уведомления.',
      submittedAt: '2 часа назад',
      score: 485,
      maxScore: 500,
      files: ['prototype.fig', 'presentation.pdf']
    },
    {
      id: '2',
      studentName: 'Иван Смирнов',
      studentId: '2',
      studentAvatar: '',
      taskId: '1',
      taskTitle: 'Разработка мобильного приложения для логистики',
      description: 'React Native приложение с интеграцией Google Maps API. Реализован функционал отслеживания в реальном времени через WebSocket.',
      submittedAt: '5 часов назад',
      score: null,
      maxScore: 500,
      files: ['app.zip', 'demo-video.mp4']
    },
    {
      id: '3',
      studentName: 'Мария Козлова',
      studentId: '3',
      studentAvatar: '',
      taskId: '2',
      taskTitle: 'Анализ данных продаж',
      description: 'Провела анализ с использованием Python и Pandas. Выявила тренды продаж, сезонность и предложила 5 рекомендаций для роста выручки.',
      submittedAt: '1 день назад',
      score: 290,
      maxScore: 300,
      files: ['analysis.ipynb', 'report.pdf']
    }
  ];

  const newsPosts: NewsPost[] = [
    {
      id: '1',
      communityId: '1',
      communityName: 'ТехноЛогистик',
      communityLogo: '🚚',
      type: 'task',
      title: 'Новое задание: Разработка мобильного приложения',
      content: 'Мы запустили новое задание для разработчиков! Создайте прототип мобильного приложения для отслеживания грузов. Награда: 500 баллов.',
      postedAt: '2 часа назад',
      likes: 45,
      comments: 12
    },
    {
      id: '2',
      communityId: '2',
      communityName: 'РетейлПро',
      communityLogo: '📊',
      type: 'announcement',
      title: 'Приглашаем на стажировку лучших участников',
      content: 'Мы готовы пригласить топ-5 участников нашего сообщества на оплачиваемую стажировку. Проверьте свои позиции в рейтинге!',
      postedAt: '5 часов назад',
      likes: 89,
      comments: 23
    },
    {
      id: '3',
      communityId: '1',
      communityName: 'ТехноЛогистик',
      communityLogo: '🚚',
      type: 'material',
      title: 'Новый обучающий материал: Основы логистики',
      content: 'Загрузили новое видео про современные логистические технологии. Длительность: 25 минут. Обязательно посмотрите!',
      postedAt: '1 день назад',
      likes: 156,
      comments: 34
    },
    {
      id: '4',
      communityId: '3',
      communityName: 'Креатив Студия',
      communityLogo: '🎨',
      type: 'achievement',
      title: 'Поздравляем победителей конкурса дизайна!',
      content: 'Анна Петрова, Иван Смирнов и Мария Козлова заняли призовые места в конкурсе на лучший дизайн корпоративного сайта. Браво!',
      postedAt: '2 дня назад',
      likes: 234,
      comments: 67
    }
  ];

  const learningMaterials: LearningMaterial[] = [
    {
      id: '1',
      title: 'Введение в современную логистику',
      description: 'Узнайте основы логистических систем и автоматизации процессов доставки',
      type: 'video',
      thumbnail: '🎥',
      uploadedAt: '3 дня назад',
      duration: '25:30',
      views: 234
    },
    {
      id: '2',
      title: 'Инфографика: Процесс доставки',
      description: 'Визуализация этапов обработки и доставки заказов',
      type: 'image',
      thumbnail: '🖼️',
      uploadedAt: '5 дней назад',
      fileSize: '2.4 МБ',
      views: 156
    },
    {
      id: '3',
      title: 'Руководство по API интеграции',
      description: 'Подробная документация для интеграции с нашим API',
      type: 'document',
      thumbnail: '📄',
      uploadedAt: '1 неделю назад',
      fileSize: '1.2 МБ',
      views: 89
    },
    {
      id: '4',
      title: 'Мастер-класс: Работа с большими данными',
      description: 'Практический воркшоп по анализу данных в ритейле',
      type: 'video',
      thumbnail: '🎥',
      uploadedAt: '2 недели назад',
      duration: '1:45:20',
      views: 567
    }
  ];

  const chatRooms: ChatRoom[] = [
    {
      id: '1',
      name: 'Чат сообщества ТехноЛогистик',
      description: 'Общайтесь с другими участниками и командой компании',
      type: 'community',
      avatar: '🚚',
      members: 156,
      createdBy: 'ТехноЛогистик',
      creatorRole: 'company',
      lastMessage: 'Иван: Когда будет следующее задание?',
      lastMessageTime: '5 мин назад',
      unreadCount: 3
    },
    {
      id: '2',
      name: 'React разработчики',
      description: 'Обсуждаем фронтенд разработку и делимся опытом',
      type: 'study-group',
      avatar: '⚛️',
      members: 42,
      createdBy: 'Анна Петрова',
      creatorRole: 'student',
      lastMessage: 'Мария: Кто-нибудь знает как настроить...',
      lastMessageTime: '1 час назад',
      unreadCount: 0
    },
    {
      id: '3',
      name: 'Чат сообщества РетейлПро',
      description: 'Общение участников сообщества РетейлПро',
      type: 'community',
      avatar: '📊',
      members: 203,
      createdBy: 'РетейлПро',
      creatorRole: 'company',
      lastMessage: 'Петр: Спасибо за материалы!',
      lastMessageTime: '3 часа назад',
      unreadCount: 1
    },
    {
      id: '4',
      name: 'Дизайн и UX',
      description: 'Группа для обсуждения дизайна интерфейсов',
      type: 'study-group',
      avatar: '🎨',
      members: 28,
      createdBy: 'Елена Новикова',
      creatorRole: 'student',
      lastMessage: 'Андрей: Посмотрите мой новый проект',
      lastMessageTime: '2 дня назад',
      unreadCount: 0
    }
  ];

  const chatMessages: ChatMessage[] = [
    {
      id: '1',
      userId: '2',
      userName: 'Иван Смирнов',
      userAvatar: '',
      text: 'Привет всем! Кто-нибудь уже решал задачу по логистике?',
      time: '14:20',
      isOwn: false
    },
    {
      id: '2',
      userId: '1',
      userName: 'Анна Петрова',
      userAvatar: '',
      text: 'Да, я уже отправила решение. Использовала Figma для прототипа',
      time: '14:22',
      isOwn: true
    },
    {
      id: '3',
      userId: '2',
      userName: 'Иван Смирнов',
      userAvatar: '',
      text: 'Круто! Можешь поделиться подходом?',
      time: '14:23',
      isOwn: false
    },
    {
      id: '4',
      userId: '1',
      userName: 'Анна Петрова',
      userAvatar: '',
      text: 'Конечно! Я начала с анализа пользовательских сценариев, потом создала wireframes',
      time: '14:25',
      isOwn: true
    }
  ];

  const ratingUsers: RatingUser[] = [
    { id: '1', name: 'Анна Петрова', avatar: '', points: 1850, tasksCompleted: 12, rank: 1 },
    { id: '2', name: 'Иван Смирнов', avatar: '', points: 1620, tasksCompleted: 10, rank: 2 },
    { id: '3', name: 'Мария Козлова', avatar: '', points: 1480, tasksCompleted: 9, rank: 3 },
    { id: '4', name: 'Петр Сидоров', avatar: '', points: 1350, tasksCompleted: 8, rank: 4 },
    { id: '5', name: 'Елена Новикова', avatar: '', points: 1220, tasksCompleted: 7, rank: 5 }
  ];

  const achievements: Achievement[] = [
    {
      id: '1',
      title: 'Первые шаги',
      description: 'Выполните первое задание',
      icon: '🌟',
      progress: 1,
      maxProgress: 1,
      earned: true
    },
    {
      id: '2',
      title: 'Активист',
      description: 'Наберите 1000 баллов',
      icon: '🔥',
      progress: 1850,
      maxProgress: 1000,
      earned: true
    },
    {
      id: '3',
      title: 'Командный игрок',
      description: 'Примите участие в 10 командных проектах',
      icon: '👥',
      progress: 12,
      maxProgress: 10,
      earned: true
    },
    {
      id: '4',
      title: 'Эксперт',
      description: 'Решите 5 сложных задач',
      icon: '🏆',
      progress: 8,
      maxProgress: 5,
      earned: true
    }
  ];

  const communities: Community[] = [
    {
      id: '1',
      name: 'ТехноЛогистик',
      logo: '🚚',
      description: 'Инновационные решения в сфере логистики и доставки',
      members: 156,
      activeTasks: 8,
      industry: 'Логистика и IT',
      founded: '2018',
      hasChat: true
    },
    {
      id: '2',
      name: 'РетейлПро',
      logo: '📊',
      description: 'Современные технологии для розничной торговли',
      members: 203,
      activeTasks: 12,
      industry: 'Розничная торговля',
      founded: '2015',
      hasChat: true
    },
    {
      id: '3',
      name: 'Креатив Студия',
      logo: '🎨',
      description: 'Дизайн и креативные решения для бизнеса',
      members: 89,
      activeTasks: 5,
      industry: 'Дизайн и креатив',
      founded: '2020',
      hasChat: false
    }
  ];

  const userProjects: UserProject[] = [
    {
      id: '1',
      title: 'Система управления задачами',
      description: 'Полнофункциональное веб-приложение для управления проектами и задачами с возможностью совместной работы',
      technologies: ['React', 'Node.js', 'MongoDB', 'Socket.io'],
      image: '💼',
      completedAt: 'Сентябрь 2025'
    },
    {
      id: '2',
      title: 'Мобильное приложение для заметок',
      description: 'Кроссплатформенное приложение с синхронизацией в облаке и поддержкой markdown',
      technologies: ['React Native', 'Firebase', 'Redux'],
      image: '📱',
      completedAt: 'Август 2025'
    },
    {
      id: '3',
      title: 'Дашборд аналитики',
      description: 'Интерактивная панель визуализации данных с графиками и диаграммами в реальном времени',
      technologies: ['React', 'D3.js', 'TypeScript'],
      image: '📊',
      completedAt: 'Июль 2025'
    }
  ];

  const userProfile = {
    name: 'Анна Петрова',
    avatar: '',
    points: 1850,
    level: 8,
    achievements: 4,
    tasksCompleted: 12,
    bio: 'Студентка 3 курса факультета информационных технологий. Интересуюсь веб-разработкой и UX/UI дизайном. Активно участвую в хакатонах и образовательных проектах.',
    skills: ['React', 'TypeScript', 'Figma', 'Python', 'SQL', 'Node.js', 'UI/UX Design'],
    currentTasks: [
      { id: '1', title: 'Разработка мобильного приложения для логистики', status: 'Решение отправлено' },
      { id: '3', title: 'Дизайн корпоративного сайта', status: 'В процессе' }
    ]
  };

  const companyProfile = {
    name: 'ТехноЛогистик',
    logo: '🚚',
    description: 'Мы создаем инновационные IT-решения для логистической отрасли. Наша команда разрабатывает программное обеспечение для оптимизации доставок и управления складами.',
    industry: 'Логистика и IT',
    employees: '500-1000',
    location: 'Москва',
    website: 'technoLogistic.ru',
    activeTasks: 8,
    totalParticipants: 156,
    stats: {
      tasksPublished: 24,
      solutionsReceived: 187,
      hiredInterns: 12
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDifficultyLabel = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'Легко';
      case 'medium': return 'Средне';
      case 'hard': return 'Сложно';
      default: return difficulty;
    }
  };

  const getMaterialTypeIcon = (type: string) => {
    switch (type) {
      case 'video': return 'Video';
      case 'image': return 'Image';
      case 'document': return 'FileText';
      default: return 'File';
    }
  };

  const getMaterialTypeLabel = (type: string) => {
    switch (type) {
      case 'video': return 'Видео';
      case 'image': return 'Изображение';
      case 'document': return 'Документ';
      default: return type;
    }
  };

  const getNewsTypeIcon = (type: string) => {
    switch (type) {
      case 'task': return 'ListTodo';
      case 'announcement': return 'Megaphone';
      case 'achievement': return 'Trophy';
      case 'material': return 'BookOpen';
      default: return 'Bell';
    }
  };

  const getNewsTypeBadge = (type: string) => {
    switch (type) {
      case 'task': return { text: 'Новое задание', color: 'bg-blue-100 text-blue-800' };
      case 'announcement': return { text: 'Объявление', color: 'bg-purple-100 text-purple-800' };
      case 'achievement': return { text: 'Достижение', color: 'bg-yellow-100 text-yellow-800' };
      case 'material': return { text: 'Материал', color: 'bg-green-100 text-green-800' };
      default: return { text: type, color: 'bg-gray-100 text-gray-800' };
    }
  };

  if (!isAuthenticated) {
    return (
      <Dialog open={showAuthDialog} onOpenChange={setShowAuthDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl text-center mb-2">Добро пожаловать в EduConnect</DialogTitle>
            <DialogDescription className="text-center">
              Выберите, кто вы, чтобы продолжить
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Card 
              className="cursor-pointer hover:shadow-lg transition-all hover:border-secondary"
              onClick={() => handleRoleSelect('student')}
            >
              <CardHeader className="text-center pb-4">
                <div className="w-20 h-20 bg-secondary/10 rounded-full flex items-center justify-center text-4xl mx-auto mb-3">
                  🎓
                </div>
                <CardTitle className="text-xl">Я ученик</CardTitle>
                <CardDescription className="mt-2">
                  Решайте задачи от компаний, зарабатывайте баллы и получайте приглашения на стажировки
                </CardDescription>
              </CardHeader>
            </Card>

            <Card 
              className="cursor-pointer hover:shadow-lg transition-all hover:border-accent"
              onClick={() => handleRoleSelect('company')}
            >
              <CardHeader className="text-center pb-4">
                <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center text-4xl mx-auto mb-3">
                  🏢
                </div>
                <CardTitle className="text-xl">Я представитель компании</CardTitle>
                <CardDescription className="mt-2">
                  Публикуйте задания, находите талантливых студентов и приглашайте на стажировки
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div 
                className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center cursor-pointer"
                onClick={() => setCurrentView('feed')}
              >
                <Icon name="GraduationCap" className="text-white" size={20} />
              </div>
              <span className="text-xl font-semibold text-primary">EduConnect</span>
              <Badge variant="outline" className="ml-2">
                {userRole === 'student' ? '🎓 Ученик' : '🏢 Компания'}
              </Badge>
            </div>
            
            <div className="flex items-center space-x-1">
              <Button
                variant={currentView === 'feed' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setCurrentView('feed')}
                className="gap-2"
              >
                <Icon name="Home" size={18} />
                <span className="hidden sm:inline">Лента</span>
              </Button>
              <Button
                variant={currentView === 'communities' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setCurrentView('communities')}
                className="gap-2"
              >
                <Icon name="Users" size={18} />
                <span className="hidden sm:inline">Сообщества</span>
              </Button>
              <Button
                variant={currentView === 'chats' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setCurrentView('chats')}
                className="gap-2"
              >
                <Icon name="MessageCircle" size={18} />
                <span className="hidden sm:inline">Чаты</span>
                <Badge variant="destructive" className="ml-1">4</Badge>
              </Button>
              <Button
                variant={currentView === 'profile' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setCurrentView('profile')}
                className="gap-2"
              >
                <Icon name="User" size={18} />
                <span className="hidden sm:inline">Профиль</span>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentView === 'feed' && (
          <div className="animate-fade-in">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Лента новостей</h1>
              <p className="text-gray-600">Последние новости и объявления от сообществ</p>
            </div>

            {userRole === 'company' && (
              <Card className="mb-6 border-accent">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Plus" size={24} />
                    Создать публикацию
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Button className="gap-2">
                    <Icon name="Plus" size={18} />
                    Новая публикация
                  </Button>
                </CardContent>
              </Card>
            )}

            <div className="space-y-6">
              {newsPosts.map((post) => {
                const badge = getNewsTypeBadge(post.type);
                return (
                  <Card key={post.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start gap-4">
                        <div className="w-14 h-14 bg-secondary/10 rounded-xl flex items-center justify-center text-3xl shrink-0">
                          {post.communityLogo}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="font-semibold text-lg">{post.communityName}</span>
                            <Badge className={badge.color}>{badge.text}</Badge>
                          </div>
                          <CardTitle className="text-xl mb-2">{post.title}</CardTitle>
                          <CardDescription className="text-base">{post.content}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between pt-2 border-t">
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <Icon name="Clock" size={16} />
                            {post.postedAt}
                          </div>
                          <div className="flex items-center gap-1">
                            <Icon name="Heart" size={16} />
                            {post.likes}
                          </div>
                          <div className="flex items-center gap-1">
                            <Icon name="MessageSquare" size={16} />
                            {post.comments}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" className="gap-2">
                            <Icon name="Heart" size={16} />
                            Нравится
                          </Button>
                          {post.type === 'task' && (
                            <Button 
                              size="sm" 
                              className="gap-2"
                              onClick={() => openCommunityPage(communities.find(c => c.id === post.communityId)!)}
                            >
                              Посмотреть задание
                              <Icon name="ArrowRight" size={16} />
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        )}

        {currentView === 'task' && selectedTask && (
          <div className="animate-fade-in">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setCurrentView('community')}
              className="mb-6 gap-2"
            >
              <Icon name="ArrowLeft" size={16} />
              Назад к сообществу
            </Button>

            <Card className="mb-6">
              <CardHeader>
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-16 h-16 bg-secondary/10 rounded-xl flex items-center justify-center text-3xl">
                    {selectedTask.companyLogo}
                  </div>
                  <div className="flex-1">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">{selectedTask.title}</h1>
                    <p className="text-gray-600">{selectedTask.company}</p>
                  </div>
                  {userRole === 'student' && (
                    <Button size="lg" className="gap-2">
                      <Icon name="Plus" size={18} />
                      Отправить решение
                    </Button>
                  )}
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge className={getDifficultyColor(selectedTask.difficulty)}>
                    {getDifficultyLabel(selectedTask.difficulty)}
                  </Badge>
                  <Badge variant={selectedTask.status === 'public' ? 'default' : 'secondary'}>
                    {selectedTask.status === 'public' ? '👁️ Публичное' : '🔒 Приватное'}
                  </Badge>
                  <Badge variant="outline" className="gap-1">
                    <Icon name="Award" size={14} />
                    {selectedTask.points} баллов
                  </Badge>
                  <Badge variant="outline" className="gap-1">
                    <Icon name="Users" size={14} />
                    {selectedTask.participants} участников
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-lg text-gray-700">{selectedTask.description}</p>
              </CardContent>
            </Card>

            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">
                Решения участников ({solutions.filter(s => s.taskId === selectedTask.id).length})
              </h2>
            </div>

            <div className="grid gap-6">
              {solutions
                .filter(solution => solution.taskId === selectedTask.id)
                .map((solution) => (
                <Card key={solution.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <Avatar className="w-12 h-12">
                          <AvatarFallback className="bg-secondary text-white">
                            {solution.studentName.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-lg">{solution.studentName}</CardTitle>
                          <CardDescription>Отправлено {solution.submittedAt}</CardDescription>
                        </div>
                      </div>
                      {solution.score !== null ? (
                        <Badge variant="secondary" className="gap-1 text-lg px-3 py-1">
                          <Icon name="Star" size={16} />
                          {solution.score} / {solution.maxScore}
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="gap-1">
                          <Icon name="Clock" size={14} />
                          Не оценено
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-gray-700">{solution.description}</p>
                    
                    <div className="flex items-center gap-2 flex-wrap">
                      {solution.files.map((file, idx) => (
                        <Badge key={idx} variant="outline" className="gap-1">
                          <Icon name="Paperclip" size={12} />
                          {file}
                        </Badge>
                      ))}
                    </div>

                    {userRole === 'company' && (
                      <div className="flex gap-2 pt-2 border-t">
                        <Button 
                          variant="secondary"
                          size="sm"
                          onClick={() => openScoreDialog(solution)}
                          className="gap-2"
                        >
                          <Icon name="Star" size={16} />
                          {solution.score !== null ? 'Изменить оценку' : 'Оценить'}
                        </Button>
                        <Button variant="outline" size="sm" className="gap-2">
                          <Icon name="MessageCircle" size={16} />
                          Написать
                        </Button>
                        <Button size="sm" className="gap-2">
                          <Icon name="Eye" size={16} />
                          Подробнее
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {currentView === 'community' && selectedCommunity && (
          <div className="animate-fade-in">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setCurrentView('communities')}
              className="mb-6 gap-2"
            >
              <Icon name="ArrowLeft" size={16} />
              Назад к сообществам
            </Button>

            <div className="mb-8">
              <div className="flex items-start gap-6 mb-6">
                <div className="w-24 h-24 bg-secondary/10 rounded-2xl flex items-center justify-center text-5xl">
                  {selectedCommunity.logo}
                </div>
                <div className="flex-1">
                  <h1 className="text-4xl font-bold text-gray-900 mb-2">{selectedCommunity.name}</h1>
                  <p className="text-gray-600 text-lg mb-3">{selectedCommunity.description}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Icon name="Users" size={16} />
                      {selectedCommunity.members} участников
                    </div>
                    <div className="flex items-center gap-1">
                      <Icon name="Briefcase" size={16} />
                      {selectedCommunity.industry}
                    </div>
                    <div className="flex items-center gap-1">
                      <Icon name="Calendar" size={16} />
                      С {selectedCommunity.founded} года
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <Button size="lg" className="gap-2">
                    <Icon name="UserPlus" size={18} />
                    Вступить
                  </Button>
                  {selectedCommunity.hasChat && (
                    <Button size="lg" variant="outline" className="gap-2">
                      <Icon name="MessageCircle" size={18} />
                      Чат сообщества
                    </Button>
                  )}
                </div>
              </div>
            </div>

            <Tabs defaultValue="tasks" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="tasks">Задания</TabsTrigger>
                <TabsTrigger value="rating">Рейтинг</TabsTrigger>
                <TabsTrigger value="materials">Материалы</TabsTrigger>
              </TabsList>

              <TabsContent value="tasks">
                <div className="grid gap-6 lg:grid-cols-2">
                  {tasks
                    .filter(task => task.companyId === selectedCommunity.id)
                    .map((task) => (
                    <Card 
                      key={task.id} 
                      className="hover:shadow-lg transition-shadow cursor-pointer"
                      onClick={() => openTaskView(task)}
                    >
                      <CardHeader>
                        <CardTitle className="text-lg">{task.title}</CardTitle>
                        <div className="flex items-center gap-2 flex-wrap mt-2">
                          <Badge className={getDifficultyColor(task.difficulty)}>
                            {getDifficultyLabel(task.difficulty)}
                          </Badge>
                          <Badge variant={task.status === 'public' ? 'default' : 'secondary'}>
                            {task.status === 'public' ? '👁️ Публичное' : '🔒 Приватное'}
                          </Badge>
                          <Badge variant="outline" className="gap-1">
                            <Icon name="Award" size={14} />
                            {task.points} баллов
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-700 mb-4">{task.description}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center text-sm text-gray-500 gap-1">
                            <Icon name="Users" size={16} />
                            {task.participants} участников
                          </div>
                          <Button size="sm" className="gap-2" onClick={(e) => {
                            e.stopPropagation();
                            openTaskView(task);
                          }}>
                            Открыть задание
                            <Icon name="ArrowRight" size={16} />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="rating">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Icon name="Trophy" size={24} />
                      Топ участников сообщества
                    </CardTitle>
                    <CardDescription>
                      Лучшие студенты по количеству баллов
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {ratingUsers.map((user) => (
                        <div 
                          key={user.id}
                          className={`flex items-center gap-4 p-4 rounded-lg transition-all ${
                            user.rank <= 3 
                              ? 'bg-gradient-to-r from-secondary/10 to-transparent border-2 border-secondary/20' 
                              : 'bg-gray-50 border border-gray-200'
                          }`}
                        >
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${
                            user.rank === 1 ? 'bg-yellow-400 text-yellow-900' :
                            user.rank === 2 ? 'bg-gray-300 text-gray-700' :
                            user.rank === 3 ? 'bg-orange-400 text-orange-900' :
                            'bg-gray-200 text-gray-600'
                          }`}>
                            {user.rank}
                          </div>
                          <Avatar className="w-12 h-12">
                            <AvatarFallback className="bg-secondary text-white">
                              {user.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="font-semibold text-lg">{user.name}</div>
                            <div className="text-sm text-gray-500">
                              {user.tasksCompleted} заданий выполнено
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-primary">{user.points}</div>
                            <div className="text-xs text-gray-500">баллов</div>
                          </div>
                          {userRole === 'company' && (
                            <Button variant="outline" size="sm" className="gap-2">
                              <Icon name="MessageCircle" size={16} />
                              Написать
                            </Button>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="materials">
                <div className="grid gap-6 lg:grid-cols-2">
                  {learningMaterials.map((material) => (
                    <Card key={material.id} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex items-start gap-4">
                          <div className="w-16 h-16 bg-secondary/10 rounded-xl flex items-center justify-center text-3xl shrink-0">
                            {material.thumbnail}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-2">
                              <CardTitle className="text-lg">{material.title}</CardTitle>
                              <Badge variant="outline" className="gap-1 shrink-0">
                                <Icon name={getMaterialTypeIcon(material.type)} size={12} />
                                {getMaterialTypeLabel(material.type)}
                              </Badge>
                            </div>
                            <CardDescription className="line-clamp-2">{material.description}</CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <Icon name="Clock" size={14} />
                            {material.duration || material.fileSize}
                          </div>
                          <div className="flex items-center gap-1">
                            <Icon name="Eye" size={14} />
                            {material.views} просмотров
                          </div>
                          <div className="flex items-center gap-1">
                            <Icon name="Calendar" size={14} />
                            {material.uploadedAt}
                          </div>
                        </div>
                        <Button className="w-full gap-2">
                          {material.type === 'video' && <Icon name="Play" size={16} />}
                          {material.type === 'image' && <Icon name="Eye" size={16} />}
                          {material.type === 'document' && <Icon name="Download" size={16} />}
                          {material.type === 'video' ? 'Смотреть' : material.type === 'image' ? 'Открыть' : 'Скачать'}
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                  {userRole === 'company' && (
                    <Card className="border-2 border-dashed border-gray-300 hover:border-secondary transition-colors">
                      <CardContent className="flex flex-col items-center justify-center h-full min-h-[200px] text-center">
                        <Icon name="Plus" size={48} className="text-gray-400 mb-4" />
                        <h3 className="font-semibold text-lg mb-2">Добавить материал</h3>
                        <p className="text-sm text-gray-500 mb-4">
                          Загрузите видео, изображение или документ
                        </p>
                        <Button className="gap-2">
                          <Icon name="Upload" size={16} />
                          Загрузить файл
                        </Button>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        )}

        {currentView === 'chats' && (
          <div className="animate-fade-in">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Чаты</h1>
                <p className="text-gray-600">Общайтесь в сообществах и учебных группах</p>
              </div>
              {userRole === 'student' && (
                <Button 
                  onClick={() => setShowCreateChatDialog(true)}
                  className="gap-2"
                >
                  <Icon name="Plus" size={18} />
                  Создать чат
                </Button>
              )}
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-1">
                <CardHeader>
                  <CardTitle className="text-lg">Все чаты</CardTitle>
                  <div className="flex gap-2 mt-2">
                    <Badge variant="secondary" className="cursor-pointer">Все</Badge>
                    <Badge variant="outline" className="cursor-pointer">Сообщества</Badge>
                    <Badge variant="outline" className="cursor-pointer">Учебные</Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <ScrollArea className="h-[600px]">
                    {chatRooms.map((chat) => (
                      <div 
                        key={chat.id}
                        className={`flex items-start gap-3 p-4 hover:bg-gray-50 cursor-pointer border-b transition-colors ${
                          selectedChat?.id === chat.id ? 'bg-secondary/5' : ''
                        }`}
                        onClick={() => openChat(chat)}
                      >
                        <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center text-2xl shrink-0">
                          {chat.avatar}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 mb-1">
                            <div className="font-semibold text-sm truncate">{chat.name}</div>
                            {chat.unreadCount ? (
                              <Badge variant="destructive" className="text-xs shrink-0">{chat.unreadCount}</Badge>
                            ) : null}
                          </div>
                          <div className="text-xs text-gray-500 truncate mb-1">{chat.lastMessage}</div>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="text-xs">
                              <Icon name="Users" size={10} className="mr-1" />
                              {chat.members}
                            </Badge>
                            {chat.lastMessageTime && (
                              <span className="text-xs text-gray-400">{chat.lastMessageTime}</span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </ScrollArea>
                </CardContent>
              </Card>

              <Card className="lg:col-span-2">
                {selectedChat ? (
                  <>
                    <CardHeader className="border-b">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center text-2xl">
                            {selectedChat.avatar}
                          </div>
                          <div>
                            <CardTitle className="text-lg">{selectedChat.name}</CardTitle>
                            <CardDescription className="flex items-center gap-2 text-xs mt-1">
                              <Icon name="Users" size={12} />
                              {selectedChat.members} участников
                              <span className="ml-2">•</span>
                              <span>{selectedChat.type === 'community' ? 'Чат сообщества' : 'Учебная группа'}</span>
                            </CardDescription>
                          </div>
                        </div>
                        <Button variant="outline" size="sm" className="gap-2">
                          <Icon name="Info" size={16} />
                          О чате
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="p-0">
                      <ScrollArea className="h-[480px] p-4">
                        <div className="space-y-4">
                          {chatMessages.map((msg) => (
                            <div 
                              key={msg.id}
                              className={`flex gap-3 ${msg.isOwn ? 'flex-row-reverse' : 'flex-row'}`}
                            >
                              <Avatar className="w-10 h-10 shrink-0">
                                <AvatarFallback className="bg-secondary text-white text-sm">
                                  {msg.userName.split(' ').map(n => n[0]).join('')}
                                </AvatarFallback>
                              </Avatar>
                              <div className={`flex flex-col ${msg.isOwn ? 'items-end' : 'items-start'} max-w-[70%]`}>
                                {!msg.isOwn && (
                                  <span className="text-xs font-semibold text-gray-700 mb-1">{msg.userName}</span>
                                )}
                                <div className={`rounded-lg p-3 ${
                                  msg.isOwn ? 'bg-primary text-white' : 'bg-gray-100'
                                }`}>
                                  <p className="text-sm">{msg.text}</p>
                                </div>
                                <span className="text-xs text-gray-400 mt-1">{msg.time}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </ScrollArea>
                      <div className="p-4 border-t">
                        <div className="flex gap-2">
                          <Input placeholder="Введите сообщение..." />
                          <Button size="icon">
                            <Icon name="Send" size={18} />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </>
                ) : (
                  <CardContent className="flex flex-col items-center justify-center h-[600px] text-center">
                    <Icon name="MessageCircle" size={64} className="text-gray-300 mb-4" />
                    <h3 className="font-semibold text-lg mb-2">Выберите чат</h3>
                    <p className="text-sm text-gray-500">
                      Выберите чат из списка слева, чтобы начать общение
                    </p>
                  </CardContent>
                )}
              </Card>
            </div>
          </div>
        )}

        {currentView === 'profile' && userRole === 'student' && (
          <div className="animate-fade-in">
            <div className="grid gap-6 lg:grid-cols-3">
              <div className="lg:col-span-1">
                <Card>
                  <CardHeader className="text-center">
                    <Avatar className="w-24 h-24 mx-auto mb-4">
                      <AvatarFallback className="bg-secondary text-white text-2xl">
                        {userProfile.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <CardTitle>{userProfile.name}</CardTitle>
                    <CardDescription>Уровень {userProfile.level}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="text-2xl font-bold text-primary">{userProfile.points}</div>
                        <div className="text-xs text-gray-500">Баллов</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-secondary">{userProfile.tasksCompleted}</div>
                        <div className="text-xs text-gray-500">Задач</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-accent">{userProfile.achievements}</div>
                        <div className="text-xs text-gray-500">Наград</div>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-2 text-sm">О себе</h3>
                      <p className="text-sm text-gray-600">{userProfile.bio}</p>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-2 text-sm">Навыки</h3>
                      <div className="flex flex-wrap gap-2">
                        {userProfile.skills.map((skill) => (
                          <Badge key={skill} variant="secondary">{skill}</Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Icon name="ListTodo" size={24} />
                      Текущие задания
                    </CardTitle>
                    <CardDescription>Задачи, над которыми вы сейчас работаете</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {userProfile.currentTasks.map((task) => (
                        <div key={task.id} className="flex items-center justify-between p-4 rounded-lg border">
                          <div>
                            <h4 className="font-semibold mb-1">{task.title}</h4>
                            <Badge variant="outline" className="text-xs">{task.status}</Badge>
                          </div>
                          <Button variant="outline" size="sm">
                            Открыть
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Icon name="Trophy" size={24} />
                      Достижения
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4 sm:grid-cols-2">
                      {achievements.map((achievement) => (
                        <div
                          key={achievement.id}
                          className={`p-4 rounded-lg border-2 transition-all ${
                            achievement.earned
                              ? 'border-secondary bg-secondary/5'
                              : 'border-gray-200 bg-gray-50'
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <div className="text-3xl">{achievement.icon}</div>
                            <div className="flex-1">
                              <h4 className="font-semibold mb-1">{achievement.title}</h4>
                              <p className="text-sm text-gray-600 mb-2">{achievement.description}</p>
                              {!achievement.earned && (
                                <>
                                  <Progress value={(achievement.progress / achievement.maxProgress) * 100} className="h-2 mb-1" />
                                  <p className="text-xs text-gray-500">
                                    {achievement.progress} / {achievement.maxProgress}
                                  </p>
                                </>
                              )}
                              {achievement.earned && (
                                <Badge className="bg-secondary">Получено</Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2">
                        <Icon name="FolderGit2" size={24} />
                        Портфолио проектов
                      </CardTitle>
                      <Button size="sm" className="gap-2">
                        <Icon name="Plus" size={16} />
                        Добавить проект
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {userProjects.map((project) => (
                        <div
                          key={project.id}
                          className="flex items-start gap-4 p-4 rounded-lg border border-gray-200 hover:border-secondary transition-colors"
                        >
                          <div className="w-16 h-16 bg-accent/10 rounded-lg flex items-center justify-center text-3xl shrink-0">
                            {project.image}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold mb-1">{project.title}</h4>
                            <p className="text-sm text-gray-600 mb-2">{project.description}</p>
                            <div className="flex flex-wrap gap-1 mb-2">
                              {project.technologies.map((tech) => (
                                <Badge key={tech} variant="outline" className="text-xs">{tech}</Badge>
                              ))}
                            </div>
                            <div className="text-xs text-gray-500">{project.completedAt}</div>
                          </div>
                          <Button variant="ghost" size="sm">
                            <Icon name="ExternalLink" size={16} />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        )}

        {currentView === 'profile' && userRole === 'company' && (
          <div className="animate-fade-in">
            <div className="grid gap-6 lg:grid-cols-3">
              <div className="lg:col-span-1">
                <Card>
                  <CardHeader className="text-center">
                    <div className="w-24 h-24 bg-secondary/10 rounded-2xl flex items-center justify-center text-5xl mx-auto mb-4">
                      {companyProfile.logo}
                    </div>
                    <CardTitle>{companyProfile.name}</CardTitle>
                    <CardDescription>{companyProfile.industry}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="text-2xl font-bold text-primary">{companyProfile.stats.tasksPublished}</div>
                        <div className="text-xs text-gray-500">Заданий</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-secondary">{companyProfile.stats.solutionsReceived}</div>
                        <div className="text-xs text-gray-500">Решений</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-accent">{companyProfile.stats.hiredInterns}</div>
                        <div className="text-xs text-gray-500">Стажеров</div>
                      </div>
                    </div>

                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Icon name="Users" size={16} />
                        <span>{companyProfile.employees} сотрудников</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Icon name="MapPin" size={16} />
                        <span>{companyProfile.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Icon name="Globe" size={16} />
                        <span>{companyProfile.website}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Icon name="Building2" size={24} />
                      О компании
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 leading-relaxed">{companyProfile.description}</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2">
                        <Icon name="ListTodo" size={24} />
                        Активные задания
                      </CardTitle>
                      <Button size="sm" className="gap-2">
                        <Icon name="Plus" size={16} />
                        Создать задание
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {tasks.slice(0, 2).map((task) => (
                        <div key={task.id} className="flex items-center justify-between p-4 rounded-lg border">
                          <div>
                            <h4 className="font-semibold mb-1">{task.title}</h4>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <Icon name="Users" size={14} />
                              {task.participants} участников
                            </div>
                          </div>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => openTaskView(task)}
                          >
                            Управление
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        )}

        {currentView === 'communities' && (
          <div className="animate-fade-in">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Сообщества</h1>
              <p className="text-gray-600">Присоединяйтесь к сообществам компаний и участвуйте в их проектах</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {communities.map((community) => (
                <Card 
                  key={community.id} 
                  className="hover:shadow-lg transition-shadow animate-scale-in cursor-pointer"
                  onClick={() => openCommunityPage(community)}
                >
                  <CardHeader>
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-16 h-16 bg-secondary/10 rounded-xl flex items-center justify-center text-3xl">
                        {community.logo}
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-lg">{community.name}</CardTitle>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className="text-xs gap-1">
                            <Icon name="Users" size={12} />
                            {community.members}
                          </Badge>
                          <Badge variant="secondary" className="text-xs gap-1">
                            <Icon name="ListTodo" size={12} />
                            {community.activeTasks}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <CardDescription className="line-clamp-2">{community.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button className="w-full gap-2">
                      Открыть сообщество
                      <Icon name="ArrowRight" size={16} />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </main>

      <Dialog open={showScoreDialog} onOpenChange={setShowScoreDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Оценить решение</DialogTitle>
            <DialogDescription>
              Выставите баллы студенту {selectedSolution?.studentName}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6 py-4">
            <div>
              <div className="flex items-center justify-between mb-4">
                <Label>Баллы за решение</Label>
                <div className="text-3xl font-bold text-primary">
                  {scoreValue[0]} / {selectedSolution?.maxScore}
                </div>
              </div>
              <Slider 
                value={scoreValue} 
                onValueChange={setScoreValue}
                max={selectedSolution?.maxScore || 500}
                step={5}
                className="mb-2"
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>0</span>
                <span>{selectedSolution?.maxScore}</span>
              </div>
            </div>

            <div>
              <Label>Комментарий (необязательно)</Label>
              <Textarea 
                placeholder="Отличная работа! Все требования выполнены..."
                rows={4}
              />
            </div>

            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={() => setShowScoreDialog(false)}>
                Отмена
              </Button>
              <Button onClick={saveScore} className="gap-2">
                <Icon name="Check" size={16} />
                Сохранить оценку
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showCreateChatDialog} onOpenChange={setShowCreateChatDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Создать учебный чат</DialogTitle>
            <DialogDescription>
              Создайте чат для общения с единомышленниками
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <Label>Название чата</Label>
              <Input placeholder="Например: Python разработчики" />
            </div>
            <div>
              <Label>Описание</Label>
              <Textarea 
                placeholder="Обсуждаем разработку на Python и делимся опытом"
                rows={3}
              />
            </div>
            <div>
              <Label>Иконка (эмодзи)</Label>
              <Input placeholder="🐍" maxLength={2} />
            </div>
            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={() => setShowCreateChatDialog(false)}>
                Отмена
              </Button>
              <Button onClick={() => {
                setShowCreateChatDialog(false);
                setCurrentView('chats');
              }} className="gap-2">
                <Icon name="Plus" size={16} />
                Создать чат
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;
