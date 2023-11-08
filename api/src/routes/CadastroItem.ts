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
    let cadastro_item: Item|null = await Item.findOneBy ({ id });
    if ( ! cadastro_item) {
        return res.status(422).json({error: 'Cadastro de Item não encontrado!' });
    }
    
    res.locals.cadastro_item= cadastro_item;
    
    return next();
}

let router : Router = Router();

let cadastro_item_controller: ItemController = new ItemController();

router.get('/cadastro_item', cadastro_item_controller.list);

router.post('/cadastro_item', validarPayload, cadastro_item_controller.create);

router.put('/cadastro_item/:id', validarSeExiste, cadastro_item_controller.update);

router.delete('/cadastro_item/:id', validarSeExiste, cadastro_item_controller.delete);

router.get('/cadastro_item/:id', validarSeExiste, cadastro_item_controller.find);

export default router;