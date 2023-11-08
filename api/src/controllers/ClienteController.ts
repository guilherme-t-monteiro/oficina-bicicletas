import { Cliente } from '../models/Cliente';
import { Request, Response } from 'express';
import { ILike } from "typeorm";

export class ClienteController {

    async list (req: Request, res: Response): Promise<Response> {
        let cliente: Cliente[] = await Cliente.find();

        return res.status(200).json(Cliente);
    }

    async create (req: Request, res: Response): Promise<Response> {
        let body = req.body;
       
        let cliente: Cliente = await Cliente.create({
            nome: body.nome,
            email: body.email,
            telefone: body.telefone,
            endereco: body.endereco,
        }).save();
    
        return res.status(200).json(Cliente);
    }

    async delete (req: Request, res: Response): Promise<Response> {
        let cliente: Cliente = res.locals.cliente;
    
        cliente.remove();
        
        return res.status(200).json();
    }

    async find (req: Request, res: Response): Promise<Response> {
        let cliente: Cliente = res.locals.cliente;
  
        return res.status(200).json(Cliente);
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
}