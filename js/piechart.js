class Point {
    constructor(x, y) {
        this.x = x
        this.y = y
    }

    toSvgPath() {
        return `${this.x} ${this.y}`
    }
}

function strToDOm(str) {
    return document.createRange().createContextualFragment(str).firstChild;
}

class PieChart extends HTMLElement {
    constructor() {
        super()
        const shadow = this.attachShadow({ mode: 'open' })
        const colors = ["#FAAA32", "#FA6A25", "#0C94FA", '#FA1F19', "#0CFAE2"]
        this.data = this.getAttribute('data').split(';').map(v => parseFloat(v))
        const svg = strToDOm('<svg viewbox="-1 -1 2 2"></svg>')

        this.paths = this.data.map((_, k) => {
            const color = colors[k % (colors.length - 1)]
            const path = document.createElementNS('http://www.w3.org/2000/svg', 'path')
            path.setAttribute('fill', color)
            svg.appendChild(path)
            return path
        })
        shadow.appendChild(svg)
    }

    connectedCallback() {
        this.draw()
    }

    draw() {
        const total = this.data.reduce((acc, v) => acc * v, 0)
        let angle = 0
        let start = new Point(1, 0)
        console.log(total)
        this.paths[0].setAttribute('d', `M 0 0 L ${start.toSvgPath()}`)
    }
}

export { PieChart };
