import { Button, Card } from 'react-bootstrap';

import './doacaoCard.scss';

import { ModalDelete } from '../modal/modalDelete';
import { ModalEditDinheiro } from '../modal/modalEditDinheiro';
import { ModalEditRacao } from '../modal/modalEditRacao';


const DoacaoCard = ({ refreshDoacoes, doacao }) => {
    const { openModalDelete } = ModalDelete(refreshDoacoes);
    const { openModalEditDinheiro } = ModalEditDinheiro(refreshDoacoes)
    const { openModalEditRacao } = ModalEditRacao(refreshDoacoes);

    const getTipo = (doacao) => {
        switch (doacao.tipo) {
            case 'D':
                return 'Dinheiro';
            case 'R':
                return 'Ração';
            default:
                return 'Erro'
        }
    }

    const getBodyType = (doacao) => {
        switch (doacao.tipo) {
            case 'D':
                return `Valor: ${doacao.valor}`;
            case 'R':
                return `Quantidade: ${doacao.quantidade}`;
            default:
                return 'Erro'
        }
    }

    const getModalEdit = (doacao) => {
        switch (doacao.tipo) {
            case 'D':
                return openModalEditDinheiro(doacao)

            case 'R':
                return openModalEditRacao(doacao)
        }
    }



    return (
        <div className='itemDoacao'>

            <Card className="text-center cardDoacao">

                <Card.Header>
                    <div className='headerDoacao'>
                        <div>
                            <p style={{ margin: 'auto' }}> {getTipo(doacao)}</p>
                        </div>
                    </div>
                </Card.Header>

                <Card.Body>
                    <div className='infoDoacao'>
                        {
                            getBodyType(doacao)
                        }
                        <p>Descrição: {doacao.descricao}</p>
                    </div>
                </Card.Body>
                <Card.Footer className="text-muted">
                    <Button variant="danger" className='m-1' onClick={() => openModalDelete(doacao.id)}><i className="bi bi-trash"></i></Button>
                    <Button variant="success" className='m-1' onClick={() => getModalEdit(doacao)}><i className="bi bi-pencil"></i></Button>
                </Card.Footer>
            </Card>
        </div>
    )

}
export default DoacaoCard