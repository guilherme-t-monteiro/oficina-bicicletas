import { Cliente } from '../models/Cliente';
import { Request, Response } from 'express';
import { ILike } from "typeorm";
import * as nodemailer from "nodemailer";

export class ClienteController {

    async list (req: Request, res: Response): Promise<Response> {
        let cliente: Cliente[] = await Cliente.find();

        return res.status(200).json(cliente);
    }

    async create (req: Request, res: Response): Promise<Response> {
        let body = req.body;
       
        let cliente: Cliente = await Cliente.create({
            nome: body.nome,
            email: body.email,
            telefone: body.telefone,
            endereco: body.endereco,
        }).save();
    
        return res.status(200).json(cliente);
    }

    async delete (req: Request, res: Response): Promise<Response> {
        let cliente: Cliente = res.locals.cliente;
    
        cliente.remove();
        
        return res.status(200).json();
    }

    async find (req: Request, res: Response): Promise<Response> {
        let cliente: Cliente = res.locals.cliente;
  
        return res.status(200).json(cliente);
    }

   
    async update (req: Request, res: Response): Promise<Response> {
        let body = req.body;
        let cliente: Cliente = res.locals.cliente;
    
        cliente.nome = body.nome,
        cliente.email = body.email,
        cliente.telefone = body.telefone, 
        cliente.endereco = body.endereco,
        await cliente.save();
    
        return res.status(200).json(cliente);
    } 

    async enviarEmail(req: Request, res: Response): Promise<Response> {
        let id = Number(req.params.id);

        let cliente: Cliente | null = await Cliente.findOneBy({id});
        if (! cliente) {
            return res.status(401).send("Erro ao enviar email");
        }
    
        let emailConfig = {
          host: "smtp.office365.com",
          port: 587,
          secure: false,
          tls: {
            rejectUnauthorized: false,
            ciphers: "SSLv3",
          },
          auth: {
            user: process.env.EMAIL_ADDRESS,
            pass: process.env.PASS,
          },
        };
    
        let mailOptions = {
          from: process.env.EMAIL_ADDRESS,
          to: cliente.email,
          subject: "Email enviado pelo node",
          html: `Email para: ${cliente.nome}`,
        };
    
        let transporter = nodemailer.createTransport(emailConfig);
    
        transporter.sendMail(mailOptions, async function (error, info) {
          if (error) {
            console.log("Erro ao enviar email:" + error);
            return res.status(401).send("Erro ao enviar email" + error);
          } else {
            console.log("Email enviado: " + info.response);
            return res.status(200).send("Email enviado: " + info.response);
          }
        });
    
        return res.status(401);
      }

}