export const createATMSQL = `
        INSERT INTO ATMs (account_id)
        VALUES ($1)
        RETURNING *;
    `;
export const deleteATMSQL = `
        DELETE FROM ATMs
        WHERE ATMs.id = $1
    `;
export const getAllATMSQL = `
        SELECT 
            JSON_BUILD_OBJECT(
                'id', Account.id, 
                'owner', JSON_BUILD_OBJECT('id', ATMsAccount.id, 'email', ATMsAccount.email, 'name', ATMsAccount.name), 
                'publicID', Account.public_id
            ) AS account
        FROM ATMs
        INNER JOIN Accounts AS Account ON ATMs.account_id = Account.id
        INNER JOIN Users AS ATMsAccount ON Account.owner_id = ATMsAccount.id;
`;

export const getByIDATMSQL = `
    ${getAllATMSQL}
    WHERE ATMs.id = $1;
`;

export const updateAccount_idATMSQL = `UPDATE ATMs SET account_id = $2 WHERE ATMs.id = $1;`;