import { Container, Image, Stack } from 'react-bootstrap';

import Logo from '../../assets/logoFull.svg';

const Footer = () => {
    return (
        <div className='position-relative' style={{ backgroundColor: 'var(--auxColor1)' }}>
            <hr />
            <Stack direction="horizontal" gap={3}>
                <div className="p-2"> <Image src={Logo} alt="Logo" style={{ width: '100px', height: '100px' }} />
                </div>
                <div className="p-2 ms-auto">
                    <div className='gap-2 text-end'>
                        <a href=""><i className="bi bi-facebook"></i></a>
                        <a href="" style={{ textDecoration: 'none' }}> <i className="bi bi-instagram"></i>  </a>
                        <a href=""><i className="bi bi-github"></i></a>
                    </div>
                    <br></br>
                    <p><small>© 2024 Anshin Pet, Inc. All rights reserved</small></p>
                </div>
            </Stack>


        </div>

    )
}

export default Footer;