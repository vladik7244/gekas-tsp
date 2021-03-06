function twoOpt(tour) {
    function swap(tour, i, k) {
        const newTour = new app.tsp.Tour()
        newTour.setCities([
            ...tour.tour.slice(0, i - 1),
            ...tour.tour.slice(i - 1 , k).reverse(),
            ...tour.tour.slice(k),
        ])
        return newTour
    }
    
    let improvements = 1
    let needBreak
    let N = tour.tourSize()
    let bestRoute = tour
    while (improvements > 0) {
        improvements = 0
        needBreak = false
        let bestDistance = bestRoute.getCost()
        for (let i = 0; i < N - 1; i++) {
            for (let k = i + 1; k < N; k++) {
                let newRoute = swap(bestRoute, i, k)
                if (newRoute.getCost() < bestDistance) {
                    bestRoute = newRoute
                    improvements++
                    needBreak = true
                    break
                }
            }
            if (needBreak) break
        }
    }

    return bestRoute
}