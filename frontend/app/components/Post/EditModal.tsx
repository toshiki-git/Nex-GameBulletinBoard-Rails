import {
  Button,
  Input,
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
  hashtags: string;
  content: string;
}

const EditModal: React.FC<EditModalProps> = ({ postId, hashtags, content }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [newHashtags, setNewHashtags] = React.useState<string>(hashtags);
  const [newContent, setNewContent] = React.useState<string>(content);

  const handleEdit = async () => {
    if (newHashtags === hashtags && newContent === content) {
      alert("変更された内容がありません。");
      return;
    }
    try {
      await axios.patch(`/posts/${postId}`, {
        hashtags: newHashtags,
        content: newContent,
      });
      location.reload();
    } catch (err: any) {
      if (err.response) {
        const serverError =
          err.response.data?.error ||
          `HTTP error! Status: ${err.response.status}`;
        alert(serverError);
      } else {
        alert(err.message);
      }
    } finally {
      onOpenChange();
    }
  };
  return (
    <>
      <Button
        color="success"
        onPress={onOpen}
        radius="full"
        className="transition-transform duration-100 ease-in-out transform hover:scale-105 mr-3"
      >
        Edit
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                投稿の編集
              </ModalHeader>
              <ModalBody>
                <Input
                  autoFocus
                  label="ハッシュタグ"
                  labelPlacement="outside"
                  placeholder="Edit your hashtags"
                  variant="bordered"
                  value={newHashtags}
                  onValueChange={(value) => setNewHashtags(value)}
                />
                <Input
                  label="投稿内容"
                  labelPlacement="outside"
                  placeholder="Edit your content"
                  variant="bordered"
                  value={newContent}
                  onValueChange={(value) => setNewContent(value)}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={handleEdit}>
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
