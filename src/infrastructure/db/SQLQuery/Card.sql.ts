export const createCardSQL = `
            INSERT INTO Cards (account_id, number, CVV2, date_expired)
            VALUES ($1, $2, $3, $4)
            RETURNING *;
        `;
export const deleteCardSQL = 'DELETE FROM Cards WHERE Cards.id = $1';
export const deleteByNumberCardSQL = 'DELETE FROM Cards WHERE Cards.number = $1';
export const getAllCardsSQL = `
        SELECT 
        Cards.date_expired,
        JSON_BUILD_OBJECT(
            'id', Account.id,
            'balance', Account.balance,
            'owner', JSON_BUILD_OBJECT('id', CardsAccount.id, 'email', CardsAccount.email, 'name', CardsAccount.name), 
            'publicID', Account.public_id
        ) AS account,
        Cards.id,
        Cards.number,
        Cards.CVV2
        FROM Cards
        INNER JOIN Accounts AS Account ON Cards.account_id = Account.id
        INNER JOIN Users AS CardsAccount ON Account.owner_id = CardsAccount.id
    `;
export const getByIDCardSQL = `
	${getAllCardsSQL}
	WHERE Cards.id = $1;
`;
export const getByNumberCardSQL = `
	${getAllCardsSQL}
	WHERE Cards.number = $1;
`;
export const updateAccount_idCardSQl = `UPDATE Accounts SET balance = $2 WHERE Accounts.id = $1;`;
export const updateCVV2CardSQL = `UPDATE Cards SET ccv2 = $2 WHERE Cards.id = $1;`;