import { IsEmail, IsString } from 'class-validator';

export class CreateCatDto {
    @IsString()
  public race: string;

  @IsString()
  public origine: string;

  @IsString()
  public comportement: string;

  @IsString()
  public photoURL: string;
}