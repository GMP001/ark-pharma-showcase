export interface Branch {
  branch_id: string;
  branch_name: string;
  branch_code: string;
  house_no: string;
  road_no: string;
  police_station: string;
  postal_code: string;
  zip_code?: string;
  district: string;
  province?: string;
  phone_no?: string;
  cell_phone_no: string;
  contact_person: string;
  email_id?: string;
  in_charge_user_id?: string;
  in_charge_user_code?: string;
  pharma_company_id: string;
  country_calling_code_id: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  territories?: {
    territory_id: string;
    territory_name: string;
    territory_owner_code: string;
    status: 'active' | 'deactivated';
    organizations?: {
      organization_id: string;
      organization_code: string;
      organization_name: string;
      doctors?: {
        doctor_id: string;
        doctor_name: string;
        specialization: string;
      }[];
    }[];
  }[];
}

// New for stock
export interface BranchStock {
  branch_stock_id: string;
  branch_id: string;
  product_id: string;
  product_name: string;
  batch_no: string;
  quantity: number;
  expiration_date: string;
  stock_type: string;
  inventory_id: string;
  inventory_no: string;
  received_at: string;
}
