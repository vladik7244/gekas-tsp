function linKernighan(nodes) {
  const pathManager = new PathManager(nodes)
  let tour = new Tour(pathManager)

  tour.usingTourManagersPoints()

  window.stdout.println("Initial cost: " + tour.getCost())

  for (let i = 0; i < tour.size(); i++) {

    for (let j = i; j < tour.size(); j++) {
      if (j === i) {
        continue;
      }

      const newTour = new Tour(pathManager)
      newTour.setCities(tour.path)

      // Switch two cities
      const cityI = newTour.getCity(i)
      const cityJ = newTour.getCity(j)

      newTour.setCity(j, cityI)
      newTour.setCity(i, cityJ)

      // Decide if the neighbour solution should be accepted
      if (tour.getCost() > newTour.getCost()) {
        tour = newTour
      }
    }
  }

  window.stdout.println("Final cost: " + tour.getCost())

  return tour
}
