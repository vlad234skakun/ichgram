
import LegalPage from "../../modules/LegalPage/LegalPage";
import { termsData } from "../../data/termsData";

const TermsPage = ()=>{
    return (
        <main>
            <LegalPage data={termsData}/>
        </main>
    )
};

export default TermsPage;