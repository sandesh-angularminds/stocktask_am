// components/ui/simple-table.tsx
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function SharedTable({
  columns,
  data,
  renderRow,
  caption,
  footerTotal,
}) {
  return (
    <Table>
      {caption && <TableCaption>{caption}</TableCaption>}
      <TableHeader>
        <TableRow>
          {columns.map((col, idx) => (
            <TableHead
              key={idx}
              className={idx === columns.length - 1 ? "text-right" : ""}
            >
              {col}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data && data.length > 0 ? (
          data.map((item, idx) => (
            <TableRow key={idx}>{renderRow(item, idx + 1)}</TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={columns.length} className="text-center">
              No data available.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
      {footerTotal && (
        <TableFooter>
          <TableRow>
            <TableCell colSpan={columns.length - 1}>Total</TableCell>
            <TableCell className="text-right">{footerTotal}</TableCell>
          </TableRow>
        </TableFooter>
      )}
    </Table>
  );
}
