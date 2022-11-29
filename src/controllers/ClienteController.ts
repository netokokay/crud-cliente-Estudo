import { Request, Response } from "express"
import { AppDataSource } from "../data-source"
import { Cliente } from "../entities/cliente"
import { clienteRepository } from "../repositories/clienteRepository"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
require('dotenv').config()

type JwtPayload = {
    id: number
}



export class ClienteController {
    clienteRepository = AppDataSource.getRepository(Cliente)


    async create(req: Request, res: Response) {
        const { usuario, senha, idade, status } = req.body

        if (!usuario) {
            return res.status(400).json({ mensagem: 'Usuário obrigatório!' })
        } else if (!senha) {
            return res.status(400).json({ mensagem: 'Senha obrigatória!' })
        } else if (!idade) {
            return res.status(400).json({ mensagem: 'Idade obrigatório!' })
        }

        const usuarioExiste = await clienteRepository.findOneBy({ usuario })

        if (usuarioExiste) return res.status(400).json({ mesage: 'Usuario já existe!' })


        const senhaHash = await bcrypt.hash(senha, 10)

        try {
            const newCliente = clienteRepository.create({
                usuario,
                senha: senhaHash,
                idade,
                status
            })
            await clienteRepository.save(newCliente)

            const { senha: _, ...user } = newCliente

            return res.status(201).json(user)

        } catch (error) {
            console.log(error);
            return res.status(500).json({ mensagem: 'Internal server error' })
        }

    }

    async delete(req: Request, res: Response) {
        const { id } = req.params

        try {

            const result = await clienteRepository.delete(id)

            if (result.affected == 1) {
                return res.status(202).json({ mensagem: 'Deletado com sucesso!' })
            }

            return res.status(304).json({ mensagem: 'Não foi possivel deletar este usuário!' })

        } catch (error) {
            console.log(error);
            return res.status(500).json({ mensagem: 'Internal server error' })
        }

    }


    async update(req: Request, res: Response) {
        const { usuario, senha, idade, id } = req.body

        try {

            await AppDataSource
                .createQueryBuilder()
                .update(Cliente)
                .set({
                    usuario,
                    senha,
                    idade,
                })
                .where("id = :id",
                    { id: id })
                .execute()

            return res.status(200).json({ mensagem: 'atualizoou' })

        } catch (error) {
            console.log(error);
            return res.status(500).json({ mensagem: 'Internal server error' })
        }
    }

    async getClients(req: Request, res: Response) {

        try {
            const clientes = await clienteRepository.find({ order: { usuario: "ASC" } })

            return res.status(200).json({ clientes })

        } catch (error) {
            console.log(error);
            return res.status(500).json({ mensagem: 'Internal server error' })

        }
    }

    async getClient(req: Request, res: Response) {
        const { id } = req.body

        try {
            const cliente = await clienteRepository.findOne({ where: { id: id } })

            return res.status(200).json({ cliente })

        } catch (error) {
            console.log(error);
            return res.status(500).json({ mensagem: 'Internal server error' })
        }
    }

    async login(req: Request, res: Response) {
        const { usuario, senha } = req.body

        try {

            const usuarioExiste = await clienteRepository.findOneBy({ usuario })

            if (!usuarioExiste) return res.status(400).json({ mesage: 'Usuario não cadastrado!' })


            const verificarSenha = await bcrypt.compare(senha, usuarioExiste.senha)

            if(!verificarSenha) {
                return res.json({message: 'senha incorreta!'})
            }


            const token = jwt.sign({ id: usuarioExiste.id}, process.env.JWT_PASS ?? '', {expiresIn: '8h'})     
            
            const {senha:_, ...userLogin} = usuarioExiste
            
            return res.json({
                user: userLogin,
                token: token,
            })

        } catch (error) {
            console.log(error);
            return res.status(500).json({ mensagem: 'Internal server error' })
        }

    }


    async getProfile(req:Request, res: Response){
      
       try {
          const { authorization } = req.headers

        if (!authorization) return res.status(401).json({message: 'Não autorizado'})

       const token = authorization.split(' ')[1]

       const { id } = jwt.verify(token, process.env.JWT_PASS ?? '') as JwtPayload

       const user = await clienteRepository.findOneBy({id})

       if(!user) return res.status(401).json({message: 'Não autorizado'})

       const {senha:_, ...logado} = user

       return res.json(logado)

       } catch (error) {
       
            return res.status(500).json({ mensagem: 'Internal server error' })
       }
       
        
    }
}