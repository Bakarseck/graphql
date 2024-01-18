import { API_URL, URL_SIGNIN, DOMAIN } from "./variable.js";
import { graphqlQuery } from "./query.js";
import { genererGraphique, drawCirculaireDiagram } from "./graph.js";
import { PieChart } from "./piechart.js";

document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();

    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    authenticateUser(username, password);
});

function authenticateUser(username, password) {
    const base64Credentials = btoa(username + ':' + password);

    fetch(URL_SIGNIN, {
        method: 'POST',
        headers: {
            'Authorization': 'Basic ' + base64Credentials,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: username,
            password: password
        })
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Échec de la connexion');
            }
            return response.json();
        })
        .then(data => {
            localStorage.setItem('jwtToken', data);
            window.location.reload()
        })
        .catch(error => {
            console.error('Erreur:', error);
        });
}

async function fetchData() {

    const jwtToken = localStorage.getItem('jwtToken');

    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${jwtToken}`
        },
        body: JSON.stringify(graphqlQuery)
    })

    if (!response.ok) {
        console.log(response.error)
    }

    let data = await response.json()

    return data.data;
}

window.addEventListener("DOMContentLoaded", async () => {

    if (location.pathname === "/graphiql") {
        window.location.href = "graphiql.html"
    }

    if (localStorage.getItem('jwtToken') !== null) {

        document.getElementById('gitea').classList.remove('hidden')
        document.getElementById('gitea').classList.add('visible')


        document.getElementById('graphiql').classList.remove('hidden')
        document.getElementById('graphiql').classList.add('visible')

        document.getElementById('container').classList.remove('hidden')
        document.getElementById('container').classList.add('visible')

        const data = await fetchData();
        console.log(data)

        document.querySelector('.wrapper').style.display = 'none';
        document.querySelector('.colors').style.display = 'none';

        const logout = document.getElementById('logout')
        logout.style.display = 'block'

        logout.addEventListener('click', () => {
            localStorage.clear()

            window.location.reload()
        })

        const header = document.getElementById("welcome")
        header.innerHTML = `Welcome ${data.infos[0].firstName} ${data.infos[0].lastName} !`

        document.getElementById('link-gitea').href = `https://${DOMAIN}/git/${data.infos[0].login}` 


        let xp = [];

        data.xp_view.forEach(element => {
            const name = element.path.split('/')[3]
            const n = {
                name: name,
                xp: element.amount / 1000
            }
            xp.push(n)
        });

        genererGraphique(xp);

        const total = data.infos[0].totalDown + data.infos[0].totalUp;
        const pourcentageDown = (data.infos[0].totalDown / total) * 100;
        const pourcentageUp = (data.infos[0].totalUp / total) * 100;
    
        const segments = [
            { label: "Total Down", value: pourcentageDown, color: "#bd947f" },
            { label: "Total Up", value: pourcentageUp, color: "#c3aced" }
        ];

        drawCirculaireDiagram(segments)
        
        // document.getElementById('xp').addEventListener('wheel', zoomHandler);
    } else {
        document.getElementById('container').style.display = "none"
    }
})

function zoomHandler(evt) {
    const svg = document.getElementById('xp');
    const scaleIncrement = 0.1;
    let scale = parseFloat(svg.getAttribute('data-scale') || 1);

    if (evt.deltaY < 0) {
        scale += scaleIncrement;
    } else {
        scale -= scaleIncrement;
    }

    scale = Math.min(Math.max(.1, scale), 1.5);
    svg.setAttribute('data-scale', scale);
    svg.style.transform = `scale(${scale})`;
}



customElements.define('pie-chart', PieChart)