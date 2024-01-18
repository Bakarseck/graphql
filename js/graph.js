const svgNS = "http://www.w3.org/2000/svg";

function createSvgElement(type, attributes) {
    const element = document.createElementNS(svgNS, type);
    for (const attr in attributes) {
        if (attributes.hasOwnProperty(attr)) {
            element.setAttribute(attr, attributes[attr]);
        }
    }
    return element;
}

function createTooltip() {
    let tooltip = document.getElementById('tooltip');
    if (!tooltip) {
        tooltip = document.createElement('div');
        tooltip.id = 'tooltip';
        Object.assign(tooltip.style, {
            position: 'absolute',
            padding: '5px',
            background: 'black',
            color: 'white',
            borderRadius: '4px',
            opacity: '0.75',
            visibility: 'hidden'
        });
        document.body.appendChild(tooltip);
    }
    return tooltip;
}

function showTooltip(text, event) {
    const tooltip = createTooltip();
    tooltip.textContent = text;
    tooltip.style.left = `${event.clientX}px`;
    tooltip.style.top = `${event.clientY}px`;
    tooltip.style.visibility = 'visible';
}

function hideTooltip() {
    const tooltip = document.getElementById('tooltip');
    if (tooltip) {
        tooltip.style.visibility = 'hidden';
    }
}

function genererGraphique(data) {
    const svg = document.getElementById('xp');
    const svgWidth = svg.clientWidth;
    const svgHeight = 350;
    const barWidth = 10;
    const xOffset = 20;
    const barGap = 5;
    const xp_max = Math.max(...data.map(item => item.xp));

    svg.appendChild(createSvgElement('text', {
        x: "300",
        y: "50",
        fill: "#947fbd",
        "font-size": "24px",
        "font-family": "Arial, sans-serif",
        textContent: "Projects Done"
    }));

    svg.appendChild(createSvgElement('line', {
        x1: xOffset.toString(),
        y1: "5",
        x2: xOffset.toString(),
        y2: (svgHeight + 10).toString(),
        stroke: "#4D4D4D"
    }));

    svg.appendChild(createSvgElement('line', {
        x1: xOffset.toString(),
        y1: (svgHeight + 10).toString(),
        x2: (data.length * (barWidth + barGap) + 50).toString(),
        y2: (svgHeight + 10).toString(),
        stroke: "#4d4d4d"
    }));

    data.forEach((item, index) => {
        const barHeight = (item.xp / xp_max) * svgHeight;
        const bar = createSvgElement('rect', {
            class: "barre",
            x: 20 + (barWidth + barGap) * index,
            y: 10 + svgHeight - barHeight,
            width: barWidth,
            height: barHeight
        });

        bar.onmouseover = function (event) {
            showTooltip(`${item.name} - ${item.xp} XP`, event);
        };
        bar.onmouseout = hideTooltip;

        svg.appendChild(bar);
    });
}

function drawCirculaireDiagram(data) {
    const svg = document.getElementById("audit-ratio");

    const centerX = 200;
    const centerY = 200;
    const radius = 100;
    let startAngle = 0;

    svg.appendChild(createSvgElement('text', {
        x: "120",
        y: "50",
        fill: "#947fbd",
        "font-size": "24px",
        "font-family": "Arial, sans-serif",
        textContent: "Audit Ratio"
    }));

    data.forEach(item => {
        const angle = (item.value / 100) * Math.PI * 2;
        const endAngle = startAngle + angle;

        const path = createSvgElement('path', {
            d: [
                `M ${centerX} ${centerY}`,
                `L ${centerX + radius * Math.cos(startAngle)} ${centerY + radius * Math.sin(startAngle)}`,
                `A ${radius} ${radius} 0 ${angle > Math.PI ? 1 : 0} 1 ${centerX + radius * Math.cos(endAngle)} ${centerY + radius * Math.sin(endAngle)}`,
                "Z"
            ].join(" "),
            fill: item.color
        });

        path.onmouseover = (event) => showTooltip(`${item.label} ${item.value.toFixed(2)} %`, event);
        path.onmouseout = hideTooltip;

        svg.appendChild(path);
        startAngle = endAngle;
    });
}

export { genererGraphique, drawCirculaireDiagram };
