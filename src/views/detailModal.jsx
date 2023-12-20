import React from "react";
import { Modal, Button } from "flowbite-react";
import DetailsView from "./detailsView.jsx";

export default function DetailModal({ isModalOpen, closeModal, movie }) {
  return (
    <Modal show={isModalOpen} onClose={closeModal} className="rounded-lg relative z-50">
      <div className="rounded-lg fixed inset-0 bg-gray-600 bg-opacity-50"></div>
      <div className="fixed inset-0 flex items-center rounded-lg justify-center">
        <div
          className="rounded-lg bg-white relative shadow dark:bg-gray-700 w-3/4 h-3/4"
          style={{
            background:
              "linear-gradient(to bottom, #150629 40%, #1C0A34, #5A2960)",
          }}
        >
          <Modal.Header
            className="shadow-white-glow text-3xl font-bold font-sans p-0 m-0 top-0 right-5 absolute inline z-50" 
            style={{ color: "#F4FDCF", textShadow: "0px 0px 6px #FFE370"}}
          ></Modal.Header>
          <Modal.Body className="h-full relative p-0">
            <DetailsView movieData={movie} />
          </Modal.Body>
          <Modal.Footer className="p-0 ps-6 inline absolute bottom-5 left-0">
            <Button color="gray" onClick={closeModal}>
              Close
            </Button>
          </Modal.Footer>
        </div>
      </div>
    </Modal>
  );
}