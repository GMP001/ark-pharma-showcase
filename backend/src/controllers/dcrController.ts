import { Request, Response, NextFunction } from 'express';
import { DCRService } from '../services/dcrService';
import { logger } from '../config/logger';
import { NotFoundError, BadRequestError } from '../utils/errorHandler';

export class DCRController {
  private dcrService: DCRService;
  private service: DCRService;

  constructor() {
    this.dcrService = new DCRService();
    this.service = this.dcrService;
  }

  // GET /api/dcr
  async getDCRs(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
        const { pharma_company_id, user_id, user_type } = req.user!;

        if (!pharma_company_id || !user_id || !user_type) {
          throw new BadRequestError('Missing user or company context');
        }

        const filters = {
          dateTime: req.query.dateTime as string | undefined,
          organizationId: req.query.organizationId as string | undefined,
          doctorId: req.query.doctorId as string | undefined,
          userId: req.query.userId as string | undefined,
        };

        const dcrs = await this.dcrService.getDCRs(
          pharma_company_id,
          user_id,
          user_type,
          filters
        );

        res.status(200).json({ data: dcrs });
      } catch (error) {
        logger.error(`Error fetching DCRs: ${error}`);
        next(error);
      }
    }

  // GET /api/dcr/:id
  async getDCRById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const dcr = await this.dcrService.getDCRById(id);
      res.status(200).json({ data: dcr });
    } catch (error) {
      logger.error(`Error fetching DCR ${req.params.id}: ${error}`);
      next(error);
    }
  }

  // POST /api/dcr
  async createDCR(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const user_id = req.user?.user_id;
      const pharma_company_id = req.user?.pharma_company_id;
      const country_calling_code_id = req.user?.country_calling_code_id;
      const user_type = req.user?.user_type; // ← ADD THIS

      if (!user_id || !pharma_company_id || !country_calling_code_id || !user_type) {
        throw new BadRequestError('Missing user context');
      }

      const dcr = await this.dcrService.createDCR(
        req.body,
        user_id,
        pharma_company_id,
        country_calling_code_id,
        user_type // ← NOW PASSING 5TH ARGUMENT
      );

      res.status(201).json({ data: dcr });
    } catch (error) {
      next(error);
    }
  }

  // PUT /api/dcr/:id
  async updateDCR(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const user_id = req.user?.user_id;

      if (!user_id) throw new BadRequestError('User context missing');

      const dcr = await this.dcrService.updateDCR(id, req.body, user_id);
      res.status(200).json({ data: dcr });
    } catch (error) {
      logger.error(`Error updating DCR ${req.params.id}: ${error}`);
      next(error);
    }
  }

  // DELETE /api/dcr/:id
  async deleteDCR(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      await this.dcrService.deleteDCR(id);
      res.status(204).send();
    } catch (error) {
      logger.error(`Error deleting DCR ${req.params.id}: ${error}`);
      next(error);
    }
  }

    async downloadReport(req: Request, res: Response, next: NextFunction) {
    try {
      const { pharma_company_id } = req.user!;
      const { start_date, end_date } = req.query;

      if (!start_date || !end_date) {
        throw new BadRequestError('start_date and end_date are required');
      }

      const csvContent = await this.service.generateDcrReport(
        pharma_company_id as string,
        start_date as string,
        end_date as string
      );

      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', `attachment; filename="dcr_report_${start_date}_to_${end_date}.csv"`);
      res.status(200).send(csvContent);
    } catch (error) {
      next(error);
    }
  }
}
