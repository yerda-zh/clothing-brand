import {CategoriesContainer} from './menu.styles';
import MenuItem from '../menu-item/menu-item.component';

const categories = [
    {
        "id": 1,
        "title": "hats",
        "imageurl": "https://media.glamourmagazine.co.uk/photos/62a06c0b90822da26007e53e/16:9/w_2580,c_limit/SUN%20HATS%20080622%20MAIN.jpg",
        "route": "shop/hats"
    },
    {
        "id": 2,
        "title": "jackets",
        "imageurl": "https://cdn.hiconsumption.com/wp-content/uploads/2022/11/Best-Fall-Jackets-0-Hero.jpg",
        "route": "shop/jackets"
    },
    {
        "id": 3,
        "title": "sneakers",
        "imageurl": "https://cdn.shopify.com/s/files/1/0419/1525/products/1024x1024-Men-Sneakers-Premier-LowTop-Hickory-062922-1.jpg?v=1662671289",
        "route": "shop/sneakers"
    },
    {
        "id": 4,
        "title": "womens",
        "imageurl": "https://www.usmagazine.com/wp-content/uploads/2023/01/Woman-Wearing-Sleek-Dress-Pants-Stock-Photo.jpg?w=1600&h=900&crop=1&quality=86&strip=all",
        "route": "shop/womens"
    },
    {
        "id": 5,
        "title": "mens",
        "imageurl": "https://pauseonline.s3.eu-west-2.amazonaws.com/wp-content/uploads/2016/09/look7-look7.st_.jpg",
        "route": "shop/mens"
    }
]

const Menu=()=>{
    
    return (
        <CategoriesContainer>
            {categories.map((category)=>(
                <MenuItem key={category.id} category={category}/>
            ))}
        </CategoriesContainer>
    );
};
export default Menu;