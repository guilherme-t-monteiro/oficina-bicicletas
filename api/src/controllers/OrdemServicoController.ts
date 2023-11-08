import { Bicicleta } from "../models/Bicicleta";
import { Cliente } from "../models/Cliente";
import { OrdemServico } from "../models/OrdemServico";
import { Response, Request } from "express";

export class OrdemServicoController {

  async list (req: Request, res: Response): Promise<Response> {
   const ordemServicoRepository = OrdemServico;
    let ordensServico = await ordemServicoRepository
      .createQueryBuilder('cidade')
      .where('cidade.situacao != :situacao', { situacao: 'I' })
      .getMany();
      return res.status(200).json(ordensServico);
  }

  async find (req: Request, res: Response): Promise<Response> {
   let id = Number(req.params.id);
    let buscaOrdemServico: OrdemServico[] | null = await OrdemServico.find({
      relations: {
        bicicleta: true,
        cliente: true,
    }, where: { id: id }});
    let ordemServico = buscaOrdemServico[0];

    if (! buscaOrdemServico) {
      return res.status(422).json({ error: 'Ordem de serviço não encontrada!' });
    }
    return res.status(200).json(ordemServico);
  }

  async create(req: Request, res: Response): Promise<Response> {
   let body = req.body;
   let ordemServico: OrdemServico = new OrdemServico();

   ordemServico.problema = body.problema;
   ordemServico.solucao = body.solucao;
   ordemServico.preco = Number(body.preco);

   let bicicleta = await Bicicleta.findOneBy({id: body.bicicletaId});
   if (bicicleta) {
      ordemServico.bicicleta = bicicleta;
   }

   let cliente = await Cliente.findOneBy({id: body.clienteId});
   if (cliente) {
      ordemServico.cliente = cliente;
   }

   await ordemServico.save();
   return res.status(200).json(ordemServico);
  }

  async update (req: Request, res: Response): Promise<Response> {
   let body = req.body;

   let ordemServico: OrdemServico | null = await OrdemServico.findOneBy({ id: Number(req.params.id) });
   if (! ordemServico) {
     return res.status(422).json({ error: 'Ordem de serviço não encontrada!' });
   }
   
   ordemServico.problema = body.problema;
   ordemServico.solucao = body.solucao;
   ordemServico.preco = Number(body.preco);
   
   let bicicleta = await Bicicleta.findOneBy({id: body.bicicletaId});
   if (bicicleta) {
      ordemServico.bicicleta = bicicleta;
   }

   let cliente = await Cliente.findOneBy({id: body.clienteId});
   if (cliente) {
      ordemServico.cliente = cliente;
   }

   await ordemServico.save();
   return res.status(200).json(ordemServico);
  }

  async delete (req: Request, res: Response): Promise<Response> {
    let id = req.params.id;
    let result = await OrdemServico
      .createQueryBuilder()
      .update(OrdemServico)
      .set({ situacao: "I" })
      .where({ id: id })
      .execute();
    if (result.affected && result.affected > 0) {
      return res.status(200).json();
    }
    return res.status(422).json({ error: 'Ordem de serviço não encontrada!' });
  }

}
