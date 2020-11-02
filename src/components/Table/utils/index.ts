import { Product, Sort } from "models"

export const sortByFields = (sort: Array<Sort>, arrayForSort: Array<Product>) => {
    const sortedArray = arrayForSort.slice()

    sort.forEach((sortItem: Sort) => {
        sortedArray.sort((item1: Product, item2: Product) => {
            let res = item2[sortItem.name] > item1[sortItem.name] ? -1 : item2[sortItem.name] < item1[sortItem.name] ? 1 : 0

            if (sortItem.sort === "decrease") {
                res *= -1
            }

            return res
        })
    })

    return sortedArray
}