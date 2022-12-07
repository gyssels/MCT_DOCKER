import { CreateCatDto } from '../dtos/cats.dto';
import HttpException from '../exceptions/HttpException';
import { Cat } from '../interfaces/cats.interface';
import catModel from '../models/cats.model';
import { isEmpty } from '../utils/util';

class CatService {
  
  public cats = catModel;

  public async findAllCat(): Promise<Cat[]> {
    const cats: Cat[] = await this.cats.find();
    return cats;
  }

  public async findCatById(catId: string): Promise<Cat> {
    const findCat: Cat = await this.cats.findOne({ _id: catId });
    if (!findCat) throw new HttpException(409, "You're not cat");

    return findCat;
  }

  public async createCat(catData: CreateCatDto): Promise<Cat> {
    if (isEmpty(catData)) throw new HttpException(400, "You're not userData");

    const findCat: Cat = await this.cats.findOne({ race: catData.race });
    if (findCat) throw new HttpException(409, `You're race ${catData.race} already exists`);

    //const hashedPassword = await bcrypt.hash(userData.password, 10);
    const createCatData: Cat = await this.cats.create({ ...catData});
    return createCatData;
  }

}

export default CatService;
