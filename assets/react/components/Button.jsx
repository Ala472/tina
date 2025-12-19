export default function Button({ label, onClick }) {
    return (
        <button
            style={{
                padding: "10px 20px",
                margin: "10px",
                fontSize: "16px",
                cursor: "pointer"
            }}
            onClick={onClick}
        >
            {label}
        </button>
    );
}