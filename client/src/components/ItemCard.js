import { Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

function ItemCard({ item, handleDelete }) {
    return (
    <div>
        <span id="singleitem">
            {item.name} - ${item.price}
            <Button onClick={()=>handleDelete(item.id)} style={{float: 'right'}} size="small" icon={<DeleteOutlined  />} />
        </span>
    </div>
    )
}

export default ItemCard