import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ApolloProvider, ApolloClient } from "@apollo/client";

import Home from "./components/Home";
import Navigation from "./components/Navigation";
import { cache } from "./utils/cache";

const client = new ApolloClient({
    uri:
        process.env.NODE_ENV === "production"
            ? "https://the-snacket.herokuapp.com/graphql"
            : "http://localhost:5000/graphql",
    connectToDevtools: true,
    cache,
});

function App() {
    return (
        <ApolloProvider client={client}>
            <Router>
                <Navigation />

                <Switch>
                    <Route path="/" component={Home} />
                </Switch>
            </Router>
        </ApolloProvider>
    );
}

export default App;
