import {useEffect, useState, useMemo} from "react";
import "./App.css";
import ListItem from "./ListItem";

function Button(props) {
    console.count("render button");
    return <button {...props} style={{backgroundColor: "lightgray"}}/>;
}

function App() {
    const [searchString, setSearchString] = useState("");
    const [isSortingDesc, setSortingDesc] = useState(false);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        console.count("render fetch");
        fetch("https://reqres.in/api/products")
            .then((response) => response.json())
            .then((json) =>
                setProducts(
                    json.data
                        .filter((item) => item.name.includes(searchString))
                        .sort((a, z) =>
                            isSortingDesc
                                ? z.name.localeCompare(a.name)
                                : a.name.localeCompare(z.name)
                        )
                )
            );
    }, [searchString, isSortingDesc]);

    console.count("render app");

    const button = useMemo(() => {
        return (
            <Button onClick={() => setSortingDesc((value) => !value)}>
                Change sort direction
            </Button>
        )
    }, []);

    return (
        <div className="App">
            <input
                type="search"
                value={searchString}
                onChange={(e) => setSearchString(e.target.value)}
            />
            {button}
            <ul>
                {products.map((product) => {
                    return <ListItem>{product.name}</ListItem>;
                })}
            </ul>
        </div>
    );
}

export default App;
