export interface Inventory {
  inventory_id: string;
  pharma_company_id: string;
  user_id: string;
  inventory_no: string;
  purchasing_party_id: string;
  address: string;
  credit_days: number | null;
  maturity_date: string | null;
  purchase_invoice_value: number;
  net_purchase_value: number;
  gross_discount_percentage: number;
  paid_amount: number;
  due_amount: number;
  seller_inv_no: string;
  status: 'pending' | 'invoiced' | 'completed' | 'deactivated';
  no_show_qty_cost: boolean;
  created_at: string;
  updated_at: string;
  country_calling_code_id: string;
  purchasing_party: {
    organization_id: string;
    organization_name: string;
    address: string;
  };
  products: InventoryProduct[];
  payment_method?: string;
  payment_provider_id?: string;
    cost_after_taxes?: number;
  taxes?: Array<{
    inventory_taxes_id?: string;
    tax_type: string;
    percentage: number;
    amount: number;
  }>;
}

export interface InventoryProduct {
  inventory_products_id?: string;
  inventory_id: string;
  product_id: string;
  product_name: string;
  form: string;
  volume: string; 
  strength: string | null;
  package_type: string;
  quantity: number;
  production_date: string | null;
  expiry_date: string | null;
  batch_no: string | null;
  unit_price: number;
  global_curr_code?: string;
  glob_curr_amount?: number;
  roe?: number;
  local_currency: string;
}

export interface InventoryAllotment {
  allotment_id?: string;
  inventory_id: string;
  branch_id: string;
  product_id: string;
  quantity: number;
  created_at: string;
  updated_at: string;
}

export interface Branch {
  branch_id: string;
  branch_name: string;
}
