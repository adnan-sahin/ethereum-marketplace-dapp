import { React } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.scss";
import DashboardPage from "./features/dashboard/components/DashboardPage";
import Footer from "./features/footer/components/Footer";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSearch, faUserCircle } from "@fortawesome/free-solid-svg-icons";

library.add(faSearch, faUserCircle);

const App = () => (
    <div className="layout">
        <main>
            <Routes>
                <Route exact path="/" element={<DashboardPage />} />
            </Routes>
        </main>
        <Footer />
    </div>
);

export default App;
