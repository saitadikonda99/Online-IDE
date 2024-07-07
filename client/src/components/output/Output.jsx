const INSTANCE_URI = "http://localhost:9000/";

const Output = () => {

    return (
        <div style={{ width: "100%", height: "100vh" }}>
            <iframe
                src={INSTANCE_URI}
                title="output"
                style={{ width: "100%", height: "100%", border: "none" }}
            ></iframe>
        </div>
    );
};

export default Output;
