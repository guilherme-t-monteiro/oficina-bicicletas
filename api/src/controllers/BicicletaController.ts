import { Bicicleta } from "../models/Bicicleta";
import { Request, Response } from 'express';
import { ILike } from "typeorm";

export class BicicletaController {

    async list (req: Request, res: Response): Promise<Response> {
        let bicicleta: Bicicleta[] = await Bicicleta.find();

        return res.status(200).json(bicicleta);
    }
  
    async create (req: Request, res: Response): Promise<Response> {
        let body = req.body;
       
        let bicicleta: Bicicleta = await Bicicleta.create({
            marca: body.marca,
            modelo: body.modelo,
           
        }).save();
    
        return res.status(200).json(Bicicleta);
    }
    async delete (req: Request, res: Response): Promise<Response> {
        let bicicleta: Bicicleta = res.locals.bicicleta;
    
        bicicleta.remove();
        
        return res.status(200).json();
    }

    async find (req: Request, res: Response): Promise<Response> {
        let bicicleta: Bicicleta = res.locals.bicicleta;
  
        return res.status(200).json(bicicleta);
    }

    async update (req: Request, res: Response): Promise<Response> {
        let body = req.body;
        let bicicleta: Bicicleta = res.locals.bicicleta;
    
        bicicleta.marca = body.bicicleta,
        bicicleta.modelo = body.modelo,

        await bicicleta.save();
    
        return res.status(200).json(bicicleta);
    } 
}