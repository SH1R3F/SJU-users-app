export default (pages, page) => {
	let start = 0
	let end = 1
	if (pages < 11) {
		start = 0
		end = pages
	} else if (page <= 6) {
		// Show first 11 pages
		start = 0
		end = 11
	} else if (page > 6 && page < pages - 6) {
		start = page - 5
		end = page + 5
	} else if (page > 6 && page >= pages - 6) {
		start = pages - 11
		end = pages
	}

	return {
		start,
		end,
	}
}
