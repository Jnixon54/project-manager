INSERT INTO users(username, password)
VALUES ($1, $2) RETURNING id, username, display_name, email;