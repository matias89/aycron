import { StyledTable } from './Table.styled';

import Button from '@/components/Button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faTrash,
    faDownload,
  } from '@fortawesome/free-solid-svg-icons';

import type { TTable, TRow, Tcol } from '@/utils/types';
const Row = ({ item, onDownload, onDelete }: TRow) => {
    return (
        <tr>
            <Col>{item.name}</Col>
            <Col>{item.code}</Col>
            <Col>{item.address}</Col>
            <Col>
                <Button onClick={() => onDownload(item.filename)}>
                    <FontAwesomeIcon icon={faDownload} />
                </Button>
                <Button onClick={() => onDelete(item.code)}>
                    <FontAwesomeIcon icon={faTrash} />
                </Button>
            </Col>
        </tr>
    );
};

const Col = ({ children }: Tcol) => {
    return <td>{children}</td>;
};

const Table = ({ data, onDownload, onDelete }: TTable) => {
    return (
        <StyledTable>
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Código</th>
                    <th>Dirección</th>
                    <th>Options</th>
                </tr>
            </thead>
            <tbody>
                {data.map((item, index) => (
                    <Row
                        item={item}
                        key={index}
                        onDownload={onDownload}
                        onDelete={onDelete}
                    />
                ))}
            </tbody>
        </StyledTable>
    );
};

export default Table;
