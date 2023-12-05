import React, { useState } from "react";
import RegisterView from "../views/registerView";
import ErrorModal from "../views/errorModal"; // Import the ErrorModal
import { observer } from "mobx-react-lite";

const RegisterPresenter = observer(({ firebaseModel }) => {
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const onRegister = async (email, password) => {
        try {
            await firebaseModel.registerUser(email, password);
            // Handle successful registration here
            setError(null);
            setShowModal(false);
        } catch (err) {
            if (err.message === "Firebase: Password should be at least 6 characters (auth/weak-password).") {
                setError("The email address is already in use by another account.");
            } else if (err.message === "Firebase: Error (auth/email-already-in-use).") {
                setError("Password should be at least 6 characters");
            } else {
                setError(err.message);
            }
            setShowModal(true); // Show modal on error
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setError(null); // Clear error on closing modal
    };

    return (
        <>
            <RegisterView onRegister={onRegister} />
            {showModal && <ErrorModal message={error} onClose={handleCloseModal} />}
        </>
    );
});

export default RegisterPresenter;
