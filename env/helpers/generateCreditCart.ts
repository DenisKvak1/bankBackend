export function generateCreditCardNumber(): number {
	let cardNumber = '';

	cardNumber += Math.floor(Math.random() * 9) + 1;

	for (let i = 0; i < 15; i++) {
		cardNumber += Math.floor(Math.random() * 10);
	}

	const cardDigits = cardNumber.split('').map(Number);
	let sum = 0;
	for (let i = cardDigits.length - 1; i >= 0; i--) {
		let digit = cardDigits[i];
		if ((cardDigits.length - i) % 2 === 0) {
			digit *= 2;
			if (digit > 9) {
				digit -= 9;
			}
		}
		sum += digit;
	}
	const checksum = (sum * 9) % 10;
	cardNumber += checksum;

	return +cardNumber;
}

