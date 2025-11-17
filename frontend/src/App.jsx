import React, { useState, useEffect } from 'react'
import axios from 'axios'

export default function App() {
    const [projects, setProjects] = useState([])
    const [newProject, setNewProject] = useState({ name: '', description: ''})
    const [editingProject, setEditingProject] = useState(null)


    useEffect(() => {
        axios.get('http://localhost:5000/projects')
        .then(res => {
            setProjects(res.data)
        })
        .catch(err => {
            console.error('Houve um erro ao buscar os projetos:', err)
        })
    }, [])

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setNewProject(prevState => ({...prevState, [name]: value}))
    }

    const handleAddProject = () => {
        axios.post('http://localhost:5000/projects', newProject)
        .then(res => {
            setProjects([...projects, { ...newProject, _id: res.data}])
            setNewProject({name: '', description: ''});
            scrollToSection('projectList')
        })
        .catch(err => console.error('Erro ao adicionar projeto:', err))
    }

    const handleDeleteProject = (projectId) => {
        axios.delete(`http://localhost:5000/projects/${projectId}`)
        .then(res => {
            setProjects(projects.filter(project => project._id !== projectId))
        })
        .catch(err => console.error('Erro ao deletar projeto:', err))
    }

    const handleEditProject = (project) => {
        setEditingProject(project._id)
        setNewProject({ name: project.name, description: project.description })
        scrollToSection(`updateProject_${project._id}`)
    }

    const handleUpdateProject = () => {
        axios.put(`http://localhost:5000/projects/${editingProject}`, newProject)
        .then(res => {
            setProjects(projects => projects.map(project => (
                project._id === editingProject ? { ...project, ...newProject} : project
            )))
            setEditingProject(null)
            setNewProject({ name: '', description: '' })
        })
        .catch(err => console.error('Erro ao atualizar o projeto:', err))
    }

    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId)
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' })
        }
    }

    return (
        <div>
            {/* Menu superior */}
            <nav style={{ backgroundColor: '#f5f5f5', padding: '10px', marginBottom: '20px'}}>
                <button
                    onClick={() => scrollToSection('projectList')}
                >
                    Lista de projetos
                </button>
            </nav>

            {/* Seção de Lista */}
            <section id='projectList'>
                <h2>Lista de projetos da ONG</h2>
                {projects.length === 0 ? (
                    <p>Nenhum projeto foi adicionado</p>
                ) : (
                    <ul>
                        {projects.map((project, index) => (
                            <li key={project._id}>
                                <strong>{index+1}. Nome:</strong> {project.name}
                                <strong>Descrição:</strong> {project.description}
                                <br />
                                <button
                                    onClick={() => handleDeleteProject(project._id)}
                                >
                                    Deletar
                                </button>
                                <button
                                    onClick={() => handleEditProject(project)}
                                >
                                    Editar
                                </button>
                                {editingProject === project._id && (
                                    <section id={`updateProject_${project._id}`} style={{ marginTop: '20px'}}>
                                        <h3>Atualizar projeto</h3>
                                        <input
                                            type='text'
                                            name='name'
                                            value={newProject.name}
                                            onChange={handleInputChange}
                                            placeholder='Nome do projeto'
                                        />
                                        <input
                                            type='text'
                                            name='description'
                                            value={newProject.description}
                                            onChange={handleInputChange}
                                            placeholder='Descrição do projeto'
                                        />
                                        <br />
                                        <button
                                            onClick={handleUpdateProject}
                                        >
                                            Salvar alterações
                                        </button>
                                    </section>
                                )}
                            </li>
                        ))}
                    </ul>
                )}
            </section>

            {/* Seção para adicionar Novo Projeto */}
            <section id="addProject" style={{ marginTop: '50px'}}>
                <h2>Adicionar projeto</h2>
                <input
                    type='text'
                    name='name'
                    value={newProject.name}
                    onChange={handleInputChange}
                    placeholder='Nome do projeto'
                />
                <input
                    type='text'
                    name='description'
                    value={newProject.description}
                    onChange={handleInputChange}
                    placeholder='Descrição do projeto'
                />
                <br />
                <button
                    onClick={handleAddProject}
                >
                    Adicionar projeto
                </button>
            </section>
        </div>
    )
}
