// pages/medical-history.tsx
'use client'

import React from 'react';
import Head from 'next/head';

const MedicalHistory: React.FC = () => {
    return (
        <>           
            <Head>
                <title>Lịch Sử Khám Chữa Bệnh</title>
                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            </Head>
            <div className="container">
                <div className="sidebar">
                    <div className="profile-header">
                        <div className="avatar-container">
                            <img src="https://via.placeholder.com/120" alt="Avatar" className="avatar" />
                        </div>
                        <h1 className="profile-name">Nguyễn Văn A</h1>
                    </div>
                </div>

                <div className="main-content">
                    <h2 className="section-title">Lịch Sử Khám Chữa Bệnh</h2>
                    <div className="medical-history">
                        <table className="history-table">
                            <thead>
                                <tr>
                                    <th>Ngày khám</th>
                                    <th>Chuyên khoa</th>
                                    <th>Bác sĩ</th>
                                    <th>Chẩn đoán</th>
                                    <th>Trạng thái</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>20/11/2024</td>
                                    <td>Nội tổng quát</td>
                                    <td>BS. Nguyễn Văn B</td>
                                    <td>Viêm họng cấp</td>
                                    <td><span className="status-badge status-completed">Hoàn thành</span></td>
                                </tr>
                                <tr>
                                    <td>15/11/2024</td>
                                    <td>Tim mạch</td>
                                    <td>BS. Trần Thị C</td>
                                    <td>Khám định kỳ</td>
                                    <td><span className="status-badge status-completed">Hoàn thành</span></td>
                                </tr>
                                <tr>
                                    <td>05/11/2024</td>
                                    <td>Da liễu</td>
                                    <td>BS. Lê Thị D</td>
                                    <td>Dị ứng da</td>
                                    <td><span className="status-badge status-completed">Hoàn thành</span></td>
                                </tr>
                                <tr>
                                    <td>28/10/2024</td>
                                    <td>Răng hàm mặt</td>
                                    <td>BS. Phạm Văn E</td>
                                    <td>Nhổ răng khôn</td>
                                    <td><span className="status-badge status-completed">Hoàn thành</span></td>
                                </tr>
                                <tr>
                                    <td>27/11/2024</td>
                                    <td>Nội tổng quát</td>
                                    <td>BS. Nguyễn Văn B</td>
                                    <td>Khám tổng quát</td>
                                    <td><span className="status-badge status-pending">Chờ khám</span></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <style jsx>{`
 
                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                }

                body {
                    margin: 0;
                    padding: 0;
                    background-color: #f0f2f5;
                    min-height: 100vh;
                    width: 100vw;
                }

                .container {
                    width: 100%;
                    min-height: 100vh;
                    margin: 0;
                    display: flex;
                    background: white;
                }

                .sidebar {
                    width: 300px;
                    background: #f8f9fa;
                    padding: 2rem;
                    border-right: 1px solid #eee;
                    height: 100vh;
                    position: fixed;
                }

                .main-content {
                    flex: 1;
                    padding: 2rem;
                    margin-left: 300px; /* Bằng với width của sidebar */
                    min-height: 100vh;
                    width: calc(100% - 300px);
                }


                .profile-header {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    margin-bottom: 2rem;
                    text-align: center;
                }

                .avatar-container {
                    position: relative;
                    margin-bottom: 1rem;
                }

                .avatar {
                    width: 120px;
                    height: 120px;
                    border-radius: 50%;
                    object-fit: cover;
                    border: 3px solid #fff;
                    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
                }

                .profile-name {
                    font-size: 1.3rem;
                    font-weight: bold;
                    margin: 1rem 0;
                }

                .nav-menu {
                    margin-top: 2rem;
                }

                .nav-item {
                    padding: 0.8rem 1rem;
                    margin-bottom: 0.5rem;
                    border-radius: 5px;
                    cursor: pointer;
                    transition: background 0.3s;
                }

                .nav-item:hover {
                    background: #e9ecef;
                }

                .nav-item.active {
                    background: #e3f2fd;
                    color: #1976d2;
                }

                .section-title {
                    font-size: 1.5rem;
                    margin-bottom: 1.5rem;
                    color: #2c3e50;
                }

                .medical-history {
                    background: white;
                    border-radius: 8px;
                    overflow: hidden;
                }

                .history-table {
                    width: 100%;
                    border-collapse: collapse;
                }

                .history-table th,
                .history-table td {
                    padding: 1rem;
                    text-align: left;
                    border-bottom: 1px solid #eee;
                }

                .history-table th {
                    background: #f8f9fa;
                    font-weight: 600;
                    color: #555;
                }

                .history-table tr:hover {
                    background: #f5f8ff;
                }

                .status-badge {
                    padding: 0.3rem 0.8rem;
                    border-radius: 20px;
                    font-size: 0.85rem;
                    font-weight: 500;
                }

                .status-completed {
                    background: #e8f5e9;
                    color: #2e7d32;
                }

                .status-pending {
                    background: #fff3e0;
                    color: #ef6c00;
                }

                .btn {
                    background: #4a90e2;
                    color: white;
                    border: none;
                    padding: 0.6rem 1.2rem;
                    border-radius: 5px;
                    font-size: 0.9rem;
                    cursor: pointer;
                    transition: background 0.3s;
                }

                .btn:hover {
                    background: #357abd;
                }

                .search-bar {
                    margin-bottom: 1.5rem;
                    display: flex;
                    gap: 1rem;
                }

                .search-input {
                    flex: 1;
                    padding: 0.6rem;
                    border: 1px solid #ddd;
                    border-radius: 5px;
                    font-size: 0.9rem;
                }

                .search-input:focus {
                    outline: none;
                    border-color: #4a90e2;
                }
            `}</style>
        </>
    );
};

export default MedicalHistory;
