import { NextFunction, Request, Response, Router } from 'express';
import { ClienteController } from '../controllers/ClienteController';
import * as yup from 'yup';
import { Cliente } from '../models/Cliente';

async function validarPayload (req: Request, res: Response, next: NextFunction): Promise<Response|void> {
  let schema = yup.object({
    nome: yup.string().min(3).max(255).required(),
    email: yup.string().email().required(),
    telefone: yup.string().min(6).max(16).required(),
    endereco: yup.string().min(3).max(255).required(),
  });

  let payload = req.body;

  try {
    req.body = await schema.validate(payload, { abortEarly: false, stripUnknown: true });

    return next();
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      return res.status(400).json({ errors: error.errors });
    }
    return res.status(500).json({ error: 'Ops! Algo deu errado.' });
  }
}

async function validarSeExiste (req: Request, res: Response, next: NextFunction): Promise<Response|void> {
  let id = Number(req.params.id);
  let cliente: Cliente|null = await Cliente.findOneBy({ id });
  if (! cliente) {
    return res.status(422).json({ error: 'Cliente não encontrado!' });
  }

  res.locals.cliente = cliente;

  return next();
}


let router: Router = Router();

let clienteController: ClienteController = new ClienteController();

router.get('/cliente', clienteController.list);

router.get('/cliente/:id', validarSeExiste, clienteController.find);

router.post('/cliente/email/:id', validarSeExiste, clienteController.enviarEmail);

router.post('/cliente', validarPayload, clienteController.create);

router.put('/cliente/:id', validarSeExiste, clienteController.update);

router.delete('/cliente/:id',validarSeExiste, clienteController.delete);

export default router;