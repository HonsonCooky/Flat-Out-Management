import {app} from "../index";
import {listCreate, listGet, listUpdate} from "../Management/ListManagement";
import {List} from "../Util/Schemas";

export function initializeListInterface(){
    app.post('/post/list/create', (req, res, next) => {
        listCreate(req.body)
            .then((list: List) => res.status(200).send(list))
            .catch(e => next(e))
    })


    app.post('/post/list/update', (req, res, next) => {
        listUpdate(req.body)
            .then((list: List) => res.status(200).send(list))
            .catch(e => next(e))
    })

    app.get('/get/list/:k*', (req, res, next) => {
        listGet(req.params)
            .then((list: List) => res.status(200).send(list))
            .catch(e => next(e))
    })
}