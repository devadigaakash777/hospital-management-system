export type VisitingType = 'regular' | 'specific';

export type WeekSelection = {
  [week: string]: string[];
};

export interface DoctorFormValues {
  doctorName: string;
  department: string | null;
  opdFrom: Date | null;
  opdTo: Date | null;
  visitingType: VisitingType;
  regularDays: string[];
  specificWeeks: WeekSelection;
  patientsPerHour: string;
  advanceBookingDays: string;
}
