export const sortByFields = (sort, arrayForSort) => {
    const sortedArray = arrayForSort.slice()

    sort.forEach((sortItem) => {
        sortedArray.sort((item1, item2) => {
            let res = item2[sortItem.name] > item1[sortItem.name] ? -1 : item2[sortItem.name] < item1[sortItem.name] ? 1 : 0

            if (sortItem.sort === 'decrease') {
                res *= -1
            }

            return res
        })
    })

    return sortedArray
}