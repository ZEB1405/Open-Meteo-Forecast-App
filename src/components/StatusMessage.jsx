function StatusMessage({ message, role = "status" }) {
    return <p role={role}>{message}</p>;
}

export default StatusMessage;
