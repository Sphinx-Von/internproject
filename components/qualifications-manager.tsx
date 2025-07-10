'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Switch } from './ui/switch';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Save, 
  X,
  DollarSign,
  Users,
  User
} from 'lucide-react';
import { Qualification } from '../types/teacher';

interface QualificationsManagerProps {
  qualifications: Qualification[];
  onUpdate: (qualifications: Qualification[]) => void;
}

export function QualificationsManager({ qualifications, onUpdate }: QualificationsManagerProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newQualification, setNewQualification] = useState<Partial<Qualification>>({
    name: '',
    rate: 0,
    category: 'private',
    isActive: true,
    description: ''
  });
  const [isAddingNew, setIsAddingNew] = useState(false);

  const handleEdit = (id: string) => {
    setEditingId(id);
  };

  const handleSave = (id: string, updatedQualification: Qualification) => {
    const updated = qualifications.map(q => 
      q.id === id ? updatedQualification : q
    );
    onUpdate(updated);
    setEditingId(null);
  };

  const handleDelete = (id: string) => {
    const updated = qualifications.filter(q => q.id !== id);
    onUpdate(updated);
  };

  const handleAddNew = () => {
    if (newQualification.name && newQualification.rate) {
      const qualification: Qualification = {
        id: Date.now().toString(),
        name: newQualification.name,
        rate: newQualification.rate,
        category: newQualification.category || 'private',
        isActive: newQualification.isActive || true,
        description: newQualification.description
      };
      onUpdate([...qualifications, qualification]);
      setNewQualification({
        name: '',
        rate: 0,
        category: 'private',
        isActive: true,
        description: ''
      });
      setIsAddingNew(false);
    }
  };

  const privateQualifications = qualifications.filter(q => q.category === 'private');
  const groupQualifications = qualifications.filter(q => q.category === 'group');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Qualifications & Rates</h3>
        <Button onClick={() => setIsAddingNew(true)} className="flex items-center space-x-2">
          <Plus className="h-4 w-4" />
          <span>Add Qualification</span>
        </Button>
      </div>

      {isAddingNew && (
        <Card className="border-2 border-dashed border-primary/20">
          <CardHeader>
            <CardTitle className="text-lg">Add New Qualification</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Qualification Name</Label>
                <Input
                  id="name"
                  value={newQualification.name}
                  onChange={(e) => setNewQualification({...newQualification, name: e.target.value})}
                  placeholder="e.g., Math Tutor"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="rate">Rate ($/hour)</Label>
                <Input
                  id="rate"
                  type="number"
                  value={newQualification.rate}
                  onChange={(e) => setNewQualification({...newQualification, rate: parseFloat(e.target.value)})}
                  placeholder="25.00"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <select
                id="category"
                value={newQualification.category}
                onChange={(e) => setNewQualification({...newQualification, category: e.target.value as 'private' | 'group'})}
                className="w-full p-2 border rounded-md"
              >
                <option value="private">Private</option>
                <option value="group">Group</option>
              </select>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="isActive"
                checked={newQualification.isActive}
                onCheckedChange={(checked) => setNewQualification({...newQualification, isActive: checked})}
              />
              <Label htmlFor="isActive">Active</Label>
            </div>
            <div className="flex space-x-2">
              <Button onClick={handleAddNew}>
                <Save className="h-4 w-4 mr-2" />
                Save
              </Button>
              <Button variant="outline" onClick={() => setIsAddingNew(false)}>
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <User className="h-5 w-5" />
              <span>Private Qualifications</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {privateQualifications.map((qualification) => (
                <QualificationCard
                  key={qualification.id}
                  qualification={qualification}
                  isEditing={editingId === qualification.id}
                  onEdit={() => handleEdit(qualification.id)}
                  onSave={(updated) => handleSave(qualification.id, updated)}
                  onDelete={() => handleDelete(qualification.id)}
                  onCancel={() => setEditingId(null)}
                />
              ))}
              {privateQualifications.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  No private qualifications added yet
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="h-5 w-5" />
              <span>Group Qualifications</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {groupQualifications.map((qualification) => (
                <QualificationCard
                  key={qualification.id}
                  qualification={qualification}
                  isEditing={editingId === qualification.id}
                  onEdit={() => handleEdit(qualification.id)}
                  onSave={(updated) => handleSave(qualification.id, updated)}
                  onDelete={() => handleDelete(qualification.id)}
                  onCancel={() => setEditingId(null)}
                />
              ))}
              {groupQualifications.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  No group qualifications added yet
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

interface QualificationCardProps {
  qualification: Qualification;
  isEditing: boolean;
  onEdit: () => void;
  onSave: (updated: Qualification) => void;
  onDelete: () => void;
  onCancel: () => void;
}

function QualificationCard({ qualification, isEditing, onEdit, onSave, onDelete, onCancel }: QualificationCardProps) {
  const [editedQualification, setEditedQualification] = useState(qualification);

  const handleSave = () => {
    onSave(editedQualification);
  };

  return (
    <div className="border rounded-lg p-4 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          {isEditing ? (
            <Input
              value={editedQualification.name}
              onChange={(e) => setEditedQualification({...editedQualification, name: e.target.value})}
              className="text-sm"
            />
          ) : (
            <h4 className="font-medium">{qualification.name}</h4>
          )}
          <Badge variant={qualification.isActive ? 'default' : 'secondary'}>
            {qualification.isActive ? 'Active' : 'Inactive'}
          </Badge>
        </div>
        <div className="flex items-center space-x-2">
          {isEditing ? (
            <>
              <Button size="sm" onClick={handleSave}>
                <Save className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="outline" onClick={onCancel}>
                <X className="h-4 w-4" />
              </Button>
            </>
          ) : (
            <>
              <Button size="sm" variant="outline" onClick={onEdit}>
                <Edit className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="destructive" onClick={onDelete}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </>
          )}
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <DollarSign className="h-4 w-4 text-green-600" />
        {isEditing ? (
          <Input
            type="number"
            value={editedQualification.rate}
            onChange={(e) => setEditedQualification({...editedQualification, rate: parseFloat(e.target.value)})}
            className="w-24"
          />
        ) : (
          <span className="font-semibold text-green-600">${qualification.rate}/hr</span>
        )}
      </div>
    </div>
  );
}