// src/controllers/dashboardController.ts
import { Request, Response } from 'express';
import * as dashboardService from '../services/dashboardService';
import { UnauthorizedError, BadRequestError } from '../utils/errorHandler';

export class DashboardController {
  async getDashboardData(req: Request, res: Response): Promise<void> {
    try {
      const user = req.user;
      if (!user) {
        throw new UnauthorizedError('User not authenticated');
      }

      const territoryId = req.query.territory_id as string | undefined;
      const branchId = req.query.branch_id as string | undefined;
      const startDate = req.query.start_date as string | undefined;
      const endDate = req.query.end_date as string | undefined;

      // Get tenant currency code
      let currencyCode = 'BDT';
      if (user.pharma_company_id) {
        try {
          const { safeQuery } = require('../utils/safeQuery');
          const rows = await safeQuery(
            `SELECT cc.currency_code 
             FROM ark_pharma_ii.pharma_companies pc
             JOIN ark_pharma_ii.country_codes cc ON pc.country_calling_code_id = cc.country_calling_code_id
             WHERE pc.pharma_company_id = $1`,
            [user.pharma_company_id]
          );
          if (rows[0]?.currency_code) currencyCode = rows[0].currency_code;
        } catch { /* keep default */ }
      }

      let monthlySales, currentMonthSales, maturedInvoices, totalSales, topProducts, dcrSummary, lowInventory, tourEfficiency;

      if (user.user_type === 'super_admin') {
        // Super admin: aggregated across all (filters ignored for now)
        [monthlySales, currentMonthSales, maturedInvoices, totalSales, topProducts, dcrSummary, lowInventory, tourEfficiency] = await Promise.all([
          dashboardService.getMonthlySalesForAll(),
          dashboardService.getCurrentMonthSalesForAll(),
          dashboardService.getMaturedInvoicesForAll(),
          dashboardService.getTotalSalesForAll(),
          dashboardService.getTopProductsForAll(),
          dashboardService.getDCRSummaryForAll(),
          dashboardService.getLowInventoryForAll(),
          dashboardService.getTourPlanEfficiencyForAll(),
        ]);
      } else {
        if (!user.pharma_company_id) {
          throw new BadRequestError('Pharma company ID is required');
        }

        [monthlySales, currentMonthSales, maturedInvoices, totalSales, topProducts, dcrSummary, lowInventory, tourEfficiency] = await Promise.all([
          dashboardService.getMonthlySales(user.pharma_company_id, territoryId, branchId, startDate, endDate),
          dashboardService.getCurrentMonthSales(user.pharma_company_id, territoryId, branchId, startDate, endDate),
          dashboardService.getMaturedInvoices(user.pharma_company_id, territoryId, branchId, startDate, endDate),
          dashboardService.getTotalSales(user.pharma_company_id, territoryId, branchId, startDate, endDate),
          dashboardService.getTopProducts(user.pharma_company_id),
          dashboardService.getDCRSummary(user.pharma_company_id),
          dashboardService.getLowInventory(user.pharma_company_id),
          dashboardService.getTourPlanEfficiency(user.pharma_company_id),
        ]);
      }

      const aiSummary = `Total Lifetime Sales: ${Number(totalSales).toLocaleString('en-US')} ${currencyCode}. ` +
                        `Current Month: Cash ${Number(currentMonthSales.cash_sales).toLocaleString('en-US')} ${currencyCode}, ` +
                        `Credit ${Number(currentMonthSales.credit_sales).toLocaleString('en-US')} ${currencyCode}. ` +
                        `Matured Invoices: ${Number(maturedInvoices.count).toLocaleString('en-US')}. ` +
                        `DCR Completion: ${Number(dcrSummary.completed_dcr).toLocaleString('en-US')}/${Number(dcrSummary.total_dcr).toLocaleString('en-US')}.`;

      res.status(200).json({
        monthly_sales: monthlySales,
        current_month_sales: currentMonthSales,
        matured_invoices: maturedInvoices,
        total_lifetime_sales: totalSales,
        top_products: topProducts,
        dcr_summary: dcrSummary,
        low_inventory: lowInventory,
        tour_efficiency: tourEfficiency,
        summary: aiSummary,
      });
    } catch (error: any) {
      console.error('Error fetching dashboard data:', error);
      if (error instanceof UnauthorizedError || error instanceof BadRequestError) {
        res.status(error.statusCode || 400).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Internal server error' });
      }
    }
  }
}
