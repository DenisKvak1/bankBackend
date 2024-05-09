export const createUserSQL = `
	INSERT INTO Users (email, password, name)
    VALUES ($1, $2, $3)
    RETURNING *;
`
export const deleteUserSQL = 'DELETE FROM Users WHERE id = $1;'
export const getAllUsersSQL = 'SELECT * FROM Users'
export const getByEmailUserSQL = 'SELECT * FROM Users WHERE Users.email = $1;'
export const getByIDUserSQL = 'SELECT * FROM Users WHERE Users.id = $1;'
export const updateEmailUserSQL = `UPDATE Users SET email = $2 WHERE id = $1`
export const updatePasswordUserSQL = `UPDATE Users SET password = $2 WHERE id = $1`
export const updateNameUserSQL = `UPDATE Users SET name = $2 WHERE id = $1`