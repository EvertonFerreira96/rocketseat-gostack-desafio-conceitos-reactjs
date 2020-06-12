import React, { useState,useEffect } from "react";

import api from './services/api';

import "./styles.css";

function App() {
  const [projects, setProjects] = useState([]); 
 
  async function handleAddRepository() {
    const project = {
      url: "https://github.com/josepholiveira",
      title: "Desafio ReactJS",
      techs: ["React", "Node.js"],
    };
    const response = await api.post('repositories', project);
    return setProjects([...projects, response.data]);
  }

  async function handleRemoveRepository(id) {
    const response = projects.filter((project) => { return project.id !== id })
    await api.delete(`repositories/${id}`);
    return setProjects(response);
  }

  useEffect(() => {
    api.get('repositories').then(response => {
      setProjects(response.data);
    });
  },[]);

  return (
    <div>
      <ul data-testid="repository-list">
        { projects.map(project => (
            <li key={project.id}>
              {project.title}
              <button onClick={() => handleRemoveRepository(project.id)}>Remover</button>
            </li>)) }
      </ul>
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
