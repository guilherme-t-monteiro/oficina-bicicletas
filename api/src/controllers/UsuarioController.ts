import { Request, Response } from 'express';
import { Usuario } from '../models/Usuario';
import { ILike } from 'typeorm';
import bcrypt from 'bcrypt';

export class UsuariosController {

  async list (req: Request, res: Response): Promise<Response> {
    let nome = req.query.nome;

    let users: Usuario[] = await Usuario.findBy({
      nome: nome ? ILike(`%${nome}%`) : undefined
    });

    return res.status(200).json(users);
  }

  async find (req: Request, res: Response): Promise<Response> {
    let usuario: Usuario = res.locals.usuario;

    return res.status(200).json(usuario);
  }

  async create (req: Request, res: Response): Promise<Response> {
    let body = req.body;

    let senha = await bcrypt.hash(body.senha, 10);

    let usuario: Usuario = await Usuario.create({
      nome: body.nome,
      email: body.email,
      senha: senha,
    }).save();

    let { senha: s, ...usuarioSemSenha } = usuario;

    return res.status(200).json(usuarioSemSenha);
  }

  async update (req: Request, res: Response): Promise<Response> {
    let body = req.body;
    let usuario: Usuario = res.locals.usuario;

    let senha = await bcrypt.hash(body.senha, 10);

    usuario.nome = body.nome;
    usuario.email = body.email;
    usuario.senha = senha;
    await usuario.save();

    let { senha: s, ...usuarioSemSenha } = usuario;

    return res.status(200).json(usuarioSemSenha);
  }

  async delete (req: Request, res: Response): Promise<Response> {
    let usuario: Usuario = res.locals.usuario;

    usuario.remove();

    return res.status(200).json();
  }

}
