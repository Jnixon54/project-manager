module.exports = {
  getAllProjects: (req, res, next) => {
    console.log(req.user.id);
    const dbInstance = req.app.get('db');
    dbInstance
      .getProjectById([req.user.id])
      .then(response => res.status(200).send(response))
      .catch(err => console.log(err));
  },
  getAllTasks: (req, res, next) => {
    const dbInstance = req.app.get('db');
    dbInstance
      .getAllTasksById([req.user.id])
      .then(response => res.status(200).send(response))
      .catch(err => console.log(err));
  },
  addProject: (req, res, next) => {
    const dbInstance = req.app.get('db');
    dbInstance
      .addProject([req.body.projectTitle, req.user.id])
      .then(response => res.status(200).send(response))
      .catch(err => console.log(err));
  },
  getTeamProjects: (req, res, next) => {
    const dbInstance = req.app.get('db');
    dbInstance
      .getTeamProjects([req.user.id])
      .then(response => res.status(200).send(response))
      .catch(err => console.log(err));
  }
};
