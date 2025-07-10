'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Edit, 
  Save, 
  X, 
  Star,
  BookOpen,
  DollarSign,
  Calendar
} from 'lucide-react';
import { Teacher } from '../types/teacher';

interface TeacherProfileProps {
  teacher: Teacher;
  onUpdate: (teacher: Teacher) => void;
}

export function TeacherProfile({ teacher, onUpdate }: TeacherProfileProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTeacher, setEditedTeacher] = useState<Teacher>(teacher);

  const handleSave = () => {
    onUpdate(editedTeacher);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedTeacher(teacher);
    setIsEditing(false);
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={teacher.avatar} alt={teacher.name} />
              <AvatarFallback className="text-lg">
                {teacher.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-2xl">{teacher.name}</CardTitle>
              <div className="flex items-center space-x-2 mt-1">
                <Badge variant={teacher.status === 'active' ? 'default' : 'secondary'}>
                  {teacher.status}
                </Badge>
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm text-muted-foreground">{teacher.rating}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex space-x-2">
            {isEditing ? (
              <>
                <Button size="sm" onClick={handleSave}>
                  <Save className="h-4 w-4 mr-2" />
                  Save
                </Button>
                <Button size="sm" variant="outline" onClick={handleCancel}>
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
              </>
            ) : (
              <Button size="sm" variant="outline" onClick={() => setIsEditing(true)}>
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Button>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="details" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="qualifications">Qualifications</TabsTrigger>
            <TabsTrigger value="schedule">Schedule</TabsTrigger>
            <TabsTrigger value="payments">Payments</TabsTrigger>
          </TabsList>
          
          <TabsContent value="details" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    {isEditing ? (
                      <Input
                        id="email"
                        value={editedTeacher.email}
                        onChange={(e) => setEditedTeacher({...editedTeacher, email: e.target.value})}
                      />
                    ) : (
                      <span>{teacher.email}</span>
                    )}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="workEmail">Work Email</Label>
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    {isEditing ? (
                      <Input
                        id="workEmail"
                        value={editedTeacher.workEmail || ''}
                        onChange={(e) => setEditedTeacher({...editedTeacher, workEmail: e.target.value})}
                      />
                    ) : (
                      <span>{teacher.workEmail || 'Not provided'}</span>
                    )}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    {isEditing ? (
                      <Input
                        id="phone"
                        value={editedTeacher.phone}
                        onChange={(e) => setEditedTeacher({...editedTeacher, phone: e.target.value})}
                      />
                    ) : (
                      <span>{teacher.phone}</span>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Address</Label>
                  <div className="flex items-start space-x-2">
                    <MapPin className="h-4 w-4 text-muted-foreground mt-1" />
                    <div className="space-y-1 text-sm">
                      <div>{teacher.address.street}</div>
                      <div>{teacher.address.city}, {teacher.address.postalCode}</div>
                      <div>{teacher.address.country}</div>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4 pt-4">
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-2">
                      <BookOpen className="h-5 w-5 text-primary" />
                    </div>
                    <div className="text-2xl font-bold">{teacher.completedLessons}</div>
                    <div className="text-sm text-muted-foreground">Lessons</div>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-2">
                      <DollarSign className="h-5 w-5 text-green-600" />
                    </div>
                    <div className="text-2xl font-bold">${teacher.totalEarnings.toLocaleString()}</div>
                    <div className="text-sm text-muted-foreground">Earnings</div>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-2">
                      <Calendar className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="text-2xl font-bold">{new Date(teacher.joinDate).getFullYear()}</div>
                    <div className="text-sm text-muted-foreground">Joined</div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="qualifications">
            <div className="text-center py-8 text-muted-foreground">
              Qualifications management will be implemented here
            </div>
          </TabsContent>
          
          <TabsContent value="schedule">
            <div className="text-center py-8 text-muted-foreground">
              Schedule management will be implemented here
            </div>
          </TabsContent>
          
          <TabsContent value="payments">
            <div className="text-center py-8 text-muted-foreground">
              Payment interface will be implemented here
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}