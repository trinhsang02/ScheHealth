// pages/doctors.tsx
'use client'

import React from 'react';
import Head from 'next/head';

const Doctors: React.FC = () => {
    return (
        <>
            <Head>
                <title>Thông Tin Bác Sĩ</title>
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
                    <div className="nav-menu">
                        <div className="nav-item">Thông tin cá nhân</div>
                        <div className="nav-item">Lịch sử khám bệnh</div>
                        <div className="nav-item">Đặt lịch khám</div>
                        <div className="nav-item active">Danh sách bác sĩ</div>
                        <div className="nav-item">Kết quả xét nghiệm</div>
                    </div>
                </div>
                
                <div className="main-content">
                    <div className="search-bar">
                        <input type="text" className="search-input" placeholder="Tìm kiếm bác sĩ theo tên, chuyên khoa..." />
                        <button className="btn" style={{ width: 'auto' }}>Tìm kiếm</button>
                    </div>

                    <div className="specialty-filter">
                        <div className="specialty-tag active">Tất cả</div>
                        <div className="specialty-tag">Tim mạch</div>
                        <div className="specialty-tag">Nội tổng quát</div>
                        <div className="specialty-tag">Da liễu</div>
                        <div className="specialty-tag">Nhi khoa</div>
                        <div className="specialty-tag">Thần kinh</div>
                    </div>

                    <div className="doctor-grid">
                        {/* Bác sĩ 1 */}
                        <div className="doctor-card">
                            <img src="https://via.placeholder.com/300x200" alt="Bác sĩ" className="doctor-image" />
                            <div className="doctor-info">
                                <h3 className="doctor-name">PGS.TS Nguyễn Văn B</h3>
                                <div className="doctor-specialty">Tim mạch</div>
                                <div className="rating">★★★★★</div>
                                <div className="experience">Kinh nghiệm: 15 năm</div>
                                <div className="doctor-details">
                                    Chuyên gia về tim mạch, công tác tại Bệnh viện Bạch Mai
                                </div>
                                <button className="btn">Đặt lịch khám</button>
                            </div>
                        </div>

                        {/* Bác sĩ 2 */}
                        <div className="doctor-card">
                            <img src="https://via.placeholder.com/300x200" alt="Bác sĩ" className="doctor-image" />
                            <div className="doctor-info">
                                <h3 className="doctor-name">TS. Trần Thị C</h3>
                                <div className="doctor-specialty">Nội tổng quát</div>
                                <div className="rating">★★★★☆</div>
                                <div className="experience">Kinh nghiệm: 12 năm</div>
                                <div className="doctor-details">
                                    Chuyên gia nội khoa, công tác tại Bệnh viện Việt Đức
                                </div>
                                <button className="btn">Đặt lịch khám</button>
                            </div>
                        </div>

                        {/* Bác sĩ 3 */}
                        <div className="doctor-card">
                            <img src="https://via.placeholder.com/300x200" alt="Bác sĩ" className="doctor-image" />
                            <div className="doctor-info">
                                <h3 className="doctor-name">BS.CKI Lê Văn D</h3>
                                <div className="doctor-specialty">Da liễu</div>
                                <div className="rating">★★★★★</div>
                                <div className="experience">Kinh nghiệm: 10 năm</div>
                                <div className="doctor-details">
                                    Chuyên gia da liễu, công tác tại Bệnh viện Da liễu TW
                                </div>
                                <button className="btn">Đặt lịch khám</button>
                            </div>
                        </div>

                        {/* Bác sĩ 4 */}
                        <div className="doctor-card">
                            <img src="https://via.placeholder.com/300x200" alt="Bác sĩ" className="doctor-image" />
                            <div className="doctor-info">
                                <h3 className="doctor-name">PGS.TS Phạm Thị E</h3>
                                <div className="doctor-specialty">Nhi khoa</div>
                                <div className="rating">★★★★★</div>
                                <div className="experience">Kinh nghiệm: 20 năm</div>
                                <div className="doctor-details">
                                    Chuyên gia nhi khoa, công tác tại Bệnh viện Nhi TW
                                </div>
                                <button className="btn">Đặt lịch khám</button>
                            </div>
                        </div>
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
                    margin-left: 300px;
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

                .doctor-grid {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 1.5rem;
                }

                .doctor-card {
                    background: white;
                    border-radius: 10px;
                    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
                    overflow: hidden;
                    transition: transform 0.3s;
                }

                .doctor-card:hover {
                    transform: translateY(-5px);
                }

                .doctor-image {
                    width: 100%;
                    height: 200px;
                    object-fit: cover;
                }

                .doctor-info {
                    padding: 1.5rem;
                }

                .doctor-name {
                    font-size: 1.2rem;
                    font-weight: bold;
                    margin-bottom: 0.5rem;
                    color: #2c3e50;
                }

                .doctor-specialty {
                    color: #4a90e2;
                    font-weight: 500;
                    margin-bottom: 0.5rem;
                }

                .doctor-details {
                    font-size: 0.9rem;
                    color: #666;
                    margin-bottom: 1rem;
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
                    width: 100%;
                    text-align: center;
                }

                .btn:hover {
                    background: #357abd;
                }

                .specialty-filter {
                    display: flex;
                    gap: 1rem;
                    margin-bottom: 1.5rem;
                    flex-wrap: wrap;
                }

                .specialty-tag {
                    padding: 0.5rem 1rem;
                    background: #f0f2f5;
                    border-radius: 20px;
                    cursor: pointer;
                    transition: all 0.3s;
                }

                .specialty-tag:hover,
                .specialty-tag.active {
                    background: #4a90e2;
                    color: white;
                }

                .rating {
                    color: #ffc107;
                    margin-bottom: 0.5rem;
                }

                .experience {
                    font-size: 0.9rem;
                    color: #666;
                    margin-bottom: 0.5rem;
                }
            `}</style>
        </>
    );
};

export default Doctors;
