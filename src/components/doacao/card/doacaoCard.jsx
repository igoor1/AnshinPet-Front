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

        <div className="cardDoacao">
            <div className="nameTop">
                {getTipo(doacao)}
            </div>

            <div className='body'>
                <div className="infoDoacaoContainer">
                    <p>{getBodyType(doacao)}</p>
                    <p>Descrição: {doacao.descricao}</p>
                </div>
            </div>

            <div className='containerHr'>
                <hr />
            </div>


            <div className="footer">
                <div className="btnContainer">
                    <Button variant="success" className='m-1' onClick={() => getModalEdit(doacao)}><i className="bi bi-pencil"></i> Editar</Button>
                    <Button variant="outline-secondary" className='m-1' onClick={() => openModalDelete(doacao.id)}><i className="bi bi-trash"></i> Deletar</Button>
                </div>
            </div>
        </div>

    )

}
export default DoacaoCard