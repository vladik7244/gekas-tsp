/**
 * Created by gekas on 31.05.2017.
 */
function NN(nodes) {
    const pathManager = new PathManager(nodes);

    let cities = pathManager.getCities();
    let cityFrom = cities[0];
    let tour = [cityFrom];

    for(let i = 0; i < cities.length; i++)
    {
        let minLength = Number.MAX_VALUE;
        let closestPoint;
        for(let j = 1; j < cities.length; j++)
        {
            // If the same point or already in the tour - skip
            if(cities[j] == cityFrom || tour.indexOf(cities[j]) != -1) continue;

            let currentCost = cityFrom.costTo(cities[j]);
            if(currentCost < minLength)
            {
                minLength = currentCost;
                closestPoint = cities[j];
            }
        }

        cityFrom = closestPoint;
        tour = [...tour, closestPoint];
    }

    tour.splice(tour.length -1, 1);

    let newPathManager = new PathManager(tour);
    let tourEntity = new Tour(newPathManager);

    tourEntity.usingTourManagersPoints();
    return tourEntity;
 }