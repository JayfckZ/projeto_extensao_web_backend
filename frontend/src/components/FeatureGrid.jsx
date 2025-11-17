import React from 'react'

const features = [
    {
        title: 'Listar Mantimentos',
        description:
        'Visualize todos os itens cadastrados, incluindo nome, categoria, quantidade e data de entrada.',
        icon: '📋'
    },
    {
        title: 'Cadastrar Mantimentos',
        description:
        'Adicione novos itens ao estoque da ONG através de um formulário simples e intuitivo.',
        icon: '➕'
    },
    {
        title: 'Visualizar Detalhes',
        description:
        'Acesse informações completas de cada mantimento, permitindo maior controle e transparência.',
        icon: '👁️'
    },
    {
        title: 'Atualizar Mantimentos',
        description:
        'Edite informações de itens já cadastrados, como quantidade disponível, categoria ou data.',
        icon: '✏️'
    },
    {
        title: 'Excluir Mantimentos',
        description:
        'Remova itens do estoque quando forem entregues, descartados ou estiverem fora da validade.',
        icon: '🗑️'
    },
    {
        title: 'Histórico organizado',
        description:
        'Mantenha um registro organizado de todas as movimentações, facilitando prestação de contas.',
        icon: '📊'
    }
]

const FeatureGrid = () => {
    return (
        <div className='max-w-6xl mx-auto px-4'>
            <div className='text-center mb-10'>
                <h2 className='text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-3'>
                    Funcionalidades do Sistema
                </h2>
                <div className='w-16 h-1 bg-sky-500 mx-auto rounded-full' />
            </div>

            <div className='grid gap-6 md:grid-cols-3'>
                {features.map(feature => (
                <div key={feature.title} className='feature-card'>
                    <div className='flex items-center justify-center mb-4'>
                        <span className='text-3xl'>{feature.icon}</span>
                    </div>
                    <h3 className='text-lg font-semibold text-slate-900 dark:text-white mb-2 text-center'>
                        {feature.title}
                    </h3>
                    <p className='text-sm text-slate-600 dark:text-slate-300 text-center'>
                        {feature.description}
                    </p>
                </div>
                ))}
            </div>
        </div>
    )
}

export default FeatureGrid
