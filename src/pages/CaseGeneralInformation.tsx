import CaseGeneralInformationUploadForm from '../components/cases/CaseGeneralInformationUploadForm';
import useUploadCaseGeneralInformation from '../hooks/useUploadCaseGeneralInformation';

const CaseGeneralInformation = () => {
    const upload = useUploadCaseGeneralInformation();

    return (
        <div>
            <h1 className="title">Información general</h1>
            <CaseGeneralInformationUploadForm {...upload} />
        </div>
    );
};

export default CaseGeneralInformation;
