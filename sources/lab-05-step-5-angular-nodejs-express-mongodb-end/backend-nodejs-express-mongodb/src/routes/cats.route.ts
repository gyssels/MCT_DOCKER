import { Router } from 'express';
import CatsController from '../controllers/cats.controller';
import { CreateCatDto } from '../dtos/cats.dto';
import Route from '../interfaces/routes.interface';
import validationMiddleware from '../middlewares/validation.middleware';

class CatsRoute implements Route {
  public path = '/cats';
  public router = Router();
  public catsController = new CatsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.catsController.getCats);
    this.router.get(`${this.path}/:id`, this.catsController.getCatById);
    this.router.post(`${this.path}`, validationMiddleware(CreateCatDto, 'body'), this.catsController.createCat);

  }
}

export default CatsRoute;
