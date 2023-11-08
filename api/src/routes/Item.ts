import { NextFunction, Router, Request, Response } from "express";
import { ItemController } from "../controllers/ItemController";
import { Item } from "../models/Item";
import * as yup from 'yup';

async function validarPayload (req: Request, res: Response, next: NextFunction): Promise<Response|void>{
    let schema = yup.object({
        descricao: yup.string().min(3).max(255).required(),
        id_ordem_serico: yup.number().required(),
       
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
    let item: Item|null = await Item.findOneBy ({ id });
    if ( ! item) {
        return res.status(422).json({error: 'Item não encontrado!' });
    }
    
    res.locals.item = item;
    
    return next();
}

let router : Router = Router();

let itemController: ItemController = new ItemController();

router.get('/item', itemController.list);

router.post('/item', validarPayload, itemController.create);

router.put('/item/:id', validarSeExiste, itemController.update);

router.delete('/item/:id', validarSeExiste, itemController.delete);

router.get('/item/:id', validarSeExiste, itemController.find);

export default router;