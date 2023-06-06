import httpStatus from 'http-status';

import { AcademicSemisterService } from './academicSemister.service';
import catchAsync from '../../../shared/catchAsync';
import { NextFunction, Request, Response } from 'express';
import sendResponse from '../../../shared/sendResponse';

const createSemister = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { ...AcademicSemisterData } = req.body;
    const result = await AcademicSemisterService.createSemister(
      AcademicSemisterData
    );

    next();
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: ' Academic semister Create Successfully',
      data: result,
    });
  }
);

export const AcademicSemisterController = {
  createSemister,
};
