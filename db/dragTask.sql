UPDATE tasks
SET parent_card_id = $2
WHERE task_id = $1