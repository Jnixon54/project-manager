module.exports = {
    addNewCard: (req, res, next) => {
        const dbInstance = req.app.get('db')


        dbInstance.addNewCard([req.body.projectID, req.body.card, 1])
            .then(response => {
                res.status(200).send(response)})

            .catch(console.log)

    },
    addNewTask: (req, res, next) => {
        const dbInstance = req.app.get('db')
        console.log(req.body)


        dbInstance.addNewTask([req.body.projectID, req.body.cardID, req.body.task])
            .then(response => {
                res.status(200).send(response)})

            .catch(console.log)

    },

    getAllCards: (req, res, next) => {
        const dbInstance = req.app.get('db')

        dbInstance.getAllCards([req.params.projectID])
            .then(response => {
                res.status(200).send(response)})
            .catch(console.log)
    },
    getAllCards2: (req,res,next) => {
        const dbInstance = req.app.get('db')
        
                dbInstance.getAllCards2([req.params.projectID])
                    .then(response => {
                        const newRes = {response, user: req.user}
                        res.status(200).send(newRes)})
                    .catch(console.log)
    },

    editTask: (req, res, next) => {
        const dbInstance = req.app.get('db')
 
 
        dbInstance.editTask([req.body.taskID, req.body.task])
            .then(response => {
                res.status(200).send(response.data)
            })
            .catch(console.log)
    },
    deleteTask: (req, res, next) => {
        const dbInstance = req.app.get('db')
 
 
        dbInstance.deleteTask([req.body.taskID])
            .then(response => {
                res.status(200).send(response.data)
            })
            .catch(console.log)
    },
    editCardHeader: (req, res, next) => {
        const dbInstance = req.app.get('db')
 
 
        dbInstance.editCard([req.body.newHeader, req.body.cardID])
            .then(response => {
                res.status(200).send(response.data)
            })
            .catch(console.log)
    },
    deleteAllTasks: (req, res, next) => {
        const dbInstance = req.app.get('db')
 

        dbInstance.deleteAllTasks([req.params.cardID])
            .then(response => {
                res.status(200).send(response.data)
            })
            .catch(console.log)
    },
    deleteCard: (req, res, next) => {
        const dbInstance = req.app.get('db')
 
 
        dbInstance.deleteCard([req.params.cardID])
            .then(response => {
                res.status(200).send(response.data)
            })
            .catch(console.log)
    },
    getTasks: (req, res, next) => {
        const dbInstance = req.app.get('db')
        
        
        dbInstance.getTasks([req.params.projectID])
            .then(response => {
                res.status(200).send(response)
           })
           .catch(console.log)
    },
    memberSearch: (req, res, next) => {
        const dbInstance = req.app.get('db')
        
        dbInstance.memberSearch([req.body.userName])
            .then(response => {
                res.status(200).send(response)
           })
           .catch(console.log)
    },
    addMember: (req, res, next) => {
        const dbInstance = req.app.get('db')
        dbInstance.addMember([req.body.userId, req.body.projectId])
            .then(response => {
                res.status(200).send(response)
           })
           .catch(console.log)
    },
    groupMembers: (req, res, next) => {
        const dbInstance = req.app.get('db')
        
        dbInstance.groupMembers([req.params.projectId])
            .then(response => {
                res.status(200).send(response)
           })
           .catch(console.log)
    },

    assignToTask: (req, res, next) => {
        const dbInstance = req.app.get('db')
        
        dbInstance.assignToTask([req.body.taskID, req.body.userID, req.body.projectID])
            .then(response => {
                res.status(200).send(response)
           })
           .catch(console.log)
    },
    assignedTasks: (req, res, next) => {
        const dbInstance = req.app.get('db')
        
        
        dbInstance.assignedTasks([req.params.projectID])
            .then(response => {
                res.status(200).send(response)
           })
           .catch(console.log)
    },
    removeFromTask: (req, res, next) => {
        const dbInstance = req.app.get('db')
        
        console.log(req.params.assignID)
        dbInstance.removeFromTask([req.params.taskID, req.params.memberID])
            .then(response => {
                res.status(200).send(response)
           })
           .catch(console.log)
    },
    dragTask: (req, res, next) => {
        const dbInstance = req.app.get('db')
        
        dbInstance.dragTask([req.body.taskID, req.body.cardID])
            .then(response => {
                res.status(200).send(response)
           })
           .catch(console.log)
    },
    removeCurrentMember: (req, res, next) => {
        const dbInstance = req.app.get('db')
        
        dbInstance.removeCurrentMember([req.body.currId, req.body.projId])
            .then(response => {
                res.status(200).send(response)
           })
           .catch(console.log)
    },
    deleteProject: (req, res, next) => {
        const dbInstance = req.app.get('db')
        console.log("Hit the controller", req.params.projID);
        dbInstance.deleteProject([req.params.projID])
            .then(response => {
                res.status(200).send(response)
           })
           .catch(console.log)
    },
    sendNewTitle: (req, res, next) => {
        const dbInstance = req.app.get('db')

        dbInstance.sendNewTitle([req.params.title, req.params.projectID])
            .then(response => {
                res.status(200).send(response)
           })
           .catch(console.log)
    },
    changeCardColor: (req, res, next) => {
        const dbInstance = req.app.get('db')

        dbInstance.changeCardColor([req.body.color, req.body.cardID])
            .then(response => {
                res.status(200).send(response)
           })
           .catch(console.log)
    },
}