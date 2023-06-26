import './menu.styles.scss';
import MenuItem from '../menu-item/menu-item.component';

const Menu=({categories})=>{
    return (
        <div className="categories-container">
            {categories.map((category)=>(
                <MenuItem key={category.id} category={category}/>
            ))}
        </div>
    );
};
export default Menu;