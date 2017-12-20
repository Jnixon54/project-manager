module.exports = {
    addNewCard: (req, res, next) => {
        const dbInstance = req.app.get('db')
        console.log(req.body)

        dbInstance.addNewCard([22, req.body.card, 3])
            .then(response => {
                console.log(response)
                res.status(200).send(response)})

            .catch(console.log)

    }
}