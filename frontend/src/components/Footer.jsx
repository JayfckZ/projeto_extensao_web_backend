import React from 'react'

const Footer = () => {
    return (
        <footer className='border-t border-slate-200 dark:border-slate-800 mt-8'>
            <div className='max-w-6xl mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between gap-3 text-sm text-slate-500 dark:text-slate-400'>
                <span>
                    ONG Alimentos Solidários · Sistema de Gestão de Mantimentos
                </span>
                <span>
                    Desenvolvido como solução web para apoio a ONGs e projetos sociais
                </span>
            </div>
        </footer>
    )
}

export default Footer
