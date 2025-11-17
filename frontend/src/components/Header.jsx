import React from 'react'

const Header = ({ darkMode, onToggleDarkMode }) => {
    return (
        <header className='fixed top-0 inset-x-0 z-30 bg-primary/95 dark:bg-slate-950/95 backdrop-blur border-b border-slate-800'>
            <nav className='max-w-6xl mx-auto px-4 h-16 flex items-center justify-between'>
                <div className='flex items-center gap-3'>
                    <div className='flex items-center justify-center w-9 h-9 rounded-xl bg-emerald-100 dark:bg-emerald-900/60'>
                        <span className='text-lg'>🏠</span>
                    </div>
                    <div className='flex flex-col leading-tight'>
                        <span className='text-white font-semibold text-lg'>
                            ONG Alimentos Solidários
                        </span>
                        <span className='nav-badge'>
                            Sistema de Gestão de Mantimentos
                        </span>
                    </div>
                </div>

                <div className='hidden md:flex items-center gap-8 text-sm'>
                    <a href='#sobre' className='text-slate-200 hover:text-white transition'>
                        Sobre
                    </a>
                    <a href='#funcionalidades' className='text-slate-200 hover:text-white transition'>
                        Funcionalidades
                    </a>
                    <a href='#sistema' className='text-slate-200 hover:text-white transition'>
                        Sistema
                    </a>
                    <a href='#equipe' className='text-slate-200 hover:text-white transition'>
                        Equipe
                    </a>
                    <a href='#contato' className='text-slate-200 hover:text-white transition'>
                        Contato
                    </a>
                    <button
                        type='button'
                        onClick={onToggleDarkMode}
                        className='ml-4 inline-flex items-center justify-center w-9 h-9 rounded-full bg-slate-900/30 hover:bg-slate-900/60 text-slate-100'
                        aria-label='Alternar tema'
                    >
                        {darkMode ? '🌙' : '☀️'}
                    </button>
                </div>
            </nav>
        </header>
    )
    }

export default Header
