import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, ChevronLeft, ChevronRight, ExternalLink, ArrowUpDown } from "lucide-react";
import "./PaymentHistory.css";

type PaymentStatus = "Pending" | "Escrowed" | "Released" | "Failed";

interface Payment {
    id: string;
    date: string;
    shipmentId: string;
    amount: number;
    token: string;
    status: PaymentStatus;
    txHash: string;
}

const PaymentHistory: React.FC = () => {
    const [isLoading] = useState(false);
    const [filterStatus, setFilterStatus] = useState<PaymentStatus | "All">("All");
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // Mock data - 15+ rows
    const allPayments: Payment[] = [
        { id: "1", date: "2026-02-26", shipmentId: "SHP-9021", amount: 5420.50, token: "USDC", status: "Released", txHash: "0x4a9b2f81c3e5d7a9b2f81c3e5d7a9b2f81c3e5d7" },
        { id: "2", date: "2026-02-25", shipmentId: "SHP-8842", amount: 3200.00, token: "XLM", status: "Escrowed", txHash: "0x9c1a9e55b7d4f2c8a1e9b7d4f2c8a1e9b7d4f2c8" },
        { id: "3", date: "2026-02-24", shipmentId: "SHP-8711", amount: 7850.75, token: "USDC", status: "Released", txHash: "0x2e8f3a6c9d1b5e7f3a6c9d1b5e7f3a6c9d1b5e7f" },
        { id: "4", date: "2026-02-23", shipmentId: "SHP-8590", amount: 1250.00, token: "USDC", status: "Pending", txHash: "0x7b4d2f9a8c3e6d1b4f9a8c3e6d1b4f9a8c3e6d1b" },
        { id: "5", date: "2026-02-22", shipmentId: "SHP-8421", amount: 4100.25, token: "XLM", status: "Released", txHash: "0x5c9e1a7f3b8d2c6e1a7f3b8d2c6e1a7f3b8d2c6e" },
        { id: "6", date: "2026-02-21", shipmentId: "SHP-8305", amount: 2980.00, token: "USDC", status: "Failed", txHash: "0x8d3f6b2a9c5e1d7f6b2a9c5e1d7f6b2a9c5e1d7f" },
        { id: "7", date: "2026-02-20", shipmentId: "SHP-8192", amount: 6750.50, token: "USDC", status: "Released", txHash: "0x1f7c4e9b3a6d8f2c4e9b3a6d8f2c4e9b3a6d8f2c" },
        { id: "8", date: "2026-02-19", shipmentId: "SHP-8043", amount: 3450.00, token: "XLM", status: "Escrowed", txHash: "0x6a2d8f1c5b9e3a7d8f1c5b9e3a7d8f1c5b9e3a7d" },
        { id: "9", date: "2026-02-18", shipmentId: "SHP-7921", amount: 5200.75, token: "USDC", status: "Released", txHash: "0x9e5b3f7a2d6c1e8b3f7a2d6c1e8b3f7a2d6c1e8b" },
        { id: "10", date: "2026-02-17", shipmentId: "SHP-7805", amount: 2100.00, token: "USDC", status: "Pending", txHash: "0x3c8a6f2d9b1e5c7a6f2d9b1e5c7a6f2d9b1e5c7a" },
        { id: "11", date: "2026-02-16", shipmentId: "SHP-7692", amount: 8900.50, token: "XLM", status: "Released", txHash: "0x7d1f9c4a8e2b6d3f9c4a8e2b6d3f9c4a8e2b6d3f" },
        { id: "12", date: "2026-02-15", shipmentId: "SHP-7543", amount: 4320.25, token: "USDC", status: "Escrowed", txHash: "0x2b6e9a3f7c1d5e8a3f7c1d5e8a3f7c1d5e8a3f7c" },
        { id: "13", date: "2026-02-14", shipmentId: "SHP-7421", amount: 1850.00, token: "USDC", status: "Released", txHash: "0x5f3c8d1a9b7e2f4c8d1a9b7e2f4c8d1a9b7e2f4c" },
        { id: "14", date: "2026-02-13", shipmentId: "SHP-7305", amount: 6100.75, token: "XLM", status: "Failed", txHash: "0x8a4f2c9d6b3e1a7f2c9d6b3e1a7f2c9d6b3e1a7f" },
        { id: "15", date: "2026-02-12", shipmentId: "SHP-7192", amount: 3700.00, token: "USDC", status: "Released", txHash: "0x1d7b5f9c3a8e6d2b5f9c3a8e6d2b5f9c3a8e6d2b" },
        { id: "16", date: "2026-02-11", shipmentId: "SHP-7081", amount: 5550.50, token: "USDC", status: "Pending", txHash: "0x4e9a2f6c8d1b7e3a2f6c8d1b7e3a2f6c8d1b7e3a" },
    ];

    // Filter payments
    const filteredPayments = filterStatus === "All"
        ? allPayments
        : allPayments.filter(p => p.status === filterStatus);

    // Sort payments
    const sortedPayments = [...filteredPayments].sort((a, b) => {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        return sortOrder === "desc" ? dateB - dateA : dateA - dateB;
    });

    // Paginate
    const totalPages = Math.ceil(sortedPayments.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedPayments = sortedPayments.slice(startIndex, startIndex + itemsPerPage);

    const toggleSort = () => {
        setSortOrder(prev => prev === "desc" ? "asc" : "desc");
    };

    const truncateHash = (hash: string) => {
        return `${hash.slice(0, 6)}...${hash.slice(-4)}`;
    };

    const getStellarExplorerUrl = (hash: string) => {
        return `https://stellar.expert/explorer/public/tx/${hash}`;
    };

    if (isLoading) {
        return (
            <div className="payment-history">
                <div className="payment-header">
                    <h1>Payment History</h1>
                    <p>Track all payment transactions on the blockchain</p>
                </div>
                <div className="payment-skeleton">
                    {[...Array(10)].map((_, i) => (
                        <div key={i} className="skeleton-row">
                            <div className="skeleton-cell"></div>
                            <div className="skeleton-cell"></div>
                            <div className="skeleton-cell"></div>
                            <div className="skeleton-cell"></div>
                            <div className="skeleton-cell"></div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    if (sortedPayments.length === 0) {
        return (
            <div className="payment-history">
                <div className="payment-header">
                    <h1>Payment History</h1>
                    <p>Track all payment transactions on the blockchain</p>
                </div>
                <div className="empty-state">
                    <div className="empty-icon">💳</div>
                    <h2>No Payments Found</h2>
                    <p>There are no payment transactions matching your criteria.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="payment-history">
            <div className="payment-header">
                <div>
                    <h1>Payment History</h1>
                    <p>Track all payment transactions on the blockchain</p>
                </div>
                <div className="payment-filters">
                    <div className="filter-dropdown">
                        <select
                            value={filterStatus}
                            onChange={(e) => {
                                setFilterStatus(e.target.value as PaymentStatus | "All");
                                setCurrentPage(1);
                            }}
                        >
                            <option value="All">All Status</option>
                            <option value="Pending">Pending</option>
                            <option value="Escrowed">Escrowed</option>
                            <option value="Released">Released</option>
                            <option value="Failed">Failed</option>
                        </select>
                        <ChevronDown size={16} />
                    </div>
                </div>
            </div>

            <div className="payment-table-container">
                <table className="payment-table">
                    <thead>
                        <tr>
                            <th onClick={toggleSort} className="sortable">
                                Date
                                <ArrowUpDown size={14} />
                            </th>
                            <th>Shipment ID</th>
                            <th>Amount</th>
                            <th>Status</th>
                            <th>Transaction Hash</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedPayments.map((payment) => (
                            <tr key={payment.id}>
                                <td className="date-cell">{payment.date}</td>
                                <td>
                                    <Link to={`/dashboard/shipments/${payment.shipmentId}`} className="shipment-link">
                                        {payment.shipmentId}
                                    </Link>
                                </td>
                                <td className="amount-cell">
                                    <span className="amount">${payment.amount.toLocaleString()}</span>
                                    <span className="token">{payment.token}</span>
                                </td>
                                <td>
                                    <span className={`status-badge status-${payment.status.toLowerCase()}`}>
                                        {payment.status}
                                    </span>
                                </td>
                                <td className="hash-cell">
                                    <a
                                        href={getStellarExplorerUrl(payment.txHash)}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="hash-link"
                                    >
                                        {truncateHash(payment.txHash)}
                                        <ExternalLink size={12} />
                                    </a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="pagination">
                <div className="pagination-info">
                    Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, sortedPayments.length)} of {sortedPayments.length}
                </div>
                <div className="pagination-controls">
                    <button
                        onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                        disabled={currentPage === 1}
                        className="pagination-btn"
                    >
                        <ChevronLeft size={16} />
                    </button>
                    {[...Array(totalPages)].map((_, i) => (
                        <button
                            key={i + 1}
                            onClick={() => setCurrentPage(i + 1)}
                            className={`pagination-btn ${currentPage === i + 1 ? "active" : ""}`}
                        >
                            {i + 1}
                        </button>
                    ))}
                    <button
                        onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                        disabled={currentPage === totalPages}
                        className="pagination-btn"
                    >
                        <ChevronRight size={16} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PaymentHistory;
