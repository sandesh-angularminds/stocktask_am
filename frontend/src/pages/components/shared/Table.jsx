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
  tableRows,
  headingClasses = "text-right font-bold",
  cellClasses = "",
}) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {tableRows &&
            Object.entries(tableRows[0]).map(([key]) => {
              return (
                <TableHead className={`${headingClasses} text-right`}>
                  {key}
                </TableHead>
              );
            })}
        </TableRow>
      </TableHeader>
      <TableBody>
        {tableRows &&
          tableRows.map((record) => {
            return (
              <TableRow key={record.invoice}>
                {Object.values(record).map((value) => {
                  return (
                    <TableCell className={`${cellClasses}`}>{value}</TableCell>
                  );
                })}
              </TableRow>
            );
          })}
      </TableBody>

      {/* <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell className="text-right">$2,500.00</TableCell>
          </TableRow>
        </TableFooter> */}
    </Table>
  );
}
