/**
 * Created by gekas on 30.05.2017.
 */

function NN(nodes){
    let tourManager = new app.tsp.PathManager(nodes);

    for(let i = 0; i <= nodes.length; i++)
    {
        let pointFrom = nodes[i];
        let minLength = pointFrom.costTo(nodes[1]);

        let closestPoint = nodes[1];
        for(let j = 2; j<=nodes.length; j++)
        {
            // If the same point or already in the tour - skip
            if(i==j || tour.indexOf(pointFrom) != -1) continue;

            let currentCost = tourManager.pointToCity(pointFrom).costTo(nodes[j]);
            if(currentCost < minLength) {
                minLength = currentCost;
                closestPoint = nodes[j];
            }
        }

        return [...tour, ...closestPoint];
    }
}
