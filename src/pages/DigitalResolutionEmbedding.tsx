import useCreateDigitalResolutionEmbedding from "../hooks/useCreateDigitalResolutionEmbedding";
import DigitalResolutionEmbeddingForm from "../components/DigitalResolutionEmbeddingForm";

const DigitalResolutionEmbedding = () => {
    const generateDigitalResolutionEmbedding = useCreateDigitalResolutionEmbedding();

    return (
        <div>
            <h1 className="title">Generar embedding</h1>
            <DigitalResolutionEmbeddingForm {...generateDigitalResolutionEmbedding} />
        </div>
    );
};

export default DigitalResolutionEmbedding;