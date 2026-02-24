import { DoctorFormValues } from '../../../types/doctor.types';

export const validateDoctorForm = (values: DoctorFormValues): string | null => {
  if (!values.doctorName.trim()) {
    return 'Doctor name is required';
  }

  if (!values.department) {
    return 'Please select department';
  }

  if (!values.opdFrom || !values.opdTo) {
    return 'Please select OPD timing';
  }

  if (values.visitingType === 'regular' && values.regularDays.length === 0) {
    return 'Select at least one regular visiting day';
  }

  if (
    values.visitingType === 'specific' &&
    Object.keys(values.specificWeeks).length === 0
  ) {
    return 'Select at least one specific week day';
  }

  if (!values.patientsPerHour || Number(values.patientsPerHour) <= 0) {
    return 'Patients per hour must be greater than 0';
  }

  if (!values.advanceBookingDays || Number(values.advanceBookingDays) < 0) {
    return 'Advance booking days must be valid';
  }

  return null;
};
