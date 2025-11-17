import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Header from './components/Header'
import Hero from './components/Hero'
import FeatureGrid from './components/FeatureGrid'
import InventorySection from './components/InventorySection'
import Footer from './components/Footer'

const API_BASE_URL = 'http://localhost:5000'

const App = () => {
    const [darkMode, setDarkMode] = useState(false)

    const [items, setItems] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [selectedItem, setSelectedItem] = useState(null)
    const [search, setSearch] = useState('')
    const [report, setReport] = useState(null)


    const [formData, setFormData] = useState({
        name: '',
        category: '',
        quantity: '',
        entryDate: '',
        expirationDate: ''
    })


    const [editingId, setEditingId] = useState(null)

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const res = await axios.get(`${API_BASE_URL}/supplies`)
                setItems(res.data || [])
            } catch (err) {
                console.error('Erro ao buscar mantimentos', err)
                setError('Não foi possível carregar os mantimentos.')
            } finally {
                setLoading(false)
            }
        }

        fetchItems()
    }, [])

    const handleToggleDarkMode = () => {
        setDarkMode(prev => !prev)
    }

    const handleChange = e => {
        const { name, value } = e.target
        setFormData(prev => ({
        ...prev,
        [name]: value
        }))
    }

    const resetForm = () => {
        setFormData({
            name: '',
            category: '',
            quantity: '',
            entryDate: ''
        })
        setEditingId(null)
    }

    const handleSubmit = async e => {
        e.preventDefault()

        if (!formData.name.trim()) return

        try {
            if (editingId) {
                await axios.put(`${API_BASE_URL}/supplies/${editingId}`, formData)

                setItems(prev =>
                prev.map(item =>
                    item._id === editingId ? { ...item, ...formData } : item
                )
                )
            } else {
                const res = await axios.post(`${API_BASE_URL}/supplies`, formData)
                setItems(prev => [...prev, { ...formData, _id: res.data }])
            }

            resetForm()
        } catch (err) {
            console.error('Erro ao salvar mantimento', err)
            setError('Erro ao salvar mantimento. Tente novamente.')
        }
    }

    const handleEdit = item => {
            setEditingId(item._id)
            setFormData({
            name: item.name || '',
            category: item.category || '',
            quantity: item.quantity || '',
            entryDate: item.entryDate || ''
        })

        const element = document.getElementById('inventory')
        
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' })
        }
    }

    const handleDelete = async id => {
        if (!window.confirm('Tem certeza que deseja excluir este mantimento?')) {
            return
        }

        try {
            await axios.delete(`${API_BASE_URL}/supplies/${id}`)
            setItems(prev => prev.filter(item => item._id !== id))
        } catch (err) {
            console.error('Erro ao deletar mantimento', err)
            setError('Erro ao excluir mantimento.')
        }
    }

    const handleViewDetails = async id => {
        try {
            const res = await axios.get(`${API_BASE_URL}/supplies/${id}`)
                setSelectedItem(res.data)
        } catch (err) {
            console.error("Erro ao buscar detalhes", err)
        }
    }

    const handleSearch = async e => {
        const value = e.target.value
        setSearch(value)

        try {
            const res = await axios.get(`${API_BASE_URL}/supplies?name=${value}`)
            setItems(res.data)
        } catch (err) {
            console.error("Erro na busca", err)
        }
    }

    const fetchReport = async () => {
        try {
            const res = await axios.get(`${API_BASE_URL}/supplies/report`)
            setReport(res.data)
        } catch (err) {
            console.error("Erro ao gerar relatório", err)
        }
    }


    return (
        <div className={darkMode ? 'dark' : ''}>
            <div className='min-h-screen bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-slate-100'>
                <Header darkMode={darkMode} onToggleDarkMode={handleToggleDarkMode} />

                <main className='pt-16'>
                <Hero />

                <section id='sobre' className='py-16 md:py-20 bg-slate-100 dark:bg-slate-900'>
                    <div className='max-w-5xl mx-auto px-4'>
                    <h2 className='text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4'>
                        Sobre o Sistema
                    </h2>
                    <p className='text-slate-600 dark:text-slate-300 leading-relaxed text-lg'>
                        O sistema da ONG Alimentos Solidários foi desenvolvido para apoiar
                        organizações na gestão de mantimentos não perecíveis destinados a
                        comunidades em situação de vulnerabilidade. A aplicação facilita o
                        controle de estoque, permitindo registrar entradas, saídas, categorias,
                        quantidades e datas, garantindo maior transparência e organização no uso
                        das doações.
                    </p>
                    </div>
                </section>

                <section id='funcionalidades' className='py-16 md:py-20 bg-slate-50 dark:bg-slate-950/60'>
                    <FeatureGrid />
                </section>

                <section id='sistema' className='py-16 md:py-20 bg-slate-100 dark:bg-slate-900'>
                    <InventorySection
                        items={items}
                        loading={loading}
                        error={error}
                        formData={formData}
                        onChange={handleChange}
                        onSubmit={handleSubmit}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                        onSearch={handleSearch}
                        onViewDetails={handleViewDetails}
                        selectedItem={selectedItem}
                        onReport={fetchReport}
                        report={report}
                        editingId={editingId}
                    />
                </section>

                <section id='equipe' className='py-16 md:py-20 bg-slate-50 dark:bg-slate-950/60'>
                    <div className='max-w-5xl mx-auto px-4 text-center'>
                    <h2 className='text-3xl md:text-4xl font-bold mb-4 text-slate-900 dark:text-white'>
                        Equipe
                    </h2>
                    <p className='text-slate-600 dark:text-slate-300 max-w-3xl mx-auto'>
                        Este projeto foi apresentado como trabalho acadêmico com o tema "ONGs".
                        Grupo composto por: João Marcelo, Thalia Freitas, Ingrid Oliveira,
                        Maria Eduarda, Mayara Ramos, Amanda de Andrade
                    </p>
                    </div>
                </section>

                {/* <section id='contato' className='py-16 md:py-20 bg-slate-100 dark:bg-slate-900'>
                    <div className='max-w-4xl mx-auto px-4 text-center'>
                    <h2 className='text-3xl md:text-4xl font-bold mb-4 text-slate-900 dark:text-white'>
                        Contato
                    </h2>
                    <p className='text-slate-600 dark:text-slate-300 mb-6'>
                        Para dúvidas, sugestões ou interesse em utilizar ou evoluir este sistema,
                        você pode incluir aqui um e-mail de contato, formulário ou link para
                        repositório.
                    </p>
                    </div>
                </section> */}
                </main>

                <Footer />
            </div>
        </div>
        )
    }

export default App
