import React from 'react'
import axios from 'axios'
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

const Home = () => {
    const navigate = useNavigate()
    const isSearch = React.useRef(false)
    const isMounted = React.useRef(false)

    const { categoryId, sortType, currentPage } = useSelector(state => state.filter)
    const dispatch = useDispatch()

    const { searchValue } = React.useContext(SearchContext)
    const [items, setItems] = React.useState([])
    const [isLoading, setIsLoading] = React.useState(true)

    const fetchPizzas = () => {
        setIsLoading(true)

        const category = categoryId > 0 ? `category=${categoryId}` : ''
        const sortBy = sortType.sortProperty
        const search = searchValue ? `&search=${searchValue}` : ''

        axios.get(
            `https://68126593129f6313e20e746e.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=decs${search}`
        )
            .then(response => {
                setItems(response.data)
                setIsLoading(false)
            })
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
            fetchPizzas()
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
