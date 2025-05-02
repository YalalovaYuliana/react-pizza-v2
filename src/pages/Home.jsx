import React from 'react'
import Categories from '../Components/Categories'
import Sort from '../Components/Sort'
import PizzaBlock from '../Components/PizzaBlock'
import Skeleton from '../Components/PizzaBlock/Skeleton'
import Pagination from '../Components/Pagination'
import { SearchContext } from '../App'
import { useSelector, useDispatch } from 'react-redux'
import { setCategoryId } from '../redux/slices/filterSlice'

const Home = () => {
    const { categoryId, sortType } = useSelector(state => state.filter)
    const dispatch = useDispatch()

    const { searchValue } = React.useContext(SearchContext)
    const [items, setItems] = React.useState([])
    const [isLoading, setIsLoading] = React.useState(true)
    const [currentPage, setCurrentPage] = React.useState(1);

    React.useEffect(() => {
        setIsLoading(true)

        const category = categoryId > 0 ? `category=${categoryId}` : ''
        const sortBy = sortType.sortProperty
        const search = searchValue ? `&search=${searchValue}` : ''

        fetch(`https://68126593129f6313e20e746e.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=decs${search}`) // &${searchValue ? `name=${searchValue}` : ''}
            .then(response => response.json())
            .then((json) => {
                setItems(json)
                setIsLoading(false)
            })
        window.scrollTo(0, 0)
    }, [categoryId, sortType, searchValue, currentPage])

    const pizzas = items.map((pizzaObj) => (<PizzaBlock key={pizzaObj.id} {...pizzaObj} />)) // .filter(pizzaObj => pizzaObj.name.toLowerCase().includes(searchValue.toLowerCase()))
    const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />)

    return (
        <div className="container">
            <div className="content__top">
                <Categories value={categoryId} onClickCategory={(index) => dispatch(setCategoryId(index))} />
                <Sort />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {
                    isLoading ? skeletons : pizzas
                }
            </div>
            <Pagination setCurrentPage={setCurrentPage} />
        </div>
    )
}

export default Home
