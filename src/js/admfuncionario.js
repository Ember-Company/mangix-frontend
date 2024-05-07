function criarDivs() {
    const dynamicContent = document.getElementById('dynamicContent');
    const numDivs = new Date().getDate();

    for (let i = 0; i < numDivs; i++) {
        const div = document.createElement('div');
        div.classList.add('dias');

        const innerHTML = `
            <div>
                <p>${i + 1}</p>
            </div>
            <div>
                <p>${i === 0 ? "Nathan" : ""}</p>
            </div>
            <div>
                <p>${i === 0 ? "00000" : ""}</p>
            </div>
            <div>
            <p>${i === 0 ? "01/01/24" : ""}</p>
            </div>
            <div>
            <p>${i === 0 ? "08:00" : ""}</p>
            </div>
            <div>
            <p>${i === 0 ? "12:00" : ""}</p>
            </div>
            <div>
            <p>${i === 0 ? "13:00" : ""}</p>
            </div>
            <div>
            <p>${i === 0 ? "18:00" : ""}</p>
            </div>
            <div>
                <box-icon name='file-pdf' type='solid'></box-icon>
            </div>
        `;

        div.innerHTML = innerHTML;
        
        if (div.querySelector('div:nth-child(2) p').textContent.trim().length > 0) {
            div.querySelector('div:last-child').style.display = 'block'; // Exibe o ícone
        } else {
            div.querySelector('div:last-child').style.display = 'none'; // Oculta o ícone
        }
        
        dynamicContent.appendChild(div);
    }
}
