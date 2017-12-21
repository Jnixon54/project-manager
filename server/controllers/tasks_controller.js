module.exports = {
    addNewCard: (req, res, next) => {
        const dbInstance = req.app.get('db')
        console.log(req.body)


        dbInstance.addNewCard([req.body.projectID, req.body.card, 1])
            .then(response => {
                res.status(200).send(response)})

            .catch(console.log)

    },
    getAllCards: (req, res, next) => {
        const dbInstance = req.app.get('db')

        dbInstance.getAllCards([req.params.projectID])
            .then(response => {
                console.log(response)
                res.status(200).send(response)})
            .catch(console.log)
    }
}