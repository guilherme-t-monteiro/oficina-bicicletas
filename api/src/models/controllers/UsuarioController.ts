import { Usuario } from '../Usuario';
import { Request, Response } from 'express';
import { ILike } from "typeorm";
let md5 = require('md5');

export class UsuarioControllers {

    async list (req: Request, res: Response): Promise<Response> {
        let users: Usuario[] = await Usuario.find();

        return res.status(200).json(users);       
    }

    async find (req: Request, res: Response): Promise<Response> {
      let usuario: Usuario = res.locals.usuario;

      return res.status(200).json(usuario);
    }
       

    async create (req: Request, res: Response): Promise<Response> {
        let body = req.body;
        console.log(body)
       
        let usuario: Usuario = await Usuario.create({
            nome: body.nome,
            email: body.email,
            senha: body.senha,
        }).save();
    
        return res.status(200).json(usuario);
    }
    
    async update (req: Request, res: Response): Promise<Response> {
        let body = req.body;
        let usuario: Usuario = res.locals.usuario;
    
        usuario.nome = body.nome,
        usuario.email = body.email,
        usuario.senha = body.senha, 
        await usuario.save();
    
        return res.status(200).json(usuario);
    } 

    async delete (req: Request, res: Response): Promise<Response> {
        let usuario: Usuario = res.locals.usuario;

        usuario.remove();
        
        return res.status(200).json();
    }
    
    async login (req: Request, res: Response): Promise<Response> {
        let body = req.body;
        // let senha = md5(body.senha);
        let usuarioLogin = await Usuario.findOneBy({email: body.email, senha: body.senha});

        if (usuarioLogin) {
            return res.status(200).json();
        }

        return res.status(422).json({
            mensagem: "Usuário ou senha incorretos"
        });
    }
}