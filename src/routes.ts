import { Request, Response, Router } from "express"
import { ClienteController } from "./controllers/ClienteController";

const routes = Router();

routes.get('/listar-clientes', new ClienteController().getClients)
routes.get('/buscar-cliente', new ClienteController().getClient)
routes.post('/novo-cliente', new ClienteController().create)
routes.put('/atualizar-cliente', new ClienteController().update)
routes.delete('/deletar-cliente/:id', new ClienteController().delete)
routes.post('/login', new ClienteController().login)
routes.get('/profile', new ClienteController().getProfile)



export default routes