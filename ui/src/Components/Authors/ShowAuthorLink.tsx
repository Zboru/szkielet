import { ZoomIn } from '@mui/icons-material';
import { IconButton} from '@mui/material';
import { Link } from 'react-router-dom';
import { Author } from '../../Types/Models';

interface IProps {
    author: Author;
}

export default function ShowAuthorLink(props: IProps) {
    return (
        <Link to={`/authors/${props.author._id}`}>
            <IconButton>
                <ZoomIn />
            </IconButton>
        </Link>
    );
}