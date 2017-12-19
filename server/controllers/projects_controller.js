module.exports = {
  getAllProjects: (req, res, next) => {
    const dbInstance = req.app.get('db');
    dbInstance
      .getProjectById([req.body.id])
      .then(response => res.status(200).send(response))
      .catch(err => console.log(err));
  },
  getAllTasks: (req, res, next) => {
    const dbInstance = req.app.get('db');
    dbInstance
      .getAllTasksById([req.body.id])
      .then(response => res.status(200).send(response))
      .catch(err => console.log(err));
  }
};
