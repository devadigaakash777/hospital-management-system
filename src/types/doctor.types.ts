export type VisitingType = 'regular' | 'specific';

export type WeekSelection = {
  [week: string]: string[];
};

export interface DoctorFormValues {
  user: string | null;
  department: string | null;
  opdTimeRanges: { from: Date; to: Date; patients: string }[];
  visitingType: VisitingType;
  regularDays: string[];
  specificWeeks: WeekSelection;
  advanceBookingDays: string;
  roomNumber: string;         // ✅ text input
}