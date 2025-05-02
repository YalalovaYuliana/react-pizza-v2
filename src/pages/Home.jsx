import React from 'react'
import qs from 'qs'
import { useNavigate } from 'react-router-dom'
import Categories from '../Components/Categories'
import Sort, { sortTypes } from '../Components/Sort'
import PizzaBlock from '../Components/PizzaBlock'
import Skeleton from '../Components/PizzaBlock/Skeleton'
import Pagination from '../Components/Pagination'
import { SearchContext } from '../App'
import { useSelector, useDispatch } from 'react-redux'
import { setCategoryId, setCurrentPage, setFilters } from '../redux/slices/filterSlice'
import { fetchPizzas } from '../redux/slices/pizzasSlice'

const Home = () => {
    const navigate = useNavigate()
    const isSearch = React.useRef(false)
    const isMounted = React.useRef(false)

    const { categoryId, sortType, currentPage } = useSelector(state => state.filter)
    const items = useSelector(state => state.pizza.items)
    const dispatch = useDispatch()

    const { searchValue } = React.useContext(SearchContext)
    const [isLoading, setIsLoading] = React.useState(true)

    const getPizzas = async () => {
        setIsLoading(true)

        const category = categoryId > 0 ? `category=${categoryId}` : ''
        const sortBy = sortType.sortProperty
        const search = searchValue ? `&search=${searchValue}` : ''

        try {
            dispatch(fetchPizzas({
                category,
                sortBy,
                search,
                currentPage,
            }))
        } catch (error) {
        } finally {
            setIsLoading(false)
        }

    }

    React.useEffect(() => {
        if (isMounted.current) {
            const queryString = qs.stringify({
                sortProperty: sortType.sortProperty,
                categoryId: categoryId,
                currentPage: currentPage,
            })
            navigate(`?${queryString}`)
        }
        isMounted.current = true
    }, [categoryId, sortType.sortProperty, currentPage, navigate])

    React.useEffect(() => {
        if (window.location.search) {
            const params = qs.parse(window.location.search.substring(1))

            const sort = sortTypes.find(sortObj => sortObj.sortProperty === params.sortProperty)

            dispatch(setFilters({
                ...params,
                sort
            }))
            isSearch.current = true
        }
    }, [])

    React.useEffect(() => {
        window.scrollTo(0, 0)

        if (!isSearch.current) {
            getPizzas()
        }

        isSearch.current = false
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
            <Pagination currentPage={currentPage} setCurrentPage={(number) => dispatch(setCurrentPage(number))} />
        </div>
    )
}

export default Home
