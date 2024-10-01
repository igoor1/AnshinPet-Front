import { Footer } from "../../components/footer/footer";
import { Navbar } from "../../components/navbar/navbar";

import { Chart } from 'primereact/chart';
import { useState, useEffect } from 'react';

export function Dashboard() {
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});

    useEffect(() => {
        const documentStyle = getComputedStyle(document.documentElement);

        const data = {
            labels: ['Cachorros', 'Gatos', 'Aves'],
            datasets: [
                {
                    label: 'Quantidade',
                    data: [10, 8, 3],
                    backgroundColor: [
                        documentStyle.getPropertyValue('--indigo-500'),
                        documentStyle.getPropertyValue('--yellow-500'),
                        documentStyle.getPropertyValue('--indigo-500'),
                    ],
                    borderColor: [
                        documentStyle.getPropertyValue('--indigo-400'),
                        documentStyle.getPropertyValue('--yellow-400'),
                        documentStyle.getPropertyValue('--indigo-400'),
                    ],
                    borderWidth: 1
                }
            ]
        };
        const options = {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        };

        setChartData(data);
        setChartOptions(options);
    }, []);

    const [chartData1, setChartData1] = useState({});
    const [chartOptions1, setChartOptions1] = useState({});

    useEffect(() => {
        const documentStyle = getComputedStyle(document.documentElement);

        const data = {
            labels: ['Para Adoção', 'Não Adoção'],
            datasets: [
                {
                    data: [15, 5],
                    backgroundColor: [
                        documentStyle.getPropertyValue('--indigo-500'),
                        documentStyle.getPropertyValue('--yellow-500'),
                    ],
                    hoverBackgroundColor: [
                        documentStyle.getPropertyValue('--indigo-400'),
                        documentStyle.getPropertyValue('--yellow-400'),
                    ]
                }
            ]
        };
        const options = {
            cutout: '60%'
        };

        setChartData1(data);
        setChartOptions1(options);
    }, []);


    return (
        <>
            <Navbar />
            <div className="col-11 m-auto">
                <div className="col-12 mt-4">
                    <div className="surface-card shadow-2 border-round flex p-3 flex-column md:flex-row">
                        <div className="border-bottom-1 md:border-right-1 md:border-bottom-none surface-border flex-auto p-3">
                            <div className="flex align-items-center mb-3">
                                <i className="pi pi-warehouse text-indigo-500 text-xl mr-2"></i>
                                <span className="text-500 font-medium">Animais</span>
                            </div>
                            <span className="block text-900 font-medium mb-4 text-xl">20</span>
                            <div className="flex align-items-center">
                                <i className="pi pi-arrow-down text-red-500 text-xl mr-2"></i>
                                <span className="text-pink-500 font-medium ">-5</span>
                            </div>
                        </div>
                        <div className="border-bottom-1 md:border-right-1 md:border-bottom-none surface-border flex-auto p-3">
                            <div className="flex align-items-center mb-3">
                                <i className="pi pi-receipt text-yellow-500 text-xl mr-2"></i>
                                <span className="text-500 font-medium">Ração</span>
                            </div>
                            <span className="block text-900 font-medium mb-4 text-xl">20KG</span>
                            <div className="flex align-items-center">
                                <i className="pi pi-arrow-up text-green-500 text-xl mr-2"></i>
                                <span className="text-green-500 font-medium ">+15</span>
                            </div>
                        </div>
                        <div className="border-bottom-1 md:border-right-1 md:border-bottom-none surface-border flex-auto p-3">
                            <div className="flex align-items-center mb-3">
                                <i className="pi pi-inbox text-indigo-500 text-xl mr-2"></i>
                                <span className="text-500 font-medium">Doações</span>
                            </div>
                            <span className="block text-900 font-medium mb-4 text-xl">R$: 828.90</span>
                            <div className="flex align-items-center">
                                <i className="pi pi-arrow-up text-green-500 text-xl mr-2"></i>
                                <span className="text-green-500 font-medium ">+%12</span>
                            </div>
                        </div>
                        <div className="flex-auto p-3">
                            <div className="flex align-items-center mb-3">
                                <i className="pi pi-users text-yellow-500 text-xl mr-2"></i>
                                <span className="text-500 font-medium">Cuidadores</span>
                            </div>
                            <span className="block text-900 font-medium mb-4 text-xl">12</span>
                            <div className="flex align-items-center">
                                <i className="pi pi-arrow-up text-green-500 text-xl mr-2"></i>
                                <span className="text-green-500 font-medium ">+2</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-12 my-3">
                    <div className="grid">
                        <div className="col-12">
                            <div className="shadow-2 border-round lg:flex justify-content-around block">

                                <div className="p-2">
                                    <Chart type="bar" data={chartData} options={chartOptions} className="w-25rem lg:w-30rem" />

                                </div>

                                <div className="p-2">
                                    <Chart type="doughnut" data={chartData1} options={chartOptions1} className='w-10rem lg:w-15rem' />
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <Footer />
        </>
    )
}