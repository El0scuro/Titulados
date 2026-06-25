import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {Profesor} from "./entities/profesor.entity"
import { CreateProfesorDto } from './dto/create-profesor.dto';
import { UpdateProfesorDto } from './dto/update-profesor.dto';


@Injectable()
export class ProfesorService {
  constructor(@InjectRepository(Profesor) private readonly profesorRepo: Repository<Profesor>) {}
  create(createProfesorDto: CreateProfesorDto) {
    const profesor = this.profesorRepo.create({
      nombre: createProfesorDto.nombre,
      segundoNombre: createProfesorDto.segundoNombre,
      apellido: createProfesorDto.apellido,
      segundoApellido: createProfesorDto.segundoApellido,
      mail: createProfesorDto.mail,
      sede: createProfesorDto.sede
    })
    return this.profesorRepo.save(profesor);
  }

  async findAll() {
    const profesores: Profesor[] = await this.profesorRepo.find();
        if(!profesores){
          return null;
        }
        return profesores;
  }

  async findOne(id: string) {
    const profesor = await this.profesorRepo.findOneBy({mail: id});
    
    return profesor;
  }

  async remove(id: string) {
    return this.profesorRepo.delete(id);
  }

  async update(mail: string, dto: UpdateProfesorDto) {
      
      const data = Object.fromEntries(
      Object.entries(dto).filter(([_, v]) => v !== undefined)
    );
    const result = await this.profesorRepo.update({ mail }, data);
    return result;
  }
}
