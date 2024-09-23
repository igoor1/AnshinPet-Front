import { Menubar } from 'primereact/menubar';
import { Badge } from 'primereact/badge';
import { Avatar } from 'primereact/avatar';
import { Button } from 'primereact/button';
import { TieredMenu } from 'primereact/tieredmenu';
import { useRef } from 'react';

import Logo from '../../assets/logoWhite.svg'

export function Navbar() {

    const renderItemsLinksBar = (item) => (
        <a className='flex align-items-center p-menuitem-link text-white hover:bg-yellow-300 backgroundColorPrimary cursor-pointer' onClick={() => item.url && (window.location.href = item.url)}>
            <span className={item.icon} />
            <span className='mx-2'>{item.label}</span>
            {item.badge && <Badge className='ml-auto bg-yellow-500' value={item.badge} />}
            {item.shortcut && <span className='ml-auto border-1 surface-border border-round surface-100 text-xs p-1'>{item.shortcut}</span>}
        </a>
    )

    const renderItemsLinksProfileMenu = (item) => (
        <a className="flex align-items-center p-menuitem-link backgroundColorPrimary text-white hover:bg-yellow-300">
            <span className={item.icon} />
            <span className="mx-2">{item.label}</span>
            {item.shortcut && <span className="ml-auto border-1 surface-border border-round surface-100 text-xs p-1">{item.shortcut}</span>}
        </a>
    );

    const itemsmenubar = [
        {
            label: 'Home',
            icon: 'pi pi-home',
            url: '/dashboard',
            template: renderItemsLinksBar
        },
        {
            label: 'Animais',
            icon: 'pi pi-sparkles',
            url: '/animal',
            template: renderItemsLinksBar
        },
        {
            label: 'Cuidados Médicos',
            icon: 'pi pi-heart',
            template: renderItemsLinksBar,
            items: [
                {
                    label: 'Doenças',
                    url: '/doenca',
                    icon: 'pi pi-slack',
                    template: renderItemsLinksBar
                },
                {
                    label: 'Vacinas',
                    url: '/vacina',
                    icon: 'pi pi-key',
                    template: renderItemsLinksBar
                }
            ]
        },
        {
            label: 'Doações',
            icon: 'pi pi-dollar',
            badge: 3,
            url: '/doacao',
            template: renderItemsLinksBar
        }
    ]

    const menuProfile = useRef(null);

    const itemsmenuProfile = [
        {
            label: 'Configurações',
            icon: 'pi pi-cog',
            template: renderItemsLinksProfileMenu
        },
        {
            separator: true
        },
        {
            label: 'Sair',
            icon: 'pi pi-share-alt',
            template: renderItemsLinksProfileMenu
        }
    ];

    const start = <img alt='logo' src={Logo} height='40' className='mr-2' />;
    const end = (
        <div className='flex align-items-center gap-2'>
            <TieredMenu model={itemsmenuProfile} popup ref={menuProfile} breakpoint="767px" />
            <Button label={<Avatar image='https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png' shape='circle' />} onClick={(e) => menuProfile.current.toggle(e)} style={{ 'backgroundColor': `var(--primaryColor)`, 'border': 'none' }} />
        </div>
    )

    return (
        <div className='card'>
            <Menubar model={itemsmenubar} start={start} end={end} className='backgroundColorPrimary' />
        </div>
    )
}