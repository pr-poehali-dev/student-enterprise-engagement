import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';

type UserRole = 'student' | 'company' | null;
type TaskStatus = 'public' | 'private';

interface Task {
  id: string;
  title: string;
  company: string;
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
  studentAvatar: string;
  taskId: string;
  taskTitle: string;
  description: string;
  submittedAt: string;
  score: number;
  files: string[];
}

interface Message {
  id: string;
  from: string;
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
}

const Index = () => {
  const [userRole, setUserRole] = useState<UserRole>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showAuthDialog, setShowAuthDialog] = useState(true);
  const [currentView, setCurrentView] = useState<'feed' | 'profile' | 'communities' | 'solutions' | 'messages'>('feed');
  const [selectedSolution, setSelectedSolution] = useState<Solution | null>(null);
  const [showChatDialog, setShowChatDialog] = useState(false);
  const [selectedChatUser, setSelectedChatUser] = useState<string | null>(null);

  const handleRoleSelect = (role: UserRole) => {
    setUserRole(role);
    setIsAuthenticated(true);
    setShowAuthDialog(false);
  };

  const tasks: Task[] = [
    {
      id: '1',
      title: 'Разработка мобильного приложения для логистики',
      company: 'ТехноЛогистик',
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
      studentAvatar: '',
      taskId: '1',
      taskTitle: 'Разработка мобильного приложения для логистики',
      description: 'Разработал прототип в Figma с основными экранами: отслеживание груза, уведомления, история заказов. Добавил интерактивную карту и пуш-уведомления.',
      submittedAt: '2 часа назад',
      score: 485,
      files: ['prototype.fig', 'presentation.pdf']
    },
    {
      id: '2',
      studentName: 'Иван Смирнов',
      studentAvatar: '',
      taskId: '1',
      taskTitle: 'Разработка мобильного приложения для логистики',
      description: 'React Native приложение с интеграцией Google Maps API. Реализован функционал отслеживания в реальном времени через WebSocket.',
      submittedAt: '5 часов назад',
      score: 495,
      files: ['app.zip', 'demo-video.mp4']
    },
    {
      id: '3',
      studentName: 'Мария Козлова',
      studentAvatar: '',
      taskId: '2',
      taskTitle: 'Анализ данных продаж',
      description: 'Провела анализ с использованием Python и Pandas. Выявила тренды продаж, сезонность и предложила 5 рекомендаций для роста выручки.',
      submittedAt: '1 день назад',
      score: 290,
      files: ['analysis.ipynb', 'report.pdf']
    }
  ];

  const chatMessages: Message[] = [
    { id: '1', from: 'Анна Петрова', text: 'Добрый день! Интересует возможность стажировки', time: '14:20', isOwn: false },
    { id: '2', from: 'Вы', text: 'Здравствуйте! Да, мы рассматриваем кандидатов', time: '14:25', isOwn: true },
    { id: '3', from: 'Анна Петрова', text: 'Отлично! Когда можно обсудить детали?', time: '14:27', isOwn: false }
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
      progress: 650,
      maxProgress: 1000,
      earned: false
    },
    {
      id: '3',
      title: 'Командный игрок',
      description: 'Примите участие в 10 командных проектах',
      icon: '👥',
      progress: 5,
      maxProgress: 10,
      earned: false
    },
    {
      id: '4',
      title: 'Эксперт',
      description: 'Решите 5 сложных задач',
      icon: '🏆',
      progress: 2,
      maxProgress: 5,
      earned: false
    }
  ];

  const communities: Community[] = [
    {
      id: '1',
      name: 'ТехноЛогистик',
      logo: '🚚',
      description: 'Инновационные решения в сфере логистики и доставки',
      members: 156,
      activeTasks: 8
    },
    {
      id: '2',
      name: 'РетейлПро',
      logo: '📊',
      description: 'Современные технологии для розничной торговли',
      members: 203,
      activeTasks: 12
    },
    {
      id: '3',
      name: 'Креатив Студия',
      logo: '🎨',
      description: 'Дизайн и креативные решения для бизнеса',
      members: 89,
      activeTasks: 5
    }
  ];

  const userProfile = {
    name: 'Анна Петрова',
    avatar: '',
    points: 650,
    level: 5,
    achievements: 1,
    tasksCompleted: 7,
    bio: 'Студентка 3 курса факультета информационных технологий. Интересуюсь веб-разработкой и UX/UI дизайном.',
    skills: ['React', 'TypeScript', 'Figma', 'Python', 'SQL'],
    projects: [
      { title: 'Система управления задачами', tech: 'React, Node.js' },
      { title: 'Мобильное приложение для заметок', tech: 'React Native' },
      { title: 'Дашборд аналитики', tech: 'React, D3.js' }
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

  const openChat = (userName: string) => {
    setSelectedChatUser(userName);
    setShowChatDialog(true);
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
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
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
              {userRole === 'company' && (
                <Button
                  variant={currentView === 'solutions' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setCurrentView('solutions')}
                  className="gap-2"
                >
                  <Icon name="FileCheck" size={18} />
                  <span className="hidden sm:inline">Решения</span>
                </Button>
              )}
              <Button
                variant={currentView === 'messages' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setCurrentView('messages')}
                className="gap-2"
              >
                <Icon name="MessageCircle" size={18} />
                <span className="hidden sm:inline">Сообщения</span>
                <Badge variant="destructive" className="ml-1">3</Badge>
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
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Лента заданий</h1>
              <p className="text-gray-600">Актуальные задачи от ведущих компаний</p>
            </div>

            {userRole === 'company' && (
              <Card className="mb-6 border-accent">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Plus" size={24} />
                    Создать новое задание
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Button className="gap-2">
                    <Icon name="Plus" size={18} />
                    Добавить задание
                  </Button>
                </CardContent>
              </Card>
            )}

            <div className="grid gap-6 lg:grid-cols-2">
              {tasks.map((task) => (
                <Card key={task.id} className="hover:shadow-lg transition-shadow animate-scale-in">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center text-2xl">
                          {task.companyLogo}
                        </div>
                        <div>
                          <CardTitle className="text-lg">{task.title}</CardTitle>
                          <CardDescription>{task.company}</CardDescription>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 flex-wrap">
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
                      {userRole === 'student' && (
                        <Button size="sm" className="gap-2">
                          Принять участие
                          <Icon name="ArrowRight" size={16} />
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {currentView === 'solutions' && userRole === 'company' && (
          <div className="animate-fade-in">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Решения участников</h1>
              <p className="text-gray-600">Просматривайте и оценивайте решения студентов</p>
            </div>

            <div className="grid gap-6">
              {solutions.map((solution) => (
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
                          <CardDescription>{solution.taskTitle}</CardDescription>
                        </div>
                      </div>
                      <Badge variant="secondary" className="gap-1">
                        <Icon name="Star" size={14} />
                        {solution.score} баллов
                      </Badge>
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

                    <div className="flex items-center justify-between pt-2">
                      <span className="text-sm text-gray-500">
                        Отправлено {solution.submittedAt}
                      </span>
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => openChat(solution.studentName)}
                          className="gap-2"
                        >
                          <Icon name="MessageCircle" size={16} />
                          Написать
                        </Button>
                        <Button size="sm" className="gap-2">
                          <Icon name="Eye" size={16} />
                          Подробнее
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {currentView === 'messages' && (
          <div className="animate-fade-in">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Сообщения</h1>
              <p className="text-gray-600">Ваши диалоги с {userRole === 'company' ? 'участниками' : 'компаниями'}</p>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-1">
                <CardHeader>
                  <CardTitle className="text-lg">Диалоги</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <ScrollArea className="h-[500px]">
                    {['Анна Петрова', 'Иван Смирнов', 'Мария Козлова'].map((name, idx) => (
                      <div 
                        key={idx}
                        className="flex items-center gap-3 p-4 hover:bg-gray-50 cursor-pointer border-b"
                        onClick={() => setSelectedChatUser(name)}
                      >
                        <Avatar>
                          <AvatarFallback className="bg-secondary text-white">
                            {name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="font-semibold text-sm">{name}</div>
                          <div className="text-xs text-gray-500">Интересует стажировка...</div>
                        </div>
                        <Badge variant="destructive" className="text-xs">1</Badge>
                      </div>
                    ))}
                  </ScrollArea>
                </CardContent>
              </Card>

              <Card className="lg:col-span-2">
                <CardHeader className="border-b">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback className="bg-secondary text-white">АП</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg">Анна Петрова</CardTitle>
                      <CardDescription className="text-xs">онлайн</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <ScrollArea className="h-[400px] p-4">
                    <div className="space-y-4">
                      {chatMessages.map((msg) => (
                        <div 
                          key={msg.id}
                          className={`flex ${msg.isOwn ? 'justify-end' : 'justify-start'}`}
                        >
                          <div className={`max-w-[70%] rounded-lg p-3 ${
                            msg.isOwn ? 'bg-primary text-white' : 'bg-gray-100'
                          }`}>
                            <p className="text-sm">{msg.text}</p>
                            <span className={`text-xs ${msg.isOwn ? 'text-gray-200' : 'text-gray-500'}`}>
                              {msg.time}
                            </span>
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
                      <AvatarImage src={userProfile.avatar} />
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
                    <CardTitle className="flex items-center gap-2">
                      <Icon name="FolderGit2" size={24} />
                      Портфолио проектов
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {userProfile.projects.map((project, index) => (
                        <div
                          key={index}
                          className="flex items-start gap-4 p-4 rounded-lg border border-gray-200 hover:border-secondary transition-colors"
                        >
                          <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                            <Icon name="Code2" className="text-accent" size={20} />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold mb-1">{project.title}</h4>
                            <p className="text-sm text-gray-600">{project.tech}</p>
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
                          <Button variant="outline" size="sm">
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
                <Card key={community.id} className="hover:shadow-lg transition-shadow animate-scale-in">
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
                    <Tabs defaultValue="tasks" className="w-full">
                      <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="tasks">Задания</TabsTrigger>
                        <TabsTrigger value="rating">Рейтинг</TabsTrigger>
                      </TabsList>
                      <TabsContent value="tasks" className="space-y-2 mt-4">
                        <p className="text-sm text-gray-600">Активных заданий: {community.activeTasks}</p>
                        <div className="flex gap-2">
                          <Button className="flex-1 gap-2">
                            <Icon name="ChevronRight" size={16} />
                            Задания
                          </Button>
                          {userRole === 'company' && (
                            <Button variant="outline" size="icon">
                              <Icon name="MessageSquare" size={16} />
                            </Button>
                          )}
                        </div>
                      </TabsContent>
                      <TabsContent value="rating" className="mt-4">
                        <div className="space-y-3">
                          {[1, 2, 3].map((rank) => (
                            <div key={rank} className="flex items-center gap-3 p-2 rounded-lg bg-gray-50">
                              <div className="w-8 h-8 bg-secondary/20 rounded-full flex items-center justify-center font-bold text-sm">
                                {rank}
                              </div>
                              <div className="flex-1">
                                <div className="text-sm font-medium">Студент {rank}</div>
                                <div className="text-xs text-gray-500">{1000 - rank * 100} баллов</div>
                              </div>
                              {userRole === 'company' && (
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <Icon name="MessageCircle" size={14} />
                                </Button>
                              )}
                            </div>
                          ))}
                          <Button variant="outline" className="w-full" size="sm">
                            Полный рейтинг
                          </Button>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </main>

      <Dialog open={showChatDialog} onOpenChange={setShowChatDialog}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Написать участнику</DialogTitle>
            <DialogDescription>
              Сообщение для {selectedChatUser}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Тема</Label>
              <Input placeholder="Приглашение на стажировку" />
            </div>
            <div>
              <Label>Сообщение</Label>
              <Textarea 
                placeholder="Здравствуйте! Нам понравилось ваше решение..."
                rows={6}
              />
            </div>
            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={() => setShowChatDialog(false)}>
                Отмена
              </Button>
              <Button onClick={() => {
                setShowChatDialog(false);
                setCurrentView('messages');
              }}>
                Отправить
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;
