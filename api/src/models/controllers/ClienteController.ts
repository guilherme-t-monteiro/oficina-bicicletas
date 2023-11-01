import { Cliente } from '../Cliente';
import { Request, Response } from 'express';
import { ILike } from "typeorm";

export class ClienteController {

    async list (req: Request, res: Response): Promise<Response> {
        let categoria: Cliente[] = await Cliente.find();

        return res.status(200).json(Cliente);
    }

    async create (req: Request, res: Response): Promise<Response> {
        let body = req.body;
       
        let categoria: Cliente = await Cliente.create({
            descricao: body.descricao,
        }).save();
    
        return res.status(200).json(Cliente);
    }

    async delete (req: Request, res: Response): Promise<Response> {
        let categoria: Cliente = res.locals.cliente;
    
        categoria.remove();
        
        return res.status(200).json();
    }

    async find (req: Request, res: Response): Promise<Response> {
        let categoria: Cliente = res.locals.cliente;
  
        return res.status(200).json(Cliente);
    }

    async update (req: Request, res: Response): Promise<Response> {
        let body = req.body;
        let categoria: Cliente = res.locals.cliente;
    
        Cliente.descricao = body.descricao,
        await categoria.save();
    
        return res.status(200).json(Cliente);
    } 
}