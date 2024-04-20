import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import Link from "next/link";
import { FaCirclePlus } from "react-icons/fa6";
import { MdOutlineDelete } from "react-icons/md";

export default function Header({ title, api }: { title: string, api: string }) {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  async function handleDelete() {
    try {
      const res = await fetch(`/api/${api}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.ok) {
        toast({
          title: "Task deleted.",
          description: "We've deleted your task for you.",
          status: "error",
          duration: 1000,
          isClosable: true,
          position: "top-right",
          variant: "top-accent",
        });

        setTimeout(() => {
          window.location.reload();
        }, 1000);
        
      } else {
        toast({
          title: "Failed to delete task.",
          description: "We've failed to delete your task for you.",
          status: "error",
          duration: 1000,
          isClosable: true,
          position: "top-right",
          variant: "top-accent",
        });
        throw new Error("Failed to delete task");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-white font-bold text-xl">{title}</h1>
          <hr className="w-10 " />
        </div>
        <div className="flex items-center gap-3">
          <Link href={"/formadd"}>
            <FaCirclePlus size={30} className="text-white cursor-pointer" />
          </Link>
          <MdOutlineDelete
            size={30}
            className="text-white cursor-pointer"
            onClick={onOpen}
          />
        </div>
      </div>
      
      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>DELETE TASK</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <h1>Are you sure you want to delete all tasks?</h1>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleDelete}>
              Yes
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
