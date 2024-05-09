export const createPaymentSQL = `
        INSERT INTO Payments (date, sum, from_id, to_id)
        VALUES (CURRENT_TIMESTAMP, $1, $2, $3)
        RETURNING *;
    `;
export const deletePaymentSQL = 'DELETE FROM Payments WHERE Payments.id = $1';
export const getAllPaymentSQL = `
        SELECT 
            Payments.id,
            Payments.date,
            Payments.sum,
            JSON_BUILD_OBJECT(
                'id', Accounts_from.id, 
                'owner', JSON_BUILD_OBJECT('email', Users_from.email, 'name', Users_from.name), 
                'publicID', Accounts_from.public_id
            ) AS from,
            JSON_BUILD_OBJECT(
                'id', Accounts_to.id, 
                'owner', JSON_BUILD_OBJECT('email', Users_to.email, 'name', Users_to.name), 
                'publicID', Accounts_to.public_id
            ) AS to
        FROM Payments
        INNER JOIN Accounts AS Accounts_from ON Payments.from_id = Accounts_from.id
        INNER JOIN Accounts AS Accounts_to ON Payments.to_id = Accounts_to.id
        INNER JOIN Users AS Users_from ON Accounts_from.owner_id = Users_from.id
        INNER JOIN Users AS Users_to ON Accounts_to.owner_id = Users_to.id;
    `;
export const getAllByIDPaymentSQL = `
	${getAllPaymentSQL},
	WHERE Payments.from_id = $1 OR Payments.to_id = $1;
`;
export const getByIDPaymentSQL = `
	${getAllPaymentSQL},
	WHERE Payments.id = $1;
`;
