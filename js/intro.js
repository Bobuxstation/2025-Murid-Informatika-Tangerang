async function getSubjectsSummary() {
    const response = await fetch('data/subjects.json');
    const data = await response.json();

    for (let section in data) {
        const fieldset = document.createElement('div')
        const scroll1 = document.getElementById('scroll')
        const scroll2 = document.getElementById('scroll1')
        const scroll3 = document.getElementById('scroll2')
        const random = Math.floor(Math.random() * 3) + 1
        const card = document.createElement('div');
        const img = document.createElement('button');

        img.style.backgroundImage = `url(${data[section][0].bg})`;
        img.id = "image"
        card.classList.add('card');
        card.appendChild(img);
        fieldset.appendChild(card);
        fieldset.id = "oneCard"
        fieldset.style.opacity = 0
        fieldset.style.animation = "scroll 30s linear infinite"

        setTimeout(() => {
            fieldset.style.animation = "scroll 30s linear infinite, scale-down-center 0.2s ease-in-out"
            setTimeout(() => { fieldset.style.opacity = 1 }, 200);
        }, Math.random() * 1500);

        if (random == 1) {
            scroll1.appendChild(fieldset)
        } else if (random == 2) {
            scroll2.appendChild(fieldset)
        } else {
            scroll3.appendChild(fieldset)
        }
    }
}

for (let i = 0; i < 10; i++) {
    getSubjectsSummary();
}

function resizeUpper() {
    document.getElementById("upper").style.height = document.getElementById("mainpart").offsetHeight + "px";
}

document.addEventListener('DOMContentLoaded', resizeUpper);
window.onresize = resizeUpper