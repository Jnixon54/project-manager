SELECT cards.title, cards.parent_project_id, cards.creator_id, cards.id, tasks.content, tasks.task_id
FROM cards LEFT
JOIN tasks ON cards.id = tasks.parent_card_id where cards.parent_project_id = $1
ORDER BY cards.id
