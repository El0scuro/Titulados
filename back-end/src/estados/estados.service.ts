import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateEstadoDto } from './dto/update-estado.dto';
import { Repository } from 'typeorm';
import { Estados } from './entities/estado.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class EstadosService {
  
  constructor(
    @InjectRepository(Estados)
    private readonly estadoRepo: Repository<Estados>){
  }


  async findAll() {
    const estados: Estados[] = await this.estadoRepo.find();
    if(!estados){
      return null;
    }
    return estados;
  }

  findOne(id: number) {
    return `This action returns a #${id} estado`;
  }

  async update(dto: UpdateEstadoDto) {
      const { mailEstudiante, estado} = dto;
      
      const state = await this.estadoRepo.findOne({
        where: { mailEstudiante },
      });
      
      if (!state) {
        throw new NotFoundException('Notas no encontradas para el estudiante');
      }
      
      state.estado = estado;
      
  
    return this.estadoRepo.save(state);
  }

  async remove(mail: string) {
    return this.estadoRepo.delete({
      mailEstudiante: mail
    });
  }
}
