'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Clock, Calendar, Plus, Edit, Trash2 } from 'lucide-react';
import { ScheduleSlot } from '../types/teacher';

interface ScheduleManagerProps {
  schedule: ScheduleSlot[];
  onUpdate: (schedule: ScheduleSlot[]) => void;
}

export function ScheduleManager({ schedule, onUpdate }: ScheduleManagerProps) {
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const timeSlots = Array.from({ length: 24 }, (_, i) => {
    const hour = i.toString().padStart(2, '0');
    return `${hour}:00`;
  });

  const getSlotForDayAndTime = (day: string, time: string) => {
    return schedule.find(slot => slot.day === day && slot.startTime === time);
  };

  const getSlotColor = (slot: ScheduleSlot | undefined) => {
    if (!slot) return 'bg-gray-100 hover:bg-gray-200';
    
    switch (slot.type) {
      case 'lesson':
        return 'bg-green-500 text-white';
      case 'break':
        return 'bg-yellow-500 text-white';
      case 'available':
        return 'bg-blue-500 text-white';
      default:
        return 'bg-gray-100 hover:bg-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Weekly Schedule</h3>
        <Button className="flex items-center space-x-2">
          <Plus className="h-4 w-4" />
          <span>Add Time Slot</span>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="h-5 w-5" />
            <span>Schedule Overview</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <div className="min-w-full">
              {/* Header */}
              <div className="grid grid-cols-8 gap-2 mb-4">
                <div className="text-sm font-medium text-center">Time</div>
                {days.map(day => (
                  <div key={day} className="text-sm font-medium text-center">
                    {day.slice(0, 3)}
                  </div>
                ))}
              </div>
              
              {/* Time slots */}
              <div className="space-y-2">
                {timeSlots.map(time => (
                  <div key={time} className="grid grid-cols-8 gap-2">
                    <div className="text-xs text-muted-foreground text-center py-2">
                      {time}
                    </div>
                    {days.map(day => {
                      const slot = getSlotForDayAndTime(day, time);
                      return (
                        <div
                          key={`${day}-${time}`}
                          className={`
                            h-8 rounded cursor-pointer transition-colors text-xs flex items-center justify-center
                            ${getSlotColor(slot)}
                          `}
                          onClick={() => setSelectedDay(day)}
                        >
                          {slot && slot.type === 'lesson' && (
                            <span className="truncate px-1">{slot.studentName}</span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Legend */}
      <Card>
        <CardHeader>
          <CardTitle>Legend</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-green-500 rounded"></div>
              <span className="text-sm">Lesson</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-blue-500 rounded"></div>
              <span className="text-sm">Available</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-yellow-500 rounded"></div>
              <span className="text-sm">Break</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-gray-100 border rounded"></div>
              <span className="text-sm">Unavailable</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Schedule Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-green-600" />
              <div>
                <div className="text-2xl font-bold">32</div>
                <div className="text-sm text-muted-foreground">Total Lessons</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-blue-600" />
              <div>
                <div className="text-2xl font-bold">18</div>
                <div className="text-sm text-muted-foreground">Available Hours</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-yellow-600" />
              <div>
                <div className="text-2xl font-bold">6</div>
                <div className="text-sm text-muted-foreground">Break Hours</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-purple-600" />
              <div>
                <div className="text-2xl font-bold">76%</div>
                <div className="text-sm text-muted-foreground">Utilization</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}