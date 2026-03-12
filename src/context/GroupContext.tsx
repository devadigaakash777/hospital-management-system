import React, { createContext, useContext, useState } from 'react';

export interface GroupData {
  id: string;
  name: string;
  departments: string[];
  permissions: string[];
}

const INITIAL_GROUPS: GroupData[] = [
  {
    id: '1',
    name: 'Accounts',
    departments: ['Dermatology', 'All'],
    permissions: ['Can Export Reports'],
  },
  {
    id: '2',
    name: 'Admin',
    departments: ['Dermatology', 'Endocrinology', 'Neurology'],
    permissions: [
      'Can Manage Doctor Slots',
      'Can Manage Staff',
      'Can Manage Groups',
      'Can Export Reports',
      'Can Manage Health Packages',
    ],
  },
];

interface GroupsContextType {
  groups: GroupData[];
  addGroup: (group: GroupData) => void;
  updateGroup: (group: GroupData) => void;
  deleteGroup: (id: string) => void;
}

const GroupsContext = createContext<GroupsContextType | undefined>(undefined);

export const GroupsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [groups, setGroups] = useState<GroupData[]>(INITIAL_GROUPS);

  const addGroup = (group: GroupData) => {
    // TODO: replace with API call when backend is ready
    // await fetch('https://your-api.com/groups', { method: 'POST', body: JSON.stringify(group) });
    setGroups(prev => [...prev, group]);
  };

  const updateGroup = (group: GroupData) => {
    // TODO: replace with API call when backend is ready
    // await fetch(`https://your-api.com/groups/${group.id}`, { method: 'PUT', body: JSON.stringify(group) });
    setGroups(prev => prev.map(g => g.id === group.id ? group : g));
  };

  const deleteGroup = (id: string) => {
    // TODO: replace with API call when backend is ready
    // await fetch(`https://your-api.com/groups/${id}`, { method: 'DELETE' });
    setGroups(prev => prev.filter(g => g.id !== id));
  };

  return (
    <GroupsContext.Provider value={{ groups, addGroup, updateGroup, deleteGroup }}>
      {children}
    </GroupsContext.Provider>
  );
};

export const useGroups = () => {
  const ctx = useContext(GroupsContext);
  if (!ctx) throw new Error('useGroups must be used within GroupsProvider');
  return ctx;
};