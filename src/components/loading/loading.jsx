import { ProgressSpinner } from 'primereact/progressspinner';

export function Loading() {
    return (
        <div className='flex justify-content-center align-items-center' style={{ height: '100vh', flexDirection: 'column', gap: '1rem' }}>
            <ProgressSpinner />
            <p className='text-center font-bold'>Carregando</p>
        </div>
    )
}