import React, { useMemo } from 'react';
import './MemberTable.css';
import moment from 'moment';

import { useTable } from 'react-table';

type MemberProps = {
  id: string | number;
  firstName: string;
  lastName: string;
  email: string;
  telephone: string;
  gender: string;
  joinDate: string;
  renewalDate: string;
  createdAt: string;
  updatedAt: string;
};

type MemberTableProps = {
  data: Array<MemberProps>;
};

const MemberTable: React.FC<MemberTableProps> = ({
  data,
}: MemberTableProps): JSX.Element => {
  const columns: any = useMemo(
    () => [
      {
        Header: 'Members',
        columns: [
          {
            Header: 'First Name',
            accessor: 'firstName',
          },
          {
            Header: 'Last Name',
            accessor: 'lastName',
          },
          {
            Header: 'Email',
            accessor: 'email',
          },
          {
            Header: 'Telephone',
            accessor: 'telephone',
          },
          {
            Header: 'Gender',
            accessor: 'gender',
          },
          {
            Header: 'Join Date',
            accessor: (row: any): string => formatDate(row.joinDate),
          },
          {
            Header: 'Renewal Date',
            accessor: (row: any): string => formatDate(row.renewalDate),
          },
          {
            Header: 'View',
            accessor: 'id',

            Cell: (props: any) => (
              <a href={`/members/${props.value}`}>
                {' '}
                <button>View</button>
              </a>
            ),
          },
        ],
      },
    ],
    [],
  );

  const {
    getTableProps, 
    getTableBodyProps, 
    headerGroups, 
    rows, 
    prepareRow, 
  } = useTable({
    columns,
    data,
  });

  const formatDate = (dateTime: string) => {
    const formattedDateOnly = moment(dateTime).format('DD/MM/YYYY');

    return formattedDateOnly;
  };

  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => {
              return column.Header === 'Members' ? null : (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              );
            })}
          </tr>
        ))}
      </thead>
      <tbody data-test="member-table-body" {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return (
                  <td {...cell.getCellProps()} data-test={`member${i}`}>
                    {cell.render('Cell')}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default MemberTable;
