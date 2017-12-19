INSERT INTO users(username)
VALUES ($1) RETURNING id, username, display_name, email;