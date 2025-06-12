import './directoryItemStyles.js';
import { BackgroundImage, Body, DirectoryItemContainer } from './directoryItemStyles.js';
import { useNavigate } from 'react-router-dom';

const DirectoryItem = ({category}) => {
    const {title, subtitle, imageUrl, route} = category;
    const navigate = useNavigate();

    const onNavigateHandler = () => {
        navigate(route);
    }
    return (
        <DirectoryItemContainer onClick={onNavigateHandler}>
            <BackgroundImage imageurl={imageUrl} />
            <Body>
                <h2>
                    {title}
                </h2>
                <p>
                    {subtitle}
                </p>
            </Body>
        </DirectoryItemContainer>
    )
}

export default DirectoryItem
