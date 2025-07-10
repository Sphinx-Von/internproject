export interface Teacher {
  id: string;
  name: string;
  email: string;
  workEmail?: string;
  phone: string;
  address: {
    street: string;
    city: string;
    country: string;
    postalCode: string;
  };
  avatar?: string;
  status: 'active' | 'inactive' | 'pending';
  joinDate: string;
  totalEarnings: number;
  rating: number;
  completedLessons: number;
}

export interface Qualification {
  id: string;
  name: string;
  rate: number;
  category: 'private' | 'group';
  isActive: boolean;
  description?: string;
}

export interface ScheduleSlot {
  id: string;
  day: string;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
  studentName?: string;
  subject?: string;
  type: 'lesson' | 'break' | 'available';
}

export interface PaymentTransaction {
  id: string;
  amount: number;
  date: string;
  status: 'completed' | 'pending' | 'failed';
  description: string;
  method: 'card' | 'bank' | 'paypal';
}