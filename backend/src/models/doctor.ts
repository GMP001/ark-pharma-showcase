// src/models/doctor.ts
export interface Doctor {
  doctor_id: string;
  doctor_name: string;
  specialization: string;
  graduation_others_institute: string;
  designation: string;
  cell_phone_no: string;
  doctors_degree: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  assigned_organizations?: string;
  is_extended: boolean;
  is_shared: boolean;
  country_calling_code_id: string;
  pharma_company_id?: string;
  pharma_company_code?: string;
  has_assigned_doctors: boolean; // Added to match error context
}

export interface DoctorWithOrganizations {
  id: string;
  doctor_name: string;
  specialization: string;
  degrees_institutes: string;
  doctors_degree: string;
  designation?: string;
  cell_phone_no: string;
  status: 'active' | 'pending' | 'deactivated';
  organization_id?: string;
  organization_code?: string;
  organization_name?: string;
  created_at: string;
  updated_at: string;
}
