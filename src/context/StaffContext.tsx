import React, { createContext, useContext, useState } from 'react';

export interface StaffData {
  id: string;
  name: string;
  role: string;
  department: string;
  username: string;
  password: string;
  group?: string;
  departments: string[];
  permissions: {
    manageDoctorSlot: boolean;
    manageStaff: boolean;
    manageGroup: boolean;
    manageHealthPackage: boolean;
  };
}

const INITIAL_STAFF: StaffData[] = [
  {
    id: '1',
    name: 'ANITHA S B',
    role: 'Dermatology Consultant',
    department: 'Dermatology',
    username: 'anitha',
    password: '123456',
    departments: ['Dermatology'],
    permissions: {
      manageDoctorSlot: false,
      manageStaff: true,
      manageGroup: false,
      manageHealthPackage: false,
    },
  },
];

interface StaffContextType {
  staffList: StaffData[];
  addStaff: (staff: StaffData) => void;
  updateStaff: (staff: StaffData) => void;
  deleteStaff: (id: string) => void;
}

const StaffContext = createContext<StaffContextType | undefined>(undefined);

export const StaffProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [staffList, setStaffList] = useState<StaffData[]>(INITIAL_STAFF);

  const addStaff = (staff: StaffData) => {
    // TODO: replace with API call when backend is ready
    // await fetch('https://your-api.com/staff', { method: 'POST', body: JSON.stringify(staff) });
    setStaffList(prev => [...prev, staff]);
  };

  const updateStaff = (staff: StaffData) => {
    // TODO: replace with API call when backend is ready
    // await fetch(`https://your-api.com/staff/${staff.id}`, { method: 'PUT', body: JSON.stringify(staff) });
    setStaffList(prev => prev.map(s => s.id === staff.id ? staff : s));
  };

  const deleteStaff = (id: string) => {
    // TODO: replace with API call when backend is ready
    // await fetch(`https://your-api.com/staff/${id}`, { method: 'DELETE' });
    setStaffList(prev => prev.filter(s => s.id !== id));
  };

  return (
    <StaffContext.Provider value={{ staffList, addStaff, updateStaff, deleteStaff }}>
      {children}
    </StaffContext.Provider>
  );
};

export const useStaff = () => {
  const ctx = useContext(StaffContext);
  if (!ctx) throw new Error('useStaff must be used within StaffProvider');
  return ctx;
};