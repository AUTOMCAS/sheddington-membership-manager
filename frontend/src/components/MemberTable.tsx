import React, { useMemo } from 'react';
import { useTable } from 'react-table';

type MemberProps = {
  id: string | number;
  firstName: string;
  lastName: string;
  email: string;
  telephone: string;
  address: string;
  gender: string | undefined;
  joinDate: string;
  renewalDate: string;
  createdAt: string;
  updatedAt: string;
};

type Props = {
  data: Array<MemberProps>;
};

export default function MemberTable({ data }: Props): JSX.Element {
  const columns = useMemo(
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
            Header: 'Address',
            accessor: 'address',
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
    const date = dateTime.substring(0, 10);
    const formattedDate = `${date.substring(8, 10)}/${date.substring(
      5,
      7,
    )}/${date.substring(0, 4)}`;

    return formattedDate;
  };

  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()}>{column.render('Header')}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody data-test="memberTableBody" {...getTableBodyProps()}>
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
}
