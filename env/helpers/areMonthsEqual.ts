export function areMonthsEqual(date1: Date, date2: Date): boolean {
	const year1 = date1.getFullYear();
	const month1 = date1.getMonth();
	const year2 = date2.getFullYear();
	const month2 = date2.getMonth();

	return year1 === year2 && month1 === month2;
}