import Footer from "../components/footer/footer";
import Navbar from "../components/navbar/navbar";

import { Chart } from 'primereact/chart';
import { useState, useEffect } from 'react';

function useAnimaisChart() {
    const [animais, setAnimais] = useState({});
    const [animaisChartOptions, setAnimaisChartOptions] = useState({});

    const [adocao, setAdocao] = useState({});
    const [adocaoChartOptions, setAdocaoChartOptions] = useState({});

    const createChartData = (labels, data, backgroundColor, borderColor = [], hoverBackgroundColor = []) => {
        return {
            labels: labels,
            datasets: [
                {
                    labels: 'Quantidade',
                    data: data,
                    backgroundColor: backgroundColor,
                    borderColor: borderColor.length ? borderColor : undefined,
                    hoverBackgroundColor: hoverBackgroundColor.length ? hoverBackgroundColor : undefined,
                    borderWidth: 1
                }
            ]
        }
    }

    useEffect(() => {
        const documentStyle = getComputedStyle(document.documentElement);

        setAnimais(createChartData(
            ['Cachorros', 'Gatos', 'Aves'],
            [14, 7, 10],
            ['rgba(252, 134, 15, 0.2)', 'rgba(0, 245, 245, 0.2)', 'rgba(132, 255, 31, 0.2)'],
            ['rgb(255, 159, 64)', 'rgb(75, 192, 192)', 'rgb(145, 255, 0)']
        ))

        setAdocao(createChartData(
            ['Para Adoção', 'Não Adoção'],
            [26, 5],
            [documentStyle.getPropertyValue('--blue-500'), documentStyle.getPropertyValue('--red-500'),],
            [documentStyle.getPropertyValue('--indigo-400'), documentStyle.getPropertyValue('--blue-400'),]
        ))

        const optionsAnimais = {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        };

        const optionsAdocao = {
            plugins: {
                legend: {
                    labels: {
                        usePointStyle: true
                    }
                }
            }
        };

        setAnimaisChartOptions(optionsAnimais);

        setAdocaoChartOptions(optionsAdocao);

    }, []);

    return { animais, animaisChartOptions, adocao, adocaoChartOptions }
}

export default function Dashboard() {
    const { animais, animaisChartOptions, adocao, adocaoChartOptions } = useAnimaisChart()

    return (
        <>
            <Navbar />
            <div className='col-12'>
                <div className='grid'>
                    <div className='col-12 md:col-6 lg:col-3 p-3'>
                        <div className='p-3 text-center bg-blue-500 border-round'>
                            <span className='inline-flex justify-content-center align-items-center bg-blue-600 border-circle mb-3' style={{ width: '49px', height: '49px' }}>
                                <i className='pi pi-heart text-xl text-white'></i>
                            </span>
                            <div className='text-2xl font-medium text-white mb-2'>31</div>
                            <span className='text-blue-100 font-medium'>Animais</span>
                        </div>
                    </div>
                    <div className='col-12 md:col-6 lg:col-3 p-3'>
                        <div className='p-3 text-center bg-purple-500 border-round'>
                            <span className='inline-flex justify-content-center align-items-center bg-purple-600 border-circle mb-3' style={{ width: '49px', height: '49px' }}>
                                <i className='pi pi-slack text-xl text-white'></i>
                            </span>
                            <div className='text-2xl font-medium text-white mb-2'>17</div>
                            <span className='text-purple-100 font-medium'>Ração</span>
                        </div>
                    </div>
                    <div className='col-12 md:col-6 lg:col-3 p-3'>
                        <div className='p-3 text-center bg-red-500 border-round'>
                            <span className='inline-flex justify-content-center align-items-center bg-red-600 border-circle mb-3' style={{ width: '49px', height: '49px' }}>
                                <i className='pi pi-money-bill text-xl text-white'>
                                </i>
                            </span>
                            <div className='text-2xl font-medium text-white mb-2'>190.12</div>
                            <span className='text-indigo-100 font-medium'>Doações (Monetária)</span>
                        </div>
                    </div>
                    <div className='col-12 md:col-6 lg:col-3 p-3'>
                        <div className='p-3 text-center bg-orange-500 border-round'>
                            <span className='inline-flex justify-content-center align-items-center bg-orange-600 border-circle mb-3' style={{ width: '49px', height: '49px' }}>
                                <i className='pi pi-users text-xl text-white'></i>
                            </span>
                            <div className='text-2xl font-medium text-white mb-2'>3</div>
                            <span className='text-orange-100 font-medium'>Cuidadores</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className='col-12'>
                <div className='grid'>
                    <div className='col-12 md:col-6 lg:3 p-3'>
                        <div className='card flex justify-content-center'>
                            {animais?.datasets && <Chart type='bar' data={animais} options={animaisChartOptions} className="w-25rem lg:w-30rem" />}
                        </div>
                    </div>
                    <div className='col-12 md:col-6 lg:3 p-3'>
                        <div className='card flex justify-content-center'>
                            {adocao?.datasets && <Chart type='pie' data={adocao} options={adocaoChartOptions} className='w-10rem lg:w-15rem' />}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}