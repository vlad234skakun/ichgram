
import formData from "form-data"
import Mailgun from "mailgun.js"

const { MAILGUN_API_KEY, MAILGUN_DOMAIN } = process.env

const mailgun = new Mailgun(formData)
const mg = mailgun.client({username: 'api', key: MAILGUN_API_KEY as string });

interface IEmailData { 
	to: string[];
	subject: string;
	text?: string;
	html: string
}


const sendEmailWithMailgun = (data: IEmailData) => {
	const email = {...data, from: `Excited User <mailgun@${MAILGUN_DOMAIN}>` }
	return mg.messages.create(MAILGUN_DOMAIN as string, email)
};
export default sendEmailWithMailgun