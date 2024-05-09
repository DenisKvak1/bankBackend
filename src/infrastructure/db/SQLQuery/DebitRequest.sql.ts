export const createDebitRequestSQL = `
            INSERT INTO DebitRequests (card_number, card_receiver, sum)
            VALUES ($1, $2, $3)
            RETURNING *;
        `;
export const deleteDebitRequestSQL = 'DELETE FROM DebitRequests WHERE DebitRequests.id = $1';
export const getAllDebitRequestsSQL = `
        SELECT	 
			DebitRequests.id,
			  JSON_BUILD_OBJECT(
					'id', Card_destination.id,
				'account', JSON_BUILD_OBJECT(
				  'id', Accounts_destination.id,
				  'owner', JSON_BUILD_OBJECT(
				  	'id', User_destination.id,
					'email', User_destination.email,
					'password', User_destination.password,
					'name', User_destination.name
				  ),
				  'public_id', Accounts_destination.public_id,  
				  'balance', Accounts_destination.balance
				), 
				'number', Card_destination.number,
				'dateExpired', Card_destination.date_expired
				) AS card_destination,
				JSON_BUILD_OBJECT(
					'id', Card_receiver.id,
				'account', JSON_BUILD_OBJECT(
				  'id', Accounts_receiver.id,
				  'owner', JSON_BUILD_OBJECT(
				  	'id', User_receiver.id,
					'email', User_receiver.email,
					'password', User_receiver.password,
					'name', User_receiver.name
				  ),
				  'public_id', Accounts_receiver.public_id,  
				  'balance', Accounts_receiver.balance
				), 
				'number', Card_receiver.number,
				'dateExpired', Card_receiver.date_expired
				) AS card_receiver,
				DebitRequests.sum
			FROM DebitRequests
			INNER JOIN Cards AS Card_destination ON Card_destination.number = DebitRequests.card_number
			INNER JOIN Accounts AS Accounts_destination ON Accounts_destination.id = Card_destination.account_id
			INNER JOIN Users AS User_destination ON User_destination.id = Accounts_destination.owner_id
			INNER JOIN Cards AS Card_receiver ON Card_receiver.number = DebitRequests.card_receiver
			INNER JOIN Accounts AS Accounts_receiver ON Accounts_receiver.id = Card_receiver.account_id
			INNER JOIN Users AS User_receiver ON User_receiver.id = Accounts_receiver.owner_id
        `;
export const getByIDDebitRequestSQL = `
	${getAllDebitRequestsSQL}
	WHERE DebitRequests.id = $1
`;