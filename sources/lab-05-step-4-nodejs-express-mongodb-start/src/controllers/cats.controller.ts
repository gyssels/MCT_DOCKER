import { NextFunction, Request, Response } from 'express';
import { CreateCatDto } from '../dtos/cats.dto';
import { Cat } from '../interfaces/cats.interface';
import catService from '../services/cats.service';

class CatsController {

  public catService = new catService();

  public getCats = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllCatsData: Cat[] = await this.catService.findAllCat();
      res.status(200).json({ data: findAllCatsData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getCatById = async (req: Request, res: Response, next: NextFunction) => {
    const catId: string = req.params.id;

    try {
      const findOneCatData: Cat = await this.catService.findCatById(catId);
      res.status(200).json({ data: findOneCatData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createCat = async (req: Request, res: Response, next: NextFunction) => {
    const catData: CreateCatDto = req.body;

    try {
      const createCatData: Cat = await this.catService.createCat(catData);
      res.status(201).json({ data: createCatData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };
 
}

export default CatsController;
