module.exports = {
  getAllProjects: (req, res, next) => {
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
      .then(resp => res.send(resp))
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
  },
  changeColor: (req, res, next) => {
    const dbInstance = req.app.get('db');
    dbInstance
      .changeColor([req.body.color, req.body.projectID])
      .then(response => res.status(200).send(response))
      .catch(err => console.log(err));
  },
  completedTask: (req, res, next) => {
    const dbInstance = req.app.get('db');
    console.log(req.params.taskID, "Here is your param");
    dbInstance
      .completedTask([req.params.taskID])
      .then(response => res.status(200).send(response))
      .catch(err => console.log(err));
  },
  getLocalUser: (req, res, next) => {
    res.status(200).json(req.user.id)
  },
  undoCompletedTask: (req, res, next) => {
    const dbInstance = req.app.get('db');
    console.log(req.params.taskID, "here is your other param");
    dbInstance
      .undoCompletedTask([req.params.taskID])
      .then(response => res.status(200).send(response))
      .catch(err => console.log(err));
  },
};
