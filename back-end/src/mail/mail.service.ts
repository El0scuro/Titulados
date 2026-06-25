import { Injectable } from '@nestjs/common';
import { CreateMailDto } from './dto/create.dto';
import * as nodemailer from 'nodemailer';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,       // smtp.mailersend.net
      port: Number(process.env.MAIL_PORT), // 587 o 2525
      secure: false,                      // true si usas 465
      auth: {
        user: process.env.MAIL_USER,     // tu usuario SMTP
        pass: process.env.MAIL_PASS,     // tu contraseña SMTP
      },
    });
  }

  async enviarCorreo(dto: CreateMailDto) {
    try {
      await this.transporter.sendMail({
        from: `"Administración Pública" <${process.env.MAIL_USER}>`,
        to: dto.toMail,
        subject: dto.subject,
        text: dto.text,
        html: `<strong>${dto.text}</strong>`,
      });
      return { success: true };
    } catch (error) {
      console.error(error);
      return { success: false, error };
    }
  }

  async enviarCorreoConAdjunto(dto: CreateMailDto) {
    const attachments = [];

    for (let i = 0; i < dto.rutas.length; i++) {
      const tipoMap: Record<string, string> = {
        archivos_guia: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        archivos_Informante: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        archivos_Tesis: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      };
      const tipo = tipoMap[dto.rutas[i]] || 'application/octet-stream';

      const filePath = path.join(process.cwd(), 'src', 'archivos', `${dto.rutas[i]}/${dto.archivos[i]}`);
      console.log(`Intentando adjuntar archivo: ${filePath} con tipo ${tipo}`);
      if (fs.existsSync(filePath)) {
        attachments.push({
          filename: dto.archivos[i],
          path: filePath,
          contentType: tipo,
        });
      }
    }

    try {
      await this.transporter.sendMail({
        from: `"Administración Pública" <${process.env.MAIL_USER}>`,
        to: dto.toMail,
        subject: dto.subject,
        html: dto.text,
        attachments,
      });
      return { success: true };
    } catch (error) {
      console.error(error);
      return { success: false, error };
    }
  }
}

