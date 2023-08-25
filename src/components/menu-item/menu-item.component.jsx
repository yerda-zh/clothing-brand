import { useNavigate } from 'react-router-dom';

import {BackgroundImage, MenuItemContainer, Body} from './menu-item.styles';

const MenuItem=({category}) =>{
    const {title, imageurl, route} = category;
    const navigate = useNavigate();
    const onNavigateHandler = () => navigate(route);
    return (
        <MenuItemContainer onClick={onNavigateHandler}>
          <BackgroundImage imageUrl={imageurl}/>
          <Body>
            <h2>{title}</h2>
            <p>Shop Now</p>
          </Body>
        </MenuItemContainer>
    )
}
 export default MenuItem;