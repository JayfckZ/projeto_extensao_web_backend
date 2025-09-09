import React, { useState, useEffect } from 'react'
import axios from 'axios'

export default function App() {
    const [projects, setProjects] = useState([])

    useEffect(() => {
        axios.get('http://localhost:5000/projects')
        .then(res => {
            setProjects(res.data)
        })
        .catch(err => {
            console.log('Houve um erro ao buscar os projetos:', err)
        })
    }, [])

    return (
        <div>
            <h1>Bem-vindo à aplicação de exemplo!</h1>
            <p>Este é um exemplo de uma Single Page Applicantion (SPA) usando React.</p>

            <h2>Lista de projetos da ONG</h2>
            {projects.length === 0 ? (
                <p>Carregando projetos...</p>
            ) : (
                <ul>
                    {projects.map((project, index) => (
                        <li key={index}>
                            <strong>Nome: </strong> {project.name} <br />
                            <strong>Descrição: </strong> {project.description} <br />
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}
