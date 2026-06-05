// src/models/distributions.ts
export interface Distribution {
  distribution_id: string;
  pharma_company_id: string;
  branch_id: string;
  delivery_man_id: string;
  creation_date_serial_no: string;
  status: string;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
  country_calling_code_id: string;
  sales_id: string;
  inventory_id: string;
  sales_invoice_id?: string;
  receiver_comments?: string | null;
  inventory_no: string;
  batch_no: string;
  distribution_no: string;
}

export interface DistributionProduct {
  distribution_products_id: string;
  distribution_id: string;
  product_id: string;
  quantity: number;
  requested_quantity: number;
  pharma_company_id: string;
  country_calling_code_id: string;
  distribution_created_at: Date;
  created_at: Date;
  updated_at: Date;
  
}


