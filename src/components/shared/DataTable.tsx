"use client";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";

export interface Column<T> {
    header: string;
    accessor: keyof T | ((row: T) => any);
    cell?: (value: any, row: T) => React.ReactNode;
}

interface DataTableProps<T> {
    data: T[];
    columns: Column<T>[];
    searchable?: boolean;
    searchPlaceholder?: string;
    paginated?: boolean;
    itemsPerPage?: number;
    actions?: (row: T) => React.ReactNode;
}

export function DataTable<T>({
    data,
    columns,
    searchable = false,
    searchPlaceholder = "Search...",
    paginated = false,
    itemsPerPage = 10,
    actions,
}: DataTableProps<T>) {
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    // Filter data based on search
    const filteredData = searchable
        ? data.filter((row) =>
            Object.values(row as any).some((value) =>
                String(value).toLowerCase().includes(searchTerm.toLowerCase())
            )
        )
        : data;

    // Paginate data
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const paginatedData = paginated
        ? filteredData.slice(
            (currentPage - 1) * itemsPerPage,
            currentPage * itemsPerPage
        )
        : filteredData;

    const getCellValue = (row: T, column: Column<T>) => {
        if (typeof column.accessor === "function") {
            return column.accessor(row);
        }
        return (row as any)[column.accessor];
    };

    return (
        <div className="space-y-4">
            {searchable && (
                <div className="relative max-w-sm">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder={searchPlaceholder}
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                            setCurrentPage(1);
                        }}
                        className="pl-10"
                    />
                </div>
            )}

            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            {columns.map((column, index) => (
                                <TableHead key={index}>{column.header}</TableHead>
                            ))}
                            {actions && <TableHead className="text-right">Actions</TableHead>}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {paginatedData.length === 0 ? (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length + (actions ? 1 : 0)}
                                    className="text-center py-8 text-muted-foreground"
                                >
                                    No data found
                                </TableCell>
                            </TableRow>
                        ) : (
                            paginatedData.map((row, rowIndex) => (
                                <TableRow key={rowIndex}>
                                    {columns.map((column, colIndex) => {
                                        const value = getCellValue(row, column);
                                        return (
                                            <TableCell key={colIndex}>
                                                {column.cell ? column.cell(value, row) : value}
                                            </TableCell>
                                        );
                                    })}
                                    {actions && (
                                        <TableCell className="text-right">{actions(row)}</TableCell>
                                    )}
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>

            {paginated && totalPages > 1 && (
                <div className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground">
                        Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
                        {Math.min(currentPage * itemsPerPage, filteredData.length)} of{" "}
                        {filteredData.length} results
                    </p>
                    <div className="flex items-center gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                            disabled={currentPage === 1}
                        >
                            <ChevronLeft className="h-4 w-4" />
                            Previous
                        </Button>
                        <span className="text-sm text-muted-foreground">
                            Page {currentPage} of {totalPages}
                        </span>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                            disabled={currentPage === totalPages}
                        >
                            Next
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}
