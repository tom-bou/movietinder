import React from "react";
import { Modal, Button } from "flowbite-react";

export default function VideoModal({ isModalOpen, closeModal, video_url }) {
  return (
    <Modal show={isModalOpen} onClose={closeModal} className="relative z-50">
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 "></div>
      <div className="fixed inset-0 flex items-center justify-center">
        <div
          className="bg-white rounded-lg shadow dark:bg-gray-700 w-1/2 overflow-auto"
          style={{
            background:
              "linear-gradient(to bottom, #150629 40%, #1C0A34, #5A2960)",
          }}
        >
          <Modal.Header
            className="shadow-white-glow text-3xl font-bold font-sans"
            style={{ color: "#F4FDCF", textShadow: "0px 0px 6px #FFE370" }}
          ></Modal.Header>
          <Modal.Body>
            <iframe
              className="w-full"
              style={{ height: "70vh" }}
              src={video_url}
              title="Video"
            ></iframe>
          </Modal.Body>
          <Modal.Footer>
            <Button color="gray" onClick={closeModal}>
              Close
            </Button>
          </Modal.Footer>
        </div>
      </div>
    </Modal>
  );
}

