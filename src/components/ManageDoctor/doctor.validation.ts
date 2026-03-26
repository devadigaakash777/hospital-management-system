import { DoctorFormValues } from '../../types/doctor.types';

export const validateDoctorForm = (values: DoctorFormValues): string | null => {
  if (!values.user) {
    return 'Please select a user';
  }

  if (!values.department) {
    return 'Please select a department';
  }

  if (values.opdTimeRanges.length === 0) {
    return 'Please add at least one OPD time range';
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

  if (!values.advanceBookingDays || Number(values.advanceBookingDays) < 0) {
    return 'Advance booking days must be valid';
  }

  return null;
};