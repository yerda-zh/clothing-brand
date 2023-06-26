import {BackgroundImage, MenuItemContainer, Body} from './menu-item.styles.jsx';

const MenuItem=({category}) =>{
    const {title, imageUrl} = category;
    return (
        <MenuItemContainer>
          <BackgroundImage imageUrl={imageUrl}/>
          <Body>
            <h2>{title}</h2>
            <p>Shop Now</p>
          </Body>
        </MenuItemContainer>
    )
}
 export default MenuItem;