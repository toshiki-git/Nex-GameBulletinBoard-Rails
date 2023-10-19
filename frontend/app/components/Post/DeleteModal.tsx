import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import React from "react";
import axios from "@/lib/axios";

interface EditModalProps {
  postId: number;
}

const EditModal: React.FC<EditModalProps> = ({ postId }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const handleDelete = () => {
    axios.delete(`/posts/${postId}`);
    onOpenChange();
  };
  return (
    <>
      <Button
        color="danger"
        onPress={onOpen}
        radius="full"
        className="transition-transform duration-100 ease-in-out transform hover:scale-105"
      >
        Delete
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                投稿の削除
              </ModalHeader>
              <ModalBody>
                <p>削除した投稿を復元することはできません。</p>
                <p>本当に投稿を削除してもよろしいですか？</p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={handleDelete}>
                  Action
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditModal;
