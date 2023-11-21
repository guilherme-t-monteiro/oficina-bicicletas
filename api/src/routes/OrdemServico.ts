import { NextFunction, Router, Request, Response } from "express";
import { OrdemServicoController } from "../controllers/OrdemServicoController";
import { OrdemServico } from "../models/OrdemServico";
import * as yup from 'yup';

async function validarPayload (req: Request, res: Response, next: NextFunction): Promise<Response|void>{
    let schema = yup.object({
        problema: yup.string().min(3).max(255).required(),
        solucao: yup.string().min(3).max(255).required(),
        preco: yup.number(),
        bicicletaId: yup.number().required(),
        clienteId: yup.number().required()
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

router.get('/ordemservico', ordemServicoController.list);

router.post('/ordemservico', validarPayload, ordemServicoController.create);

router.put('/ordemservico/:id', validarSeExiste, ordemServicoController.update);

router.delete('/ordemservico/:id', validarSeExiste, ordemServicoController.delete);

router.get('/ordemservico/:id', validarSeExiste, ordemServicoController.find);

export default router;