import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

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
  const [currentView, setCurrentView] = useState<'feed' | 'profile' | 'communities'>('feed');

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
                      <Button size="sm" className="gap-2">
                        Принять участие
                        <Icon name="ArrowRight" size={16} />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {currentView === 'profile' && (
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
                        <Button className="w-full gap-2">
                          Просмотреть задания
                          <Icon name="ChevronRight" size={16} />
                        </Button>
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
    </div>
  );
};

export default Index;
