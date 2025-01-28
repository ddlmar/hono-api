import {
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Table as ThirdPartyTable,
} from '@components/shadcn/ui/table'
import React, {
  ForwardRefExoticComponent,
  RefAttributes,
  TdHTMLAttributes,
} from 'react'

interface TableProps<Type> {
  header: Array<string>
  caption: string
  renderRow: (
    value: Type,
    cell: ForwardRefExoticComponent<
      TdHTMLAttributes<HTMLTableCellElement> &
        RefAttributes<HTMLTableCellElement>
    >
  ) => React.ReactNode
  fetchData: Array<Type>
}

const Table = <Type,>({
  header,
  caption,
  renderRow,
  fetchData,
}: TableProps<Type>) => {
  return (
    <ThirdPartyTable>
      <TableCaption>{caption}</TableCaption>
      <TableHeader>
        <TableRow>
          {header.map((headerItem) => (
            <TableHead key={headerItem}>{headerItem}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {fetchData.map((data, index) => (
          <TableRow key={index}>{renderRow(data, TableCell)}</TableRow>
        ))}
      </TableBody>
    </ThirdPartyTable>
  )
}

export default Table
