import { FaBriefcase } from "react-icons/fa";
import "../styles/emptystate.css";

function EmptyState() {
    return (
        <div className="empty-state">
            <FaBriefcase className="empty-icon" />

            <h2>No Applications Yet</h2>

            <p>
                Start tracking your job applications by clicking
                <strong> Add Job</strong>.
            </p>
        </div>
    );
}

export default EmptyState;