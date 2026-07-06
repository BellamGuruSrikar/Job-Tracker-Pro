import "../styles/deletemodal.css";

function DeleteModal({
    isOpen,
    company,
    role,
    onClose,
    onDelete,
}) {

    if (!isOpen) return null;

    return (

        <div className="modal-overlay">

            <div className="delete-modal">

                <h2>🗑 Delete Application</h2>

                <p>
                    Are you sure you want to delete this
                    application?
                </p>

                <div className="delete-info">

                    <p>
                        <strong>Company:</strong> {company}
                    </p>

                    <p>
                        <strong>Role:</strong> {role}
                    </p>

                </div>

                <small>
                    This action cannot be undone.
                </small>

                <div className="modal-buttons">

                    <button
                        className="cancel-btn"
                        onClick={onClose}
                    >
                        Cancel
                    </button>

                    <button
                        className="confirm-delete-btn"
                        onClick={onDelete}
                    >
                        Delete
                    </button>

                </div>

            </div>

        </div>

    );

}

export default DeleteModal;