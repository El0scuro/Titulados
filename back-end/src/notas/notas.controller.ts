import { Controller, Get, Post, Body, Patch, Param, Delete} from '@nestjs/common';
import { NotasService } from './notas.service';
import { UpdateNotaDto } from './dto/update-nota.dto';
import { UpdateEstadoDto } from 'src/estados/dto/update-estado.dto';

@Controller('notas')
export class NotasController {
  constructor(private readonly notasService: NotasService) {}

  @Get('todas')
  findAll() {
    return this.notasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.notasService.findOne(+id);
  }

  @Patch('actualizar')
  updateNota(@Body() dto: UpdateNotaDto) {
  return this.notasService.update(dto);
}
  @Patch('borrar/null')
  notaNull(@Body() dto: UpdateNotaDto){
    return this.notasService.notaNull(dto);
  }

  @Patch('borrar/null')
  notaNull(@Body() dto: UpdateNotaDto){
    return this.notasService.notaNull(dto);  
  }

  @Delete('borrar/:mail')
  remove(@Param('mail') mail: string) {
    return this.notasService.remove(mail);
  }
}
