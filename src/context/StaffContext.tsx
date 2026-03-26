import React, { createContext, useContext, useState } from 'react';

// ✅ Matches backend payload exactly
export interface StaffData {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
  groupId?: string;        // ✅ renamed from group
  departmentIds: string[]; // ✅ renamed from departments
  canManageDoctorSlots: boolean;   // ✅ renamed from permissions.manageDoctorSlot
  canManageStaff: boolean;         // ✅ renamed from permissions.manageStaff
  canManageGroups: boolean;        // ✅ renamed from permissions.manageGroup
  canManageHealthPackages: boolean;// ✅ renamed from permissions.manageHealthPackage
  canExportReports: boolean;       // ✅ new field

  // ── UI only fields (not sent to backend) ──
  name: string;
  department: string;
}

const INITIAL_STAFF: StaffData[] = [
  {
    id: '1',
    firstName: 'Anitha',
    lastName: 'S B',
    email: 'anitha@hms.com',
    password: '123456',
    role: 'STAFF',
    groupId: undefined,
    departmentIds: [],
    canManageDoctorSlots: false,
    canManageStaff: true,
    canManageGroups: false,
    canManageHealthPackages: false,
    canExportReports: false,
    name: 'Anitha S B',
    department: 'Dermatology',
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
    setStaffList(prev => [...prev, staff]);
  };

  const updateStaff = (staff: StaffData) => {
    setStaffList(prev => prev.map(s => s.id === staff.id ? staff : s));
  };

  const deleteStaff = (id: string) => {
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