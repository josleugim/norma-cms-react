import DedupUploadForm from '../components/DedupUploadForm';
import useUploadDedup from '../hooks/useUploadDedup';

const UploadDedup = () => {
    const uploadDedup = useUploadDedup();

    return (
        <div>
            <h1 className="title">Subir JSON dedup</h1>
            <DedupUploadForm {...uploadDedup} />
        </div>
    );
};

export default UploadDedup;
