import { ZoomIn } from '@mui/icons-material';
import { IconButton} from '@mui/material';
import { Link } from 'react-router-dom';
import { Book } from '../../Types/Models';

interface IProps {
    book: Book;
}

export default function ShowBookLink(props: IProps) {
    return (
        <Link to={`/books/${props.book._id}`}>
            <IconButton>
                <ZoomIn />
            </IconButton>
        </Link>
    );
}