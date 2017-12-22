module.exports = {
  getAllProjects: (req, res, next) => {
    console.log(req.body.id);
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
  },
  addProject: (req, res, next) => {
    const dbInstance = req.app.get('db');
    dbInstance
      .addProject([req.body.projectTitle, req.body.id])
      .then(response => res.status(200).send(response))
      .catch(err => console.log(err));
  }
};
