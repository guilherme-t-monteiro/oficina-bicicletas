import { Cliente } from '../Cliente';
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
    
        Cliente.nome = body.nome,
        await nome.save();
    
        return res.status(200).json(Cliente);
    } 
}