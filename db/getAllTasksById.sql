SELECT t.task_id, content, parent_project_id, completed, p.title
FROM tasks t 
JOIN task_users tu on t.task_id = tu.task_id 
JOIN projects p on p.id = t.parent_project_id
WHERE user_id = $1 Order By p.id
