export const createAccountSQL = `
        INSERT INTO Accounts (owner_id, public_id)
        VALUES ($1, $2)
        RETURNING *;
    `;
export const deleteAccountSQL = 'DELETE FROM Accounts WHERE Accounts.id = $1';
export const deleteByPublic_idAccountSQL = 'DELETE FROM Accounts WHERE Accounts.public_id = $1';

export const getAllAccountsSQL = `
    SELECT 
        Accounts.id,
        JSON_BUILD_OBJECT('id', Users.id, 'email', Users.email, 'name', Users.name) AS owner,
        Accounts.balance,
        Accounts.public_id
    FROM Accounts
    INNER JOIN Users ON Users.id = Accounts.owner_id
            `;
export const getByIDAccountSQL = `
    ${getAllAccountsSQL}
    WHERE Accounts.id = $1;
    `;
export const getByPublic_idAccountSQL = `
    ${getAllAccountsSQL}
    WHERE Accounts.public_id = $1
    `;
export const updateBalanceAccountSQL = `UPDATE Accounts SET balance = $2 WHERE Accounts.id = $1;`;
