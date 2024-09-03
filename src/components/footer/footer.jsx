import Logo from '../../assets/logoFull.svg'

export default function Footer() {
    return (
        <>
            <div className='backgroundColorYellow px-4 md:px-6 lg:px-8 mt-2'>
                <div className='py-6 flex flex-column sm:flex-row sm:align-items-center justify-content-between'>
                    <div className='textColorPrimary'>
                        <img src={Logo} alt='Logo Anshin Pet' height='90' />
                        <div className='mt-2 line-height-3'>© 2024 Projeto Anshin Pet. All rights reserved</div>
                    </div>

                    <div className='mt-3 sm:mt-0'>
                        <a className='cursor-pointer textColorPrimary transition-colors transition-duration-150 hover:text-700 p-1'>
                            <i className='pi pi-facebook text-xl'></i>
                        </a>
                        <a className='cursor-pointer textColorPrimary transition-colors transition-duration-150 hover:text-700 p-1'>
                            <i className='pi pi-instagram text-xl'></i>
                        </a>
                        <a className='cursor-pointer textColorPrimary transition-colors transition-duration-150 hover:text-700 p-1'>
                            <i className='pi pi-github text-xl'></i>
                        </a>
                    </div>
                </div>
            </div>
        </>
    )
}