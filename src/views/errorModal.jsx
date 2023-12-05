function ErrorModal({ message, onClose }) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <p>{message}</p>
          <button
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    );
  }
  
  export default ErrorModal;
  