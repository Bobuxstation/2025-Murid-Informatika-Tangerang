async function getSubjectsSummary(query) {
    const response = await fetch('../data/subjects.json');
    const data = await response.json();
    const mainPart = document.getElementById('container');
    mainPart.innerHTML = '';

    Object.keys(data).forEach(section => {
        const fieldset = document.createElement('div');
        let sectionHasResults = false;

        data[section].forEach(item => {
            if (item.name.toLowerCase().includes(query.toLowerCase()) || item.extra.toLowerCase().includes(query.toLowerCase())) {
                const card = document.createElement('div');
                card.classList.add('card');

                const subchapter = document.createElement('button');
                subchapter.className = "subchapter";
                subchapter.innerHTML = `<img src="../${item.bg}"><h3>${item.name}</h3> <span>${item.extra}</span>`;
                subchapter.onclick = () => window.location.href = 'open.html?m=' + item.json;

                card.appendChild(subchapter);
                fieldset.appendChild(card);
                sectionHasResults = true;
            }
        });

        if (sectionHasResults) {
            const sectionHeading = document.createElement('p');
            sectionHeading.textContent = section;
            fieldset.prepend(sectionHeading);
            fieldset.id = "twoCard";
            mainPart.appendChild(fieldset);
        }
    });
}

function feelingLucky() {
    const buttons = document.getElementsByClassName("subchapter")
    const randomIndex = Math.floor(Math.random() * buttons.length);
    buttons[randomIndex].click();
}

document.getElementById('searchInput').addEventListener('input', function (event) { getSubjectsSummary(event.target.value) });
getSubjectsSummary("");