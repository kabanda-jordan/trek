UPDATE users SET password_hash = '$2a$10$C56OoUDn0Vp8DHkoLX/TdueJxghpHtthUug7sZQvaCjLIRvLosT7e'
WHERE email IN ('admin@trek.rw', 'user@trek.rw');
