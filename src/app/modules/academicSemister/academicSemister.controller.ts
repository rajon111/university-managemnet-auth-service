import { RequestHandler } from 'express';
import { AcademicSemisterService } from './academicSemister.service';

const createSemister: RequestHandler = async (req, res, next) => {
  try {
    const { ...AcademicSemisterData } = req.body;
    const result = await AcademicSemisterService.createSemister(
      AcademicSemisterData
    );
    res.status(200).json({
      success: true,
      message: 'Academic Semister created successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const AcademicSemisterController = {
  createSemister,
};
