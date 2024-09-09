

import { Menubar } from 'primereact/menubar';
import { Badge } from 'primereact/badge';
import { Avatar } from 'primereact/avatar';

import Logo from '../../assets/logoWhite.svg'


export default function Navbar() {

    const renderItems = (item) => (
        <a className='flex align-items-center p-menuitem-link text-white hover:bg-yellow-300 backgroundColorPrimary cursor-pointer' onClick={() => item.url && (window.location.href = item.url)}>
            <span className={item.icon} />
            <span className='mx-2'>{item.label}</span>
            {item.badge && <Badge className='ml-auto bg-yellow-500' value={item.badge} />}
            {item.shortcut && <span className='ml-auto border-1 surface-border border-round surface-100 text-xs p-1'>{item.shortcut}</span>}
        </a>
    )

    const items = [
        {
            label: 'Home',
            icon: 'pi pi-home',
            url: '/dashboard',
            template: renderItems
        },
        {
            label: 'Animais',
            icon: 'pi pi-heart',
            url: '/animal',
            template: renderItems
        },
        {
            label: 'Doações',
            icon: 'pi pi-sparkles',
            badge: 3,
            url: '/docao',
            template: renderItems
        }
    ]

    const start = <img alt='logo' src={Logo} height='40' className='mr-2' />;
    const end = (
        <div className='flex align-items-center gap-2'>
            <Avatar image='https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png' shape='circle' />
        </div>
    )

    return (
        <div className='card'>
            <Menubar model={items} start={start} end={end} className='backgroundColorPrimary' />
        </div>
    )


}