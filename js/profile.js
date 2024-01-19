const wrapper = document.querySelector('.wrapper');

function activeSignIn() {
    wrapper.classList.add('activeSignIn');
    wrapper.classList.remove('activeSignUp');
}

function activeSignUp() {
    wrapper.classList.add('activeSignUp');
    wrapper.classList.remove('activeSignIn');
}

function changeColor(color) {
    const bgAnimate = document.getElementById('bg-animate');
    const curved = document.getElementById('curved');

    curved.style.backgroundColor = color;
    bgAnimate.style.backgroundColor = color;
    bgAnimate.classList.add('active');

    setTimeout(() => {
        bgAnimate.classList.remove('active');
    }, 1200);
}

const color = document.querySelectorAll('.color');

function activeLink() {
    color.forEach((item)=>{
        item.classList.remove('active');
        this.classList.add('active');
    })
}

color.forEach((item) => {
    item.addEventListener('click', activeLink);
})