import React from 'react'

function Categories({ value, onClickCategory }) {
    const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые']

    return (
        <div className="categories">
            <ul>
                {
                    categories.map((category, index) => (
                        <li key={category} onClick={() => onClickCategory(index)} className={value === index ? 'active' : ''}>
                            {category}
                        </li>
                    ))}
            </ul>
        </div>
    )
}

export default Categories