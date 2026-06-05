export interface DCR {
  id: string;
  pharma_company_id: string;
  user_id: string;
  user_name?: string;
  date_time: string;
  day_part: '1st Half' | '2nd Half';
  hq: string;
  organization_id: string;
  organization_name?: string;
  doctor_id: string;
  doctor_name?: string;
  location: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  territory_name?: string;
  tour_plan_connected?: boolean;
}
