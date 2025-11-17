import React from 'react'

const Hero = () => {
    return (
        <section className='hero-bg pt-24 pb-24 md:pt-28 md:pb-28' id='hero'>
            <div className='hero-content max-w-5xl mx-auto px-4 text-center'>
                <p className='text-sky-200 uppercase text-xs tracking-[0.2em] mb-4'>
                    Sistema Web para ONGs
                </p>
                <h1 className='text-3xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight'>
                    Otimizando a Gestão de Alimentos
                    <br className='hidden md:block' />
                    <span className='text-sky-300'> para Comunidades Carentes</span>
                </h1>
                <p className='text-slate-100/90 text-base md:text-lg max-w-2xl mx-auto mb-8'>
                    Uma aplicação web desenvolvida para auxiliar ONGs no controle de entrada, saída
                    e organização de mantimentos não perecíveis e grãos arrecadados por meio de
                    doações.
                </p>
                <a
                href='#funcionalidades'
                className='inline-flex items-center justify-center px-6 py-3 rounded-full bg-sky-500 hover:bg-sky-400 text-white font-semibold shadow-soft transition'
                >
                    Conheça as Funcionalidades
                </a>
            </div>
        </section>
    )
    }

export default Hero
