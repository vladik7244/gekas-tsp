class PathManager {
  constructor(nodes) {
    this.costs = new Map()
    this._destinationCities = nodes.map(PathManager.pointToCity)
  }

  getCities() {
    return this._destinationCities
  }

  getCity(index) {
    return this._destinationCities[index]
  }

  static pointToCity(point) {
    return new CityPoint(point)
  }
}

class CityPoint {
  constructor(point) {
    this.point = point
  }

  costTo(otherPoint) {
    const {x: x1, y: y1} = this.point
    const {x: x2, y: y2} = otherPoint
    return Math.ceil(Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2))
  }

  get x() {
    return this.point.x
  }

  get y() {
    return this.point.y
  }

  get name() {
    return this.point.name
  }

  toString() {
    const {name, x, y} = this.point
    return `${name}:(${x},${y})`
  }
}


class Tour {
  constructor(routeManager) {
    this.path = []
    this._cost = null
    this._routeManager = routeManager
  }

  usingTourManagersPoints() {
    this.setCities(this._routeManager.getCities())
    return this
  }
  
  setCity(routePosition, city) {
    this.path[routePosition] = city
    this._cost = null // Reset cost since the route is being modified
    return this
  }

  getCity(routePosition) {
    return this.path[routePosition]
  }

  setCities(cities) {
    this.path = [...cities]
    this._cost = null // Reset cost since the route is being modified
    return this
  }

  getCost() {
    if (this._cost === null) {
      let routeCost = 0
      for (let i = 0; i < this.path.length; i++) {
        const fromCity = this.path[i]
        const destinationCity = i + 1 < this.path.length
          ? this.path[i + 1]
          : this.path[0]
        routeCost += fromCity.costTo(destinationCity)
      }
      this._cost = routeCost
    }
    return this._cost
  }

  size() {
    return this.path.length
  }

  toString() {
    return this.path.map(city => city.toString()).join('|')
  }
}

function createCanvas(width, height) {
  const wrapper = document.createElement('div')
  wrapper.classList.add('canvas-wrapper')
  const canvas = document.createElement('canvas')
  wrapper.appendChild(canvas)
  canvas.width = width
  canvas.height = height
  return {
    canvas,
    wrapper,
  }
}

function attachCanvas(canvas, target) {
  target.appendChild(canvas)
}

function drawEdges(canvas, points) {
  const ctx = canvas.getContext('2d')
  const g = new Graphics(ctx)
  g.scale(0.1, 0.1)

  for (let i = 0; i < points.length; i++) {
    const fromPoint = points[i]
    const toPoint = i >= points.length - 1
      ? points[0]
      : points[i + 1]
    g.drawLine(fromPoint.x, fromPoint.y, toPoint.x, toPoint.y, {width: 5})
  }

  points.forEach(point => {
    g.drawPoint(point.x, point.y, 3)
  })
}

class Graphics {
  constructor(ctx) {
    this.ctx = ctx
  }

  scale(xs, ys) {
    this.ctx.scale(xs, ys)
  }

  drawLine(x1, y1, x2, y2, {color = '#000', width = 1} = {}) {
    this.ctx.beginPath()
    this.ctx.strokeStyle = color
    this.ctx.lineWidth = width
    this.ctx.moveTo(x1, y1)
    this.ctx.lineTo(x2, y2)
    this.ctx.stroke()
  }

  drawPoint(x, y, radius = 1) {
    this.ctx.beginPath()
    this.ctx.arc(x, y, radius, 0, 2 * Math.PI, true)
    this.ctx.fill()
  }
}


class Output {
  constructor(elem) {
    this.element = elem
  }

  println(txt) {
    this.element.innerHTML += `${txt}\n`
  }
}

function generateRandomDeltaPath(size, min, max) {
  const nodes = []

  for (let i = 0; i < size; i++) {
    const x = Math.floor(Math.random() * (max - min + 1) + min)
    const y = Math.floor(Math.random() * (max - min + 1) + min)
    nodes.push({x, y, name: i})
  }

  const randomIndex = Math.floor(Math.random() * (size + 1))
  const randomNode = nodes[randomIndex]
  nodes.push({x: randomNode.x, y: randomNode.y, name: randomIndex + "x"})

  return nodes
}
