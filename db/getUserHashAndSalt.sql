SELECT id, username, password_hash, salt FROM users WHERE username = $1;