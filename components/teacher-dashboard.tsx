'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { StatCard } from './ui/stat-card';
import { TeacherProfile } from './teacher-profile';
import { QualificationsManager } from './qualifications-manager';
import { ScheduleManager } from './schedule-manager';
import { PaymentInterface } from './payment-interface';
import { 
  Search,
  Filter,
  Users,
  BookOpen,
  DollarSign,
  Calendar,
  Bell,
  Settings,
  Menu,
  X
} from 'lucide-react';
import { Teacher, Qualification, ScheduleSlot, PaymentTransaction } from '../types/teacher';

export function TeacherDashboard() {
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Mock data - in real app, this would come from an API
  const mockTeacher: Teacher = {
    id: '1',
    name: 'Alynia Allan',
    email: 'alynia@example.com',
    workEmail: 'alynia.allan@example.com',
    phone: '(416) 555-0123',
    address: {
      street: '123 University Avenue',
      city: 'Toronto',
      country: 'Canada',
      postalCode: 'M5J 2K3'
    },
    status: 'active',
    joinDate: '2023-01-15',
    totalEarnings: 18750,
    rating: 4.8,
    completedLessons: 156
  };

  const mockQualifications: Qualification[] = [
    {
      id: '1',
      name: 'Vocal Contemporary',
      rate: 35.00,
      category: 'private',
      isActive: true
    },
    {
      id: '2',
      name: 'Vocal Jazz',
      rate: 40.00,
      category: 'private',
      isActive: true
    },
    {
      id: '3',
      name: 'Vocal Classical',
      rate: 45.00,
      category: 'private',
      isActive: true
    },
    {
      id: '4',
      name: 'Vocal Pop',
      rate: 30.00,
      category: 'private',
      isActive: true
    },
    {
      id: '5',
      name: 'Vocal Rock',
      rate: 35.00,
      category: 'private',
      isActive: true
    }
  ];

  const mockSchedule: ScheduleSlot[] = [
    {
      id: '1',
      day: 'Monday',
      startTime: '09:00',
      endTime: '10:00',
      isAvailable: false,
      studentName: 'John Doe',
      subject: 'Vocal Jazz',
      type: 'lesson'
    },
    {
      id: '2',
      day: 'Tuesday',
      startTime: '14:00',
      endTime: '15:00',
      isAvailable: false,
      studentName: 'Jane Smith',
      subject: 'Vocal Pop',
      type: 'lesson'
    },
    {
      id: '3',
      day: 'Wednesday',
      startTime: '10:00',
      endTime: '11:00',
      isAvailable: true,
      type: 'available'
    }
  ];

  const mockTransactions: PaymentTransaction[] = [
    {
      id: '1',
      amount: 350.00,
      date: '2024-01-15',
      status: 'completed',
      description: 'Weekly payment - Vocal lessons',
      method: 'bank'
    },
    {
      id: '2',
      amount: 280.00,
      date: '2024-01-08',
      status: 'completed',
      description: 'Weekly payment - Vocal lessons',
      method: 'bank'
    },
    {
      id: '3',
      amount: 420.00,
      date: '2024-01-22',
      status: 'pending',
      description: 'Payment request - Extra lessons',
      method: 'paypal'
    }
  ];

  const handleTeacherUpdate = (updatedTeacher: Teacher) => {
    setSelectedTeacher(updatedTeacher);
    // In real app, this would update the backend
    console.log('Teacher updated:', updatedTeacher);
  };

  const handleQualificationsUpdate = (qualifications: Qualification[]) => {
    // In real app, this would update the backend
    console.log('Qualifications updated:', qualifications);
  };

  const handleScheduleUpdate = (schedule: ScheduleSlot[]) => {
    // In real app, this would update the backend
    console.log('Schedule updated:', schedule);
  };

  const handlePaymentRequest = (amount: number) => {
    // In real app, this would create a payment request
    console.log('Payment request:', amount);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className='flex min-h-screen bg-gray-50'>
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static lg:inset-0
      `}>
        <div className="flex items-center justify-between h-16 px-4 border-b">
          <h1 className="text-xl font-bold text-gray-900">TeacherHub</h1>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        <nav className="mt-8">
          <div className="px-4 space-y-2">
            <Button variant="ghost" className="w-full justify-start" asChild>
              <a href="#" className="flex items-center space-x-3">
                <Users className="h-4 w-4" />
                <span>Teachers</span>
              </a>
            </Button>
            <Button variant="ghost" className="w-full justify-start" asChild>
              <a href="#" className="flex items-center space-x-3">
                <BookOpen className="h-4 w-4" />
                <span>Lessons</span>
              </a>
            </Button>
            <Button variant="ghost" className="w-full justify-start" asChild>
              <a href="#" className="flex items-center space-x-3">
                <DollarSign className="h-4 w-4" />
                <span>Payments</span>
              </a>
            </Button>
            <Button variant="ghost" className="w-full justify-start" asChild>
              <a href="#" className="flex items-center space-x-3">
                <Calendar className="h-4 w-4" />
                <span>Schedule</span>
              </a>
            </Button>
            <Button variant="ghost" className="w-full justify-start" asChild>
              <a href="#" className="flex items-center space-x-3">
                <Settings className="h-4 w-4" />
                <span>Settings</span>
              </a>
            </Button>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="lg:ml-18 flex-1 w-full">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="flex items-center justify-between h-16 px-4">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden"
              >
                <Menu className="h-4 w-4" />
              </Button>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search teachers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 w-64"
                />
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Bell className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-6">
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <StatCard
              title="Total Teachers"
              value="24"
              icon={Users}
              trend={{ value: 12, isPositive: true }}
            />
            <StatCard
              title="Active Lessons"
              value="156"
              icon={BookOpen}
              trend={{ value: 8, isPositive: true }}
            />
            <StatCard
              title="Monthly Revenue"
              value="$18,750"
              icon={DollarSign}
              trend={{ value: 15, isPositive: true }}
            />
            <StatCard
              title="This Week"
              value="32"
              icon={Calendar}
              trend={{ value: 5, isPositive: false }}
            />
          </div>

          {/* Teacher Profile */}
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Teacher Profile</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="profile" className="w-full">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="profile">Profile</TabsTrigger>
                    <TabsTrigger value="qualifications">Qualifications</TabsTrigger>
                    <TabsTrigger value="schedule">Schedule</TabsTrigger>
                    <TabsTrigger value="payments">Payments</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="profile" className="mt-6">
                    <TeacherProfile 
                      teacher={mockTeacher}
                      onUpdate={handleTeacherUpdate}
                    />
                  </TabsContent>
                  
                  <TabsContent value="qualifications" className="mt-6">
                    <QualificationsManager
                      qualifications={mockQualifications}
                      onUpdate={handleQualificationsUpdate}
                    />
                  </TabsContent>
                  
                  <TabsContent value="schedule" className="mt-6">
                    <ScheduleManager
                      schedule={mockSchedule}
                      onUpdate={handleScheduleUpdate}
                    />
                  </TabsContent>
                  
                  <TabsContent value="payments" className="mt-6">
                    <PaymentInterface
                      transactions={mockTransactions}
                      totalEarnings={mockTeacher.totalEarnings}
                      pendingPayments={420}
                      onPaymentRequest={handlePaymentRequest}
                    />
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
         </div>
    </div>
  );
}