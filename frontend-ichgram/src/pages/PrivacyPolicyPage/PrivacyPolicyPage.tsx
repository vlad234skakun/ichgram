
import LegalPage from "../../modules/LegalPage/LegalPage";
import { privacyData } from "../../data/privacyData";

const PrivacyPolicyPage = ()=>{
    return (
        <main>
            <LegalPage data={privacyData}/>
        </main>
    )
};

export default PrivacyPolicyPage;