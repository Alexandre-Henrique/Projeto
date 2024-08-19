fetch('http://localhost:3000/cursos')
  .then(response => response.json())
  .then(data => {
    const cursosContainer = document.querySelector('#cursos .row');
    cursosContainer.innerHTML = '';

    data.forEach(curso => {
      cursosContainer.innerHTML += `
        <div class="col-md-4 mb-4">
          <div class="card curso-card">
            <img src="${curso.imagem}" class="card-img-top" alt="${curso.nome}">
            <div class="card-body">
              <h3 class="card-title">${curso.nome}</h3>
              <p class="card-text">${curso.descricao}</p>
            </div>
          </div>
        </div>
      `;
    });
  })
  .catch(error => console.error('Erro:', error));
