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
import { useRouter, useSearchParams } from "next/navigation";

export interface Column<T> {
    header: string;
    accessor: keyof T | ((row: T) => any);
    cell?: (value: any, row: T) => React.ReactNode;
}

interface PaginationInfo {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
}

interface DataTableProps<T> {
    data: T[];
    columns: Column<T>[];
    searchable?: boolean;
    searchPlaceholder?: string;
    pagination?: PaginationInfo;
    serverSidePagination?: boolean;
    actions?: (row: T) => React.ReactNode;
}

export function DataTable<T>({
    data,
    columns,
    searchable = false,
    searchPlaceholder = "Search...",
    pagination,
    serverSidePagination = false,
    actions,
}: DataTableProps<T>) {
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const router = useRouter();
    const searchParams = useSearchParams();

    // Client-side filtering
    const filteredData = searchable && !serverSidePagination
        ? data.filter((row) =>
            Object.values(row as any).some((value) =>
                String(value).toLowerCase().includes(searchTerm.toLowerCase())
            )
        )
        : data;

    // Client-side pagination
    const itemsPerPage = pagination?.limit || 10;
    const totalPages = serverSidePagination 
        ? pagination?.totalPages || 1 
        : Math.ceil(filteredData.length / itemsPerPage);
    
    const paginatedData = serverSidePagination
        ? filteredData
        : filteredData.slice(
            (currentPage - 1) * itemsPerPage,
            currentPage * itemsPerPage
        );

    const handlePageChange = (newPage: number) => {
        if (serverSidePagination) {
            const params = new URLSearchParams(searchParams.toString());
            params.set("page", newPage.toString());
            router.push(`?${params.toString()}`, { scroll: false });
        } else {
            setCurrentPage(newPage);
        }
    };

    const getCellValue = (row: T, column: Column<T>) => {
        if (typeof column.accessor === "function") {
            return column.accessor(row);
        }
        return (row as any)[column.accessor];
    };

    const currentPageNum = serverSidePagination ? (pagination?.page || 1) : currentPage;
    const showingFrom = (currentPageNum - 1) * itemsPerPage + 1;
    const showingTo = Math.min(
        currentPageNum * itemsPerPage,
        serverSidePagination ? (pagination?.total || 0) : filteredData.length
    );
    const totalItems = serverSidePagination ? (pagination?.total || 0) : filteredData.length;

    return (
        <div className="space-y-4">
            {searchable && !serverSidePagination && (
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
                            paginatedData?.map((row, rowIndex) => (
                                <TableRow key={rowIndex}>
                                    {columns?.map((column, colIndex) => {
                                        const value = getCellValue(row, column);
                                        return (
                                            <TableCell key={colIndex}>
                                                {column.cell ? column?.cell(row, value) : value}
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

            {(pagination || totalPages > 1) && (
                <div className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground">
                        Showing {showingFrom} to {showingTo} of {totalItems} results
                    </p>
                    <div className="flex items-center gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handlePageChange(currentPageNum - 1)}
                            disabled={serverSidePagination ? !pagination?.hasPrev : currentPageNum === 1}
                        >
                            <ChevronLeft className="h-4 w-4" />
                            Previous
                        </Button>
                        <span className="text-sm text-muted-foreground">
                            Page {currentPageNum} of {totalPages}
                        </span>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handlePageChange(currentPageNum + 1)}
                            disabled={serverSidePagination ? !pagination?.hasNext : currentPageNum === totalPages}
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