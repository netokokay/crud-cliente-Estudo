import { AppDataSource } from "../data-source";
import { Cliente } from "../entities/cliente";




export const clienteRepository = AppDataSource.getRepository(Cliente)