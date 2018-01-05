INSERT INTO users(username, display_name, password_hash, salt)
VALUES ($1, $1, $2, $3) RETURNING id, username, display_name, email;