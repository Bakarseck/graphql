function genererGraphiqueSkills(data) {
    const svg = document.getElementById('skills');
    const svgWidth = svg.clientWidth;
    const svgHeight = 350;
    const barWidth = 10;
    const xOffset = 20;
    const barGap = 5;
    const xp_max = Math.max(...data.map(item => item.xp));
    const yAxisLength = svgHeight + 10;
    const xAxisLength = data.length * (barWidth + barGap) + 50;

    let text = document.createElementNS("http://www.w3.org/2000/svg", "text");
    applyStyle(text, {
        "x": "300",
        "y": "50",
        "fill": "#947fbd",
        "font-size": "24px",
        "font-family": "Arial, sans-serif"
    });
    text.textContent = "Skills";

    svg.appendChild(text);

    // Dessiner l'axe Y
    let labelY = document.createElementNS("http://www.w3.org/2000/svg", "text");
    applyStyle(labelY, {
        "x": "30",
        "y": "30",
        "fill": "#947fbd",
        "font-size": "24px",
        "font-family": "Arial, sans-serif"
    });
    labelY.textContent = "%";

    svg.appendChild(labelY);
    const yAxis = document.createElementNS("http://www.w3.org/2000/svg", "line");
    applyStyle(yAxis, {
        "x1": xOffset.toString(),
        "y1": "5",
        "x2": xOffset.toString(),
        "y2": yAxisLength.toString(),
        "stroke": "#4D4D4D"
    });
    svg.appendChild(yAxis);

    // Dessiner l'axe X
    let labelX = document.createElementNS("http://www.w3.org/2000/svg", "text");
    applyStyle(labelX, {
        "x": "300",
        "y": "385",
        "fill": "#947fbd",
        "font-size": "24px",
        "font-family": "Arial, sans-serif"
    });
    labelX.textContent = "Skills";
    svg.appendChild(labelX);
    const xAxis = document.createElementNS("http://www.w3.org/2000/svg", "line");
    applyStyle(xAxis, {
        "x1": xOffset.toString(),
        "y1": yAxisLength.toString(),
        "x2": xAxisLength.toString(),
        "y2": yAxisLength.toString(),
        "stroke": "#4d4d4d"
    });
    svg.appendChild(xAxis);

    data.forEach((item, index) => {

        let barHeight = (item.xp / xp_max) * svgHeight;
        let bar = document.createElementNS("http://www.w3.org/2000/svg", "rect");

        let barStyle = {
            "class": "barre",
            "x": 20 + (barWidth + barGap) * index,
            "y": 10 + svgHeight - barHeight,
            "width": barWidth,
            "height": barHeight
        };

        applyStyle(bar, barStyle);

        svg.appendChild(bar);
    });
}

function genererGraphique(data) {
    const svg = document.getElementById('xp');
    const svgWidth = svg.clientWidth;
    const svgHeight = 350;
    const barWidth = 10;
    const xOffset = 20;
    const barGap = 5;
    const xp_max = Math.max(...data.map(item => item.xp));
    const yAxisLength = svgHeight + 10;
    const xAxisLength = data.length * (barWidth + barGap) + 50;

    let text = document.createElementNS("http://www.w3.org/2000/svg", "text");
    applyStyle(text, {
        "x": "300",
        "y": "50",
        "fill": "#947fbd",
        "font-size": "24px",
        "font-family": "Arial, sans-serif"
    });
    text.textContent = "Projects Done";

    svg.appendChild(text);

    // Dessiner l'axe Y
    let labelY = document.createElementNS("http://www.w3.org/2000/svg", "text");
    applyStyle(labelY, {
        "x": "30",
        "y": "30",
        "fill": "#947fbd",
        "font-size": "24px",
        "font-family": "Arial, sans-serif"
    });
    labelY.textContent = "XP";

    svg.appendChild(labelY);
    const yAxis = document.createElementNS("http://www.w3.org/2000/svg", "line");
    applyStyle(yAxis, {
        "x1": xOffset.toString(),
        "y1": "5",
        "x2": xOffset.toString(),
        "y2": yAxisLength.toString(),
        "stroke": "#4D4D4D"
    });
    svg.appendChild(yAxis);

    // Dessiner l'axe X
    let labelX = document.createElementNS("http://www.w3.org/2000/svg", "text");
    applyStyle(labelX, {
        "x": "350",
        "y": "385",
        "fill": "#947fbd",
        "font-size": "24px",
        "font-family": "Arial, sans-serif"
    });
    labelX.textContent = "Projects";
    svg.appendChild(labelX);

    const xAxis = document.createElementNS("http://www.w3.org/2000/svg", "line");
    applyStyle(xAxis, {
        "x1": xOffset.toString(),
        "y1": yAxisLength.toString(),
        "x2": xAxisLength.toString(),
        "y2": yAxisLength.toString(),
        "stroke": "#4d4d4d"
    });
    svg.appendChild(xAxis);

    data.forEach((item, index) => {

        let barHeight = (item.xp / xp_max) * svgHeight;
        let bar = document.createElementNS("http://www.w3.org/2000/svg", "rect");

        let barStyle = {
            "class": "barre",
            "x": 20 + (barWidth + barGap) * index,
            "y": 10 + svgHeight - barHeight,
            "width": barWidth,
            "height": barHeight
        };

        applyStyle(bar, barStyle);

        // Ajouter un événement de survol pour afficher une infobulle
        bar.onmouseover = function () {
            showTooltip(`${item.name} - ${item.xp} XP`, event);
        };
        bar.onmouseout = function () {
            hideTooltip();
        };

        svg.appendChild(bar);
    });
}

function applyStyle(element, styles) {
    for (let property in styles) {
        element.setAttribute(property, styles[property]);
    }
}

function showTooltip(text, event) {
    let tooltip = document.getElementById('tooltip');
    if (!tooltip) {
        tooltip = document.createElement('div');
        tooltip.id = 'tooltip';
        tooltip.style.position = 'absolute';
        tooltip.style.padding = '5px';
        tooltip.style.background = 'black';
        tooltip.style.color = 'white';
        tooltip.style.borderRadius = '4px';
        tooltip.style.opacity = '0.75';
        document.body.appendChild(tooltip);
    }
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

function drawCirculaireDiagram(data) {
    const svgNS = "http://www.w3.org/2000/svg";
    const svg = document.getElementById("audit-ratio")

    const centerX = 200;
    const centerY = 200;
    const radius = 100;

    let startAngle = 0;

    let text = document.createElementNS("http://www.w3.org/2000/svg", "text");
    applyStyle(text, {
        "x": "120",
        "y": "50",
        "fill": "#947fbd",
        "font-size": "24px",
        "font-family": "Arial, sans-serif"
    });
    text.textContent = "Audit Ratio";

    svg.appendChild(text);

    data.forEach(item => {
        const { label, value, color } = item;

        const angle = (value / 100) * Math.PI * 2;
        const endAngle = startAngle + angle;

        const x1 = centerX + radius * Math.cos(startAngle);
        const y1 = centerY + radius * Math.sin(startAngle);
        const x2 = centerX + radius * Math.cos(endAngle);
        const y2 = centerY + radius * Math.sin(endAngle);

        const path = document.createElementNS(svgNS, "path");
        const largeArcFlag = angle > Math.PI ? 1 : 0;
        const d = [
            `M ${centerX} ${centerY}`,
            `L ${x1} ${y1}`,
            `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
            "Z"
        ].join(" ");

        path.setAttribute("d", d);
        path.setAttribute("fill", color);

        path.onmouseover = function (event) {
            showTooltip(`${label} ${value.toFixed(2)} %`, event);
        };

        path.onmouseout = function () {
            hideTooltip();
        };

        svg.appendChild(path);

        startAngle = endAngle;
    });

}

export { genererGraphique, applyStyle, drawCirculaireDiagram, genererGraphiqueSkills };