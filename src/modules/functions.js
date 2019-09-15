export const getDateArray = function(start, end) {
	var arr = []
	var dt = new Date(start)
	while (dt <= end) {
		arr.push(new Date(dt))
		dt.setDate(dt.getDate() + 1)
	}
	return arr
}
