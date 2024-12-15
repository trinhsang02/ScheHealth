// pages/profile.tsx
'use client'

import React from 'react';
import Head from 'next/head';

const Profile: React.FC = () => {
    return (
        <>
            <Head>
                <title>Thông Tin Cá Nhân</title>
                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            </Head>
            <div className="container">
                <div className="sidebar">
                    <div className="profile-header">
                        <div className="avatar-container">
                            <img src="https://via.placeholder.com/120" alt="Avatar" className="avatar" />
                            <button className="avatar-upload">
                                <i className="fas fa-camera"></i>
                            </button>
                        </div>
                        <h1 className="profile-name">Nguyễn Văn A</h1>
                    </div>
                    <div className="nav-menu">
                        <div className="nav-item active">Thông tin cá nhân</div>
                        <div className="nav-item">Bảo mật</div>
                        <div className="nav-item">Thông báo</div>
                        <div className="nav-item">Cài đặt</div>
                    </div>
                </div>
                
                <div className="main-content">
                    <h2 className="section-title">Thông tin cá nhân</h2>
                    <div className="info-card">
                        <form>
                            <div className="form-row">
                                <div className="form-group">
                                    <label className="form-label">Họ và tên</label>
                                    <input type="text" className="form-input" defaultValue="Nguyễn Văn A" />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Email</label>
                                    <input type="email" className="form-input" defaultValue="nguyenvana@email.com" />
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label className="form-label">Số điện thoại</label>
                                    <input type="tel" className="form-input" defaultValue="0123456789" />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Ngày sinh</label>
                                    <input type="date" className="form-input" defaultValue="1990-01-01" />
                                </div>
                            </div>

                            <div className="form-group">
                                <label className="form-label">Địa chỉ</label>
                                <input type="text" className="form-input" defaultValue="123 Đường ABC, Quận XYZ, TP.HCM" />
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label className="form-label">Nghề nghiệp</label>
                                    <input type="text" className="form-input" defaultValue="Kỹ sư phần mềm" />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Công ty</label>
                                    <input type="text" className="form-input" defaultValue="Công ty ABC" />
                                </div>
                            </div>

                            <div className="btn-container">
                                <button type="button" className="btn btn-cancel">Hủy</button>
                                <button type="submit" className="btn">Lưu thay đổi</button>
                            </div>
                        </form>
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

                .avatar-upload {
                    position: absolute;
                    bottom: 5px;
                    right: 5px;
                    background: #4a90e2;
                    border-radius: 50%;
                    width: 30px;
                    height: 30px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    border: none;
                    color: white;
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

                .info-card {
                    background: white;
                    border-radius: 8px;
                    padding: 1.5rem;
                    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
                }

                .form-group {
                    margin-bottom: 1rem;
                }

                .form-label {
                    display: block;
                    font-weight: 600;
                    margin-bottom: 0.4rem;
                    color: #555;
                    font-size: 0.9rem;
                }

                .form-input {
                    width: 100%;
                    padding: 0.6rem;
                    border: 1px solid #ddd;
                    border-radius: 5px;
                    font-size: 0.9rem;
                    transition: border-color 0.3s;
                }

                .form-input:focus {
                    outline: none;
                    border-color: #4a90e2;
                }

                .form-row {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 1rem;
                    margin-bottom: 0.5rem;
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

                .btn-container {
                    display: flex;
                    justify-content: flex-end;
                    gap: 1rem;
                    margin-top: 1.5rem;
                }

                .btn-cancel {
                    background: #6c757d;
                }

                .btn-cancel:hover {
                    background: #5a6268;
                }
            `}</style>
        </>
    );
};

export default Profile;
