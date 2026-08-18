import OcrResolutionsUploadForm from '../components/OcrResolutionsUploadForm';
import useUploadOcrResolutions from '../hooks/useUploadOcrResolutions';

const UploadOcrResolutions = () => {
    const uploadOcr = useUploadOcrResolutions();

    return (
        <div>
            <h1 className="title">Subir resoluciones OCR</h1>
            <OcrResolutionsUploadForm {...uploadOcr} />
        </div>
    );
};

export default UploadOcrResolutions;
