import { Item } from "../models/Item";
import { Request, Response } from 'express';
import { ILike } from "typeorm";

export class ItemController {

    async list (req: Request, res: Response): Promise<Response> {
        let item: Item[] = await Item.find();

        return res.status(200).json(item);
    }
  
    async create (req: Request, res: Response): Promise<Response> {
        let body = req.body;
       
        let item: Item = await Item.create({
            descricao: body.descricao,
                      
        }).save();
    
        return res.status(200).json(item);
    }
    
    async delete (req: Request, res: Response): Promise<Response> {
        let item: Item = res.locals.item;
    
        item.remove();
        
        return res.status(200).json();
    }

    async find (req: Request, res: Response): Promise<Response> {
        let item: Item = res.locals.item;
  
        return res.status(200).json(item);
    }

    async update (req: Request, res: Response): Promise<Response> {
        let body = req.body;
        let item: Item = res.locals.item;
    
        item.descricao = body.item,
       
        await item.save();
    
        return res.status(200).json(item);
    } 
}