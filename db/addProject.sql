INSERT INTO projects (title, owner_id)
VALUES ($1, $2)
RETURNING id