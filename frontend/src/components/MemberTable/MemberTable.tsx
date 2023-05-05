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
  // Use the useTable Hook to send the columns and data to build the table
  const {
    getTableProps, // table props from react-table
    getTableBodyProps, // table body props from react-table
    headerGroups, // headerGroups, if your table has groupings
    rows, // rows for the table based on the data passed
    prepareRow, // Prepare the row (this function needs to be called for each row before getting the row props)
  } = useTable({
    columns,
    data,
  });

  /* 
    Render the UI for your table
    - react-table doesn't have UI, it's headless. We just need to put the react-table props from the Hooks, and it will do its magic automatically
  */

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
