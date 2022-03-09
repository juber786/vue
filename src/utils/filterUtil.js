export function filterByCategory(list, category) {
     return list.filter(data => data.genres && data.genres.includes(category))
        .sort((a, b) => b.rating.average - a.rating.average);
}
