import { CadastroItem } from "../models/CadastroItem";
import { Request, Response } from 'express';
import { ILike } from "typeorm";

export class CadastroItemController {

    async list (req: Request, res: Response): Promise<Response> {
        let cadastroitem: CadastroItem[] = await CadastroItem.find();

        return res.status(200).json(cadastroitem);
    }
  
    async create (req: Request, res: Response): Promise<Response> {
        let body = req.body;
       
        let cadastroitem: CadastroItem = await CadastroItem.create({
            descricao: body.descricao,
                      
        }).save();
    
        return res.status(200).json(CadastroItem);
    }
    async delete (req: Request, res: Response): Promise<Response> {
        let cadastroitem: CadastroItem = res.locals.cadastroitem;
    
        cadastroitem.remove();
        
        return res.status(200).json();
    }

    async find (req: Request, res: Response): Promise<Response> {
        let cadastroitem: CadastroItem = res.locals.cadastroitem;
  
        return res.status(200).json(cadastroitem);
    }

    async update (req: Request, res: Response): Promise<Response> {
        let body = req.body;
        let cadastroitem: CadastroItem = res.locals.cadastroitem;
    
        cadastroitem.descricao = body.cadastroitem,
       
        await cadastroitem.save();
    
        return res.status(200).json(cadastroitem);
    } 
}