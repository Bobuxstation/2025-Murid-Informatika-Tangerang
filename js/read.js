async function getSubjectsSummary(m) {
    const response = await fetch('../' + m);
    const data = await response.json();

    data.content.forEach(item => {
        const heading = document.createElement('h1');
        heading.innerHTML = item.heading;
        const content = document.createElement('p');
        content.innerHTML = item.content;
        const illustration = document.createElement('img');
        illustration.src = "../" + item.illustration;
        illustration.className = "illustration";

        if (item.heading) document.getElementById('kiri').appendChild(heading);
        if (item.content) document.getElementById('kiri').appendChild(content);
        if (item.illustration) {
            document.getElementById('kiri').appendChild(document.createElement('br'));
            document.getElementById('kiri').appendChild(illustration)
            document.getElementById('kiri').appendChild(document.createElement('br'));
        };
        document.getElementById('kiri').appendChild(document.createElement('br'));
    })

    data.quiz.forEach(item => {
        const heading = document.createElement('h1');
        heading.innerHTML = item.question;

        document.getElementById('kanan').appendChild(heading);

        const br = document.createElement('br');
        document.getElementById('kanan').appendChild(br);

        item.options.forEach((option, index) => {
            const radio = document.createElement('input');
            radio.type = 'radio';
            radio.name = `${item.question}`;
            radio.value = index;
            document.getElementById('kanan').appendChild(radio);

            const label = document.createElement('label');
            label.htmlFor = radio;
            label.id = `LABELFOR-${item.question}`;
            label.innerHTML = '&nbsp;' + option;
            document.getElementById('kanan').appendChild(label);

            const br1 = document.createElement('br');
            document.getElementById('kanan').appendChild(br1);
        })

        const br2 = document.createElement('br');
        document.getElementById('kanan').appendChild(br2);
    })

    const submitButton = document.createElement('button');
    submitButton.innerHTML = 'Submit';
    submitButton.onclick = () => {
        let score = 0;
        data.quiz.forEach(item => {
            const selectedOption = document.querySelector(`input[name="${item.question}"]:checked`);
            if (selectedOption && parseInt(selectedOption.value) === item.answer) {
                score++;
            } else {
                const correctOption = document.querySelector(`input[name="${item.question}"][value="${item.answer}"]`);
                const correctLabel = correctOption.nextElementSibling;
                correctLabel.style.textDecoration = 'underline';
            }
        });

        submitButton.style.display = 'none';
        const infoButton = document.createElement('button');
        document.getElementById('kanan').appendChild(infoButton);

        if (score === data.quiz.length) {
            infoButton.innerHTML = 'All Correct! Click here to return to the main page.';
            infoButton.onclick = () => window.location.href = '../index.html';
            startConfetti();
        } else {
            infoButton.innerHTML = `You got ${score} out of ${data.quiz.length}, click here to try again.`;
            infoButton.onclick = () => window.location.reload()
        }
    };
    document.getElementById('kanan').appendChild(submitButton);
}

const Query = window.location.search;
const urlParams = new URLSearchParams(Query);
const materialsrc = urlParams.get('m');
getSubjectsSummary(materialsrc);