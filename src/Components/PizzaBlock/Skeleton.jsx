import React from "react"
import ContentLoader from "react-content-loader"

const Skeleton = () => (
    <ContentLoader
        className="pizza-block"
        speed={25}
        width={280}
        height={500}
        viewBox="0 0 280 500"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
    >
        <circle cx="130" cy="130" r="120" />
        <rect x="-2" y="274" rx="10" ry="10" width="280" height="17" />
        <rect x="-3" y="307" rx="10" ry="10" width="280" height="88" />
        <rect x="-3" y="416" rx="10" ry="10" width="95" height="30" />
        <rect x="125" y="408" rx="25" ry="25" width="152" height="45" />
    </ContentLoader>
)

export default Skeleton