// content.js
import { userType, userEmail } from './auth.js';

const contentDiv = document.getElementById('content');

if (userType === 'student') {
  fetch('divAddClass.html')
    .then(response => response.text())
    .then(html => {
      contentDiv.innerHTML = html;
    })
    .catch(error => console.error(error));

  fetch('http://localhost:3000/turmas/aluno', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: userEmail })
  })
    .then(response => response.json())
    .then(data => {
      if (Array.isArray(data.Turmas)) {
        const rowDiv = document.createElement('div');
        rowDiv.classList.add('row', 'g-4', 'card-container');
        
        data.Turmas.forEach(turma => {
          const cardDiv = document.createElement('div');
          cardDiv.classList.add('col-md-12');
          cardDiv.innerHTML = `
            <div class="card w-100">
              <div class="card-header">${turma.cod}</div>
              <div class="card-body">
                <h5 class="card-title">${turma.name}</h5>
                ${turma.description ? `<p class="card-text">${turma.description}</p>` : ''}
                <a href="#" class="btn btn-primary">Ver turma</a>
              </div>
            </div>
          `;
          rowDiv.appendChild(cardDiv);
        });

        contentDiv.appendChild(rowDiv);
      }
    })
    .catch(error => console.error('Erro ao fazer requisição:', error));
} else if (userType === 'professor') {
  fetch('divCreateClass.html')
    .then(response => response.text())
    .then(html => {
      contentDiv.innerHTML = html;
    })
    .catch(error => console.error(error));

  fetch('http://localhost:3000/turmas/professor', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: userEmail })
  })
    .then(response => response.json())
    .then(data => {
      if (Array.isArray(data.Turmas)) {
        const rowDiv = document.createElement('div');
        rowDiv.classList.add('row', 'g-4', 'card-container');
        
        data.Turmas.forEach(turma => {
          const cardDiv = document.createElement('div');
          cardDiv.classList.add('col-md-12');
          cardDiv.innerHTML = `
            <div class="card w-100">
              <div class="card-header">${turma.cod}</div>
              <div class="card-body">
                <h5 class="card-title">${turma.name}</h5>
                ${turma.description ? `<p class="card-text">${turma.description}</p>` : ''}
                <a href="#" class="btn btn-primary">Ver turma</a>
              </div>
            </div>
          `;
          rowDiv.appendChild(cardDiv);
        });

        contentDiv.appendChild(rowDiv);
      }
    })
    .catch(error => console.error('Erro ao fazer requisição:', error));
}