import { NextFunction, Router, Request, Response } from "express";
import { BicicletaController } from "../controllers/BicicletaController";
import { Bicicleta } from "../models/Bicicleta";
import * as yup from 'yup';

async function validarPayload (req: Request, res: Response, next: NextFunction): Promise<Response|void>{
    let schema = yup.object({
        marca: yup.string().min(3).max(255).required(),
        modelo: yup.string().min(3).max(255).required(),
        id_ordem_servico: yup.number().required(),
       
    });

    let payload = req.body;

    try {
        req.body = await schema.validate(payload, { abortEarly: false, stripUnknown: true});
        return next();
    } catch(error){
        if (error instanceof yup.ValidationError) {
            return res.status(400).json({erros: error.errors});
        }
        return res.status(500).json({error: 'Ops! Algo deu errado!'});
    }
}

async function validarSeExiste (req: Request, res: Response, next: NextFunction): Promise<Response|void>{
    let id = Number (req.params.id);
    let bicicleta: Bicicleta|null = await Bicicleta.findOneBy ({ id });
    if ( ! bicicleta) {
        return res.status(422).json({error: 'Bicicleta não encontrado!' });
    }
    
    res.locals.bicicleta = bicicleta;
    
    return next();
}

let router : Router = Router();

let bicicletaController: BicicletaController = new BicicletaController();

router.get('/bicicleta', bicicletaController.list);

router.post('/bicicleta', validarPayload, bicicletaController.create);

router.put('/bicicleta/:id', validarSeExiste, bicicletaController.update);

router.delete('/bicicleta/:id', validarSeExiste, bicicletaController.delete);

router.get('/bicicleta/:id', validarSeExiste, bicicletaController.find);

export default router;