INSERT INTO users(username, full_name)
VALUES ($1, $2) RETURNING id, username, bio, display_name, email;

