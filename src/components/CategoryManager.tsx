import { useState } from "react";

interface CategoryManagerProps {
    categories: string[];
    addCategory: (category: string) => void;
    deleteCategory: (category: string) => void;
}

function CategoryManager({ categories, addCategory, deleteCategory }: CategoryManagerProps) {
    const [newCategory, setNewCategory] = useState('');

    const handleAddCategory = () => {
        if (newCategory.trim() && !categories.includes(newCategory)) {
            addCategory(newCategory);
            setNewCategory('');
        }
    };

    return (
        <div>
            <h3>Categorias</h3>
            <input 
                type="text" 
                value={newCategory} 
                onChange={(e) => setNewCategory(e.target.value)} 
                placeholder="Nova Categoria" 
            />
            <button onClick={handleAddCategory}>Adicionar</button>
            <ul>
                {categories.map((category) => (
                    <li key={category}>
                        {category}
                        <button onClick={() => deleteCategory(category)}>Excluir</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default CategoryManager;