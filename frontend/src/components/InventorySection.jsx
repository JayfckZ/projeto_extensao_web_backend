import React from 'react'

const InventorySection = ({
    items,
    loading,
    error,
    formData,
    onChange,
    onSubmit,
    onEdit,
    onDelete,
    editingId
    }) => {
    return (
        <div id='inventory' className='max-w-6xl mx-auto px-4'>
            <h2 className='text-3xl md:text-4xl font-bold text-center mb-8 text-slate-900 dark:text-white'>
                Visualização do Sistema
            </h2>

            <div className='grid lg:grid-cols-3 gap-8 items-start'>
                <div className='lg:col-span-2'>
                    <div className='table-card'>
                        <div className='flex items-center justify-between px-6 py-4 bg-primary dark:bg-slate-950 text-white'>
                            <div className='flex items-center gap-2'>
                                <span className='text-lg'>🏠</span>
                                <span className='font-semibold'>ONG Alimentos Solidários</span>
                            </div>
                            <div className='text-xs space-x-3'>
                                <a href='#hero' className='hover:underline'>
                                    Início
                                </a>
                                <span className='opacity-60'>|</span>
                                <a href='#sistema' className='hover:underline'>
                                    Cadastrar
                                </a>
                            </div>
                        </div>

                        <div className='overflow-x-auto'>
                            <table className='min-w-full text-sm'>
                                <thead className='bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-200'>
                                    <tr>
                                        <th className='px-4 py-3 text-left font-semibold'>Nome</th>
                                        <th className='px-4 py-3 text-left font-semibold'>Categoria</th>
                                        <th className='px-4 py-3 text-left font-semibold'>Quantidade</th>
                                        <th className='px-4 py-3 text-left font-semibold'>Entrada</th>
                                        <th className='px-4 py-3 text-left font-semibold'>Validade</th>
                                        <th className='px-4 py-3 text-center font-semibold'>Ações</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {loading && (
                                    <tr>
                                        <td colSpan={5} className='px-4 py-6 text-center text-slate-500'>
                                            Carregando mantimentos...
                                        </td>
                                    </tr>
                                )}

                                {!loading && error && (
                                    <tr>
                                        <td colSpan={5} className='px-4 py-6 text-center text-red-500'>
                                            {error}
                                        </td>
                                    </tr>
                                )}

                                {!loading && !error && items.length === 0 && (
                                    <tr>
                                        <td colSpan={5} className='px-4 py-6 text-center text-slate-500'>
                                            Nenhum mantimento cadastrado ainda.
                                        </td>
                                    </tr>
                                )}

                                {!loading &&
                                    !error &&
                                    items.map(item => (
                                    <tr
                                        key={item._id}
                                        className='border-t border-slate-100 dark:border-slate-800'
                                    >
                                        <td className='px-4 py-3'>{item.name}</td>
                                        <td className='px-4 py-3'>{item.category}</td>
                                        <td className='px-4 py-3'>{item.quantity}</td>
                                        <td className='px-4 py-3'>{item.entryDate}</td>
                                        <td className='px-4 py-3'>{item.expirationDate}</td>
                                        <td className='px-4 py-3'>
                                        <div className='flex items-center justify-center gap-2'>
                                            <button
                                                type='button'
                                                onClick={() => onEdit(item)}
                                                className='inline-flex items-center justify-center w-8 h-8 rounded-md bg-amber-400 hover:bg-amber-300 text-slate-900 text-sm'
                                                title='Editar'
                                            >
                                                ✏️
                                            </button>
                                            <button
                                                type='button'
                                                onClick={() => onDelete(item._id)}
                                                className='inline-flex items-center justify-center w-8 h-8 rounded-md bg-red-500 hover:bg-red-400 text-white text-sm'
                                                title='Excluir'
                                            >
                                                🗑️
                                            </button>
                                        </div>
                                        </td>
                                    </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div className='bg-white dark:bg-slate-800 rounded-2xl shadow-soft p-6'>
                    <h3 className='text-xl font-semibold mb-4 text-slate-900 dark:text-white'>
                        {editingId ? 'Atualizar Mantimento' : 'Cadastrar Mantimento'}
                    </h3>
                    <form onSubmit={onSubmit} className='space-y-4'>
                        <div>
                            <label className='block text-sm font-medium mb-1'>
                                Nome do alimento
                            </label>
                            <input
                                type='text'
                                name='name'
                                value={formData.name}
                                onChange={onChange}
                                className='w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500'
                                placeholder='Ex.: Arroz, Feijão, Macarrão'
                                required
                            />
                        </div>

                        <div>
                            <label className='block text-sm font-medium mb-1'>
                                Categoria
                            </label>
                            <input
                                type='text'
                                name='category'
                                value={formData.category}
                                onChange={onChange}
                                className='w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500'
                                placeholder='Ex.: Grão, Enlatado, Secos'
                            />
                        </div>

                        <div>
                            <label className='block text-sm font-medium mb-1'>
                                Quantidade
                            </label>
                            <input
                                type='text'
                                name='quantity'
                                value={formData.quantity}
                                onChange={onChange}
                                className='w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500'
                                placeholder='Ex.: 25 sacos, 10 unidades'
                            />
                        </div>

                        <div>
                            <label className='block text-sm font-medium mb-1'>
                                Data de entrada
                            </label>
                            <input
                                type='date'
                                name='entryDate'
                                value={formData.entryDate}
                                onChange={onChange}
                                className='w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500'
                            />
                        </div>

                        <div>
                            <label className='block text-sm font-medium mb-1'>
                                Data de validade
                            </label>
                            <input
                                type='date'
                                name='expirationDate'
                                value={formData.expirationDate}
                                onChange={onChange}
                                className='w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500'
                            />
                            </div>


                        <button
                            type='submit'
                            className='w-full inline-flex items-center justify-center px-4 py-2.5 rounded-full bg-sky-500 hover:bg-sky-400 text-white font-medium text-sm transition'
                        >
                            {editingId ? 'Salvar alterações' : 'Adicionar mantimento'}
                        </button>
                    </form>

                    {editingId && (
                        <p className='mt-3 text-xs text-slate-500 dark:text-slate-400'>
                            Você está editando um mantimento existente. Para voltar ao modo de
                            cadastro, basta salvar as alterações ou recarregar a página.
                        </p>
                    )}
                </div>
            </div>
        </div>
    )
}

export default InventorySection
