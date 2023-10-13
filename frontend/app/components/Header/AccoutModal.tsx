"use client";
import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import axios from "@/lib/axios";
import useGetMe from "@/app/hooks/UserMe";

type AccoutModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const AccoutModal: React.FC<AccoutModalProps> = ({ isOpen, onClose }) => {
  const { userData } = useGetMe();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [username, setUsername] = useState<string>("");
  const imagePreviewUrl = selectedFile
    ? URL.createObjectURL(selectedFile)
    : null;

  useEffect(() => {
    setUsername(userData?.username || "");
  }, [userData]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setSelectedFile(file);
  };

  const handleRemoveSelectedFile = () => {
    setSelectedFile(null);
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const username = e.target.value;
    setUsername(username);
  };

  const handleUsernameUpdate = async () => {
    if (!username) return;

    try {
      await axios.put(`/users/${userData.id}`, {
        user: {
          username: username,
        },
      });
      alert("ユーザー名を変更しました");
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleImageUpload = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("user[image]", selectedFile);

    try {
      await axios.post(`/users/${userData.id}/upload_image`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("アップロードが完了しました");
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const handleSave = () => {
    handleUsernameUpdate();
    handleImageUpload();
    onClose();
  };
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      backdrop="blur"
      size="sm"
      placement="center"
      scrollBehavior="inside"
    >
      <ModalContent>
        <>
          <ModalHeader className="flex flex-col gap-1">
            アカウント設定
          </ModalHeader>
          <ModalBody>
            <div className="icon-change-form mb-6">
              <label
                htmlFor="iconUpload"
                className="block text-gray-400 text-sm font-semibold mb-2"
              >
                アイコンを変更:
              </label>
              <div className="mt-1 flex items-center p-2 border border-gray-600 rounded-lg bg-gray-900 hover:border-gray-500">
                <input
                  type="file"
                  id="iconUpload"
                  name="iconUpload"
                  onChange={handleFileChange}
                  accept="image/*"
                  className="w-full text-gray-400 focus:outline-none"
                />
              </div>
              {imagePreviewUrl && (
                <div className="mt-3 flex">
                  <img
                    src={imagePreviewUrl}
                    alt="Preview"
                    className="w-16 h-16 rounded-full"
                  />
                  {selectedFile && (
                    <Button
                      color="danger"
                      variant="light"
                      onPress={handleRemoveSelectedFile}
                    >
                      選択を取り消す
                    </Button>
                  )}
                </div>
              )}
            </div>

            <div className="name-change-form">
              <label
                htmlFor="userName"
                className="block text-gray-400 text-sm font-semibold mb-2"
              >
                名前を変更:
              </label>
              <div className="mt-1 relative rounded-lg shadow-sm">
                <input
                  type="text"
                  id="userName"
                  name="userName"
                  placeholder="変更名"
                  value={username}
                  onChange={handleUsernameChange}
                  className="form-input block w-full px-4 py-2 text-gray-400 bg-gray-900 border border-gray-600 rounded-lg focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo"
                />
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="light" onPress={onClose}>
              閉じる
            </Button>
            <Button color="primary" onPress={handleSave}>
              保存
            </Button>
          </ModalFooter>
        </>
      </ModalContent>
    </Modal>
  );
};

export default AccoutModal;
