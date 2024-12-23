'use client'

import React, { useState } from "react";

const SettingsPage = () => {
  const [currentTab, setCurrentTab] = useState("profile"); 
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  // handle get file
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file)); // show image
    }
  };


  const ProfileTab = () => (
    <div className="bg-gray-100 p-6 rounded-lg">
      <h2 className="mb-4 text-lg font-medium">Thông tin chi tiết</h2>
      <div className="mb-4 border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
        {preview ? (
          <img
            src={preview}
            alt="Preview"
            className="mb-4 mx-auto h-32 w-32 object-cover rounded-full"
          />
        ) : (
          <p className="text-gray-500">Chưa có hình ảnh</p>
        )}
        <label className="px-4 py-2 text-sm text-blue-600 border border-blue-600 rounded-lg cursor-pointer ">
          Thêm File
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
        </label>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Họ</label>
          <input
            type="text"
            className="w-full mt-1 border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Tên</label>
          <input
            type="text"
            className="w-full mt-1 border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            className="w-full mt-1 border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Số điện thoại
          </label>
          <input
            type="text"
            className="w-full mt-1 border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
      </div>
    </div>
  );


  const SecurityTab = () => (
    <div className="bg-gray-100 p-6 rounded-lg">
      <h2 className="mb-4 text-lg font-medium">Cài đặt bảo mật</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Mật khẩu hiện tại
        </label>
        <input
          type="password"
          className="w-full mt-1 border-gray-300 rounded-md shadow-sm p-2"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Mật khẩu mới
        </label>
        <input
          type="password"
          className="w-full mt-1 border-gray-300 rounded-md shadow-sm p-2"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Nhập lại mật khẩu mới
        </label>
        <input
          type="password"
          className="w-full mt-1 border-gray-300 rounded-md shadow-sm p-2"
        />
      </div>
    </div>
  );

  return (
    <div className="w-full h-screen ">
      <div className="w-full p-6 bg-white">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-semibold">Thông tin cá nhân</h1>
        </div>

        {/* Tabs */}
        <div>
          <div className="flex border-b mb-6">
            <button
              className={`px-4 py-2 ${
                currentTab === "profile"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-blue-600 border-b-2 border-transparent"
              } focus:outline-none`}
              onClick={() => setCurrentTab("profile")}
            >
              Thông tin
            </button>
            <button
              className={`px-4 py-2 ${
                currentTab === "security"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-blue-600 border-b-2 border-transparent"
              } focus:outline-none`}
              onClick={() => setCurrentTab("security")}
            >
              Bảo mật
            </button>
          </div>
        </div>

        {/* Nội dung */}
        {currentTab === "profile" && <ProfileTab />}
        {currentTab === "security" && <SecurityTab />}

        <div className="flex justify-end mt-6">
          <button
            className="px-4 py-2 text-gray-600 border border-gray-600 rounded-lg mr-2"
            onClick={() => console.log("Cancelled")}
          >
            Hủy
          </button>
          <button
            className="px-4 py-2 text-white bg-blue-600 rounded-lg"
            onClick={() => console.log("Saved")}
          >
            Lưu
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
