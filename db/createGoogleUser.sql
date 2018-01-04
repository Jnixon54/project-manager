INSERT INTO users(username, display_name)
VALUES ($1, $2) RETURNING id, username, display_name, email;