import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";

export function Error(props) {
    const navigate = useNavigate();

    const handleNavigation = () => {
        navigate(`${props.route}`);
    };

    return (

        <div className='flex justify-content-center align-items-center' style={{ height: '100vh', flexDirection: 'column', gap: '1rem' }}>


            <div className='col-12 flex justify-content-center align-items-center'>
                <p className='text-center font-bold' >{props.message}</p>
            </div>

            <div className='col-12 flex justify-content-center align-items-center'>
                <Button icon='pi pi-arrow-left' severity='success' label='voltar' aria-label='add' onClick={handleNavigation} />
            </div>

        </div>

    )
}