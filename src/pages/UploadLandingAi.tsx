import LandingAiUploadForm from '../components/LandingAiUploadForm';
import useUploadLandingAi from '../hooks/useUploadLandingAi';

const UploadLandingAi = () => {
    const uploadLandingAi = useUploadLandingAi();

    return (
        <div>
            <h1 className="title">Subir Landing AI</h1>
            <LandingAiUploadForm {...uploadLandingAi} />
        </div>
    );
};

export default UploadLandingAi;
