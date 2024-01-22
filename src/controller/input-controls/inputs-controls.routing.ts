import { Router } from 'express'
import { InputsControlsController } from './inputs-controls.rest.api';

class InputControlsRouting {
    public router: Router;
    public inputsControls: InputsControlsController
    public constructor() {
        this.inputsControls = new InputsControlsController()
        this.router = Router()
        this.routes()
    } 
    public routes() {
        this.router.use('', this.inputsControls.router)
    }
}

export default new InputControlsRouting().router