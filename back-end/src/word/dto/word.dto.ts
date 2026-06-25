import {
  IsString,
  IsOptional,
} from "class-validator";
export class CreateWordDto{
    @IsString()
    nombre: string;
    @IsString()
    notaGuia: string;
    @IsString()
    notaInformante: string;
    @IsString()
    notaFinal: string;
    @IsString()
    tema_Tesis: string;
    @IsString()
    profeGuia: string;
    @IsString()
    profeInformante: string;
    @IsString()
    presidente: string;
    @IsOptional()
    @IsString()
    fecha: String;
}