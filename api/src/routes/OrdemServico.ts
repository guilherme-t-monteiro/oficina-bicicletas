import { NextFunction, Router, Request, Response } from "express";
import { OrdemServicoController } from "../controllers/OrdemServicoController";
import { OrdemServico } from "../models/OrdemServico";
import * as yup from 'yup';

async function validarPayload (req: Request, res: Response, next: NextFunction): Promise<Response|void>{
    let schema = yup.object({
        marca: yup.string().min(3).max(255).required(),
        modelo: yup.string().min(3).max(255).required(),
        problema: yup.string().min(3).max(255).required(),
        solucao: yup.string().min(3).max(255).required(),
        preco: yup.number(),
        idBicicleta: yup.number().required(),
        idCliente: yup.number().required()
    });

    let payload = req.body;

    try {
        req.body = await schema.validate(payload, { abortEarly: false, stripUnknown: true});
        return next();
    } catch(error){
        if (error instanceof yup.ValidationError) {
            return res.status(400).json({error: error.errors});
        }
        return res.status(500).json({error: 'Ops! Algo deu errado!'});
    }
}

async function validarSeExiste (req: Request, res: Response, next: NextFunction): Promise<Response|void>{
    let id = Number (req.params.id);
    let ordemServico: OrdemServico|null = await OrdemServico.findOneBy ({ id });
    if ( ! ordemServico) {
        return res.status(422).json({error: 'Ordem de serviço não encontrado!' });
    }
    
    res.locals.ordemServico = ordemServico;
    
    return next();
}

let router : Router = Router();

let ordemServicoController: OrdemServicoController = new OrdemServicoController();

router.get('/bicicleta', ordemServicoController.list);

router.post('/bicicleta', validarPayload, ordemServicoController.create);

router.put('/bicicleta/:id', validarSeExiste, ordemServicoController.update);

router.delete('/bicicleta/:id', validarSeExiste, ordemServicoController.delete);

router.get('/bicicleta/:id', validarSeExiste, ordemServicoController.find);

export default router;