
import { RouteComponentProps } from '@reach/router';

declare global {
  interface Window { dbg: any; }
}
interface HomeProps extends RouteComponentProps {
    lang?: string;
}
const EditMainTT: React.FunctionComponent<HomeProps> = () => {
	return (<div>hewo</div>)
}

export default EditMainTT